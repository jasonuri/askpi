# Uri Website SEO Tasks

Generated from SEO audit on 2026-01-24.

## Task Overview

| # | Priority | Task | Effort | Status |
|---|----------|------|--------|--------|
| 01 | CRITICAL | Implement prerendering for SPA SEO | High | Pending |
| 02 | CRITICAL | Optimize images - convert to WebP | High | Pending |
| 03 | High | Add Twitter/X meta tags | Low | Pending |
| 04 | High | Fix broken footer navigation links | Low | Pending |
| 05 | High | Fix About page heading hierarchy | Low | Pending |
| 06 | High | Improve image alt text descriptions | Low | Pending |
| 07 | Medium | Populate Organization schema sameAs | Low | Pending |
| 08 | Medium | Add Person/Team schema to About page | Medium | Pending |
| 09 | Medium | Add responsive images with srcset | Medium | Pending |
| 10 | Medium | Add Service structured data | Medium | Pending |

## Dependencies

- Task 09 (responsive srcset) is **blocked by** Task 02 (image optimization)

## Recommended Execution Order

### Wave 1: Quick Wins (Parallel)
- Task 03: Add Twitter meta tags
- Task 04: Fix footer links
- Task 05: Fix heading hierarchy
- Task 06: Improve alt text
- Task 07: Organization schema sameAs

### Wave 2: Critical (Parallel)
- Task 01: Implement prerendering
- Task 02: Optimize images

### Wave 3: Schema Additions (Parallel)
- Task 08: About page schema
- Task 10: Service schema

### Wave 4: After Image Optimization
- Task 09: Responsive srcset (requires Task 02)

## Files Frequently Modified

| File | Tasks |
|------|-------|
| `/index.html` | 03 |
| `/src/components/Home.tsx` | 03, 06, 07, 09 |
| `/src/components/About.tsx` | 03, 05, 06, 08, 09 |
| `/src/components/Footer.tsx` | 04, 06 |
| `/src/components/Header.tsx` | 06 |
| `/src/components/Service.tsx` | 10 |
| `/vite.config.ts` | 02, 09 |
| `/src/assets/*` | 02, 09 |
