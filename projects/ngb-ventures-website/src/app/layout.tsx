import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Header, type MenuData } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { site, mainNav, primaryCta } from "@/content/site";
import { JsonLd, organizationLd, websiteLd } from "@/lib/seo";
import { Analytics } from "@/components/analytics/Analytics";
import { PointerShine } from "@/components/ui/PointerShine";
import { HashScroll } from "@/components/ui/HashScroll";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500"], style: ["normal", "italic"], variable: "--font-cormorant", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const plex = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "NGB Ventures | India Sourcing, Manufacturing & Export", template: "%s | NGB Ventures" },
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
    intro: "Four divisions, one partner: from finding a product in India to selling it in your market.",
    links: [
      { label: "India Sourcing", href: "/india-sourcing", meta: "01" },
      { label: "OEM & ODM Manufacturing", href: "/manufacturing-private-label#oem-odm", meta: "02" },
      { label: "Private Label Development", href: "/manufacturing-private-label#private-label", meta: "02" },
      { label: "Global Export Solutions", href: "/export", meta: "03" },
      { label: "Brand Development", href: "/brand-development", meta: "04" },
      { label: "All capabilities", href: "/capabilities", meta: "→" },
      { label: "Corporate gifting", href: "/corporate-gifting", meta: "→" },
      { label: "Publishers & printing", href: "/publishers-printing", meta: "→" },
      { label: "Procurement tools", href: "/tools", meta: "→" },
    ],
    feature: { title: "Request a sourcing proposal", body: "Share your requirement. We reply with a feasibility assessment and a proposed sourcing approach.", href: "/quote", cta: "Start your enquiry" },
  },
  discover: {
    intro: "Explore India's manufacturing landscape, from traditional craft clusters to modern industrial centres.",
    links: [
      { label: "Product Categories", href: "/industries", meta: "→" },
      { label: "Product Discovery", href: "/discover", meta: "→" },
      { label: "Manufacturing Atlas", href: "/atlas", meta: "→" },
      { label: "Manufacturing Clusters", href: "/manufacturing", meta: "→" },
      { label: "GI & Origin Collection", href: "/origin", meta: "→" },
      { label: "Product guides", href: "/products", meta: "→" },
      { label: "Global markets", href: "/markets", meta: "→" },
    ],
    feature: { title: "India Manufacturing Atlas", body: "Select a state to see its manufacturing clusters, craft traditions, GI products and industrial strengths.", href: "/atlas", cta: "Explore the Atlas" },
  },
  brand: {
    intro: "Positioning, identity, packaging and advertising for products made in India.",
    links: [
      { label: "Product Positioning", href: "/brand-development#positioning", meta: "→" },
      { label: "Brand Identity", href: "/brand-development#identity", meta: "→" },
      { label: "Packaging", href: "/brand-development#packaging", meta: "→" },
      { label: "Advertising & Marketing", href: "/advertising", meta: "→" },
    ],
    feature: { title: "Brand Studio", body: "See how one product moves from factory sample to a listing-ready brand.", href: "/brand-development", cta: "Visit the Brand Studio" },
  },
  insights: {
    intro: "Research and practical guidance for international buyers sourcing from India.",
    links: [
      { label: "Buyer Guides", href: "/insights#buyer-guides", meta: "→" },
      { label: "Sourcing Research", href: "/insights#sourcing-research", meta: "→" },
      { label: "Manufacturing Insights", href: "/insights#manufacturing-insights", meta: "→" },
      { label: "Export Compliance", href: "/insights#export-compliance", meta: "→" },
      { label: "Procurement tools", href: "/tools", meta: "→" },
    ],
    feature: { title: "How to source from India", body: "A step-by-step framework: briefs, clusters, supplier qualification, sampling, inspection and documentation.", href: "/insights/how-to-source-from-india", cta: "Read the guide" },
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
