import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Industry } from "@/content/types";
import { Plate } from "@/components/ui/Plate";
import { Reveal } from "@/components/ui/Reveal";

/** Asymmetric editorial grid: every 5th card spans wider; heights alternate for rhythm. */
export function IndustryGrid({ items, compact = false }: { items: Industry[]; compact?: boolean }) {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4 lg:gap-y-16">
      {items.map((it, i) => {
        const wide = !compact && (i === 0 || i === 7 || i === 10);
        const tall = !compact && i % 2 === 1;
        return (
          <Reveal as="li" key={it.slug} delay={(i % 4) * 0.06} className={wide ? "col-span-2" : ""}>
            <Link href={`/industries/${it.slug}`} className="group block">
              <div className={`relative overflow-hidden ${wide ? "aspect-[16/10]" : tall ? "aspect-[3/4.2]" : "aspect-[3/3.6]"}`}>
                <div className="absolute inset-0 transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]">
                  <Plate plate={it.plate} className="h-full w-full" sizes="(min-width:1024px) 25vw, 50vw" />
                </div>
                <span className="ledger absolute left-4 top-4 text-ivory/80 mix-blend-difference">{it.index}</span>
                <span className="absolute right-3 top-3 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-ivory text-charcoal opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"><ArrowUpRight className="h-4 w-4" /></span>
                <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-charcoal/90 to-transparent p-4 pt-12 text-sm leading-relaxed text-ivory/85 transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0 max-md:hidden">{it.short}</div>
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-3 border-t border-line pt-3">
                <h3 className="font-display text-[1.35rem] leading-tight md:text-[1.6rem]"><span className="link-u">{it.name}</span></h3>
              </div>
              {!compact && <p className="mt-1.5 hidden text-sm leading-relaxed text-stone-ink md:block">{it.products.slice(0, 3).join(" · ")}</p>}
            </Link>
          </Reveal>
        );
      })}
    </ul>
  );
}
