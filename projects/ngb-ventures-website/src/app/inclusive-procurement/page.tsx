import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { getDivision } from "@/content/divisions";
import { DivisionHero, DeliveredCoordinated, NextDivisions, SplitBlock } from "@/components/division/DivisionTemplate";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { buildMetadata, JsonLd, serviceLd } from "@/lib/seo";

const d = getDivision("inclusive-procurement")!;
export const metadata = buildMetadata({ title: "Inclusive Procurement & Supplier Diversity | Disability-Owned Business", description: "NGB Ventures is a disability-owned business with a Disability:IN DOBE certification application underway, offering an inclusive sourcing partner for corporate supplier-diversity programmes.", path: d.route });

export default function Inclusive() {
  return (
    <>
      <DivisionHero d={d} />
      <section className="on-dark bg-forest py-20 text-ivory">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7"><p className="ledger text-bronze-soft">Certification status</p><p className="display mt-4 text-[clamp(2rem,4vw,3.4rem)]">DOBE® certification: application / process underway.</p></div>
          <div className="lg:col-span-4 lg:col-start-9 rounded-sm border border-ivory/20 p-6 text-sm leading-relaxed text-ivory/75"><p className="flex items-center gap-2 font-semibold text-ivory"><ShieldCheck className="h-5 w-5 text-bronze-soft" /> Our display rule</p><p className="mt-2">We won&apos;t use a DOBE® certified badge or describe ourselves as certified until Disability:IN formally grants certification. This page will be updated when it does.</p></div>
        </div>
      </section>
      <SplitBlock eyebrow="What DOBE® means" title={<>A recognised <em>diverse-supplier</em> category.</>}>
        <div className="prose-ngb text-[1.0625rem]">
          <p>The Disability-Owned Business Enterprise (DOBE®) certification is run by Disability:IN. Its published criteria require, among other things, that a business is for-profit and at least 51% owned, operated, managed and controlled by one or more people with disabilities. It must also be headquartered in the country where it applies.</p>
          <p>Many large companies run supplier-diversity programmes that track spend with certified diverse suppliers, including disability-owned businesses. Certification can open conversations with those procurement teams.</p>
          <p>Certification and supplier-diversity programmes may support procurement engagement. They don&apos;t guarantee contracts, funding or preferred purchasing, and we never suggest otherwise.</p>
        </div>
      </SplitBlock>
      <section className="border-t border-line bg-paper py-24 lg:py-32">
        <div className="container-x">
          <p className="eyebrow mb-6">For corporate procurement teams</p>
          <h2 className="display max-w-3xl text-[clamp(2.2rem,4.4vw,4rem)]">Looking to diversify <em>your supplier base?</em></h2>
          <div className="mt-14 grid gap-px overflow-hidden bg-line md:grid-cols-3">
            {[["A diverse-supplier option", "A disability-owned sourcing partner that can support your diversity reporting once certification is granted."], ["Access to small producers", "We open sourcing to artisan enterprises and small manufacturers that rarely reach global buyers directly."], ["Professional process", "Written briefs, document-based supplier verification, independent inspections and clear contracts. Purpose doesn't replace rigour."]].map(([t, b]) => (
              <div key={t} className="bg-paper p-8"><p className="font-display text-2xl">{t}</p><p className="mt-3 leading-relaxed text-stone-ink">{b}</p></div>
            ))}
          </div>
          <div className="mt-10"><Link href="/quote?type=procurement" className="btn btn-primary">Connect with our inclusive procurement team</Link></div>
        </div>
      </section>
      <DeliveredCoordinated d={d} />
      <Faq faqs={[
        { q: "Is NGB Ventures DOBE® certified?", a: "Not yet. Our application/process is underway. We'll update this page and our materials only after Disability:IN formally grants certification." },
        { q: "Can certification guarantee us a contract?", a: "No. Supplier-diversity programmes vary by company. Certification may help start a conversation, but contracts are earned on capability, price and service." },
        { q: "Do you work only with disability-owned suppliers?", a: "No. We source from a broad range of Indian manufacturers and producers. Inclusion means widening access, not narrowing choice." },
      ]} title="Inclusive procurement: FAQs" />
      <NextDivisions current={d.slug} />
      <CtaBand title="Building a more inclusive supply chain? Let's talk." topic="Partnership" />
      <JsonLd data={serviceLd({ name: "Inclusive procurement and supplier diversity", description: metadata.description as string, path: d.route, serviceType: "Supplier diversity" })} />
    </>
  );
}
