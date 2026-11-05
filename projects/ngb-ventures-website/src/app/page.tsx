import { guides } from "@/content/guides";
import Link from "next/link";
import { Confidentiality } from "@/components/sections/Confidentiality";
import { DobeAdvantage } from "@/components/sections/DobeAdvantage";
import { ExportQuiz } from "@/components/fun/ExportQuiz";
import { facts } from "@/content/facts";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Plate } from "@/components/ui/Plate";
import { Reveal } from "@/components/ui/Reveal";
import { MaskLines } from "@/components/ui/MaskLines";
import { SectionHead } from "@/components/ui/Section";
import { LedgerTicker } from "@/components/sections/LedgerTicker";
import { CtaBand } from "@/components/sections/CtaBand";
import { WorldMarkets } from "@/components/maps/WorldMarkets";
import { AtlasLazy } from "@/components/maps/AtlasLazy";
import { HeroMosaic, ParallelManifesto, PinnedJourney, HorizontalSpotlight, SourceQuickStart, DivisionList } from "@/components/home/Interactive";
import { BrandStudio } from "@/components/home/BrandStudio";
import { divisions, journeyStages } from "@/content/divisions";
import { spotlightItems } from "@/content/discovery";
import { giProducts, giStatusLabel } from "@/content/gi";
import { atlasStates } from "@/content/atlas";
import { clusters } from "@/content/clusters";
import { messaging, site } from "@/content/site";
import type { Plate as PlateT, Tone, Motif } from "@/content/types";
import { buildMetadata, JsonLd, itemListLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "NGB Ventures | Your Global Sourcing Desk in India",
  description: "Discover Indian products, connect with manufacturers, develop private-label goods, coordinate exports and launch your brand. NGB Ventures, Pune: India to the world, from concept to commerce.",
  path: "/",
});

const P = (slot: string, motif: Motif, tone: Tone, alt: string): PlateT => ({ slot, motif, tone, alt, brief: alt });
const heroTiles = [
  { p: P("hero-1", "radial", "bronze", "Brass craftsmanship"), c: "Brass · Moradabad" },
  { p: P("hero-2", "knit", "indigo", "Textiles"), c: "Textiles · Tiruppur" },
  { p: P("hero-3", "botanical", "olive", "Natural products"), c: "Attars · Kannauj" },
  { p: P("hero-4", "fold", "sand", "Packaging"), c: "Packaging · Sivakasi" },
  { p: P("hero-5", "route", "charcoal", "International shipping"), c: "Export · JNPT" },
  { p: P("hero-6", "jali", "clay", "Brand campaigns"), c: "Brand" },
];
const featuredGi = ["darjeeling-tea", "kancheepuram-silk", "kannauj-perfume", "moradabad-metal-craft", "paithani", "agates-of-cambay"].map((s) => giProducts.find((g) => g.slug === s)!);
const pathways = [
  { who: "Importers & international buyers", title: "Find a product and its maker", body: "Describe what you need. We research manufacturing clusters and suppliers, then present a qualified shortlist.", href: "/quote?type=sourcing", cta: "Request a sourcing proposal" },
  { who: "Retailers & distributors", title: "Build a range from India", body: "Explore categories, regions and origin products, then ask us to source a collection.", href: "/discover", cta: "Explore product categories" },
  { who: "Private-label & Amazon sellers", title: "Launch your own label", body: "Private-label development with marketplace-ready labelling, packaging and quality inspection.", href: "/quote?type=manufacturing", cta: "Develop a private-label product" },
  { who: "Brand owners", title: "Turn a product into a brand", body: "Positioning, packaging and advertising on Amazon, Meta and Google to launch and grow internationally.", href: "/quote?type=brand", cta: "Build your global brand" },
  { who: "Corporate procurement teams", title: "Import from a disability-owned exporter", body: "NGB Ventures is a disability-owned business. Disability:IN DOBE® certification application in progress.", href: "/export#dobe", cta: "Supplier diversity and DOBE®" },
  { who: "Manufacturers & publishers", title: "Work with NGB Ventures", body: "Indian manufacturers, printers and publishers: tell us what you make and which markets you export to.", href: "/quote?type=supplier", cta: "Introduce your business" },
];
const brandSteps = ["Product idea", "Manufacturing", "Brand identity", "Packaging", "Advertising", "Marketplace", "Global customer"];

