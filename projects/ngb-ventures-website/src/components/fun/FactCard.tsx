"use client";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import type { Fact } from "@/content/facts";

/** A single random "Did you know?" fact, with a button to shuffle. Picks after mount to keep SSR markup stable. */
export function FactCard({ facts }: { facts: Fact[] }) {
  const pool = facts.filter((f) => f.answer);
  const [i, setI] = useState(0);
  useEffect(() => setI(Math.floor(Math.random() * pool.length)), [pool.length]);
  const f = pool[i];
  return (
    <div className="max-w-xl rounded-md border border-ivory/15 bg-ivory/[0.04] p-6" aria-live="polite">
      <p className="ledger flex items-center gap-2 text-bronze-soft"><Sparkles className="h-3.5 w-3.5" /> Did you know?</p>
      <p className="mt-3 font-display text-2xl leading-snug">{f.statement}</p>
      <p className="mt-2 text-sm leading-relaxed text-ivory/75">{f.explain}</p>
      <button type="button" onClick={() => setI((x) => (x + 1) % pool.length)} className="ledger mt-4 text-ivory/70 underline-offset-4 hover:underline">Another fact →</button>
    </div>
  );
}
