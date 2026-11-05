# NGB Ventures: research status and creative direction

> **Read this first: research limits.** This build ran in a sandboxed cloud environment whose network policy blocked every competitor and inspiration domain. Blocked hosts included `smallworldindia.com`, `discoverglobal.com`, `triburg.co.in`, `sowtex.com`, `unsplash.com` and `images.unsplash.com`. Web search returned only third-party directory snippets.
> **None of the websites below have been live-inspected.** Following the brief ("Never pretend to have inspected it"), this document:
> 1. records the audit set and why each site is in it,
> 2. leaves every benchmark score empty (`—`) until evidence exists,
> 3. includes an automated audit harness (`scripts/audit-sites.mjs`). Run it from any machine with normal internet access and it produces the screenshots and structural data the scores need,
> 4. derives the creative direction from first principles: the buyer's decision process, category conventions and the brief. It does not cite unverified observations.

---

## 1. Audit set (13 sites + 4 cross-industry benchmarks)

| # | Site | Category | Why it is in the set | Inspection status |
|---|------|----------|----------------------|-------------------|
| 1 | smallworldindia.com | Indian buying/sourcing agent | Named reference; industry-page architecture | Blocked (DNS denied) |
| 2 | discoverglobal.com | Product development & sourcing | Named reference; product-development storytelling | Blocked |
| 3 | triburg.co.in | Apparel manufacturing/sourcing | Named reference; manufacturing credibility | Blocked |
| 4 | sowtex.com | B2B textile sourcing platform | Named reference; supplier-ecosystem UX | Blocked |
| 5 | globalsources.com | B2B discovery platform | Category leader in product discovery and search | Not attempted after policy block |
| 6 | indiamart.com | Indian B2B marketplace | Domestic benchmark for search-led discovery | Not attempted |
| 7 | qima.com | Inspection & audits | Benchmark for presenting QA/audit services | Not attempted |
| 8 | sourcify.com | Product development platform (US) | DTC/Amazon-seller conversion journeys | Not attempted |
| 9 | makersrow.com | Manufacturer network (US) | Manufacturer-network IA | Not attempted |
| 10 | welspunliving.com | Indian home-textile manufacturer | Large-manufacturer presentation | Not attempted |
| 11 | arvind.com | Indian textile/apparel manufacturer | Corporate manufacturing storytelling | Not attempted |
| 12 | shahi.co.in | Indian apparel exporter | Apparel-export credibility signals | Not attempted |
| 13 | lifung.com | Global supply-chain orchestrator | International sourcing positioning | Not attempted |
| B1 | aesop.com | Luxury editorial retail | Editorial typography, restraint | Not attempted |
| B2 | linear.app | SaaS | Interaction polish, motion restraint | Not attempted |
| B3 | stripe.com | Fintech | Information architecture for complex offerings | Not attempted |
| B4 | apple.com | Consumer tech | Scroll storytelling, whitespace | Not attempted |

After the first four hosts failed, the environment's own guidance said to stop trying new hosts. So sites 5–13 and B1–B4 have no inspection attempt and no data.

### How to finish the audit (about 10 minutes on an unrestricted machine)

```bash
cd projects/ngb-ventures-website
node scripts/audit-sites.mjs            # writes docs/audit/<site>/{desktop,mobile}-*.png + audit.json
```

For each site and up to three pages, the harness captures desktop (1440px) and mobile (390px) screenshots. It also records the title/meta description, canonical, H1–H3 outline, nav labels, CTA candidates, form count, JSON-LD `@type`s, image count, horizontal-overflow check, and approximate load timing. Score the matrix below from that evidence only.

## 2. Benchmark matrix (scores pending evidence)

| Site | Visual 20% | UX 15% | Brand 15% | Content arch. 10% | Lead gen 15% | SEO arch. 10% | Interactive 10% | Mobile 5% | Weighted |
|------|---|---|---|---|---|---|---|---|---|
| All 17 sites | — | — | — | — | — | — | — | — | — |

**Scoring rubric:** every score needs at least one artefact (a screenshot, an `audit.json` field, or a quoted URL).
- 9–10: best-in-class, no material defects.
- 7–8: strong, with minor defects.
- 5–6: category-typical.
- 3–4: clear defects such as broken mobile, no schema, or buried CTAs.
- 1–2: fails the criterion.

The "Best of" awards (visual design, sourcing positioning, manufacturing presentation, industry architecture, product discovery, enquiry, navigation, motion, mobile) also stay empty until scored.

## 3. First-principles analysis (no site-specific claims)

The site has to win on the buyer's actual decision process, not on looks alone.

| Buyer question (in order) | What usually fails in the category | NGB response built into this site |
|---|---|---|
| "Can India make my product?" | Long lists of categories with no depth | 16 industry pages, each with product types, clusters, capabilities, customisation and compliance |
| "Where exactly, and who?" | Vague "pan-India network" claims | Named, verifiable clusters with coordinates and specialisations; no fake supplier directory |
| "Can I trust this intermediary?" | Stock-photo trust badges, unverifiable numbers | Process transparency (7 steps, what the buyer receives at each), explicit placeholders instead of invented stats |
| "What will it really cost?" | No pre-sales tools | Landed-cost estimator (user-entered duty, explicit valuation basis) + CBM/container calculator |
| "Is it compliant in my market?" | Generic "we ensure quality" | Per-industry and per-market compliance considerations, framed as items to verify |
| "How do I start?" | One generic contact form | Context-aware enquiry builder pre-filled from the page the buyer came from (industry/product/market) |

