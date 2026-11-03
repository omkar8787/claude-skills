import { MarketReadiness } from "@/components/tools/MarketReadiness";
import { PageHero } from "@/components/sections/PageHero";
import { InlineCta } from "@/components/sections/DetailBlocks";
import { buildMetadata, JsonLd, absUrl } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Global Market Readiness Check | Export Compliance Questions", description: "A free preliminary check of the compliance, labelling and documentation questions to resolve before exporting a product from India to the US, UK, EU, UAE, Australia, Canada or Singapore.", path: "/tools/market-readiness" });

export default function Page() {
  return (
    <>
      <PageHero compact plate={{ slot: "page-tools", motif: "blueprint", tone: "forest", alt: "Market readiness", brief: "" }} crumbs={[{ name: "Insights", href: "/insights" }, { name: "Market readiness check", href: "/tools/market-readiness" }]} eyebrow="Free tool · Global market readiness" title="Is your product" italic="ready for its market?" lede="Choose a destination and describe your product. You'll get the preliminary compliance and export questions to resolve before you commit to production." />
      <section className="container-x py-16 lg:py-24"><MarketReadiness /></section>
      <InlineCta title="Want help answering these questions?" body="We'll research the requirements for your exact product and coordinate testing and documentation partners." href="/quote?type=sourcing" label="Discuss your product" />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebApplication", name: "Global market readiness check", url: absUrl("/tools/market-readiness"), applicationCategory: "BusinessApplication", operatingSystem: "Any", isAccessibleForFree: true }} />
    </>
  );
}
