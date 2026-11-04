import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { getDivision } from "@/content/divisions";
import { DivisionHero, DeliveredCoordinated, NextDivisions, SplitBlock } from "@/components/division/DivisionTemplate";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { buildMetadata, JsonLd, serviceLd } from "@/lib/seo";

const d = getDivision("inclusive-procurement")!;
export const metadata = buildMetadata({ title: "Inclusive Procurement & Supplier Diversity | Disability-Owned Business", description: "NGB Ventures is a disability-owned business with a Disability:IN DOBE certification application underway, offering an inclusive sourcing partner for corporate supplier-diversity programmes.", path: d.route });

/** Benefits as designed by the certification programme; framed as future, conditional on Disability:IN granting certification. */
const benefits: [string, string][] = [
  ["Verified, not self-declared", "Disability:IN independently verifies that the business is at least 51% owned, managed and controlled by people with disabilities. Your team doesn't have to check ownership itself."],
  ["Easier to find", "Certified businesses are listed in Disability:IN's supplier directory, which corporate procurement teams use to find disability-owned vendors."],
  ["Counts towards your diversity goals", "Where your programme recognises DOBE® suppliers, spend with us can be reported as disability-owned spend, either directly (Tier 1) or through your prime suppliers (Tier 2)."],
  ["Supports ESG and impact reporting", "Documented, certified diverse spend gives your social-impact and ESG disclosures something concrete to report."],
  ["Wider access to India", "Through us, your supply chain reaches small manufacturers and artisan enterprises across India that rarely sell to global buyers directly."],
  ["The same rigour, under NDA", "Certification adds purpose, not shortcuts. Written briefs, verified suppliers, independent inspections and NDAs stay standard."],
];

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
      <section id="benefits" className="scroll-mt-24 py-24 lg:py-32" aria-labelledby="ben-h">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7"><p className="eyebrow mb-6">Once certification is granted</p><h2 id="ben-h" className="display text-[clamp(2.2rem,4.4vw,4rem)]">What DOBE® certification <em>will mean for buyers.</em></h2></div>
            <p className="lede lg:col-span-4 lg:col-start-9">Our application is underway. This is what certification is designed to make possible for your organisation once Disability:IN grants it.</p>
          </div>
          <ol className="mt-14 grid gap-px overflow-hidden bg-line sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map(([t, b], i) => (
              <li key={t} className="bg-ivory p-7 lg:p-8"><span className="ledger text-bronze-ink">{String(i + 1).padStart(2, "0")}</span><p className="mt-5 font-display text-[1.7rem] leading-tight">{t}</p><p className="mt-3 text-[0.95rem] leading-relaxed text-stone-ink">{b}</p></li>
            ))}
          </ol>
          <div className="mt-10 grid gap-6 lg:grid-cols-12">
            <div className="rounded-sm border border-line bg-paper p-6 text-sm leading-relaxed text-stone-ink lg:col-span-7">
              <p className="font-semibold text-charcoal">What certification doesn&apos;t do</p>
              <p className="mt-2">It doesn&apos;t guarantee contracts, preferred status or pricing. Programme rules differ by company: some count only certain supplier locations or certifying bodies, so please check with your supplier-diversity team how spend with an India-based, disability-owned supplier is recognised.</p>
            </div>
            <div className="flex flex-col justify-center gap-3 lg:col-span-4 lg:col-start-9">
              <Link href="/quote?type=procurement" className="btn btn-primary">Register your interest</Link>
              <p className="text-xs leading-relaxed text-stone-ink">We&apos;ll let you know when certification is granted. Until then we never display a certified badge.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="border-t border-line bg-paper py-24 lg:py-32">
        <div className="container-x">
          <p className="eyebrow mb-6">For corporate procurement teams</p>
          <h2 className="display max-w-3xl text-[clamp(2.2rem,4.4vw,4rem)]">Looking to diversify <em>your supplier base?</em></h2>
          <div className="mt-14 grid gap-px overflow-hidden bg-line md:grid-cols-3">
            {[["A diverse-supplier option", "A disability-owned sourcing partner that can support your diversity reporting once certification is granted."], ["Access to small producers", "We open sourcing to artisan enterprises and small manufacturers that rarely reach global buyers directly."], ["Professional process", "Written briefs, document-based supplier verification, independent inspections and clear contracts. Purpose doesn't replace rigour."]].map(([t, b]) => (
              <div key={t} className="bg-paper p-8"><p className="font-display text-2xl">{t}</p><p className="mt-3 leading-relaxed text-stone-ink">{b}</p></div>
            ))}
          </div>
          <div className="mt-10"><Link href="/quote?type=procurement" className="btn btn-primary">Talk to us about inclusive procurement</Link></div>
        </div>
      </section>
      <DeliveredCoordinated d={d} />
      <Faq faqs={[
        { q: "Is NGB Ventures DOBE® certified?", a: "Not yet. Our application/process is underway. We'll update this page and our materials only after Disability:IN formally grants certification." },
        { q: "What changes for us once you're certified?", a: "You'll be able to find us in Disability:IN's supplier directory, rely on independently verified disability ownership, and, where your programme recognises DOBE® suppliers, report spend with us as disability-owned spend (Tier 1 or Tier 2)." },
        { q: "Can certification guarantee us a contract?", a: "No. Supplier-diversity programmes vary by company. Certification may help start a conversation, but contracts are earned on capability, price and service." },
        { q: "Do you work only with disability-owned suppliers?", a: "No. We source from a broad range of Indian manufacturers and producers. Inclusion means widening access, not narrowing choice." },
      ]} title="Inclusive procurement: FAQs" />
      <NextDivisions current={d.slug} />
      <CtaBand title="Building a more inclusive supply chain? Let's talk." topic="Partnership" />
      <JsonLd data={serviceLd({ name: "Inclusive procurement and supplier diversity", description: metadata.description as string, path: d.route, serviceType: "Supplier diversity" })} />
    </>
  );
}
