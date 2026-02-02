# Task: Populate Organization Schema sameAs Array

**Priority:** Medium
**Effort:** Low
**Status:** Pending

## Problem

The Organization schema on the homepage has an empty sameAs array, missing the opportunity to link social profiles.

## File to Modify

`/src/components/Home.tsx`

## Current Code (around line 80)

```tsx
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Uri",
  "url": "https://www.hellouri.ai",
  "logo": "https://www.hellouri.ai/favicon.png",
  "description": "Consumer research platform helping businesses understand Gen Z",
  "sameAs": []  // <-- Empty!
})}
```

## Fixed Code

```tsx
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Uri",
  "url": "https://www.hellouri.ai",
  "logo": "https://www.hellouri.ai/favicon.png",
  "description": "Consumer research platform helping businesses understand Gen Z",
  "sameAs": [
    "https://www.linkedin.com/company/hellouri",
    "https://twitter.com/hellouri_ai"
  ]
})}
```

## Note

Verify the actual LinkedIn company page URL and Twitter handle before implementing. Update with correct URLs.

## Acceptance Criteria

- [ ] sameAs array populated with at least LinkedIn URL
- [ ] Valid JSON-LD structure maintained
- [ ] URLs verified as correct
