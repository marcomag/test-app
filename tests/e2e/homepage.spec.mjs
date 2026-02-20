import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();

try {
  await page.goto('http://127.0.0.1:3000');

  await page.waitForSelector('h1');
  const title = await page.textContent('h1');

  if (!title?.includes('Minimal E-commerce Webshop')) {
    throw new Error('Expected main heading not found');
  }

  const addToCartButtons = await page.locator('button:has-text("Add to cart")').count();
  if (addToCartButtons < 1) {
    throw new Error('No Add to cart buttons found');
  }

  console.log('Playwright e2e check passed');
} finally {
  await browser.close();
}
