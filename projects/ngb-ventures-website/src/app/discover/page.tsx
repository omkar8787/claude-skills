import { discoveryItems } from "@/content/discovery";
import { DiscoveryEngine } from "@/components/discovery/DiscoveryEngine";
import { PageHero } from "@/components/sections/PageHero";
import { Plate } from "@/components/ui/Plate";
import { CtaBand } from "@/components/sections/CtaBand";
import { buildMetadata, JsonLd, itemListLd } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Indian Product Discovery | Explore Products Made in India", description: "Filter Indian products by state, category, material, GI status, manufacturing cluster and customisation, then send a sourcing request for anything you find.", path: "/discover" });

export default function Discover() {
  const plates = Object.fromEntries(discoveryItems.map((i) => [i.slug, <Plate key={i.slug} plate={i.plate} className="h-full w-full" sizes="25vw" />]));
  return (
    <>
      <PageHero compact plate={{ slot: "page-discover", motif: "dots", tone: "charcoal", alt: "Product discovery", brief: "" }} crumbs={[{ name: "Product Discovery", href: "/discover" }]} eyebrow="Product Discovery Engine" title="Product" italic="discovery." lede="An index of products with genuine sourcing potential in India. Filter by state, category, GI status or product type. This is a starting point, not a stock catalogue: every item leads to a guide or a sourcing request." />
      <section className="container-x pb-24 pt-10">
        <DiscoveryEngine items={discoveryItems.map(({ plate, stateId, ...rest }) => { void plate; void stateId; return rest; })} plates={plates} />
        <p className="mt-16 max-w-3xl text-sm leading-relaxed text-stone-ink">Listing a product here doesn&apos;t mean it&apos;s in stock or that NGB has an existing supplier for it. GI badges reflect our research status: &ldquo;Registered GI&rdquo; is drawn from registry records, while &ldquo;Reported GI&rdquo; comes from secondary sources and still needs verification.</p>
      </section>
      <CtaBand title="Can't find your product? Request a sourcing proposal." />
      <JsonLd data={itemListLd("Indian product discovery", discoveryItems.map((i) => ({ name: i.name, href: i.href.startsWith("/") && !i.href.startsWith("/quote") ? i.href : "/discover" })))} />
    </>
  );
}
