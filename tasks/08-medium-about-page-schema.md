# Task: Add Person/Team Structured Data to About Page

**Priority:** Medium
**Effort:** Medium
**Status:** Pending

## Problem

The About page is missing structured data for the team members, which limits rich result eligibility.

## File to Modify

`/src/components/About.tsx`

## Add This JSON-LD Schema

Add inside the Helmet component, after the existing meta tags:

```tsx
<Helmet>
  {/* ... existing meta tags ... */}

  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "mainEntity": {
        "@type": "Organization",
        "name": "Uri",
        "url": "https://www.hellouri.ai",
        "description": "AI-powered consumer research platform for Gen Z",
        "founder": [
          {
            "@type": "Person",
            "name": "Jason Nguyen",
            "jobTitle": "Co-Founder & CEO",
            "workLocation": {
              "@type": "Place",
              "address": "London"
            },
            "sameAs": "https://www.linkedin.com/in/jasonvunguyen/",
            "email": "jason@hellouri.ai"
          },
          {
            "@type": "Person",
            "name": "Vanessa Hoh",
            "jobTitle": "Co-Founder",
            "workLocation": {
              "@type": "Place",
              "address": "New York"
            },
            "sameAs": "https://www.linkedin.com/in/vanessa-hoh-aa73928a/",
            "email": "vanessa@hellouri.ai"
          },
          {
            "@type": "Person",
            "name": "Elliott Prince",
            "jobTitle": "Co-Founder & CPTO",
            "workLocation": {
              "@type": "Place",
              "address": "London"
            },
            "sameAs": "https://www.linkedin.com/in/elliott-prince-a5a42a18/",
            "email": "elliott@hellouri.ai"
          }
        ]
      }
    })}
  </script>
</Helmet>
```

## Acceptance Criteria

- [ ] AboutPage schema with Person entities for all 3 founders
- [ ] Valid JSON-LD that passes Google's Rich Results Test
- [ ] LinkedIn URLs match those already in the component
