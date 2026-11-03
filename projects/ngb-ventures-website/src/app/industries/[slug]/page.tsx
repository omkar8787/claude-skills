import { notFound } from "next/navigation";
import { industries, getIndustry } from "@/content/industries";
import { clusters } from "@/content/clusters";
import { products } from "@/content/products";
import { PageHero } from "@/components/sections/PageHero";
import { IntroBlock, NumberedList, CapabilityGrid, TwoLists, ComplianceGrid, WorkflowStrip } from "@/components/sections/DetailBlocks";
import { ClusterCards } from "@/components/sections/CardLists";
import { IndustryGrid } from "@/components/sections/IndustryGrid";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { buildMetadata, JsonLd, serviceLd } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() { return industries.map((i) => ({ slug: i.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const it = getIndustry((await params).slug);
  if (!it) return {};
  return buildMetadata({ title: it.seoTitle, description: it.metaDescription, path: `/industries/${it.slug}` });
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const it = getIndustry((await params).slug);
  if (!it) notFound();
  const cls = clusters.filter((c) => it.clusterSlugs.includes(c.slug));
  const prods = products.filter((p) => it.productSlugs.includes(p.slug));
  const related = industries.filter((i) => it.related.includes(i.slug));
  const enquire = `/quote?type=sourcing&industry=${it.slug}`;

  return (
    <>
      <PageHero
        plate={it.plate}
        plateNumber={it.index}
        plateLabel={it.name}
        crumbs={[{ name: "Industries", href: "/industries" }, { name: it.name, href: `/industries/${it.slug}` }]}
        eyebrow={`Industry ${it.index} · Sourcing from India`}
        title={it.name}
        lede={it.heroLine}
        ctas={[{ label: `Source ${it.name.split(" ")[0]} from India`, href: enquire }, { label: "Our process", href: "#workflow", variant: "ghost" }]}
        meta={[{ k: "Product types", v: `${it.products.length} covered` }, { k: "Key clusters", v: cls.map((c) => c.name).join(", ") || "Multiple regions" }, { k: "Services", v: "Sourcing · QC · Export" }, { k: "Markets", v: "US · UK · EU · AU · CA · UAE" }]}
      />
      <IntroBlock eyebrow="Overview" title={<>{it.short}</>} paragraphs={it.intro} aside={[{ k: "Category", v: it.name }, { k: "Clusters", v: cls.map((c) => c.name).join(" · ") || "—" }, { k: "Customise", v: it.customization.slice(0, 2).join("; ") }, { k: "Start", v: <a href={enquire} className="link-u font-medium">Send a sourcing brief →</a> }]} />
      <NumberedList eyebrow="Products available" title={<>What can be <em>sourced</em></>} items={it.products} links={prods.map((p) => ({ label: `${p.name} guide`, href: `/products/${p.slug}` }))} />
      {cls.length > 0 && (
        <section className="container-x py-24 lg:py-32">
          <p className="eyebrow mb-6">Manufacturing clusters</p>
          <h2 className="display mb-14 text-[clamp(2.2rem,4.4vw,4rem)]">Where it’s <em>made.</em></h2>
          <ClusterCards items={cls} />
        </section>
      )}
      <CapabilityGrid dark eyebrow="Manufacturing capabilities" title={<>What Indian manufacturers <em>commonly offer</em></>} items={it.capabilities} />
      <TwoLists a={{ eyebrow: "Customisation", title: "Make it yours", items: it.customization }} b={{ eyebrow: "Quality assurance", title: "What we check", items: it.quality }} />
      <ComplianceGrid items={it.compliance} />
      <div id="workflow" className="scroll-mt-24"><WorkflowStrip enquireHref={enquire} /></div>
      <Faq faqs={it.faqs} title={`${it.name}: buyer FAQs`} />
      <section className="border-t border-line bg-ivory py-24">
        <div className="container-x"><p className="eyebrow mb-6">Related industries</p><h2 className="display mb-14 text-[clamp(2.2rem,4vw,3.5rem)]">Often sourced <em>alongside</em></h2><IndustryGrid items={related} compact /></div>
      </section>
      <CtaBand title={`Sourcing ${it.name.toLowerCase()}? Tell us what you need.`} lede="Share your product, quantities and market. We'll come back with feasible clusters, manufacturer types and next steps." topic="Sourcing project" />
      <JsonLd data={serviceLd({ name: `${it.name} sourcing from India`, description: it.metaDescription, path: `/industries/${it.slug}`, serviceType: "Product sourcing and manufacturing coordination" })} />
    </>
  );
}
