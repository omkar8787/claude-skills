/**
 * Global site configuration.
 * Anything marked `placeholder: true` MUST be replaced with verified company
 * information before launch. The UI renders placeholders visibly in dev.
 */
export const site = {
  name: "NGB Ventures",
  fullName: "Next Global Brand",
  legalName: "NGB Ventures", // PLACEHOLDER: confirm registered legal entity name
  tagline: "Your Strategic Manufacturing & Sourcing Partner in India.",
  altTagline: "From Indian Manufacturing Excellence to Global Markets.",
  description:
    "NGB Ventures (Next Global Brand) is a Pune-based sourcing and manufacturing coordination partner helping international importers, brands and retailers source, develop, inspect and export products from India.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.ngbventures.example",
  locale: "en",
  city: "Pune",
  region: "Maharashtra",
  country: "India",
  coordinates: { lat: 18.5204, lon: 73.8567 },
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "", // digits only, with country code, e.g. 9198xxxxxxxx
    address: "", // PLACEHOLDER: registered office address, Pune
    hours: "Mon–Sat · 10:00–19:00 IST",
  },
  social: {
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || "",
  },
} as const;

export const contactEmail = site.contact.email || null;
export const whatsappHref = site.contact.whatsapp
  ? `https://wa.me/${site.contact.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
      "Hello NGB Ventures, I would like to discuss a sourcing project.",
    )}`
  : null;

export type NavItem = { label: string; href: string; menu?: "industries" | "manufacturing" | "resources" | "services" };

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Industries", href: "/industries", menu: "industries" },
  { label: "Products", href: "/products" },
  { label: "Manufacturing Network", href: "/manufacturing", menu: "manufacturing" },
  { label: "Services", href: "/services", menu: "services" },
  { label: "Resources", href: "/resources", menu: "resources" },
  { label: "Contact", href: "/contact" },
];

export const primaryCta = { label: "Start Your Sourcing Journey", href: "/enquire" };
