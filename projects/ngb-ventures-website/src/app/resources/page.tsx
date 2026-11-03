import Link from "next/link";
import { ArrowUpRight, Boxes, Calculator, ListChecks, PencilRuler } from "lucide-react";
import { guides } from "@/content/guides";
import { PageHero } from "@/components/sections/PageHero";
import { Plate } from "@/components/ui/Plate";
import { CtaBand } from "@/components/sections/CtaBand";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Resources | Sourcing Tools & Guides for Importing from India", description: "Free sourcing tools and guides: landed-cost estimator, CBM and container calculator, supplier evaluation checklist, and guides to sourcing from India and Incoterms.", path: "/resources" });

const tools = [
  { href: "/tools/landed-cost-calculator", title: "Landed-cost estimator", body: "Model product cost, freight, insurance, duty and import taxes with a transparent valuation basis.", Icon: Calculator },
  { href: "/tools/cbm-calculator", title: "CBM & container calculator", body: "Calculate cubic metres, chargeable weight and container fit for mixed cartons.", Icon: Boxes },
  { href: "/tools/supplier-evaluation-checklist", title: "Supplier evaluation checklist", body: "Score a supplier across seven areas, from business verification to sample evaluation.", Icon: ListChecks },
  { href: "/product-development", title: "Product development request", body: "Describe a product you want manufactured, from first idea to tech pack.", Icon: PencilRuler },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHero plate={{ slot: "page-resources", motif: "blueprint", tone: "stone", alt: "Sourcing tools and documents", brief: "Calculator, tape measure and documents" }} crumbs={[{ name: "Resources", href: "/resources" }]} eyebrow="Tools & guides" title="Resources" italic="for buyers." lede="Practical, free tools and guides for planning a sourcing project in India. No sign-up required." ctas={[{ label: "Open landed-cost estimator", href: "/tools/landed-cost-calculator" }]} />
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
        <p className="eyebrow mb-6">Guides</p><h2 className="display mb-14 text-[clamp(2.2rem,4.4vw,4rem)]">Sourcing <em>knowledge</em></h2>
        <ul className="grid gap-10 md:grid-cols-2">
          {guides.map((g) => (
            <li key={g.slug}><Link href={`/resources/${g.slug}`} className="group block"><div className="relative aspect-[16/9] overflow-hidden"><div className="absolute inset-0 transition-transform duration-[1.4s] group-hover:scale-105"><Plate plate={g.plate} className="h-full w-full" sizes="50vw" /></div></div><p className="ledger mt-5 text-bronze-ink">{g.readTime} · Updated {g.updated}</p><h3 className="mt-2 font-display text-3xl leading-tight"><span className="link-u">{g.title}</span></h3><p className="mt-3 leading-relaxed text-stone-ink">{g.description}</p></Link></li>
          ))}
        </ul>
      </div></section>
      <CtaBand />
    </>
  );
}
