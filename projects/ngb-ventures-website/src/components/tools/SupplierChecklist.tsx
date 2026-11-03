"use client";
import { useEffect, useMemo, useState } from "react";
import { Copy, Printer, RotateCcw } from "lucide-react";

type Rating = "yes" | "partial" | "no" | "na" | "";
const SECTIONS: { title: string; items: string[] }[] = [
  { title: "Business verification", items: ["GSTIN verified on the GST portal and matches legal name", "Importer-Exporter Code (IEC) verified with DGFT", "Company/LLP registration checked (MCA) or proprietorship documents seen", "Confirmed manufacturer vs. trading company", "Factory address verified (visit, video call or third-party check)", "Bank account name matches the business entity"] },
  { title: "Factory capability", items: ["Machinery list matches the product's processes", "Key processes in-house (or subcontractors disclosed)", "Has produced similar products (evidence seen)", "Sampling / development capability"] },
  { title: "Production capacity", items: ["Monthly capacity stated and plausible", "Current utilisation and order book discussed", "Lead times confirmed for sampling and bulk", "Seasonal or peak constraints understood", "Subcontracting policy agreed in writing"] },
  { title: "Quality management", items: ["Dedicated QC staff", "Inline inspection process in place", "Agrees to AQL standard and third-party inspection", "Testing equipment or lab partnerships", "Corrective-action process for defects"] },
  { title: "Certifications", items: ["Certificates verified in the issuing body's database", "Certificate scope covers this product and site", "Social-compliance audit available (if required)", "Product certifications or test reports available (if required)"] },
  { title: "Export experience", items: ["Exports to your region (evidence seen)", "Familiar with your required export documents", "Understands the agreed Incoterm", "References from existing export buyers"] },
  { title: "Sample evaluation", items: ["Sample matches the approved specification", "Measurements within tolerance", "Materials and components as specified", "Workmanship and finish acceptable", "Packaging and labelling as specified", "Sample delivered on the agreed timeline"] },
];
const SCORE: Record<Rating, number | null> = { yes: 1, partial: 0.5, no: 0, na: null, "": null };
const KEY = "ngb-supplier-checklist-v1";

