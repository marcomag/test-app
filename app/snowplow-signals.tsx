'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    snowplow?: (...args: unknown[]) => void;
  }
}

const PAGE_TIME_SCHEMA = 'iglu:com.simple_shop/page_time_spent/jsonschema/1-0-0';
const PAGE_VIEW_SCHEMA = 'iglu:com.simple_shop/page_view/jsonschema/1-0-0';
const CLICKABLE_IMPRESSION_SCHEMA = 'iglu:com.simple_shop/clickable_impression/jsonschema/1-0-0';
const INTERACTION_SCHEMA = 'iglu:com.simple_shop/user_interaction/jsonschema/1-0-0';
const PRODUCT_VIEW_SCHEMA = 'iglu:com.simple_shop/product_detail_view/jsonschema/1-0-0';
const SCROLL_SCHEMA = 'iglu:com.simple_shop/scroll_depth/jsonschema/1-0-0';
const SESSION_STORAGE_KEY = 'snowplowTrackedEvents';

type TrackedEvent = {
  schema: string;
  data: Record<string, unknown>;
  trackedAt: string;
};

function saveTrackedEvent(event: TrackedEvent) {
  try {
    const existing = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
    const parsed = existing ? (JSON.parse(existing) as TrackedEvent[]) : [];
    parsed.push(event);
    window.sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(parsed));
  } catch {
    // Ignore session storage failures to avoid breaking tracking.
  }
}

function trackSelfDescribingEvent(schema: string, data: Record<string, unknown>) {
  saveTrackedEvent({
    schema,
    data,
    trackedAt: new Date().toISOString()
  });

  window.snowplow?.('trackSelfDescribingEvent', {
    event: {
      schema,
      data
    }
  });
}

