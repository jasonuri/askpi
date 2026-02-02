# Task: Implement Prerendering for SPA SEO

**Priority:** CRITICAL
**Effort:** High
**Status:** Pending

## Problem

The site is a React SPA that renders `<div id="root"></div>` initially. Search engines may not execute JavaScript fully, resulting in poor indexation.

## Current Setup

- React SPA with react-router-dom
- Vite build system
- Deployed on Vercel

## Options (Choose One)

### Option A: vite-plugin-prerender (Recommended for quick fix)

```bash
npm install vite-plugin-prerender
```

Add to vite.config.ts:
```typescript
import prerender from 'vite-plugin-prerender';

export default defineConfig({
  plugins: [
    react(),
    prerender({
      routes: ['/', '/about'],
    }),
  ],
});
```

### Option B: vite-plugin-ssr

```bash
npm install vite-plugin-ssr
```

Configure for static pre-rendering of / and /about routes.

### Option C: Use prerender.io service

- Sign up for prerender.io
- Add middleware to Vercel config
- No code changes needed

### Option D: Migrate to Next.js (Long-term best)

- Full SSR/SSG support
- Better SEO by default
- More significant refactor

## Acceptance Criteria

- [ ] `curl https://www.hellouri.ai/` returns full HTML content, not empty div
- [ ] Both / and /about routes are pre-rendered
- [ ] Meta tags visible in view-source
- [ ] Build and deploy still work on Vercel
