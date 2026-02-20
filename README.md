# Simple Shop

A simple e-commerce webshop application built with:

- Next.js
- TypeScript
- Tailwind CSS
- Playwright
- Jest
- Custom Node server

## Scripts

- `npm run dev` - start development server via Node server
- `npm run build` - create production build
- `npm run start` - run production server
- `npm run test` - run Jest unit tests
- `npm run test:e2e` - run Playwright e2e tests

## Run locally

1. Make sure you have Node.js 18+ and npm installed.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser at:

   ```
   http://localhost:3000
   ```

## Snowplow analytics

Snowplow tracking is wired into the root layout and is enabled only when a collector URL is provided.

Set these environment variables in `.env.local`:

```bash
NEXT_PUBLIC_SNOWPLOW_COLLECTOR_URL=collector.example.com
NEXT_PUBLIC_SNOWPLOW_APP_ID=simple-shop
```

When enabled, the app initializes the Snowplow JavaScript tracker and sends page view, link click, and activity heartbeat events.

### Run in production mode locally

```bash
npm run build
npm run start
```
