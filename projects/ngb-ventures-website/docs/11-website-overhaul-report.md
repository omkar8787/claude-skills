# NGB Ventures: website content, brand, image & UX overhaul report

Date: 5 Nov 2026 · Scope: every published page, card, illustration, form, menu and metadata field.
Method: automated crawl of the exported production build (`scripts/audit-content.py`), manual review of all page copy, illustration inventory from source, and a full browser regression on desktop and mobile.

## 1. Pages audited (130)
- **home** (1): `/`
- **404** (1): `/404`
- **about** (1): `/about`
- **advertising** (1): `/advertising`
- **atlas** (1): `/atlas`
- **brand-development** (1): `/brand-development`
- **capabilities** (1): `/capabilities`
- **contact** (1): `/contact`
- **corporate-gifting** (1): `/corporate-gifting`
- **discover** (1): `/discover`
- **export** (1): `/export`
- **india-sourcing** (1): `/india-sourcing`
- **industries** (19): `/industries`, `/industries/apparel`, `/industries/beauty-personal-care`, `/industries/eco-friendly`, `/industries/engineering-industrial`, `/industries/essential-oils`, `/industries/food-nutrition`, `/industries/footwear-leather`, `/industries/furniture-woodcraft`, `/industries/gifting`, `/industries/handicrafts`, `/industries/home-textiles`, `/industries/jewelry-accessories`, `/industries/kitchenware-tableware`, `/industries/lighting`, `/industries/packaging`, `/industries/sports-fitness`, `/industries/stationery-paper`, `/industries/toys-educational`
- **insights** (14): `/insights`, `/insights/authentic-indian-block-print-handloom`, `/insights/corporate-gifting-from-india`, `/insights/how-to-source-from-india`, `/insights/importing-from-a-disability-owned-exporter-india`, `/insights/incoterms-for-india-imports`, `/insights/indian-millets-international-buyers`, `/insights/indian-superfoods-buyers-guide`, `/insights/indian-tea-and-coffee-private-label`, `/insights/kannauj-perfume-city`, `/insights/moradabad-brass-city`, `/insights/private-label-from-india`, `/insights/sourcing-spices-from-india`, `/insights/sustainable-packaging-from-india`
- **links** (1): `/links`
- **manufacturing** (22): `/manufacturing`, `/manufacturing/agra`, `/manufacturing/alappuzha`, `/manufacturing/bhadohi`, `/manufacturing/channapatna`, `/manufacturing/firozabad`, `/manufacturing/jaipur`, `/manufacturing/jalandhar`, `/manufacturing/jodhpur`, `/manufacturing/kannauj`, `/manufacturing/kanpur`, `/manufacturing/karur`, `/manufacturing/khambhat`, `/manufacturing/ludhiana`, `/manufacturing/moradabad`, `/manufacturing/panipat`, `/manufacturing/pune`, `/manufacturing/rajkot`, `/manufacturing/saharanpur`, `/manufacturing/sivakasi`, `/manufacturing/surat`, `/manufacturing/tirupur`
- **manufacturing-private-label** (1): `/manufacturing-private-label`
- **markets** (9): `/markets`, `/markets/australia`, `/markets/canada`, `/markets/france`, `/markets/germany`, `/markets/netherlands`, `/markets/uae`, `/markets/uk`, `/markets/usa`
- **origin** (19): `/origin`, `/origin/agates-of-cambay`, `/origin/alleppey-coir`, `/origin/banaras-gulabi-meenakari`, `/origin/bikaneri-bhujia`, `/origin/blue-pottery-of-jaipur`, `/origin/channapatna-toys-dolls`, `/origin/darjeeling-tea`, `/origin/firozabad-glass`, `/origin/kancheepuram-silk`, `/origin/kannauj-perfume`, `/origin/kashmir-pashmina`, `/origin/kolhapuri-chappal`, `/origin/kutch-embroidery`, `/origin/moradabad-metal-craft`, `/origin/mysore-silk`, `/origin/nagpur-orange`, `/origin/paithani`, `/origin/saharanpur-wood-craft`
- **privacy** (1): `/privacy`
- **products** (10): `/products`, `/products/bamboo-products`, `/products/brass-home-decor`, `/products/cotton-bath-towels`, `/products/cotton-tshirts`, `/products/essential-oils`, `/products/jute-bags`, `/products/natural-loofah`, `/products/organic-cotton-bags`, `/products/wooden-handicrafts`
- **publishers-printing** (1): `/publishers-printing`
- **quote** (1): `/quote`
- **search** (1): `/search`
- **services** (13): `/services`, `/services/export-coordination`, `/services/factory-audits`, `/services/logistics-coordination`, `/services/manufacturer-verification`, `/services/oem-odm-coordination`, `/services/packaging-development`, `/services/private-label-manufacturing`, `/services/product-development`, `/services/product-photography`, `/services/quality-inspection`, `/services/sourcing-consultancy`, `/services/supplier-identification`
- **terms** (1): `/terms`
- **thank-you** (1): `/thank-you`
- **tools** (4): `/tools/cbm-calculator`, `/tools/landed-cost-calculator`, `/tools/market-readiness`, `/tools/supplier-evaluation-checklist`

