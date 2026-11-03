export type Motif =
  | "weave"
  | "knit"
  | "block"
  | "jali"
  | "grain"
  | "radial"
  | "botanical"
  | "facet"
  | "blueprint"
  | "route"
  | "fold"
  | "dots";

export type Tone = "charcoal" | "bronze" | "indigo" | "clay" | "olive" | "madder" | "sand" | "stone";

export type Plate = {
  /** File slot: drop a licensed photo at /public/media/<slot>.jpg (or .webp) to replace the art plate. */
  slot: string;
  motif: Motif;
  tone: Tone;
  alt: string;
  /** Photography direction for the art buyer / photographer. */
  brief: string;
};

export type FAQ = { q: string; a: string };
export type Titled = { title: string; body: string };

export type Industry = {
  slug: string;
  name: string;
  index: string;
  short: string;
  seoTitle: string;
  metaDescription: string;
  heroLine: string;
  intro: string[];
  products: string[];
  productSlugs: string[];
  clusterSlugs: string[];
  capabilities: Titled[];
  customization: string[];
  quality: string[];
  compliance: Titled[];
  faqs: FAQ[];
  related: string[];
  keywords: string[];
  plate: Plate;
};

export type Product = {
  slug: string;
  name: string;
  industry: string;
  seoTitle: string;
  metaDescription: string;
  heroLine: string;
  overview: string[];
  variants: Titled[];
  specs: { label: string; value: string }[];
  customization: string[];
  quality: string[];
  compliance: Titled[];
  moqNote: string;
  clusterSlugs: string[];
  faqs: FAQ[];
  related: string[];
  keywords: string[];
  plate: Plate;
};

export type Cluster = {
  slug: string;
  name: string;
  state: string;
  lat: number;
  lon: number;
  featured: boolean;
  specialization: string;
  summary: string;
  detail: string[];
  products: string[];
  industrySlugs: string[];
  buyerNotes: string[];
  gi?: string;
  plate: Plate;
};

export type Market = {
  slug: string;
  name: string;
  region: string;
  code: string;
  seoTitle: string;
  metaDescription: string;
  heroLine: string;
  intro: string[];
  buyerTypes: string[];
  popularIndustries: string[];
  considerations: Titled[];
  tradeNote: string;
  officialTools: { label: string; href: string }[];
  faqs: FAQ[];
  plate: Plate;
};

export type Service = {
  slug: string;
  name: string;
  index: string;
  short: string;
  seoTitle: string;
  metaDescription: string;
  heroLine: string;
  involves: string[];
  deliverables: string[];
  bestFor: string[];
  faqs: FAQ[];
  related: string[];
  icon: string;
  plate: Plate;
};
