"use client";
import { useMemo, useState } from "react";
import { Copy, ExternalLink, Info, Printer, RotateCcw } from "lucide-react";

type Country = { id: string; name: string; basis: "FOB" | "CIF"; vatLabel: string; vatHint: string; tool: { label: string; href: string }; note: string };

/** Valuation basis defaults reflect each customs authority's general rule; VAT hints are reference only and are NOT pre-filled. */
const COUNTRIES: Country[] = [
  { id: "us", name: "United States", basis: "FOB", vatLabel: "State/local sales tax (if applicable to importer)", vatHint: "No federal VAT on imports. Merchandise Processing Fee and Harbor Maintenance Fee may apply: add them under other charges.", tool: { label: "USITC HTS search", href: "https://hts.usitc.gov/" }, note: "US customs value is generally the transaction value, excluding international freight and insurance. Additional tariffs on Indian-origin goods have applied since 2025, so add them as additional duty after checking the HTS." },
  { id: "uk", name: "United Kingdom", basis: "CIF", vatLabel: "Import VAT", vatHint: "Standard UK VAT rate is 20% at the time of writing. Verify the rate for your goods.", tool: { label: "UK Trade Tariff", href: "https://www.gov.uk/trade-tariff" }, note: "The UK values goods on a CIF basis. VAT is charged on customs value plus duty. VAT-registered businesses can often reclaim import VAT." },
  { id: "eu", name: "European Union (DE, FR, NL…)", basis: "CIF", vatLabel: "Import VAT (country rate)", vatHint: "Rates differ by member state (e.g. DE 19%, FR 20%, NL 21% standard rates at the time of writing). Verify them.", tool: { label: "EU TARIC", href: "https://ec.europa.eu/taxation_customs/dds2/taric/taric_consultation.jsp" }, note: "The EU values goods on a CIF basis at the EU border. Import VAT is usually charged on customs value plus duty and other charges." },
  { id: "au", name: "Australia", basis: "FOB", vatLabel: "GST", vatHint: "Australian GST is 10%. The GST base includes customs value, duty and international transport and insurance.", tool: { label: "ABF tariff classification", href: "https://www.abf.gov.au/importing-exporting-and-manufacturing/tariff-classification" }, note: "Australia values goods on an FOB basis. ECTA preferential rates may apply to eligible Indian-origin goods with valid proof of origin." },
  { id: "ca", name: "Canada", basis: "FOB", vatLabel: "GST / HST", vatHint: "Federal GST is 5%. HST and PST vary by province, so verify yours.", tool: { label: "CBSA Customs Tariff", href: "https://www.cbsa-asfc.gc.ca/trade-commerce/tariff-tarif/menu-eng.html" }, note: "Canada's value for duty generally excludes transport costs incurred after the goods leave the country of export." },
  { id: "ae", name: "United Arab Emirates", basis: "CIF", vatLabel: "Import VAT", vatHint: "UAE VAT is 5% at the time of writing. Verify the rate and any exemptions.", tool: { label: "Dubai Customs", href: "https://www.dubaicustoms.gov.ae/" }, note: "GCC customs duty is commonly applied on CIF value. CEPA preferences may apply to eligible goods." },
  { id: "other", name: "Other country", basis: "CIF", vatLabel: "Import VAT / GST", vatHint: "Check your national customs authority.", tool: { label: "WCO member customs links", href: "https://www.wcoomd.org/en/about-us/wco-members/membership.aspx" }, note: "Check your country's valuation basis (FOB or CIF) with your customs broker." },
];

const n = (s: string) => { const x = parseFloat(s.replace(/,/g, "")); return Number.isFinite(x) && x >= 0 ? x : 0; };
const fmt = (x: number, c: string) => new Intl.NumberFormat("en", { style: "currency", currency: c, maximumFractionDigits: 2 }).format(x || 0);

const init = { unitCost: "", qty: "", currency: "USD", freight: "", insurance: "", hs: "", country: "us", basis: "FOB" as "FOB" | "CIF", duty: "", addl: "", vat: "", vatRecoverable: false, other: "" };