Plus the retired URLs that now forward (`/inclusive-procurement`, `/resources`, `/enquire`, `/request-a-quote`, `/gi`), `/insights/feed.xml`, `sitemap.xml` and `robots.txt`.

## 2. Audit results: before and after

| Finding (automated) | Before | After | Notes |
|---|---|---|---|
| Total findings | 537 | 296 | Remaining items are verified false positives or deliberate, see below |
| Missing Open Graph image | 128 | 0 | Default share image now on every page |
| American spellings | 86 | 4 | Remaining 4 are proper nouns (FDA "Foreign Supplier Verification Program", "Harbor Maintenance Fee", FTC "Jewelry Guides") and "license" as a verb |
| Hype words (extraordinary, exceptional, one-stop, seamless…) | 10 | 4 | Remaining 4 are "tapestry-woven", the correct technical term for Paithani zari borders |
| Title/description length problems | 9 | 0 | Shorter SEO titles for 5 long articles; fixed 404, Terms and Thank-you descriptions |
| Duplicate titles/descriptions | 3 | 0 | 404 page now has its own metadata |
| Title-case headings | 86 | 81 | Remaining are product and category names, Title Case by design (see editorial guidelines), and GI official names |
| Spacing/punctuation | 216 | 207 | Verified as text-extraction artefacts of adjacent block elements; a source scan found no missing spaces |
| Broken internal links | 0 | 0 | |
| Pages with H1 ≠ 1 | 0 | 0 | |

## 3. Spelling corrections
- "Jewelry" → "Jewellery" in category names, cluster text, product descriptions and form options (US spelling kept in one SEO title to capture US searches).
- "molded" → "moulded"; "Customize" → "Customise" (journey stage); "DTC" → "D2C" (consistent).
- No genuine misspellings were found: every unknown word was a correct British spelling or a valid trade term (e.g. ikat, zari, sortex, ajrakh, Ambia bahar).

## 4. Grammar and wording corrections
- **Hero and page headers read as joined words** to search engines and screen readers ("The world**wants** more**from** India", "Know more**before** you buy"): fixed in the headline component on every page.
- Market pages: "for United Kingdom", "Buyers in United States", "Importing into United Arab Emirates" → "the United Kingdom/States/Arab Emirates", "the Netherlands" (6 headings × 4 pages).
- Article page H1 lost its colon ("Incoterms for India imports EXW, FOB…") → colon restored.
- "Let's…" call-to-action headings rewritten in a professional register (9 pages).
- FAQ headings "X: buyer FAQs" (mixed case) → "Frequently asked questions" (sentence case).
- Contractions replaced with full forms in formal statements (DOBE, confidentiality, legal pages).

## 5. Rewritten content (summary)
- **Brand positioning:** hero "Discover India. Source Better. Build Global Brands." with the agreed supporting description; the four divisions appear in the first screen; "From concept to commerce." used only in the footer and About.
- **Divisions renamed and rewritten:** India Sourcing & Supplier Discovery; OEM, ODM & Private Label Manufacturing; Global Export Solutions; Brand Development & Advertising.
- **Removed competing slogans:** "The world wants more from India", "Anything from India. Everything from concept to commerce.", "If it's made in India, we can help you find it", "Your global sourcing desk in India".
- **Homepage:** all section headings and leads rewritten (spotlight, categories, pathways, Atlas, Origin, brand, export, insights, final CTA).
- **About, Capabilities, Discover, Industries, Products, Manufacturing, Markets, Origin, Insights, Contact, Quote:** hero copy rewritten.
- **23 product cards rewritten** in a consistent structure (`src/content/product-cards.ts`): name, description, manufacturing processes, customisation, private-label opportunity, buyer segments and compliance points. Shown in the Product Spotlight and in an expandable "Details" panel on Product Discovery.
- **New sections:** Private label development (5 steps), Positioning / Identity / Packaging (Brand Studio), Insights grouped into Buyer guides, Sourcing research, Manufacturing insights and Export compliance.

