# Task: Add Missing Twitter/X Meta Tags

**Priority:** High (Quick Win)
**Effort:** Low
**Status:** Pending

## Problem

Twitter @handle meta tags are missing, reducing social sharing effectiveness.

## Files to Modify

- `/index.html`
- `/src/components/Home.tsx`
- `/src/components/About.tsx`

## Changes

### Add to all files (in Helmet or head section):

```html
<meta name="twitter:site" content="@hellouri_ai" />
<meta name="twitter:creator" content="@hellouri_ai" />
```

### Additional tags for index.html only:

```html
<meta name="robots" content="index, follow" />
<meta name="author" content="Uri" />
<link rel="alternate" hreflang="en" href="https://www.hellouri.ai/" />
```

## Acceptance Criteria

- [ ] All 3 files have consistent Twitter meta tags
- [ ] New meta tags added to index.html head section
- [ ] Verify correct Twitter handle is used
