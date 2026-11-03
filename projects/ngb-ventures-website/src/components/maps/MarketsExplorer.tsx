"use client";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export type RegionPoint = { id: string; label: string; x: number; y: number; markets: { slug: string; name: string; line: string; trade: string }[] };

export function MarketsExplorer({ w, h, origin, regions, base }: { w: number; h: number; origin: { x: number; y: number }; regions: RegionPoint[]; base: ReactNode }) {
  const [active, setActive] = useState(regions[0].id);
  const r = regions.find((x) => x.id === active)!;
  return (
    <div>
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: `${w}/${h}` }}>
        <div className="absolute inset-0">{base}</div>
        <svg viewBox={`0 0 ${w} ${h}`} className="absolute inset-0 h-full w-full" aria-hidden>
          {regions.map((g) => {
            const dist = Math.hypot(g.x - origin.x, g.y - origin.y); const lift = Math.min(170, dist * 0.32);
            const d = `M${origin.x} ${origin.y} Q${(origin.x + g.x) / 2} ${Math.min(origin.y, g.y) - lift} ${g.x} ${g.y}`;
            const on = g.id === active;
            return (
              <g key={g.id}>
                <motion.path d={d} fill="none" stroke={on ? "#C9AD85" : "rgba(169,135,88,.45)"} strokeWidth={on ? 1.6 : 1} strokeDasharray={on ? "0" : "2 5"} strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }} />
              </g>
            );
          })}
          <circle cx={origin.x} cy={origin.y} r={5} fill="#A98758" />
          <circle cx={origin.x} cy={origin.y} r={5} fill="none" stroke="#A98758" style={{ animation: "pulse-ring 2.4s ease-out infinite" }} />
        </svg>
        <span className="ledger pointer-events-none absolute text-[0.6rem] text-bronze-soft" style={{ left: `${(origin.x / w) * 100}%`, top: `${(origin.y / h) * 100}%`, transform: "translate(10px, 6px)" }}>India · JNPT</span>
        {regions.map((g) => (
          <button key={g.id} type="button" onClick={() => setActive(g.id)} aria-pressed={g.id === active} className="group absolute -translate-x-1/2 -translate-y-1/2 p-3" style={{ left: `${(g.x / w) * 100}%`, top: `${(g.y / h) * 100}%` }}>
            <span className={`block rounded-full transition-all duration-500 ${g.id === active ? "h-3.5 w-3.5 bg-bronze ring-4 ring-bronze/25" : "h-2.5 w-2.5 bg-ivory group-hover:bg-bronze-soft"}`} />
            <span className={`ledger absolute hidden whitespace-nowrap text-[0.6rem] sm:block ${g.id === "uk" ? "bottom-full right-1/2 mb-0.5" : g.id === "eu" ? "left-full top-1/2 ml-1 -translate-y-1/2" : "left-1/2 top-full -translate-x-1/2"} ${g.id === active ? "text-bronze-soft" : "text-ivory/75"}`}>{g.label}</span>
            <span className="sr-only">{g.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-12">
        <div className="flex gap-2 overflow-x-auto scrollbar-none lg:col-span-4 lg:flex-col lg:overflow-visible" role="tablist" aria-label="Regions">
          {regions.map((g) => (
            <button key={g.id} role="tab" aria-selected={g.id === active} onClick={() => setActive(g.id)} className={`flex shrink-0 items-baseline justify-between gap-6 border-b py-3 text-left transition-colors lg:w-full ${g.id === active ? "border-bronze text-ivory" : "border-ivory/10 text-ivory/75 hover:text-ivory"}`}>
              <span className="font-display text-2xl">{g.label}</span>
              <span className="ledger hidden text-ivory/75 lg:inline">{g.markets.length ? `${g.markets.length} ${g.markets.length > 1 ? "guides" : "guide"}` : "on request"}</span>
            </button>
          ))}
        </div>
        <div className="lg:col-span-8" role="tabpanel">
          <AnimatePresence mode="wait">
            <motion.div key={r.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="grid gap-px overflow-hidden rounded-sm bg-ivory/10 sm:grid-cols-2">
              {r.markets.length === 0 && (
                <Link href="/quote?type=sourcing&country=Singapore" className="group flex flex-col justify-between bg-charcoal p-6 transition-colors hover:bg-ink-2 sm:col-span-2 md:p-8">
                  <div><p className="font-display text-3xl">{r.label}</p><p className="mt-3 text-[0.95rem] leading-relaxed text-ivory/65">Singapore, Malaysia, Vietnam, Thailand, Indonesia and the Philippines. We support buyers across the region on request. A dedicated market guide is in preparation.</p></div>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-bronze-soft">Discuss a Southeast Asia shipment <ArrowUpRight className="h-4 w-4" /></span>
                </Link>
              )}
              {r.markets.map((m) => (
                <Link key={m.slug} href={`/markets/${m.slug}`} className="group flex flex-col justify-between bg-charcoal p-6 transition-colors hover:bg-ink-2 md:p-8">
                  <div>
                    <p className="font-display text-3xl">{m.name}</p>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-ivory/65">{m.line}</p>
                    <p className="mt-4 text-sm leading-relaxed text-ivory/75">{m.trade.split(". ")[0]}.</p>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-bronze-soft">Sourcing for {m.name} <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>
          <p className="mt-6 text-sm text-ivory/75">NGB Ventures operates from Pune, India, and supports buyers in these markets remotely. We do not have offices outside India.</p>
        </div>
      </div>
    </div>
  );
}
