import Link from "next/link";
import { getDivision } from "@/content/divisions";
import { DivisionHero, DeliveredCoordinated, NextDivisions } from "@/components/division/DivisionTemplate";
import { BrandStudio } from "@/components/home/BrandStudio";
import { Plate } from "@/components/ui/Plate";
import { Reveal } from "@/components/ui/Reveal";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { buildMetadata, JsonLd, serviceLd } from "@/lib/seo";

const d = getDivision("brand-development")!;
export const metadata = buildMetadata({ title: "Brand Development & Amazon Brand Launch Services", description: "Brand strategy, naming, identity, packaging, product photography, Amazon launch, PPC, Meta and Google ads, Shopify/D2C and international brand growth for products made in India.", path: d.route });

const groups = [
  ["A", "Brand strategy", ["Brand positioning", "Brand naming", "Logo and identity", "Packaging", "Product differentiation", "Market research"]],
  ["B", "Product launch", ["Launch strategy", "Product photography", "Video production", "Creative development", "Influencer partnerships", "PR and product seeding"]],
  ["C", "Marketplace", ["Amazon account and launch strategy", "Listing optimisation", "Amazon PPC", "Brand Registry guidance", "A+ content strategy", "Sponsored advertising"]],
  ["D", "Performance marketing", ["Meta Ads", "Google Ads", "Retargeting", "Campaign optimisation", "ROAS analysis", "CAC and CRO"]],
  ["E", "D2C & expansion", ["Shopify development", "E-commerce websites", "Landing pages", "Email marketing", "Market-entry strategy", "Brand growth consulting"]],
] as const;

const concepts = [
  { name: "Ember & Loom", cat: "Brassware, home", tone: "bronze" as const, glyph: "spot-brass-barware", line: "Hand-hammered barware positioned for premium gifting in the US." },
  { name: "Kora Field", cat: "Natural bath", tone: "olive" as const, glyph: "spot-loofah", line: "Plastic-free bath essentials built around natural loofah and coir." },
  { name: "Inkwell & Co.", cat: "Kids' publishing", tone: "sand" as const, glyph: "spot-activity-books", line: "A private-label activity-book line for a European retailer." },
];

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
        <div className="mt-24"><p className="eyebrow mb-6">Concept portfolio</p><h3 className="display text-[clamp(2rem,3.6vw,3.2rem)]">Studio concepts</h3>
          <p className="mt-3 max-w-2xl text-sm text-stone-ink">These are fictional brands created to show our thinking. They aren&apos;t client work, and no results are implied. We publish real case studies only with client permission.</p>
          <ul className="mt-10 grid gap-8 md:grid-cols-3">
            {concepts.map((c) => (
              <li key={c.name}><div className="relative aspect-[4/5] overflow-hidden"><Plate plate={{ slot: c.glyph, motif: "jali", tone: c.tone, alt: `${c.name} concept`, brief: "" }} className="h-full w-full" sizes="33vw" /><span className="ledger absolute left-3 top-3 rounded-full bg-ivory/90 px-2.5 py-1 text-[0.6rem] text-charcoal">Concept</span></div>
                <p className="ledger mt-4 text-bronze-ink">{c.cat}</p><p className="mt-1 font-display text-3xl">{c.name}</p><p className="mt-2 text-sm leading-relaxed text-stone-ink">{c.line}</p></li>
            ))}
          </ul>
        </div>
      </section>
      <DeliveredCoordinated d={d} />
      <Faq faqs={[
        { q: "Do you only work with products sourced through NGB?", a: "No. We can build and advertise brands for products made anywhere, but we're strongest where we also know the supply chain." },
        { q: "Can you guarantee sales or ROAS?", a: "No. Nobody honest can. We set targets, test, measure and report transparently on ROAS, CAC and conversion rate." },
        { q: "Do you manage ad spend?", a: "We manage campaigns in your ad accounts. Media spend is paid by you directly to the platforms, and our fees are agreed separately." },
      ]} title="Brand development: FAQs" />
      <NextDivisions current={d.slug} />
      <CtaBand title="Ready to build a brand that sells? Let's talk." topic="Sourcing project" />
      <JsonLd data={serviceLd({ name: "Brand development and Amazon brand launch", description: metadata.description as string, path: d.route, serviceType: "Brand development" })} />
      <div className="sr-only"><Link href="/advertising">Advertising & marketing</Link></div>
    </>
  );
}
