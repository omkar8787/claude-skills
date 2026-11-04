# NGB Ventures: website

Production website for **NGB Ventures (Next Global Brand)**, an international sourcing and manufacturing-coordination partner based in Pune, India.

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Motion · Lucide · Zod

126 statically generated pages across five business divisions, an India Manufacturing Atlas, a GI Origin Collection (18 researched products), a Product Discovery Engine, a market-readiness checker and 3 other procurement tools, plus a pathway-aware quote form with reference-image upload.

| Doc | Purpose |
|---|---|
| [docs/01-research-and-creative-direction.md](docs/01-research-and-creative-direction.md) | Research status (network-restricted), benchmark framework, 3 creative directions, chosen design language |
| [docs/02-sitemap-and-architecture.md](docs/02-sitemap-and-architecture.md) | Sitemap, how to add pages, component library, conversion journeys |
| [docs/03-seo-keyword-map.md](docs/03-seo-keyword-map.md) | Keyword → page map, technical SEO, growth roadmap |
| [docs/04-image-brief.md](docs/04-image-brief.md) | 81 photography slots with shot briefs, and how to swap in photos |
| [docs/05-qa-report.md](docs/05-qa-report.md) | QA results for the first build |
| [docs/06-competitor-research-plan.md](docs/06-competitor-research-plan.md) | 25-site audit set (not live-inspected) and first-principles design decisions |
| [docs/07-gi-research.md](docs/07-gi-research.md) | GI research log: application/certificate numbers, status, confidence |
| [docs/08-transformation-report.md](docs/08-transformation-report.md) | Transformation audit, IA, signature features, quality iterations, weighted scorecard |
| [research/README.md](research/README.md) | Internal supplier/publisher lead database (unverified, never published) |

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

### Live site settings you can change without a rebuild

Edit `site-config.js` at the root of the `gh-pages` branch (GitHub → branch `gh-pages` → `site-config.js` → pencil → Commit). Changes go live in about a minute.

| Setting | What it does |
|---|---|
| `gaId` | Google Analytics 4 measurement ID (`G-…`). Loads GA4 with Consent Mode v2: analytics is denied by default for EEA/UK/CH visitors until they accept the banner, and ad storage is always off. Tracks page views, `generate_lead`, and email/WhatsApp/phone clicks |
| `social` | Full `https://` links to Instagram, LinkedIn, Facebook, YouTube, X or Pinterest. Icons appear in the footer, on Contact and on `/links` as soon as a link is filled in |
| `formEndpoint`, `formAccessKey` | Optional form backend (Formspree or Web3Forms). Without it, forms offer one-tap "Send by email" and "Send on WhatsApp" with the visitor's answers pre-filled |

**Social media and Instagram bio:** use `https://omkar8787.github.io/claude-skills/links?utm_source=instagram&utm_medium=social&utm_campaign=bio` as your bio link. Put UTM tags on the link you post, never on internal links, so Google Analytics attributes visits to the right channel (`utm_source=linkedin`, `facebook` and so on). Articles and the gifting page have share buttons (WhatsApp, LinkedIn, Facebook, X, copy link, plus the native share sheet on phones), and shares are tracked as GA4 `share` events.

**Google Search Console:** add a *URL-prefix* property for `https://omkar8787.github.io/claude-skills/`, choose *HTML file* verification, and upload the `google….html` file to the root of `gh-pages`. Then submit `sitemap.xml`. The auto-deploy keeps that file.

**Automatic deploys:** `.github/workflows/ngb-website-pages.yml` rebuilds and publishes the site whenever files under `projects/ngb-ventures-website/` change, or when you click *Run workflow* in the Actions tab. To add an article, add an entry to `src/content/stories.ts` in the GitHub editor and commit.

### Live static site (GitHub Pages)

The live site is served from the `gh-pages` branch at https://omkar8787.github.io/claude-skills/. To redeploy:

```bash
NEXT_PUBLIC_SITE_URL=https://omkar8787.github.io/claude-skills \
NEXT_PUBLIC_CONTACT_EMAIL=you@domain.com NEXT_PUBLIC_WHATSAPP_NUMBER=91XXXXXXXXXX \
npm run build && npm start &
LIVE_BASE=/claude-skills/ CONTACT_EMAIL=you@domain.com node scripts/export-preview.mjs http://localhost:3000 out-live
# copy out-live/site/* (including .nojekyll) to the gh-pages branch root, then commit and push
```

GitHub Pages is static, so `/api/enquiry` isn't available there and forms show a "contact us by email" notice instead of submitting. For working online forms, deploy to Vercel (below) and point the domain at it.

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

### Enquiry API: lead pathways and uploads
`/quote` posts multipart form data (`type=lead`) with a `pathway` (sourcing, manufacturing, brand, procurement, supplier or general) and a `role` (importer, retailer, publisher and so on). The server derives a routing **category** such as `sourcing / Retailer / United States`. An optional reference file (JPG, PNG, WebP or PDF, ≤ 4 MB) is validated by magic bytes. It's sent as a Resend email attachment, or base64 in the webhook payload if ≤ 2 MB. Files aren't stored on the server.

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
