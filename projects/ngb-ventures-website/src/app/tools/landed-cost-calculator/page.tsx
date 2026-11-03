import { LandedCost } from "@/components/tools/LandedCost";
import { PageHero } from "@/components/sections/PageHero";
import { InlineCta } from "@/components/sections/DetailBlocks";
import { buildMetadata, JsonLd, absUrl } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Landed Cost Calculator for Imports from India", description: "Estimate the landed cost of importing goods from India: product cost, freight, insurance, customs duty, additional duties and import VAT/GST, with FOB or CIF valuation. Estimates only.", path: "/tools/landed-cost-calculator" });

export default function Page() {
  return (
    <>
      <PageHero plate={{ slot: "page-tools", motif: "blueprint", tone: "stone", alt: "Landed-cost estimator", brief: "Planning tools on a desk" }} crumbs={[{ name: "Insights", href: "/insights" }, { name: "Landed-cost estimator", href: "/tools/landed-cost-calculator" }]} compact eyebrow="Free tool" title="Landed-cost estimator" lede="Estimate what a shipment from India really costs once it lands. You enter the duty and tax rates from official sources, and the formulas are shown openly." />
      <section className="container-x py-20 lg:py-28"><LandedCost /></section>
      <InlineCta title="Want us to validate the numbers?" body="Share your product and destination. We can coordinate freight quotes and inspection plans." href="/quote" label="Discuss your project" />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebApplication", name: "Landed-cost estimator", url: absUrl("/tools/landed-cost-calculator"), applicationCategory: "BusinessApplication", operatingSystem: "Any", isAccessibleForFree: true }} />
    </>
  );
}
