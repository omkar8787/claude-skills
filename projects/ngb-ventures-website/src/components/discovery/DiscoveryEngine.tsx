"use client";
import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, RotateCcw, Search } from "lucide-react";

export type DItem = { slug: string; name: string; state: string; category: string; material: string; giStatus: string; cluster: string; customizable: boolean; type: string; story: string; href: string };
const GI_LABEL: Record<string, string> = { "registered-gi": "Registered GI", "reported-gi": "Reported GI (unverified)", traditional: "Traditional product", industrial: "Manufactured category" };

export function DiscoveryEngine({ items, plates }: { items: DItem[]; plates: Record<string, ReactNode> }) {
  const [q, setQ] = useState("");
  const [f, setF] = useState({ state: "", category: "", gi: "", type: "", custom: false });
  const opts = useMemo(() => ({
    state: [...new Set(items.map((i) => i.state))].sort(),
    category: [...new Set(items.map((i) => i.category))].sort(),
    type: [...new Set(items.map((i) => i.type))].sort(),
  }), [items]);
  const shown = items.filter((i) =>
    (!q || `${i.name} ${i.material} ${i.cluster} ${i.story} ${i.category}`.toLowerCase().includes(q.toLowerCase())) &&
    (!f.state || i.state === f.state) && (!f.category || i.category === f.category) && (!f.gi || i.giStatus === f.gi) && (!f.type || i.type === f.type) && (!f.custom || i.customizable));
  const reset = () => { setQ(""); setF({ state: "", category: "", gi: "", type: "", custom: false }); };

  return (
    <div>
      <div className="sticky top-[72px] z-20 -mx-5 border-b border-line bg-ivory/95 px-5 py-5 backdrop-blur lg:top-20 lg:mx-0 lg:px-0">
        <div className="grid gap-4 lg:grid-cols-12 lg:items-end">
          <label className="relative lg:col-span-4"><span className="field-label">Search</span><Search className="absolute bottom-3.5 right-0 h-4 w-4 text-stone-ink" aria-hidden /><input className="field pr-6" value={q} onChange={(e) => setQ(e.target.value)} placeholder="brass, silk, toys, coir…" /></label>
          {([["state", "State"], ["category", "Category"], ["type", "Product type"]] as const).map(([k, l]) => (
            <label key={k} className="lg:col-span-2"><span className="field-label">{l}</span><select className="field" value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })}><option value="">All</option>{opts[k].map((o) => <option key={o}>{o}</option>)}</select></label>
          ))}
          <label className="lg:col-span-2"><span className="field-label">GI status</span><select className="field" value={f.gi} onChange={(e) => setF({ ...f, gi: e.target.value })}><option value="">All</option>{Object.entries(GI_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></label>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
          <label className="chip"><input type="checkbox" className="sr-only" checked={f.custom} onChange={(e) => setF({ ...f, custom: e.target.checked })} />Customisable only</label>
          <span className="ledger text-stone-ink" aria-live="polite">{shown.length} of {items.length} shown</span>
          <button type="button" onClick={reset} className="inline-flex items-center gap-1 text-stone-ink underline"><RotateCcw className="h-3.5 w-3.5" /> Reset</button>
        </div>
      </div>
      <h2 className="sr-only">Products</h2>
      <motion.ul layout className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        <AnimatePresence>
          {shown.map((i) => (
            <motion.li layout key={i.slug} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
              <Link href={i.href} className="group block">
                <div className="relative aspect-[4/4.6] overflow-hidden"><div className="absolute inset-0 transition-transform duration-[1.3s] group-hover:scale-105">{plates[i.slug]}</div>
                  <span className={`ledger absolute left-3 top-3 rounded-full px-2.5 py-1 text-[0.58rem] ${i.giStatus === "registered-gi" ? "bg-bronze text-charcoal" : "bg-ivory/90 text-charcoal"}`}>{GI_LABEL[i.giStatus]}</span></div>
                <p className="ledger mt-4 text-bronze-ink">{i.cluster} · {i.state}</p>
                <h3 className="mt-1 font-display text-[1.6rem] leading-tight"><span className="link-u">{i.name}</span></h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-stone-ink">{i.story}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold">{i.href.startsWith("/quote") ? "Source this" : "Explore"} <ArrowUpRight className="h-4 w-4" /></span>
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
      {shown.length === 0 && (
        <div className="mt-12 rounded-sm bg-paper p-10 text-center"><p className="font-display text-3xl">Nothing matches, but that doesn&apos;t mean India doesn&apos;t make it.</p><Link href={`/quote?type=sourcing&product=${encodeURIComponent(q)}`} className="btn btn-primary mt-6">Ask us to source it</Link></div>
      )}
    </div>
  );
}
