import type { Cluster } from "./types";

/**
 * Manufacturing clusters. Specialisations reflect widely documented industrial
 * profiles (e.g. state industrial policies, Ministry of Textiles / MSME cluster
 * listings, GI Registry). Coordinates are city centres (WGS84).
 * Editorial rule: no supplier counts, no export-value figures without a cited source.
 */
export const clusters: Cluster[] = [
  {
    slug: "tirupur", name: "Tirupur", state: "Tamil Nadu", lat: 11.1085, lon: 77.3411, featured: true,
    specialization: "Knitwear and garments",
    summary: "India's best-known cotton knitwear hub, covering T-shirts, basics, kidswear and activewear.",
    detail: [
      "Tirupur's economy is built around knitted garments. Knitting, dyeing, printing, garmenting and trims supply sit close together, so buyers can develop custom jersey, fleece and rib fabrics as well as garments.",
      "The cluster serves everyone from large export houses to smaller units that take lower minimums. Water and effluent management in dyeing has long been a policy focus here, so it's worth asking suppliers about their dye-house practices.",
    ],
    products: ["T-shirts and polos", "Fleece and sweatshirts", "Kidswear and babywear", "Innerwear and loungewear", "Activewear"],
    industrySlugs: ["apparel", "sports-fitness", "eco-friendly"],
    buyerNotes: ["Ask whether dyeing is in-house or outsourced", "Check organic or recycled certificates for each processing site", "Fix fabric GSM and shrinkage tolerances before bulk production"],
    plate: { slot: "cluster-tirupur", motif: "knit", tone: "indigo", alt: "Circular knitting machines producing cotton jersey", brief: "Rows of circular knitting machines with cones of cotton yarn; motion blur; cool industrial light." },
  },
  {
    slug: "ludhiana", name: "Ludhiana", state: "Punjab", lat: 30.901, lon: 75.8573, featured: true,
    specialization: "Hosiery, woollens and light engineering",
    summary: "Known for hosiery, woollen knitwear, bicycles and bicycle parts, hand tools and fasteners.",
    detail: [
      "Ludhiana has a long history in hosiery and woollen knitwear: sweaters, thermals and winter wear. It's also one of India's prominent light-engineering centres, with bicycles, bicycle components, hand tools, fasteners and auto parts.",
      "That mix makes it relevant to apparel buyers looking for knitwear and to industrial buyers looking for small engineering components.",
    ],
    products: ["Sweaters and woollen knitwear", "Thermals and winter wear", "Bicycle parts", "Hand tools", "Fasteners"],
    industrySlugs: ["apparel", "engineering-industrial", "sports-fitness"],
    buyerNotes: ["Winter wear is seasonal, so book capacity early", "Get material test certificates for engineering parts"],
    plate: { slot: "cluster-ludhiana", motif: "knit", tone: "madder", alt: "Woollen knitwear on a flat-knitting machine", brief: "Woollen sweater panels on a flat-knitting machine; warm red-brown tones." },
  },
  {
    slug: "jaipur", name: "Jaipur", state: "Rajasthan", lat: 26.9124, lon: 75.7873, featured: true,
    specialization: "Handicrafts, textiles and jewelry",
    summary: "Gemstones, silver jewelry, block-printed textiles, blue pottery and home décor.",
    detail: [
      "Jaipur is one of India's most important craft and design cities. It's internationally recognised for coloured gemstone cutting and jewelry, and the surrounding region (including Sanganer and Bagru) is known for hand block printing.",
      "For décor, fashion and lifestyle brands, Jaipur offers a rare mix of craft depth and export experience, from small artisan workshops to established export houses.",
    ],
    products: ["Gemstone and silver jewelry", "Hand block-printed textiles", "Blue pottery", "Home décor and furnishings", "Fashion garments"],
    industrySlugs: ["jewelry-accessories", "handicrafts", "home-textiles", "apparel", "stationery-paper"],
    buyerNotes: ["Block prints vary slightly by hand, so approve a strike-off", "Get stone-treatment disclosures for gemstones"],
    gi: "Sanganeri and Bagru hand block prints and Jaipur Blue Pottery are registered GIs.",
    plate: { slot: "cluster-jaipur", motif: "block", tone: "madder", alt: "Hand block printing on cotton fabric", brief: "Artisan pressing a carved wooden block onto cotton; madder red and indigo dyes; overhead light." },
  },
  {
    slug: "moradabad", name: "Moradabad", state: "Uttar Pradesh", lat: 28.8386, lon: 78.7733, featured: true,
    specialization: "Brassware and metal décor",
    summary: "Known as \"Peetal Nagri\" (Brass City), a major hub for metal handicrafts, décor and lighting.",
    detail: [
      "Moradabad's metal-handicraft industry makes brass, aluminium, iron and mixed-metal décor, tableware, lighting and seasonal products for export markets.",
      "Techniques include sand casting, sheet work, engraving, enamelling, electroplating and antique finishing. Finish development and plating consistency are the main quality levers.",
    ],
    products: ["Brass décor and vases", "Metal lighting and lanterns", "Tableware and barware", "Planters", "Festive décor"],
    industrySlugs: ["handicrafts", "lighting", "kitchenware-tableware"],
    buyerNotes: ["Approve finish samples under consistent lighting", "Check lacquer and plating for tarnish resistance", "Food-contact items need lining and testing"],
    gi: "Moradabad Metal Craft is a registered GI.",
    plate: { slot: "cluster-moradabad", motif: "radial", tone: "bronze", alt: "Brass vessels being polished in a workshop", brief: "Polishing a brass vessel on a buffing wheel; sparks of light; bronze and black." },
  },
  {
    slug: "saharanpur", name: "Saharanpur", state: "Uttar Pradesh", lat: 29.9640, lon: 77.5460, featured: true,
    specialization: "Wooden handicrafts",
    summary: "Renowned for hand wood carving: furniture, décor, boxes and accent pieces.",
    detail: [
      "Saharanpur is known for intricate wood carving, traditionally in sheesham and other hardwoods, applied to furniture, screens, boxes and décor.",
      "Hand carving takes time and varies naturally. For volume programmes, combining hand finishing with machine-assisted shaping can balance character and consistency.",
    ],
    products: ["Carved furniture", "Wooden boxes and trays", "Wall panels and screens", "Décor accents", "Wooden toys"],
    industrySlugs: ["handicrafts", "furniture-woodcraft", "toys-educational", "kitchenware-tableware"],
    buyerNotes: ["Specify species and moisture content", "Prepare timber-legality documents for EU and US"],
    gi: "Saharanpur Wood Craft is a registered GI.",
    plate: { slot: "cluster-saharanpur", motif: "grain", tone: "clay", alt: "Intricate hand-carved wooden panel", brief: "Macro of a hand-carved floral wood panel; raking light showing depth; warm brown." },
  },
  {
    slug: "rajkot", name: "Rajkot", state: "Gujarat", lat: 22.3039, lon: 70.8022, featured: true,
    specialization: "Engineering and metal products",
    summary: "Castings, diesel engines, pumps, machine-tool parts, auto components and bearings.",
    detail: [
      "Rajkot is one of Gujarat's main engineering clusters, known for castings and forgings, diesel engines, submersible pumps, machine-tool components and auto parts. Gujarat also hosts major west-coast ports, which helps export logistics.",
      "Buyers should expect build-to-print capability across many small and medium firms. Drawing clarity and inspection plans matter a great deal here.",
    ],
    products: ["Castings and forgings", "Pumps and engine parts", "Machine-tool components", "Auto components", "Bearings and hardware"],
    industrySlugs: ["engineering-industrial"],
    buyerNotes: ["Share GD&T-complete drawings", "Plan first-article inspection", "Ask for EN 10204 3.1 certificates"],
    plate: { slot: "cluster-rajkot", motif: "blueprint", tone: "charcoal", alt: "Molten metal being poured in a foundry", brief: "Foundry pour with glowing metal; dark environment; orange accents against charcoal." },
  },
  {
    slug: "surat", name: "Surat", state: "Gujarat", lat: 21.1702, lon: 72.8311, featured: true,
    specialization: "Synthetic textiles and diamonds",
    summary: "A leading centre for man-made fibre fabrics, sarees and dress materials, and diamond processing.",
    detail: [
      "Surat is widely recognised as a major centre for man-made fibre textiles: polyester and viscose weaving, embroidery and processing. It's also one of the world's leading diamond cutting and polishing centres.",
      "For apparel and accessory buyers, Surat is a source of synthetic and blended fabrics, embroidery and trims.",
    ],
    products: ["Polyester and viscose fabrics", "Embroidered fabrics", "Dress materials", "Polished diamonds"],
    industrySlugs: ["apparel", "jewelry-accessories"],
    buyerNotes: ["Specify fibre composition and test it", "Check REACH compliance of dyes and finishes"],
    plate: { slot: "cluster-surat", motif: "weave", tone: "indigo", alt: "Synthetic fabric rolls on a weaving floor", brief: "Rolls of shimmering synthetic fabric in a weaving shed; cool tones; depth." },
  },
  {
    slug: "panipat", name: "Panipat", state: "Haryana", lat: 29.3909, lon: 76.9635, featured: true,
    specialization: "Home textiles and rugs",
    summary: "Known as the \"City of Weavers\", with home furnishings, rugs, blankets and recycled-yarn textiles.",
    detail: [
      "Panipat is a major home-furnishing cluster: rugs, bath mats, throws, cushions, curtains and blankets. It's particularly known for recycling textile waste into yarn used in blankets and throws.",
      "Its proximity to Delhi gives access to the northern logistics corridor.",
    ],
    products: ["Rugs and bath mats", "Throws and blankets", "Cushion covers", "Curtains", "Recycled-yarn textiles"],
    industrySlugs: ["home-textiles", "eco-friendly"],
    buyerNotes: ["For recycled claims, ask for GRS or RCS certification", "Rugs for the US need flammability testing"],
    plate: { slot: "cluster-panipat", motif: "weave", tone: "sand", alt: "Handloom weaving a flat-weave rug", brief: "Weaver at a handloom with a flat-weave rug in progress; warm sand tones; rhythmic threads." },
  },
  {
    slug: "agra", name: "Agra", state: "Uttar Pradesh", lat: 27.1767, lon: 78.0081, featured: true,
    specialization: "Leather goods and footwear",
    summary: "A long-established footwear manufacturing centre for domestic and export markets.",
    detail: [
      "Agra is one of India's best-known shoe-making cities. Production runs from small workshops to export factories making leather footwear.",
      "Agra is also known for marble inlay craft (pietra dura), which is relevant to décor buyers.",
    ],
    products: ["Leather shoes", "Sandals", "Boots", "Marble inlay décor"],
    industrySlugs: ["footwear-leather", "handicrafts"],
    buyerNotes: ["Confirm lasts and size grading for your market", "Ask about tannery sourcing and Cr(VI) testing"],
    plate: { slot: "cluster-agra", motif: "grain", tone: "madder", alt: "Leather shoe being hand-lasted", brief: "Shoemaker lasting a leather upper; tools and pattern pieces; dramatic warm light." },
  },
  {
    slug: "pune", name: "Pune", state: "Maharashtra", lat: 18.5204, lon: 73.8567, featured: true,
    specialization: "Engineering and manufacturing ecosystem",
    summary: "One of India's leading automotive and engineering hubs, and NGB Ventures' home base.",
    detail: [
      "Pune and its industrial belts, including Chakan, Pimpri-Chinchwad, Talegaon and Ranjangaon, host automotive OEMs, auto-component makers, engineering and electronics manufacturers. Pune is a major hub of India's automotive industry.",
      "Pune is within road reach of Jawaharlal Nehru Port (Nhava Sheva), one of India's main container gateways. NGB Ventures is based here, which helps when coordinating with western India's engineering supply base.",
    ],
    products: ["Auto components", "Precision machined parts", "Fabrications", "Industrial equipment", "Packaging"],
    industrySlugs: ["engineering-industrial", "packaging", "beauty-personal-care"],
    buyerNotes: ["Strong base for build-to-print engineering", "Easy road links to JNPT for sea freight"],
    plate: { slot: "cluster-pune", motif: "blueprint", tone: "stone", alt: "Precision engineering workshop in Pune", brief: "Modern CNC shop floor with clean lines; cool daylight; stone grey palette." },
  },
  {
    slug: "sivakasi", name: "Sivakasi", state: "Tamil Nadu", lat: 9.4533, lon: 77.8024, featured: true,
    specialization: "Printing and packaging",
    summary: "One of India's largest printing hubs, known for offset printing, labels, cartons and stationery.",
    detail: [
      "Sivakasi is widely recognised as a major printing centre, covering offset printing, calendars, diaries, labels and packaging. It's also known for its match and fireworks industries.",
      "For buyers, it's a source of printed packaging, stationery and paper products.",
    ],
    products: ["Printed cartons", "Labels", "Diaries and calendars", "Notebooks", "Printed stationery"],
    industrySlugs: ["packaging", "stationery-paper"],
    buyerNotes: ["Approve press proofs for colour-critical work", "Specify board GSM and finish"],
    plate: { slot: "cluster-sivakasi", motif: "fold", tone: "sand", alt: "Offset printing press with printed sheets", brief: "Printed sheets coming off an offset press; CMYK registration marks; crisp light." },
  },
  {
    slug: "khambhat", name: "Khambhat", state: "Gujarat", lat: 22.3124, lon: 72.6189, featured: true,
    specialization: "Handicrafts and agate products",
    summary: "A historic centre of agate bead-making and semi-precious stone craft.",
    detail: [
      "Khambhat (Cambay) has a long tradition of agate and carnelian bead-making. Artisans cut, shape, polish and drill semi-precious stones into beads, jewelry and décor.",
      "Khambhat Agate Craft is a registered Geographical Indication.",
    ],
    products: ["Agate beads", "Semi-precious jewelry", "Agate décor and coasters", "Stone accessories"],
    industrySlugs: ["jewelry-accessories", "handicrafts"],
    buyerNotes: ["Agree colour ranges with reference strands", "Ask whether stones are dyed or heat-treated"],
    gi: "Khambhat Agate Craft is a registered GI.",
    plate: { slot: "cluster-khambhat", motif: "facet", tone: "madder", alt: "Polished agate and carnelian beads", brief: "Pile of polished carnelian and agate beads; translucent glow; deep red and amber." },
  },
  // Secondary clusters (shown as minor points on the map)
  {
    slug: "kannauj", name: "Kannauj", state: "Uttar Pradesh", lat: 27.0514, lon: 79.9137, featured: false,
    specialization: "Attars and natural perfumery",
    summary: "India's historic perfume town, known for traditional hydro-distilled attars.",
    detail: ["Kannauj's perfumers use the traditional deg-bhapka copper-still method to make attars from flowers, herbs and earth (mitti attar).", "Kannauj Perfume is a registered Geographical Indication."],
    products: ["Attars", "Floral waters", "Essential oils"],
    industrySlugs: ["essential-oils", "beauty-personal-care"],
    buyerNotes: ["Ask for GC-MS and COA per batch", "Check IFRA compliance for finished products"],
    gi: "Kannauj Perfume is a registered GI.",
    plate: { slot: "cluster-kannauj", motif: "botanical", tone: "olive", alt: "Copper stills used in traditional attar distillation", brief: "Copper deg stills over fire with rose petals; smoky warm light." },
  },
  {
    slug: "karur", name: "Karur", state: "Tamil Nadu", lat: 10.9601, lon: 78.0766, featured: false,
    specialization: "Woven home textiles",
    summary: "A major centre for woven home linens: kitchen, table and bed linen.",
    detail: ["Karur specialises in woven home textiles, including table linen, kitchen towels, bed linen and curtains, for export.", "It's useful for buyers looking for woven cotton home products at volume."],
    products: ["Kitchen towels", "Table linen", "Bed linen", "Curtains"],
    industrySlugs: ["home-textiles"],
    buyerNotes: ["Specify thread count and construction", "Test colourfastness"],
    plate: { slot: "cluster-karur", motif: "weave", tone: "stone", alt: "Woven cotton kitchen linen", brief: "Stacked woven kitchen towels in checks and stripes; soft light." },
  },
  {
    slug: "bhadohi", name: "Bhadohi", state: "Uttar Pradesh", lat: 25.3956, lon: 82.5683, featured: false,
    specialization: "Hand-knotted and tufted carpets",
    summary: "India's best-known carpet belt, with hand-knotted, hand-tufted and flat-weave rugs.",
    detail: ["The Bhadohi–Mirzapur belt is India's largest hand-made carpet cluster.", "Bhadohi Hand-made Carpet is a registered GI."],
    products: ["Hand-knotted rugs", "Hand-tufted rugs", "Dhurries"],
    industrySlugs: ["home-textiles"],
    buyerNotes: ["Ask about labour due diligence and GoodWeave participation", "Knot density drives price and lead time"],
    gi: "Bhadohi Hand-made Carpet is a registered GI.",
    plate: { slot: "cluster-bhadohi", motif: "weave", tone: "madder", alt: "Hand-knotted carpet on a loom", brief: "Back of a hand-knotted carpet on a vertical loom; rich madder reds." },
  },
  {
    slug: "jodhpur", name: "Jodhpur", state: "Rajasthan", lat: 26.2389, lon: 73.0243, featured: false,
    specialization: "Solid-wood and iron furniture",
    summary: "A leading Indian furniture-export hub for wood and iron-and-wood furniture.",
    detail: ["Jodhpur's furniture industry exports solid-wood, reclaimed-look and iron-and-wood furniture.", "It suits buyers of rustic and industrial-style furniture."],
    products: ["Solid-wood furniture", "Iron-and-wood furniture", "Décor accents"],
    industrySlugs: ["furniture-woodcraft", "handicrafts"],
    buyerNotes: ["Specify kiln-drying moisture content", "Plan KD construction to reduce freight"],
    plate: { slot: "cluster-jodhpur", motif: "grain", tone: "sand", alt: "Solid-wood furniture in a Jodhpur workshop", brief: "Solid wood tables stacked in a sunlit Jodhpur workshop; sand tones." },
  },
  {
    slug: "firozabad", name: "Firozabad", state: "Uttar Pradesh", lat: 27.1592, lon: 78.3957, featured: false,
    specialization: "Glassware",
    summary: "India's glass city: glassware, bangles and decorative glass.",
    detail: ["Firozabad is India's best-known glass-making centre, producing bangles, glassware, lighting glass and decorative items.", "Firozabad Glass is a registered GI."],
    products: ["Glassware", "Glass lighting shades", "Decorative glass"],
    industrySlugs: ["lighting", "kitchenware-tableware", "handicrafts"],
    buyerNotes: ["Agree thickness and bubble tolerances", "Food-contact glass may need lead and cadmium testing"],
    gi: "Firozabad Glass is a registered GI.",
    plate: { slot: "cluster-firozabad", motif: "radial", tone: "olive", alt: "Hand-blown glass being shaped", brief: "Glowing glass gather on a blowpipe; dark furnace background." },
  },
  {
    slug: "kanpur", name: "Kanpur", state: "Uttar Pradesh", lat: 26.4499, lon: 80.3319, featured: false,
    specialization: "Leather tanning and goods",
    summary: "A major tanning and leather-products centre: saddlery, footwear and leather goods.",
    detail: ["Kanpur is one of India's important leather clusters, with tanneries and manufacturers of saddlery, footwear and leather goods.", "Tannery environmental performance is an important due-diligence point."],
    products: ["Finished leather", "Saddlery", "Leather goods", "Footwear"],
    industrySlugs: ["footwear-leather"],
    buyerNotes: ["Ask for LWG ratings", "Test for Cr(VI)"],
    plate: { slot: "cluster-kanpur", motif: "grain", tone: "clay", alt: "Stacks of finished leather hides", brief: "Stacks of finished leather hides in a warehouse; warm brown tones." },
  },
  {
    slug: "jalandhar", name: "Jalandhar", state: "Punjab", lat: 31.326, lon: 75.5762, featured: false,
    specialization: "Sports goods",
    summary: "One of India's leading sports-goods manufacturing centres.",
    detail: ["Jalandhar makes a wide range of sports goods, including cricket equipment, balls, protective gear and fitness accessories."],
    products: ["Cricket equipment", "Balls", "Protective gear", "Fitness accessories"],
    industrySlugs: ["sports-fitness"],
    buyerNotes: ["Specify weight and size standards", "Plan performance testing"],
    plate: { slot: "cluster-jalandhar", motif: "dots", tone: "indigo", alt: "Hand-stitched cricket balls", brief: "Hand-stitching cricket balls; tight crop; red leather and white thread." },
  },
  {
    slug: "channapatna", name: "Channapatna", state: "Karnataka", lat: 12.6518, lon: 77.2089, featured: false,
    specialization: "Lacquered wooden toys",
    summary: "Known as \"Gombegala Ooru\" (toy town), with turned and lacquered wooden toys.",
    detail: ["Channapatna's artisans turn wood on lathes and colour it with lac-based finishes.", "Channapatna Toys & Dolls is a registered GI."],
    products: ["Wooden toys", "Dolls", "Lacquerware"],
    industrySlugs: ["toys-educational", "handicrafts"],
    buyerNotes: ["Test to EN 71 or ASTM F963 for export", "Check small parts for under-3 products"],
    gi: "Channapatna Toys & Dolls is a registered GI.",
    plate: { slot: "cluster-channapatna", motif: "dots", tone: "madder", alt: "Lacquered wooden toys being turned on a lathe", brief: "Lathe-turning a lacquered toy; colourful lac sticks; warm light." },
  },
  {
    slug: "alappuzha", name: "Alappuzha", state: "Kerala", lat: 9.4981, lon: 76.3388, featured: false,
    specialization: "Coir products",
    summary: "The historic centre of India's coir industry: mats, matting, rope and geotextiles.",
    detail: ["Alappuzha (Alleppey) is closely associated with coir: spinning, weaving and moulding coconut-husk fibre into mats, matting, garden products and geotextiles.", "Alleppey Coir is a registered GI."],
    products: ["Coir doormats", "Matting", "Garden and planter products", "Coir rope"],
    industrySlugs: ["eco-friendly", "home-textiles"],
    buyerNotes: ["Check phytosanitary needs for your market", "Latex or PVC backings affect sustainability claims"],
    gi: "Alleppey Coir is a registered GI.",
    plate: { slot: "cluster-alappuzha", motif: "weave", tone: "olive", alt: "Coir fibre being woven into mats", brief: "Coir fibre and woven mats beside backwaters; natural tones." },
  },
];

export const getCluster = (slug: string) => clusters.find((c) => c.slug === slug);
export const featuredClusters = clusters.filter((c) => c.featured);

/** Projection calibrated to @svg-maps/india (viewBox 0 0 612 696): Mercator fit, ≤2px error on reference points. */
export function projectIndia(lat: number, lon: number) {
  const merc = (l: number) => (180 / Math.PI) * Math.log(Math.tan(Math.PI / 4 + (l * Math.PI) / 360));
  return { x: 20.88972 * lon - 1422.799, y: -20.95262 * merc(lat) + 837.631 };
}

export const formatCoord = (lat: number, lon: number) =>
  `${Math.abs(lat).toFixed(2)}°${lat >= 0 ? "N" : "S"} ${Math.abs(lon).toFixed(2)}°${lon >= 0 ? "E" : "W"}`;
