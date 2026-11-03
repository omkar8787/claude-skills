"use client";
import { useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";

type Row = { id: number; label: string; l: string; w: string; h: string; qty: string; kg: string };
const n = (s: string) => { const x = parseFloat(s); return Number.isFinite(x) && x > 0 ? x : 0; };

/** Internal volumes are nominal ISO-container figures; practical loadable volume is a common planning rule of thumb (~85%). */
const CONTAINERS = [
  { id: "20GP", name: "20′ Standard", internal: 33.2, practical: 28 },
  { id: "40GP", name: "40′ Standard", internal: 67.7, practical: 58 },
  { id: "40HC", name: "40′ High Cube", internal: 76.3, practical: 68 },
];

let uid = 2;
export function CbmCalculator() {
  const [unit, setUnit] = useState<"cm" | "in">("cm");
  const [wUnit, setWUnit] = useState<"kg" | "lb">("kg");
  const [divisor, setDivisor] = useState(6000);
  const [rows, setRows] = useState<Row[]>([{ id: 1, label: "Carton A", l: "60", w: "40", h: "40", qty: "100", kg: "12" }]);

  const upd = (id: number, k: keyof Row, val: string) => setRows((rs) => rs.map((r) => (r.id === id ? { ...r, [k]: val } : r)));

  const res = useMemo(() => {
    const f = unit === "cm" ? 1 : 2.54;
    const wf = wUnit === "kg" ? 1 : 0.45359237;
    let cbm = 0, kg = 0, cartons = 0;
    const per = rows.map((r) => {
      const v = (n(r.l) * f * n(r.w) * f * n(r.h) * f) / 1_000_000;
      const q = Math.floor(n(r.qty));
      cbm += v * q; kg += n(r.kg) * wf * q; cartons += q;
      return { id: r.id, unitCbm: v, totalCbm: v * q };
    });
    const volKg = (cbm * 1_000_000) / divisor;
    return { per, cbm, kg, cartons, volKg, airChargeable: Math.max(kg, volKg), wm: Math.max(cbm, kg / 1000), cft: cbm * 35.3147 };
  }, [rows, unit, wUnit, divisor]);

  return (
    <div className="space-y-12">
      <div className="flex flex-wrap items-center gap-6">
        <fieldset className="flex items-center gap-2"><legend className="sr-only">Dimension unit</legend><span className="field-label mr-2">Dimensions</span>{(["cm", "in"] as const).map((u) => <label key={u} className="chip"><input type="radio" className="sr-only" checked={unit === u} onChange={() => setUnit(u)} />{u}</label>)}</fieldset>
        <fieldset className="flex items-center gap-2"><legend className="sr-only">Weight unit</legend><span className="field-label mr-2">Weight</span>{(["kg", "lb"] as const).map((u) => <label key={u} className="chip"><input type="radio" className="sr-only" checked={wUnit === u} onChange={() => setWUnit(u)} />{u}</label>)}</fieldset>
        <label className="flex items-center gap-3"><span className="field-label">Air divisor</span><select className="field w-40 py-2" value={divisor} onChange={(e) => setDivisor(+e.target.value)}><option value={6000}>6000 (IATA air)</option><option value={5000}>5000 (express)</option></select></label>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead><tr className="ledger border-b border-line text-stone-ink">{["Carton / item", `L (${unit})`, `W (${unit})`, `H (${unit})`, "Qty", `Gross / carton (${wUnit})`, "CBM / carton", "Total CBM", ""].map((h) => <th key={h} scope="col" className="py-3 pr-4 font-normal">{h}</th>)}</tr></thead>
          <tbody>
            {rows.map((r) => {
              const p = res.per.find((x) => x.id === r.id)!;
              return (
                <tr key={r.id} className="border-b border-line">
                  <td className="py-2 pr-4"><input aria-label="Label" className="field py-2" value={r.label} onChange={(e) => upd(r.id, "label", e.target.value)} /></td>
                  {(["l", "w", "h", "qty", "kg"] as const).map((k) => <td key={k} className="py-2 pr-4"><input aria-label={k} inputMode="decimal" className="field w-20 py-2 tabular-nums" value={r[k]} onChange={(e) => upd(r.id, k, e.target.value)} /></td>)}
                  <td className="py-2 pr-4 tabular-nums text-stone-ink">{p.unitCbm.toFixed(4)}</td>
                  <td className="py-2 pr-4 font-semibold tabular-nums">{p.totalCbm.toFixed(3)}</td>
                  <td className="py-2"><button type="button" aria-label={`Remove ${r.label}`} disabled={rows.length === 1} onClick={() => setRows((rs) => rs.filter((x) => x.id !== r.id))} className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-paper disabled:opacity-30"><Trash2 className="h-4 w-4" /></button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <button type="button" className="btn btn-ghost" onClick={() => setRows((rs) => [...rs, { id: uid++, label: `Carton ${String.fromCharCode(64 + rs.length + 1)}`, l: "", w: "", h: "", qty: "", kg: "" }])}><Plus className="h-4 w-4" /> Add carton type</button>

      <div className="grid gap-px overflow-hidden rounded-sm bg-line sm:grid-cols-2 lg:grid-cols-4" aria-live="polite">
        {[
          ["Total volume", `${res.cbm.toFixed(3)} m³`, `${res.cft.toFixed(1)} ft³ · ${res.cartons} cartons`],
          ["Gross weight", `${res.kg.toFixed(1)} kg`, `${(res.kg / 1000).toFixed(3)} t`],
          ["Air chargeable weight", `${res.airChargeable.toFixed(1)} kg`, `Volumetric ${res.volKg.toFixed(1)} kg (÷${divisor})`],
          ["Sea LCL (W/M)", `${res.wm.toFixed(3)} RT`, "Greater of m³ or tonnes"],
        ].map(([k, v, s]) => (
          <div key={k} className="bg-ivory p-6"><p className="ledger text-stone-ink">{k}</p><p className="display mt-3 text-4xl tabular-nums">{v}</p><p className="mt-2 text-xs text-stone-ink">{s}</p></div>
        ))}
      </div>

      <div>
        <p className="ledger mb-6 text-bronze-ink">Container fit (volume only)</p>
        <div className="space-y-6">
          {CONTAINERS.map((c) => {
            const pct = (res.cbm / c.practical) * 100;
            return (
              <div key={c.id}>
                <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2 text-sm"><span><span className="font-semibold">{c.name}</span> <span className="text-stone-ink">· ~{c.internal} m³ internal, ~{c.practical} m³ practical</span></span><span className={`tabular-nums ${pct > 100 ? "font-semibold text-[#a2412f]" : ""}`}>{pct.toFixed(0)}%{pct > 100 ? ` · needs ${Math.ceil(res.cbm / c.practical)} containers` : ""}</span></div>
                <div className="h-2 overflow-hidden rounded-full bg-paper"><div className="h-full rounded-full bg-charcoal transition-[width] duration-700 ease-[cubic-bezier(.22,1,.36,1)]" style={{ width: `${Math.min(100, pct)}%` }} /></div>
              </div>
            );
          })}
        </div>
        <p className="mt-6 text-xs leading-relaxed text-stone-ink">Planning guide only. Real loadability depends on carton dimensions, stacking limits, pallets and payload weight limits. Ask your forwarder for a load plan.</p>
      </div>
    </div>
  );
}
