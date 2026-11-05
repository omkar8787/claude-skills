"use client";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search, ArrowUpRight } from "lucide-react";
import type { SearchDoc } from "@/lib/search-index";
import { track } from "@/lib/runtime-config";

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
const SUGGEST = ["spices", "brass", "gift hampers", "millets", "tea", "block print", "leather", "Moradabad", "organic cotton", "machined parts", "Diwali", "jute bags"];

/** Weighted token search: title hits beat keyword hits beat description hits. */
function rank(docs: SearchDoc[], q: string) {
  const terms = norm(q).split(/\s+/).filter((t) => t.length > 1);
  if (!terms.length) return [];
  return docs
    .map((d) => {
      const t = norm(d.t), x = norm(d.x), ds = norm(d.d);
      let score = 0;
      for (const term of terms) {
        const s = (t.includes(term) ? 6 + (t.startsWith(term) ? 3 : 0) : 0) + (x.includes(term) ? 3 : 0) + (ds.includes(term) ? 2 : 0);
        if (!s) return { d, score: 0 };
        score += s;
      }
      return { d, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 40)
    .map((r) => r.d);
}

export function SiteSearch({ docs }: { docs: SearchDoc[] }) {
  const [q, setQ] = useState("");
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("q");
    if (p) setQ(p);
    input.current?.focus();
  }, []);
  const results = useMemo(() => rank(docs, q), [docs, q]);
  useEffect(() => {
    const id = setTimeout(() => {
      try { history.replaceState(null, "", q ? `?q=${encodeURIComponent(q)}` : window.location.pathname); } catch { /* ignore */ }
      if (q.trim().length > 2) track("search", { search_term: q.trim() });
    }, 600);
    return () => clearTimeout(id);
  }, [q]);

  return (
    <div>
      <form role="search" onSubmit={(e) => e.preventDefault()} className="relative">
        <label htmlFor="site-q" className="sr-only">Search the site</label>
        <Search className="pointer-events-none absolute left-0 top-1/2 h-6 w-6 -translate-y-1/2 text-stone-ink" />
        <input ref={input} id="site-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products, regions, guides…" autoComplete="off"
          className="w-full border-0 border-b border-charcoal/30 bg-transparent py-4 pl-10 font-display text-[clamp(1.6rem,4vw,2.6rem)] outline-none focus:border-bronze" />
      </form>
      {!q && (
        <div className="mt-8"><p className="ledger mb-3 text-stone-ink">Popular searches</p>
          <div className="flex flex-wrap gap-2">{SUGGEST.map((s) => <button key={s} type="button" className="chip" onClick={() => setQ(s)}>{s}</button>)}</div></div>
      )}
      {q && (
        <div className="mt-10" aria-live="polite">
          <p className="ledger mb-4 text-stone-ink">{results.length ? `${results.length} result${results.length > 1 ? "s" : ""}` : "No results"}</p>
          {results.length > 0 ? (
            <ul className="divide-y divide-line border-y border-line">
              {results.map((r) => (
                <li key={r.h + r.t}><Link href={r.h} className="group grid gap-1 py-5 sm:grid-cols-[9rem_1fr_auto] sm:items-baseline sm:gap-6">
                  <span className="ledger text-bronze-ink">{r.k}</span>
                  <span><span className="font-display text-2xl leading-tight group-hover:text-bronze-ink">{r.t}</span><span className="mt-1 block text-[0.95rem] leading-relaxed text-stone-ink">{r.d}</span></span>
                  <ArrowUpRight className="hidden h-5 w-5 text-stone-ink sm:block" />
                </Link></li>
              ))}
            </ul>
          ) : (
            <div className="rounded-sm border border-line bg-paper p-8">
              <p className="font-display text-3xl">Not on the site yet? We can still help.</p>
              <p className="mt-3 max-w-xl leading-relaxed text-stone-ink">If India makes it, we can research it. Tell us what you&apos;re looking for and we&apos;ll come back with an honest view.</p>
              <Link href={`/quote?type=sourcing&product=${encodeURIComponent(q)}`} className="btn btn-primary mt-6">Source &ldquo;{q}&rdquo; from India</Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
