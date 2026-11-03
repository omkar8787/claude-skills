"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/**
 * Brand Studio: one product, four stages, from factory sample to a sell-ready listing.
 * "Ember & Loom" is a fictional concept brand; nothing here represents client work, prices or reviews.
 */
const STAGES = [
  { key: "sample", n: "01", label: "Factory sample", title: "It starts as a good product.", body: "A hand-hammered brass tumbler from Moradabad. Beautiful craft, but in a brown carton with a SKU number, it's invisible to a buyer scrolling a marketplace." },
  { key: "position", n: "02", label: "Positioning", title: "Then it gets a reason to exist.", body: "Who is it for, and why this one? We define the customer, the promise and the proof, before anyone designs a logo." },
  { key: "identity", n: "03", label: "Identity & packaging", title: "Then a face people remember.", body: "Name, wordmark, palette and packaging built for the channel: unboxing for D2C, shelf impact for retail, a clear first image for marketplaces." },
  { key: "launch", n: "04", label: "Ready to sell", title: "Finally, a listing that converts.", body: "Title, imagery, benefit-led copy and brand content, prepared for Amazon, your own store or wholesale buyers, then supported with advertising." },
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;
const INK = "#16262b";
const BRASS = "#c9a063";

function Cup({ size = 1, engraved = false }: { size?: number; engraved?: boolean }) {
  return (
    <svg viewBox="0 0 120 160" style={{ width: 120 * size, height: 160 * size }} aria-hidden>
      <defs>
        <linearGradient id={`brass-${engraved}`} x1="0" x2="1">
          <stop offset="0" stopColor="#8a6430" /><stop offset=".35" stopColor="#e6c58c" /><stop offset=".6" stopColor="#c9a063" /><stop offset="1" stopColor="#7a5726" />
        </linearGradient>
      </defs>
      <ellipse cx="60" cy="152" rx="40" ry="5" fill="rgba(0,0,0,.18)" />
      <path d="M18 14 L28 146 Q30 152 38 152 L82 152 Q90 152 92 146 L102 14 Z" fill={`url(#brass-${engraved})`} />
      <ellipse cx="60" cy="14" rx="42" ry="8" fill="#e9cf9f" stroke="#a37a3f" strokeWidth="1" />
      <ellipse cx="60" cy="15" rx="36" ry="5.5" fill="#6f4f22" opacity=".55" />
      {Array.from({ length: 34 }).map((_, i) => (
        <circle key={i} cx={30 + ((i * 37) % 60)} cy={34 + ((i * 53) % 108)} r={2.2 + (i % 3) * 0.6} fill="#fff4dc" opacity={0.18 + (i % 4) * 0.05} />
      ))}
      {engraved && <g><circle cx="60" cy="86" r="15" fill="none" stroke="#5e4219" strokeWidth="1.1" /><text x="60" y="90" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontSize="11" fill="#5e4219">E&amp;L</text></g>}
    </svg>
  );
}

function Scene({ stage }: { stage: number }) {
  if (stage === 0) {
    return (
      <div className="relative flex h-full items-center justify-center bg-[#d9cbb2]">
        <div className="absolute inset-0 opacity-40 [background-image:repeating-linear-gradient(90deg,rgba(120,90,50,.08)_0_2px,transparent_2px_14px)]" />
        <div className="relative flex items-end gap-6 sm:gap-10">
          <div className="relative h-36 w-40 rounded-[3px] bg-[#b89a6c] shadow-[0_20px_40px_-20px_rgba(60,40,10,.6)] sm:h-44 sm:w-52">
            <div className="absolute inset-x-0 top-1/2 h-6 -translate-y-1/2 bg-[#a98b5d]" />
            <p className="absolute bottom-3 left-3 font-mono text-[0.6rem] uppercase tracking-[0.15em] text-[#3f3018]">SKU 0427 · 12 pcs<br />Fragile</p>
          </div>
          <Cup size={0.95} />
        </div>
        <p className="absolute bottom-4 left-5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[#3f3018]/80">No name · No story · No listing</p>
      </div>
    );
  }
  if (stage === 1) {
    return (
      <div className="relative grid h-full grid-cols-1 items-center gap-6 bg-[#e8dcc6] p-6 sm:grid-cols-[auto_1fr] sm:p-10">
        <div className="hidden justify-center sm:flex"><Cup size={1.05} /></div>
        <div className="space-y-3">
          {[["Customer", "Design-led home bars in the UK and EU"], ["Promise", "Hand-hammered in Moradabad, made to last a lifetime"], ["Proof", "Named artisan cluster · food-safe lining · tested finish"], ["Price tier", "Premium gifting, set by the brand"]].map(([k, v], i) => (
            <motion.div key={k} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 * i, duration: 0.5, ease: EASE }} className="rounded-sm border border-[#16262b]/15 bg-[#f6efe2] px-4 py-3">
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-[#7a5c33]">{k}</p>
              <p className="mt-1 text-[0.92rem] leading-snug text-[#16262b]">{v}</p>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }
  if (stage === 2) {
    return (
      <div className="relative h-full overflow-hidden" style={{ background: INK }}>
        <div className="absolute -right-16 top-1/2 h-[140%] w-[70%] -translate-y-1/2 rounded-full opacity-25" style={{ background: `radial-gradient(closest-side, ${BRASS}, transparent)` }} />
        <div className="relative grid h-full grid-cols-1 items-center gap-6 p-6 sm:grid-cols-2 sm:p-10">
          <div className="text-[#f3eadb]">
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-[#c9a063]">Wordmark</p>
            <p className="mt-2 font-display text-[clamp(2.2rem,5vw,3.4rem)] italic leading-none">Ember &amp; Loom</p>
            <p className="mt-3 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[#f3eadb]/70">Hand-hammered brass · Moradabad</p>
            <div className="mt-6 flex gap-2" aria-label="Brand palette">{[INK, BRASS, "#f3eadb", "#8a3b2a"].map((c) => <span key={c} className="h-7 w-7 rounded-full ring-1 ring-white/20" style={{ background: c }} />)}</div>
          </div>
          <div className="flex items-end justify-center gap-4">
            <div className="relative flex h-40 w-32 flex-col items-center justify-center rounded-[3px] bg-[#f3eadb] shadow-[0_30px_50px_-20px_rgba(0,0,0,.6)] sm:h-48 sm:w-36">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#16262b]/40 font-display text-lg italic text-[#16262b]">E&amp;L</span>
              <span className="mt-3 font-display text-base italic text-[#16262b]">Ember &amp; Loom</span>
              <span className="absolute bottom-3 font-mono text-[0.5rem] uppercase tracking-[0.2em] text-[#7a5c33]">Set of two</span>
            </div>
            <Cup size={0.85} engraved />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="relative flex h-full items-center justify-center bg-[#ece6dc] p-4 sm:p-8">
      <div className="grid w-full max-w-[34rem] grid-cols-[38%_1fr] gap-4 rounded-md bg-white p-4 shadow-[0_30px_60px_-30px_rgba(22,38,43,.45)] sm:gap-5 sm:p-5">
        <div className="flex aspect-square items-center justify-center rounded-sm bg-[#f4f1ec]"><Cup size={0.7} engraved /></div>
        <div className="min-w-0">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-[#7a5c33]">Ember &amp; Loom</p>
          <p className="mt-1 text-[0.86rem] font-semibold leading-snug text-[#16262b]">Hand-Hammered Brass Tumblers, Set of 2. Food-Safe Lined, Gift Boxed</p>
          <ul className="mt-2 space-y-1 text-[0.72rem] leading-snug text-[#3d4b4f]">
            <li>• Hammered by hand in Moradabad, India</li><li>• Lined for everyday drinks</li><li>• Arrives in a keepsake box</li>
          </ul>
          <span className="mt-3 inline-block rounded-full bg-[#16262b] px-3 py-1 text-[0.65rem] font-semibold text-[#f3eadb]">Add to basket</span>
        </div>
        <div className="col-span-2 flex items-center justify-between rounded-sm px-4 py-3 text-[#f3eadb]" style={{ background: INK }}>
          <span className="font-display text-sm italic">Made by hand. Made to last.</span><span className="font-mono text-[0.5rem] uppercase tracking-[0.2em] text-[#c9a063]">Brand story module</span>
        </div>
      </div>
    </div>
  );
}

export function BrandStudio() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const reduce = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = box.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.4 });
    io.observe(el); return () => io.disconnect();
  }, []);
  const playing = auto && visible && !reduce;
  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => setI((x) => (x + 1) % STAGES.length), 5200);
    return () => clearTimeout(t);
  }, [i, playing]);
  const pick = (n: number) => { setAuto(false); setI(n); };
  const s = STAGES[i];

  return (
    <figure ref={box} className="overflow-hidden rounded-md border border-line bg-paper shadow-[0_40px_80px_-50px_rgba(22,38,43,.45)]">
      <div role="tablist" aria-label="Brand building stages" className="grid grid-cols-4 border-b border-line">
        {STAGES.map((st, n) => (
          <button key={st.key} role="tab" type="button" aria-selected={n === i} aria-controls="studio-panel" id={`studio-tab-${n}`} onClick={() => pick(n)}
            className={`relative px-2 py-4 text-left transition-colors duration-500 sm:px-5 ${n === i ? "bg-ivory" : "hover:bg-ivory/60"}`}>
            <span className={`ledger block ${n === i ? "text-bronze-ink" : "text-stone-ink"}`}>{st.n}</span>
            <span className={`mt-1 hidden text-sm font-semibold sm:block ${n === i ? "text-charcoal" : "text-stone-ink"}`}>{st.label}</span>
            <span className="absolute inset-x-0 bottom-0 h-[2px] bg-line">
              {n === i && <motion.span key={`${i}-${playing}`} className="block h-full origin-left bg-bronze" initial={{ scaleX: playing ? 0 : 1 }} animate={{ scaleX: 1 }} transition={{ duration: playing ? 5.2 : 0, ease: "linear" }} />}
              {n < i && <span className="block h-full bg-bronze/60" />}
            </span>
          </button>
        ))}
      </div>
      <div id="studio-panel" role="tabpanel" aria-labelledby={`studio-tab-${i}`} className="grid lg:grid-cols-[1.35fr_1fr]">
        <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[4/3] lg:aspect-auto lg:min-h-[26rem]">
          <AnimatePresence mode="wait">
            <motion.div key={s.key} className="absolute inset-0" initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.99 }} transition={{ duration: 0.6, ease: EASE }}>
              <Scene stage={i} />
            </motion.div>
          </AnimatePresence>
          <span className="ledger absolute bottom-3 right-3 rounded-full bg-black/55 px-2.5 py-1 text-[0.55rem] text-white">Concept</span>
        </div>
        <div className="flex flex-col justify-between gap-8 p-6 sm:p-8 lg:p-10">
          <AnimatePresence mode="wait">
            <motion.div key={s.key} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.45, ease: EASE }}>
              <p className="ledger text-bronze-ink">Stage {s.n} · {s.label}</p>
              <h3 className="mt-4 font-display text-[clamp(1.9rem,3vw,2.6rem)] leading-[1.05]">{s.title}</h3>
              <p className="mt-4 leading-relaxed text-stone-ink">{s.body}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex items-center justify-between gap-4">
            <button type="button" onClick={() => setAuto((a) => !a)} className="ledger text-stone-ink underline-offset-4 hover:underline">{playing ? "Pause" : "Play"}</button>
            <div className="flex gap-2">
              <button type="button" aria-label="Previous stage" onClick={() => pick((i + STAGES.length - 1) % STAGES.length)} className="flex h-10 w-10 items-center justify-center rounded-full border border-line hover:border-charcoal">←</button>
              <button type="button" aria-label="Next stage" onClick={() => pick((i + 1) % STAGES.length)} className="flex h-10 w-10 items-center justify-center rounded-full border border-line hover:border-charcoal">→</button>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="border-t border-line px-6 py-4 text-[0.8rem] leading-relaxed text-stone-ink sm:px-8"><strong className="font-semibold text-charcoal">Concept demonstration.</strong> &ldquo;Ember &amp; Loom&rdquo; is a fictional brand created to show our process. It isn&apos;t client work, and no prices or reviews are implied.</figcaption>
    </figure>
  );
}
