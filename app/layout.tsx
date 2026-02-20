import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { SnowplowSignals } from '@/app/snowplow-signals';

export const metadata: Metadata = {
  title: 'Simple Shop',
  description: 'A minimal e-commerce webshop built with Next.js and TypeScript'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const snowplowCollectorUrl = process.env.NEXT_PUBLIC_SNOWPLOW_COLLECTOR_URL;
  const snowplowAppId = process.env.NEXT_PUBLIC_SNOWPLOW_APP_ID ?? 'simple-shop';

  return (
    <html lang="en">
      <body>
        {children}
        <SnowplowSignals />
        {snowplowCollectorUrl ? (
          <>
            <Script
              src="https://cdn.jsdelivr.net/npm/@snowplow/javascript-tracker@3.24.5/dist/sp.min.js"
              strategy="afterInteractive"
            />
            <Script
              id="snowplow-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.snowplow && window.snowplow('newTracker', 'sp1', '${snowplowCollectorUrl}', {
                    appId: '${snowplowAppId}',
                    cookieSameSite: 'Lax',
                    contexts: {
                      webPage: true,
                      performanceTiming: true
                    }
                  });

                  window.snowplow && window.snowplow('enableLinkClickTracking');
                  window.snowplow && window.snowplow('enableActivityTracking', {
                    minimumVisitLength: 10,
                    heartbeatDelay: 10
                  });
                  window.snowplow && window.snowplow('trackPageView');
                `
              }}
            />
          </>
        ) : null}
      </body>
    </html>
  );
}