const oneStop = [
  { t: "Handicrafts & home décor", b: "Brass, wood, stone, glass, blue pottery and lighting.", href: "/industries/handicrafts" },
  { t: "Textiles & apparel", b: "Block print, handloom, ikat, knitwear, rugs and home linen.", href: "/industries/home-textiles" },
  { t: "Food, spices & nutrition", b: "Spices, millets, tea, coffee, makhana and superfood powders.", href: "/industries/food-nutrition" },
  { t: "Corporate & festive gifting", b: "Curated hampers, welcome kits and festive collections.", href: "/corporate-gifting" },
  { t: "Wellness & natural beauty", b: "Attars, essential oils, Ayurvedic botanicals and natural care.", href: "/industries/essential-oils" },
  { t: "Furniture & woodcraft", b: "Mango wood, sheesham, cane and carved pieces.", href: "/industries/furniture-woodcraft" },
  { t: "Leather, jewellery & accessories", b: "Bags, footwear, silver and fashion jewellery.", href: "/industries/jewelry-accessories" },
  { t: "Eco-friendly products", b: "Jute, coir, bamboo, loofah and plastic-free packaging.", href: "/industries/eco-friendly" },
  { t: "Kitchen & tableware", b: "Brass, copper, steel, stoneware and serveware.", href: "/industries/kitchenware-tableware" },
  { t: "Packaging, print & publishing", b: "Books, stationery, cartons, labels and inserts.", href: "/publishers-printing" },
  { t: "Engineering & components", b: "Machined, cast and forged parts built to print.", href: "/industries/engineering-industrial" },
  { t: "GI & origin products", b: "Registered regional specialities, with sources.", href: "/origin" },
];