**Category conventions worth breaking:**
1. Teal or blue corporate palettes and generic globe imagery. Replaced with charcoal, ivory and bronze plus trade-document typography.
2. Carousels in the hero. Replaced with one confident statement.
3. Numeric trust claims with no source. Replaced with transparent method and placeholders.
4. Brochure-only sites. Replaced with working procurement tools.

## 4. Three creative directions

| | **A: Luxury editorial** | **B: Tech-driven platform** | **C: Premium industrial & trade** |
|---|---|---|---|
| Homepage | Magazine spreads, full-bleed plates, slow pacing | Dashboard-like modules, search-first, product UI | Heavy grid, large numerals, ledger and manifest motifs |
| Typography | Cormorant Garamond display + Manrope | Inter Tight + JetBrains Mono | Condensed grotesk (e.g. Barlow Condensed) + IBM Plex Mono |
| Palette | Ivory, charcoal, bronze | Off-white, near-black, electric accent | Graphite, steel, safety-amber accent |
| Hero | Oversized serif statement over a cinematic plate | Search bar ("What do you want to manufacture?") + live UI preview | Monumental type on a container or port image, coordinate data |
| Image treatment | Warm, grainy, editorial crops, plate numbering | Clean cut-outs, UI shots | High-contrast documentary, duotone |
| Navigation | Quiet text nav, editorial mega menu with imagery | Command-palette style, dense mega menu | Bold uppercase nav, indexed mega menu |
| Motion | Slow reveals, mask wipes, subtle parallax | Snappy micro-interactions, spring physics | Mechanical: counters, line draws, ticker |
| Industry cards | Tall portrait plates, serif titles, hover zoom + caption | Compact tiles with tags and filters | Indexed rows (01–16) with spec data |
| Mobile | Single-column story, sticky enquiry pill | App-like bottom sheet | Accordion index, sticky CTA bar |
| Risk | Can feel like fashion/retail rather than B2B | Feels like SaaS; weak on craft and heritage | Can feel cold; weak for handicraft and décor buyers |

### Recommendation: **"Atelier & Ledger"**, a deliberate A + C hybrid

- **Why not A alone:** procurement managers need data density and process clarity. Pure editorial under-serves them.
- **Why not B:** NGB is a sourcing partner, not a software marketplace. A platform look would also imply supplier listings that don't exist, which the brief rules out.
- **Why A + C:** two-thirds of the 16 categories are craft-led (textiles, décor, wood, brass, jewelry). These buyers respond to editorial craft storytelling (A). The B2B buyer journey still needs C's trade precision: coordinates, HS-code fields, step numbering, document-style labels.
- **The device that ties it together:** every image is a numbered **plate** (`PL. 04 — Knitwear · Tirupur`). Every data point uses mono "ledger" typography (`11.11°N 77.34°E`). The bronze rule line runs through both, like a thread.

**Design language**

| Token | Value | Use |
|---|---|---|
| Charcoal | `#151515` | Dark sections, text |
| Ink | `#1F1D1A` | Elevated dark surfaces |
| Ivory | `#F6F3ED` | Primary background |
| Paper | `#ECE6DB` | Secondary surfaces |
| Bronze | `#A98758` | Accents, rules, large text only (contrast 2.9:1 on ivory) |
| Bronze-ink | `#7A5C33` | Small bronze text on ivory (≥ 5.1:1) |
| Stone | `#77746F` | Meta text on dark backgrounds; `#5F5C57` on ivory for AA |
| Display | Cormorant Garamond 400/500 + italic | H1–H3, pull quotes |
| UI/body | Manrope 400–700 | Navigation, body, forms |
| Ledger | IBM Plex Mono 400/500 | Labels, coordinates, step numbers, data |

Type scale: clamp-based, from 13px (ledger) up to `clamp(3.25rem, 8vw, 8.5rem)` for hero display. Spacing runs on an 8px base, with section rhythm at 96/128/160px desktop and 64/80px mobile.

## 5. Patterns NOT to copy

- Unsourced numeric claims ("10,000+ suppliers") and client-logo walls without permission.
- Auto-generated city × product SEO pages with spun copy.
- Pop-up lead capture on entry. WhatsApp bubbles that cover mobile CTAs.
- Fake "verified supplier" directories.
- Hotlinked competitor imagery.

## 6. Photography status

Stock-photo hosts were also blocked, so licensed photography couldn't be sourced or visually checked. The site ships an art-directed **plate system** instead: original SVG motifs (weave, block print, jali, wood grain, brass radial, botanical, facet and blueprint) layered with tonal gradients and grain. Each plate has a photo brief. Dropping a licensed photo at `public/media/<slot>.jpg` swaps it in automatically, with no code changes. See `docs/04-image-brief.md`.
