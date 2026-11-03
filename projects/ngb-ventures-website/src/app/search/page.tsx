import { SiteSearch } from "@/components/search/SiteSearch";
import { buildSearchIndex } from "@/lib/search-index";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Search", description: "Search NGB Ventures: products, regions, GI products, industries, guides and stories about sourcing from India.", path: "/search", noindex: true });

export default function SearchPage() {
  return (
    <>
      <section className="on-dark tone-light bg-charcoal pb-14 pt-32 text-ivory lg:pt-40">
        <div className="container-x"><p className="eyebrow mb-6">Search</p><h1 className="display text-[clamp(2.6rem,6vw,5rem)]">What are you <em>looking for?</em></h1></div>
      </section>
      <section className="container-x min-h-[60svh] pb-24 pt-12"><SiteSearch docs={buildSearchIndex()} /></section>
    </>
  );
}
