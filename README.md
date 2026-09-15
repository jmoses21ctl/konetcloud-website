# KonetCloud — Marketing Site

Public website for [KonetCloud](https://konetcloud.com), the cloud platform from 21st Century Technologies. Built to the *Website Content and Information Architecture* brief (15 Sep 2026).

## Stack

- **Next.js 16** (App Router, React Server Components, static generation)
- **TypeScript** (strict)
- **Tailwind CSS v4** — design tokens live in [`app/globals.css`](app/globals.css) under `@theme`
- **next/font** — Plus Jakarta Sans (display/body) + JetBrains Mono (labels, numerals)

## Structure

```
app/
  page.tsx                Homepage
  products/[family]       8 product families (static)
  solutions/[slug]        7 solutions (static)
  industries/[slug]       6 industries (static)
  pricing, trust, support, resources, contact
  [...slug]               Catch-all "in progress" page for linked-but-unbuilt routes
components/
  brand/                  Logo + logomark
  layout/                 Navbar (dropdowns), mobile nav, header chrome, footer, page shell
  sections/               Homepage sections, architecture visual, hero network canvas
  ui/                     Button, Reveal, SectionHeading, PageHero, LinkCard, ServiceTable, StatusBadge, …
lib/
  site.ts                 Brand strings, navigation
  products.ts             Product families + services + publication status
  solutions.ts, industries.ts, trust.ts, pricing.ts
  status.ts               Service status vocabulary (Available / Preview / Coming soon)
```

## Content controls (from the brief)

- **Service status** is data (`lib/products.ts`). Every status is a placeholder pending product-owner sign-off — see the comment at the top of the file.
- **No unsupported claims**: no uptime %, latency numbers, certifications, "largest/fastest" language or price comparisons. Prices are not published; `lib/pricing.ts` describes models and categories only.
- **Sovereignty wording** is fixed in `lib/trust.ts` (`sovereigntyWording`).
- **Architecture visual** (`components/sections/architecture.tsx`) is logical only: three peer zones, redundant paths, layers. No topology.
- **Contact form** validates server-side; delivery is a stub in `app/contact/actions.ts` — wire to CRM/ticketing before launch.

## Develop

```bash
pnpm install
pnpm dev
```

`pnpm build` runs the full static build; `pnpm lint` and `pnpm exec tsc --noEmit` for checks.