## 6. Duplicate content report
| Duplicate | Pages | Action |
|---|---|---|
| Full contact form, consent text and 3 steps in the closing band | 105 | Replaced with a short call to action and the 5-step enquiry process. The form now lives only on Contact and Quote |
| Generic closing lede "We'll help you explore the right manufacturing opportunities." | 85 | Replaced by a specific lede |
| Compliance disclaimer on industry, product and market pages | 36 | Kept: a necessary legal qualifier, not thin content |
| GI disclaimer ("NGB Ventures doesn't own this GI…") | 18 | Kept: required on each GI page |
| Five-step enquiry process | 105 | Intentional site-wide boilerplate, short and consistent |

## 7. Image duplication report
The site has **no photographs**: every visual is a generated SVG "plate" (pattern + line illustration). Reuse of the same illustration across unrelated subjects was the duplication problem:
- "spool" (yarn) was used for silk sarees, rugs, ikat and knitwear → split into **loom**, **rug** and **tee**.
- "leaf" was used for coir, tea, Nagpur orange and moringa → coir now **mat**, orange now **orange**, tea now **teapot** (moringa keeps leaf).
- "cup" (brass tumbler) was reused for tea & coffee → **teapot**.
- "box" (carton) was used for jaggery → **cubes**.
- "stamp" (printing block) was used for Kutch embroidery → **needle** (embroidery hoop).
- Festive gifting used a pendant lamp or gift box → **diya**.

## 8. Incorrect image mapping report (fixed)
`spot-coir`, `gi-alleppey-coir`, `cluster-alappuzha` → mat · `spot-rugs`, `cluster-bhadohi`, `cluster-panipat` → rug · `spot-jaggery` → cubes · `gi-nagpur-orange` → orange · `gi-kutch-embroidery` → needle · `spot-tea-coffee`, `story-tea-coffee` → teapot · `spot-festive-gifting`, `gifting-festive` → diya · `gi-kancheepuram-silk`, `gi-paithani`, `gi-mysore-silk`, `spot-ikat` → loom · `cluster-tirupur` → tee · `guide-how-to-source` → compass · `guide-incoterms` → ship · `page-legal` → document. Decorative plates (empty alt) are now hidden from screen readers.

**Flagged, not fixed:** real product photography. Licensed image sources (Wikimedia Commons, Unsplash, Pexels) are blocked from the build environment, and the brief forbids unrelated or AI-generated "factory" images. To add a photo, save it as `public/media/<slot>.webp`; the slot names are in §9.

## 9. Updated image inventory
All images are inline SVG generated at build time (no files, no file size or broken-path risk, responsive by design, fixed aspect ratios per layout). Map files: `public/maps/india.svg`, `public/maps/world-dots.svg`; share image: `/opengraph-image` (1200×630 PNG).

