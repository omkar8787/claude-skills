import { CbmCalculator } from "@/components/tools/CbmCalculator";
import { PageHero } from "@/components/sections/PageHero";
import { InlineCta } from "@/components/sections/DetailBlocks";
import { buildMetadata, JsonLd, absUrl } from "@/lib/seo";

export const metadata = buildMetadata({ title: "CBM Calculator & Container Load Estimator", description: "Calculate cubic metres (CBM), gross weight, air chargeable weight, LCL W/M and 20ft/40ft/40HC container fit for mixed carton shipments.", path: "/tools/cbm-calculator" });

export default function Page() {
  return (
    <>
      <PageHero plate={{ slot: "page-tools", motif: "blueprint", tone: "stone", alt: "CBM & container calculator", brief: "Planning tools on a desk" }} crumbs={[{ name: "Insights", href: "/insights" }, { name: "CBM & container calculator", href: "/tools/cbm-calculator" }]} compact eyebrow="Free tool" title="CBM & container calculator" lede="Work out shipment volume, chargeable weight and how much of a container your cartons will fill." />
      <section className="container-x py-20 lg:py-28"><CbmCalculator /></section>
      <InlineCta title="Want us to validate the numbers?" body="Share your product and destination. We can coordinate freight quotes and inspection plans." href="/quote" label="Discuss your project" />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebApplication", name: "CBM & container calculator", url: absUrl("/tools/cbm-calculator"), applicationCategory: "BusinessApplication", operatingSystem: "Any", isAccessibleForFree: true }} />
    </>
  );
}
