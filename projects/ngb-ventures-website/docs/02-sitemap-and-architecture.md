# Sitemap, information architecture and component system

## Sitemap (84 indexable URLs at launch)

```
/                                   Home (11 sections)
├── /about
├── /industries                     16 industry landing pages
│   └── /industries/[slug]          apparel, home-textiles, handicrafts, furniture-woodcraft, jewelry-accessories,
│                                   essential-oils, beauty-personal-care, packaging, eco-friendly, lighting,
│                                   kitchenware-tableware, footwear-leather, sports-fitness, toys-educational,
│                                   stationery-paper, engineering-industrial
├── /products                       9 product guides
│   └── /products/[slug]            cotton-tshirts, organic-cotton-bags, jute-bags, natural-loofah, brass-home-decor,
│                                   wooden-handicrafts, bamboo-products, essential-oils, cotton-bath-towels
├── /manufacturing                  interactive India cluster explorer (filterable)
│   └── /manufacturing/[slug]       21 clusters (12 featured + 9 specialist)
├── /services
│   └── /services/[slug]            12 services
├── /markets                        interactive world map
│   └── /markets/[slug]             usa, uk, germany, france, netherlands, australia, canada, uae
├── /resources                      tools + guides hub
│   └── /resources/[slug]           how-to-source-from-india, incoterms-for-india-imports
├── /tools/landed-cost-calculator
├── /tools/cbm-calculator
├── /tools/supplier-evaluation-checklist
├── /enquire                        5-step sourcing enquiry builder (prefill: ?industry= ?product= ?market= ?cluster= ?type=)
├── /product-development            product development request
├── /contact
├── /privacy, /terms                drafts for counsel review
├── /sitemap.xml, /robots.txt, /opengraph-image
└── /api/enquiry                    POST only (validated, rate-limited, spam-filtered)
```

## Adding pages without code

All content lives in typed data files under `src/content/`. Templates call `generateStaticParams`, so adding an object to an array creates a fully built page. It also adds the page to the sitemap, navigation menus, footer, cross-links and JSON-LD.

| To add | Edit | Required fields (see `src/content/types.ts`) |
|---|---|---|
| Industry | `industries.ts` | slug, name, index, intro, products, clusterSlugs, capabilities, customization, quality, compliance, faqs, related, plate |
| Product | `products.ts` | slug, industry, overview, variants, specs, customization, quality, compliance, moqNote, faqs, plate |
| Cluster | `clusters.ts` | slug, lat/lon (WGS84), specialization, detail, products, industrySlugs, buyerNotes, plate |
| Market | `markets.ts` | slug, code, intro, considerations, tradeNote (dated), officialTools, faqs, plate |
| Service | `services.ts` | slug, involves, deliverables, bestFor, faqs, plate |
| Guide | `guides.ts` | slug, sections, updated |

**Content quality gate:** don't publish a page unless it carries original, specific information. Thin or templated pages hurt the whole domain's rankings. The type system enforces structure, and editors enforce substance.

**CMS path:** the data files are shaped like CMS documents. To hand editing to non-developers, move them to Sanity, Contentful or Payload with the same schema and swap the imports for fetches. The templates stay unchanged.

## Component library

| Layer | Components |
|---|---|
| Layout | `Header` (transparent→solid, hide-on-scroll, 4 mega menus, full-screen mobile sheet), `Footer`, `MobileCtaBar`, `WhatsAppButton` (env-gated) |
| UI primitives | `Plate` (photo-or-art media), `glyphs` (31 engraved illustrations), `Reveal` / `MaskLines` (motion), `SectionHead`, `Breadcrumbs` (+ JSON-LD), `Placeholder` (dev-only fact gaps) |
| Sections | `PageHero`, `IndustryGrid`, `ServicesLedger`, `ProcessTimeline` (scroll-linked), `ClusterCards`, `ProductCards`, `IntroBlock`, `NumberedList`, `CapabilityGrid`, `TwoLists`, `ComplianceGrid`, `WorkflowStrip`, `InlineCta`, `CtaBand`, `Faq` (+ FAQPage JSON-LD), `LedgerTicker` |
| Maps | `ClusterMap` → `IndiaMapBase` (server SVG) + `ClusterExplorer` (client), `WorldMarkets` → server dot-matrix + `MarketsExplorer` (client) |
| Forms | `EnquiryBuilder`, `ContactForm`, `ProductDevelopmentForm`, shared `useEnquiry`, `Field`, `Consent`, `AntiSpam`, `StatusPanel` |
| Tools | `LandedCost`, `CbmCalculator`, `SupplierChecklist` |

## Design tokens

These are defined in `src/app/globals.css` (`@theme`). Colour: charcoal `#151515`, ink `#1F1D1A`, ivory `#F6F3ED`, paper `#ECE6DB`, bronze `#A98758`, bronze-ink `#7A5C33`, stone `#77746F`, stone-ink `#5F5C57`.

Type: Cormorant Garamond (display), Manrope (UI/body), IBM Plex Mono (ledger labels).

Motion: `cubic-bezier(.22,1,.36,1)`, 0.9s reveals, everything disabled under `prefers-reduced-motion`.

## Conversion journeys

| Persona | Entry | Path | Pre-filled enquiry |
|---|---|---|---|
| US Amazon private-label seller | "india sourcing company for usa", "private label manufacturers india" | Home → "Amazon FBA sellers" card → `/enquire?type=private-label&market=usa` | market=US, customisation=private label |
| EU sustainable retailer | "eco friendly products manufacturer india" | `/industries/eco-friendly` → product guides (jute, organic cotton) → industry CTA | category=Eco-Friendly |
| UK home-décor importer | "home decor manufacturers india" | `/industries/handicrafts` → Moradabad cluster → "Source from here" | category + cluster |
| Australian wholesaler | "sourcing from india australia" | `/markets/australia` (ECTA, BICON) → market CTA | market=Australia |
| OEM brand | "oem manufacturers india" | `/services/oem-odm-coordination` → `/industries/engineering-industrial` | service context in sourcePage |
