# NGB Ventures: website

Production website for **NGB Ventures (Next Global Brand)**, an international sourcing and manufacturing-coordination partner based in Pune, India.

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Motion · Lucide · Zod

84 statically generated pages, 3 interactive procurement tools, a 5-step enquiry builder, and interactive India cluster and world market maps.

| Doc | Purpose |
|---|---|
| [docs/01-research-and-creative-direction.md](docs/01-research-and-creative-direction.md) | Research status (network-restricted), benchmark framework, 3 creative directions, chosen design language |
| [docs/02-sitemap-and-architecture.md](docs/02-sitemap-and-architecture.md) | Sitemap, how to add pages, component library, conversion journeys |
| [docs/03-seo-keyword-map.md](docs/03-seo-keyword-map.md) | Keyword → page map, technical SEO, growth roadmap |
| [docs/04-image-brief.md](docs/04-image-brief.md) | 81 photography slots with shot briefs, and how to swap in photos |
| [docs/05-qa-report.md](docs/05-qa-report.md) | QA results, Lighthouse scores, design review, known limitations |

## Quick start

```bash
npm install
cp .env.example .env.local     # fill in what you have; everything is optional for local dev
ENQUIRY_FILE_SINK=true npm run dev
# → http://localhost:3000   (enquiries are appended to .data/enquiries.jsonl in dev)
```

```bash
npm run lint      # ESLint (next/core-web-vitals + TypeScript)
npm run build     # generates /public/maps/*.svg, then builds 84 static pages
npm start         # serve the production build
```

Requires Node 20+ (tested on Node 22).

### Static preview export

`npm run build && npm start`, then in another terminal `npm run preview:export -- http://localhost:3000 preview-export`. This writes a relative-path copy of all pages to `preview-export/site/` that works under any sub-path (used for the private Claude Artifact preview). Forms show a "preview only" notice in this export.

## Deployment

**Recommended: Vercel** (zero-config for Next.js).
1. Push this folder to its own Git repository, or set *Root Directory* to `projects/ngb-ventures-website`.
2. Import it in Vercel. The framework is auto-detected.
3. Add environment variables (below) for Production and Preview.
4. Add your domain, then set `NEXT_PUBLIC_SITE_URL` to it (this drives canonicals, the sitemap and Open Graph URLs).
5. Submit `https://<domain>/sitemap.xml` in Google Search Console and Bing Webmaster Tools.

**Alternatives:** Netlify (Next runtime), AWS Amplify, or any Node host via `npm run build && npm start` (port 3000), including Docker or Render. The `/api/enquiry` route needs a Node runtime, so a pure static export isn't supported.

## Environment variables and external services

| Variable | Required | Service | Notes |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | **Yes (prod)** | — | Production origin, e.g. `https://www.ngbventures.com` |
| `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL`, `ENQUIRY_FROM_EMAIL` | One delivery channel required | [Resend](https://resend.com) | Email delivery of enquiries. FROM must be on a verified domain. TO accepts a comma-separated list |
| `ENQUIRY_WEBHOOK_URL`, `ENQUIRY_WEBHOOK_SECRET` | One delivery channel required | Zapier / Make / n8n / HubSpot / Zoho CRM | JSON POST. `X-NGB-Signature` = HMAC-SHA256(body, secret) |
| `ENQUIRY_FILE_SINK` | Dev only | — | `true` writes to `.data/enquiries.jsonl`. Ignored in production |
| `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_CONTACT_PHONE` | Recommended | — | Shown in the footer, contact page and form fallbacks |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Optional | WhatsApp Business | Digits with country code. Enables the WhatsApp buttons |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Optional | [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/) | Adds a CAPTCHA-style check. Without it, the honeypot, timing trap and rate limit still apply |
| `NEXT_PUBLIC_LINKEDIN_URL` etc. | Optional | — | Social links appear only when set |
| `NEXT_PUBLIC_SHOW_PLACEHOLDERS` | Optional | — | `true` shows factual-gap placeholders in production (hidden by default) |

**No fake submissions.** If no delivery channel is configured, `/api/enquiry` returns `503 not_configured`, and the form tells the visitor to use email or WhatsApp instead. It never reports a false success.

### Enquiry API security
- Zod validation on the server, with field-level errors returned to the UI.
- JSON-only, 50 KB body cap, same-origin check.
- Honeypot field plus a minimum fill time of 2.5 s. Bots are accepted silently but never delivered.
- Per-IP rate limit (5 per 10 min, in memory). For multi-instance hosting, swap in Upstash Redis.
- Optional Turnstile verification.
- No secrets in client code. Only `NEXT_PUBLIC_*` values reach the browser.

## Content editing

All copy lives in typed data files in `src/content/`: `industries.ts`, `products.ts`, `clusters.ts`, `markets.ts`, `services.ts`, `guides.ts`, `home.ts` and `site.ts`. Adding an entry creates the page, sitemap entry, menu links and structured data automatically. See [docs/02](docs/02-sitemap-and-architecture.md).

**CMS recommendation:** when non-developers need to edit, migrate the same schemas to **Sanity** (best structured-content fit, free tier) or **Payload** (self-hosted, TypeScript-native). Templates stay unchanged.

## Images

There's no photography yet. Stock and competitor hosts were unreachable during the build, and hotlinking is out of the question. Every visual is an art-directed **plate**: an original pattern plus an engraved line illustration. To add a licensed photo, save it as `public/media/<slot>.webp` and rebuild. Slots and shot briefs are in [docs/04-image-brief.md](docs/04-image-brief.md).

## Before launch: factual items to confirm

Search for `PLACEHOLDER` in the codebase and see the dev-only placeholder blocks on `/about`:
- Legal entity name, registered address, GSTIN and IEC (`src/content/site.ts`, `/about`).
- Contact email, phone and WhatsApp (env vars).
- Founder and team profiles. Only list real memberships and certifications.
- Privacy policy and terms: drafts that need counsel review (`/privacy`, `/terms`).
- Review the dated trade-policy notes in `src/content/markets.ts` quarterly (tariffs and FTA status change).

## Credits

- India map: [@svg-maps/india](https://github.com/VictorCazanave/svg-maps) © Victor Cazanave, CC BY 4.0 (attribution shown on the map and in /terms).
- World land data: Natural Earth via [world-atlas](https://github.com/topojson/world-atlas).
- Fonts: Cormorant Garamond, Manrope and IBM Plex Mono (SIL Open Font License), self-hosted via `next/font`.
