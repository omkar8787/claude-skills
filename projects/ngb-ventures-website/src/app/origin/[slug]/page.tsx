import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { giProducts, getGi, giStatusLabel } from "@/content/gi";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Plate } from "@/components/ui/Plate";
import { buildMetadata, JsonLd, absUrl } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() { return giProducts.map((g) => ({ slug: g.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const g = getGi((await params).slug);
  return g ? buildMetadata({ title: `${g.officialName}: GI Product of ${g.state} | Sourcing`, description: `${g.officialName} (${g.state}): Geographical Indication details, characteristics, origin, export potential, compliance and how to source from authorised users.`, path: `/origin/${g.slug}` }) : {};
}

export default async function GiPage({ params }: { params: Promise<{ slug: string }> }) {
  const g = getGi((await params).slug);
  if (!g) notFound();
  const facts: [string, string][] = [
    ["Official GI name", g.officialName], ["Registration / application no.", g.applicationNo ?? "Not confirmed"], ["Certificate", g.certificate ?? "Not confirmed"], ["Registration status", `${giStatusLabel[g.status]}. ${g.statusNote}`],
    ["Valid up to (per record)", g.validUpto ?? "Not confirmed"], ["Product category", g.category], ["Geographical origin", g.origin], ["Registered proprietor / applicant", g.proprietor],
  ];
  const related = giProducts.filter((x) => x.slug !== g.slug && (x.state === g.state || x.category === g.category)).slice(0, 3);
  return (
    <>
      <PageHero plate={g.plate} crumbs={[{ name: "Origin Collection", href: "/origin" }, { name: g.shortName, href: `/origin/${g.slug}` }]} eyebrow={`${giStatusLabel[g.status]} · ${g.state}`} title={g.shortName} lede={g.characteristics[0]} ctas={[{ label: `Source ${g.shortName}`, href: `/quote?type=sourcing&product=${encodeURIComponent(g.officialName)}&category=GI%20%2F%20origin%20products&region=${encodeURIComponent(g.cluster)}` }, { label: "Registry facts", href: "#facts", variant: "ghost" }]} meta={[{ k: "Application", v: g.applicationNo ?? "Not confirmed" }, { k: "Category", v: g.category }, { k: "Cluster", v: g.cluster }, { k: "Research confidence", v: g.confidence === "registry-record" ? "Registry record" : "Secondary sources" }]} />

      <section id="facts" className="container-x scroll-mt-24 py-20 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-6">Registry facts</p>
            <dl className="divide-y divide-line border-y border-charcoal">
              {facts.map(([k, v]) => <div key={k} className="grid gap-2 py-4 sm:grid-cols-[15rem_1fr]"><dt className="ledger pt-0.5 text-stone-ink">{k}</dt><dd className="leading-relaxed">{v}</dd></div>)}
            </dl>
            <div className={`mt-6 rounded-sm p-5 text-sm leading-relaxed ${g.confidence === "registry-record" ? "bg-paper text-stone-ink" : "border border-[#a2412f]/30 bg-[#a2412f]/5 text-charcoal"}`}>
              {g.confidence === "registry-record" ? "These details come from an indexed copy of the IP India GI registry record. Re-verify them on the live registry before making commercial claims." : "We couldn't access the registry record for this product. These details come from secondary sources and may be incomplete or conflicting. Verify them before relying on them."}
              <span className="mt-2 block">Last verified: {g.lastVerified}.</span>
            </div>
          </div>
          <aside className="lg:col-span-4 lg:col-start-9"><div className="relative aspect-[4/5] overflow-hidden lg:sticky lg:top-28"><Plate plate={g.plate} className="h-full w-full" sizes="33vw" label={g.cluster} /></div></aside>
        </div>
      </section>

      <section className="border-t border-line bg-paper py-20 lg:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-2">
          <div><p className="eyebrow mb-6">Characteristics</p><ul className="space-y-3 text-[1.05rem] leading-relaxed">{g.characteristics.map((c) => <li key={c} className="border-b border-line pb-3">{c}</li>)}</ul></div>
          <div><p className="eyebrow mb-6">Cultural history</p><p className="font-display text-[1.7rem] leading-snug">{g.history}</p></div>
        </div>
      </section>

      <section className="container-x py-20 lg:py-28">
        <div className="grid gap-px overflow-hidden bg-line md:grid-cols-2 lg:grid-cols-3">
          {[["Authorised users", g.authorisedUsers], ["Public producer information", g.producers], ["Manufacturing cluster", g.cluster], ["Export potential", g.exportPotential], ["Potential target countries", g.targetCountries.join(" · ")], ["Authentication & traceability", g.authentication]].map(([t, b]) => (
            <div key={t} className="bg-ivory p-7"><p className="ledger text-bronze-ink">{t}</p><p className="mt-3 leading-relaxed">{b}</p></div>
          ))}
        </div>
      </section>

      <section className="on-dark tone-light bg-ink py-20 text-ivory lg:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4"><p className="eyebrow mb-6">Compliance considerations</p><p className="text-sm leading-relaxed text-ivory/75">Points to raise with your compliance advisor, lab or customs broker. This isn&apos;t legal advice.</p></div>
          <ul className="space-y-4 lg:col-span-7 lg:col-start-6">{g.compliance.map((c) => <li key={c} className="border-t border-ivory/15 pt-4 leading-relaxed text-ivory/80">{c}</li>)}
            <li className="border-t border-ivory/15 pt-4 leading-relaxed text-ivory/80">GI names and logos are protected under India&apos;s Geographical Indications of Goods Act, 1999. Use them only for goods from registered authorised users in the defined area. NGB Ventures doesn&apos;t own this GI and isn&apos;t an authorised user.</li></ul>
        </div>
      </section>

      <section className="container-x py-16">
        <p className="eyebrow mb-4">Sources</p>
        <ul className="space-y-2 text-sm">{g.sources.map((s) => <li key={s.href}><a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 underline underline-offset-2">{s.label} <ExternalLink className="h-3 w-3" /></a></li>)}</ul>
        {related.length > 0 && <div className="mt-14"><p className="eyebrow mb-4">Related origin products</p><div className="flex flex-wrap gap-2">{related.map((r) => <Link key={r.slug} href={`/origin/${r.slug}`} className="chip">{r.shortName}</Link>)}</div></div>}
      </section>

      <CtaBand title={`Interested in ${g.shortName}? We'll help you find authorised producers.`} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Thing", name: g.officialName, description: g.origin, url: absUrl(`/origin/${g.slug}`), additionalType: "https://schema.org/Product", subjectOf: g.sources.map((s) => ({ "@type": "WebPage", name: s.label, url: s.href })) }} />
    </>
  );
}
