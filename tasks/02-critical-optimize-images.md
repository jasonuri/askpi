# Task: Optimize Images - Convert to WebP and Compress

**Priority:** CRITICAL
**Effort:** High
**Status:** Pending
**Blocks:** Task 09 (responsive srcset)

## Problem

Images total ~10.9MB which severely impacts Core Web Vitals and LCP scores.

## Directory

`/src/assets/`

## Current Largest Images

| File | Size |
|------|------|
| 88f726e79209f872fda913d076035b2df8f0b8a9.png | 1.28 MB |
| 118fb2ba60607b99fb4d5193cf25fce24fd162e7.png | 1.05 MB |
| 840fa504e4320458f1b634a3fb3954aab9226079.png | 1.01 MB |
| 84de9bd378b84833b5d3c9a87db70b876161a95a.png | 996 KB |
| 6955d5d8200c43264a095dbe397d6301c04edf05.png | 954 KB |

## Tasks

1. Install sharp or imagemin for image processing
2. Convert all PNGs to WebP format
3. Compress to target <200KB per image
4. Update vite.config.ts aliases to point to new WebP files
5. Add fallback for browsers without WebP support (optional)

## Commands

```bash
# Install dependencies
npm install -D vite-plugin-imagemin
# Or use sharp directly
npm install -D sharp
```

## Acceptance Criteria

- [ ] All images converted to WebP
- [ ] Total assets under 2MB (from current 10.9MB)
- [ ] No visible quality degradation
- [ ] Build still works correctly