| Slot | Illustration | Pattern / tone source | Subject (alt text) | Defined in |
|---|---|---|---|---|
| `about-hero` | compass | generated SVG | NGB Ventures | `app/about/page.tsx` |
| `cluster-agra` | shoe | generated SVG | Leather shoe being hand-lasted | `content/clusters.ts` |
| `cluster-alappuzha` | mat | generated SVG | Coir fibre being woven into mats | `content/clusters.ts` |
| `cluster-bhadohi` | rug | generated SVG | Hand-knotted carpet on a loom | `content/clusters.ts` |
| `cluster-channapatna` | top | generated SVG | Lacquered wooden toys being turned on a lathe | `content/clusters.ts` |
| `cluster-firozabad` | vase | generated SVG | Hand-blown glass being shaped | `content/clusters.ts` |
| `cluster-jaipur` | stamp | generated SVG | Hand block printing on cotton fabric | `content/clusters.ts` |
| `cluster-jalandhar` | ball | generated SVG | Hand-stitched cricket balls | `content/clusters.ts` |
| `cluster-jodhpur` | chair | generated SVG | Solid-wood furniture in a Jodhpur workshop | `content/clusters.ts` |
| `cluster-kannauj` | bottle | generated SVG | Copper stills used in traditional attar distillation | `content/clusters.ts` |
| `cluster-kanpur` | shoe | generated SVG | Stacks of finished leather hides | `content/clusters.ts` |
| `cluster-karur` | towels | generated SVG | Woven cotton kitchen linen | `content/clusters.ts` |
| `cluster-khambhat` | gem | generated SVG | Polished agate and carnelian beads | `content/clusters.ts` |
| `cluster-ludhiana` | spool | generated SVG | Woollen knitwear on a flat-knitting machine | `content/clusters.ts` |
| `cluster-moradabad` | vase | generated SVG | Brass vessels being polished in a workshop | `content/clusters.ts` |
| `cluster-panipat` | rug | generated SVG | Handloom weaving a flat-weave rug | `content/clusters.ts` |
| `cluster-pune` | gear | generated SVG | Precision engineering workshop in Pune | `content/clusters.ts` |
| `cluster-rajkot` | gear | generated SVG | Molten metal being poured in a foundry | `content/clusters.ts` |
| `cluster-saharanpur` | chair | generated SVG | Intricate hand-carved wooden panel | `content/clusters.ts` |
| `cluster-sivakasi` | notebook | generated SVG | Offset printing press with printed sheets | `content/clusters.ts` |
| `cluster-surat` | gem | generated SVG | Synthetic fabric rolls on a weaving floor | `content/clusters.ts` |
| `cluster-tirupur` | tee | generated SVG | Circular knitting machines producing cotton jersey | `content/clusters.ts` |
| `gi-agates-of-cambay` | gem | generated SVG | Polished Khambhat agate beads | `content/gi.ts` |
| `gi-alleppey-coir` | mat | generated SVG | Woven Alleppey coir mats | `content/gi.ts` |
| `gi-bikaneri-bhujia` | bowl | generated SVG | Bikaneri bhujia in a brass bowl | `content/gi.ts` |
| `gi-blue-pottery` | vase | generated SVG | Hand-painted Jaipur blue pottery | `content/gi.ts` |
| `gi-channapatna` | top | generated SVG | Lacquered Channapatna wooden toys | `content/gi.ts` |
| `gi-darjeeling-tea` | leaf | generated SVG | Tea leaves on a Darjeeling hillside estate | `content/gi.ts` |
| `gi-firozabad-glass` | vase | generated SVG | Hand-shaped Firozabad glass | `content/gi.ts` |
| `gi-gulabi-meenakari` | ring | generated SVG | Pink enamel meenakari on silver | `content/gi.ts` |
| `gi-kancheepuram-silk` | loom | generated SVG | Kanchipuram silk with zari border on a handloom | `content/gi.ts` |
| `gi-kannauj-perfume` | bottle | generated SVG | Copper deg-bhapka stills used for attar distillation | `content/gi.ts` |
| `gi-kashmir-pashmina` | spool | generated SVG | Hand-woven Kashmir pashmina shawl | `content/gi.ts` |
| `gi-kolhapuri-chappal` | shoe | generated SVG | Hand-braided Kolhapuri leather sandals | `content/gi.ts` |
| `gi-kutch-embroidery` | needle | generated SVG | Kutch mirror-work embroidery | `content/gi.ts` |
| `gi-moradabad-metal-craft` | vase | generated SVG | Hand-engraved Moradabad brassware | `content/gi.ts` |
| `gi-mysore-silk` | loom | generated SVG | Lustrous Mysore silk with gold zari | `content/gi.ts` |
| `gi-nagpur-orange` | orange | generated SVG | Nagpur oranges in an orchard crate | `content/gi.ts` |
| `gi-paithani` | loom | generated SVG | Paithani silk with peacock motif pallu | `content/gi.ts` |
| `gi-saharanpur-wood-craft` | chair | generated SVG | Hand-carved Saharanpur wooden panel | `content/gi.ts` |
| `guide-how-to-source` | compass | generated SVG | Sourcing documents and samples | `content/guides.ts` |
| `guide-incoterms` | ship | generated SVG | Container port operations | `content/guides.ts` |
| `industry-apparel` | tee | generated SVG | Cotton knitwear being finished on a garment production line | `content/industries.ts` |
| `industry-beauty` | jar | generated SVG | Natural soap bars and skincare jars on stone | `content/industries.ts` |
| `industry-eco` | bag | generated SVG | Woven jute bags and natural fibre products | `content/industries.ts` |
| `industry-engineering` | gear | generated SVG | CNC-machined metal components under inspection | `content/industries.ts` |
| `industry-essential-oils` | bottle | generated SVG | Amber essential-oil bottles beside fresh botanicals | `content/industries.ts` |
| `industry-food` | grain | generated SVG | Indian spices and grains | `content/industries.ts` |
| `industry-furniture` | chair | generated SVG | Solid wood furniture being finished in a workshop | `content/industries.ts` |
| `industry-gifting` | gift | generated SVG | Corporate gift box | `content/industries.ts` |
| `industry-handicrafts` | vase | generated SVG | Artisan hand-finishing a carved décor piece | `content/industries.ts` |
| `industry-home-textiles` | towels | generated SVG | Folded stacks of woven cotton towels and bed linen | `content/industries.ts` |
| `industry-jewelry` | ring | generated SVG | Silver and gemstone jewellery laid out on a dark workbench | `content/industries.ts` |
| `industry-kitchenware` | bowl | generated SVG | Hammered copper and brass serveware | `content/industries.ts` |
| `industry-leather` | shoe | generated SVG | Leather hides and hand-stitched footwear | `content/industries.ts` |
| `industry-lighting` | lamp | generated SVG | Pierced brass lantern casting patterned light | `content/industries.ts` |
| `industry-packaging` | box | generated SVG | Kraft rigid boxes and printed packaging prototypes | `content/industries.ts` |
| `industry-sports` | ball | generated SVG | Hand-stitched sports balls and equipment | `content/industries.ts` |
| `industry-stationery` | notebook | generated SVG | Handmade paper journals with deckle edges | `content/industries.ts` |
| `industry-toys` | top | generated SVG | Lacquered wooden toys in bright colours | `content/industries.ts` |
| `market-australia` | globe | generated SVG | Indian wooden homewares in a sunlit Australian interior | `content/markets.ts` |
| `market-canada` | globe | generated SVG | Textile goods prepared for Canadian retail | `content/markets.ts` |
| `market-france` | globe | generated SVG | Hand-embroidered fabric for French fashion | `content/markets.ts` |
| `market-germany` | globe | generated SVG | Precision inspection representing German quality expectations | `content/markets.ts` |
| `market-netherlands` | ship | generated SVG | European port logistics | `content/markets.ts` |
| `market-uae` | ship | generated SVG | Indian décor in a Gulf hospitality interior | `content/markets.ts` |
| `market-uk` | globe | generated SVG | Indian home décor in a British interior | `content/markets.ts` |
| `market-usa` | globe | generated SVG | Container port at dusk representing US imports | `content/markets.ts` |
| `page-advertising` | camera | generated SVG | Advertising | `app/advertising/page.tsx` |
| `page-atlas` | compass | generated SVG | India Manufacturing Atlas | `app/atlas/page.tsx` |
| `page-capabilities` | compass | generated SVG | Capabilities | `app/capabilities/page.tsx` |
| `page-contact` | seal | generated SVG | NGB Ventures, Pune | `app/contact/page.tsx` |
| `page-discover` | magnifier | generated SVG | Product discovery | `app/discover/page.tsx` |
| `page-industries` | spool | generated SVG | Textile production in India | `app/industries/page.tsx` |
| `page-insights` | document | generated SVG | Insights and research | `app/insights/page.tsx` |
| `page-legal` | document | generated SVG | Terms | `app/terms/page.tsx` |
| `page-manufacturing` | gear | generated SVG | Indian manufacturing cluster | `app/manufacturing/page.tsx` |
| `page-markets` | globe | generated SVG | Container ship departing an Indian port | `app/markets/page.tsx` |
| `page-origin` | seal | generated SVG | India's Origin Collection | `app/origin/page.tsx` |
| `page-products` | box | generated SVG | Product samples on a studio table | `app/products/page.tsx` |
| `page-publishers` | notebook | generated SVG | Publishing and printing | `app/publishers-printing/page.tsx` |
| `page-quote` | document | generated SVG | Request a sourcing proposal | `app/quote/page.tsx` |
| `page-services` | compass | generated SVG | Sourcing consultation | `app/services/page.tsx` |
| `page-tools` | compass | generated SVG | Market readiness | `app/tools/market-readiness/page.tsx` |
| `product-bamboo-products` | bamboo | generated SVG | Woven bamboo baskets and homeware | `content/products.ts` |
| `product-brass-home-decor` | vase | generated SVG | Polished brass vases and candle holders | `content/products.ts` |
| `product-cotton-bath-towels` | towels | generated SVG | Stacked plush cotton bath towels | `content/products.ts` |
| `product-cotton-tshirts` | tee | generated SVG | Folded cotton T-shirts in neutral colours | `content/products.ts` |
| `product-essential-oils` | bottle | generated SVG | Amber bottles of essential oils with herbs | `content/products.ts` |
| `product-jute-bags` | bag | generated SVG | Woven jute bags with rope handles | `content/products.ts` |
| `product-natural-loofah` | loofah | generated SVG | Natural loofah sponges and cut pads | `content/products.ts` |
| `product-organic-cotton-bags` | bag | generated SVG | Natural organic cotton tote bags | `content/products.ts` |
| `product-wooden-handicrafts` | bowl | generated SVG | Hand-carved wooden bowls and boxes | `content/products.ts` |
| `service-consultancy` | compass | generated SVG | Strategy session with sourcing documents | `content/services.ts` |
| `service-export` | document | generated SVG | Export documents and shipping containers | `content/services.ts` |
| `service-factory-audits` | clipboard | generated SVG | Auditor walking a factory floor | `content/services.ts` |
| `service-logistics` | ship | generated SVG | Container ship leaving an Indian port | `content/services.ts` |
| `service-oem` | gear | generated SVG | Engineering drawings beside machined parts | `content/services.ts` |
| `service-packaging` | box | generated SVG | Custom packaging dielines and samples | `content/services.ts` |
| `service-photography` | camera | generated SVG | Product photography studio set-up | `content/services.ts` |
| `service-private-label` | tag | generated SVG | Branded private-label packaging | `content/services.ts` |
| `service-product-development` | compass | generated SVG | Product prototypes and material swatches | `content/services.ts` |
| `service-quality-inspection` | magnifier | generated SVG | Inspector measuring a product against specifications | `content/services.ts` |
| `service-supplier-identification` | magnifier | generated SVG | Mapping manufacturing options across India | `content/services.ts` |
| `service-verification` | seal | generated SVG | Reviewing supplier documents | `content/services.ts` |
| `spot-activity-books` | notebook | generated SVG | Printed activity books | `content/discovery.ts` |
| `spot-attars` | bottle | generated SVG | Attar bottles | `content/discovery.ts` |
| `spot-block-print` | stamp | generated SVG | Hand block-printed cotton | `content/discovery.ts` |
| `spot-brass-barware` | cup | generated SVG | Hammered brass whiskey cups | `content/discovery.ts` |
| `spot-ceramics` | vase | generated SVG | Ceramic tableware | `content/discovery.ts` |
| `spot-coir` | mat | generated SVG | Coir doormat | `content/discovery.ts` |
| `spot-festive-gifting` | diya | generated SVG | Festive gift set | `content/discovery.ts` |
| `spot-gift-hampers` | gift | generated SVG | Corporate gift hamper | `content/discovery.ts` |
| `spot-herbal` | jar | generated SVG | Ayurvedic herbs | `content/discovery.ts` |
| `spot-ikat` | loom | generated SVG | Ikat handloom fabric | `content/discovery.ts` |
| `spot-jaggery` | cubes | generated SVG | Jaggery blocks | `content/discovery.ts` |
| `spot-jute` | bag | generated SVG | Jute tote bags | `content/discovery.ts` |
| `spot-leather` | bag | generated SVG | Leather bag | `content/discovery.ts` |
| `spot-loofah` | loofah | generated SVG | Natural loofah sponges | `content/discovery.ts` |
| `spot-machined` | gear | generated SVG | Machined components | `content/discovery.ts` |
| `spot-makhana` | bowl | generated SVG | Roasted makhana | `content/discovery.ts` |
| `spot-mango-wood` | chair | generated SVG | Mango-wood sideboard | `content/discovery.ts` |
| `spot-millets` | grain | generated SVG | Millet grains and flour | `content/discovery.ts` |
| `spot-moringa` | leaf | generated SVG | Moringa powder | `content/discovery.ts` |
| `spot-rugs` | rug | generated SVG | Hand-knotted rug | `content/discovery.ts` |
| `spot-silver` | ring | generated SVG | Silver jewellery | `content/discovery.ts` |
| `spot-spices` | mortar | generated SVG | Indian spices | `content/discovery.ts` |
| `spot-tea-coffee` | teapot | generated SVG | Tea and coffee | `content/discovery.ts` |
| `story-block-print` | stamp | generated SVG | Hand block printing | `content/stories.ts` |
| `story-gifting` | gift | generated SVG | Corporate gift box | `content/stories.ts` |
| `story-kannauj` | bottle | generated SVG | Attar distillation | `content/stories.ts` |
| `story-millets` | grain | generated SVG | Millet grains | `content/stories.ts` |
| `story-moradabad` | cup | generated SVG | Hammered brass | `content/stories.ts` |
| `story-private-label` | box | generated SVG | Private label packaging | `content/stories.ts` |
| `story-spices` | mortar | generated SVG | Indian spices | `content/stories.ts` |
| `story-superfoods` | jar | generated SVG | Indian superfoods | `content/stories.ts` |
| `story-sustainable` | bag | generated SVG | Natural fibre packaging | `content/stories.ts` |
| `story-tea-coffee` | teapot | generated SVG | Tea and coffee | `content/stories.ts` |


