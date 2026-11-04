"use client";
import { Children, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/** Parallax wrapper for hero background. */
export function HeroParallax({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.02, 1.06]);
  const reduce = useReducedMotion();
  return (
    <div ref={ref} className="absolute inset-0 -z-10 overflow-hidden">
      <motion.div className="absolute inset-0" style={reduce ? undefined : { y, scale }}>{children}</motion.div>
    </div>
  );
}

/** Cross-fading plate carousel (auto, pausable, captioned). */
export function PlateCycle({ children, captions, interval = 5200 }: { children: ReactNode; captions: string[]; interval?: number }) {
  const items = Children.toArray(children);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (paused || reduce) return;
    const t = setInterval(() => setI((x) => (x + 1) % items.length), interval);
    return () => clearInterval(t);
  }, [paused, reduce, items.length, interval]);
  return (
    <div className="relative h-full w-full" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <AnimatePresence initial={false}>
        <motion.div key={i} className="absolute inset-0" initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}>
          {items[i]}
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-x-0 bottom-0 z-10 flex items-center gap-4 p-5">
        <div className="flex gap-1.5">
          {items.map((_, k) => (
            <button key={k} type="button" aria-label={`Show plate ${k + 1}: ${captions[k]}`} aria-current={k === i} onClick={() => setI(k)} className="relative h-6 w-8">
              <span className="absolute inset-x-0 top-1/2 h-px bg-ivory/30"><span className={`block h-full bg-ivory ${k === i && !paused && !reduce ? "animate-[grow_5.2s_linear]" : ""}`} style={{ width: k === i ? "100%" : "0%" }} /></span>
            </button>
          ))}
        </div>
        <p className="ledger truncate text-ivory/80" aria-live="polite">PL. {String(i + 1).padStart(2, "0")} — {captions[i]}</p>
      </div>
      <style>{`@keyframes grow{from{width:0}to{width:100%}}`}</style>
    </div>
  );
}
