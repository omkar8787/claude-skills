/**
 * Global site configuration and brand messaging system.
 * Contact details come from environment variables. Nothing here is invented.
 */
export const site = {
  name: "NGB Ventures",
  fullName: "Next Global Brand",
  legalName: "NGB Ventures", // confirm registered legal entity name before launch
  positioning: "Your global sourcing desk in India.",
  philosophy: "If it's made in India, we can help you find it.",
  signoff: "India to the world. From concept to commerce.",
  tagline: "Your global sourcing desk in India.",
  description:
    "NGB Ventures is a Pune-based sourcing, manufacturing, export-coordination and brand-development partner that helps international businesses discover Indian products, connect with manufacturers and build global brands.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.ngbventures.example",
  locale: "en",
  city: "Pune",
  region: "Maharashtra",
  country: "India",
  coordinates: { lat: 18.5204, lon: 73.8567 },
  dobeStatus: "DOBE® certification: application underway",
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
  hero: "The world wants more from India.",
  heroSub: "Discover extraordinary products. Connect with manufacturers. Build your brand. Take Indian capabilities to global markets.",
  manifesto: ["India has the products.", "India has the people.", "India has the manufacturers.", "We help the world access them."],
  promise: "Anything from India. Everything from concept to commerce.",
  lines: ["One country. Thousands of possibilities.", "Find the product. Meet the maker. Build the brand.", "You bring the vision. We help build the supply chain.", "From local manufacturers to international markets.", "India's craftsmanship. Your global opportunity."],
  honesty: "Every request starts with an honest feasibility assessment. If India isn't the right answer, we'll say so.",
};

export const contactEmail = site.contact.email || null;
export const whatsappHref = site.contact.whatsapp
  ? `https://wa.me/${site.contact.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Hello NGB Ventures, I'd like to discuss a sourcing project.")}`
  : null;

export type NavItem = { label: string; href: string; menu?: string; mobileOnly?: boolean };

export const mainNav: NavItem[] = [
  { label: "Home", href: "/", mobileOnly: true },
  { label: "Capabilities", href: "/capabilities", menu: "capabilities" },
  { label: "Discover India", href: "/discover", menu: "discover" },
  { label: "Origin Collection", href: "/origin" },
  { label: "Brand Studio", href: "/brand-development" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about", menu: "about" },
  { label: "Contact", href: "/contact" },
];

export const primaryCta = { label: "Source a Product", href: "/quote" };
