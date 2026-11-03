import { industries } from "@/content/industries";
import { PageHero } from "@/components/sections/PageHero";
import { IndustryGrid } from "@/components/sections/IndustryGrid";
import { CtaBand } from "@/components/sections/CtaBand";
import { buildMetadata, JsonLd, itemListLd } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Industries | Manufacturers in India by Category", description: "Explore 16 manufacturing categories you can source from India, including apparel, home textiles, handicrafts, furniture, essential oils, packaging and engineering, with clusters, compliance and sourcing guidance.", path: "/industries" });

export default function IndustriesPage() {
  return (
    <>
      <PageHero plate={{ slot: "page-industries", motif: "weave", tone: "indigo", alt: "Textile production in India", brief: "Wide shot of fabric rolls in a mill" }} crumbs={[{ name: "Industries", href: "/industries" }]} eyebrow={`${industries.length} categories`} title="Industries" italic="we source." lede="Every category below has its own page covering products, manufacturing clusters, capabilities, customisation, quality, compliance considerations and FAQs." ctas={[{ label: "Not sure? Describe your product", href: "/quote" }]} />
      <section className="container-x py-24 lg:py-32"><IndustryGrid items={industries} /></section>
      <section className="border-t border-line bg-paper py-20"><div className="container-x"><p className="eyebrow mb-8">Index</p><ol className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">{industries.map((i) => <li key={i.slug} className="border-b border-line py-3"><a href={`/industries/${i.slug}`} className="group flex items-baseline gap-4"><span className="ledger text-bronze-ink">{i.index}</span><span className="link-u">{i.name}</span></a></li>)}</ol></div></section>
      <CtaBand />
      <JsonLd data={itemListLd("Industries", industries.map((i) => ({ name: i.name, href: `/industries/${i.slug}` })))} />
    </>
  );
}
