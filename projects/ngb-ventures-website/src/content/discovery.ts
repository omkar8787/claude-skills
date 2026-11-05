import type { Plate } from "./types";
import { products } from "./products";
import { giProducts } from "./gi";
import { productCards, type ProductCard } from "./product-cards";

/**
 * Product Discovery Engine dataset.
 * "giStatus" values:
 *   - "registered-gi": linked to a record in gi.ts with registry-record confidence
 *   - "reported-gi": linked GI record of secondary confidence (unverified)
 *   - "traditional": a traditional/regional product with no GI claim made
 *   - "industrial": manufactured category, no GI relevance
 * Availability is never implied: every item leads to a sourcing enquiry and feasibility check.
 */
export type GiFlag = "registered-gi" | "reported-gi" | "traditional" | "industrial";
export type DiscoveryItem = {
  slug: string;
  name: string;
  state: string;
  stateId: string;
  category: string;
  material: string;
  giStatus: GiFlag;
  cluster: string;
  customizable: boolean;
  type: "Finished product" | "Raw / natural material" | "Component" | "Textile / fabric" | "Food & agri" | "Gift collection";
  story: string;
  href: string;
  plate: Plate;
  /** Structured product-card details (spotlight products). */
  card?: ProductCard;
};

const spotlight: DiscoveryItem[] = [
  { slug: "brass-barware", name: "Hand-finished brass barware", state: "Uttar Pradesh", stateId: "up", category: "Kitchen & Tableware", material: "Brass", giStatus: "traditional", cluster: "Moradabad", customizable: true, type: "Finished product", story: "Tumblers, jiggers and whiskey cups cast, spun or hammered in Moradabad, with linings and finishes specified for food contact.", href: "/quote?type=sourcing&product=Brass%20barware&category=Kitchenware%20%26%20Tableware", plate: { slot: "spot-brass-barware", motif: "radial", tone: "bronze", alt: "Hammered brass whiskey cups", brief: "Hammered brass cups on dark stone; low light." } },
  { slug: "block-print-linen", name: "Hand block-printed table linen", state: "Rajasthan", stateId: "rj", category: "Home Textiles", material: "Cotton", giStatus: "traditional", cluster: "Jaipur / Sanganer / Bagru", customizable: true, type: "Textile / fabric", story: "Carved teak blocks and natural or azo-free dyes: table linen and bedding with a visible human hand.", href: "/quote?type=sourcing&product=Block-printed%20table%20linen&category=Home%20Textiles", plate: { slot: "spot-block-print", motif: "block", tone: "madder", alt: "Hand block-printed cotton", brief: "Artisan pressing a block onto cotton." } },
  { slug: "natural-attars", name: "Natural attar collections", state: "Uttar Pradesh", stateId: "up", category: "Essential Oils & Natural Products", material: "Botanical oils", giStatus: "registered-gi", cluster: "Kannauj", customizable: true, type: "Finished product", story: "Rose, khus, mitti and kewda distilled the slow way. For a GI claim, source from Kannauj Perfume authorised users.", href: "/origin/kannauj-perfume", plate: { slot: "spot-attars", motif: "botanical", tone: "olive", alt: "Attar bottles", brief: "Small cut-glass attar bottles with petals." } },
  { slug: "natural-loofah-range", name: "Natural loofah bath range", state: "Multiple states", stateId: "", category: "Eco-Friendly Products", material: "Luffa gourd fibre", giStatus: "traditional", cluster: "Multiple growing regions", customizable: true, type: "Raw / natural material", story: "Plastic-free exfoliation: whole gourds, cut pads and sewn mitts, packed in paper.", href: "/products/natural-loofah", plate: { slot: "spot-loofah", motif: "dots", tone: "sand", alt: "Natural loofah sponges", brief: "Loofah discs on linen." } },
  { slug: "coir-doormats", name: "Coir doormats & garden products", state: "Kerala", stateId: "kl", category: "Eco-Friendly Products", material: "Coconut coir", giStatus: "registered-gi", cluster: "Alappuzha", customizable: true, type: "Finished product", story: "Woven and moulded coir from the backwaters of Alappuzha. The Alleppey Coir GI's renewal status is being checked.", href: "/origin/alleppey-coir", plate: { slot: "spot-coir", motif: "weave", tone: "olive", alt: "Coir doormat", brief: "Coir doormat texture close-up." } },
  { slug: "mango-wood-furniture", name: "Mango-wood furniture collections", state: "Rajasthan", stateId: "rj", category: "Furniture & Woodcraft", material: "Mango wood, iron", giStatus: "traditional", cluster: "Jodhpur", customizable: true, type: "Finished product", story: "Kiln-dried mango wood with iron or cane accents, converted to knock-down designs for efficient freight.", href: "/industries/furniture-woodcraft", plate: { slot: "spot-mango-wood", motif: "grain", tone: "clay", alt: "Mango-wood sideboard", brief: "Mango-wood sideboard in a sunlit room." } },
  { slug: "printed-activity-books", name: "Printed activity & sticker books", state: "Tamil Nadu", stateId: "tn", category: "Stationery & Paper Products", material: "Paper & board", giStatus: "industrial", cluster: "Sivakasi / Delhi NCR", customizable: true, type: "Finished product", story: "Offset-printed activity, colouring and sticker books for private-label publishers and retailers.", href: "/publishers-printing", plate: { slot: "spot-activity-books", motif: "fold", tone: "sand", alt: "Printed activity books", brief: "Stack of colourful activity books." } },
  { slug: "machined-components", name: "Precision machined components", state: "Maharashtra", stateId: "mh", category: "Engineering & Industrial Products", material: "Steel, aluminium, brass", giStatus: "industrial", cluster: "Pune / Rajkot", customizable: true, type: "Component", story: "Build-to-print turned and milled parts with first-article inspection and material certificates.", href: "/industries/engineering-industrial", plate: { slot: "spot-machined", motif: "blueprint", tone: "charcoal", alt: "Machined components", brief: "Machined parts on granite with calipers." } },
  { slug: "ikat-textiles", name: "Handloom ikat textiles", state: "Odisha", stateId: "or", category: "Home Textiles", material: "Cotton, silk", giStatus: "traditional", cluster: "Sambalpur", customizable: true, type: "Textile / fabric", story: "Resist-dyed yarns woven into blurred-edge patterns, for cushions, throws and upholstery.", href: "/quote?type=sourcing&product=Ikat%20textiles&category=Home%20Textiles", plate: { slot: "spot-ikat", motif: "weave", tone: "indigo", alt: "Ikat handloom fabric", brief: "Ikat fabric close-up on loom." } },
  { slug: "jute-totes", name: "Jute and juco tote bags", state: "West Bengal", stateId: "wb", category: "Packaging Materials", material: "Jute", giStatus: "industrial", cluster: "Kolkata region", customizable: true, type: "Finished product", story: "Printed jute and jute-cotton totes for retail, events and plastic-free packaging programmes.", href: "/products/jute-bags", plate: { slot: "spot-jute", motif: "weave", tone: "olive", alt: "Jute tote bags", brief: "Jute totes hanging on rail." } },
  { slug: "millets", name: "Millet flours, flakes & snacks", state: "Karnataka · Rajasthan · Maharashtra", stateId: "ka", category: "Food, Spices & Nutrition", material: "Ragi, jowar, bajra", giStatus: "traditional", cluster: "Multiple growing regions", customizable: true, type: "Food & agri", story: "Ragi, jowar and bajra as whole grain, flour, flakes and ready-to-cook mixes. India is one of the world's largest millet producers, and the UN named 2023 the International Year of Millets.", href: "/industries/food-nutrition", plate: { slot: "spot-millets", motif: "dots", tone: "sand", alt: "Millet grains and flour", brief: "Bowls of ragi, jowar and bajra with a hand scoop." } },
  { slug: "spices", name: "Whole & ground spices", state: "Kerala · Gujarat · Andhra Pradesh", stateId: "kl", category: "Food, Spices & Nutrition", material: "Pepper, cardamom, cumin, chilli, turmeric", giStatus: "traditional", cluster: "Kochi · Unjha · Guntur · Erode", customizable: true, type: "Food & agri", story: "Pepper and cardamom from Kerala, cumin and fennel through Unjha, chilli from Guntur, turmeric from Erode. Cleaned, sorted and steam-treated to meet your market's limits.", href: "/insights/sourcing-spices-from-india", plate: { slot: "spot-spices", motif: "radial", tone: "madder", alt: "Indian spices", brief: "Heaps of turmeric, chilli and cumin on brass plates." } },
  { slug: "gift-hampers", name: "Curated corporate gift hampers", state: "Pan-India", stateId: "", category: "Corporate & Festive Gifting", material: "Tea, spices, brass, textiles", giStatus: "traditional", cluster: "Assembled in Pune", customizable: true, type: "Gift collection", story: "Teas, spices, brass and handloom brought together in a branded box, with custom inserts, notes and dispatch to many addresses.", href: "/corporate-gifting", plate: { slot: "spot-gift-hampers", motif: "jali", tone: "bronze", alt: "Corporate gift hamper", brief: "Open gift box with tea tin, brass cup and handloom napkin." } },
  { slug: "tea-coffee", name: "Estate tea & specialty coffee", state: "Assam · West Bengal · Karnataka", stateId: "as", category: "Food, Spices & Nutrition", material: "Orthodox & CTC tea, arabica, robusta", giStatus: "traditional", cluster: "Assam · Darjeeling · Chikkamagaluru · Kodagu", customizable: true, type: "Food & agri", story: "Orthodox and CTC teas, and shade-grown coffee from the Western Ghats. Packed under your label or sold as estate-named lots.", href: "/insights/indian-tea-and-coffee-private-label", plate: { slot: "spot-tea-coffee", motif: "botanical", tone: "forest", alt: "Tea and coffee", brief: "Tea leaves and roasted coffee beans side by side." } },
  { slug: "makhana", name: "Makhana (fox nut) snacks", state: "Bihar", stateId: "br", category: "Food, Spices & Nutrition", material: "Euryale ferox seed", giStatus: "traditional", cluster: "Mithila region", customizable: true, type: "Food & agri", story: "A light, crunchy seed snack grown in Bihar's wetlands. Sold plain, roasted or flavoured, in retail packs or bulk.", href: "/insights/indian-superfoods-buyers-guide", plate: { slot: "spot-makhana", motif: "dots", tone: "stone", alt: "Roasted makhana", brief: "Bowl of roasted makhana on linen." } },
  { slug: "moringa", name: "Moringa & superfood powders", state: "Tamil Nadu", stateId: "tn", category: "Food, Spices & Nutrition", material: "Moringa, amla, turmeric, beetroot", giStatus: "traditional", cluster: "Southern Tamil Nadu", customizable: true, type: "Food & agri", story: "Leaf and fruit powders for supplement and food brands, with a certificate of analysis for every batch. Your destination market regulates any health claims.", href: "/insights/indian-superfoods-buyers-guide", plate: { slot: "spot-moringa", motif: "botanical", tone: "olive", alt: "Moringa powder", brief: "Moringa leaves and green powder in a glass jar." } },
  { slug: "herbal-extracts", name: "Ayurvedic herbs & botanical extracts", state: "Madhya Pradesh · Rajasthan · Kerala", stateId: "mp", category: "Food, Spices & Nutrition", material: "Ashwagandha, tulsi, shatavari, turmeric", giStatus: "traditional", cluster: "Multiple growing regions", customizable: true, type: "Raw / natural material", story: "Powders and standardised extracts, for supplement, tea and cosmetic formulators. Each batch comes with a certificate of analysis.", href: "/insights/indian-superfoods-buyers-guide", plate: { slot: "spot-herbal", motif: "botanical", tone: "clay", alt: "Ayurvedic herbs", brief: "Dried ashwagandha roots and tulsi leaves." } },
  { slug: "jaggery", name: "Jaggery & natural sweeteners", state: "Maharashtra · Uttar Pradesh", stateId: "mh", category: "Food, Spices & Nutrition", material: "Sugarcane jaggery, coconut sugar", giStatus: "traditional", cluster: "Kolhapur · Muzaffarnagar", customizable: true, type: "Food & agri", story: "Unrefined cane jaggery in blocks, cubes or powder, a natural sweetener for retail and food manufacturers.", href: "/quote?type=sourcing&product=Jaggery&category=Food%2C%20spices%20%26%20nutrition", plate: { slot: "spot-jaggery", motif: "facet", tone: "bronze", alt: "Jaggery blocks", brief: "Golden jaggery blocks on a wooden board." } },
  { slug: "festive-gifting", name: "Festive & seasonal gift collections", state: "Pan-India", stateId: "", category: "Corporate & Festive Gifting", material: "Diya sets, sweets, décor, textiles", giStatus: "traditional", cluster: "Assembled in Pune", customizable: true, type: "Gift collection", story: "Diwali, Christmas, Eid, Lunar New Year and year-end collections, planned around your calendar and shipping cut-offs.", href: "/corporate-gifting#occasions", plate: { slot: "spot-festive-gifting", motif: "radial", tone: "madder", alt: "Festive gift set", brief: "Brass diyas and gift box with marigolds." } },
  { slug: "leather-goods", name: "Leather bags & accessories", state: "Tamil Nadu · Uttar Pradesh", stateId: "tn", category: "Footwear & Leather", material: "Finished leather", giStatus: "industrial", cluster: "Ambur · Kanpur · Agra", customizable: true, type: "Finished product", story: "Bags, wallets, belts and desk accessories, embossed with your brand and made in leather-working clusters with tanning nearby.", href: "/industries/footwear-leather", plate: { slot: "spot-leather", motif: "grain", tone: "clay", alt: "Leather bag", brief: "Tan leather tote with brass hardware." } },
  { slug: "silver-jewellery", name: "Silver & fashion jewellery", state: "Rajasthan", stateId: "rj", category: "Jewellery & Accessories", material: "Sterling silver, brass, semi-precious stones", giStatus: "traditional", cluster: "Jaipur", customizable: true, type: "Finished product", story: "Sterling silver and plated fashion jewellery with semi-precious stones. Hallmarking and nickel limits are checked against your market.", href: "/industries/jewelry-accessories", plate: { slot: "spot-silver", motif: "facet", tone: "stone", alt: "Silver jewellery", brief: "Silver rings and cuffs on slate." } },
  { slug: "khurja-ceramics", name: "Stoneware & ceramic tableware", state: "Uttar Pradesh", stateId: "up", category: "Kitchen & Tableware", material: "Stoneware, ceramic", giStatus: "traditional", cluster: "Khurja", customizable: true, type: "Finished product", story: "Glazed stoneware mugs, planters and serveware from a long-established pottery town. Lead and cadmium release is tested for food contact.", href: "/industries/kitchenware-tableware", plate: { slot: "spot-ceramics", motif: "radial", tone: "indigo", alt: "Ceramic tableware", brief: "Reactive-glaze mugs stacked." } },
  { slug: "hand-knotted-rugs", name: "Hand-knotted & tufted rugs", state: "Uttar Pradesh", stateId: "up", category: "Home Textiles", material: "Wool, cotton, jute", giStatus: "traditional", cluster: "Bhadohi · Mirzapur", customizable: true, type: "Textile / fabric", story: "Hand-knotted, hand-tufted and flatweave rugs made to your size, colour and pile specification.", href: "/manufacturing/bhadohi", plate: { slot: "spot-rugs", motif: "weave", tone: "madder", alt: "Hand-knotted rug", brief: "Rug on loom with wool bobbins." } },
];

