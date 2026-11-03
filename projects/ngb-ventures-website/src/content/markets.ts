import type { Market } from "./types";

/**
 * Market pages. Trade-policy statements are dated and hedged on purpose:
 * tariffs and FTA status change. Always link the official lookup tools.
 * Last editorial review: 2026-11 (review quarterly).
 */
const EU_TOOLS = [
  { label: "EU Access2Markets (tariffs & rules)", href: "https://trade.ec.europa.eu/access-to-markets/en/home" },
  { label: "EU TARIC database", href: "https://ec.europa.eu/taxation_customs/dds2/taric/taric_consultation.jsp" },
];
const INDIA_TA = { label: "India: Department of Commerce trade agreements", href: "https://commerce.gov.in/international-trade/trade-agreements/" };

export const markets: Market[] = [
  {
    slug: "usa", name: "United States", region: "North America", code: "US",
    seoTitle: "India Sourcing Company for USA | Manufacturers for US Importers",
    metaDescription: "Source from Indian manufacturers for the US market: Amazon FBA sellers, DTC brands and retailers. CPSIA, FDA, Prop 65 and tariff considerations, with sampling, QC and export coordination.",
    heroLine: "Indian manufacturing for American brands, importers and Amazon sellers.",
    intro: [
      "US buyers source from India across apparel, home textiles, décor, furniture, leather, natural products and engineering. Amazon FBA sellers and DTC brands increasingly look at India for private-label products and supply diversification.",
      "US import costs depend on HTS classification, the duty rate, any additional tariffs and fees. US tariff treatment of Indian goods changed significantly in 2025, so verify current rates at the time of each shipment.",
    ],
    buyerTypes: ["Amazon FBA sellers", "DTC brands", "Big-box and specialty retail", "Wholesalers and distributors", "Industrial OEMs"],
    popularIndustries: ["apparel", "home-textiles", "handicrafts", "furniture-woodcraft", "essential-oils", "engineering-industrial"],
    considerations: [
      { title: "Tariffs & classification", body: "Check the HTS code and current duty, including any additional tariffs on Indian-origin goods. Rates have been volatile, so confirm with a licensed customs broker." },
      { title: "Product safety", body: "CPSC rules, including CPSIA for children's products. FDA covers food-contact items, cosmetics (MoCRA) and food." },
      { title: "California Prop 65", body: "Warning requirements for listed chemicals. Many retailers require compliance nationwide." },
      { title: "Amazon requirements", body: "FBA packaging, labelling and category approvals. Some categories need test reports." },
    ],
    tradeNote: "As of our last review, there's no comprehensive India–US free trade agreement in force, and additional tariffs on Indian goods were introduced in 2025. Bilateral trade talks have been reported. Treat any rate as provisional until confirmed in the HTS and by your broker.",
    officialTools: [{ label: "US Harmonized Tariff Schedule (USITC)", href: "https://hts.usitc.gov/" }, { label: "U.S. Customs and Border Protection: Trade", href: "https://www.cbp.gov/trade" }],
    faqs: [
      { q: "Can you ship directly to Amazon FBA warehouses?", a: "We coordinate with freight forwarders that handle FBA inbound deliveries. You'll need to create the shipment plan in Seller Central." },
      { q: "Who pays US import duty?", a: "Under most Incoterms (FOB, CIF) the US importer of record pays duties. Under DDP the seller arranges it, but DDP from India needs careful structuring." },
    ],
    plate: { slot: "market-usa", motif: "route", tone: "indigo", alt: "Container port at dusk representing US imports", brief: "US-bound container stack at dusk; port cranes; blue hour." },
  },
  {
    slug: "uk", name: "United Kingdom", region: "Europe", code: "GB",
    seoTitle: "Sourcing from India for UK Importers | Indian Manufacturers UK",
    metaDescription: "Source Indian home décor, textiles, apparel and more for the UK market. UKCA, UK REACH, labelling and India–UK trade agreement considerations, with sampling, QC and export coordination.",
    heroLine: "British retail, Indian craft, with compliance in step.",
    intro: [
      "British importers have long-standing links with Indian textiles, home décor and lifestyle products. UK retailers increasingly expect documented social compliance and sustainability evidence.",
      "India and the UK signed a Comprehensive Economic and Trade Agreement in July 2025. Check its entry-into-force status and the product-specific rules of origin before relying on preferential duty.",
    ],
    buyerTypes: ["Independent and multiple retailers", "Home-décor importers", "Fashion brands", "Online sellers", "Wholesalers"],
    popularIndustries: ["handicrafts", "home-textiles", "apparel", "furniture-woodcraft", "jewelry-accessories"],
    considerations: [
      { title: "UK Global Tariff", body: "Check commodity codes and duty, plus preferential rates if the India–UK agreement applies to your goods and is in force." },
      { title: "Product safety", body: "UKCA or CE marking where relevant, UK REACH, the GPSR-equivalent framework, and timber regulations for wood." },
      { title: "Hallmarking", body: "Precious-metal items above exemption weights need UK hallmarking." },
      { title: "Claims", body: "The CMA's Green Claims Code applies to environmental marketing." },
    ],
    tradeNote: "The India–UK CETA was signed on 24 July 2025. Preferential tariffs only apply once the agreement is in force and the goods meet its rules of origin with valid proof of origin.",
    officialTools: [{ label: "UK Trade Tariff (GOV.UK)", href: "https://www.gov.uk/trade-tariff" }, INDIA_TA],
    faqs: [{ q: "Does the India–UK trade deal remove duty on my products?", a: "It depends on your product's tariff line, the agreement's staging and whether it's in force when you import. Check the UK Trade Tariff and the rules of origin." }],
    plate: { slot: "market-uk", motif: "jali", tone: "stone", alt: "Indian home décor in a British interior", brief: "Indian brass and textiles styled in a London townhouse interior; grey daylight." },
  },
  {
    slug: "germany", name: "Germany", region: "Europe", code: "DE",
    seoTitle: "Indian Manufacturers for Germany | Sourcing from India to Germany",
    metaDescription: "Source from India for German importers: textiles, home goods, sustainable products and engineering. LFGB, REACH, supply-chain due diligence and EU customs considerations.",
    heroLine: "Engineered precision meets Indian manufacturing depth.",
    intro: [
      "German buyers are among the most demanding on quality documentation, chemical compliance and supply-chain due diligence. That makes clear specifications and audit trails essential.",
      "Germany applies EU customs rules. German retailers often have additional testing expectations, such as LFGB-based food-contact testing.",
    ],
    buyerTypes: ["Retail chains", "Sustainable-product brands", "Industrial buyers", "Wholesalers"],
    popularIndustries: ["home-textiles", "eco-friendly", "kitchenware-tableware", "engineering-industrial", "apparel"],
    considerations: [
      { title: "Supply-chain due diligence", body: "Germany's Supply Chain Due Diligence Act (LkSG) applies to larger companies. Their suppliers are often asked for compliance evidence. EU-level due-diligence rules are also evolving." },
      { title: "Food contact", body: "EU 1935/2004, with LFGB testing commonly requested." },
      { title: "Chemicals", body: "REACH SVHC communication and Annex XVII restrictions." },
      { title: "Packaging EPR", body: "German Packaging Act (VerpackG) registration with LUCID for packaging placed on the market." },
    ],
    tradeNote: "EU–India FTA negotiations have been ongoing. Check the current status before assuming preferential rates. India's GSP access to the EU has been limited for many sectors.",
    officialTools: [...EU_TOOLS, INDIA_TA],
    faqs: [{ q: "Do I need to register packaging in Germany?", a: "Companies placing packaged goods on the German market generally must register with LUCID and join a dual system for B2C packaging. Check your obligations." }],
    plate: { slot: "market-germany", motif: "blueprint", tone: "charcoal", alt: "Precision inspection representing German quality expectations", brief: "Quality lab with textile testing equipment; clinical cool light." },
  },
  {
    slug: "france", name: "France", region: "Europe", code: "FR",
    seoTitle: "Sourcing from India for France | Indian Manufacturers for French Brands",
    metaDescription: "Source Indian textiles, fashion, décor and natural products for French brands and retailers. EU rules, AGEC anti-waste law and labelling considerations.",
    heroLine: "Indian craft for French design sensibility.",
    intro: [
      "French fashion, home and beauty brands work with Indian embroidery, block print, textiles and natural ingredients.",
      "France applies EU customs rules plus national requirements, such as the AGEC anti-waste law affecting labelling and the destruction of unsold goods.",
    ],
    buyerTypes: ["Fashion houses and brands", "Concept stores", "Home-décor brands", "Beauty brands"],
    popularIndustries: ["apparel", "home-textiles", "handicrafts", "beauty-personal-care", "essential-oils"],
    considerations: [
      { title: "AGEC law", body: "Environmental product information and Triman/sorting labelling for many consumer products." },
      { title: "Cosmetics", body: "EU 1223/2009 with a Responsible Person in the EU." },
      { title: "Textile EPR", body: "France runs EPR schemes for textiles, footwear and household linen (Refashion)." },
    ],
    tradeNote: "France applies the EU Common Customs Tariff. Check EU–India FTA status before planning on preferential duty.",
    officialTools: [...EU_TOOLS, INDIA_TA],
    faqs: [{ q: "Do my products need the Triman logo?", a: "Many consumer products and packaging sold in France need sorting information, including Triman. Check the current AGEC requirements for your category." }],
    plate: { slot: "market-france", motif: "block", tone: "clay", alt: "Hand-embroidered fabric for French fashion", brief: "Hand embroidery on silk in a Parisian atelier styling; soft daylight." },
  },
  {
    slug: "netherlands", name: "Netherlands", region: "Europe", code: "NL",
    seoTitle: "Sourcing from India for the Netherlands | Indian Suppliers for Dutch Importers",
    metaDescription: "Source from India for Dutch importers and European distribution: sustainable products, home goods and textiles, with EU customs and Rotterdam logistics considerations.",
    heroLine: "Through Rotterdam, into Europe.",
    intro: [
      "The Netherlands is a major EU logistics gateway through the Port of Rotterdam. Many importers use it as a distribution base for wider European markets.",
      "Dutch buyers are often early adopters of sustainability requirements, so certified materials and green-claim substantiation matter.",
    ],
    buyerTypes: ["Importers and distributors", "Sustainable brands", "E-commerce sellers", "Garden and home retailers"],
    popularIndustries: ["eco-friendly", "home-textiles", "handicrafts", "packaging"],
    considerations: [
      { title: "EU customs & VAT", body: "Import VAT deferment options (Article 23 licence) may help cash flow for Dutch importers. Ask your customs agent." },
      { title: "Green claims", body: "The ACM (Dutch regulator) actively enforces against misleading sustainability claims." },
      { title: "Distribution", body: "Goods cleared in NL can circulate within the EU single market." },
    ],
    tradeNote: "The Netherlands applies the EU Common Customs Tariff. Check EU–India FTA status.",
    officialTools: [...EU_TOOLS, INDIA_TA],
    faqs: [{ q: "Can I import into Rotterdam and sell across the EU?", a: "Yes. Once goods are released for free circulation in the EU they can move within the single market. VAT and product rules still apply in each country of sale." }],
    plate: { slot: "market-netherlands", motif: "route", tone: "stone", alt: "European port logistics", brief: "Port of Rotterdam-style container terminal aerial; grey-blue." },
  },
  {
    slug: "australia", name: "Australia", region: "Asia-Pacific", code: "AU",
    seoTitle: "Sourcing from India for Australia | Indian Manufacturers & ECTA",
    metaDescription: "Source Indian handicrafts, textiles, homewares and more for Australian wholesalers and retailers. India–Australia ECTA, biosecurity and product-safety considerations.",
    heroLine: "Indian craft for Australian homes, under ECTA.",
    intro: [
      "The India–Australia Economic Cooperation and Trade Agreement (ECTA) entered into force on 29 December 2022. It improved tariff access for many Indian goods that meet its rules of origin.",
      "Australia's biosecurity regime is strict. Wooden, plant-based and natural-fibre products need careful documentation, and sometimes treatment.",
    ],
    buyerTypes: ["Wholesalers", "Homewares retailers", "Online stores", "Hospitality buyers"],
    popularIndustries: ["handicrafts", "home-textiles", "furniture-woodcraft", "apparel", "eco-friendly"],
    considerations: [
      { title: "ECTA preference", body: "Claim preference with valid proof of origin, and check the product-specific rules." },
      { title: "Biosecurity", body: "Check BICON import conditions for timber, plant materials, packaging and natural fibres." },
      { title: "Product safety", body: "Mandatory standards and bans under Australian Consumer Law, such as toys and certain products." },
    ],
    tradeNote: "India–Australia ECTA has been in force since 29 December 2022. Negotiations on a broader Comprehensive Economic Cooperation Agreement (CECA) have been reported.",
    officialTools: [{ label: "Australian Border Force: tariff classification", href: "https://www.abf.gov.au/importing-exporting-and-manufacturing/tariff-classification" }, { label: "DFAT FTA Portal", href: "https://ftaportal.dfat.gov.au/" }, { label: "BICON biosecurity conditions", href: "https://bicon.agriculture.gov.au/" }],
    faqs: [{ q: "Do wooden handicrafts need treatment for Australia?", a: "Many timber and plant products are subject to BICON import conditions, which can include inspection or treatment. Check BICON for your exact product." }],
    plate: { slot: "market-australia", motif: "grain", tone: "sand", alt: "Indian wooden homewares in a sunlit Australian interior", brief: "Wooden homewares styled in a bright coastal interior; warm sand light." },
  },
  {
    slug: "canada", name: "Canada", region: "North America", code: "CA",
    seoTitle: "Sourcing from India for Canada | Indian Manufacturers for Canadian Importers",
    metaDescription: "Source from India for Canadian importers and retailers: textiles, décor, natural products and more. CBSA classification, textile labelling and product-safety considerations.",
    heroLine: "A diversified supply line from India to Canada.",
    intro: [
      "Canadian importers source Indian textiles, apparel, décor, food-adjacent natural products and engineering goods. Many already serve diaspora and mainstream retail channels.",
      "Canada's customs tariff and labelling rules (for example, bilingual labelling and textile labelling) should shape your packaging from the start.",
    ],
    buyerTypes: ["Retailers", "Importers", "E-commerce brands", "Wholesalers"],
    popularIndustries: ["apparel", "home-textiles", "handicrafts", "essential-oils"],
    considerations: [
      { title: "Bilingual labelling", body: "Consumer packaging generally needs English and French under the Consumer Packaging and Labelling Act." },
      { title: "Textile labelling", body: "The Textile Labelling Act and its regulations set fibre-content labelling rules." },
      { title: "Product safety", body: "CCPSA and product-specific regulations, such as for children's products." },
    ],
    tradeNote: "There's no India–Canada free trade agreement in force as of our last review. Check the CBSA Customs Tariff for MFN rates.",
    officialTools: [{ label: "CBSA Customs Tariff", href: "https://www.cbsa-asfc.gc.ca/trade-commerce/tariff-tarif/menu-eng.html" }],
    faqs: [{ q: "Do I need French on my packaging?", a: "Most consumer goods sold in Canada need bilingual labelling. Plan for it in your packaging artwork." }],
    plate: { slot: "market-canada", motif: "weave", tone: "madder", alt: "Textile goods prepared for Canadian retail", brief: "Folded woollen throws and textiles in a cabin-style interior; warm red tones." },
  },
  {
    slug: "uae", name: "United Arab Emirates", region: "Middle East", code: "AE",
    seoTitle: "Sourcing from India for UAE | Indian Manufacturers & CEPA",
    metaDescription: "Source from India for UAE importers and GCC re-export: home décor, textiles, packaging and engineering. India–UAE CEPA, documentation and logistics considerations.",
    heroLine: "Short sea lanes, a trade agreement, and a re-export hub.",
    intro: [
      "The India–UAE Comprehensive Economic Partnership Agreement (CEPA) entered into force on 1 May 2022. The UAE, especially Dubai's Jebel Ali, is a major hub for re-export across the Gulf, Africa and beyond.",
      "Sea routes from India's west-coast ports to the UAE are short, which makes the market attractive for replenishment programmes and mixed-product consolidation.",
    ],
    buyerTypes: ["Trading companies", "Hospitality and interiors", "Retail groups", "Re-exporters"],
    popularIndustries: ["handicrafts", "home-textiles", "furniture-woodcraft", "packaging", "engineering-industrial"],
    considerations: [
      { title: "CEPA preference", body: "Preferential duty needs goods that meet CEPA rules of origin, with a valid certificate of origin." },
      { title: "Conformity", body: "Some product categories need conformity schemes such as ECAS or EQM via the UAE's standards authority." },
      { title: "Labelling", body: "Arabic labelling may be needed for certain consumer goods." },
    ],
    tradeNote: "India–UAE CEPA has been in force since 1 May 2022. UAE customs duty under GCC rules is commonly 5% on CIF value for many goods, but check the specific HS line and any exemptions.",
    officialTools: [{ label: "Dubai Customs", href: "https://www.dubaicustoms.gov.ae/" }, INDIA_TA],
    faqs: [{ q: "Can goods be re-exported from the UAE?", a: "Yes. Free zones and re-export procedures are widely used. Structure documentation with your UAE customs broker." }],
    plate: { slot: "market-uae", motif: "jali", tone: "sand", alt: "Indian décor in a Gulf hospitality interior", brief: "Brass lanterns and textiles in a contemporary Gulf hotel lobby; golden light." },
  },
];

export const getMarket = (slug: string) => markets.find((m) => m.slug === slug);

export const marketRegions = [
  { id: "na", label: "North America", markets: ["usa", "canada"], lat: 40, lon: -98 },
  { id: "uk", label: "United Kingdom", markets: ["uk"], lat: 53, lon: -2 },
  { id: "eu", label: "Europe", markets: ["germany", "france", "netherlands"], lat: 49.5, lon: 8 },
  { id: "me", label: "Middle East", markets: ["uae"], lat: 24.4, lon: 54.4 },
  { id: "au", label: "Australia", markets: ["australia"], lat: -27, lon: 140 },
];
