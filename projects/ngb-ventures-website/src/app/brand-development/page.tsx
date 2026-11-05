import { Confidentiality, confidentialityFaqs } from "@/components/sections/Confidentiality";
import Link from "next/link";
import { getDivision } from "@/content/divisions";
import { DivisionHero, DeliveredCoordinated, NextDivisions } from "@/components/division/DivisionTemplate";
import { BrandStudio } from "@/components/home/BrandStudio";
import { Reveal } from "@/components/ui/Reveal";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { buildMetadata, JsonLd, serviceLd } from "@/lib/seo";

const d = getDivision("brand-development")!;
export const metadata = buildMetadata({ title: "Brand Development & Amazon Brand Launch Services", description: "Brand strategy, naming, identity, packaging, product photography, Amazon launch, PPC, Meta and Google ads, Shopify/D2C and international brand growth for products made in India.", path: d.route });

const groups = [
  ["A", "Brand strategy", ["Brand positioning", "Brand naming", "Logo and identity", "Packaging", "Product differentiation", "Market research"]],
  ["B", "Product launch", ["Launch strategy", "Product photography", "Video production", "Creative development", "Creator partnerships", "PR and product seeding"]],
  ["C", "Marketplace", ["Amazon account and launch strategy", "Listing optimisation", "Amazon PPC", "Brand Registry guidance", "A+ content strategy", "Sponsored advertising"]],
  ["D", "Performance marketing", ["Meta Ads", "Google Ads", "Retargeting", "Campaign optimisation", "Return on ad spend analysis", "Acquisition cost and conversion"]],
  ["E", "D2C & expansion", ["Shopify development", "E-commerce websites", "Landing pages", "Email marketing", "Market-entry strategy", "Brand growth consulting"]],
] as const;


export default function BrandDev() {
  return (
    <>
      <DivisionHero d={d} />
      <section className="container-x py-24 lg:py-32">
        <div className="max-w-3xl"><p className="eyebrow mb-6">What we do</p><h2 className="display text-[clamp(2.2rem,4.4vw,4rem)]">From positioning to <em>performance.</em></h2></div>
        <div className="mt-14 grid gap-px overflow-hidden bg-line sm:grid-cols-2 lg:grid-cols-5">
          {groups.map(([k, t, items], i) => (
            <Reveal key={k} delay={i * 0.05} className="bg-ivory p-7"><span className="ledger text-bronze-ink">{k}</span><p className="mt-6 font-display text-[1.7rem] leading-tight">{t}</p><ul className="mt-4 space-y-1.5 text-sm text-stone-ink">{items.map((x) => <li key={x}>{x}</li>)}</ul></Reveal>
          ))}
        </div>
      </section>
      <section className="border-t border-line bg-paper py-24 lg:py-28" aria-label="Positioning, identity and packaging">
        <div className="container-x grid gap-px overflow-hidden bg-line lg:grid-cols-3">
          {[
            ["positioning", "Product positioning", "Who the product is for, why it is different and how it is priced. We define the customer, the promise and the proof before any design work begins.", ["Customer and competitor research", "Value proposition and proof points", "Price positioning", "Naming"]],
            ["identity", "Brand identity", "A name, mark and visual language that customers recognise and remember, applied consistently across products, packaging and listings.", ["Logo and wordmark", "Colour and typography", "Brand guidelines", "Photography direction"]],
            ["packaging", "Packaging", "Packaging designed for its channel: unboxing for D2C, shelf impact for retail and clear first images for marketplaces, specified for production in India.", ["Structural and graphic design", "Labels and swing tags", "Barcodes and compliance marks", "Printer-ready artwork"]],
          ].map(([id, t, b, items]) => (
            <div key={id as string} id={id as string} className="scroll-mt-24 bg-paper p-8 lg:p-10">
              <h2 className="font-display text-[2rem] leading-tight">{t}</h2>
              <p className="mt-4 leading-relaxed text-stone-ink">{b}</p>
              <ul className="mt-6 space-y-1.5 text-sm">{(items as string[]).map((x) => <li key={x} className="flex gap-2"><span className="mt-2 h-px w-3 shrink-0 bg-bronze" />{x}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>
      <section className="on-dark bg-forest py-24 text-ivory lg:py-32">
        <div className="container-x">
          <p className="eyebrow mb-6">From factory floor to global customer</p>
          <h2 className="display text-[clamp(2.2rem,4.4vw,4rem)]">One continuous <em>journey.</em></h2>
          <ol className="mt-14 grid gap-px overflow-hidden bg-ivory/10 sm:grid-cols-4 lg:grid-cols-7">
            {["Product idea", "Manufacturing", "Brand identity", "Packaging", "Advertising", "Marketplace", "Global customer"].map((s, i) => <li key={s} className="bg-forest p-5"><span className="ledger text-bronze-soft">{String(i + 1).padStart(2, "0")}</span><p className="mt-6 font-display text-xl">{s}</p></li>)}
          </ol>
        </div>
      </section>
      <section className="container-x py-24 lg:py-32">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end"><div className="lg:col-span-7"><p className="eyebrow mb-6">Brand Launch Studio</p><h2 className="display text-[clamp(2rem,3.6vw,3.2rem)]">Same product. <em>Different value.</em></h2></div><p className="leading-relaxed text-stone-ink lg:col-span-4 lg:col-start-9">Four stages take a generic factory sample to a positioned, packaged, listing-ready brand. Tap a stage to explore.</p></div>
        <div className="mt-10"><BrandStudio /></div>
      </section>
      <Confidentiality />
      <DeliveredCoordinated d={d} />
      <Faq faqs={[
        ...confidentialityFaqs,
        { q: "Do you only work with products sourced through NGB?", a: "No. We can build and advertise brands for products made anywhere, but we're strongest where we also know the supply chain." },
        { q: "Can you guarantee sales or ROAS?", a: "No. Nobody honest can. We set targets, test, measure and report transparently on ROAS, CAC and conversion rate." },
        { q: "Do you manage ad spend?", a: "We manage campaigns in your ad accounts. Media spend is paid by you directly to the platforms, and our fees are agreed separately." },
      ]} title="Frequently asked questions" />
      <NextDivisions current={d.slug} />
      <CtaBand title="Ready to build your brand? Discuss your launch." topic="Sourcing project" />
      <JsonLd data={serviceLd({ name: "Brand development and Amazon brand launch", description: metadata.description as string, path: d.route, serviceType: "Brand development" })} />
      <div className="sr-only"><Link href="/advertising">Advertising & marketing</Link></div>
    </>
  );
}
