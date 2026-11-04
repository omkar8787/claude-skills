import Link from "next/link";
import { DobeAdvantage, dobeFaqs } from "@/components/sections/DobeAdvantage";
import { getDivision } from "@/content/divisions";
import { markets } from "@/content/markets";
import { DivisionHero, DeliveredCoordinated, NextDivisions, SplitBlock } from "@/components/division/DivisionTemplate";
import { WorldMarkets } from "@/components/maps/WorldMarkets";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { buildMetadata, JsonLd, serviceLd } from "@/lib/seo";

const d = getDivision("export")!;
export const metadata = buildMetadata({ title: "India Export Solutions | Export Documentation & Compliance Coordination", description: "Export readiness, HS-code research, destination compliance, documentation and logistics coordination for goods sourced from India, for the US, UK, EU, UAE, Australia, Canada and Southeast Asia.", path: d.route });

export default function ExportPage() {
  return (
    <>
      <DivisionHero d={d} />
      <section className="on-dark tone-light bg-charcoal py-24 text-ivory lg:py-32"><div className="container-x"><p className="eyebrow mb-6">Routes from India</p><h2 className="display mb-14 text-[clamp(2.2rem,4.4vw,4rem)]">One origin. <em>Many destinations.</em></h2><WorldMarkets /></div></section>
      <SplitBlock eyebrow="Before you ship" title={<>The questions that <em>decide your landed cost.</em></>}>
        <ol className="space-y-6">
          {[["Classification", "Which HS code applies? It drives duty rates, product rules and paperwork. We research indicative codes. Final classification is the importer's and customs broker's decision."], ["Origin & preference", "Does a trade agreement apply (e.g. India–UAE CEPA, India–Australia ECTA)? What proof of origin is needed? Preferences only apply when rules of origin are met."], ["Product rules", "Safety, chemical, labelling and food-contact requirements in the destination market."], ["Documents", "Commercial invoice, packing list, certificate of origin and product-specific certificates."], ["Logistics", "Incoterm, mode (FCL, LCL or air), packing and insurance, coordinated with licensed forwarders."]].map(([t, b], i) => (
            <li key={t} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-line pt-5"><span className="ledger text-bronze-ink">0{i + 1}</span><div><p className="font-display text-2xl">{t}</p><p className="mt-2 leading-relaxed text-stone-ink">{b}</p></div></li>
          ))}
        </ol>
        <p className="mt-10 rounded-sm bg-paper p-6 text-sm leading-relaxed text-stone-ink"><strong className="text-charcoal">What we never promise:</strong> guaranteed customs clearance, fixed duty rates or blanket tariff advantages. Tariffs and import requirements depend on HS classification, origin and destination, and they change, sometimes quickly.</p>
        <div className="mt-8 flex flex-wrap gap-3"><Link href="/tools/market-readiness" className="btn btn-primary">Run a market-readiness check</Link><Link href="/tools/landed-cost-calculator" className="btn btn-ghost">Landed-cost estimator</Link><Link href="/tools/cbm-calculator" className="btn btn-ghost">CBM calculator</Link></div>
      </SplitBlock>
      <section className="border-t border-line bg-paper py-20"><div className="container-x"><p className="eyebrow mb-8">Market guides</p><ul className="grid gap-px overflow-hidden bg-line sm:grid-cols-2 lg:grid-cols-4">{markets.map((m) => <li key={m.slug} className="bg-paper"><Link href={`/markets/${m.slug}`} className="block p-6 hover:bg-ivory"><p className="ledger text-bronze-ink">{m.code}</p><p className="mt-3 font-display text-2xl">{m.name}</p></Link></li>)}</ul></div></section>
      <DobeAdvantage />
      <DeliveredCoordinated d={d} />
      <Faq faqs={[
        ...dobeFaqs,
        { q: "Are you a freight forwarder or customs broker?", a: "No. We coordinate with licensed forwarders and customs brokers, who carry out carriage and clearance." },
        { q: "Can you tell me my exact import duty?", a: "We can research indicative HS codes and point you to the official tariff tools. Exact duty is set by customs on the declared classification, origin and value. Confirm it with a licensed broker." },
        { q: "Do you handle Amazon FBA shipments?", a: "We coordinate FBA-compliant labelling and cartons with the manufacturer, and hand over to forwarders that deliver to FBA warehouses." },
      ]} title="Export: FAQs" />
      <NextDivisions current={d.slug} />
      <CtaBand title="Shipping from India? Let's plan it properly." topic="Sourcing project" />
      <JsonLd data={serviceLd({ name: "India export coordination", description: metadata.description as string, path: d.route, serviceType: "Export coordination" })} />
    </>
  );
}
