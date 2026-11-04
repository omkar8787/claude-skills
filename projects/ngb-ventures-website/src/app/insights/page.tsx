import Link from "next/link";
import { ExportQuiz } from "@/components/fun/ExportQuiz";
import { facts } from "@/content/facts";
import { ArrowUpRight, Boxes, Calculator, ListChecks, Globe2 } from "lucide-react";
import { guides } from "@/content/guides";
import { PageHero } from "@/components/sections/PageHero";
import { Plate } from "@/components/ui/Plate";
import { CtaBand } from "@/components/sections/CtaBand";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Insights: Stories, Buyer Guides & Tools for Sourcing from India", description: "Stories from India's craft and food regions, buyer guides on spices, millets, superfoods, tea, gifting and private label, plus free sourcing tools for international buyers.", path: "/insights" });

const tools = [
  { href: "/tools/landed-cost-calculator", title: "Landed-cost estimator", body: "Model product cost, freight, insurance, duty and import taxes with a transparent valuation basis.", Icon: Calculator },
  { href: "/tools/cbm-calculator", title: "CBM & container calculator", body: "Calculate cubic metres, chargeable weight and container fit for mixed cartons.", Icon: Boxes },
  { href: "/tools/supplier-evaluation-checklist", title: "Supplier evaluation checklist", body: "Score a supplier across seven areas, from business verification to sample evaluation.", Icon: ListChecks },
  { href: "/tools/market-readiness", title: "Global market readiness check", body: "The compliance, labelling and documentation questions to resolve for your product and destination.", Icon: Globe2 },
];

export default function InsightsPage() {
  return (
    <>
      <PageHero plate={{ slot: "page-insights", motif: "blueprint", tone: "stone", alt: "Insights and research", brief: "" }} crumbs={[{ name: "Insights & Research", href: "/insights" }]} eyebrow="Insights & research" title="Know more" italic="before you buy." lede="Research, guides and free tools for international buyers working with Indian manufacturers. No sign-up required." ctas={[{ label: "Market readiness check", href: "/tools/market-readiness" }, { label: "Origin Collection research", href: "/origin#method", variant: "ghost" }]} />
      <section className="container-x py-24 lg:py-32">
        <p className="eyebrow mb-6">Interactive tools</p>
        <h2 className="display mb-14 text-[clamp(2.2rem,4.4vw,4rem)]">Procurement <em>tools</em></h2>
        <ul className="grid gap-px overflow-hidden bg-line md:grid-cols-2">
          {tools.map(({ href, title, body, Icon }) => (
            <li key={href} className="bg-ivory"><Link href={href} className="group flex h-full gap-6 p-8 transition-colors duration-500 hover:bg-charcoal hover:text-ivory lg:p-12"><Icon className="h-7 w-7 shrink-0 text-bronze-ink group-hover:text-bronze-soft" strokeWidth={1.25} /><div className="flex-1"><h3 className="font-display text-3xl">{title}</h3><p className="mt-3 leading-relaxed text-stone-ink group-hover:text-ivory/65">{body}</p></div><ArrowUpRight className="h-5 w-5 shrink-0" /></Link></li>
          ))}
        </ul>
      </section>
      <section className="border-t border-line bg-paper py-24 lg:py-32"><div className="container-x">
        <p className="eyebrow mb-6">Stories from India</p><h2 className="display mb-14 text-[clamp(2.2rem,4.4vw,4rem)]">The places <em>behind the products</em></h2>
        <ul className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {guides.filter((g) => g.kind === "story").map((g) => (
            <li key={g.slug}><Link href={`/insights/${g.slug}`} className="group block"><div className="shine relative aspect-[16/9] overflow-hidden"><div className="absolute inset-0 transition-transform duration-[1.4s] group-hover:scale-105"><Plate plate={g.plate} className="h-full w-full" sizes="50vw" /></div></div><p className="ledger mt-5 text-bronze-ink">{g.category} · {g.readTime}</p><h3 className="mt-2 font-display text-3xl leading-tight"><span className="link-u">{g.title}</span></h3><p className="mt-3 leading-relaxed text-stone-ink">{g.description}</p></Link></li>
          ))}
        </ul>
      </div></section>
      <section className="py-24 lg:py-32"><div className="container-x">
        <p className="eyebrow mb-6">Buyer guides</p><h2 className="display mb-14 text-[clamp(2.2rem,4.4vw,4rem)]">Sourcing <em>knowledge</em></h2>
        <ul className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {guides.filter((g) => g.kind !== "story").map((g) => (
            <li key={g.slug}><Link href={`/insights/${g.slug}`} className="group block"><div className="shine relative aspect-[16/9] overflow-hidden"><div className="absolute inset-0 transition-transform duration-[1.4s] group-hover:scale-105"><Plate plate={g.plate} className="h-full w-full" sizes="50vw" /></div></div><p className="ledger mt-5 text-bronze-ink">{g.category} · {g.readTime}</p><h3 className="mt-2 font-display text-3xl leading-tight"><span className="link-u">{g.title}</span></h3><p className="mt-3 leading-relaxed text-stone-ink">{g.description}</p></Link></li>
          ))}
        </ul>
      </div></section>
      <section className="on-dark tone-light bg-charcoal py-24 text-ivory lg:py-28" aria-labelledby="quiz-h">
        <div className="container-x"><div className="mb-12 text-center"><p className="eyebrow mb-6 justify-center">Export IQ</p><h2 id="quiz-h" className="display text-[clamp(2.2rem,4.4vw,3.6rem)]">Test your <em>India trade trivia.</em></h2></div><ExportQuiz facts={facts} /></div>
      </section>
      <CtaBand />
    </>
  );
}
