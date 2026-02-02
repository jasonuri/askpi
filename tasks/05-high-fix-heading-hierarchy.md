# Task: Fix About Page Heading Hierarchy

**Priority:** High (Quick Win)
**Effort:** Low
**Status:** Pending

## Problem

The About page uses H4 tags for founder names which breaks proper heading hierarchy. Should use H2 or H3.

## File to Modify

`/src/components/About.tsx`

## Current Code (lines 63, 97, 131)

```tsx
<h4 className="mb-2 text-foreground font-[Instrument_Serif] text-[32px]">Jason Nguyen</h4>
<h4 className="mb-2 text-foreground font-[Instrument_Serif] text-[32px]">Vanessa Hoh</h4>
<h4 className="mb-2 text-foreground font-[Instrument_Serif] text-[32px]">Elliott Prince</h4>
```

## Fixed Code

```tsx
<h3 className="mb-2 text-foreground font-[Instrument_Serif] text-[32px]">Jason Nguyen</h3>
<h3 className="mb-2 text-foreground font-[Instrument_Serif] text-[32px]">Vanessa Hoh</h3>
<h3 className="mb-2 text-foreground font-[Instrument_Serif] text-[32px]">Elliott Prince</h3>
```

## Also Improve H1 (line 39)

**Current:**
```tsx
<h1 className="...">About <span className="text-primary">Us</span></h1>
```

**Improved:**
```tsx
<h1 className="...">About <span className="text-primary">Uri</span> - The Gen Z Research Team</h1>
```

## Acceptance Criteria

- [ ] Founder names use H3 tags instead of H4
- [ ] H1 is more descriptive and keyword-rich
- [ ] Proper hierarchy maintained: H1 → H2 (section headers) → H3 (founder names)
