import { clusters } from "@/content/clusters";
import { PageHero } from "@/components/sections/PageHero";
import { ClusterMap } from "@/components/maps/ClusterMap";
import { ClusterCards } from "@/components/sections/CardLists";
import { CtaBand } from "@/components/sections/CtaBand";
import { buildMetadata, JsonLd, itemListLd } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Manufacturing Network | India's Industrial Clusters Map", description: "Interactive map of India's manufacturing clusters, including Tirupur, Ludhiana, Jaipur, Moradabad, Saharanpur, Rajkot, Surat, Panipat, Agra, Pune, Sivakasi and Khambhat, with specialisations and sourcing guides.", path: "/manufacturing" });

export default function ManufacturingPage() {
  return (
    <>
      <PageHero plate={{ slot: "page-manufacturing", motif: "blueprint", tone: "charcoal", alt: "Indian manufacturing cluster", brief: "Aerial of an industrial cluster at dusk" }} crumbs={[{ name: "Manufacturing network", href: "/manufacturing" }]} eyebrow={`${clusters.length} clusters mapped`} title="Manufacturing" italic="network." lede="India’s manufacturing is organised in specialised clusters. Explore where products are made, what each town is known for, and which industries they serve." ctas={[{ label: "Explore the map", href: "#map" }, { label: "Source from a cluster", href: "/quote", variant: "ghost" }]} />
      <section id="map" className="on-dark scroll-mt-20 bg-charcoal py-24 text-ivory lg:py-32"><div className="container-x"><p className="eyebrow mb-6">Cluster explorer</p><h2 className="display mb-14 text-[clamp(2.2rem,4.4vw,4rem)]">Filter by industry. <em>Select a town.</em></h2><ClusterMap initial="tirupur" filterable /></div></section>
      <section className="container-x py-24 lg:py-32"><p className="eyebrow mb-6">Featured clusters</p><h2 className="display mb-14 text-[clamp(2.2rem,4.4vw,4rem)]">Cluster <em>guides</em></h2><ClusterCards items={clusters.filter((c) => c.featured)} /></section>
      <section className="border-t border-line bg-paper py-24"><div className="container-x"><p className="eyebrow mb-6">More clusters</p><h2 className="display mb-14 text-[clamp(2.2rem,4vw,3.5rem)]">Specialist <em>towns</em></h2><ClusterCards items={clusters.filter((c) => !c.featured)} /></div></section>
      <section className="container-x py-16"><p className="max-w-3xl text-sm leading-relaxed text-stone-ink">Cluster specialisations reflect widely documented industrial profiles. GI references can be checked in the Geographical Indications Registry of India. Map positions are indicative. Base map: <em>@svg-maps/india</em> by Victor Cazanave (CC BY 4.0). NGB Ventures does not own manufacturing facilities in these clusters; we coordinate with independent manufacturers.</p></section>
      <CtaBand />
      <JsonLd data={itemListLd("Manufacturing clusters", clusters.map((c) => ({ name: c.name, href: `/manufacturing/${c.slug}` })))} />
    </>
  );
}
