/** The buyer enquiry process, shown wherever a visitor decides whether to get in touch. */
export const enquirySteps = [
  { t: "Share your requirement", b: "Describe the product, quantity, target price and destination market. Partial information is fine to start." },
  { t: "Receive a feasibility assessment", b: "We assess whether, where and at what level India can make it, and flag compliance questions early." },
  { t: "Review the proposed sourcing approach", b: "You receive a proposal covering manufacturing clusters, manufacturer types, sampling and timelines." },
  { t: "Agree on the project scope", b: "Deliverables, responsibilities and fees are set out in a written agreement, with an NDA where needed." },
  { t: "Begin supplier qualification and development", b: "We qualify manufacturers, manage samples and coordinate development towards an approved golden sample." },
];

export const processSteps = [
  { n: "01", title: "Understand buyer requirements", body: "We turn your product, target price, quantity, market and compliance needs into a written brief that suppliers can quote against accurately.", output: "Sourcing brief" },
  { n: "02", title: "Identify suitable manufacturers", body: "We map the right clusters and manufacturer types, from artisan workshops to export factories, and approach a long-list.", output: "Long-list" },
  { n: "03", title: "Evaluate supplier capabilities", body: "We verify registrations and certificates, compare quotations and MOQs, and assess capability. Where needed, we visit or audit.", output: "Comparison matrix" },
  { n: "04", title: "Develop samples & prototypes", body: "Sampling rounds with structured feedback until a golden sample is approved and the specification is frozen.", output: "Approved golden sample" },
  { n: "05", title: "Coordinate production", body: "Pre-production meeting, materials check and a production schedule, with regular status updates and early escalation of risks.", output: "Production tracker" },
  { n: "06", title: "Conduct quality inspections", body: "Inline and AQL-based pre-shipment inspections against your specification, with photographic reports.", output: "Inspection report" },
  { n: "07", title: "Export documentation & logistics", body: "Document checks, certificates of origin and handover to your forwarder, or one we coordinate.", output: "Shipping file" },
];

export const whyIndia = [
  { title: "Manufacturing diversity", body: "From cotton to castings, India makes products across almost every consumer and industrial category. Buyers can consolidate sourcing in one country." },
  { title: "Skilled craftsmanship", body: "Hand block printing, metal craft, wood carving, weaving and embroidery are living industries, not museum pieces. Many are protected by Geographical Indication registrations." },
  { title: "Competitive economics", body: "Domestic raw materials (cotton, jute, leather, wood, botanicals) combine with labour-intensive skills to give value in craft-heavy and textile categories." },
  { title: "Established industrial clusters", body: "Specialised towns concentrate know-how, suppliers and subcontractors in one place, so development and scaling get faster." },
  { title: "Product customisation", body: "Many manufacturers are used to working from buyer designs, which makes India well suited to differentiated, branded products." },
  { title: "Private-label opportunities", body: "Labelling, packaging and finishing at source let brands receive retail-ready goods." },
  { title: "Export infrastructure", body: "Major container ports on both coasts, air-cargo hubs and an experienced ecosystem of forwarders and customs brokers." },
];

export const audiences = [
  { title: "Amazon FBA sellers", body: "Private-label products with FBA-ready labelling and cartons.", href: "/quote?type=manufacturing&market=usa", cta: "Plan a private-label launch" },
  { title: "Sustainable brands (EU)", body: "Natural-fibre and certified products, with claim-ready documentation.", href: "/industries/eco-friendly", cta: "Explore eco products" },
  { title: "Home-décor importers (UK)", body: "Brass, wood, textiles and lighting from India's craft clusters.", href: "/industries/handicrafts", cta: "Explore home décor" },
  { title: "Wholesalers (Australia)", body: "Handicrafts and homewares, with ECTA and biosecurity planning.", href: "/markets/australia", cta: "Sourcing for Australia" },
  { title: "OEM & industrial buyers", body: "Build-to-print castings, machining and fabrication.", href: "/services/oem-odm-coordination", cta: "Start an OEM RFQ" },
];