export function LandedCost() {
  const [v, setV] = useState(init);
  const set = <K extends keyof typeof init>(k: K, val: (typeof init)[K]) => setV((s) => ({ ...s, [k]: val }));
  const country = COUNTRIES.find((c) => c.id === v.country)!;

  const r = useMemo(() => {
    const qty = n(v.qty); const goods = n(v.unitCost) * qty; const freight = n(v.freight); const ins = n(v.insurance);
    const cif = goods + freight + ins;
    const customsValue = v.basis === "FOB" ? goods : cif;
    const duty = customsValue * (n(v.duty) / 100);
    const addl = customsValue * (n(v.addl) / 100);
    const vatBase = cif + duty + addl;
    const vat = vatBase * (n(v.vat) / 100);
    const other = n(v.other);
    const total = cif + duty + addl + other + (v.vatRecoverable ? 0 : vat);
    return { qty, goods, freight, ins, cif, customsValue, duty, addl, vatBase, vat, other, total, perUnit: qty ? total / qty : 0 };
  }, [v]);

  const parts = [
    { k: "Product cost", x: r.goods, c: "#151515" },
    { k: "Freight", x: r.freight, c: "#5F5C57" },
    { k: "Insurance", x: r.ins, c: "#77746F" },
    { k: "Customs duty", x: r.duty, c: "#7A5C33" },
    { k: "Additional duties", x: r.addl, c: "#A98758" },
    { k: `${country.vatLabel}${v.vatRecoverable ? " (recoverable, excluded)" : ""}`, x: v.vatRecoverable ? 0 : r.vat, c: "#C9AD85" },
    { k: "Other charges", x: r.other, c: "#E2DACB" },
  ];

  const summary = () => [
    `NGB Ventures: landed-cost ESTIMATE (not an official customs assessment)`,
    `Destination: ${country.name} · HS code: ${v.hs || "n/a"} · Valuation basis: ${v.basis}`,
    `Quantity: ${r.qty} · Unit cost: ${fmt(n(v.unitCost), v.currency)}`,
    ...parts.map((p) => `${p.k}: ${fmt(p.x, v.currency)}`),
    `Customs value: ${fmt(r.customsValue, v.currency)} · VAT base: ${fmt(r.vatBase, v.currency)}`,
    `TOTAL LANDED: ${fmt(r.total, v.currency)} · PER UNIT: ${fmt(r.perUnit, v.currency)}`,
  ].join("\n");

  const num = (k: keyof typeof init, label: string, hint?: string, suffix?: string) => (
    <div>
      <label htmlFor={`lc-${k}`} className="field-label">{label}</label>
      <div className="relative"><input id={`lc-${k}`} inputMode="decimal" className="field pr-12" value={v[k] as string} onChange={(e) => set(k, e.target.value as never)} placeholder="0" />{suffix && <span className="ledger absolute right-0 top-1/2 -translate-y-1/2 text-stone-ink">{suffix}</span>}</div>
      {hint && <p className="mt-2 text-xs text-stone-ink">{hint}</p>}
    </div>
  );

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <div className="space-y-12 lg:col-span-7">
        <section className="space-y-8">
          <p className="ledger text-bronze-ink">01 · Goods &amp; freight</p>
          <div className="grid gap-8 sm:grid-cols-3">
            {num("unitCost", "Product cost per unit", "Supplier price (FOB India recommended)")}
            {num("qty", "Quantity", "Units")}
            <div><label htmlFor="lc-cur" className="field-label">Currency</label><select id="lc-cur" className="field" value={v.currency} onChange={(e) => set("currency", e.target.value)}>{["USD", "GBP", "EUR", "AUD", "CAD", "AED", "INR"].map((c) => <option key={c}>{c}</option>)}</select></div>
            {num("freight", "International freight (total)", "Quote from your forwarder")}
            {num("insurance", "Insurance (total)", "Often a small % of CIF value")}
            <div><label htmlFor="lc-hs" className="field-label">HS code</label><input id="lc-hs" className="field" value={v.hs} onChange={(e) => set("hs", e.target.value)} placeholder="e.g. 6109.10" /><p className="mt-2 text-xs text-stone-ink">For reference: look up the duty rate yourself</p></div>
          </div>
        </section>

        <section className="space-y-8">
          <p className="ledger text-bronze-ink">02 · Destination &amp; duties</p>
          <div className="grid gap-8 sm:grid-cols-2">
            <div><label htmlFor="lc-country" className="field-label">Import country</label>
              <select id="lc-country" className="field" value={v.country} onChange={(e) => { const c = COUNTRIES.find((x) => x.id === e.target.value)!; setV((s) => ({ ...s, country: c.id, basis: c.basis })); }}>{COUNTRIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
            </div>
            <fieldset><legend className="field-label">Customs valuation basis</legend>
              <div className="mt-3 flex gap-2">{(["FOB", "CIF"] as const).map((b) => <label key={b} className="chip"><input type="radio" className="sr-only" name="basis" checked={v.basis === b} onChange={() => set("basis", b)} />{b}</label>)}</div>
            </fieldset>
          </div>
          <div className="flex gap-3 rounded-sm bg-paper p-5 text-sm leading-relaxed text-stone-ink"><Info className="mt-0.5 h-4 w-4 shrink-0 text-bronze-ink" /><p>{country.note} <a href={country.tool.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium text-charcoal underline underline-offset-2">{country.tool.label} <ExternalLink className="h-3 w-3" /></a></p></div>
          <div className="grid gap-8 sm:grid-cols-3">
            {num("duty", "Customs duty rate", "From the official tariff for your HS code", "%")}
            {num("addl", "Additional duties", "Anti-dumping, safeguard or extra tariffs", "%")}
            {num("vat", country.vatLabel, country.vatHint, "%")}
          </div>
          <label className="flex items-center gap-3 text-sm text-stone-ink"><input type="checkbox" checked={v.vatRecoverable} onChange={(e) => set("vatRecoverable", e.target.checked)} className="h-4 w-4 accent-[#151515]" /> I can reclaim import VAT/GST (exclude it from landed cost)</label>
          {num("other", "Other import charges (total)", "Brokerage, port and terminal fees, MPF/HMF, inland delivery, FBA prep…")}
        </section>
        <button type="button" onClick={() => setV(init)} className="btn btn-ghost"><RotateCcw className="h-4 w-4" /> Reset</button>
      </div>

      <aside className="lg:col-span-5" aria-live="polite">
        <div className="rounded-sm bg-charcoal p-7 text-ivory lg:sticky lg:top-28 md:p-9">
          <p className="ledger text-bronze-soft">Estimated landed cost</p>
          <p className="display mt-4 text-[clamp(2.75rem,5vw,4.5rem)] tabular-nums">{fmt(r.total, v.currency)}</p>
          <p className="mt-2 text-ivory/65"><span className="tabular-nums text-ivory">{fmt(r.perUnit, v.currency)}</span> per unit</p>
          <div className="mt-8 flex h-2 w-full overflow-hidden rounded-full bg-ivory/10" aria-hidden>
            {parts.map((p) => r.total > 0 && p.x > 0 ? <span key={p.k} style={{ width: `${(p.x / r.total) * 100}%`, background: p.c === "#151515" ? "#F6F3ED" : p.c }} /> : null)}
          </div>
          <dl className="mt-6 divide-y divide-ivory/10 text-sm">
            {parts.map((p) => (
              <div key={p.k} className="flex justify-between gap-4 py-2.5"><dt className="text-ivory/75">{p.k}</dt><dd className="tabular-nums">{fmt(p.x, v.currency)}</dd></div>
            ))}
            <div className="flex justify-between gap-4 py-2.5 text-ivory/75"><dt>Customs value ({v.basis})</dt><dd className="tabular-nums">{fmt(r.customsValue, v.currency)}</dd></div>
            <div className="flex justify-between gap-4 py-2.5 text-ivory/75"><dt>VAT/GST base</dt><dd className="tabular-nums">{fmt(r.vatBase, v.currency)}</dd></div>
          </dl>
          <div className="mt-6 flex flex-wrap gap-2">
            <button type="button" className="btn btn-ghost h-10 min-h-0 px-4 text-xs" onClick={() => navigator.clipboard?.writeText(summary())}><Copy className="h-3.5 w-3.5" /> Copy summary</button>
            <button type="button" className="btn btn-ghost h-10 min-h-0 px-4 text-xs" onClick={() => window.print()}><Printer className="h-3.5 w-3.5" /> Print</button>
          </div>
          <p className="mt-6 border-t border-ivory/10 pt-5 text-xs leading-relaxed text-ivory/75">
            <strong className="text-ivory/80">Estimate only. This isn&apos;t an official customs assessment.</strong> Duty and tax rates are entered by you. Actual duties depend on classification, origin, valuation, trade-agreement eligibility and rules in force on the date of import. Confirm with a licensed customs broker.
          </p>
        </div>
      </aside>
    </div>
  );
}
