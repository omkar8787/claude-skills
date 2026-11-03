import { getDivision } from "@/content/divisions";
import { DivisionHero, DeliveredCoordinated, NextDivisions } from "@/components/division/DivisionTemplate";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { buildMetadata, JsonLd, serviceLd } from "@/lib/seo";

const d = getDivision("manufacturing-private-label")!;
export const metadata = buildMetadata({ title: "OEM, ODM & Private Label Manufacturing in India", description: "Turn your product idea into reality with Indian manufacturers: OEM, ODM and private-label development, sampling, packaging, quality inspection coordination and export preparation.", path: d.route });

const steps = [
  ["Product research", "Market, materials and feasibility: what should the product be, and can India make it well?", "Feasibility note"],
  ["Manufacturer discovery", "Matching processes, capacity and certifications to your product.", "Shortlist"],
  ["Specification development", "Tech pack, drawings, materials, tolerances and testing requirements.", "Specification"],
  ["Sample coordination", "Proto, fit and pre-production samples with a logged feedback trail.", "Approved golden sample"],
  ["Packaging development", "Dielines, materials, inserts and retailer or marketplace requirements.", "Packaging spec"],
  ["Private-label customisation", "Labels, tags, printing, colours and brand assets applied at source.", "Branding approval"],
  ["Quality inspection coordination", "Inline and AQL pre-shipment inspections with independent inspectors.", "Inspection reports"],
  ["Production coordination", "Schedules, materials checks, progress updates and early escalation.", "Production tracker"],
  ["Export preparation", "Document checklists, marks, labels and compliance paperwork.", "Shipping file"],
  ["Logistics coordination", "Handover to licensed forwarders: FCL, LCL, air or FBA inbound.", "Booking confirmation"],
].map(([title, body, output], i) => ({ n: String(i + 1).padStart(2, "0"), title, body, output }));

export default function ManufacturingPL() {
  return (
    <>
      <DivisionHero d={d} />
      <section className="container-x py-24 lg:py-32">
        <div className="max-w-3xl"><p className="eyebrow mb-6">Three ways to make a product</p><h2 className="display text-[clamp(2.2rem,4.4vw,4rem)]">OEM, ODM or <em>private label?</em></h2></div>
        <div className="mt-14 grid gap-px overflow-hidden bg-line md:grid-cols-3">
          {[
            ["OEM", "Original Equipment Manufacturing", "Manufacturing to your specifications. You own the design; the factory builds it to your drawings or tech pack.", "Best when you have a defined design and need control of materials, tolerances and IP."],
            ["ODM", "Original Design Manufacturing", "Developing or customising a product from a manufacturer's existing or developed designs.", "Best for speed: adapt a proven design with your changes, then refine it over time."],
            ["Private label", "Your brand, made in India", "Market-ready products sold under your own brand: labels, packaging and listings built for your channel.", "Best for retailers, Amazon sellers and DTC brands launching or extending a range."],
          ].map(([k, sub, body, best], i) => (
            <Reveal key={k} delay={i * 0.06} className="bg-ivory p-8 lg:p-10">
              <p className="display text-6xl text-bronze-ink">{k}</p><p className="ledger mt-3 text-stone-ink">{sub}</p>
              <p className="mt-6 leading-relaxed">{body}</p><p className="mt-4 text-sm leading-relaxed text-stone-ink">{best}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="border-t border-line bg-paper py-24 lg:py-32"><div className="container-x grid gap-16 lg:grid-cols-12"><div className="lg:col-span-4"><div className="lg:sticky lg:top-28"><p className="eyebrow mb-6">The production journey</p><h2 className="display text-[clamp(2.2rem,4vw,3.75rem)]">Ten steps from <em>idea to shipment.</em></h2><p className="lede mt-6">Scroll to follow the journey. Every step has an owner and a written output.</p></div></div><div className="lg:col-span-8"><ProcessTimeline steps={steps} /></div></div></section>
      <DeliveredCoordinated d={d} />
      <Faq faqs={[
        { q: "What MOQs should I expect?", a: "It depends on the product, materials and process. Some artisan products start at small quantities, while custom-dyed fabrics, moulds and printed packaging usually need larger runs. We confirm real MOQs with each manufacturer." },
        { q: "Who owns the design and tooling?", a: "Agree it in writing before development. We recommend NDAs, and contracts that state ownership of designs, moulds and tooling." },
        { q: "Can you manage samples if I'm overseas?", a: "Yes. We coordinate sample rounds, record feedback, and courier approved samples to you for sign-off." },
      ]} title="Manufacturing: FAQs" />
      <NextDivisions current={d.slug} />
      <CtaBand title="Have a product idea? Let's build it." topic="Sourcing project" />
      <JsonLd data={serviceLd({ name: "OEM, ODM and private label manufacturing coordination", description: metadata.description as string, path: d.route, serviceType: "Manufacturing coordination" })} />
    </>
  );
}
