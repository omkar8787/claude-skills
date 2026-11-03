import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/content/types";

/** Ledger-style rows: deliberately different rhythm from the industry card grid. */
export function ServicesLedger({ items }: { items: Service[] }) {
  return (
    <ul className="border-t border-charcoal">
      {items.map((s) => (
        <li key={s.slug} className="border-b border-line">
          <Link href={`/services/${s.slug}`} className="group relative grid grid-cols-[3rem_1fr_auto] items-baseline gap-4 py-6 transition-colors duration-500 md:grid-cols-[5rem_1.1fr_1.4fr_auto] md:py-8">
            <span className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-charcoal transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-y-100" aria-hidden />
            <span className="ledger pl-1 text-stone-ink transition-colors group-hover:text-bronze-soft md:pl-4">{s.index}</span>
            <h3 className="font-display text-[1.7rem] leading-tight transition-colors group-hover:text-ivory md:text-[2.2rem]">{s.name}</h3>
            <p className="col-span-2 col-start-2 text-[0.95rem] leading-relaxed text-stone-ink transition-colors group-hover:text-ivory/70 md:col-span-1 md:col-start-auto">{s.short}</p>
            <span className="row-start-1 col-start-3 flex h-10 w-10 items-center justify-center rounded-full border border-line transition-all duration-500 group-hover:border-bronze group-hover:bg-bronze group-hover:text-charcoal md:col-start-auto md:row-start-auto md:mr-4"><ArrowUpRight className="h-4 w-4" /></span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
