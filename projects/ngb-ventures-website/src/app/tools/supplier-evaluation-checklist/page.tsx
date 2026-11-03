import { SupplierChecklist } from "@/components/tools/SupplierChecklist";
import { PageHero } from "@/components/sections/PageHero";
import { InlineCta } from "@/components/sections/DetailBlocks";
import { buildMetadata, JsonLd, absUrl } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Supplier Evaluation Checklist for Indian Manufacturers", description: "Interactive supplier evaluation checklist: business verification, factory capability, production capacity, quality management, certifications, export experience and sample evaluation.", path: "/tools/supplier-evaluation-checklist" });

export default function Page() {
  return (
    <>
      <PageHero plate={{ slot: "page-tools", motif: "blueprint", tone: "stone", alt: "Supplier evaluation checklist", brief: "Planning tools on a desk" }} crumbs={[{ name: "Resources", href: "/resources" }, { name: "Supplier evaluation checklist", href: "/tools/supplier-evaluation-checklist" }]} compact eyebrow="Free tool" title="Supplier evaluation checklist" lede="A structured way to assess an Indian supplier before you commit. Progress is saved in your browser." />
      <section className="container-x py-20 lg:py-28"><SupplierChecklist /></section>
      <InlineCta title="Want us to validate the numbers?" body="Share your product and destination. We can coordinate freight quotes and inspection plans." href="/enquire" label="Discuss your project" />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebApplication", name: "Supplier evaluation checklist", url: absUrl("/tools/supplier-evaluation-checklist"), applicationCategory: "BusinessApplication", operatingSystem: "Any", isAccessibleForFree: true }} />
    </>
  );
}
