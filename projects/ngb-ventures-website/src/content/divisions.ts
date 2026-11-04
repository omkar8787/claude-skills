/**
 * The five NGB Ventures business divisions.
 * `delivered` = work NGB performs directly. `coordinated` = work NGB arranges through independent,
 * licensed or specialist partners (manufacturers, inspection agencies, forwarders, customs brokers,
 * production studios, ad platforms). NGB has no owned factories and claims no existing partnerships.
 */
export type Division = {
  slug: string;
  route: string;
  index: string;
  name: string;
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
    slug: "india-sourcing", route: "/india-sourcing", index: "01", name: "India Sourcing", kicker: "Find the product",
    headline: "If it's made in India, we can help you find it.",
    lede: "Describe what you need, and we investigate where and how India makes it. We look at clusters, artisans, export factories and GI producers, then bring back a feasibility view and a qualified shortlist.",
    delivered: ["Requirement analysis and written sourcing brief", "Cluster and supplier-landscape research", "Supplier identification and outreach", "Document-based supplier verification", "Comparison of quotes, MOQs and capabilities", "GI and origin research for heritage products"],
    coordinated: ["Third-party factory audits", "Independent lab testing", "Bulk procurement with the selected manufacturers"],
    outcomes: ["A feasibility answer: can India make it, where, and at what level", "A shortlist you can compare like for like", "A clear next step: samples, audit or RFQ"],
    cta: { label: "Source a product", href: "/quote?type=sourcing" },
    glyph: "magnifier", tone: "indigo",
  },
  {
    slug: "manufacturing-private-label", route: "/manufacturing-private-label", index: "02", name: "Manufacturing & Private Label", kicker: "Make the product",
    headline: "Turn your product idea into a reality.",
    lede: "OEM, ODM or private label: we help structure the specification, coordinate samples and packaging, and follow production until goods pass inspection.",
    delivered: ["Specification and tech-pack structuring", "Sample-round management and feedback logs", "Packaging and label specification", "Production follow-up and status reporting", "Golden-sample and approval management"],
    coordinated: ["Manufacturing (by independent factories)", "Tooling and moulds", "Pre-shipment inspections (inspection agencies)", "Product testing (accredited labs)"],
    outcomes: ["An approved golden sample", "A production plan with milestones", "Inspection reports before you pay the balance"],
    cta: { label: "Let's build your product", href: "/quote?type=manufacturing" },
    glyph: "gear", tone: "bronze",
  },
  {
    slug: "export", route: "/export", index: "03", name: "Global Export Solutions", kicker: "Ship the product",
    headline: "Made in India. Ready for the world.",
    lede: "Export readiness, documentation coordination, HS-code research and destination-market compliance questions, organised before your goods leave the factory.",
    delivered: ["Export-readiness review", "HS-code research (indicative; final classification is the importer's and broker's responsibility)", "Destination compliance research", "Commercial document review and checklists", "Buyer–supplier communication"],
    coordinated: ["Freight forwarding (licensed forwarders)", "Customs clearance (licensed brokers)", "Certificates of origin and product certificates via issuing bodies", "Cargo insurance"],
    outcomes: ["A document checklist for your product and destination", "A clear map of compliance questions to resolve", "Shipments coordinated with licensed partners"],
    cta: { label: "Check market readiness", href: "/tools/market-readiness" },
    glyph: "ship", tone: "indigo",
  },
  {
    slug: "brand-development", route: "/brand-development", index: "04", name: "Brand Development & Advertising", kicker: "Sell the product",
    headline: "We don't just source products. We help build brands that sell.",
    lede: "From positioning, naming and packaging to Amazon, Meta and Google advertising, we help turn products into market-ready brands, and keep growing them after launch.",
    delivered: ["Brand positioning and naming", "Identity and packaging direction", "Launch strategy", "Amazon listing optimisation and A+ content strategy", "Amazon PPC, Meta and Google campaign management", "Shopify/D2C site planning and landing pages", "Email and retention strategy"],
    coordinated: ["Product photography and video production", "Influencer partnerships and PR", "Specialist development for complex e-commerce builds"],
    outcomes: ["A brand ready for its market", "Listings and ads built to convert", "Reporting you can act on: ROAS, CAC, conversion rate"],
    cta: { label: "Launch your brand with NGB", href: "/quote?type=brand" },
    glyph: "tag", tone: "clay",
  },

];

export const getDivision = (slug: string) => divisions.find((d) => d.slug === slug);

export const journeyStages = [
  { key: "source", label: "Source", title: "Find the product and the maker", body: "We map India's clusters, producers and GI origins against your requirement, then build a qualified shortlist.", glyph: "magnifier", tone: "indigo" },
  { key: "manufacture", label: "Manufacture", title: "Make it to specification", body: "Samples, golden-sample approval, production follow-up and inspections, coordinated with independent manufacturers.", glyph: "gear", tone: "bronze" },
  { key: "customize", label: "Customize", title: "Make it yours", body: "Materials, finishes, sizes, private-label branding and packaging, specified and approved before bulk production.", glyph: "compass", tone: "clay" },
  { key: "brand", label: "Brand", title: "Give it a name worth remembering", body: "Positioning, identity and packaging that make the product make sense to your customers.", glyph: "tag", tone: "olive" },
  { key: "advertise", label: "Advertise", title: "Put it in front of buyers", body: "Amazon, Meta and Google campaigns, influencer seeding and PR, measured on ROAS and CAC.", glyph: "camera", tone: "indigo" },
  { key: "export", label: "Export", title: "Ship it to the world", body: "Documentation, compliance questions and logistics, coordinated with licensed forwarders and brokers.", glyph: "ship", tone: "indigo" },
] as const;
