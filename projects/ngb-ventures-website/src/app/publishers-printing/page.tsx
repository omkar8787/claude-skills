import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { SplitBlock } from "@/components/division/DivisionTemplate";
import { Reveal } from "@/components/ui/Reveal";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { buildMetadata, JsonLd, serviceLd } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Book Printing & Publishing Partners in India | Private Label Books", description: "Source book printing, children's and activity books, sticker books, stationery and printed packaging from India's print clusters (Delhi NCR, Noida, Mumbai, Pune, Sivakasi) with clear partner classification.", path: "/publishers-printing" });

const types = [
  ["Publishers", "Own and license content: children's, educational, activity and trade titles. They may print in-house or outsource."],
  ["Printers", "Manufacture books, stationery and print to your files: offset or digital, sewn or perfect binding, special finishes."],
  ["Packaging printers", "Folding cartons, rigid boxes, labels and inserts, often combined with product packing."],
  ["Distributors & traders", "Resell finished titles or stationery. Useful for catalogues, but not for custom manufacturing."],
];
const clusters = [
  ["Delhi NCR & Noida", "Large commercial and book printers; children's and educational publishing."],
  ["Mumbai", "Publishing houses, premium print and packaging."],
  ["Pune", "Commercial printing and packaging for western India's industrial base."],
  ["Sivakasi", "One of India's largest printing hubs: books, diaries, calendars, labels and cartons, with significant export activity reported in trade press."],
];

export default function Publishers() {
  return (
    <>
      <PageHero plate={{ slot: "page-publishers", motif: "fold", tone: "sand", alt: "Publishing and printing", brief: "" }} crumbs={[{ name: "Capabilities", href: "/capabilities" }, { name: "Publishers & Printing", href: "/publishers-printing" }]} eyebrow="Publishers & printing" title="Books, print" italic="and paper, made in India." lede="Custom and private-label books, activity and sticker books, stationery and printed packaging, sourced from India's print clusters." ctas={[{ label: "Request print quotes", href: "/quote?type=sourcing&category=Packaging%2C%20printing%20%26%20publishing" }, { label: "I'm a publisher or printer", href: "/quote?type=publisher", variant: "ghost" }]} />
      <section className="container-x py-24 lg:py-32">
        <div className="max-w-3xl"><p className="eyebrow mb-6">Know who you&apos;re dealing with</p><h2 className="display text-[clamp(2.2rem,4.4vw,4rem)]">Publisher, printer <em>or trader?</em></h2><p className="lede mt-6">We classify every partner, because a publisher isn&apos;t necessarily a manufacturer, and a trader isn&apos;t a printer.</p></div>
        <div className="mt-14 grid gap-px overflow-hidden bg-line sm:grid-cols-2 lg:grid-cols-4">{types.map(([t, b], i) => <Reveal key={t} delay={i * 0.05} className="bg-ivory p-7"><p className="font-display text-3xl">{t}</p><p className="mt-3 leading-relaxed text-stone-ink">{b}</p></Reveal>)}</div>
      </section>
      <SplitBlock dark eyebrow="Print clusters" title={<>Where India <em>prints.</em></>}>
        <dl className="divide-y divide-ivory/10 border-y border-ivory/10">{clusters.map(([k, v]) => <div key={k} className="grid gap-2 py-5 sm:grid-cols-[12rem_1fr]"><dt className="font-display text-2xl text-bronze-soft">{k}</dt><dd className="leading-relaxed text-ivory/75">{v}</dd></div>)}</dl>
        <p className="mt-6 text-sm text-ivory/75">Cluster descriptions are general research. We don&apos;t publish supplier names until they&apos;re verified and have agreed to be listed.</p>
      </SplitBlock>
      <SplitBlock eyebrow="What we can coordinate" title={<>From file <em>to finished carton.</em></>}>
        <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">{["Children's, activity and colouring books", "Sticker books and sticker sheets", "Custom and private-label publishing production", "Journals, notebooks and diaries", "Educational print and flash cards", "Printed packaging, labels and inserts", "Pre-press checks and proofs", "Paper, board and finish specification", "Safety testing for children's products (e.g. EN 71-3 for inks where relevant)", "Export packing and documentation"].map((x) => <li key={x} className="border-b border-line py-2.5">{x}</li>)}</ul>
        <div className="mt-8"><Link href="/industries/stationery-paper" className="btn btn-ghost">Stationery & paper products</Link></div>
      </SplitBlock>
      <Faq faqs={[
        { q: "Can you print my own book or activity-book series?", a: "Yes. Send your files or a brief: page count, trim size, paper, binding, finishes and quantity. We'll coordinate quotes from suitable printers." },
        { q: "What MOQs apply to offset book printing?", a: "Offset printing has set-up costs, so unit prices fall as quantities rise. Digital printing suits short runs. We'll compare both for your quantities." },
        { q: "Are you a publisher?", a: "No. We coordinate sourcing and production with independent publishers and printers. Rights and licensing stay with the content owner." },
      ]} title="Publishing & printing: FAQs" />
      <CtaBand title="Printing books or packaging? Let's get you quotes." />
      <JsonLd data={serviceLd({ name: "Book printing and publishing production sourcing", description: metadata.description as string, path: "/publishers-printing", serviceType: "Print sourcing" })} />
    </>
  );
}
