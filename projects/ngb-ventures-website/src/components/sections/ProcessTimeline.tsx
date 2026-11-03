"use client";
import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";

type Step = { n: string; title: string; body: string; output: string };

/** Scroll-linked vertical timeline: progress line fills, active step highlights. */
export function ProcessTimeline({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length)))));

  return (
    <ol ref={ref} className="relative">
      <div className="absolute bottom-0 left-[1.15rem] top-0 w-px bg-line md:left-[calc(33.333%+1.15rem)]" aria-hidden>
        <motion.div className="h-full w-full origin-top bg-bronze" style={{ scaleY }} />
      </div>
      {steps.map((s, i) => {
        const on = i <= active;
        return (
          <li key={s.n} className="relative grid gap-4 pb-14 last:pb-0 md:grid-cols-3 md:gap-0 md:pb-20">
            <div className="hidden pr-12 text-right md:block">
              <p className={`ledger pt-2 transition-colors duration-500 ${on ? "text-bronze-ink" : "text-stone-ink"}`}>Output · {s.output}</p>
            </div>
            <div className="relative pl-14 md:col-span-2">
              <span className={`absolute left-0 top-0 flex h-[2.3rem] w-[2.3rem] items-center justify-center rounded-full border font-mono text-[0.7rem] transition-all duration-500 md:-left-0 ${on ? "border-bronze bg-charcoal text-ivory" : "border-line bg-ivory text-stone-ink"}`}>{s.n}</span>
              <h3 className={`font-display text-[clamp(1.75rem,3vw,2.6rem)] leading-tight transition-opacity duration-500 ${on ? "opacity-100" : "opacity-60"}`}>{s.title}</h3>
              <p className="mt-3 max-w-xl leading-relaxed text-stone-ink">{s.body}</p>
              <p className="ledger mt-4 text-bronze-ink md:hidden">Output · {s.output}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
