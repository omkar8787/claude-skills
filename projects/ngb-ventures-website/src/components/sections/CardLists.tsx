import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Cluster, Product } from "@/content/types";
import { Plate } from "@/components/ui/Plate";
import { formatCoord } from "@/content/clusters";

export function ClusterCards({ items, dark }: { items: Cluster[]; dark?: boolean }) {
  const n = items.length;
  const cols = n === 1 ? "sm:grid-cols-2 lg:grid-cols-2" : n === 2 || n === 4 ? (n === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2") : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <ul className={`grid gap-6 ${cols}`}>
      {items.map((c) => (
        <li key={c.slug}>
          <Link href={`/manufacturing/${c.slug}`} className="group block">
            <div className="relative aspect-[4/3] overflow-hidden"><div className="absolute inset-0 transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"><Plate plate={c.plate} className="h-full w-full" sizes="33vw" label={formatCoord(c.lat, c.lon)} /></div></div>
            <div className={`mt-4 flex items-start justify-between gap-4 border-t pt-3 ${dark ? "border-ivory/15" : "border-line"}`}>
              <div><p className="ledger text-bronze-ink">{c.state}</p><h3 className="mt-1 font-display text-3xl"><span className="link-u">{c.name}</span></h3><p className={`mt-1 text-sm ${dark ? "text-ivory/60" : "text-stone-ink"}`}>{c.specialization}</p></div>
              <ArrowUpRight className="mt-2 h-4 w-4 shrink-0 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function ProductCards({ items }: { items: Product[] }) {
  return (
    <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p, i) => (
        <li key={p.slug}>
          <Link href={`/products/${p.slug}`} className="group block">
            <div className={`relative overflow-hidden ${i % 3 === 1 ? "aspect-[4/5]" : "aspect-[4/4.4]"}`}><div className="absolute inset-0 transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"><Plate plate={p.plate} className="h-full w-full" sizes="33vw" /></div></div>
            <div className="mt-4 border-t border-line pt-3">
              <h3 className="font-display text-[1.9rem] leading-tight"><span className="link-u">{p.name}</span></h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-ink">{p.heroLine}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
