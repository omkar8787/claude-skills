"use client";
import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export type ClusterPoint = {
  slug: string;
  name: string;
  state: string;
  x: number;
  y: number;
  featured: boolean;
  specialization: string;
  summary: string;
  coord: string;
  products: string[];
  industries: { name: string; slug: string }[];
  gi?: string;
};

const W = 612;
const H = 696;
const LABEL_LEFT = new Set(["ludhiana", "panipat", "jaipur", "rajkot", "jalandhar"]);

export function ClusterExplorer({ points, map, initial = "tirupur", filterable = false }: { points: ClusterPoint[]; map: ReactNode; initial?: string; filterable?: boolean }) {
  const [active, setActive] = useState(initial);
  const [industry, setIndustry] = useState<string>("all");
  const current = points.find((p) => p.slug === active) ?? points[0];

  const industryOptions = useMemo(() => {
    const m = new Map<string, string>();
    points.forEach((p) => p.industries.forEach((i) => m.set(i.slug, i.name)));
    return [...m.entries()].sort((a, b) => a[1].localeCompare(b[1]));
  }, [points]);

  const visible = (p: ClusterPoint) => industry === "all" || p.industries.some((i) => i.slug === industry);

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-7">
        {filterable && (
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <label htmlFor="cluster-filter" className="ledger text-ivory/75">Filter by industry</label>
            <select id="cluster-filter" value={industry} onChange={(e) => setIndustry(e.target.value)} className="field max-w-xs py-2 text-sm">
              <option value="all">All industries</option>
              {industryOptions.map(([slug, name]) => <option key={slug} value={slug}>{name}</option>)}
            </select>
          </div>
        )}
        <div className="relative mx-auto aspect-[612/696] w-full max-w-[640px]">
          <div className="absolute inset-0">{map}</div>
          {/* routes from selected cluster to Pune (NGB base) */}
          <svg viewBox={`0 0 ${W} ${H}`} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
            {(() => {
              const pune = points.find((p) => p.slug === "pune");
              if (!pune || !current || current.slug === "pune") return null;
              const mx = (pune.x + current.x) / 2 - (current.y - pune.y) * 0.18;
              const my = (pune.y + current.y) / 2 + (current.x - pune.x) * 0.18;
              return <motion.path key={current.slug} d={`M${pune.x} ${pune.y} Q${mx} ${my} ${current.x} ${current.y}`} fill="none" stroke="#A98758" strokeWidth={1.2} strokeDasharray="2 5" strokeLinecap="round" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} />;
            })()}
          </svg>
          <ul className="absolute inset-0" aria-label="Manufacturing clusters">
            {points.map((p) => {
              const on = p.slug === active;
              const show = visible(p);
              const left = LABEL_LEFT.has(p.slug);
              return (
                <li key={p.slug} className="absolute" style={{ left: `${(p.x / W) * 100}%`, top: `${(p.y / H) * 100}%`, opacity: show ? 1 : 0.18, transition: "opacity .4s" }}>
                  <button
                    type="button"
                    onClick={() => setActive(p.slug)}
                    aria-pressed={on}
                    aria-label={`${p.name}, ${p.state}: ${p.specialization}`}
                    disabled={!show}
                    className="group absolute -translate-x-1/2 -translate-y-1/2 p-2.5 outline-none"
                  >
                    <span className={`relative block rounded-full transition-all duration-500 ${on ? "h-3.5 w-3.5 bg-bronze" : p.featured ? "h-2.5 w-2.5 bg-ivory group-hover:bg-bronze-soft" : "h-1.5 w-1.5 bg-ivory/60 group-hover:bg-bronze-soft"}`}>
                      {on && <span className="absolute -inset-2 animate-ping rounded-full border border-bronze/70" />}
                    </span>
                    {(p.featured || on) && (
                      <span className={`ledger pointer-events-none absolute top-1/2 hidden -translate-y-1/2 whitespace-nowrap text-[0.6rem] transition-colors sm:block ${left ? "right-full mr-1" : "left-full ml-1"} ${on ? "text-bronze-soft" : "text-ivory/75 group-hover:text-ivory"}`}>{p.name}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="ledger absolute bottom-0 left-0 text-[0.58rem] text-ivory/75">Indicative positions · Map data CC BY 4.0</p>
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <AnimatePresence mode="wait">
            <motion.div key={current.slug} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} aria-live="polite">
              <p className="ledger text-bronze-soft">{current.coord} · {current.state}</p>
              <h3 className="display mt-4 text-[clamp(3rem,6vw,5.5rem)]">{current.name}</h3>
              <p className="mt-2 font-display text-2xl italic text-ivory/80">{current.specialization}</p>
              <p className="mt-6 leading-relaxed text-ivory/70">{current.summary}</p>
              {current.gi && <p className="mt-4 border-l border-bronze/60 pl-4 text-sm text-ivory/75">{current.gi}</p>}
              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                <div>
                  <p className="ledger mb-3 text-ivory/75">Typical products</p>
                  <ul className="space-y-1.5 text-[0.95rem] text-ivory/80">{current.products.slice(0, 5).map((x) => <li key={x}>{x}</li>)}</ul>
                </div>
                <div>
                  <p className="ledger mb-3 text-ivory/75">Related industries</p>
                  <ul className="space-y-1.5 text-[0.95rem]">{current.industries.map((i) => <li key={i.slug}><Link href={`/industries/${i.slug}`} className="link-u text-ivory/80 hover:text-ivory">{i.name}</Link></li>)}</ul>
                </div>
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link href={`/manufacturing/${current.slug}`} className="btn btn-bronze">Explore {current.name} <ArrowUpRight className="h-4 w-4" /></Link>
                <Link href={`/quote?type=sourcing&cluster=${current.slug}`} className="btn btn-ghost">Source from here</Link>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-12">
            <p className="ledger mb-3 text-ivory/75">All clusters</p>
            <div className="flex flex-wrap gap-2">
              {points.filter(visible).map((p) => (
                <button key={p.slug} type="button" onClick={() => setActive(p.slug)} aria-pressed={p.slug === active} className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${p.slug === active ? "border-bronze bg-bronze text-charcoal" : "border-ivory/20 text-ivory/70 hover:border-ivory/60 hover:text-ivory"}`}>
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
