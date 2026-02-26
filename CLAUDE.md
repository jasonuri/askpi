# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AskPhi (askphi.ai) is an audience intelligence platform that analyzes websites to produce ICP (Ideal Customer Profile) reports. Users enter their website URL and describe their target audience, then receive a streaming AI-generated teaser analysis. After providing their email, they receive a full two-part report via email.

### Business Context

**What AskPhi sells**: Audience Intelligence Sprint (consultancy). Uses synthetic user research, JTBD framework, behavioural science, and psychometrics to help teams sharpen their ICP, uncover decision drivers, and fast-track GTM strategy.

**Sprint structure**: Discovery → persona development → summary findings. Options for single-industry or multi-industry focus. Expected outcomes: refined ICP, sharper positioning, actionable insights for messaging & growth.

**Upsell (NOT on website)**: After the sprint, clients can upload the discovered ICP into the AskPhi platform for self-serve querying. Consultancy first → self-serve product.

**Sales funnel**:
1. AI Chat Teaser (free, automated) → hooks them with a gap analysis
2. Detailed Report via Email (free, gated behind email) → deepens the hook
3. Discovery Call (free, human) → proper diagnosis
4. Sprint (paid) → the treatment

**Primary CTA sequence**: AI chat widget first (hero), "Book a Discovery Call" in later sections.

**Confirmed clients**: Handicaddie, Run It Once, Teleya Hospitality, Slippery Saints.
**NDA/blurred**: Channel 4 ("Major UK Broadcaster"), Fremantle ("Global Production Company").

**Target audiences**: Startup founders, growth leads, GTM teams, agency strategists, researchers, enterprise media.

## Commands

- `npm run dev` — Start Next.js dev server
- `npm run build` — Production build
- `npm run lint` — Run Next.js linting
- `npm start` — Start production server

No test runner is configured.

## Architecture

### Frontend (Next.js App Router)

- **Next.js 15** with React 19, App Router (`src/app/`), standalone output mode
- **Tailwind CSS v4** via `@tailwindcss/postcss` — no `tailwind.config` file; theme tokens defined in `src/app/globals.css` using `@theme {}` block
- **Two font families**: Inter (`--font-sans`) for body, Space Grotesk (`--font-serif`) for headings — loaded via `next/font/google` in `layout.tsx`
- **Framer Motion** for animations throughout
- **Path alias**: `@/*` maps to `./src/*`

### ICP Widget Flow (core user interaction)

The hero section contains a multi-step chat-style widget (`src/components/hero/icp-widget.tsx`) that progresses through these steps:

1. **url** — User enters website URL
2. **audience** — User describes their target audience
3. **streaming** — SSE stream from backend shows teaser bullet points in real-time
4. **email_capture** — User provides email to unlock full report
5. **confirmation** — Success message

The widget uses `startTeaserStream()` from `src/lib/api.ts` which consumes Server-Sent Events from the Supabase Edge Function.

### Backend (Supabase Edge Functions)

Single Hono-based edge function at `supabase/functions/make-server-e1b246ca/index.ts` running on Deno. All routes are prefixed with `/make-server-e1b246ca/`. Key endpoints:

- `POST /diagnostic/teaser` — Scrapes website via Jina AI (`r.jina.ai`), streams Claude analysis as SSE
- `POST /diagnostic/unlock` — Captures email, generates Part 1 + Part 2 reports, sends email via Resend
- `POST /diagnostic/start` — Full Part 1 analysis (non-streaming)
- `POST /subscribe` — Newsletter subscription via Resend
- `GET /health` — Health check

The function uses Claude (`claude-sonnet-4-5-20250929`) for all AI analysis. Reports are stored in Supabase tables (`diagnostic_leads`, `diagnostic_reports`).

### Supabase Configuration

- **Project ID**: `vpksqktpqosbepcpdrak`
- Client config in `src/lib/supabase.ts` — uses the public anon key (not a secret)
- Migrations in `supabase/migrations/`

### CSS Architecture

There are **multiple CSS files** with different roles — this is a known artifact of the project's evolution:
- `src/app/globals.css` — Active theme tokens for the Next.js app (Tailwind v4 `@theme` block, light theme with blue primary `#2563EB`)
- `src/styles/globals.css` — Legacy/alternate dark theme variables (dark background `#2a2a2a`, green primary `#65ec87`) using CSS custom properties and `@theme inline`
- `src/index.css` — Large legacy stylesheet (not actively used by Next.js app)

The active design system uses a clean blue/white palette defined in `src/app/globals.css`.

### UI Components

- `src/components/ui/` — Reusable primitives (Button, Card, Input, Accordion) using Radix UI + CVA pattern
- `src/components/sections/` — Landing page sections (SocialProof, Problem, HowItWorks, UseCases, Service, FAQ, FinalCTA)
- `src/components/hero/` — Chat widget components for the ICP flow
- `cn()` utility for Tailwind class merging exists in both `src/lib/utils.ts` and `src/components/ui/utils.ts`
