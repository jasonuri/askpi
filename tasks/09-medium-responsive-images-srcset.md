# Task: Add Responsive Images with srcset Attributes

**Priority:** Medium
**Effort:** Medium
**Status:** Pending
**Blocked By:** Task 02 (Optimize images)

## Problem

After images are optimized, we need responsive images to serve appropriately sized images based on viewport.

## Files to Modify

- `/src/components/Home.tsx` (hero image)
- `/src/components/About.tsx` (founder photos)
- Any other components with large images

## Prerequisites

- Task 02 (image optimization) must be completed first
- Multiple image sizes need to be generated (480w, 800w, 1200w)

## Implementation

### Step 1: Generate Multiple Sizes

Create variants of each large image:
- `image-480w.webp`
- `image-800w.webp`
- `image-1200w.webp`

### Step 2: Update Vite Config

Add aliases for new image variants in `vite.config.ts`

### Step 3: Update Components

**Example for hero image in Home.tsx:**

```tsx
import heroImageSmall from 'figma:asset/e665c9f11ea03326d5d353882467fee42dd5af19-480w.webp';
import heroImageMedium from 'figma:asset/e665c9f11ea03326d5d353882467fee42dd5af19-800w.webp';
import heroImage from 'figma:asset/e665c9f11ea03326d5d353882467fee42dd5af19-1200w.webp';

<img
  src={heroImage}
  srcSet={`
    ${heroImageSmall} 480w,
    ${heroImageMedium} 800w,
    ${heroImage} 1200w
  `}
  sizes="(max-width: 480px) 480px, (max-width: 800px) 800px, 1200px"
  alt="Uri AI persona dashboard showing synthetic Gen Z audience visualization"
  className="w-full h-auto rounded-3xl"
  loading="lazy"
/>
```

**Example for founder photos in About.tsx:**

```tsx
<img
  src={jasonPhoto}
  srcSet={`
    ${jasonPhotoSmall} 160w,
    ${jasonPhoto} 320w
  `}
  sizes="(max-width: 768px) 160px, 192px"
  alt="Jason Nguyen, Co-Founder and CEO of Uri"
  className="w-full h-full object-cover"
  loading="lazy"
/>
```

## Acceptance Criteria

- [ ] Hero and founder images use srcset
- [ ] Mobile devices download smaller images
- [ ] No layout shift (CLS) from image loading
- [ ] All image variants load correctly
