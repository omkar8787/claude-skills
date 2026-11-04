import { ShareBar } from "@/components/social/ShareBar";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { SplitBlock } from "@/components/division/DivisionTemplate";
import { Reveal } from "@/components/ui/Reveal";
import { Plate } from "@/components/ui/Plate";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { ComplianceGrid } from "@/components/sections/DetailBlocks";
import { getIndustry } from "@/content/industries";
import type { Plate as PlateT, Tone, Motif } from "@/content/types";
import { buildMetadata, JsonLd, serviceLd, faqLd, breadcrumbLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Corporate Gifting from India | Branded Hampers & Festive Gifts",
  description: "Corporate gifts made in India: curated hampers, employee welcome kits, Diwali and year-end collections, and client gifts in brass, handloom, tea and spices. Curated, branded, assembled and shipped by NGB Ventures.",
  path: "/corporate-gifting",
});

const P = (slot: string, motif: Motif, tone: Tone, alt: string): PlateT => ({ slot, motif, tone, alt, brief: "" });
const quote = (c: string) => `/quote?type=sourcing&category=${encodeURIComponent("Corporate & festive gifting")}&product=${encodeURIComponent(c)}`;

const collections = [
  { t: "Signature hampers", b: "A hero craft piece plus tea, spices or sweets, in a rigid box with a story card about where each item comes from.", p: P("gifting-hamper", "jali", "bronze", "Signature gift hamper"), q: "Signature gift hampers" },
  { t: "Employee welcome kits", b: "Handloom tote, notebook, brass bottle or mug and a tea sampler, branded for new-joiner moments.", p: P("gifting-welcome", "weave", "indigo", "Employee welcome kit"), q: "Employee welcome kits" },
  { t: "Festive collections", b: "Diyas, décor, sweets and textiles for Diwali, Christmas, Eid, Lunar New Year and year-end thank-yous.", p: P("gifting-festive", "radial", "madder", "Festive gift collection"), q: "Festive gift collection" },
  { t: "Sustainable gifts", b: "Jute, coir, bamboo, recycled cotton and plastic-free packaging, for programmes with ESG goals.", p: P("gifting-sustainable", "botanical", "olive", "Sustainable gift set"), q: "Sustainable corporate gifts" },
];

const ideas = [
  ["Hammered brass barware", "Moradabad"], ["Block-printed table linen", "Jaipur"], ["Darjeeling or Assam tea tins", "West Bengal · Assam"], ["Spice discovery boxes", "Kerala · Gujarat"],
  ["Kannauj attar sets", "Uttar Pradesh"], ["Channapatna wooden toys & desk pieces", "Karnataka"], ["Carved wood boxes", "Saharanpur"], ["Handloom stoles & throws", "Odisha · Kashmir"],
  ["Leather folios & travel goods", "Kanpur · Chennai"], ["Silver and brass keepsakes", "Jaipur · Moradabad"], ["Millet & makhana snack boxes", "Karnataka · Bihar"], ["Blue pottery & ceramics", "Jaipur · Khurja"],
];

const occasions = [
  ["Diwali", "October–November. Plan by August for custom items."],
  ["Christmas & year-end", "December. Allow for peak courier and port congestion."],
  ["Eid & Ramadan", "Dates move each year with the lunar calendar."],
  ["Lunar New Year", "January–February. Ship early for Asian markets."],
  ["Onboarding & milestones", "Year-round. Keep a stocked kit for steady demand."],
  ["Conferences & retreats", "Fixed event dates. Build in buffer for customs."],
];

const steps = [
  ["Brief", "Audience, number of recipients, budget per gift including delivery, delivery addresses, brand guidelines and dates."],
  ["Curation", "Two or three concepts with item-level costs, lead times and any customs or food-rule flags."],
  ["Sample box", "One physical sample box for approval. Changes are made here, not after production."],
  ["Production & branding", "Items made or sourced, with engraving, printing, packaging and story cards."],
  ["Assembly & checks", "Boxes packed and inspected, with photos shared before dispatch."],
  ["Dispatch", "Bulk export to your warehouse or fulfilment partner, or multi-address courier delivery where practical."],
];

const faqs = [
  { q: "What's the minimum order for corporate gifts?", a: "Curated hampers from ready items can work from modest quantities. Custom-made or custom-branded items usually have higher minimums because of tooling and printing set-up. Share your numbers and we'll tell you what's practical." },
  { q: "Can we see a sample before ordering?", a: "Yes. Every programme starts with an approved sample box. The cost of samples and courier depends on the items and is quoted upfront." },
  { q: "Can you add our logo?", a: "Yes, through engraving, embossing, printing, embroidery or woven labels, depending on the material. Packaging and story cards can be fully branded." },
  { q: "Do you ship gifts directly to employees' homes abroad?", a: "We can plan multi-address delivery where customs rules allow. Consolidating to a local fulfilment partner is often cheaper and more reliable, and we'll compare both." },
  { q: "Are you a gifting company with ready stock?", a: "No. We curate and source to your brief from Indian makers and producers, so there is no catalogue of stock. That's what lets the programme feel specific to your brand." },
];