export function SupplierChecklist() {
  const [supplier, setSupplier] = useState("");
  const [r, setR] = useState<Record<string, Rating>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});

  useEffect(() => { try { const s = JSON.parse(localStorage.getItem(KEY) || "null"); if (s) { setSupplier(s.supplier || ""); setR(s.r || {}); setNotes(s.notes || {}); } } catch { /* storage unavailable */ } }, []);
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify({ supplier, r, notes })); } catch { /* ignore */ } }, [supplier, r, notes]);

  const stats = useMemo(() => {
    const sec = SECTIONS.map((s, si) => {
      let got = 0, max = 0, answered = 0, red = 0;
      s.items.forEach((_, ii) => { const v = r[`${si}-${ii}`] ?? ""; if (v) answered++; const sc = SCORE[v]; if (sc !== null) { got += sc; max += 1; } if (v === "no") red++; });
      return { title: s.title, pct: max ? Math.round((got / max) * 100) : 0, answered, total: s.items.length, red };
    });
    const answered = sec.reduce((a, b) => a + b.answered, 0); const total = sec.reduce((a, b) => a + b.total, 0);
    const scored = sec.filter((s) => s.answered);
    const overall = scored.length ? Math.round(scored.reduce((a, b) => a + b.pct, 0) / scored.length) : 0;
    return { sec, answered, total, overall, red: sec.reduce((a, b) => a + b.red, 0) };
  }, [r]);

  const summary = () => [`Supplier evaluation: ${supplier || "Unnamed supplier"}`, `Overall: ${stats.overall}% · ${stats.answered}/${stats.total} answered · ${stats.red} red flags`, ...SECTIONS.flatMap((s, si) => [``, `## ${s.title} (${stats.sec[si].pct}%)`, ...s.items.map((it, ii) => `- [${(r[`${si}-${ii}`] || "—").toUpperCase()}] ${it}${notes[`${si}-${ii}`] ? ` · ${notes[`${si}-${ii}`]}` : ""}`)])].join("\n");

  const verdict = stats.answered < stats.total * 0.6 ? "Incomplete: keep evaluating" : stats.red > 2 || stats.overall < 60 ? "High risk: resolve red flags first" : stats.overall < 80 ? "Proceed with conditions" : "Strong candidate";

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <label htmlFor="sup" className="field-label">Supplier name</label>
        <input id="sup" className="field mb-12 text-xl" value={supplier} onChange={(e) => setSupplier(e.target.value)} placeholder="e.g. Supplier A, Tirupur" />
        <div className="space-y-14">
          {SECTIONS.map((s, si) => (
            <section key={s.title} aria-labelledby={`sec-${si}`}>
              <div className="mb-4 flex items-baseline justify-between gap-4 border-b border-charcoal pb-3">
                <h3 id={`sec-${si}`} className="font-display text-3xl"><span className="ledger mr-3 align-middle text-bronze-ink">{String(si + 1).padStart(2, "0")}</span>{s.title}</h3>
                <span className="ledger text-stone-ink">{stats.sec[si].answered}/{s.items.length}</span>
              </div>
              <ul className="divide-y divide-line">
                {s.items.map((it, ii) => {
                  const k = `${si}-${ii}`; const val = r[k] ?? "";
                  return (
                    <li key={k} className="grid gap-3 py-4 md:grid-cols-[1fr_auto] md:items-center">
                      <div>
                        <p className="text-[0.95rem]">{it}</p>
                        <input aria-label={`Notes for: ${it}`} className="mt-1 w-full bg-transparent text-xs text-stone-ink placeholder:text-stone/60 focus:outline-none" placeholder="Add note / evidence…" value={notes[k] ?? ""} onChange={(e) => setNotes((n) => ({ ...n, [k]: e.target.value }))} />
                      </div>
                      <div className="flex gap-1.5" role="radiogroup" aria-label={it}>
                        {(["yes", "partial", "no", "na"] as const).map((o) => (
                          <label key={o} className={`chip px-3 py-1.5 text-xs ${o === "no" && val === "no" ? "!border-[#a2412f] !bg-[#a2412f]" : ""}`}><input type="radio" className="sr-only" name={k} checked={val === o} onChange={() => setR((x) => ({ ...x, [k]: o }))} />{o === "na" ? "N/A" : o[0].toUpperCase() + o.slice(1)}</label>
                        ))}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </div>
      <aside className="lg:col-span-4">
        <div className="rounded-sm bg-charcoal p-7 text-ivory lg:sticky lg:top-28">
          <p className="ledger text-bronze-soft">Evaluation score</p>
          <p className="display mt-3 text-7xl tabular-nums">{stats.overall}<span className="text-4xl text-ivory/75">%</span></p>
          <p className="mt-2 text-sm text-ivory/70">{verdict}</p>
          <p className="ledger mt-4 text-ivory/75">{stats.answered}/{stats.total} answered · {stats.red} red flags</p>
          <ul className="mt-6 space-y-3">
            {stats.sec.map((s) => (
              <li key={s.title}><div className="mb-1 flex justify-between text-xs text-ivory/65"><span>{s.title}</span><span className="tabular-nums">{s.answered ? `${s.pct}%` : "—"}</span></div><div className="h-1 overflow-hidden rounded-full bg-ivory/10"><div className="h-full bg-bronze transition-[width] duration-700" style={{ width: `${s.answered ? s.pct : 0}%` }} /></div></li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-2">
            <button type="button" className="btn btn-ghost h-10 min-h-0 px-4 text-xs" onClick={() => navigator.clipboard?.writeText(summary())}><Copy className="h-3.5 w-3.5" /> Copy</button>
            <button type="button" className="btn btn-ghost h-10 min-h-0 px-4 text-xs" onClick={() => window.print()}><Printer className="h-3.5 w-3.5" /> Print</button>
            <button type="button" className="btn btn-ghost h-10 min-h-0 px-4 text-xs" onClick={() => { setR({}); setNotes({}); setSupplier(""); }}><RotateCcw className="h-3.5 w-3.5" /> Reset</button>
          </div>
          <p className="mt-6 text-xs leading-relaxed text-ivory/75">Saved in this browser only. Scoring is a decision aid, not a certification. Yes = 1, Partial = 0.5, No = 0, and N/A is excluded.</p>
        </div>
      </aside>
    </div>
  );
}
