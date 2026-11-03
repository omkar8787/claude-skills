/**
 * Clearly marked factual placeholder. Visible in development (or when NEXT_PUBLIC_SHOW_PLACEHOLDERS=true),
 * hidden in production so unverified gaps never ship as fake content.
 */
export function Placeholder({ label, note }: { label: string; note: string }) {
  const show = process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS === "true";
  if (!show) return null;
  return (
    <div className="rounded-sm border border-dashed border-bronze/70 bg-bronze/5 p-6 text-sm">
      <p className="ledger text-bronze-ink">Placeholder · {label}</p>
      <p className="mt-2 leading-relaxed text-stone-ink">{note}</p>
    </div>
  );
}
