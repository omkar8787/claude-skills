/**
 * INDIA MANUFACTURING ATLAS: state-level content.
 * Cluster specialisations are widely documented regional industrial profiles (district ODOP listings,
 * state industrial policies, handicraft/handloom department pages). They are research starting points,
 * NOT claims of NGB supplier relationships. GI references link only to records in gi.ts.
 */
export type AtlasState = {
  id: string; // @svg-maps/india id
  name: string;
  tagline: string;
  summary: string;
  clusters: { name: string; focus: string; clusterSlug?: string }[];
  crafts: string[];
  industrial: string[];
  giSlugs: string[];
  sourcingIdeas: string[];
};

export const atlasStates: AtlasState[] = [
  {
    id: "up", name: "Uttar Pradesh", tagline: "Metal, wood, fragrance, carpets and silk",
    summary: "One of India's densest craft economies. Its towns specialise to a remarkable degree, from Moradabad's brass to Kannauj's attars and Bhadohi's carpets.",
    clusters: [
      { name: "Moradabad", focus: "Brass and metal décor, lighting, barware", clusterSlug: "moradabad" },
      { name: "Saharanpur", focus: "Hand-carved wood furniture and décor", clusterSlug: "saharanpur" },
      { name: "Kannauj", focus: "Attars, floral waters, natural perfumery", clusterSlug: "kannauj" },
      { name: "Varanasi", focus: "Banarasi silk weaving, gulabi meenakari, wooden toys" },
      { name: "Bhadohi", focus: "Hand-knotted and tufted carpets", clusterSlug: "bhadohi" },
      { name: "Agra & Kanpur", focus: "Leather footwear and leather goods", clusterSlug: "agra" },
      { name: "Firozabad", focus: "Glassware and glass décor", clusterSlug: "firozabad" },
    ],
    crafts: ["Brassware", "Wood carving", "Attar distillation", "Carpet weaving", "Silk weaving", "Enamel (meenakari)"],
    industrial: ["Leather and footwear", "Glass", "Food processing", "Electronics (Noida)"],
    giSlugs: ["moradabad-metal-craft", "saharanpur-wood-craft", "kannauj-perfume", "firozabad-glass", "banaras-gulabi-meenakari"],
    sourcingIdeas: ["Custom brass barware and hotel amenities", "Natural attar ranges for fragrance brands", "Hand-knotted rugs for interior designers"],
  },
  {
    id: "rj", name: "Rajasthan", tagline: "Colour, craft and solid wood",
    summary: "Block printing, blue pottery, gemstones and solid-wood furniture. Rajasthan supplies much of the world's Indian décor aesthetic.",
    clusters: [
      { name: "Jaipur", focus: "Gemstones, silver jewellery, block print, blue pottery", clusterSlug: "jaipur" },
      { name: "Jodhpur", focus: "Solid-wood and iron furniture, handicrafts", clusterSlug: "jodhpur" },
      { name: "Bikaner", focus: "Bhujia and snacks, woollens" },
      { name: "Sanganer & Bagru", focus: "Hand block printing on cotton" },
    ],
    crafts: ["Hand block printing", "Blue pottery", "Gem cutting", "Lac and metal work"],
    industrial: ["Stone and marble", "Textile processing", "Furniture"],
    giSlugs: ["blue-pottery-of-jaipur", "bikaneri-bhujia"],
    sourcingIdeas: ["Block-printed bedding and table linen", "Mango-wood furniture collections", "Silver and gemstone jewellery lines"],
  },
  {
    id: "gj", name: "Gujarat", tagline: "Agate, embroidery, ceramics and engineering",
    summary: "Artisan traditions sit alongside heavy industry. Kutch embroidery and Khambhat agate share a state with Morbi's ceramic tiles and Rajkot's engineering base.",
    clusters: [
      { name: "Khambhat", focus: "Agate and carnelian beads", clusterSlug: "khambhat" },
      { name: "Kutch", focus: "Embroidery, ajrakh printing, bandhani" },
      { name: "Morbi", focus: "Ceramic tiles and sanitaryware" },
      { name: "Rajkot", focus: "Castings, pumps, engine and machine parts", clusterSlug: "rajkot" },
      { name: "Surat", focus: "Synthetic textiles, diamond processing", clusterSlug: "surat" },
    ],
    crafts: ["Kutch embroidery", "Ajrakh block printing", "Bandhani tie-dye", "Agate work"],
    industrial: ["Ceramics", "Engineering and castings", "Synthetic textiles", "Chemicals"],
    giSlugs: ["agates-of-cambay", "kutch-embroidery"],
    sourcingIdeas: ["Ceramic tile programmes for distributors", "Agate beads for jewellery brands", "Embroidered accessories with artisan collectives"],
  },
  {
    id: "mh", name: "Maharashtra", tagline: "Engineering heartland with heritage weaves",
    summary: "Home to NGB Ventures. Pune and Nashik anchor automotive and engineering, while Paithani, Kolhapuri chappals and Nagpur oranges carry the state's heritage.",
    clusters: [
      { name: "Pune", focus: "Automotive, engineering, precision manufacturing (NGB base)", clusterSlug: "pune" },
      { name: "Kolhapur", focus: "Kolhapuri chappals, foundry and engineering" },
      { name: "Nashik & Yeola", focus: "Paithani weaving, automotive, grapes and wine" },
      { name: "Nagpur", focus: "Oranges, logistics hub of central India" },
      { name: "Paithan", focus: "Paithani silk weaving" },
    ],
    crafts: ["Paithani weaving", "Kolhapuri leather work", "Warli art"],
    industrial: ["Automotive and components", "Engineering", "Pharmaceuticals", "Food processing"],
    giSlugs: ["paithani", "kolhapuri-chappal", "nagpur-orange"],
    sourcingIdeas: ["Build-to-print engineering components", "Heritage leather sandals with GI attribution", "Paithani-fabric accessories"],
  },
  {
    id: "tn", name: "Tamil Nadu", tagline: "Knitwear, silk, print and machinery",
    summary: "From Tiruppur's knitwear to Kanchipuram silk and Sivakasi's printing presses, Tamil Nadu is one of India's most export-oriented manufacturing states.",
    clusters: [
      { name: "Tiruppur", focus: "Cotton knitwear and basics", clusterSlug: "tirupur" },
      { name: "Kanchipuram", focus: "Silk sarees and fabrics" },
      { name: "Sivakasi", focus: "Printing, packaging, stationery", clusterSlug: "sivakasi" },
      { name: "Coimbatore", focus: "Pumps, motors, textile machinery" },
      { name: "Karur", focus: "Woven home textiles", clusterSlug: "karur" },
    ],
    crafts: ["Silk weaving", "Bronze casting", "Tanjore painting"],
    industrial: ["Textiles and apparel", "Automotive", "Pumps and motors", "Printing"],
    giSlugs: ["kancheepuram-silk"],
    sourcingIdeas: ["Private-label T-shirts and loungewear", "Printed activity books and packaging", "Kitchen and table linen"],
  },
  {
    id: "ka", name: "Karnataka", tagline: "Toys, silk, sandalwood and technology",
    summary: "Channapatna's lacquered toys and Mysore silk sit beside Bengaluru's electronics and engineering ecosystem.",
    clusters: [
      { name: "Channapatna", focus: "Lacquered wooden toys", clusterSlug: "channapatna" },
      { name: "Mysuru", focus: "Silk, sandalwood products, incense" },
      { name: "Bengaluru", focus: "Electronics, engineering, apparel" },
      { name: "Belagavi", focus: "Kolhapuri-style leather footwear, foundries" },
    ],
    crafts: ["Lacquerware toys", "Silk weaving", "Sandalwood carving", "Bidriware"],
    industrial: ["Electronics", "Aerospace components", "Apparel", "Agarbatti (incense)"],
    giSlugs: ["channapatna-toys-dolls", "mysore-silk"],
    sourcingIdeas: ["Plastic-free wooden toys", "Incense and natural fragrance products", "Electronics enclosures and assemblies"],
  },
  {
    id: "wb", name: "West Bengal", tagline: "Tea, jute, leather and silk",
    summary: "Darjeeling tea, Kolkata's jute and leather industries, and Murshidabad silk make Bengal a strong source of natural-fibre and premium agricultural products.",
    clusters: [
      { name: "Darjeeling", focus: "Tea (GI-registered)" },
      { name: "Kolkata", focus: "Jute goods, leather goods, printing" },
      { name: "Murshidabad", focus: "Silk weaving" },
    ],
    crafts: ["Kantha embroidery", "Terracotta", "Dokra metal casting"],
    industrial: ["Jute products", "Leather", "Tea processing"],
    giSlugs: ["darjeeling-tea"],
    sourcingIdeas: ["Jute bags and home textiles", "Leather bags and accessories", "Premium tea for private label"],
  },
  {
    id: "or", name: "Odisha", tagline: "Ikat, appliqué and silver filigree",
    summary: "A deep textile and metal-craft tradition, including Sambalpuri ikat, Pipili appliqué and Cuttack's silver filigree.",
    clusters: [
      { name: "Sambalpur", focus: "Ikat (bandha) handloom textiles" },
      { name: "Pipili", focus: "Appliqué textiles, lanterns and canopies" },
      { name: "Cuttack", focus: "Silver filigree (tarakasi)" },
    ],
    crafts: ["Ikat weaving", "Appliqué", "Silver filigree", "Pattachitra painting"],
    industrial: ["Metals and mining", "Seafood processing"],
    giSlugs: [],
    sourcingIdeas: ["Ikat textiles for interiors", "Filigree jewellery and décor", "Appliqué décor for hospitality"],
  },
  {
    id: "pb", name: "Punjab", tagline: "Woollens, sports goods and tools",
    summary: "Ludhiana's knitwear and light engineering and Jalandhar's sports goods make Punjab a practical source for winterwear and equipment.",
    clusters: [
      { name: "Ludhiana", focus: "Woollen knitwear, bicycles, hand tools", clusterSlug: "ludhiana" },
      { name: "Jalandhar", focus: "Sports goods, hand tools", clusterSlug: "jalandhar" },
    ],
    crafts: ["Phulkari embroidery"],
    industrial: ["Hosiery", "Bicycles and parts", "Sports goods", "Hand tools"],
    giSlugs: [],
    sourcingIdeas: ["Private-label sports accessories", "Winter knitwear", "Hand tools for hardware retail"],
  },
  {
    id: "hr", name: "Haryana", tagline: "Home textiles and recycling",
    summary: "Panipat leads in home furnishings and recycled-yarn textiles, close to the Delhi NCR logistics corridor.",
    clusters: [{ name: "Panipat", focus: "Rugs, throws, blankets, recycled yarn", clusterSlug: "panipat" }],
    crafts: ["Durrie weaving"],
    industrial: ["Home textiles", "Automotive (Gurugram–Manesar)"],
    giSlugs: [],
    sourcingIdeas: ["Recycled-yarn throws", "Flat-weave rugs", "Bath mats and cushions"],
  },
  {
    id: "kl", name: "Kerala", tagline: "Coir, spices and natural products",
    summary: "Coir from Alappuzha, spices and coconut-based natural products give Kerala a strong eco-product profile.",
    clusters: [{ name: "Alappuzha", focus: "Coir mats, matting and geotextiles", clusterSlug: "alappuzha" }],
    crafts: ["Coir weaving", "Bell-metal craft", "Screw-pine weaving"],
    industrial: ["Spices", "Seafood", "Coconut products"],
    giSlugs: ["alleppey-coir"],
    sourcingIdeas: ["Coir doormats for garden retail", "Coconut-shell homeware", "Spice gift sets"],
  },
  {
    id: "jk", name: "Jammu & Kashmir", tagline: "Pashmina, papier-mâché and walnut wood",
    summary: "Kashmir's hand-spun pashmina, papier-mâché and walnut-wood carving are among India's most refined crafts.",
    clusters: [{ name: "Srinagar", focus: "Pashmina, papier-mâché, walnut-wood carving, carpets" }],
    crafts: ["Pashmina weaving", "Sozni embroidery", "Papier-mâché", "Walnut-wood carving"],
    industrial: ["Horticulture (apples, saffron)"],
    giSlugs: ["kashmir-pashmina"],
    sourcingIdeas: ["Luxury shawls and stoles", "Papier-mâché décor and ornaments"],
  },
];

export const getAtlasState = (id: string) => atlasStates.find((s) => s.id === id);
