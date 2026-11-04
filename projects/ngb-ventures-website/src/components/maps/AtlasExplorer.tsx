"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import geo from "@/content/geo/india-states.json";
import type { AtlasState } from "@/content/atlas";

type GiMini = { slug: string; name: string; status: string; applicationNo: string | null };
type Props = { states: AtlasState[]; gi: Record<string, GiMini>; clusterSlugs: string[]; initial?: string };

export function AtlasExplorer({ states, gi, clusterSlugs, initial = "up" }: Props) {
  const profiled = useMemo(() => new Map(states.map((s) => [s.id, s])), [states]);
  const [active, setActive] = useState<string>(initial);
  const [hover, setHover] = useState<string | null>(null);

  useEffect(() => {
    // Follow the URL hash on load and whenever it changes (e.g. a link to /atlas#tn from this same page).
    const sync = () => {
      const h = window.location.hash.replace("#", "");
      if (h && geo.states.some((s) => s.id === h)) setActive(h);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  const select = (id: string) => {
    setActive(id);
    try { history.replaceState(null, "", `#${id}`); } catch { /* ignore */ }
  };

  const current = profiled.get(active);
  const currentName = geo.states.find((s) => s.id === active)?.name ?? "";
  const hoverName = hover ? geo.states.find((s) => s.id === hover)?.name : null;

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
      <div className="min-w-0 lg:col-span-6">
        <div className="relative mx-auto aspect-[612/696] w-full max-w-[620px]">
          <svg viewBox={geo.viewBox} className="h-full w-full" role="group" aria-label="Map of India: select a state">
            {geo.states.map((s) => {
              const has = profiled.has(s.id);
              const on = s.id === active;
              return (
                <path
                  key={s.id}
                  d={s.d}
                  role={has ? "button" : undefined}
                  tabIndex={has ? 0 : undefined}
                  aria-label={has ? `${s.name}: show manufacturing profile` : undefined}
                  aria-pressed={has ? on : undefined}
                  onClick={() => select(s.id)}
                  onKeyDown={(e) => { if (has && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); select(s.id); } }}
                  onMouseEnter={() => setHover(s.id)}
                  onMouseLeave={() => setHover(null)}
                  className="cursor-pointer outline-none transition-[fill] duration-300 focus-visible:stroke-bronze"
                  style={{
                    fill: on ? "var(--color-bronze)" : has
                      ? `color-mix(in oklab, var(--color-bronze) ${hover === s.id ? 70 : 38}%, transparent)`
                      : `color-mix(in oklab, var(--color-ivory) ${hover === s.id ? 14 : 6}%, transparent)`,
                    stroke: "color-mix(in oklab, var(--color-ivory) 35%, transparent)",
                  }}
                  strokeWidth={on ? 1.2 : 0.6}
                  strokeLinejoin="round"
                />
              );
            })}
          </svg>
          <p className="ledger pointer-events-none absolute left-0 top-0 text-ivory/70" aria-hidden>{hoverName ?? "Select a state"}</p>
        </div>
        <div className="mx-auto max-w-[620px]">
          <div className="ledger mt-3 flex flex-wrap gap-4 text-[0.6rem] text-ivory/75">
            <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 bg-bronze/40" /> Profiled</span>
            <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 bg-ivory/10" /> Ask us</span>
            <span>Map: @svg-maps/india (CC BY 4.0) · indicative</span>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-2" aria-label="Profiled states">
          {states.map((s) => (
            <button key={s.id} type="button" onClick={() => select(s.id)} aria-pressed={s.id === active} className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${s.id === active ? "border-bronze bg-bronze text-charcoal" : "border-ivory/25 text-ivory/75 hover:border-ivory/60 hover:text-ivory"}`}>{s.name}</button>
          ))}
        </div>
      </div>

      <div className="min-w-0 lg:col-span-6" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
            {current ? (
              <div>
                <p className="ledger text-bronze-soft">State profile</p>
                <h2 className="display mt-3 text-[clamp(2.8rem,5vw,4.6rem)]">{current.name}</h2>
                <p className="mt-1 font-display text-2xl italic text-ivory/80">{current.tagline}</p>
                <p className="mt-6 max-w-xl leading-relaxed text-ivory/70">{current.summary}</p>

                <div className="mt-8 divide-y divide-ivory/10 border-y border-ivory/10">
                  {current.clusters.map((c) => (
                    <div key={c.name} className="flex items-baseline justify-between gap-4 py-3">
                      <div><p className="font-display text-xl">{c.name}</p><p className="text-sm text-ivory/75">{c.focus}</p></div>
                      {c.clusterSlug && clusterSlugs.includes(c.clusterSlug) && <Link href={`/manufacturing/${c.clusterSlug}`} className="ledger shrink-0 text-bronze-soft hover:text-ivory">Cluster guide →</Link>}
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  <div><p className="ledger mb-3 text-ivory/75">Traditional crafts</p><p className="text-[0.95rem] leading-relaxed text-ivory/80">{current.crafts.join(" · ")}</p></div>
                  <div><p className="ledger mb-3 text-ivory/75">Industrial capabilities</p><p className="text-[0.95rem] leading-relaxed text-ivory/80">{current.industrial.join(" · ")}</p></div>
                </div>

                {current.giSlugs.length > 0 && (
                  <div className="mt-8">
                    <p className="ledger mb-3 text-ivory/75">GI products from this region</p>
                    <ul className="flex flex-wrap gap-2">
                      {current.giSlugs.map((g) => gi[g] && (
                        <li key={g}><Link href={`/origin/${g}`} className="group inline-flex items-center gap-2 rounded-full border border-bronze/50 px-3 py-1.5 text-xs text-ivory hover:bg-bronze hover:text-charcoal">
                          {gi[g].name}<span className="text-ivory/75 group-hover:text-charcoal/70">{gi[g].status}</span></Link></li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-8"><p className="ledger mb-3 text-ivory/75">Sourcing ideas</p><ul className="space-y-1.5 text-[0.95rem] text-ivory/80">{current.sourcingIdeas.map((x) => <li key={x}>→ {x}</li>)}</ul></div>

                <div className="mt-10 rounded-sm border border-ivory/15 p-6">
                  <p className="font-display text-2xl">Looking for something from {current.name}?</p>
                  <p className="mt-2 text-sm text-ivory/75">These are research starting points, not existing NGB supplier relationships. Tell us what you need and we&apos;ll investigate.</p>
                  <Link href={`/quote?type=sourcing&region=${encodeURIComponent(current.name)}`} className="btn btn-bronze mt-5">Request sourcing from {current.name} <ArrowRight className="arrow h-4 w-4" /></Link>
                </div>
              </div>
            ) : (
              <div>
                <p className="ledger text-bronze-soft">Not yet profiled</p>
                <h2 className="display mt-3 text-[clamp(2.6rem,5vw,4.2rem)]">{currentName}</h2>
                <p className="mt-6 max-w-xl leading-relaxed text-ivory/70">We haven&apos;t published a profile for {currentName} yet, but every Indian state has its own manufacturing story. Tell us what you&apos;re looking for, and we&apos;ll research suppliers and clusters there.</p>
                <Link href={`/quote?type=sourcing&region=${encodeURIComponent(currentName)}`} className="btn btn-bronze mt-8">Ask about {currentName} <ArrowUpRight className="h-4 w-4" /></Link>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
