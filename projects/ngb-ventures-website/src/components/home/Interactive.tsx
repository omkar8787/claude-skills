"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Children, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { ArrowRight, ArrowUpRight, MoveHorizontal } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

function useIsDesktop() {
  const [d, setD] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setD(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return d;
}

/* ───────── 1. Hero mosaic: multi-layer parallax tiles ───────── */
const TILE_POS = [
  "col-start-1 col-span-3 row-start-1 row-span-3",
  "col-start-4 col-span-3 row-start-2 row-span-2",
  "col-start-2 col-span-2 row-start-4 row-span-2",
  "col-start-4 col-span-2 row-start-4 row-span-3",
  "col-start-1 col-span-1 row-start-5 row-span-1",
  "col-start-6 col-span-1 row-start-1 row-span-1",
];
/** Parallax depth per hero tile (px over the hero's scroll). Kept small and desktop-only for a calm, premium feel. */
const SPEEDS = [-24, -48, -12, -36, -56, -18];

export function HeroMosaic({ children, captions }: { children: ReactNode; captions: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const desktop = useIsDesktop();
  const still = reduce || !desktop;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const items = Children.toArray(children);
  return (
    <div ref={ref} className="relative grid aspect-[6/6.4] w-full grid-cols-6 grid-rows-6 gap-2.5 md:gap-3.5">
      {items.map((child, i) => (
        <Tile key={i} progress={scrollYProgress} speed={still ? 0 : SPEEDS[i]} className={TILE_POS[i]} delay={0.15 + i * 0.08} caption={captions[i]}>
          {child}
        </Tile>
      ))}
    </div>
  );
}

function Tile({ children, progress, speed, className, delay, caption }: { children: ReactNode; progress: MotionValue<number>; speed: number; className: string; delay: number; caption?: string }) {
  const y = useTransform(progress, [0, 1], [0, speed]);
  return (
    <motion.figure style={{ y }} className={`group relative overflow-hidden ${className}`}>
      <motion.div className="absolute inset-0" initial={{ clipPath: "inset(100% 0 0 0)" }} animate={{ clipPath: "inset(0% 0 0 0)" }} transition={{ duration: 1.3, delay, ease: EASE }}>
        <div className="absolute inset-0 transition-transform duration-[1.6s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]">{children}</div>
      </motion.div>
      {caption && <figcaption className="tone-reset ledger pointer-events-none absolute bottom-2 left-2.5 text-[0.55rem] text-ivory/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:opacity-100">{caption}</figcaption>}
    </motion.figure>
  );
}

/* ───────── 2. Parallel scrolling columns + manifesto ───────── */
export function ParallelManifesto({ lines, left, right }: { lines: string[]; left: ReactNode; right: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const desktop = useIsDesktop();
  const still = reduce || !desktop;
  // Two columns drift gently in opposite directions (±~100px over the whole section), desktop only.
  const yA = useTransform(scrollYProgress, [0, 1], still ? [0, 0] : [40, -110]);
  const yB = useTransform(scrollYProgress, [0, 1], still ? [0, 0] : [-90, 50]);
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.max(0, Math.min(lines.length - 1, Math.floor((v - 0.2) * lines.length * 1.6)))));
  return (
    <div ref={ref} className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-[22vh]">
          <p className="eyebrow mb-8">One country. Thousands of possibilities.</p>
          <h2 className="display text-[clamp(2.4rem,4.6vw,4.4rem)]">
            {lines.map((l, i) => (
              <span key={l} className={`block transition-colors duration-700 ${i === lines.length - 1 ? "italic" : ""} ${i <= active ? (i === lines.length - 1 ? "text-bronze-ink" : "text-charcoal") : "text-charcoal/55"}`}>{l}</span>
            ))}
          </h2>
          <p className="lede mt-8 max-w-md">From centuries-old craft clusters to modern export factories, India makes almost everything. The hard part is knowing where, and who. That&apos;s the part we do.</p>
        </div>
      </div>
      <div className="grid h-[34rem] grid-cols-2 gap-3 overflow-hidden sm:h-[44rem] lg:col-span-7 lg:h-[56rem] md:gap-4">
        <motion.div style={{ y: yA }} className="flex flex-col gap-3 md:gap-4">{left}</motion.div>
        <motion.div style={{ y: yB }} className="flex flex-col gap-3 pt-24 md:gap-4">{right}</motion.div>
      </div>
    </div>
  );
}

/* ───────── 3. Pinned journey: SOURCE → … → EXPORT ───────── */
type Stage = { key: string; label: string; title: string; body: string };
export function PinnedJourney({ stages, plates, mobilePlates }: { stages: Stage[]; plates: ReactNode[]; mobilePlates: ReactNode[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(stages.length - 1, Math.floor(v * stages.length * 0.999))));
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <>
      <ol className="space-y-10 lg:hidden">
        {stages.map((s, i) => (
          <li key={s.key} className="grid grid-cols-[5.5rem_1fr] gap-5">
            <div className="relative aspect-square overflow-hidden">{mobilePlates[i]}</div>
            <div><p className="ledger text-bronze-soft">{String(i + 1).padStart(2, "0")} · {s.label}</p><h3 className="mt-2 font-display text-[1.7rem] leading-tight">{s.title}</h3><p className="mt-2 text-[0.95rem] leading-relaxed text-ivory/70">{s.body}</p></div>
          </li>
        ))}
      </ol>
      <div ref={ref} style={{ height: `${stages.length * 85}vh` }} className="relative hidden lg:block">
        <div className="sticky top-0 flex h-screen items-center">
          <div className="grid w-full grid-cols-12 items-center gap-12">
            <div className="col-span-5">
              <ol className="flex flex-wrap gap-x-3 gap-y-2" aria-label="Journey stages">
                {stages.map((s, i) => (
                  <li key={s.key} className={`ledger flex items-center gap-3 transition-colors duration-500 ${i === active ? "text-bronze-soft" : i < active ? "text-ivory/70" : "text-ivory/75"}`}>
                    {s.label}{i < stages.length - 1 && <span aria-hidden>→</span>}
                  </li>
                ))}
              </ol>
              <div className="mt-6 h-px w-full bg-ivory/15"><motion.div className="h-px origin-left bg-bronze" style={{ scaleX: bar }} /></div>
              <div className="relative mt-12 min-h-[18rem]" aria-live="polite">
                <AnimatePresence mode="wait">
                  <motion.div key={active} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.55, ease: EASE }}>
                    <p aria-hidden className="ledger text-bronze-soft">Stage {String(active + 1).padStart(2, "0")} of {String(stages.length).padStart(2, "0")}</p>
                    <h3 className="display mt-5 text-[clamp(2.6rem,4vw,4.2rem)]">{stages[active].title}</h3>
                    <p className="mt-5 max-w-md text-[1.0625rem] leading-relaxed text-ivory/70">{stages[active].body}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            <div className="relative col-span-6 col-start-7 aspect-[4/4.4] overflow-hidden">
              {plates.map((p, i) => (
                <motion.div key={i} className="absolute inset-0" animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.08 }} transition={{ duration: 0.9, ease: EASE }} aria-hidden={i !== active}>{p}</motion.div>
              ))}
              <p className="tone-reset ledger absolute right-4 top-4 z-10 text-ivory/80">{stages[active].label}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ───────── 4. Horizontal spotlight gallery ───────── */
