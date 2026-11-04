import { clusters, formatCoord } from "@/content/clusters";
import { facts } from "@/content/facts";

/** Slow typographic ticker of cluster coordinates, with "Did you know?" trade facts between them. */
export function LedgerTicker() {
  const trivia = facts.filter((f) => f.answer).map((f) => `Did you know? ${f.statement}`);
  const items = clusters.flatMap((c, i) => {
    const line = `${c.name.toUpperCase()} · ${formatCoord(c.lat, c.lon)} · ${c.specialization}`;
    return i % 3 === 2 && trivia[Math.floor(i / 3) % trivia.length] ? [line, trivia[Math.floor(i / 3) % trivia.length]] : [line];
  });
  const row = (
    <ul className="flex shrink-0 items-center gap-10 pr-10">
      {items.map((t) => <li key={t} className="flex items-center gap-10 whitespace-nowrap"><span>{t}</span><span className="h-1 w-1 rounded-full bg-bronze" aria-hidden /></li>)}
    </ul>
  );
  return (
    <div className="ledger relative overflow-hidden border-y border-line bg-ivory py-5 text-stone-ink" aria-hidden>
      <div className="flex w-max animate-[marquee_120s_linear_infinite] hover:[animation-play-state:paused]">{row}{row}</div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ivory" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ivory" />
    </div>
  );
}