## 10. Content moderation and compliance report
| Topic | Status on site |
|---|---|
| DOBE | "Disability:IN DOBE® certification application in progress." everywhere; no badge; benefits framed as conditional on certification and on each buyer's programme and eligibility rules |
| IEC / exporter of record | "NGB Ventures exports under its own IEC" (owner-stated; see §13) |
| GI | Registration details and confidence shown; NGB is stated not to be an authorised user; GI-labelled goods only via authorised users |
| Factory ownership | "We do not own factories; manufacturing, testing, inspection and logistics involve independent partners" (About, divisions) |
| Supplier confidentiality | Atlas and clusters stated to be public overviews; "Our private supplier network and commercial relationships remain confidential"; no supplier names, contacts or prices published |
| NDAs / guarantees | "Your interests are protected, always" removed → "Project confidentiality, defined responsibilities and written commercial agreements form part of our engagement process." |
| Testing, inspection | Attributed to accredited laboratories and inspection agencies; no guarantees of clearance |
| Tariffs / duties | Indicative only; final classification rests with importer and broker |
| Food, cosmetic, essential-oil claims | Health claims flagged as regulated by destination; IFRA/cosmetic rules noted |
| Sustainability | Claims require documentation; hidden plastics called out |
| Legal pages | Public "[PLACEHOLDER]" and "Draft template" notes removed; open items listed in §13 |

