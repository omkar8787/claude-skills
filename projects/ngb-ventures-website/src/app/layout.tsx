import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Header, type MenuData } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { site, mainNav, primaryCta } from "@/content/site";
import { industries } from "@/content/industries";
import { JsonLd, organizationLd, websiteLd } from "@/lib/seo";
import { Analytics } from "@/components/analytics/Analytics";
import { PointerShine } from "@/components/ui/PointerShine";
import { HashScroll } from "@/components/ui/HashScroll";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500"], style: ["normal", "italic"], variable: "--font-cormorant", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const plex = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "NGB Ventures | Your Global Sourcing Desk in India", template: "%s | NGB Ventures" },
  description: site.description,
  applicationName: site.name,
  openGraph: { siteName: site.name, type: "website", locale: "en_US" },
  formatDetection: { telephone: false },
  alternates: { types: { "application/rss+xml": [{ url: "/insights/feed.xml", title: "NGB Ventures: Insights from India" }] } },
  verification: {
    ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } : {}),
    ...(process.env.NEXT_PUBLIC_BING_VERIFICATION ? { other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION } } : {}),
  },
};

export const viewport: Viewport = { themeColor: "#1d2a45", width: "device-width", initialScale: 1 };

const menus: MenuData = {
  capabilities: {
    intro: "Four divisions, one partner, from finding a product in India to selling it worldwide.",
    links: [
      { label: "All capabilities", href: "/capabilities", meta: "→" },
      { label: "India Sourcing", href: "/india-sourcing", meta: "01" },
      { label: "Manufacturing & Private Label", href: "/manufacturing-private-label", meta: "02" },
      { label: "Global Export Solutions", href: "/export", meta: "03" },
      { label: "Brand Development", href: "/brand-development", meta: "04" },
      { label: "Advertising & Marketing", href: "/advertising", meta: "04" },
      { label: "Industries we serve", href: "/industries", meta: "→" },
      { label: "Corporate Gifting", href: "/corporate-gifting", meta: "→" },
      { label: "Publishers & Printing", href: "/publishers-printing", meta: "→" },
      { label: "All services", href: "/services", meta: "→" },
    ],
    feature: { title: "Can't find it? We'll help you source it.", body: "You don't need to know where India makes it. Discovering that is our job.", href: "/quote", cta: "Source a product" },
  },
  discover: {
    intro: "Explore India by product, by region and by origin.",
    links: [
      { label: "Product Discovery", href: "/discover", meta: "→" },
      { label: "India Manufacturing Atlas", href: "/atlas", meta: "→" },
      { label: "GI & Origin Collection", href: "/origin", meta: "→" },
      ...industries.filter((i) => ["food-nutrition", "gifting", "apparel", "home-textiles", "handicrafts", "engineering-industrial"].includes(i.slug)).map((i) => ({ label: i.name, href: `/industries/${i.slug}`, meta: i.index })),
      { label: "Manufacturing clusters", href: "/manufacturing", meta: "→" },
      { label: "Product guides", href: "/products", meta: "→" },
      { label: "Global markets", href: "/markets", meta: "→" },
    ],
    feature: { title: "The India Manufacturing Atlas", body: "Select a state to see its clusters, crafts, GI products and sourcing ideas.", href: "/atlas", cta: "Open the Atlas" },
  },
  about: {
    intro: "A disability-owned business from Pune, building a modern gateway to India's manufacturing ecosystem.",
    links: [
      { label: "About NGB Ventures", href: "/about" },
      { label: "Importing from a disability-owned exporter", href: "/export#dobe" },
      { label: "Insights & Research", href: "/insights" },
      { label: "Market readiness check", href: "/tools/market-readiness" },
      { label: "Contact", href: "/contact" },
      { label: "Request a quote", href: "/quote" },
    ],
    feature: { title: "Business with purpose.", body: "Our Disability:IN DOBE® certification application is underway.", href: "/export#dobe", cta: "Import from us" },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="a" className={`${cormorant.variable} ${manrope.variable} ${plex.variable}`}>
      <body>
        {/* Runtime settings (GA4 ID, form endpoint): editable on the host without a rebuild. */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="/site-config.js" />
        <Header nav={mainNav} menus={menus} cta={primaryCta} />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppButton />
        <MobileCtaBar />
        <Analytics />
        <PointerShine />
        <HashScroll />
        <JsonLd data={[organizationLd(), websiteLd()]} />
      </body>
    </html>
  );
}
