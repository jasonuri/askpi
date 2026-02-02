# Task: Improve Image Alt Text Descriptions

**Priority:** High (Quick Win)
**Effort:** Low
**Status:** Pending

## Problem

Current alt text is functional but could be more descriptive for accessibility and SEO.

## Files to Modify

- `/src/components/Home.tsx`
- `/src/components/About.tsx`
- `/src/components/Header.tsx`
- `/src/components/Footer.tsx`

## Changes

### Home.tsx

**Current:**
```tsx
alt="AI Persona Visualization"
```

**Improved:**
```tsx
alt="Uri AI persona dashboard showing synthetic Gen Z audience visualization"
```

### About.tsx

**Current:**
```tsx
alt="Jason Nguyen"
alt="Vanessa Hoh"
alt="Elliott Prince"
```

**Improved:**
```tsx
alt="Jason Nguyen, Co-Founder and CEO of Uri - Gen Z consumer research platform"
alt="Vanessa Hoh, Co-Founder of Uri - former FCA regulator and wellness brand founder"
alt="Elliott Prince, Co-Founder and CPTO of Uri - Director of Product and Design"
```

### Header.tsx & Footer.tsx

**Current:**
```tsx
alt="Uri"
```

**Improved:**
```tsx
alt="Uri logo"
```

(Keep logo alt text short - just the brand name is fine)

## Acceptance Criteria

- [ ] All images have descriptive, keyword-relevant alt text
- [ ] Alt text is concise but informative (under 125 characters)
- [ ] Founder photos include role/title
- [ ] Logo alt text remains simple
