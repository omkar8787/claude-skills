# QA report

Test environment: production build (`next build && next start`), headless Chromium (Playwright) and Lighthouse 12 (simulated throttling). Date: 2026-11-03.

## 1. Automated crawl: all 84 sitemap URLs at 390 px and 1440 px

| Check | Result |
|---|---|
| HTTP 200 for every sitemap URL | ✅ 84/84 (×2 viewports) |
| Internal links (85 unique) return < 400 | ✅ 0 broken |
| Horizontal overflow | ✅ 0 pages at 390 px or 1440 px |
| JavaScript errors / console errors | ✅ 0 |
| Exactly one `<h1>` per page | ✅ |
| Canonical present | ✅ |
| Title ≤ 70 chars, description 50–170 chars | ✅ (after `seoTitle` / `seoDescription` normalisation) |
| Duplicate titles | ✅ none |
| `<img>` without alt | ✅ none |

## 2. Functional tests

| Feature | Test | Result |
|---|---|---|
| Mega menu | Hover "Industries" | ✅ 16 links + featured CTA |
| Mobile menu | Open → expand Industries → navigate | ✅ routes to `/industries/furniture-woodcraft` |
| Enquiry builder | Validation on step 1; prefill from `?industry=apparel&market=usa&type=private-label`; full 5-step submit | ✅ errors shown; category, country and customisation pre-filled; success with reference ID |
| Webhook delivery | Payload received by local receiver | ✅ JSON body + valid `X-NGB-Signature` HMAC |
| No channel configured | POST valid enquiry | ✅ `503 not_configured`; UI shows fallback (no fake success) |
| Validation | Bad email, missing fields | ✅ `422` with field errors |
| Honeypot / fast submit | Filled hidden field; submit < 2.5 s | ✅ silently accepted, not delivered |
| Cross-origin / wrong content type | `Origin: evil.example`; form-encoded body | ✅ `403`; `415` |
| Rate limit | 7 rapid posts from one IP | ✅ 5 × 200, then 429 |
| Landed-cost estimator | Unit 4 × 1000, freight 800, insurance 40, UK CIF, duty 12%, VAT 20%, other 150 | ✅ **$6,654.96**, matching the hand calculation (CIF 4,840 + duty 580.80 + VAT 1,084.16 + 150) |
| CBM calculator | 60×40×40 cm × 100 cartons, 12 kg | ✅ 9.600 m³, 1,200 kg, air chargeable 1,600 kg (÷6000), 9.6 RT |
| Supplier checklist | 5 Yes + 1 No in one section, reload | ✅ 83% and state persists (localStorage) |
| Cluster map | Click pins and chips; industry filter | ✅ panel updates; route line animates; filter dims non-matching |
| World markets | Click regions and tabs | ✅ market cards update |

## 3. Lighthouse (production build, simulated throttling)

| Page | Device | Perf | A11y | Best practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|---|
| `/` | Mobile | 82 | 97 | 100 | 100 | 3.8 s | 0 | 290 ms |
| `/` | Desktop | 99 | 97 | 100 | 100 | 1.0 s | 0 | 20 ms |
| `/industries/apparel` | Mobile | 91 | 100 | 100 | 100 | 3.1 s | 0 | 190 ms |
| `/industries/apparel` | Desktop | 100 | 100 | 100 | 100 | 0.7 s | 0 | 10 ms |
| `/products/brass-home-decor` | Mobile | 89 | 100 | 100 | 100 | 3.2 s | 0 | 250 ms |
| `/markets/usa` | Mobile | 96 | 100 | 100 | 100 | 2.6 s | 0 | 110 ms |
| `/tools/cbm-calculator` | Mobile | 95 | 100 | 100 | 100 | 2.9 s | 0 | 100 ms |
| `/manufacturing` | Mobile | 93 | 96 | 100 | 100 | 2.6 s | 0 | 230 ms |
| `/enquire` | Mobile | 93 | 96 | 100 | 100 | 3.1 s | 0 | 150 ms |

**What changed during QA.** The first homepage run on mobile scored 76 with a 4.6 s LCP and 216 KB of gzipped HTML. Four fixes brought it to 82 and 56 KB:
- Map SVGs moved out of the HTML and RSC payload into cached static files.
- The hero animations now use CSS that starts at first paint instead of waiting for hydration.
- Procedural plates were slimmed.
- An unused font weight was dropped.

`/enquire` CLS went from 0.176 to 0 by removing a Suspense fallback.

