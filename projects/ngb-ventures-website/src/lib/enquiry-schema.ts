import { z } from "zod";

const str = (max: number) => z.string().trim().max(max);
const req = (max: number, label: string) => z.string().trim().min(1, `${label} is required`).max(max);

export const contactBlock = {
  name: req(120, "Name"),
  company: str(160).optional().default(""),
  email: z.string().trim().email("Enter a valid email").max(200),
  phone: str(40).optional().default(""),
  country: req(80, "Country"),
  role: str(80).optional().default(""),
  consent: z.literal(true, { message: "Please accept the privacy policy" }),
};

const antiSpam = {
  website: z.string().max(500).optional().default(""), // honeypot: route silently drops non-empty values
  startedAt: z.number().int().positive(),
  turnstileToken: z.string().max(4096).optional(),
  sourcePage: str(300).optional().default(""),
};

export const sourcingSchema = z.object({
  type: z.literal("sourcing"),
  category: req(80, "Product category"),
  product: req(3000, "Product description"),
  quantity: str(40).optional().default(""),
  quantityUnit: str(30).optional().default("pieces"),
  targetCountry: req(80, "Target country"),
  targetPrice: str(60).optional().default(""),
  currency: str(8).optional().default("USD"),
  customization: str(2000).optional().default(""),
  packaging: str(2000).optional().default(""),
  certifications: z.array(str(60)).max(20).optional().default([]),
  samples: z.enum(["yes", "no", "unsure"]).optional().default("unsure"),
  timeline: str(80).optional().default(""),
  cluster: str(60).optional().default(""),
  ...contactBlock,
  ...antiSpam,
});

export const contactSchema = z.object({
  type: z.literal("contact"),
  topic: str(80).optional().default("General enquiry"),
  message: req(4000, "Message"),
  ...contactBlock,
  ...antiSpam,
});

export const productDevSchema = z.object({
  type: z.literal("product-development"),
  productName: req(160, "Product name"),
  stage: z.enum(["idea", "sketch", "reference-sample", "tech-pack", "existing-product"]),
  description: req(4000, "Description"),
  materials: str(1000).optional().default(""),
  dimensions: str(500).optional().default(""),
  quantity: str(60).optional().default(""),
  targetCost: str(60).optional().default(""),
  targetMarket: req(80, "Target market"),
  references: str(1500).optional().default(""),
  timeline: str(80).optional().default(""),
  ...contactBlock,
  ...antiSpam,
});

export const enquirySchema = z.discriminatedUnion("type", [sourcingSchema, contactSchema, productDevSchema]);
export type Enquiry = z.infer<typeof enquirySchema>;

export const CATEGORY_OPTIONS = [
  "Apparel & Garments", "Home Textiles", "Handicrafts & Home Décor", "Furniture & Woodcraft", "Jewelry & Accessories",
  "Essential Oils & Natural Products", "Beauty & Personal Care", "Packaging Materials", "Eco-Friendly Products",
  "Lighting & Home Accessories", "Kitchenware & Tableware", "Footwear & Leather Goods", "Sports & Fitness",
  "Toys & Educational Products", "Stationery & Paper Products", "Engineering & Industrial Products", "Not sure / Other",
];

export const COUNTRY_OPTIONS = ["United States", "United Kingdom", "Germany", "France", "Netherlands", "Australia", "Canada", "United Arab Emirates", "Other EU country", "Other"];

export const CERT_OPTIONS = ["GOTS", "OCS", "GRS", "OEKO-TEX", "FSC", "BSCI / amfori", "SMETA / Sedex", "ISO 9001", "ISO 22716 (cosmetic GMP)", "LWG", "Fair Trade", "Not sure"];
