import Link from "next/link";
import { notFound } from "next/navigation";
import { products, getProduct } from "@/content/products";
import { getIndustry } from "@/content/industries";
import { clusters } from "@/content/clusters";
import { PageHero } from "@/components/sections/PageHero";
import { IntroBlock, CapabilityGrid, TwoLists, ComplianceGrid, WorkflowStrip } from "@/components/sections/DetailBlocks";
import { ClusterCards, ProductCards } from "@/components/sections/CardLists";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { buildMetadata, JsonLd, serviceLd } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() { return products.map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProduct((await params).slug);
  return p ? buildMetadata({ title: p.seoTitle, description: p.metaDescription, path: `/products/${p.slug}` }) : {};
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const ind = getIndustry(p.industry)!;
  const cls = clusters.filter((c) => p.clusterSlugs.includes(c.slug));
  const rel = products.filter((x) => p.related.includes(x.slug));
  const enquire = `/enquire?product=${p.slug}`;
  return (
    <>
      <PageHero plate={p.plate} plateLabel={p.name} crumbs={[{ name: "Products", href: "/products" }, { name: p.name, href: `/products/${p.slug}` }]} eyebrow={`Product guide · ${ind.name}`} title={p.name} lede={p.heroLine}
        ctas={[{ label: `Request ${p.name.toLowerCase()} quotes`, href: enquire }, { label: `${ind.name} overview`, href: `/industries/${ind.slug}`, variant: "ghost" }]}
        meta={[{ k: "Industry", v: ind.name }, { k: "Clusters", v: cls.map((c) => c.name).join(", ") || "Various regions" }, { k: "Variants", v: `${p.variants.length} formats` }, { k: "MOQ", v: "Confirmed per manufacturer" }]} />
      <IntroBlock eyebrow="Overview" title={<>Sourcing {p.name.toLowerCase()} <em>from India</em></>} paragraphs={p.overview} aside={p.specs.map((s) => ({ k: s.label, v: s.value }))} />
      <CapabilityGrid eyebrow="Formats & variants" title={<>Common <em>variants</em></>} items={p.variants} />
      <TwoLists a={{ eyebrow: "Customisation", title: "Options to specify", items: p.customization }} b={{ eyebrow: "Quality assurance", title: "What we check", items: p.quality }} />
      <section className="container-x pb-24"><div className="border-l-2 border-bronze bg-paper p-8 md:p-10"><p className="ledger text-bronze-ink">Minimum order quantities</p><p className="mt-3 max-w-3xl font-display text-2xl leading-snug">{p.moqNote}</p></div></section>
      <ComplianceGrid items={p.compliance} />
      {cls.length > 0 && <section className="container-x py-24"><p className="eyebrow mb-6">Where it’s made</p><h2 className="display mb-12 text-[clamp(2.2rem,4vw,3.5rem)]">Relevant <em>clusters</em></h2><ClusterCards items={cls} /></section>}
      <WorkflowStrip enquireHref={enquire} />
      <Faq faqs={p.faqs} title={`${p.name}: FAQs`} />
      {rel.length > 0 && <section className="border-t border-line py-24"><div className="container-x"><div className="mb-12 flex flex-wrap items-end justify-between gap-4"><h2 className="display text-[clamp(2.2rem,4vw,3.5rem)]">Related <em>products</em></h2><Link href="/products" className="link-u text-sm font-semibold">All product guides →</Link></div><ProductCards items={rel} /></div></section>}
      <CtaBand title={`Ready to source ${p.name.toLowerCase()}? Send us your spec.`} />
      <JsonLd data={serviceLd({ name: `${p.name} sourcing from India`, description: p.metaDescription, path: `/products/${p.slug}`, serviceType: "Product sourcing" })} />
    </>
  );
}
