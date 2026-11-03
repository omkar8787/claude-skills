import { atlasStates } from "@/content/atlas";
import { giProducts, giStatusLabel } from "@/content/gi";
import { clusters } from "@/content/clusters";
import { AtlasExplorer } from "@/components/maps/AtlasExplorer";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { buildMetadata, JsonLd, itemListLd } from "@/lib/seo";

export const metadata = buildMetadata({ title: "India Manufacturing Atlas | Clusters, Crafts & GI Products by State", description: "An interactive map of India's manufacturing clusters, traditional crafts, GI products and industrial capabilities, state by state, with sourcing requests for each region.", path: "/atlas" });

export default function AtlasPage() {
  const gi = Object.fromEntries(giProducts.map((g) => [g.slug, { slug: g.slug, name: g.shortName, status: giStatusLabel[g.status], applicationNo: g.applicationNo }]));
  return (
    <>
      <PageHero compact plate={{ slot: "page-atlas", motif: "route", tone: "forest", alt: "India Manufacturing Atlas", brief: "" }} crumbs={[{ name: "India Manufacturing Atlas", href: "/atlas" }]} eyebrow="Signature feature" title="India Manufacturing" italic="Atlas." lede="Select a state to explore its clusters, crafts, GI products and industrial capabilities, then ask us to source from the region." />
      <section className="on-dark tone-light bg-charcoal py-20 text-ivory lg:py-28"><div className="container-x"><AtlasExplorer states={atlasStates} gi={gi} clusterSlugs={clusters.map((c) => c.slug)} initial="up" /></div></section>
      <section className="container-x py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4"><p className="eyebrow mb-6">Method</p><h2 className="display text-[clamp(2rem,3.6vw,3.2rem)]">How to read <em>the Atlas.</em></h2></div>
          <div className="prose-ngb lg:col-span-7 lg:col-start-6">
            <p>State profiles summarise widely documented regional manufacturing and craft specialisations. GI products link to records in our Origin Collection, each with its registry details, confidence level and sources.</p>
            <p>The Atlas shows where capability is concentrated. It isn&apos;t a list of NGB suppliers or partners. Every sourcing request is researched and verified for that project.</p>
            <p>The base map comes from the open-source @svg-maps/india dataset (CC BY 4.0). It shows boundaries as published in that dataset and may not reflect the latest administrative changes (for example, Ladakh as a separate Union Territory). It isn&apos;t to scale.</p>
          </div>
        </div>
      </section>
      <CtaBand title="Looking for something from a specific region? Tell us." />
      <JsonLd data={itemListLd("India Manufacturing Atlas states", atlasStates.map((s) => ({ name: s.name, href: `/atlas#${s.id}` })))} />
    </>
  );
}
