# NGB Ventures transformation report: "India to the World. From Concept to Commerce."

Date: 3 Nov 2026 · Scope: the master brief "Ultimate Website Transformation"

## Phase 1: audit of the previous build

| Area | Before | Weakness | Action |
|---|---|---|---|
| Positioning | Sourcing agent and manufacturing partner | Read like a service list. No brand, advertising or inclusive-procurement story | New five-division model and messaging system (`src/content/site.ts`, `divisions.ts`) |
| Homepage | Editorial, but conventional section stack | Hero didn't explain the full business. No signature interactions | Parallax hero mosaic, parallel-scrolling manifesto, pinned Source→Export journey, horizontal spotlight, Source Anything band, Atlas, Origin Collection, before/after brand demo |
| Discovery | Industry and product guides only | No way to browse "what India makes" | Product Discovery Engine (filters by state, category, GI status, type, customisation) |
| Regional | Cluster pin map | No state-level view, no GI linkage | India Manufacturing Atlas (state geometry, panels, GI chips, regional sourcing CTA) |
| GI | Unverified GI mentions in cluster copy | Risk of over-claiming | 18 GI records with application/certificate numbers, status, confidence and sources. Cluster copy corrected |
| Leads | Separate enquiry, contact and product-development forms | No uploads, no audience pathways, no confirmation page | One pathway-aware quote form with image/PDF upload, role categorisation and a `/thank-you` confirmation |
| Brand/ads | Absent | Major revenue division missing | Brand Development and Advertising pages, concept portfolio clearly labelled as fiction |
| DOBE | Absent | Supplier-diversity story missing | Inclusive Procurement page with an accurate "application underway" status and no badge |

## Messaging system

- **Hero:** The world wants more from India.
- **Positioning:** Your global sourcing desk in India.
- **Philosophy:** If it's made in India, we can help you find it. Always paired with "every request starts with an honest feasibility assessment."
- **Promise:** Anything from India. Everything from concept to commerce.
- **Sign-off:** India to the world. From concept to commerce.

## Information architecture (17 required sections → routes)

Home `/` · About `/about` · Our Capabilities `/capabilities` · India Sourcing `/india-sourcing` · Product Discovery `/discover` · India Manufacturing Atlas `/atlas` · GI & Origin Collection `/origin` (+18 detail pages) · Manufacturing & Private Label `/manufacturing-private-label` · Global Export Solutions `/export` · Brand Development `/brand-development` · Advertising & Marketing `/advertising` · Inclusive Procurement / DOBE `/inclusive-procurement` · Industries We Serve `/industries` · Publishers & Printing `/publishers-printing` · Insights & Research `/insights` · Contact `/contact` · Request a Quote `/quote`.

The site also keeps 16 industry, 9 product, 21 cluster, 8 market and 12 service pages, plus the guides and 4 tools. In total there are **113 indexable URLs**, all statically generated. Old routes 301-redirect: `/resources`, `/enquire`, `/product-development`.

## Signature experiences (brief §16)

| # | Feature | Where | Notes |
|---|---|---|---|
| 1 | India Product Discovery Engine | `/discover` | Filters: search, state, category, product type, GI status, customisable. Empty state leads to a sourcing request |
| 2 | India Manufacturing Atlas | `/atlas`, homepage | 36 state/UT shapes, 12 profiled states. Keyboard accessible. URL hash per state. Lazy-loaded on the homepage |
| 3 | Source Anything from India | Homepage quick-start → `/quote` | Pre-fills the quote form. Image/PDF upload (4 MB, magic-byte validation) |
| 4 | India's Origin Collection | `/origin`, `/origin/[slug]` | All 16 fields per brief §9, with status labels and sources |
| 5 | Brand Launch Studio | `/brand-development`, homepage | Factory-to-customer journey and before/after slider (fictional concept, labelled) |
| 6 | Global Market Readiness | `/tools/market-readiness` | Rules engine: 7 destinations × 11 product attributes. Not legal advice |
| 7 | Product Spotlight | Homepage horizontal gallery | 10 products. Pinned horizontal scroll on desktop, swipe on mobile, reduced-motion fallback |
| 8 | Manufacturer & publisher discovery | `/publishers-printing` + internal `research/suppliers.json` | Public page classifies partner types. 46 unverified leads stay internal, as required |

**Motion stack:** Motion (Framer Motion) `useScroll`/`useTransform` covers ScrollTrigger-style pinning, parallax and scrubbing. GSAP wasn't added, to avoid a second animation runtime (~60 KB). All effects respect `prefers-reduced-motion`. Nothing hijacks scroll.

## Quality iterations

| Round | Findings | Fixes |
|---|---|---|
| 1 | Spotlight didn't translate (scroll hook bound to a null ref); journey numeral collided with the title; "0 market" label; 16px mobile overflow on the Atlas | Ref always mounted; numeral replaced by a stage label; "on request" label; `min-w-0` on grid columns; legend moved out of the map box |
| 2 | Homepage lacked self-selection for the nine audiences in brief §19 | "Choose your path" section with six pathways mapped to pre-typed forms |
| 3 | Mobile homepage Lighthouse perf 61 (TBT 940 ms); contrast on manifesto lines; heading order; overlapping map targets | Atlas lazy-loaded on viewport approach (perf 82, TBT ~230 ms); contrast ≥ 3:1; h2 hierarchy; marker spacing |

