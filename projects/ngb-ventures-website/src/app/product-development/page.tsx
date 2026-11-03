import { ProductDevelopmentForm } from "@/components/forms/ProductDevelopmentForm";
import { PageHero } from "@/components/sections/PageHero";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Product Development Request | Manufacture Your Product in India", description: "Have a product idea? Describe it — from rough idea to full tech pack — and NGB Ventures will help explore materials, manufacturers, prototypes and costs in India.", path: "/product-development" });

export default function ProductDevelopmentPage() {
  return (
    <>
      <PageHero compact plate={{ slot: "service-product-development", motif: "fold", tone: "clay", alt: "Product prototypes and sketches", brief: "Prototypes and sketches" }} crumbs={[{ name: "Product development request", href: "/product-development" }]} eyebrow="Product development" title="Have a product idea?" italic="Let’s manufacture it in India." lede="Tell us about the product you want made. It doesn’t need to be finished, only clear enough for us to explore materials, techniques and manufacturers." />
      <section className="container-x grid gap-16 py-20 lg:grid-cols-12 lg:py-28">
        <div className="lg:col-span-7"><ProductDevelopmentForm /></div>
        <aside className="lg:col-span-4 lg:col-start-9"><div className="space-y-8 lg:sticky lg:top-28">
          <div><p className="ledger text-bronze-ink">What happens next</p><ol className="mt-4 space-y-4 text-[0.95rem] leading-relaxed text-stone-ink">{["We review your brief and ask clarifying questions.", "If needed, we propose an NDA before you share detailed designs.", "We outline feasible materials, clusters and a sampling plan.", "You decide whether to proceed with a scoped engagement."].map((s, i) => <li key={s} className="flex gap-4"><span className="ledger pt-1 text-stone-ink">0{i + 1}</span>{s}</li>)}</ol></div>
          <div className="border-l-2 border-bronze bg-paper p-6 text-sm leading-relaxed text-stone-ink">Please don’t upload confidential drawings through this form. Share links only, and we’ll arrange a secure channel once an NDA is in place.</div>
        </div></aside>
      </section>
    </>
  );
}
