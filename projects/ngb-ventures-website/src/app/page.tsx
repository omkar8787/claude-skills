import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Plate } from "@/components/ui/Plate";
import { Reveal } from "@/components/ui/Reveal";
import { MaskLines } from "@/components/ui/MaskLines";
import { SectionHead } from "@/components/ui/Section";
import { HeroParallax, PlateCycle } from "@/components/sections/HeroMotion";
import { IndustryGrid } from "@/components/sections/IndustryGrid";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { ServicesLedger } from "@/components/sections/ServicesLedger";
import { CtaBand } from "@/components/sections/CtaBand";
import { LedgerTicker } from "@/components/sections/LedgerTicker";
import { ClusterMap } from "@/components/maps/ClusterMap";
import { WorldMarkets } from "@/components/maps/WorldMarkets";
import { industries } from "@/content/industries";
import { services } from "@/content/services";
import { clusters } from "@/content/clusters";
import { markets } from "@/content/markets";
import { audiences, processSteps, whyIndia } from "@/content/home";
import { site } from "@/content/site";
import { buildMetadata, JsonLd, itemListLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "NGB Ventures | Sourcing Agent & Manufacturing Partner in India",
  description: "NGB Ventures connects international importers, brands and Amazon sellers with Indian manufacturers: supplier identification, private label, product development, quality inspection and export coordination from Pune.",
  path: "/",
});

const heroPlates = [
  { plate: industries[0].plate, cap: "Knitwear · Tirupur" },
  { plate: clusters.find((c) => c.slug === "moradabad")!.plate, cap: "Brassware · Moradabad" },
  { plate: clusters.find((c) => c.slug === "jaipur")!.plate, cap: "Block print · Jaipur" },
  { plate: industries.find((i) => i.slug === "engineering-industrial")!.plate, cap: "Precision engineering · Pune" },
];

