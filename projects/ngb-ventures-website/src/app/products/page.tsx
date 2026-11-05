import Link from "next/link";
import { products } from "@/content/products";
import { industries } from "@/content/industries";
import { PageHero } from "@/components/sections/PageHero";
import { ProductCards } from "@/components/sections/CardLists";
import { CtaBand } from "@/components/sections/CtaBand";
import { buildMetadata, JsonLd, itemListLd } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Products | Product Sourcing Guides for India", description: "Product-level sourcing guides for cotton T-shirts, organic cotton bags, jute bags, natural loofah, brass home décor, wooden handicrafts, bamboo products, essential oils and cotton towels from India.", path: "/products" });

export default function ProductsPage() {
  const grouped = industries.map((i) => ({ i, items: products.filter((p) => p.industry === i.slug) })).filter((g) => g.items.length);
  return (
    <>
      <PageHero plate={{ slot: "page-products", motif: "fold", tone: "sand", alt: "Product samples on a studio table", brief: "Product samples arranged on a studio table" }} crumbs={[{ name: "Products", href: "/products" }]} eyebrow={`${products.length} product guides`} title="Product" italic="guides." lede="Detailed guides to specific products: variants, specifications to include in your brief, customisation, quality checks, compliance and minimum order quantity (MOQ) considerations." ctas={[{ label: "Request a product we haven't listed", href: "/quote" }]} />
      <section className="container-x py-24 lg:py-32"><ProductCards items={products} /></section>
      <section className="border-t border-line bg-paper py-20"><div className="container-x"><p className="eyebrow mb-8">By industry</p><div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">{grouped.map((g) => <div key={g.i.slug}><Link href={`/industries/${g.i.slug}`} className="font-display text-2xl link-u">{g.i.name}</Link><ul className="mt-3 space-y-1.5 text-sm text-stone-ink">{g.items.map((p) => <li key={p.slug}><Link href={`/products/${p.slug}`} className="hover:text-charcoal">{p.name}</Link></li>)}</ul></div>)}</div>
        <p className="mt-12 max-w-2xl text-sm text-stone-ink">More product guides are being added. Every guide is written with original information rather than generated templates. Don’t see your product? <Link href="/quote" className="underline underline-offset-2">Send us a brief</Link>.</p></div></section>
      <CtaBand />
      <JsonLd data={itemListLd("Product guides", products.map((p) => ({ name: p.name, href: `/products/${p.slug}` })))} />
    </>
  );
}
