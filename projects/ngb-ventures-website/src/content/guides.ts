import type { Plate } from "./types";
import { stories } from "./stories";
import { loadMarkdownArticles } from "@/lib/markdown-articles";

export type InsightSection = "buyer-guides" | "sourcing-research" | "manufacturing-insights" | "export-compliance";
export const INSIGHT_SECTIONS: { id: InsightSection; title: string; intro: string }[] = [
  { id: "buyer-guides", title: "Buyer guides", intro: "Step-by-step guidance for planning and running a sourcing project in India." },
  { id: "sourcing-research", title: "Sourcing research", intro: "Research on India's product categories, regions and producing communities." },
  { id: "manufacturing-insights", title: "Manufacturing insights", intro: "How products are developed and made, from sampling to private label." },
  { id: "export-compliance", title: "Export compliance", intro: "Trade terms, documentation and the destination-market rules that affect landed cost." },
];

export type Guide = {
  slug: string; title: string; description: string; readTime: string; updated: string; plate: Plate;
  sections: { h: string; p: string[]; list?: string[] }[];
  /** "story" = editorial feature; "guide" = practical how-to. */
  kind?: "story" | "guide";
  category?: string;
  /** Insights section the article is listed under. Defaults: guides → buyer-guides, stories → sourcing-research. */
  section?: InsightSection;
  /** Shorter title for search results when `title` exceeds about 60 characters. */
  seoTitle?: string;
  /** ISO publish date. */
  date?: string;
  /** ISO last-modified date (drives sitemap lastmod and dateModified). Defaults to `date`. */
  modified?: string;
  keywords?: string[];
  related?: { label: string; href: string }[];
};