export default function CorporateGifting() {
  const ind = getIndustry("gifting")!;
  return (
    <>
      <PageHero
        plate={P("gifting-hero", "jali", "bronze", "Corporate gift box from India")}
        crumbs={[{ name: "Capabilities", href: "/capabilities" }, { name: "Corporate Gifting", href: "/corporate-gifting" }]}
        eyebrow="Corporate & premium gifting"
        title="Gifts people keep,"
        italic="made in India."
        lede="Curated hampers, welcome kits and festive collections, built from Indian craft, tea, spices and textiles. Branded for you, assembled with care and dispatched worldwide."
        ctas={[{ label: "Plan a gift programme", href: quote("Corporate gift programme") }, { label: "See collections", href: "#collections", variant: "ghost" }]}
        meta={[{ k: "For", v: "HR, marketing, sales and events teams" }, { k: "Formats", v: "Hampers · kits · festive · VIP" }, { k: "Branding", v: "Engraving · print · packaging" }, { k: "Dispatch", v: "Bulk or multi-address" }]}
      />

      <section id="collections" className="container-x scroll-mt-24 py-24 lg:py-32">
        <div className="max-w-3xl"><p className="eyebrow mb-6">Collections</p><h2 className="display text-[clamp(2.2rem,4.4vw,4rem)]">Four ways <em>to give.</em></h2><p className="lede mt-6">Every collection is curated to your budget and audience. These are starting points, not a fixed catalogue.</p></div>
        <ul className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((c, i) => (
            <Reveal as="li" key={c.t} delay={i * 0.05}>
              <Link href={quote(c.q)} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden"><div className="absolute inset-0 transition-transform duration-[1.4s] group-hover:scale-105"><Plate plate={c.p} className="h-full w-full" sizes="25vw" /></div></div>
                <h3 className="mt-5 font-display text-3xl"><span className="link-u">{c.t}</span></h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-stone-ink">{c.b}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold">Request this <ArrowUpRight className="h-4 w-4" /></span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      <SplitBlock dark eyebrow="What goes in the box" title={<>Gift ideas from <em>across India.</em></>}>
        <dl className="grid gap-x-8 sm:grid-cols-2">
          {ideas.map(([k, v]) => <div key={k} className="flex items-baseline justify-between gap-4 border-b border-ivory/10 py-4"><dt className="font-display text-xl">{k}</dt><dd className="ledger shrink-0 text-right text-[0.6rem] text-ivory/75">{v}</dd></div>)}
        </dl>
        <p className="mt-6 text-sm text-ivory/75">These are product directions from known craft and food regions, not existing supplier relationships. Availability and minimums are confirmed for each brief.</p>
      </SplitBlock>

      <section id="occasions" className="scroll-mt-24 bg-paper py-24 lg:py-32">
        <div className="container-x">
          <p className="eyebrow mb-6">Occasions & planning</p><h2 className="display max-w-3xl text-[clamp(2.2rem,4.4vw,4rem)]">Plan around <em>the calendar.</em></h2>
          <ul className="mt-14 grid gap-px overflow-hidden bg-line sm:grid-cols-2 lg:grid-cols-3">
            {occasions.map(([k, v]) => <li key={k} className="bg-paper p-7"><p className="font-display text-3xl">{k}</p><p className="mt-3 leading-relaxed text-stone-ink">{v}</p></li>)}
          </ul>
          <p className="mt-6 max-w-2xl text-sm text-stone-ink">Planning guide: allow roughly 8–12 weeks for custom-made or branded items, and more for large volumes or sea freight. We confirm the timeline for each programme.</p>
        </div>
      </section>

      <section className="container-x py-24 lg:py-32">
        <p className="eyebrow mb-6">How it works</p><h2 className="display max-w-3xl text-[clamp(2.2rem,4.4vw,4rem)]">From brief <em>to doorstep.</em></h2>
        <ol className="mt-14 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {steps.map(([t, b], i) => <li key={t} className="border-t border-charcoal pt-5"><span className="ledger text-bronze-ink">{String(i + 1).padStart(2, "0")}</span><p className="mt-3 font-display text-3xl">{t}</p><p className="mt-2 leading-relaxed text-stone-ink">{b}</p></li>)}
        </ol>
        <div className="mt-14 flex flex-wrap gap-3"><Link href={quote("Corporate gift programme")} className="btn btn-primary">Start a gifting brief <ArrowRight className="arrow h-4 w-4" /></Link><Link href="/industries/gifting" className="btn btn-ghost">Gifting industry guide</Link><Link href="/insights/corporate-gifting-from-india" className="btn btn-ghost">Read: planning a gift programme</Link></div>
      </section>

      <div className="container-x pb-16"><ShareBar title="Corporate gifting from India: NGB Ventures" /></div>
      <ComplianceGrid items={ind.compliance} title="Before you ship gifts abroad" />
      <Faq faqs={faqs} title="Corporate gifting: FAQs" />
      <CtaBand title="Planning gifts for this season? Let's curate them in India." lede="Tell us the occasion, the number of recipients and your budget per gift. We'll come back with concepts, costs and a realistic timeline." />
      <JsonLd data={[serviceLd({ name: "Corporate gifting from India", description: metadata.description as string, path: "/corporate-gifting", serviceType: "Corporate gift sourcing and fulfilment" }), faqLd(faqs), breadcrumbLd([{ name: "Home", href: "/" }, { name: "Corporate Gifting", href: "/corporate-gifting" }])]} />
    </>
  );
}
