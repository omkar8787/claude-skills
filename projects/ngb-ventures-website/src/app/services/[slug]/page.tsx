import { notFound } from "next/navigation";
import { services, getService } from "@/content/services";
import { PageHero } from "@/components/sections/PageHero";
import { IntroBlock, TwoLists, WorkflowStrip } from "@/components/sections/DetailBlocks";
import { ServicesLedger } from "@/components/sections/ServicesLedger";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { buildMetadata, JsonLd, serviceLd } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() { return services.map((s) => ({ slug: s.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const s = getService((await params).slug);
  return s ? buildMetadata({ title: s.seoTitle, description: s.metaDescription, path: `/services/${s.slug}` }) : {};
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const rel = services.filter((x) => s.related.includes(x.slug));
  const enquire = s.slug === "product-development" ? "/quote?type=manufacturing" : `/quote?type=sourcing&service=${s.slug}`;
  return (
    <>
      <PageHero plate={s.plate} plateNumber={s.index} plateLabel={s.name} crumbs={[{ name: "Services", href: "/services" }, { name: s.name, href: `/services/${s.slug}` }]} eyebrow={`Service ${s.index}`} title={s.name} lede={s.heroLine}
        ctas={[{ label: "Request this service", href: enquire }, { label: "All services", href: "/services", variant: "ghost" }]}
        meta={[{ k: "Deliverables", v: `${s.deliverables.length} written outputs` }, { k: "Best for", v: s.bestFor[0] }, { k: "Engagement", v: "Scoped per project" }, { k: "Base", v: "Pune, India" }]} />
      <IntroBlock eyebrow="What it is" title={s.short} paragraphs={[]} aside={[{ k: "Best for", v: s.bestFor.join(" · ") }, { k: "Fees", v: "Quoted per scope. Contact us." }]} />
      <TwoLists a={{ eyebrow: "What it involves", title: "Scope of work", items: s.involves }} b={{ eyebrow: "Deliverables", title: "What you receive", items: s.deliverables }} />
      <WorkflowStrip enquireHref={enquire} />
      <Faq faqs={s.faqs} title={`${s.name}: FAQs`} />
      <section className="bg-paper py-24"><div className="container-x"><p className="eyebrow mb-6">Pairs well with</p><h2 className="display mb-12 text-[clamp(2.2rem,4vw,3.5rem)]">Related services</h2><ServicesLedger items={rel} /></div></section>
      <CtaBand title={`Need ${s.name.toLowerCase()}? Tell us about your project.`} />
      <JsonLd data={serviceLd({ name: s.name, description: s.metaDescription, path: `/services/${s.slug}`, serviceType: s.name })} />
    </>
  );
}
