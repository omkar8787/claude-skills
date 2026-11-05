# SEO architecture and keyword-to-page map

> Search volumes and difficulty were **not** measured. Keyword research tools weren't reachable from the build environment. Validate priority with Ahrefs, Semrush or Google Keyword Planner (country = US, UK, DE, AU) before content investment.

## Keyword → landing page

| Keyword cluster (intent) | Primary page | Supporting pages |
|---|---|---|
| sourcing agent India · India sourcing company · product sourcing India | `/` | `/services/supplier-identification`, `/resources/how-to-source-from-india` |
| manufacturers in India · Indian export suppliers · wholesale suppliers India | `/industries` | all `/industries/*` |
| private label manufacturers India | `/services/private-label-manufacturing` | `/products/cotton-tshirts`, `/industries/beauty-personal-care` |
| OEM manufacturers India · ODM India | `/services/oem-odm-coordination` | `/industries/engineering-industrial`, `/manufacturing/pune`, `/manufacturing/rajkot` |
| apparel manufacturers India · t-shirt manufacturer Tirupur | `/industries/apparel` | `/products/cotton-tshirts`, `/manufacturing/tirupur` |
| home decor manufacturers India · handicraft manufacturers India | `/industries/handicrafts` | `/products/brass-home-decor`, `/products/wooden-handicrafts`, `/manufacturing/moradabad` |
| essential oil manufacturers India · bulk essential oils India | `/industries/essential-oils` | `/products/essential-oils`, `/manufacturing/kannauj` |
| natural loofah manufacturers India | `/products/natural-loofah` | `/industries/eco-friendly` |
| India sourcing company for USA | `/markets/usa` | `/tools/landed-cost-calculator` |
| Indian manufacturers for Amazon FBA | `/services/private-label-manufacturing` | `/markets/usa`, `/enquire?type=private-label&market=usa` |
| landed cost calculator · CBM calculator | `/tools/landed-cost-calculator`, `/tools/cbm-calculator` | `/resources/incoterms-for-india-imports` |
| <city> manufacturers (Tirupur, Moradabad, Jaipur…) | `/manufacturing/<city>` | linked industry pages |

## Implemented technical SEO

| Item | Implementation |
|---|---|
| URLs | Lowercase, hyphenated, hierarchical (`/industries/home-textiles`) |
| Titles / descriptions | Unique per page. `seoTitle()` caps titles at about 65 chars and `seoDescription()` at about 158 chars. QA found 0 duplicate titles |
| Canonicals | Absolute canonical on every page (`NEXT_PUBLIC_SITE_URL`) |
| Sitemap / robots | `/sitemap.xml` (84 URLs, priorities by type) and `/robots.txt` (disallows `/api/`) |
| Breadcrumbs | Visible plus `BreadcrumbList` JSON-LD on every inner page |
| Structured data | `Organization` + `WebSite` (global), `Service` (industries, products, services, markets), `FAQPage` (all FAQ blocks), `Place` + `GeoCoordinates` (clusters), `ItemList` (listings), `Article` (guides), `WebApplication` (tools) |
| Product schema | **Intentionally not used.** Google requires offers, ratings or price for Product rich results, and inventing them would be misleading. `Service` is the accurate type for a sourcing business |
| FAQ rich results | Markup is valid, but since 2023 Google only shows FAQ rich results for authoritative government and health sites. It is kept for semantic clarity and AI-answer surfaces |
| Open Graph | Per-page OG/Twitter metadata plus a generated `/opengraph-image` |
| Internal linking | Industry ↔ cluster ↔ product ↔ market ↔ service cross-links, related-industry grids, footer index of 16 industries, 12 services and 8 markets |
| Performance | Fully static (SSG) pages. Fonts self-hosted via `next/font`. No third-party scripts by default. Images through `next/image` once photos are added. Shared JS is 103 kB; first load on content pages is ~190 kB |

## Growth roadmap (in priority order)

1. **Validate keywords** and add product guides where demand exists (e.g. hand block-printed textiles, coir mats, leather bags, kantha throws). Each one needs original specs and FAQs.
2. **Google Search Console + Bing Webmaster**: submit the sitemap and monitor coverage and queries.
3. **Case studies** (only real, permissioned projects). These are the strongest trust and conversion content.
4. **Market × industry pages** (e.g. `/markets/usa/apparel`) *only* when each can carry unique regulatory and buyer content. Avoid combinatorial thin pages.
5. Earn links through original resources (landed-cost methodology, cluster guides) and Indian export-promotion-council listings.