export default function Home() {
  const giMini = Object.fromEntries(giProducts.map((g) => [g.slug, { slug: g.slug, name: g.shortName, status: giStatusLabel[g.status], applicationNo: g.applicationNo }]));
  const colA = [spotlightItems[0], spotlightItems[1], spotlightItems[5], spotlightItems[7]];
  const colB = [spotlightItems[2], spotlightItems[4], spotlightItems[8], spotlightItems[6]];
  const Card = ({ it, tall }: { it: (typeof spotlightItems)[number]; tall?: boolean }) => (
    <figure className={`relative shrink-0 overflow-hidden ${tall ? "aspect-[3/4]" : "aspect-[4/4.2]"}`}>
      <Plate plate={it.plate} className="h-full w-full" sizes="30vw" />
      <figcaption className="tone-reset ledger absolute bottom-3 left-3 right-3 text-[0.6rem] text-ivory/90">{it.name} · {it.state}</figcaption>
    </figure>
  );

  return (
    <>
      {/* ═════════ HERO ═════════ */}
      <section className="on-dark tone-light relative isolate overflow-hidden bg-charcoal text-ivory" aria-labelledby="hero-h">
        <div className="absolute inset-0 -z-10 opacity-30 mix-blend-soft-light"><Plate plate={P("home-hero", "jali", "sand", "")} className="h-full w-full" intensity="quiet" /></div>
        <div className="container-x grid min-h-[100svh] items-center gap-12 pb-12 pt-28 lg:grid-cols-12 lg:pb-16 lg:pt-32">
          <div className="lg:col-span-6">
            <p className="eyebrow fade-up mb-8">{site.positioning}</p>
            <h1 id="hero-h" className="display text-[clamp(3rem,6.4vw,6.6rem)]">
              <MaskLines lines={["Discover India.", "Source Better.", <em key="e">Build Global Brands.</em>]} delay={0.1} />
            </h1>
            <div className="fade-up" style={{ ["--d" as string]: "0.45s" }}>
              <p className="lede mt-8 max-w-xl">{messaging.heroSub}</p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link href="/quote" className="btn btn-bronze">Request a Sourcing Proposal <ArrowRight className="arrow h-4 w-4" /></Link>
                <Link href="/manufacturing" className="btn btn-ghost">Explore Manufacturing Clusters</Link>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6">
            <HeroMosaic captions={heroTiles.map((t) => t.c)}>
              {heroTiles.map((t, i) => <Plate key={t.p.slot} plate={t.p} className="h-full w-full" sizes="25vw" priority={i < 2} />)}
            </HeroMosaic>
          </div>
          {/* The business model, in the first screen: four divisions. */}
          <ol className="col-span-full grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-ivory/15 bg-ivory/15 sm:grid-cols-2 lg:grid-cols-4" aria-label="What NGB Ventures does">
            {divisions.map((d) => (
              <li key={d.slug} className="bg-charcoal">
                <Link href={d.route} className="group flex h-full flex-col gap-2 p-5 transition-colors hover:bg-ink">
                  <span className="ledger text-bronze-soft">{d.index} · {d.kicker}</span>
                  <span className="font-display text-[1.35rem] leading-tight">{d.name}</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <LedgerTicker />

      {/* ═════════ MANIFESTO: parallel scrolling ═════════ */}
      <section className="container-x py-24 lg:py-36" aria-label="Why India">
        <ParallelManifesto
          lines={messaging.manifesto}
          left={colA.map((it, i) => <Card key={it.slug} it={it} tall={i % 2 === 0} />)}
          right={colB.map((it, i) => <Card key={it.slug} it={it} tall={i % 2 === 1} />)}
        />
      </section>

      {/* ═════════ DIVISIONS ═════════ */}
      <section className="bg-paper py-24 lg:py-32" aria-labelledby="div-h">
        <div className="container-x">
          <SectionHead id="div-h" eyebrow="Four divisions. One partner." title={<>From product discovery <em>to your customer&apos;s door.</em></>} lede="Use one division, or let them work together: from finding the maker to selling the finished brand abroad." />
          <div className="mt-16">
            <DivisionList items={divisions} previews={divisions.map((d) => <Plate key={d.slug} plate={P(`div-${d.slug}`, "jali", d.tone, d.name)} className="h-full w-full" sizes="180px" />)} />
          </div>
        </div>
      </section>

      {/* ═════════ PINNED JOURNEY ═════════ */}
      <section className="on-dark tone-light bg-charcoal py-24 text-ivory lg:py-0" aria-labelledby="journey-h">
        <div className="container-x">
          <div className="lg:pt-32"><SectionHead id="journey-h" dark eyebrow="How a project moves" title={<>Source. Manufacture. Customise. <em>Brand. Advertise. Export.</em></>} /></div>
          <div className="mt-14 lg:mt-0">
            <PinnedJourney
              stages={journeyStages.map((s) => ({ key: s.key, label: s.label, title: s.title, body: s.body }))}
              plates={journeyStages.map((s) => <Plate key={s.key} plate={P(`stage-${s.key}`, "jali", s.tone, s.title)} className="h-full w-full" sizes="50vw" />)}
              mobilePlates={journeyStages.map((s) => <Plate key={s.key} plate={P(`stage-${s.key}`, "jali", s.tone, s.title)} className="h-full w-full" sizes="90px" />)}
            />
          </div>
        </div>
      </section>

      {/* ═════════ HORIZONTAL SPOTLIGHT ═════════ */}
      <section className="on-dark tone-light bg-ink pt-24 text-ivory lg:pt-32" aria-labelledby="spot-h">
        <div className="container-x mb-12"><SectionHead id="spot-h" dark eyebrow="Product spotlight" title={<>Products India <em>makes well.</em></>} lede="Handicrafts and textiles, but also spices, millets, tea, superfoods, corporate gifts, leather, ceramics and precision components. Each card opens a guide or a pre-filled sourcing request. This is not a stock list: every project starts with supplier research." /></div>
        <HorizontalSpotlight
          cards={spotlightItems.map((s) => ({ slug: s.slug, name: s.name, meta: `${s.cluster} · ${s.state}`, story: s.story, href: s.href, cta: s.href.startsWith("/quote") ? "Request a proposal" : "Explore" }))}
          plates={spotlightItems.map((s) => <Plate key={s.slug} plate={s.plate} className="h-full w-full" sizes="30vw" />)}
        />
        <div className="h-16 lg:h-24" />
      </section>


      {/* ═════════ PRODUCT CATEGORIES ═════════ */}
      <section className="container-x py-24 lg:py-32" aria-labelledby="cat-h">
        <SectionHead id="cat-h" eyebrow="Product categories" title={<>One partner across <em>India&apos;s manufacturing categories.</em></>} lede="From farms and food processors to craft workshops and engineering units: one partner to find the maker, qualify it, develop the product and ship it." />
        <ul className="mt-14 grid gap-px overflow-hidden bg-line sm:grid-cols-2 lg:grid-cols-4">
          {oneStop.map((c, i) => (
            <Reveal as="li" key={c.t} delay={(i % 4) * 0.04} className="bg-ivory">
              <Link href={c.href} className="shine group flex h-full flex-col justify-between gap-6 p-7 transition-colors duration-500 hover:bg-paper">
                <div><span className="ledger text-bronze-ink">{String(i + 1).padStart(2, "0")}</span><h3 className="mt-4 font-display text-[1.75rem] leading-tight">{c.t}</h3><p className="mt-2 text-[0.92rem] leading-relaxed text-stone-ink">{c.b}</p></div>
                <span className="inline-flex items-center gap-2 text-sm font-semibold">Explore <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ═════════ SOURCE ANYTHING ═════════ */}
      <section className="on-dark relative overflow-hidden bg-forest py-24 text-ivory lg:py-32" aria-labelledby="src-h">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-6">Source anything from India</p>
            <h2 id="src-h" className="display text-[clamp(2.6rem,5vw,4.8rem)]">Can&apos;t find it? <em>We can research it.</em></h2>
            <p className="lede mt-8">You don&apos;t need to know where in India it is made. Finding that out is part of our work.</p>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-ivory/75">{messaging.honesty} We don&apos;t offer instant quotes or live inventory. A person researches every request.</p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7"><SourceQuickStart /></div>
        </div>
      </section>

      {/* ═════════ LEAD PATHWAYS ═════════ */}
      <section className="container-x py-24 lg:py-32" aria-labelledby="path-h">
        <SectionHead id="path-h" eyebrow="Choose your path" title={<>Choose the route <em>that fits your business.</em></>} lede="Each route opens a short enquiry form that asks only for the details relevant to your request." />
        <ul className="mt-14 grid gap-px overflow-hidden bg-line sm:grid-cols-2 lg:grid-cols-3">
          {pathways.map((pw, i) => (
            <Reveal as="li" key={pw.title} delay={(i % 3) * 0.05} className="bg-ivory">
              <Link href={pw.href} className="shine group flex h-full flex-col justify-between p-7 transition-colors duration-500 hover:bg-charcoal hover:text-ivory lg:p-9">
                <div><span className="ledger text-bronze-ink group-hover:text-bronze-soft">{pw.who}</span><h3 className="mt-6 font-display text-[1.9rem] leading-tight">{pw.title}</h3><p className="mt-3 text-[0.95rem] leading-relaxed text-stone-ink group-hover:text-ivory/65">{pw.body}</p></div>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">{pw.cta} <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      <Confidentiality />

      {/* ═════════ ATLAS ═════════ */}
      <section id="atlas" className="on-dark tone-light bg-charcoal py-24 text-ivory lg:py-32" aria-labelledby="atlas-h">
        <div className="container-x">
          <SectionHead id="atlas-h" dark eyebrow="India Manufacturing Atlas" title={<>Explore India&apos;s <em>manufacturing landscape.</em></>} lede="From traditional craft clusters to modern industrial centres, state by state. The Atlas is an educational overview; every sourcing engagement involves independent, project-specific supplier research, and our supplier network remains confidential." />
          <div className="mt-14"><AtlasLazy states={atlasStates} gi={giMini} clusterSlugs={clusters.map((c) => c.slug)} initial="up" /></div>
          <div className="mt-12"><Link href="/atlas" className="btn btn-ghost">Open the full Atlas <ArrowUpRight className="h-4 w-4" /></Link></div>
        </div>
      </section>

      {/* ═════════ ORIGIN COLLECTION ═════════ */}
      <section className="container-x py-24 lg:py-32" aria-labelledby="origin-h">
        <SectionHead id="origin-h" eyebrow="India's Origin Collection" title={<>Shaped by geography. <em>Protected by law.</em></>} lede="Products whose character comes from where they are made, with Geographical Indication (GI) registration details, sources and verification dates on every page." />
        <ul className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {featuredGi.map((g) => (
            <Reveal as="li" key={g.slug}>
              <Link href={`/origin/${g.slug}`} className="group block">
                <div className="shine relative aspect-[4/3] overflow-hidden"><div className="absolute inset-0 transition-transform duration-[1.4s] group-hover:scale-105"><Plate plate={g.plate} className="h-full w-full" sizes="33vw" /></div>
                  <span className="ledger absolute left-3 top-3 rounded-full bg-ivory/90 px-2.5 py-1 text-[0.6rem] text-charcoal">{giStatusLabel[g.status]}</span></div>
                <div className="mt-4 border-t border-line pt-3">
                  <p className="ledger text-bronze-ink">{g.state} · GI application {g.applicationNo}</p>
                  <h3 className="mt-1 font-display text-3xl"><span className="link-u">{g.shortName}</span></h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-ink">{g.characteristics[0]}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-8">
          <p className="max-w-2xl text-sm leading-relaxed text-stone-ink">NGB Ventures doesn&apos;t own any GI registration and isn&apos;t an authorised user. Where buyers need GI-labelled goods, we help source from registered authorised users.</p>
          <Link href="/origin" className="btn btn-primary">Explore the Origin Collection <ArrowRight className="arrow h-4 w-4" /></Link>
        </div>
      </section>

      {/* ═════════ EXPORT IQ ═════════ */}
      <section id="export-iq" className="on-dark tone-light bg-charcoal py-24 text-ivory lg:py-32" aria-labelledby="quiz-h">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-6">Export IQ</p>
            <h2 id="quiz-h" className="display text-[clamp(2.4rem,5vw,4.4rem)]">How well do you <em>know India?</em></h2>
            <p className="lede mt-8 max-w-md">Six short true-or-false questions about what India makes and how it is traded. Every answer includes its source.</p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7"><ExportQuiz facts={facts} /></div>
        </div>
      </section>

      {/* ═════════ BRAND ═════════ */}
      <section className="bg-paper py-24 lg:py-32" aria-labelledby="brand-h">
        <div className="container-x">
          <SectionHead id="brand-h" eyebrow="Brand development & advertising" title={<>Well-made products <em>deserve strong brands.</em></>} lede="Positioning, identity, packaging, marketplace listings and advertising on Amazon, Meta and Google, for products made in India and sold in your market." />
          <ol className="mt-14 flex snap-x gap-px overflow-x-auto bg-line scrollbar-none" aria-label="From factory floor to global customer">
            {brandSteps.map((s, i) => (
              <li key={s} className="min-w-[10.5rem] flex-1 snap-start bg-paper p-5"><span className="ledger text-bronze-ink">{String(i + 1).padStart(2, "0")}</span><p className="mt-6 font-display text-[1.4rem] leading-tight">{s}</p></li>
            ))}
          </ol>
          <div className="mt-20 grid gap-6 lg:grid-cols-12 lg:items-end">
            <h3 className="display text-[clamp(2rem,3.4vw,3rem)] lg:col-span-7">From factory sample to <em>shelf-ready brand.</em></h3>
            <p className="leading-relaxed text-stone-ink lg:col-span-4 lg:col-start-9">Watch one product move through our four stages, or tap a stage to explore. Same product. Very different value.</p>
          </div>
          <div className="mt-10"><BrandStudio /></div>
          <div className="mt-10 flex flex-wrap gap-3"><Link href="/brand-development" className="btn btn-primary">Launch your brand with NGB <ArrowRight className="arrow h-4 w-4" /></Link><Link href="/advertising" className="btn btn-ghost">Advertising services</Link></div>
        </div>
      </section>

      {/* ═════════ EXPORT ═════════ */}
      <section className="on-dark tone-light bg-charcoal py-24 text-ivory lg:py-32" aria-labelledby="exp-h">
        <div className="container-x">
          <SectionHead id="exp-h" dark eyebrow="Global export solutions" title={<>Prepared for <em>your destination market.</em></>} lede="Duties, product rules and import requirements depend on HS classification and destination. We help you resolve the right questions early and coordinate licensed partners to move the goods." />
          <div className="mt-14"><WorldMarkets /></div>
          <div className="mt-10 flex flex-wrap gap-3"><Link href="/export" className="btn btn-bronze">Export solutions <ArrowRight className="arrow h-4 w-4" /></Link><Link href="/tools/market-readiness" className="btn btn-ghost">Check market readiness</Link></div>
        </div>
      </section>

      {/* ═════════ DOBE: import from a disability-owned exporter ═════════ */}
      <DobeAdvantage />

      {/* ═════════ JOURNAL ═════════ */}
      <section className="bg-paper py-24 lg:py-32" aria-labelledby="journal-h">
        <div className="container-x">
          <SectionHead id="journal-h" eyebrow="Insights & stories" title={<>Know India <em>before you buy.</em></>} lede="Practical buyer guides and research on India's craft, food and manufacturing regions, written for international procurement teams." />
          <ul className="mt-14 grid gap-10 md:grid-cols-3">
            {guides.slice(0, 3).map((g) => (
              <li key={g.slug}><Link href={`/insights/${g.slug}`} className="group block"><div className="shine relative aspect-[16/10] overflow-hidden"><div className="absolute inset-0 transition-transform duration-[1.4s] group-hover:scale-105"><Plate plate={g.plate} className="h-full w-full" sizes="33vw" /></div></div><p className="ledger mt-5 text-bronze-ink">{g.kind === "story" ? "Story" : "Guide"} · {g.category}</p><h3 className="mt-2 font-display text-[1.75rem] leading-tight"><span className="link-u">{g.title}</span></h3></Link></li>
            ))}
          </ul>
          <div className="mt-12"><Link href="/insights" className="btn btn-primary">All stories & guides <ArrowRight className="arrow h-4 w-4" /></Link></div>
        </div>
      </section>

      <CtaBand title="Have a product in mind? Request a sourcing proposal." lede="Tell us what you want to source, develop or launch. We will reply with a feasibility assessment and a proposed sourcing approach." />
      <JsonLd data={itemListLd("India's Origin Collection", giProducts.map((g) => ({ name: g.officialName, href: `/origin/${g.slug}` })))} />
    </>
  );
}