## 11. SEO improvement report
- Open Graph and Twitter image on every page; `og:locale` en_GB.
- Unique titles (≤ 65 characters) and descriptions (70–160 characters) on all pages; 404 has its own metadata.
- Headline word-joining fixed (affects how Google reads every H1).
- Markdown article pipeline, RSS feed, sitemap `lastmod`, footer links to the newest articles, IndexNow on deploy (see docs/10).
- Insights restructured into four topical sections with anchors; product cards carry richer, specific copy (processes, buyers, compliance) for long-tail queries.
- Keyword alignment: "India sourcing company", "private label manufacturers India", "OEM/ODM manufacturing India", "brassware manufacturers India", "natural loofah products India" and similar phrases now appear naturally in headings, cards and metadata. No doorway pages were created.

## 12. UX improvement report
- Navigation rebuilt: Capabilities (5), Discover India (Product Categories, Manufacturing Atlas, Manufacturing Clusters, GI & Origin Collection), Brand Studio (Positioning, Identity, Packaging, Advertising), Insights (4 sections), About, Contact. Every menu target resolves to a real section.
- Primary CTA "Request a Sourcing Proposal" in the header, hero, footer, mobile bar and closing bands.
- Enquiry form: only name, business email and description required; added target purchase price, required certifications and expected timeline; 5-step process shown beside the form.
- Product Discovery filter panel no longer covers half the screen on phones (sticky on desktop only).
- Capabilities buttons no longer overflow on phones (short division names).