export default function Home() {
  return (
    <>
      {/* ─────────── 1 · HERO ─────────── */}
      <section className="on-dark relative isolate min-h-[100svh] overflow-hidden bg-charcoal text-ivory" aria-labelledby="hero-h">
        <HeroParallax>
          <div className="absolute inset-0 motion-safe:animate-[drift_40s_ease-in-out_infinite_alternate]"><Plate plate={{ slot: "home-hero", motif: "jali", tone: "charcoal", alt: "Indian manufacturing floor at dawn", brief: "Wide cinematic shot of a textile or craft production floor at dawn; long light shafts; people at work; charcoal and bronze grade." }} className="h-full w-full" priority intensity="quiet" /></div>
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/30 to-charcoal" />
        </HeroParallax>

        <div className="container-x grid min-h-[100svh] items-end gap-10 pb-10 pt-32 lg:grid-cols-12 lg:pb-14">
          <div className="lg:col-span-8 lg:pb-16">
            <p className="eyebrow mb-8">Sourcing & manufacturing partner · Pune, India</p>
            <h1 id="hero-h" className="display text-[clamp(2.9rem,5.9vw,6.6rem)]">
              <MaskLines lines={["India’s Manufacturing", "Potential.", <em key="e">Your Global Business</em>, <em key="f">Advantage.</em>]} delay={0.15} />
            </h1>
            <div className="fade-up" style={{ ["--d" as string]: "0.45s" }}>
              <p className="lede mt-10 max-w-xl">We connect international businesses with Indian manufacturing capabilities through strategic sourcing, product development, quality assurance and export coordination.</p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link href="/services" className="btn btn-bronze">Explore Our Capabilities <ArrowRight className="arrow h-4 w-4" /></Link>
                <Link href="/enquire" className="btn btn-ghost">Discuss Your Project</Link>
              </div>
            </div>
          </div>
          <Reveal delay={0.4} className="hidden lg:col-span-4 lg:col-start-9 lg:block lg:pb-16">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <PlateCycle captions={heroPlates.map((p) => p.cap)}>
                {heroPlates.map((p) => <Plate key={p.plate.slot} plate={p.plate} className="h-full w-full" sizes="33vw" />)}
              </PlateCycle>
            </div>
          </Reveal>
          <dl className="col-span-full grid grid-cols-2 gap-6 border-t border-ivory/15 pt-6 md:grid-cols-4">
            {[["Base", `${site.city}, ${site.region}`], ["Coverage", `${industries.length} industries · ${clusters.length} clusters mapped`], ["Markets served", "US · UK · EU · AU · CA · UAE"], ["Coordinates", "18.52°N 73.86°E"]].map(([k, v]) => (
              <div key={k}><dt className="ledger text-ivory/60">{k}</dt><dd className="mt-2 text-sm text-ivory/85">{v}</dd></div>
            ))}
          </dl>
        </div>
      </section>

      <LedgerTicker />

      {/* ─────────── 2 · INTRODUCTION ─────────── */}
      <section className="container-x py-24 lg:py-40" aria-labelledby="intro-h">
        <div className="grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <p className="eyebrow mb-8">Why NGB Ventures</p>
            <h2 id="intro-h" className="display text-balance text-[clamp(2.6rem,5.8vw,5.75rem)]">India is more than a sourcing destination. <em>It’s your competitive advantage.</em></h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-4 lg:pt-28">
            <p className="lede">India’s strength is specialisation: towns and regions that have spent generations perfecting a few product families. The opportunity is real, but so is the complexity. There are thousands of manufacturers, uneven documentation, and quality that depends on how clearly the work is specified.</p>
            <p className="mt-6 leading-relaxed text-stone-ink">NGB Ventures sits between your business and that ecosystem. We translate your requirements into clear briefs, find and evaluate the right manufacturers, and coordinate samples, production, inspection and export, so you can source from India with confidence.</p>
          </Reveal>
        </div>

        <div className="mt-24 grid gap-px overflow-hidden bg-line md:grid-cols-3">
          {[
            { k: "01", t: "Your requirements", b: "Product, price, quantity, market and compliance, captured in a written sourcing brief.", tag: "Buyer" },
            { k: "02", t: "Our coordination", b: "Supplier identification, verification, sampling, production follow-up, QC and export paperwork, run from Pune.", tag: "NGB Ventures" },
            { k: "03", t: "India’s manufacturers", b: "Matched manufacturers across specialised clusters, from artisan workshops to export factories.", tag: "Clusters" },
          ].map((c, i) => (
            <Reveal key={c.k} delay={i * 0.08} className="relative bg-ivory p-8 lg:p-12">
              <div className="flex items-center justify-between"><span className="ledger text-bronze-ink">{c.k} · {c.tag}</span>{i < 2 && <ArrowRight className="hidden h-4 w-4 text-stone-ink md:block" aria-hidden />}</div>
              <h3 className="mt-10 font-display text-4xl">{c.t}</h3>
              <p className="mt-4 leading-relaxed text-stone-ink">{c.b}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─────────── 3 · INDUSTRIES ─────────── */}
      <section className="border-t border-line bg-ivory py-24 lg:py-36" aria-labelledby="ind-h">
        <div className="container-x">
          <SectionHead id="ind-h" eyebrow={`Industries · ${industries.length} categories`} title={<>Sixteen categories. <em>One partner.</em></>} lede="Each industry has its own landing page with products, manufacturing clusters, customisation, quality and compliance considerations, and a dedicated enquiry path." />
          <div className="mt-16 lg:mt-24"><IndustryGrid items={industries} /></div>
          <div className="mt-16 flex justify-center"><Link href="/industries" className="btn btn-ghost">View all industries <ArrowRight className="arrow h-4 w-4" /></Link></div>
        </div>
      </section>

      {/* ─────────── 4 · WHY INDIA ─────────── */}
      <section className="on-dark relative bg-ink py-24 text-ivory lg:py-36" aria-labelledby="why-h">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow mb-8">Why India</p>
              <h2 id="why-h" className="display text-[clamp(2.6rem,5vw,5rem)]">Seven reasons the world’s buyers <em>look to India.</em></h2>
              <div className="relative mt-12 hidden aspect-[4/3] overflow-hidden lg:block">
                <Plate plate={{ slot: "home-why-india", motif: "block", tone: "madder", alt: "Artisan hand block printing textiles", brief: "Artisan hand block printing on a long table; rows of printed cotton; warm madder and indigo palette." }} className="h-full w-full" sizes="40vw" label="Hand block print · Rajasthan" number="05" />
              </div>
            </div>
          </div>
          <ol className="lg:col-span-6 lg:col-start-7">
            {whyIndia.map((w, i) => (
              <Reveal as="li" key={w.title} className="group border-t border-ivory/12 py-10 first:border-t-0 first:pt-0 lg:first:pt-2">
                <div className="flex gap-8">
                  <span className="display text-5xl text-bronze/70 transition-colors duration-500 group-hover:text-bronze">{String(i + 1).padStart(2, "0")}</span>
                  <div><h3 className="font-display text-[2rem] leading-tight">{w.title}</h3><p className="mt-3 max-w-lg leading-relaxed text-ivory/65">{w.body}</p></div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ─────────── 5 · MANUFACTURING NETWORK ─────────── */}
      <section id="network" className="on-dark relative overflow-hidden bg-charcoal py-24 text-ivory lg:py-36" aria-labelledby="net-h">
        <div className="container-x">
          <SectionHead id="net-h" dark eyebrow="Manufacturing network" title={<>A map of India’s <em>making towns.</em></>} lede="Select a cluster to see its specialisation, typical products and related industries. Every location links to a detailed cluster guide." />
          <div className="mt-16 lg:mt-20"><ClusterMap initial="tirupur" /></div>
        </div>
      </section>

      {/* ─────────── 6 · PROCESS ─────────── */}
      <section className="container-x py-24 lg:py-40" aria-labelledby="proc-h">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow mb-8">Our sourcing process</p>
              <h2 id="proc-h" className="display text-[clamp(2.6rem,5vw,4.75rem)]">Seven steps. <em>Each with a deliverable.</em></h2>
              <p className="lede mt-8">You always know where your project stands, and what you’ll receive at each stage.</p>
              <Link href="/enquire" className="btn btn-primary mt-10">Start step one <ArrowRight className="arrow h-4 w-4" /></Link>
            </div>
          </div>
          <div className="lg:col-span-8"><ProcessTimeline steps={processSteps} /></div>
        </div>
      </section>

      {/* ─────────── 7 · SERVICES ─────────── */}
      <section className="bg-paper py-24 lg:py-36" aria-labelledby="svc-h">
        <div className="container-x">
          <SectionHead id="svc-h" eyebrow="Services" title={<>Twelve services across the <em>sourcing lifecycle.</em></>} lede="Use one, or combine them. Every service has a defined scope and written deliverables." />
          <div className="mt-16"><ServicesLedger items={services} /></div>
        </div>
      </section>

      {/* ─────────── 7b · BUYER JOURNEYS ─────────── */}
      <section className="container-x py-24 lg:py-32" aria-labelledby="aud-h">
        <SectionHead id="aud-h" eyebrow="Who we work with" title={<>Built around <em>how you buy.</em></>} />
        <ul className="mt-14 grid gap-px overflow-hidden bg-line sm:grid-cols-2 lg:grid-cols-5">
          {audiences.map((a, i) => (
            <Reveal as="li" key={a.title} delay={i * 0.05} className="bg-ivory">
              <Link href={a.href} className="group flex h-full flex-col justify-between p-7 transition-colors duration-500 hover:bg-charcoal hover:text-ivory">
                <div><span className="ledger text-bronze-ink group-hover:text-bronze-soft">0{i + 1}</span><h3 className="mt-8 font-display text-[1.85rem] leading-tight">{a.title}</h3><p className="mt-3 text-sm leading-relaxed text-stone-ink group-hover:text-ivory/65">{a.body}</p></div>
                <span className="mt-10 inline-flex items-center gap-2 text-sm font-semibold">{a.cta} <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ─────────── 8 · GLOBAL MARKETS ─────────── */}
      <section className="on-dark bg-charcoal py-24 text-ivory lg:py-36" aria-labelledby="mk-h">
        <div className="container-x">
          <SectionHead id="mk-h" dark eyebrow={`Global markets · ${markets.length} market guides`} title={<>From Indian ports <em>to your market.</em></>} lede="Market guides cover the buyer types, regulations, trade-agreement status and official tariff tools that shape sourcing from India for each destination." />
          <div className="mt-16"><WorldMarkets /></div>
        </div>
      </section>

      {/* ─────────── 9 · CONVERSION ─────────── */}
      <CtaBand />

      <JsonLd data={itemListLd("Industries", industries.map((i) => ({ name: i.name, href: `/industries/${i.slug}` })))} />
    </>
  );
}
