import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { markets, getMarket } from "@/content/markets";
import { industries } from "@/content/industries";
import { PageHero } from "@/components/sections/PageHero";
import { IntroBlock, NumberedList, ComplianceGrid, WorkflowStrip } from "@/components/sections/DetailBlocks";
import { IndustryGrid } from "@/components/sections/IndustryGrid";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { buildMetadata, JsonLd, serviceLd } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() { return markets.map((m) => ({ slug: m.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const m = getMarket((await params).slug);
  return m ? buildMetadata({ title: m.seoTitle, description: m.metaDescription, path: `/markets/${m.slug}` }) : {};
}

export default async function MarketPage({ params }: { params: Promise<{ slug: string }> }) {
  const m = getMarket((await params).slug);
  if (!m) notFound();
  const inds = industries.filter((i) => m.popularIndustries.includes(i.slug));
  const enquire = `/enquire?market=${m.slug}`;
  return (
    <>
      <PageHero plate={m.plate} plateLabel={`India → ${m.name}`} crumbs={[{ name: "Markets", href: "/markets" }, { name: m.name, href: `/markets/${m.slug}` }]} eyebrow={`Market guide · ${m.region}`} title={`Sourcing from India for ${m.name}`} lede={m.heroLine}
        ctas={[{ label: `Start a ${m.code} sourcing brief`, href: enquire }, { label: "Landed-cost estimator", href: "/tools/landed-cost-calculator", variant: "ghost" }]}
        meta={[{ k: "Region", v: m.region }, { k: "Buyer types", v: `${m.buyerTypes.length} profiles` }, { k: "Support model", v: "Remote, from Pune" }, { k: "Last reviewed", v: "Nov 2026" }]} />
      <IntroBlock eyebrow="Overview" title={<>India → <em>{m.name}</em></>} paragraphs={m.intro} aside={[{ k: "Trade status", v: m.tradeNote }, { k: "Offices", v: "NGB operates from Pune, India. No local office." }]} />
      <NumberedList eyebrow="Who we support" title={<>Buyers in <em>{m.name}</em></>} items={m.buyerTypes} />
      <ComplianceGrid items={m.considerations} title={`Importing into ${m.name}`} />
      <section className="container-x py-24">
        <p className="eyebrow mb-6">Official tools</p>
        <h2 className="display text-[clamp(2.2rem,4vw,3.5rem)]">Check rates at the <em>source</em></h2>
        <p className="lede mt-6 max-w-2xl">We don’t publish duty rates, because they change. Use the official tools below with your HS code, and confirm with a licensed customs broker.</p>
        <ul className="mt-10 grid gap-px overflow-hidden bg-line sm:grid-cols-2 lg:grid-cols-3">
          {m.officialTools.map((t) => <li key={t.href} className="bg-ivory"><a href={t.href} target="_blank" rel="noopener noreferrer" className="group flex h-full items-start justify-between gap-6 p-7 hover:bg-paper"><span className="font-display text-2xl leading-tight">{t.label}</span><ExternalLink className="mt-1 h-4 w-4 shrink-0" /></a></li>)}
        </ul>
      </section>
      <section className="border-t border-line py-24"><div className="container-x"><p className="eyebrow mb-6">Popular categories</p><h2 className="display mb-12 text-[clamp(2.2rem,4vw,3.5rem)]">What {m.name} buyers <em>source</em></h2><IndustryGrid items={inds} compact /></div></section>
      <WorkflowStrip enquireHref={enquire} />
      <Faq faqs={m.faqs} title={`${m.name}: FAQs`} />
      <CtaBand title={`Importing into ${m.name}? Let's plan your India sourcing.`} />
      <JsonLd data={serviceLd({ name: `India sourcing for ${m.name} importers`, description: m.metaDescription, path: `/markets/${m.slug}`, serviceType: "International sourcing", areaServed: m.code })} />
    </>
  );
}
