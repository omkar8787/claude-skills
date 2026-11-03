import { EnquiryBuilder } from "@/components/forms/EnquiryBuilder";
import { PageHero } from "@/components/sections/PageHero";
import { industries } from "@/content/industries";
import { products } from "@/content/products";
import { markets } from "@/content/markets";
import { clusters } from "@/content/clusters";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Start Your Sourcing Journey | Sourcing Enquiry", description: "Build a sourcing brief in five short steps (product, volume, market, compliance and contact) and NGB Ventures will respond with feasible manufacturing options in India.", path: "/enquire" });

export default function EnquirePage() {
  const prefill = {
    industries: Object.fromEntries(industries.map((i) => [i.slug, i.name])),
    products: Object.fromEntries(products.map((p) => [p.slug, { name: p.name, industry: p.industry }])),
    markets: Object.fromEntries(markets.map((m) => [m.slug, m.name === "United Arab Emirates" ? "United Arab Emirates" : m.name])),
    clusters: Object.fromEntries(clusters.map((c) => [c.slug, `${c.name}, ${c.state}`])),
  };
  return (
    <>
      <PageHero compact plate={{ slot: "page-enquire", motif: "fold", tone: "charcoal", alt: "Sourcing brief", brief: "Hands writing a product brief beside fabric swatches" }} crumbs={[{ name: "Start your sourcing journey", href: "/enquire" }]} eyebrow="Sourcing enquiry builder · 5 steps · about 3 minutes" title="Start your" italic="sourcing journey." lede="The more specific your brief, the more useful our response. Fields marked as required are the minimum we need." />
      <section className="container-x py-20 lg:py-28">
        <EnquiryBuilder prefill={prefill} />
      </section>
    </>
  );
}
