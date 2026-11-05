/**
 * The four NGB Ventures business divisions.
 * `delivered` = work NGB performs directly. `coordinated` = work NGB arranges through independent,
 * licensed or specialist partners (manufacturers, inspection agencies, forwarders, customs brokers,
 * production studios, ad platforms). NGB has no owned factories and claims no existing partnerships.
 */
export type Division = {
  slug: string;
  route: string;
  index: string;
  name: string;
  /** Short name for buttons and tight spaces. */
  short: string;
  kicker: string;
  headline: string;
  lede: string;
  delivered: string[];
  coordinated: string[];
  outcomes: string[];
  cta: { label: string; href: string };
  glyph: string;
  tone: "charcoal" | "bronze" | "olive" | "indigo" | "clay";
};

export const divisions: Division[] = [
  {
    slug: "india-sourcing", route: "/india-sourcing", index: "01", name: "India Sourcing & Supplier Discovery", short: "India Sourcing", kicker: "Find the right maker",
    headline: "Find the right product and the right maker in India.",
    lede: "Share your requirement and we research where and how India makes it: manufacturing clusters, export factories, artisan enterprises and GI producers. You receive a feasibility assessment and a qualified supplier shortlist.",
    delivered: ["Requirement analysis and a written sourcing brief", "Manufacturing-cluster and supplier-landscape research", "Supplier identification and outreach", "Document-based supplier qualification", "Like-for-like comparison of quotations, MOQs and capabilities", "GI and origin research for heritage products"],
    coordinated: ["Factory audits by third-party audit firms", "Product testing by independent laboratories", "Bulk procurement from the selected manufacturers"],
    outcomes: ["A clear answer on feasibility: whether, where and at what level India can make it", "A qualified shortlist you can compare like for like", "An agreed next step: samples, audit or request for quotation"],
    cta: { label: "Request a sourcing proposal", href: "/quote?type=sourcing" },
    glyph: "magnifier", tone: "indigo",
  },
  {
    slug: "manufacturing-private-label", route: "/manufacturing-private-label", index: "02", name: "OEM, ODM & Private Label Manufacturing", short: "OEM, ODM & Private Label", kicker: "Develop and produce",
    headline: "Develop your product with India's manufacturers.",
    lede: "Whether you need OEM production to your own design, an ODM product adapted from a manufacturer's range, or a private-label collection, we structure the specification, coordinate sampling and packaging, and follow production through to inspection.",
    delivered: ["Specification and tech-pack structuring", "Sample-round management with written feedback", "Packaging and label specification", "Production follow-up and status reporting", "Golden-sample approval and change control"],
    coordinated: ["Manufacturing by independent factories", "Tooling and moulds", "Pre-shipment quality inspection by inspection agencies", "Product testing by accredited laboratories"],
    outcomes: ["An approved golden sample", "A production plan with agreed milestones", "Inspection reports before the balance payment"],
    cta: { label: "Develop a private-label product", href: "/quote?type=manufacturing" },
    glyph: "gear", tone: "bronze",
  },
  {
    slug: "export", route: "/export", index: "03", name: "Global Export Solutions", short: "Global Export", kicker: "Ship with confidence",
    headline: "Prepare every shipment for its destination market.",
    lede: "Export readiness, export documentation, indicative HS-code research and destination-market compliance questions, resolved before goods leave the factory. Freight and customs clearance are handled by licensed partners.",
    delivered: ["Export-readiness review", "Indicative HS-code research (final classification rests with the importer and customs broker)", "Destination-market compliance research", "Commercial document review and checklists", "Communication between buyer and manufacturer"],
    coordinated: ["Freight forwarding by licensed forwarders", "Customs clearance by licensed brokers", "Certificates of origin and product certificates from issuing bodies", "Cargo insurance"],
    outcomes: ["An export documentation checklist for your product and destination", "A clear list of compliance questions to resolve", "Shipments coordinated with licensed partners"],
    cta: { label: "Discuss an export project", href: "/quote?type=sourcing" },
    glyph: "ship", tone: "indigo",
  },
  {
    slug: "brand-development", route: "/brand-development", index: "04", name: "Brand Development & Advertising", short: "Brand Development", kicker: "Build the brand",
    headline: "Turn well-made products into brands that sell.",
    lede: "Positioning, naming, identity and packaging, followed by marketplace listings and advertising on Amazon, Meta and Google. We help products made in India reach customers in your market.",
    delivered: ["Product positioning and naming", "Brand identity and packaging direction", "Launch planning", "Amazon listing optimisation and A+ content", "Amazon PPC, Meta and Google campaign management", "Shopify and D2C site planning", "Email and retention planning"],
    coordinated: ["Product photography and video production", "Creator partnerships and PR", "Specialist development for complex e-commerce builds"],
    outcomes: ["A brand positioned for its market", "Listings and campaigns built to convert", "Reporting on return on ad spend, acquisition cost and conversion"],
    cta: { label: "Build your global brand", href: "/quote?type=brand" },
    glyph: "tag", tone: "clay",
  },
];

export const getDivision = (slug: string) => divisions.find((d) => d.slug === slug);

export const journeyStages = [
  { key: "source", label: "Source", title: "Find the product and the maker", body: "We map India's manufacturing clusters, producers and GI origins against your requirement, then build a qualified shortlist.", glyph: "magnifier", tone: "indigo" },
  { key: "manufacture", label: "Manufacture", title: "Make it to specification", body: "Samples, golden-sample approval, production follow-up and inspections, coordinated with independent manufacturers.", glyph: "gear", tone: "bronze" },
  { key: "customise", label: "Customise", title: "Make it yours", body: "Materials, finishes, sizes, private-label branding and packaging, specified and approved before bulk production.", glyph: "compass", tone: "clay" },
  { key: "brand", label: "Brand", title: "Give it a name worth remembering", body: "Positioning, identity and packaging that make the product make sense to your customers.", glyph: "tag", tone: "olive" },
  { key: "advertise", label: "Advertise", title: "Put it in front of buyers", body: "Amazon, Meta and Google campaigns, creator partnerships and PR, measured on return on ad spend and acquisition cost.", glyph: "camera", tone: "indigo" },
  { key: "export", label: "Export", title: "Ship it to the world", body: "Documentation, compliance questions and logistics, coordinated with licensed forwarders and brokers.", glyph: "ship", tone: "indigo" },
] as const;
