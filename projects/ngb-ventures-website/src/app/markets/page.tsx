import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { markets } from "@/content/markets";
import { PageHero } from "@/components/sections/PageHero";
import { WorldMarkets } from "@/components/maps/WorldMarkets";
import { CtaBand } from "@/components/sections/CtaBand";
import { buildMetadata, JsonLd, itemListLd } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Global Markets | Sourcing from India for USA, UK, EU, Australia", description: "Market guides for importers in the United States, United Kingdom, Germany, France, Netherlands, Australia, Canada and UAE sourcing from India: regulations, trade agreements and official tariff tools.", path: "/markets" });

export default function MarketsPage() {
  return (
    <>
      <PageHero plate={{ slot: "page-markets", motif: "route", tone: "indigo", alt: "Container ship departing an Indian port", brief: "Container ship departing JNPT at dusk" }} crumbs={[{ name: "Markets", href: "/markets" }]} eyebrow={`${markets.length} market guides`} title="Global" italic="markets." lede="How NGB Ventures supports international buyers sourcing from India, market by market. We operate from Pune and work with buyers remotely. We have no overseas offices." ctas={[{ label: "Start a sourcing brief", href: "/quote" }]} />
      <section className="on-dark bg-charcoal py-24 text-ivory lg:py-32"><div className="container-x"><WorldMarkets /></div></section>
      <section className="container-x py-24 lg:py-32">
        <ul className="grid gap-px overflow-hidden bg-line sm:grid-cols-2 lg:grid-cols-4">
          {markets.map((m) => (
            <li key={m.slug} className="bg-ivory"><Link href={`/markets/${m.slug}`} className="group flex h-full flex-col justify-between p-8 transition-colors duration-500 hover:bg-charcoal hover:text-ivory"><div><p className="ledger text-bronze-ink group-hover:text-bronze-soft">{m.code} · {m.region}</p><h2 className="mt-8 font-display text-3xl">{m.name}</h2><p className="mt-3 text-sm leading-relaxed text-stone-ink group-hover:text-ivory/65">{m.heroLine}</p></div><ArrowUpRight className="mt-10 h-5 w-5" /></Link></li>
          ))}
        </ul>
      </section>
      <CtaBand />
      <JsonLd data={itemListLd("Market guides", markets.map((m) => ({ name: m.name, href: `/markets/${m.slug}` })))} />
    </>
  );
}
