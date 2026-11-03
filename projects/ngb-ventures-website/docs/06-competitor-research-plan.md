# Competitor research plan: 25 sites (status: not live-inspected)

All 25 domains were unreachable from the build environment (network policy). Web search only returned snippets, which aren't enough to evaluate design, UX, animation, mobile behaviour or performance. **No site has been scored.** The table below is the audit set and what each site is being benchmarked for. `scripts/audit-sites.mjs` (extend its SITES map with these hosts) captures screenshots and structural data for scoring on an unrestricted machine.

| # | Site | URL | Category | Benchmark focus | Inspection status |
|---|---|---|---|---|---|
| 1 | Small World India | smallworldindia.com/industries/apparel | Indian sourcing agent | Industry-page architecture, sourcing-agent positioning | Not inspected (blocked) |
| 2 | IndiaMART | indiamart.com | Indian B2B marketplace | Search-led discovery at scale, supplier trust badges | Not inspected (blocked) |
| 3 | TradeIndia | tradeindia.com | Indian B2B marketplace | Category taxonomy, RFQ flows | Not inspected (blocked) |
| 4 | ExportersIndia | exportersindia.com | Indian exporter directory | Exporter profiles, enquiry forms | Not inspected (blocked) |
| 5 | Alibaba.com | alibaba.com | Global B2B platform | RFQ, verification tiers, trade assurance UX | Not inspected (blocked) |
| 6 | Global Sources | globalsources.com | Global B2B platform | Trade-show-led sourcing, verified manufacturer content | Not inspected (blocked) |
| 7 | Thomasnet | thomasnet.com | Industrial supplier discovery | Capability-based filtering, certifications as filters | Not inspected (blocked) |
| 8 | Europages | europages.com | European B2B directory | Multilingual, country-level discovery | Not inspected (blocked) |
| 9 | HKTDC | hktdc.com | Trade promotion & sourcing | Product discovery + trade-fair integration | Not inspected (blocked) |
| 10 | Faire | faire.com | Wholesale marketplace | Brand storytelling for wholesale, retailer onboarding | Not inspected (blocked) |
| 11 | Ankorstore | ankorstore.com | Wholesale marketplace (EU) | Editorial curation, brand pages | Not inspected (blocked) |
| 12 | 1stDibs | 1stdibs.com | Premium design marketplace | Luxury product photography, provenance storytelling | Not inspected (blocked) |
| 13 | Discover Global | discoverglobal.com | Product development & sourcing | Product-development storytelling | Not inspected (blocked) |
| 14 | Triburg | triburg.co.in | Apparel manufacturing | Manufacturing credibility | Not inspected (blocked) |
| 15 | SOWTEX | sowtex.com | Textile sourcing platform | Supplier ecosystem UX | Not inspected (blocked) |
| 16 | QIMA | qima.com | Inspection & audits | Presenting QA services and pricing transparency | Not inspected (blocked) |
| 17 | Sourcify | sourcify.com | Product development platform | DTC/Amazon conversion journeys | Not inspected (blocked) |
| 18 | Maker's Row | makersrow.com | Manufacturer network (US) | Manufacturer discovery IA | Not inspected (blocked) |
| 19 | Welspun Living | welspunliving.com | Indian home-textile manufacturer | Large-manufacturer storytelling | Not inspected (blocked) |
| 20 | Arvind | arvind.com | Indian textile/apparel group | Corporate manufacturing narrative | Not inspected (blocked) |
| 21 | Li & Fung | lifung.com | Global supply chain | International sourcing positioning | Not inspected (blocked) |
| 22 | Aesop | aesop.com | Luxury editorial retail | Typography, restraint, editorial pacing | Not inspected (blocked) |
| 23 | Linear | linear.app | SaaS (Awwwards-calibre) | Interaction polish, motion restraint | Not inspected (blocked) |
| 24 | Stripe | stripe.com | Fintech | Information architecture for complex offers | Not inspected (blocked) |
| 25 | Apple | apple.com | Consumer tech | Pinned scroll storytelling (reference for the journey section) | Not inspected (blocked) |

## Evaluation template (per site, from evidence only)

Homepage architecture · hero · typography · palette · navigation · product discovery · scrolling behaviour · parallel scrolling · parallax · interactive storytelling · product photography · animation · mobile UX · conversion architecture · lead generation · trust elements · performance · SEO.

Fill in for each site: best design features, best UX features, what makes it memorable, what NGB can learn, what NGB should do differently.

## Design decisions made without competitor evidence (from first principles)

| Decision | Reasoning |
|---|---|
| Single quote form with pathway selector instead of marketplace RFQ | NGB is a service partner, not a marketplace. A supplier directory would require verified data we don't have, and fake listings are prohibited. |
| GI registry numbers shown on cards | Verifiable specificity builds trust better than generic badges, and it differentiates from directory-style competitors. |
| Pinned journey + horizontal spotlight | Explains five divisions without long copy. Both have non-pinned mobile and reduced-motion fallbacks (no scroll hijacking). |
| Deep forest green added to charcoal, ivory and bronze | Requested by the brief. Used only for 'purpose' moments (Source Anything, DOBE, Atlas page) so it keeps its meaning. |
