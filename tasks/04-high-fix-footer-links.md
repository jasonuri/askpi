# Task: Fix Broken Footer Navigation Links

**Priority:** High (Quick Win)
**Effort:** Low
**Status:** Pending

## Problem

Footer links currently use placeholder `href="#"` values that don't navigate anywhere.

## File to Modify

`/src/components/Footer.tsx`

## Current Code (around lines 74-91)

```tsx
<a href="#" className="...">Features</a>
<a href="#" className="...">How it Works</a>
<a href="#" className="...">About</a>
```

## Fixed Code

```tsx
<a href="/#features" className="...">Features</a>
<a href="/#features" className="...">How it Works</a>
<Link to="/about" className="...">About</Link>
```

## Better Implementation

Use React Router's Link component for internal navigation:

```tsx
import { Link } from "react-router-dom";

// For hash links to sections on home page
<a href="/#features" className="block text-white/70 hover:text-primary transition-colors">Features</a>
<a href="/#features" className="block text-white/70 hover:text-primary transition-colors">How it Works</a>

// For internal pages
<Link to="/about" className="block text-white/70 hover:text-primary transition-colors">About</Link>
```

## Acceptance Criteria

- [ ] All footer links navigate to correct destinations
- [ ] Internal links use React Router Link component where appropriate
- [ ] Hash links scroll to correct sections on homepage
