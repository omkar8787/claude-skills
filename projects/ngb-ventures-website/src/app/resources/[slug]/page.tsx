import Link from "next/link";
import { notFound } from "next/navigation";
import { guides, getGuide } from "@/content/guides";
import { PageHero } from "@/components/sections/PageHero";
import { InlineCta } from "@/components/sections/DetailBlocks";
import { buildMetadata, JsonLd, absUrl } from "@/lib/seo";
import { site } from "@/content/site";

export const dynamicParams = false;
export function generateStaticParams() { return guides.map((g) => ({ slug: g.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const g = getGuide((await params).slug);
  return g ? buildMetadata({ title: g.title, description: g.description, path: `/resources/${g.slug}` }) : {};
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const g = getGuide((await params).slug);
  if (!g) notFound();
  return (
    <>
      <PageHero plate={g.plate} crumbs={[{ name: "Resources", href: "/resources" }, { name: "Guide", href: `/resources/${g.slug}` }]} eyebrow={`Guide · ${g.readTime}`} title={g.title.split(":")[0]} italic={g.title.includes(":") ? g.title.split(":")[1].trim() : undefined} lede={g.description} />
      <article className="container-x grid gap-16 py-24 lg:grid-cols-12 lg:py-32">
        <aside className="lg:col-span-3"><nav aria-label="Contents" className="lg:sticky lg:top-28"><p className="ledger mb-4 text-bronze-ink">Contents</p><ol className="space-y-2 text-sm text-stone-ink">{g.sections.map((s, i) => <li key={s.h}><a href={`#s${i}`} className="hover:text-charcoal">{s.h}</a></li>)}</ol></nav></aside>
        <div className="max-w-2xl lg:col-span-8 lg:col-start-5">
          {g.sections.map((s, i) => (
            <section key={s.h} id={`s${i}`} className="scroll-mt-28 border-t border-line pt-10 [&:not(:first-child)]:mt-14">
              <h2 className="font-display text-[2.1rem] leading-tight">{s.h}</h2>
              <div className="prose-ngb mt-5 text-[1.0625rem]">{s.p.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}</div>
              {s.list && <ul className="mt-6 space-y-2.5">{s.list.map((l) => <li key={l} className="flex gap-3 leading-relaxed text-stone-ink"><span className="mt-2.5 h-1 w-3 shrink-0 bg-bronze" />{l}</li>)}</ul>}
            </section>
          ))}
          <p className="mt-16 border-t border-line pt-6 text-sm text-stone-ink">This guide is general information, not legal, tax or customs advice. Last updated {g.updated}. See also: <Link href="/tools/landed-cost-calculator" className="underline underline-offset-2">landed-cost estimator</Link> · <Link href="/tools/supplier-evaluation-checklist" className="underline underline-offset-2">supplier checklist</Link>.</p>
        </div>
      </article>
      <InlineCta title="Want help applying this to your product?" body="Send us a brief and we’ll outline a practical sourcing route." href="/enquire" label="Start a sourcing brief" />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: g.title, description: g.description, dateModified: g.updated, author: { "@type": "Organization", name: site.name }, publisher: { "@id": absUrl("/#organization") }, mainEntityOfPage: absUrl(`/resources/${g.slug}`) }} />
    </>
  );
}