export type SpotCard = { slug: string; name: string; meta: string; story: string; href: string; cta: string };
export function HorizontalSpotlight({ cards, plates }: { cards: SpotCard[]; plates: ReactNode[] }) {
  const desktop = useIsDesktop();
  const reduce = useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  useEffect(() => {
    const measure = () => { if (track.current) setDist(Math.max(0, track.current.scrollWidth - window.innerWidth + 64)); };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [desktop]);
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);

  const list = (
    <div ref={track} className={`flex gap-5 md:gap-7 ${desktop && !reduce ? "pl-[max(1.25rem,calc((100vw-1520px)/2+4rem))] pr-16" : "snap-x snap-mandatory overflow-x-auto px-5 pb-6 scrollbar-none md:px-10"}`}>
      {cards.map((c, i) => (
        <Link key={c.slug} href={c.href} className="group relative w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[30vw] xl:w-[26vw]">
          <div className="relative aspect-[4/5] overflow-hidden"><div className="absolute inset-0 transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105">{plates[i]}</div>
            <span className="tone-reset ledger absolute left-4 top-4 text-ivory/80">{String(i + 1).padStart(2, "0")} / {String(cards.length).padStart(2, "0")}</span></div>
          <p className="ledger mt-5 text-bronze-soft">{c.meta}</p>
          <h3 className="mt-2 font-display text-[1.9rem] leading-tight text-ivory">{c.name}</h3>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-ivory/65">{c.story}</p>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ivory">{c.cta} <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
        </Link>
      ))}
    </div>
  );

  const pinned = desktop && !reduce;
  return (
    <div ref={wrap} style={pinned ? { height: `calc(100vh + ${dist}px)` } : undefined} className="relative">
      {!pinned && <p className="ledger mb-4 flex items-center gap-2 px-5 text-ivory/75 md:px-10"><MoveHorizontal className="h-4 w-4" /> Swipe to explore</p>}
      <div className={pinned ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden" : ""} onMouseMove={pinned ? (e) => setCursor({ x: e.clientX, y: e.clientY }) : undefined} onMouseLeave={() => setCursor(null)}>
        <motion.div style={pinned ? { x } : undefined}>{list}</motion.div>
        {pinned && cursor && (
          <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-30 flex h-20 w-20 items-center justify-center rounded-full bg-bronze text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-charcoal" animate={{ x: cursor.x - 40, y: cursor.y - 40 }} transition={{ type: "spring", stiffness: 400, damping: 35, mass: 0.4 }}>
            Source
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ───────── 5. Source anything quick-start ───────── */
const CATS = ["Not sure yet", "Home décor & handicrafts", "Textiles & apparel", "Furniture", "Kitchen & tableware", "Beauty & essential oils", "Eco-friendly products", "Packaging & print", "Engineering & components", "Food & agri", "Other"];
const COUNTRIES = ["United States", "United Kingdom", "Germany", "France", "Netherlands", "UAE", "Australia", "Canada", "Singapore", "Other"];
export function SourceQuickStart() {
  const router = useRouter();
  const [v, setV] = useState({ product: "", category: CATS[0], country: COUNTRIES[0], qty: "" });
  const go = (e: React.FormEvent) => {
    e.preventDefault();
    const p = new URLSearchParams({ type: "sourcing", product: v.product, category: v.category, country: v.country, qty: v.qty });
    router.push(`/quote?${p.toString()}`);
  };
  return (
    <form onSubmit={go} className="on-dark grid gap-6 md:grid-cols-12" aria-label="Start a sourcing request">
      <div className="md:col-span-12">
        <label htmlFor="qs-product" className="field-label">What are you looking for?</label>
        <input id="qs-product" required minLength={3} className="field text-xl md:text-2xl" placeholder="e.g. 2,000 hammered brass whiskey cups with our logo" value={v.product} onChange={(e) => setV({ ...v, product: e.target.value })} />
      </div>
      <div className="md:col-span-4"><label htmlFor="qs-cat" className="field-label">Category</label><select id="qs-cat" className="field" value={v.category} onChange={(e) => setV({ ...v, category: e.target.value })}>{CATS.map((c) => <option key={c}>{c}</option>)}</select></div>
      <div className="md:col-span-4"><label htmlFor="qs-country" className="field-label">Ship to</label><select id="qs-country" className="field" value={v.country} onChange={(e) => setV({ ...v, country: e.target.value })}>{COUNTRIES.map((c) => <option key={c}>{c}</option>)}</select></div>
      <div className="md:col-span-4"><label htmlFor="qs-qty" className="field-label">Estimated quantity</label><input id="qs-qty" inputMode="numeric" className="field" placeholder="e.g. 2000" value={v.qty} onChange={(e) => setV({ ...v, qty: e.target.value })} /></div>
      <div className="flex flex-wrap items-center justify-between gap-4 md:col-span-12">
        <p className="text-sm text-ivory/75">Next step: add a budget, customisation details and a reference image. It takes about 60 seconds.</p>
        <button type="submit" className="btn btn-bronze">Continue my request <ArrowRight className="arrow h-4 w-4" /></button>
      </div>
    </form>
  );
}

/* ───────── 6. Divisions with hover preview ───────── */
export function DivisionList({ items, previews }: { items: { slug: string; index: string; name: string; kicker: string; headline: string; route: string }[]; previews: ReactNode[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return (
    <div className="relative" onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}>
      <ul className="border-t border-charcoal">
        {items.map((d, i) => (
          <li key={d.slug} className="border-b border-line" onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
            <Link href={d.route} className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-4 py-7 md:grid-cols-[5rem_1fr_1fr_auto] md:py-9">
              <span className="ledger text-bronze-ink">{d.index}</span>
              <span><span className="ledger block text-stone-ink">{d.kicker}</span><span className="mt-1 block font-display text-[2rem] leading-tight transition-transform duration-500 group-hover:translate-x-2 md:text-[2.8rem]">{d.name}</span></span>
              <span className="col-span-2 col-start-2 text-[0.98rem] leading-relaxed text-stone-ink md:col-span-1 md:col-start-auto">{d.headline}</span>
              <span className="row-start-1 col-start-3 flex h-11 w-11 items-center justify-center rounded-full border border-line transition-all duration-500 group-hover:border-charcoal group-hover:bg-charcoal group-hover:text-ivory md:col-start-auto md:row-start-auto"><ArrowUpRight className="h-4 w-4" /></span>
            </Link>
          </li>
        ))}
      </ul>
      <AnimatePresence>
        {hover !== null && (
          <motion.div key="pv" className="pointer-events-none fixed left-0 top-0 z-30 hidden h-56 w-44 overflow-hidden lg:block" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1, x: pos.x + 24, y: pos.y - 110 }} exit={{ opacity: 0, scale: 0.85 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
            {previews[hover]}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