const fromProducts: DiscoveryItem[] = products
  .filter((p) => !["natural-loofah", "jute-bags"].includes(p.slug))
  .map((p) => ({
    slug: `p-${p.slug}`, name: p.name, state: "Multiple states", stateId: "", category: p.industry.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    material: p.specs[0]?.value.split(/[,;(]/)[0] ?? "Various", giStatus: "industrial" as GiFlag, cluster: p.clusterSlugs.map((c) => c[0].toUpperCase() + c.slice(1)).join(", ") || "Multiple",
    customizable: true, type: "Finished product" as const, story: p.heroLine, href: `/products/${p.slug}`, plate: p.plate,
  }));

const fromGi: DiscoveryItem[] = giProducts.map((g) => ({
  slug: `gi-${g.slug}`, name: g.shortName, state: g.state, stateId: g.stateId,
  category: g.category === "Textile" ? "Textiles & Apparel" : g.category === "Handicraft" ? "Handicrafts & Home Décor" : g.category === "Food" || g.category === "Agricultural" ? "Food & Agriculture" : g.category === "Manufactured" ? "Handicrafts & Home Décor" : "Essential Oils & Natural Products",
  material: g.characteristics[0].split(" ").slice(0, 4).join(" "), giStatus: (g.confidence === "registry-record" ? "registered-gi" : "reported-gi") as GiFlag,
  cluster: g.cluster, customizable: g.category !== "Agricultural" && g.category !== "Food", type: (g.category === "Food" || g.category === "Agricultural" ? "Food & agri" : g.category === "Textile" ? "Textile / fabric" : "Finished product") as DiscoveryItem["type"],
  story: g.origin, href: `/origin/${g.slug}`, plate: g.plate,
}));

export const discoveryItems: DiscoveryItem[] = [...spotlight, ...fromGi, ...fromProducts];
// Apply the structured product-card content (name, description and details) to every spotlight product.
for (const it of spotlight) {
  const c = productCards[it.slug];
  if (!c) throw new Error(`Missing product card for ${it.slug}`);
  it.name = c.name;
  it.story = c.description;
  it.card = c;
  it.plate = { ...it.plate, alt: c.name };
}

const SPOT_ORDER = ["brass-barware", "millets", "block-print-linen", "spices", "gift-hampers", "natural-attars", "tea-coffee", "ikat-textiles", "makhana", "machined-components", "leather-goods", "moringa", "mango-wood-furniture", "festive-gifting", "hand-knotted-rugs", "herbal-extracts", "coir-doormats", "silver-jewellery", "khurja-ceramics", "jaggery", "printed-activity-books", "natural-loofah-range", "jute-totes"];
export const spotlightItems = SPOT_ORDER.map((s) => spotlight.find((x) => x.slug === s)!).filter(Boolean);
