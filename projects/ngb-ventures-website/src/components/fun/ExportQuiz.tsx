"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, X, RotateCcw, ArrowRight } from "lucide-react";
import type { Fact } from "@/content/facts";
import { track } from "@/lib/runtime-config";
import { ShareBar } from "@/components/social/ShareBar";

const EASE = [0.22, 1, 0.36, 1] as const;
const ROUND = 6;

/** "Export IQ": a six-card true/false trivia round. Accessible buttons, live-region feedback, no data stored. */
export function ExportQuiz({ facts }: { facts: Fact[] }) {
  const reduce = useReducedMotion();
  const [seed, setSeed] = useState(0);
  const [order, setOrder] = useState<number[]>(() => facts.slice(0, ROUND).map((_, i) => i));
  useEffect(() => {
    // Shuffle after mount so server and client markup match.
    const idx = facts.map((_, i) => i);
    for (let i = idx.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; }
    setOrder(idx.slice(0, ROUND));
  }, [facts, seed]);
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const done = step >= ROUND;
  const f = useMemo(() => facts[order[Math.min(step, ROUND - 1)]], [facts, order, step]);

  const answer = (v: boolean) => {
    if (picked !== null) return;
    setPicked(v);
    if (v === f.answer) setScore((s) => s + 1);
    if (step === 0) track("quiz_start", { quiz: "export_iq" });
  };
  const next = () => {
    const last = step + 1 >= ROUND;
    setPicked(null); setStep((s) => s + 1);
    if (last) track("quiz_complete", { quiz: "export_iq", score: score });
  };
  const restart = () => { setSeed((x) => x + 1); setStep(0); setScore(0); setPicked(null); };
  const correct = picked !== null && picked === f.answer;
  const verdict = score >= 5 ? "Export expert." : score >= 3 ? "Seasoned trader." : "Fresh off the boat.";

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-5 flex items-center justify-between">
        <p className="ledger text-bronze-soft">{done ? "Your score" : `Question ${step + 1} of ${ROUND}`}</p>
        <div className="flex gap-1.5" aria-hidden>{Array.from({ length: ROUND }).map((_, i) => <span key={i} className={`h-1.5 w-6 rounded-full transition-colors duration-500 ${i < step ? "bg-bronze" : i === step && !done ? "bg-ivory/60" : "bg-ivory/15"}`} />)}</div>
      </div>
      <div className="relative min-h-[22rem] [perspective:1400px]">
        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div key={`${seed}-${step}`} initial={reduce ? { opacity: 0 } : { opacity: 0, rotateX: -12, y: 24 }} animate={{ opacity: 1, rotateX: 0, y: 0 }} exit={reduce ? { opacity: 0 } : { opacity: 0, rotateX: 10, y: -16 }} transition={{ duration: 0.55, ease: EASE }}
              className="shine rounded-md border border-ivory/15 bg-ivory/[0.04] p-7 shadow-[0_40px_80px_-40px_rgba(0,0,0,.6)] backdrop-blur-sm sm:p-10">
              <p className="ledger text-ivory/60">True or false?</p>
              <p className="mt-4 font-display text-[clamp(1.7rem,3.4vw,2.4rem)] leading-[1.15]">{f.statement}</p>
              {picked === null ? (
                <div className="mt-8 grid grid-cols-2 gap-3">
                  <button type="button" onClick={() => answer(true)} className="btn btn-bronze w-full">True</button>
                  <button type="button" onClick={() => answer(false)} className="btn btn-ghost w-full">False</button>
                </div>
              ) : (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE }} className="mt-8" aria-live="polite">
                  <p className={`flex items-center gap-2 font-semibold ${correct ? "text-bronze-soft" : "text-ivory"}`}>
                    <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full ${correct ? "bg-bronze text-charcoal" : "bg-ivory/15"}`}>{correct ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}</span>
                    {correct ? "Correct!" : "Not quite."} It&apos;s {f.answer ? "true" : "false"}.
                  </p>
                  <p className="mt-3 leading-relaxed text-ivory/80">{f.explain}</p>
                  <p className="ledger mt-3 text-[0.6rem] text-ivory/60">Source: {f.source}</p>
                  <button type="button" onClick={next} className="btn btn-bronze mt-6">{step + 1 >= ROUND ? "See my score" : "Next question"} <ArrowRight className="arrow h-4 w-4" /></button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: EASE }} className="rounded-md border border-ivory/15 bg-ivory/[0.04] p-7 text-center sm:p-10" aria-live="polite">
              <p className="font-display text-[clamp(4rem,10vw,6.5rem)] leading-none">{score}<span className="text-ivory/40">/{ROUND}</span></p>
              <p className="mt-3 font-display text-2xl italic text-bronze-soft">{verdict}</p>
              <p className="mx-auto mt-4 max-w-md leading-relaxed text-ivory/75">India has stories behind almost everything it makes. Want to turn one into your next product?</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/quote" className="btn btn-bronze">Source from India <ArrowRight className="arrow h-4 w-4" /></Link>
                <button type="button" onClick={restart} className="btn btn-ghost"><RotateCcw className="h-4 w-4" /> Play again</button>
              </div>
              <div className="mt-8 flex justify-center [&_.ledger]:text-ivory/60 [&_a]:border-ivory/25 [&_a]:text-ivory [&_button]:border-ivory/25 [&_button]:text-ivory"><ShareBar title={`I scored ${score}/${ROUND} on the India Export IQ quiz`} /></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
