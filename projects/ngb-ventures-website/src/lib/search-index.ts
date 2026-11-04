import { industries } from "@/content/industries";
import { products } from "@/content/products";
import { clusters } from "@/content/clusters";
import { markets } from "@/content/markets";
import { services } from "@/content/services";
import { guides } from "@/content/guides";
import { giProducts } from "@/content/gi";
import { divisions } from "@/content/divisions";
import { spotlightItems } from "@/content/discovery";

export type SearchDoc = { t: string; d: string; h: string; k: string; x: string };

const pages: SearchDoc[] = [
  { t: "Request a quote", d: "Tell us what you want to source, make or launch. Upload a reference image.", h: "/quote", k: "Page", x: "enquiry rfq quotation brief" },
  { t: "Corporate gifting from India", d: "Curated hampers, welcome kits and festive collections from Indian craft, tea and spices.", h: "/corporate-gifting", k: "Page", x: "gifts hampers diwali christmas employee client" },
  { t: "Product Discovery Engine", d: "Filter India's products by state, category, GI status and type.", h: "/discover", k: "Tool", x: "browse catalogue products" },
  { t: "India Manufacturing Atlas", d: "Select a state to see its clusters, crafts, GI products and industrial strengths.", h: "/atlas", k: "Tool", x: "map states regions" },
  { t: "GI & Origin Collection", d: "Geographical Indication products with registration details and sources.", h: "/origin", k: "Page", x: "geographical indication origin" },
  { t: "Publishers & Printing", d: "Books, activity books, stationery and printed packaging from India's print clusters.", h: "/publishers-printing", k: "Page", x: "books print publishing" },
  { t: "Advertising & marketing", d: "Amazon, Meta and Google advertising and D2C growth for Indian-made products.", h: "/advertising", k: "Page", x: "ads marketing amazon" },
  { t: "Global market readiness check", d: "Compliance, labelling and documentation questions for your product and destination.", h: "/tools/market-readiness", k: "Tool", x: "compliance import" },
  { t: "Landed-cost estimator", d: "Model product cost, freight, insurance, duty and taxes.", h: "/tools/landed-cost-calculator", k: "Tool", x: "duty freight cost calculator" },
  { t: "CBM & container calculator", d: "Cubic metres, chargeable weight and container fit.", h: "/tools/cbm-calculator", k: "Tool", x: "container volume shipping" },
  { t: "Supplier evaluation checklist", d: "Score a supplier across seven areas.", h: "/tools/supplier-evaluation-checklist", k: "Tool", x: "audit verification vendor" },
  { t: "About NGB Ventures", d: "A disability-owned sourcing and brand partner from Pune, India.", h: "/about", k: "Page", x: "company pune disability-owned nda confidential" },
  { t: "Contact", d: "Email, WhatsApp or send an enquiry.", h: "/contact", k: "Page", x: "email whatsapp phone" },
];

/** Compact search index built at compile time from the typed content files. */
export function buildSearchIndex(): SearchDoc[] {
  return [
    ...pages,
    ...divisions.map((d) => ({ t: d.name, d: d.lede, h: d.route, k: "Division", x: d.kicker })),
    ...industries.map((i) => ({ t: i.name, d: i.short, h: `/industries/${i.slug}`, k: "Industry", x: [...i.products, ...i.keywords].join(" ") })),
    ...products.map((p) => ({ t: p.name, d: p.heroLine, h: `/products/${p.slug}`, k: "Product guide", x: p.keywords.join(" ") })),
    ...spotlightItems.map((s) => ({ t: s.name, d: s.story, h: s.href, k: "Product", x: `${s.state} ${s.cluster} ${s.material} ${s.category}` })),
    ...giProducts.map((g) => ({ t: g.shortName, d: g.origin, h: `/origin/${g.slug}`, k: "GI product", x: `${g.officialName} ${g.state} ${g.cluster} ${g.category}` })),
    ...clusters.map((c) => ({ t: `${c.name}, ${c.state}`, d: c.specialization, h: `/manufacturing/${c.slug}`, k: "Cluster", x: c.products.join(" ") })),
    ...markets.map((m) => ({ t: `Export to ${m.name}`, d: m.heroLine, h: `/markets/${m.slug}`, k: "Market", x: m.region })),
    ...services.map((s) => ({ t: s.name, d: s.short, h: `/services/${s.slug}`, k: "Service", x: s.involves.join(" ") })),
    ...guides.map((g) => ({ t: g.title, d: g.description, h: `/insights/${g.slug}`, k: g.kind === "story" ? "Story" : "Guide", x: (g.keywords ?? []).join(" ") + " " + (g.category ?? "") })),
  ];
}