const coreGuides: Guide[] = [
  {
    slug: "how-to-source-from-india",
    seoTitle: "How to Source from India: A Practical Guide for Buyers",
    kind: "guide",
    category: "Sourcing basics",
    date: "2026-10-20",
    title: "How to source from India: a practical guide for international buyers",
    description: "A step-by-step framework for sourcing products from Indian manufacturers: briefs, clusters, supplier verification, sampling, quality control, Incoterms and documentation.",
    readTime: "9 min read",
    updated: "2026-11",
    plate: { slot: "guide-how-to-source", motif: "route", tone: "bronze", alt: "Sourcing documents and samples", brief: "Desk with samples, spec sheets and a map of India" },
    sections: [
      { h: "1. Start with a written brief, not a supplier search", p: ["Most sourcing problems start before the first supplier is contacted. A good brief turns a product idea into something manufacturers can quote accurately and comparably."], list: ["Product description, materials, dimensions and reference images", "Target quantity per order and per year", "Target landed cost, not just factory price", "Destination market and the compliance requirements that follow from it", "Packaging and labelling requirements", "Timeline, including seasonal deadlines"] },
      { h: "2. Map the category to the right cluster", p: ["India's manufacturing is clustered. Knitwear concentrates in Tirupur, brassware in Moradabad, carved wood in Saharanpur, home furnishings in Panipat. Starting in the right cluster gives you more relevant suppliers and better-informed subcontracting networks.", "Use our manufacturing network map to see which clusters fit your category, then shortlist manufacturer types: integrated factories, specialist workshops or export houses."] },
      { h: "3. Verify before you trust", p: ["Online B2B listings mix manufacturers with traders, so independent verification is essential before you pay a deposit."], list: ["Check the GSTIN on the official GST portal and match the legal name", "Check the Importer-Exporter Code (IEC) with DGFT", "Confirm whether the supplier manufactures or trades", "Validate certificates in the issuing body's own database", "Visit or audit for significant orders"] },
      { h: "4. Sample deliberately", p: ["Treat sampling as specification work, not a formality. Record feedback in writing, version every change, and finish with a sealed 'golden sample' that both sides sign off. That sample becomes the reference for production and inspection."] },
      { h: "5. Agree commercial terms clearly", p: ["Agree price, MOQ, payment terms, lead time, Incoterm, packaging, inspection rights and what happens if goods fail inspection. Put these in a purchase order or supply agreement. The Incoterm defines where risk and cost transfer. Our Incoterms guide explains the common options."] },
      { h: "6. Inspect before shipment", p: ["Inline inspection catches problems early. A pre-shipment inspection using AQL sampling checks the finished goods against your specification before final payment. For regulated products, add accredited lab testing for the destination market."] },
      { h: "7. Get the documents right", p: ["Typical export documents include a commercial invoice, packing list, bill of lading or airway bill, and a certificate of origin. You may also need product-specific certificates such as phytosanitary certificates or test reports. If you intend to claim preferential duty under a trade agreement, origin documentation must meet that agreement's rules."] },
      { h: "8. Model the landed cost", p: ["Factory price is only part of the cost. Add freight, insurance, customs duty, any additional duties, import taxes, brokerage, port charges and inland delivery. Our landed-cost estimator makes the arithmetic transparent. The duty rates must come from official sources for your HS code."] },
    ],
  },
  {
    slug: "incoterms-for-india-imports",
    kind: "guide",
    category: "Shipping & trade",
    date: "2026-10-22",
    title: "Incoterms for India imports: EXW, FOB, CIF, DAP and DDP explained",
    description: "Which Incoterms 2020 rules buyers commonly use when importing from India, who pays what, where risk transfers, and practical pitfalls.",
    readTime: "6 min read",
    updated: "2026-11",
    plate: { slot: "guide-incoterms", motif: "route", tone: "indigo", alt: "Container port operations", brief: "Container being loaded at an Indian port" },
    sections: [
      { h: "Why the Incoterm matters", p: ["Incoterms® 2020 rules, published by the International Chamber of Commerce, define which party pays for which costs and where risk passes from seller to buyer. They don't set the price, transfer ownership or replace a sales contract. Always state the rule, the named place and the version, e.g. 'FOB Nhava Sheva, Incoterms® 2020'."] },
      { h: "EXW (Ex Works)", p: ["The seller makes goods available at its premises, and the buyer handles everything else, including export clearance in India. Export clearance by a foreign buyer can be impractical, so EXW is often a poor fit for international shipments. FCA is usually the better choice."] },
      { h: "FCA (Free Carrier)", p: ["The seller delivers the goods, cleared for export, to the buyer's carrier at a named place. It works well for containerised shipments and for buyers who appoint their own forwarder."] },
      { h: "FOB (Free On Board)", p: ["The seller clears goods for export and loads them on board the vessel at the named port. Risk transfers once the goods are on board. FOB is widely used for sea freight from Indian ports, although the ICC notes FCA is often more appropriate for containers."] },
      { h: "CIF / CIP", p: ["The seller pays freight (and minimum insurance under CIF) to the destination port, but risk transfers at origin, when goods are loaded. Buyers should check the insurance cover and remember they bear the transit risk."] },
      { h: "DAP / DDP", p: ["Under DAP the seller delivers to a named destination, ready for unloading, and the buyer handles import clearance and duties. Under DDP the seller also pays import duties and taxes, which requires the seller to act as, or arrange, the importer of record. DDP from India needs careful structuring."] },
      { h: "Practical recommendations", p: ["Choose an Incoterm based on who controls freight and who has the expertise to handle each step. Buyers with an established forwarder often prefer FCA or FOB. First-time importers sometimes prefer CIF or DAP, but should understand the trade-off in control and transparency."], list: ["Always name a precise place or port", "Align the Incoterm with your payment terms and insurance", "Make sure your landed-cost model uses the same basis"] },
    ],
  },
];

const SECTION_BY_SLUG: Record<string, InsightSection> = {
  "how-to-source-from-india": "buyer-guides", "corporate-gifting-from-india": "buyer-guides", "indian-tea-and-coffee-private-label": "buyer-guides",
  "indian-superfoods-buyers-guide": "buyer-guides", "importing-from-a-disability-owned-exporter-india": "buyer-guides",
  "indian-millets-international-buyers": "sourcing-research", "moradabad-brass-city": "sourcing-research", "kannauj-perfume-city": "sourcing-research", "sustainable-packaging-from-india": "sourcing-research",
  "private-label-from-india": "manufacturing-insights", "authentic-indian-block-print-handloom": "manufacturing-insights",
  "incoterms-for-india-imports": "export-compliance", "sourcing-spices-from-india": "export-compliance",
};
export const sectionOf = (g: Guide): InsightSection => g.section ?? SECTION_BY_SLUG[g.slug] ?? (g.kind === "story" ? "sourcing-research" : "buyer-guides");

/** All articles, newest first. */
export const guides: Guide[] = [...loadMarkdownArticles(), ...stories, ...coreGuides].sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);
