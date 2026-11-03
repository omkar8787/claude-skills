import { services } from "@/content/services";
import { processSteps } from "@/content/home";
import { PageHero } from "@/components/sections/PageHero";
import { ServicesLedger } from "@/components/sections/ServicesLedger";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { CtaBand } from "@/components/sections/CtaBand";
import { buildMetadata, JsonLd, itemListLd } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Services | Sourcing, Private Label, QC & Export from India", description: "Supplier identification, manufacturer verification, private label, OEM/ODM, product development, quality inspection, factory audits, packaging, export and logistics coordination in India.", path: "/services" });

export default function ServicesPage() {
  return (
    <>
      <PageHero plate={{ slot: "page-services", motif: "jali", tone: "bronze", alt: "Sourcing consultation", brief: "Sourcing team reviewing samples" }} crumbs={[{ name: "Services", href: "/services" }]} eyebrow="12 services" title="Services" italic="end to end." lede="Use a single service, such as a pre-shipment inspection, or combine them into a fully coordinated sourcing programme." ctas={[{ label: "Discuss your project", href: "/quote" }]} />
      <section className="container-x py-24 lg:py-32"><ServicesLedger items={services} /></section>
      <section className="border-t border-line bg-paper py-24 lg:py-32"><div className="container-x grid gap-16 lg:grid-cols-12"><div className="lg:col-span-4"><p className="eyebrow mb-6">How services fit together</p><h2 className="display text-[clamp(2.2rem,4vw,3.75rem)]">The sourcing <em>lifecycle</em></h2></div><div className="lg:col-span-8"><ProcessTimeline steps={processSteps} /></div></div></section>
      <CtaBand />
      <JsonLd data={itemListLd("Services", services.map((s) => ({ name: s.name, href: `/services/${s.slug}` })))} />
    </>
  );
}