## 12a. Broken links and resolved issues
No broken internal links before or after. Resolved: 35 px horizontal overflow on `/capabilities` (mobile); retired DOBE URL forwards to `/export#dobe`; all menu anchors (`#oem-odm`, `#private-label`, `#positioning`, `#identity`, `#packaging`, `#buyer-guides`, `#sourcing-research`, `#manufacturing-insights`, `#export-compliance`) exist.

## 13. Claims requiring owner verification
1. **IEC:** NGB Ventures holds its own Importer-Exporter Code and acts as exporter of record.
2. **Disability-owned status** and the Disability:IN DOBE® application (date submitted, and eligibility for an India-based business).
3. **"We source exclusively from India"** (Confidentiality section).
4. **NDA availability** before receiving sensitive information.
5. Legal entity name, registered address, GSTIN, for the footer, privacy policy and Organization schema.
6. **Privacy policy:** data-retention period. **Terms:** liability clause and governing law (currently "laws of India"); both need counsel review.
7. Contact email (currently a personal Gmail address).
8. GI records marked "reported" or "renewal unconfirmed" need live registry verification before commercial use.
9. Regional product claims on product cards (e.g. Unjha for cumin, Erode for turmeric, Ambur for leather) are public, well-documented associations, not supplier relationships; confirm you are comfortable naming them.

