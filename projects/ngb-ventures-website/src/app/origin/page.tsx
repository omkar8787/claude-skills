import Link from "next/link";
import { giProducts, giStatusLabel, giIndexOnly } from "@/content/gi";
import { PageHero } from "@/components/sections/PageHero";
import { Plate } from "@/components/ui/Plate";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { buildMetadata, JsonLd, itemListLd } from "@/lib/seo";

export const metadata = buildMetadata({ title: "GI Tagged Products of India | India's Origin Collection", description: "Discover India's Geographical Indication products, including Darjeeling Tea, Kancheepuram Silk, Kannauj Perfume, Paithani and Moradabad Metal Craft, with registry details, sources and sourcing guidance.", path: "/origin" });

const CATS = ["Agricultural", "Food", "Textile", "Handicraft", "Manufactured", "Natural / Fragrance"] as const;

export default function Origin() {
  return (
    <>
      <PageHero plate={{ slot: "page-origin", motif: "block", tone: "forest", alt: "India's Origin Collection", brief: "" }} crumbs={[{ name: "GI & Origin Collection", href: "/origin" }]} eyebrow="India's Origin Collection" title="Shaped by geography." italic="Carried by generations." lede="Discover extraordinary products shaped by geography, heritage, traditional craftsmanship and generations of knowledge, each with its Geographical Indication details and sources." ctas={[{ label: "Source a GI product", href: "/quote?type=sourcing&category=GI%20%2F%20origin%20products" }, { label: "How we verify", href: "#method", variant: "ghost" }]} />
      <section className="container-x py-20 lg:py-28">
        {CATS.map((cat) => {
          const list = giProducts.filter((g) => g.category === cat);
          if (!list.length) return null;
          return (
            <div key={cat} className="mb-20 last:mb-0">
              <div className="mb-10 flex items-baseline justify-between border-b border-charcoal pb-3"><h2 className="font-display text-4xl">{cat}</h2><span className="ledger text-stone-ink">{list.length} {list.length > 1 ? "products" : "product"}</span></div>
              <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((g) => (
                  <Reveal as="li" key={g.slug}>
                    <Link href={`/origin/${g.slug}`} className="group block">
                      <div className="relative aspect-[4/3] overflow-hidden"><div className="absolute inset-0 transition-transform duration-[1.4s] group-hover:scale-105"><Plate plate={g.plate} className="h-full w-full" sizes="33vw" /></div>
                        <span className={`ledger absolute left-3 top-3 rounded-full px-2.5 py-1 text-[0.58rem] ${g.status === "registered" ? "bg-bronze text-charcoal" : "bg-ivory/90 text-charcoal"}`}>{giStatusLabel[g.status]}</span></div>
                      <p className="ledger mt-4 text-bronze-ink">{g.state}{g.applicationNo ? ` · Application ${g.applicationNo}` : ""}</p>
                      <h3 className="mt-1 font-display text-3xl"><span className="link-u">{g.officialName}</span></h3>
                      <p className="mt-2 text-sm leading-relaxed text-stone-ink">{g.characteristics[0]}</p>
                    </Link>
                  </Reveal>
                ))}
              </ul>
            </div>
          );
        })}
        <div className="mt-10 rounded-sm bg-paper p-6 text-sm text-stone-ink"><p className="font-semibold text-charcoal">Also listed in the GI registry index (details not yet verified):</p><ul className="mt-2 space-y-1">{giIndexOnly.map((g) => <li key={g.name}>{g.name}: application {g.applicationNo}. {g.note}</li>)}</ul></div>
      </section>
      <section id="method" className="on-dark scroll-mt-24 bg-forest py-24 text-ivory">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4"><p className="eyebrow mb-6">Verification & legal</p><h2 className="display text-[clamp(2.2rem,4vw,3.6rem)]">How we label <em>origin claims.</em></h2></div>
          <div className="space-y-8 lg:col-span-7 lg:col-start-6">
            {[["Registered GI", "Registry details (application number, certificate, status) come from an indexed IP India GI registry record. We still recommend re-checking the live registry before commercial use."], ["Registered: renewal unconfirmed", "The record's listed validity date has passed and we couldn't confirm a renewal."], ["Reported GI: unverified", "We couldn't access the registry record. Details come from government or secondary sources and may be incomplete or conflicting."], ["Our role", "NGB Ventures doesn't own any GI and isn't an authorised user. Products marketed with a GI name or logo must come from registered authorised users in the defined area. We help buyers find and verify them."]].map(([t, b]) => (
              <div key={t} className="border-t border-ivory/15 pt-5"><p className="font-display text-2xl text-bronze-soft">{t}</p><p className="mt-2 leading-relaxed text-ivory/75">{b}</p></div>
            ))}
            <p className="text-sm text-ivory/75">Primary register: IP India GI Registry (search.ipindia.gov.in). Research date for this collection: 3 Nov 2026.</p>
          </div>
        </div>
      </section>
      <CtaBand title="Looking for authentic GI products? Let's find authorised producers." />
      <JsonLd data={itemListLd("India's Origin Collection", giProducts.map((g) => ({ name: g.officialName, href: `/origin/${g.slug}` })))} />
    </>
  );
}
