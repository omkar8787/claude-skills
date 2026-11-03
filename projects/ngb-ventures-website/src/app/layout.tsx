import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Header, type MenuData } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { site, mainNav, primaryCta } from "@/content/site";
import { industries } from "@/content/industries";
import { clusters } from "@/content/clusters";
import { services } from "@/content/services";
import { JsonLd, organizationLd, websiteLd } from "@/lib/seo";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500"], style: ["normal", "italic"], variable: "--font-cormorant", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const plex = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "NGB Ventures | Sourcing Agent & Manufacturing Partner in India", template: "%s | NGB Ventures" },
  description: site.description,
  applicationName: site.name,
  openGraph: { siteName: site.name, type: "website", locale: "en_US" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: "#151515", width: "device-width", initialScale: 1 };

const menus: MenuData = {
  industries: {
    intro: "Sixteen manufacturing categories, each with products, clusters, compliance and sourcing workflow.",
    links: industries.map((i) => ({ label: i.name, href: `/industries/${i.slug}`, meta: i.index })),
    feature: { title: "Not sure where your product fits?", body: "Describe it, and we'll map it to the right clusters and manufacturer types.", href: "/enquire", cta: "Start an enquiry" },
  },
  manufacturing: {
    intro: "Specialised towns, each concentrating decades of know-how in a few product families.",
    links: [{ label: "Interactive cluster map", href: "/manufacturing", meta: "→" }, ...clusters.filter((c) => c.featured).map((c) => ({ label: `${c.name}`, href: `/manufacturing/${c.slug}` }))],
    feature: { title: "Explore the network map", body: "Click a cluster to see its specialisation and related products.", href: "/manufacturing#map", cta: "Open the map" },
  },
  services: {
    intro: "Twelve services covering the sourcing lifecycle, from first brief to shipped container.",
    links: services.map((s) => ({ label: s.name, href: `/services/${s.slug}`, meta: s.index })),
    feature: { title: "Have a product idea?", body: "Our product development request is built for first-time manufacturers.", href: "/product-development", cta: "Describe your product" },
  },
  resources: {
    intro: "Practical tools and guides for buyers planning to source from India.",
    links: [
      { label: "Resources hub", href: "/resources" },
      { label: "Landed-cost estimator", href: "/tools/landed-cost-calculator" },
      { label: "CBM & container calculator", href: "/tools/cbm-calculator" },
      { label: "Supplier evaluation checklist", href: "/tools/supplier-evaluation-checklist" },
      { label: "How to source from India", href: "/resources/how-to-source-from-india" },
      { label: "Incoterms for India imports", href: "/resources/incoterms-for-india-imports" },
      { label: "Global markets", href: "/markets" },
    ],
    feature: { title: "Estimate your landed cost", body: "Model duty, freight, insurance and taxes with transparent formulas.", href: "/tools/landed-cost-calculator", cta: "Open estimator" },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable} ${plex.variable}`}>
      <body>
        <Header nav={mainNav} menus={menus} cta={primaryCta} />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppButton />
        <MobileCtaBar />
        <JsonLd data={[organizationLd(), websiteLd()]} />
      </body>
    </html>
  );
}