## 14. Technical testing results (production build, headless Chromium)
- 126 sitemap pages × desktop and mobile: 0 JS errors, 0 HTTP errors, 0 horizontal overflow.
- No hydration errors (homepage, Atlas, quote and gifting pages, exported build).
- Atlas: all 12 profiled states, non-profiled states, keyboard, URL hash and lazy loading pass on both viewports.
- Anchor links land precisely (5 tested).
- Search, RSS feed, quiz, 404 fact card and redirects work.
- A partial enquiry (name, email, description only) passes validation.
- Lint and type checks are clean.

## 15. Files modified
58 source files changed, plus new files: `src/content/product-cards.ts`, `scripts/audit-content.py` and this report. Key files: `src/content/site.ts`, `divisions.ts`, `discovery.ts`, `industries.ts`, `stories.ts`, `guides.ts`, `home.ts`; `src/app/page.tsx`, `layout.tsx`, `about`, `capabilities`, `atlas`, `quote`, `insights`, `markets/[slug]`, `manufacturing-private-label`, `brand-development`, `privacy`, `terms`, `not-found`; `src/components/sections/CtaBand.tsx`, `Confidentiality.tsx`, `DobeAdvantage.tsx`; `src/components/ui/MaskLines.tsx`, `glyphs.tsx`, `Plate.tsx`; `src/components/forms/LeadForm.tsx`; `src/components/discovery/DiscoveryEngine.tsx`; `src/lib/seo.ts`, `enquiry-schema.ts`; `scripts/export-preview.mjs`.

## 16. Final rating (self-assessed, out of 10)
| Category | Score | Remaining weakness |
|---|---|---|
| Brand positioning | 8.5 | Clear four-division model; would gain from verified proof points (registration details, NDA template) |
| Content writing | 8 | Main pages rewritten; long-form industry, cluster and service pages were corrected rather than fully rewritten |
| Grammar and spelling | 9 | No known errors remain in the audit; British English throughout |
| Product descriptions | 8 | 23 structured cards; the 9 product guides and GI pages keep their earlier (sound) structure |
| Image relevance | 6.5 | Every illustration now matches its subject, but there is **no real photography** |
| Visual consistency | 8.5 | One illustration system and consistent ratios |
| International buyer trust | 7 | Honest, specific and confidential-by-default; lacks registration details, real case studies (NDA-limited) and a business email domain |
| Compliance and factual accuracy | 8.5 | Claims qualified; owner verifications in §13 outstanding |
| SEO | 8 | Strong technical base; held back by the github.io sub-path and a young domain |
| User experience | 8.5 | Clear navigation and CTAs; mobile homepage performance varies (63–81) |
| Lead generation | 7.5 | Low-friction form; online delivery not yet connected (email/WhatsApp fallback) |
| Technical quality | 9 | Clean build and full regression pass |
| **Overall** | **8.1** | Biggest gains available: real photography, a custom domain with business email, a connected form inbox, owner verifications |
