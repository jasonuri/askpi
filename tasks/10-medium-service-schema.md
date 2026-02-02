# Task: Add Service Structured Data for Pricing/Offerings

**Priority:** Medium
**Effort:** Medium
**Status:** Pending

## Problem

The Service section describes two offerings (Full Service and Self Service) but lacks structured data.

## File to Modify

`/src/components/Service.tsx`

## Add This JSON-LD Schema

Add at the beginning of the section element (around line 114):

```tsx
<section id="service" className="w-full px-4 py-16 bg-[#2a2a2a]">
  {/* Service structured data */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Uri Research Services",
      "description": "AI-powered consumer research services for understanding Gen Z audiences",
      "itemListElement": [
        {
          "@type": "Service",
          "position": 1,
          "name": "Full Service Research",
          "description": "Bespoke consulting powered by our platform. Give us the objective, we run the research, and bring you the results. Results in 72 hours.",
          "provider": {
            "@type": "Organization",
            "name": "Uri",
            "url": "https://www.hellouri.ai"
          },
          "serviceType": "Consumer Research Consulting",
          "availableChannel": {
            "@type": "ServiceChannel",
            "serviceUrl": "https://www.hellouri.ai/#service",
            "servicePhone": "",
            "availableLanguage": "English"
          },
          "areaServed": {
            "@type": "Place",
            "name": "Worldwide"
          }
        },
        {
          "@type": "Service",
          "position": 2,
          "name": "Self Service Research Platform",
          "description": "Run your own research via access to our software platform. Results in hours.",
          "provider": {
            "@type": "Organization",
            "name": "Uri",
            "url": "https://www.hellouri.ai"
          },
          "serviceType": "Consumer Research Software",
          "availableChannel": {
            "@type": "ServiceChannel",
            "serviceUrl": "https://www.hellouri.ai/#service"
          },
          "potentialAction": {
            "@type": "JoinAction",
            "name": "Join Waitlist",
            "target": "https://www.hellouri.ai/#service"
          }
        }
      ]
    })}
  </script>

  {/* Rest of component... */}
```

## Acceptance Criteria

- [ ] Service schema added to Service.tsx
- [ ] Valid JSON-LD structure
- [ ] Passes Google Rich Results Test
- [ ] Both services are properly described
