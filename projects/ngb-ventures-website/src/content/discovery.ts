import type { Plate } from "./types";
import { products } from "./products";
import { giProducts } from "./gi";

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
  type: "Finished product" | "Raw / natural material" | "Component" | "Textile / fabric" | "Food & agri";
  story: string;
  href: string;
  plate: Plate;
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
export const spotlightItems = spotlight;