**Remaining:**
- **Homepage mobile LCP of 3.8 s.** The LCP is the hero text. The remaining delay is the display web font swap under 4× CPU throttling plus homepage JS (Motion and two interactive maps). Next steps, if needed:
  - lazy-load `ClusterExplorer` and `MarketsExplorer` with `next/dynamic` on viewport entry;
  - adopt Motion's `LazyMotion` / `m` components (~20–30 KB less JS);
  - subset Cormorant to the hero glyphs.
- **Map pins `target-size`.** Some pins in dense areas (Agra, Firozabad, Kannauj) are closer than 24 px. WCAG 2.2 SC 2.5.8 allows this when an *equivalent* control exists, and the full-size chip list under each map provides one.

## 4. Accessibility checks

- Skip link, visible focus rings, keyboard-operable menus (Escape closes them), `aria-expanded`, `aria-pressed` and `aria-live` on dynamic panels.
- Every form field has a label. Errors use `role="alert"` and link to fields via `aria-describedby`. The consent checkbox is labelled.
- `prefers-reduced-motion` disables all animation, including the CSS hero reveals and the ticker.
- Contrast: the small-text and bronze tokens were re-mapped after the Lighthouse findings (bronze-ink `#7A5C33`, `#8A6A3F` for italic display on light backgrounds, ivory ≥ 55% on charcoal).

## 5. Creative-director review (self-critique, iterative)

Each round was reviewed in the browser, then fixed in code.

| Round | Finding | Action |
|---|---|---|
| 1 | Hero headline wrapped to 6 lines, pushing the lede and CTAs below the fold | Re-set the scale (clamp 2.9–6.6 rem) and the line breaks. The hero now fits at 1440×900 and 390×844 |
| 1 | Art plates read as **wallpaper swatches**: tasteful but generic and placeholder-like | Designed 31 engraved line illustrations (garment, vase, chair, gem, gear…) composed as catalogue "plates" with halo, shadow line and texture. Each card now says what it is |
| 1 | Wide industry cards too tall; UK/Europe map labels collided; Middle East arc looped | Adjusted aspect ratios, label anchoring and arc curvature |
| 2 | Orphaned cluster card in 4-item rows | Adaptive grid columns (2/3/4) |
| 2 | Plate captions in inner heroes duplicated the meta row | Removed |
| 2 | Hero felt static | Slow background drift, plus a coordinate "ledger" ticker as a typographic interlude |
| 2 | No conversion path deep in long mobile pages | Discreet sticky mobile CTA, shown after the hero and hidden near the footer and on form pages |
| 3 | Lighthouse contrast, `dl` structure and button-name issues | Fixed (see §4) |

### Honest scoring against the brief's targets

| Parameter | Target | Self-assessment | Why it isn't higher |
|---|---|---|---|
| Visual design | 10 | **8** | Without real photography the site can't fully deliver the "cinematic manufacturing" feel. The plate system is a strong, consistent stand-in, not a replacement |
| UX & navigation | 10 | **8.5** | Search is missing. A site search or command palette over 84 pages would help procurement users |
| Responsive | 10 | **9** | No overflow anywhere. The map pin density on small screens relies on the chip list |
| Brand positioning | 10 | **8** | Credible and restrained, but real proof (team, case studies, registrations) is pending and deliberately not invented |
| Conversion architecture | 10 | **8.5** | Context-aware enquiries and five journeys are in place. Still to add: analytics/CRM attribution, a calendar booking option, and a WhatsApp number (env) |
| SEO foundations | 10 | **9** | Technically complete. Keyword volumes are unvalidated and content depth will need to grow |
| Performance | 9+ | **8.5** | Desktop 99–100. Mobile 82–96 |
| Maintainability | 10 | **9** | Typed content model, reusable templates, lint and type-check clean. Unit and E2E tests aren't committed (the QA scripts were run ad hoc) |

These are self-assessments against stated targets, not independently verified scores.

## 6. Known limitations

1. **Competitor research could not be performed live.** All reference domains were blocked by the build environment's network policy. Benchmark scores are deliberately left blank. Run `scripts/audit-sites.mjs` on an unrestricted machine, then revisit design decisions against that evidence.
2. **No photography.** See `docs/04-image-brief.md`. This is the single biggest lever for visual quality.
3. **Trade-policy notes** (US tariffs, India–UK CETA, EU–India FTA) are dated November 2026 and must be reviewed regularly.
4. **In-memory rate limiting** is per instance. Use Redis for horizontally scaled hosting.
5. **Legal pages are drafts.**
