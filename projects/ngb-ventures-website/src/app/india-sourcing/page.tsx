import Link from "next/link";
import { getDivision } from "@/content/divisions";
import { processSteps } from "@/content/home";
import { DivisionHero, DeliveredCoordinated, NextDivisions, SplitBlock } from "@/components/division/DivisionTemplate";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { buildMetadata, JsonLd, serviceLd } from "@/lib/seo";

const d = getDivision("india-sourcing")!;
export const metadata = buildMetadata({ title: "India Sourcing Company | Product Sourcing & Manufacturer Discovery", description: "Indian product sourcing for international buyers: manufacturer discovery, supplier identification, artisan and GI producer research, cluster mapping and bulk procurement coordination.", path: d.route });

export default function IndiaSourcing() {
  return (
    <>
      <DivisionHero d={d} />
      <SplitBlock eyebrow="What you can bring us" title={<>Almost any <em>legitimate</em> requirement.</>}>
        <div className="grid gap-6 sm:grid-cols-2">
          {[["A product you've seen", "A photo, a link or a sample from another market. We find who in India can make it, or something better."], ["A specification", "A tech pack, drawing or bill of materials. We find manufacturers with the right processes and certifications."], ["A category to explore", "\"Sustainable homeware\" or \"heritage textiles\". We map clusters and options, then help you narrow down."], ["A heritage product", "A GI or traditional craft. We research the region, the registered proprietors and the authorised users."]].map(([t, b]) => (
            <div key={t} className="border-t border-charcoal pt-4"><p className="font-display text-2xl">{t}</p><p className="mt-2 text-[0.95rem] leading-relaxed text-stone-ink">{b}</p></div>
          ))}
        </div>
        <p className="mt-10 rounded-sm bg-paper p-6 text-sm leading-relaxed text-stone-ink"><strong className="text-charcoal">An honest promise:</strong> we can investigate almost anything India makes, but not every product can, or should, be sourced from India. Every request starts with a feasibility assessment covering capability, cost, compliance and volume. If the answer is no, we&apos;ll tell you.</p>
      </SplitBlock>
      <DeliveredCoordinated d={d} />
      <section className="border-t border-line bg-paper py-24 lg:py-32"><div className="container-x grid gap-16 lg:grid-cols-12"><div className="lg:col-span-4"><p className="eyebrow mb-6">How sourcing works</p><h2 className="display text-[clamp(2.2rem,4vw,3.75rem)]">Seven steps, <em>each with a deliverable.</em></h2><div className="mt-8 flex flex-wrap gap-3"><Link href="/atlas" className="btn btn-ghost">India Manufacturing Atlas</Link><Link href="/origin" className="btn btn-ghost">Origin Collection</Link></div></div><div className="lg:col-span-8"><ProcessTimeline steps={processSteps} /></div></div></section>
      <Faq faqs={[
        { q: "Do you have a list of verified suppliers I can browse?", a: "No public directory. We match suppliers to each brief and verify them for that project. A static list can't tell you who's right for your product, volume and market." },
        { q: "Can you source from artisans and small producers?", a: "Yes. Many of India's most distinctive products come from artisan clusters and small enterprises. We'll be clear about the realistic volumes, lead times and consistency for each." },
        { q: "How do you charge?", a: "Fees are scoped per engagement, for example a fixed research fee, a project fee or a service fee. We agree it in writing before work starts. Ask us for a proposal." },
        { q: "What if I don't know the HS code or category?", a: "That's fine. Describe the product and we'll work out the category, the likely clusters and the questions to answer." },
      ]} title="India sourcing: FAQs" />
      <NextDivisions current={d.slug} />
      <CtaBand title="If it's made in India, let's find it." topic="Sourcing project" />
      <JsonLd data={serviceLd({ name: "India product sourcing", description: metadata.description as string, path: d.route, serviceType: "Product sourcing" })} />
    </>
  );
}