## Verification evidence (production build, headless Chromium)

- **Crawl:** 113 sitemap URLs × 2 viewports. 0 broken internal links, 0 horizontal overflow, 0 JS errors, 1 H1 per page, canonicals present, 0 duplicate titles.
- **Lead flow:** homepage quick-start pre-filled the quote form; a PNG upload was delivered to the webhook as a signed attachment; the lead category was "sourcing / Retailer / United States"; the user was redirected to `/thank-you` with the reference.
- **Server-side upload rejection:** a disguised text file is refused (magic bytes); a 5 MB file gets 413; an invalid role gets 422.
- **Lighthouse (mobile / desktop):**

| Page | Mobile (perf / a11y / BP / SEO) | Desktop (perf / a11y / BP / SEO) |
|---|---|---|
| / | 82 / 93→fixed / 100 / 100 | 99 / 97 / 100 / 100 |
| /atlas | 90 / 98 / 100 / 100 | 99 / 98 / 100 / 100 |
| /origin/darjeeling-tea | 92 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| /quote | 89 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| /discover | 90 / 98 / 100 / 100 | 100 / 98 / 100 / 100 |
| /inclusive-procurement | 89 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |

## Scorecard (brief §24): self-assessed, not independently verified

| Category | Weight | Score (0–10) | Weighted | Why it isn't higher |
|---|---|---|---|---|
| Visual design | 15 | 8 | 12.0 | No real photography yet. The illustrated plate system is consistent and premium, but it isn't cinematic imagery of artisans and factories |
| UI/UX | 15 | 8.5 | 12.8 | Signature interactions shipped. Site-wide search and saved enquiries are still missing |
| Brand positioning | 10 | 8.5 | 8.5 | Clear five-division story. Proof (team, real case studies) pending |
| Content quality | 10 | 8.5 | 8.5 | Complete copy, no lorem ipsum. Some regional profiles are concise |
| Interactive experience | 10 | 9 | 9.0 | Eight signature features working, with mobile and reduced-motion fallbacks |
| Sourcing & GI research | 10 | 6 | 6.0 | 18 GI records with sources, but none verified on the live registry. 46 of 100+ supplier leads, all unverified. 0 of 25 competitor sites inspected (network blocked) |
| Lead generation | 10 | 9 | 9.0 | Pathways, upload, categorisation, confirmation, spam protection. A delivery channel still needs configuring |
| Mobile responsiveness | 5 | 9 | 4.5 | No overflow. Map targets are dense on small screens, with chip-list alternatives |
| SEO | 5 | 9 | 4.5 | Full technical SEO. Keyword volumes unvalidated |
| Technical performance | 5 | 8.5 | 4.3 | Desktop 99–100. Mobile 82–92 |
| Trust & credibility | 5 | 7 | 3.5 | Honest labelling throughout. Registration details, team and real proof still to add |
| **Total** | **100** | | **≈ 82.6 / 100** | |

**What would move it to 95+:**
1. A real photography and video shoot (artisans, Pune engineering, packing, shipping).
2. Live verification of GI records, plus documents-verified suppliers.
3. A live competitor audit, with design adjustments based on its evidence.
4. Real case studies and team profiles.
5. A configured CRM, email and analytics stack.
6. Site search.

---

## Round 4 (owner feedback, 3 Nov 2026): palette, categories, gifting, content, analytics

| Feedback | Change |
|---|---|
| "Too dark" (near-black sections), then "too bright" (sand) | Theme token system with three palettes rendered on the real site. The owner chose **A · Indigo & Saffron**: chai-cream base (`#ece3d3`), deep indigo feature sections (`#1d2a45`), saffron-brass accents (`#dba35a`), teal accent sections. Switch with `data-theme` on `<html>` (`a`, `b` Peacock & Terracotta, `c` Clay & Olive) |
| Before/after slider had spacing issues | Replaced with **Brand Studio**: a four-stage, auto-playing, keyboard-accessible demonstration (factory sample → positioning → identity & packaging → sell-ready listing), labelled as a fictional concept |
| "More than handicrafts" | Spotlight grew from 10 to 23 products (food, nutrition, gifting, leather, jewellery, ceramics, rugs). New homepage "one-stop desk" grid with 12 categories |
| Corporate gifting | `/corporate-gifting` landing page, plus Food, Spices & Nutrition and Corporate & Premium Gifting industry pages |
| SEO content | 10 new stories and buyer guides with Article JSON-LD, keywords and related links; RSS feed at `/insights/feed.xml` |
| Analytics without a rebuild | GA4 via `site-config.js` with Consent Mode v2 (EEA/UK/CH opt-in), lead, search and contact-click events; privacy policy updated |
| Forms on a static host | Optional Formspree or Web3Forms endpoint; otherwise one-tap email or WhatsApp with the visitor's answers pre-filled |
| Missing site search | `/search` page with a weighted client-side index of about 190 entries, a header search button, and an empty state that leads to a sourcing request |
| Deployment | GitHub Actions workflow rebuilds and publishes `gh-pages` on every source change and preserves owner-edited settings |

**Performance:** the film-grain noise filter was the mobile LCP element. It is now desktop-only, and below-the-fold homepage sections use `content-visibility: auto`. Mobile homepage Lighthouse performance rose from 76 to 84 on the same build.
