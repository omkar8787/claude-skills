import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { divisions } from "@/content/divisions";
import { PageHero } from "@/components/sections/PageHero";
import { Plate } from "@/components/ui/Plate";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { buildMetadata, JsonLd, itemListLd } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Capabilities | India Sourcing, Manufacturing, Export & Brand Development", description: "Five NGB Ventures divisions: India sourcing, manufacturing & private label, global export solutions, brand development & advertising, and inclusive procurement.", path: "/capabilities" });

export default function Capabilities() {
  return (
    <>
      <PageHero plate={{ slot: "page-capabilities", motif: "jali", tone: "bronze", alt: "Capabilities", brief: "" }} crumbs={[{ name: "Capabilities", href: "/capabilities" }]} eyebrow="Our capabilities" title="Your global sourcing desk" italic="in India." lede="Five divisions that work alone or together, so you can go from an idea to a product in your customers' hands." ctas={[{ label: "Source a product", href: "/quote" }]} />
      <section className="container-x py-24 lg:py-32">
        <ul className="space-y-24">
          {divisions.map((d, i) => (
            <Reveal as="li" key={d.slug} className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <Link href={d.route} className={`group relative block aspect-[4/3] overflow-hidden lg:col-span-6 ${i % 2 ? "lg:order-2" : ""}`}><div className="absolute inset-0 transition-transform duration-[1.4s] group-hover:scale-105"><Plate plate={{ slot: `div-${d.slug}`, motif: "jali", tone: d.tone, alt: d.name, brief: "" }} className="h-full w-full" sizes="50vw" /></div></Link>
              <div className={`lg:col-span-5 ${i % 2 ? "lg:order-1" : "lg:col-start-8"}`}>
                <p className="ledger text-bronze-ink">Division {d.index} · {d.kicker}</p>
                <h2 className="display mt-4 text-[clamp(2.4rem,4.4vw,4rem)]">{d.name}</h2>
                <p className="mt-3 font-display text-2xl italic text-bronze-ink">{d.headline}</p>
                <p className="mt-5 leading-relaxed text-stone-ink">{d.lede}</p>
                <ul className="mt-6 grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">{d.delivered.slice(0, 6).map((x) => <li key={x} className="border-b border-line py-1.5">{x}</li>)}</ul>
                <div className="mt-8 flex flex-wrap gap-3"><Link href={d.route} className="btn btn-primary">Explore {d.name} <ArrowUpRight className="h-4 w-4" /></Link><Link href={d.cta.href} className="btn btn-ghost">{d.cta.label}</Link></div>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>
      <CtaBand />
      <JsonLd data={itemListLd("NGB Ventures capabilities", divisions.map((d) => ({ name: d.name, href: d.route })))} />
    </>
  );
}
