import { notFound } from "next/navigation";
import { clusters, getCluster, formatCoord } from "@/content/clusters";
import { industries } from "@/content/industries";
import { PageHero } from "@/components/sections/PageHero";
import { IntroBlock, NumberedList, TwoLists, WorkflowStrip } from "@/components/sections/DetailBlocks";
import { IndustryGrid } from "@/components/sections/IndustryGrid";
import { ClusterCards } from "@/components/sections/CardLists";
import { ClusterMap } from "@/components/maps/ClusterMap";
import { CtaBand } from "@/components/sections/CtaBand";
import { buildMetadata, JsonLd, placeLd } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() { return clusters.map((c) => ({ slug: c.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCluster((await params).slug);
  return c ? buildMetadata({ title: `${c.name} Manufacturers & Sourcing, ${c.state}`, description: `Sourcing from ${c.name}, ${c.state}: ${c.summary} Cluster guide, typical products, buyer considerations and sourcing support by NGB Ventures.`, path: `/manufacturing/${c.slug}` }) : {};
}

export default async function ClusterPage({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCluster((await params).slug);
  if (!c) notFound();
  const inds = industries.filter((i) => c.industrySlugs.includes(i.slug));
  const nearby = clusters.filter((x) => x.slug !== c.slug && x.industrySlugs.some((s) => c.industrySlugs.includes(s))).slice(0, 3);
  const enquire = `/enquire?cluster=${c.slug}`;
  return (
    <>
      <PageHero plate={c.plate} plateLabel={formatCoord(c.lat, c.lon)} crumbs={[{ name: "Manufacturing network", href: "/manufacturing" }, { name: c.name, href: `/manufacturing/${c.slug}` }]} eyebrow={`Manufacturing cluster · ${c.state}`} title={c.name} italic={c.specialization + "."} lede={c.summary}
        ctas={[{ label: `Source from ${c.name}`, href: enquire }, { label: "View on the map", href: "#map", variant: "ghost" }]}
        meta={[{ k: "State", v: c.state }, { k: "Coordinates", v: formatCoord(c.lat, c.lon) }, { k: "Specialisation", v: c.specialization }, { k: "GI registration", v: c.gi ? "Yes (see below)" : "Not applicable / not listed" }]} />
      <IntroBlock eyebrow="Cluster profile" title={<>{c.name}: <em>{c.specialization.toLowerCase()}</em></>} paragraphs={[...c.detail, ...(c.gi ? [c.gi + " GI registrations can be checked in the Geographical Indications Registry of India."] : [])]} aside={[{ k: "Location", v: `${c.name}, ${c.state}, India` }, { k: "Known for", v: c.specialization }, { k: "Industries", v: inds.map((i) => i.name).join(" · ") }]} />
      <NumberedList eyebrow="Typical products" title={<>Made in <em>{c.name}</em></>} items={c.products} />
      <TwoLists a={{ eyebrow: "Buyer notes", title: "Before you source here", items: c.buyerNotes }} b={{ eyebrow: "How we help", title: "Our role", items: ["Shortlisting manufacturers suited to your product and volume", "Verifying registrations and certificates", "Coordinating samples and pre-production approval", "Inline and pre-shipment inspections", "Export documentation and forwarder handover"] }} />
      <section id="map" className="on-dark scroll-mt-20 bg-charcoal py-24 text-ivory lg:py-32"><div className="container-x"><p className="eyebrow mb-6">On the map</p><h2 className="display mb-14 text-[clamp(2.2rem,4vw,3.5rem)]">{c.name} in India’s <em>network</em></h2><ClusterMap initial={c.slug} /></div></section>
      <section className="container-x py-24"><p className="eyebrow mb-6">Related industries</p><h2 className="display mb-12 text-[clamp(2.2rem,4vw,3.5rem)]">Industries served</h2><IndustryGrid items={inds} compact /></section>
      {nearby.length > 0 && <section className="border-t border-line py-24"><div className="container-x"><p className="eyebrow mb-6">Compare</p><h2 className="display mb-12 text-[clamp(2.2rem,4vw,3.5rem)]">Related <em>clusters</em></h2><ClusterCards items={nearby} /></div></section>}
      <WorkflowStrip enquireHref={enquire} />
      <CtaBand title={`Interested in ${c.name}? Let's discuss your product.`} />
      <JsonLd data={placeLd({ name: c.name, state: c.state, lat: c.lat, lon: c.lon, summary: c.summary, path: `/manufacturing/${c.slug}` })} />
    </>
  );
}