export function SnowplowSignals() {
  const pathname = usePathname();

  useEffect(() => {
    let teardown: (() => void) | undefined;

    const initializeTracking = () => {
      if (!window.snowplow || teardown) {
        return;
      }

      const pagePath = window.location.pathname;
      const pageStart = Date.now();
      let pageTimeSent = false;
      let maxScrollDepth = 0;
      let ticking = false;
      const hoverStart = new Map<string, number>();

      trackSelfDescribingEvent(PAGE_VIEW_SCHEMA, {
        pagePath,
        viewedAt: new Date().toISOString()
      });

      const impressionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting || entry.intersectionRatio < 0.5) {
              return;
            }

            const target = entry.target as HTMLElement;
            const id = target.dataset.spClickable;
            if (!id) {
              return;
            }

            trackSelfDescribingEvent(CLICKABLE_IMPRESSION_SCHEMA, {
              elementId: id,
              pagePath,
              intersectionRatio: entry.intersectionRatio
            });
            impressionObserver.unobserve(target);
          });
        },
        { threshold: [0.5] }
      );

      document.querySelectorAll<HTMLElement>('[data-sp-clickable]').forEach((element) => {
        impressionObserver.observe(element);
      });

      const visibleSince = new Map<string, number>();
      const productObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const target = entry.target as HTMLElement;
            const productId = target.dataset.spProductDetail ?? target.dataset.spProductDetailPage;
            if (!productId) {
              return;
            }

            if (entry.isIntersecting) {
              visibleSince.set(productId, Date.now());
              return;
            }

            const startedAt = visibleSince.get(productId);
            if (!startedAt) {
              return;
            }

            visibleSince.delete(productId);
            trackSelfDescribingEvent(PRODUCT_VIEW_SCHEMA, {
              productId,
              viewDurationSeconds: Number(((Date.now() - startedAt) / 1000).toFixed(2)),
              pagePath
            });
          });
        },
        { threshold: [0.5] }
      );

      document
        .querySelectorAll<HTMLElement>('[data-sp-product-detail], [data-sp-product-detail-page]')
        .forEach((element) => {
          productObserver.observe(element);
        });

      const updateScrollDepth = () => {
        const viewportBottom = window.scrollY + window.innerHeight;
        const maxHeight = Math.max(document.documentElement.scrollHeight, 1);
        const depth = Math.min(100, Math.round((viewportBottom / maxHeight) * 100));
        maxScrollDepth = Math.max(maxScrollDepth, depth);
        ticking = false;
      };

      const handleScroll = () => {
        if (ticking) {
          return;
        }
        ticking = true;
        window.requestAnimationFrame(updateScrollDepth);
      };

      const trackInteraction = (type: 'click' | 'hover', target: HTMLElement) => {
        const elementId = target.dataset.spClickable;
        if (!elementId) {
          return;
        }

        trackSelfDescribingEvent(INTERACTION_SCHEMA, {
          type,
          elementId,
          pagePath,
          timestamp: new Date().toISOString()
        });
      };

      const handleClick = (event: MouseEvent) => {
        const target = (event.target as HTMLElement).closest<HTMLElement>('[data-sp-clickable]');
        if (target) {
          trackInteraction('click', target);
        }
      };

      const handleMouseOver = (event: MouseEvent) => {
        const target = (event.target as HTMLElement).closest<HTMLElement>('[data-sp-clickable]');
        if (!target) {
          return;
        }

        const elementId = target.dataset.spClickable;
        if (!elementId || hoverStart.has(elementId)) {
          return;
        }

        hoverStart.set(elementId, Date.now());
        trackInteraction('hover', target);
      };

      const handleMouseOut = (event: MouseEvent) => {
        const target = (event.target as HTMLElement).closest<HTMLElement>('[data-sp-clickable]');
        if (!target) {
          return;
        }

        const elementId = target.dataset.spClickable;
        if (!elementId) {
          return;
        }

        const startedAt = hoverStart.get(elementId);
        if (!startedAt) {
          return;
        }

        hoverStart.delete(elementId);
        trackSelfDescribingEvent(INTERACTION_SCHEMA, {
          type: 'hover_end',
          elementId,
          hoverDurationMs: Date.now() - startedAt,
          pagePath,
          timestamp: new Date().toISOString()
        });
      };

      const flushProductVisibility = () => {
        const now = Date.now();
        visibleSince.forEach((startedAt, productId) => {
          trackSelfDescribingEvent(PRODUCT_VIEW_SCHEMA, {
            productId,
            viewDurationSeconds: Number(((now - startedAt) / 1000).toFixed(2)),
            pagePath
          });
        });
        visibleSince.clear();
      };

      const trackScrollDepth = () => {
        trackSelfDescribingEvent(SCROLL_SCHEMA, {
          pagePath,
          maxScrollDepth
        });
      };

      const sendPageTime = () => {
        if (pageTimeSent) {
          return;
        }

        pageTimeSent = true;
        trackSelfDescribingEvent(PAGE_TIME_SCHEMA, {
          pagePath,
          timeSpentSeconds: Number(((Date.now() - pageStart) / 1000).toFixed(2))
        });
      };

      const handleVisibilityChange = () => {
        if (document.visibilityState === 'hidden') {
          flushProductVisibility();
          sendPageTime();
          trackScrollDepth();
        }
      };

      const handleBeforeUnload = () => {
        flushProductVisibility();
        sendPageTime();
        trackScrollDepth();
      };

      updateScrollDepth();
      window.addEventListener('scroll', handleScroll, { passive: true });
      document.addEventListener('click', handleClick);
      document.addEventListener('mouseover', handleMouseOver);
      document.addEventListener('mouseout', handleMouseOut);
      document.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('beforeunload', handleBeforeUnload);

      teardown = () => {
        flushProductVisibility();
        sendPageTime();
        trackScrollDepth();

        impressionObserver.disconnect();
        productObserver.disconnect();
        window.removeEventListener('scroll', handleScroll);
        document.removeEventListener('click', handleClick);
        document.removeEventListener('mouseover', handleMouseOver);
        document.removeEventListener('mouseout', handleMouseOut);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    };

    initializeTracking();
    const interval = window.setInterval(initializeTracking, 250);

    return () => {
      window.clearInterval(interval);
      teardown?.();
    };
  }, [pathname]);

  return null;
}
