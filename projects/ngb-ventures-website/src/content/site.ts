/**
 * Global site configuration and brand messaging system.
 * Contact details come from environment variables. Nothing here is invented.
 */
export const site = {
  name: "NGB Ventures",
  fullName: "Next Global Brand",
  legalName: "NGB Ventures", // confirm registered legal entity name before launch
  positioning: "India sourcing, manufacturing, export and brand development.",
  philosophy: "Every engagement starts with an honest feasibility assessment.",
  signoff: "From concept to commerce.",
  tagline: "Discover India. Source Better. Build Global Brands.",
  description:
    "NGB Ventures connects international businesses with India's manufacturing capabilities, from product discovery and private-label development to production coordination, export and brand development. Based in Pune, India.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.ngbventures.example",
  locale: "en",
  city: "Pune",
  region: "Maharashtra",
  country: "India",
  coordinates: { lat: 18.5204, lon: 73.8567 },
  dobeStatus: "Disability:IN DOBE® certification application in progress",
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
    address: "",
    hours: "Mon–Sat · 10:00–19:00 IST",
  },
  social: {
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || "",
  },
} as const;

/** Messaging system: one idea per line, used consistently across pages. */
export const messaging = {
  hero: "Discover India. Source Better. Build Global Brands.",
  heroSub: "We connect international businesses with India's manufacturing capabilities — from product discovery and private-label development to production coordination, export and brand development.",
  manifesto: ["India has the products.", "India has the makers.", "Finding the right ones takes local knowledge.", "That is the work we do."],
  promise: "From concept to commerce.",
  lines: ["Product discovery, supplier qualification and production coordination in India."],
  honesty: "Every enquiry starts with an honest feasibility assessment. If India is not the right answer for your product, we will tell you.",
};

export const contactEmail = site.contact.email || null;
export const whatsappHref = site.contact.whatsapp
  ? `https://wa.me/${site.contact.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Hello NGB Ventures, I would like to discuss a sourcing project.")}`
  : null;

export type NavItem = { label: string; href: string; menu?: string; mobileOnly?: boolean };

export const mainNav: NavItem[] = [
  { label: "Home", href: "/", mobileOnly: true },
  { label: "Capabilities", href: "/capabilities", menu: "capabilities" },
  { label: "Discover India", href: "/discover", menu: "discover" },
  { label: "Brand Studio", href: "/brand-development", menu: "brand" },
  { label: "Insights", href: "/insights", menu: "insights" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const primaryCta = { label: "Request a Sourcing Proposal", href: "/quote" };
