"use client";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AntiSpam, Consent, Field, StatusPanel, useEnquiry } from "./shared";
import { CATEGORY_OPTIONS, CERT_OPTIONS, COUNTRY_OPTIONS } from "@/lib/enquiry-schema";

type Prefill = { industries: Record<string, string>; products: Record<string, { name: string; industry: string }>; markets: Record<string, string>; clusters: Record<string, string> };

const STEPS = ["Product", "Volume & price", "Requirements", "Compliance & samples", "Your details"] as const;

const initial = {
  category: "", product: "", quantity: "", quantityUnit: "pieces", targetCountry: "", targetPrice: "", currency: "USD", timeline: "",
  customization: "", packaging: "", certifications: [] as string[], samples: "unsure" as "yes" | "no" | "unsure", cluster: "",
  name: "", company: "", email: "", phone: "", country: "", role: "", consent: false, website: "",
};

export function EnquiryBuilder({ prefill }: { prefill: Prefill }) {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [v, setV] = useState(initial);
  const { submit, status, errors, setErrors, formRef } = useEnquiry();
  const set = <K extends keyof typeof initial>(k: K, val: (typeof initial)[K]) => setV((s) => ({ ...s, [k]: val }));

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ind = params.get("industry"); const prod = params.get("product"); const mk = params.get("market"); const cl = params.get("cluster"); const type = params.get("type");
    setV((s) => {
      const n = { ...s };
      if (ind && prefill.industries[ind]) n.category = prefill.industries[ind];
      if (prod && prefill.products[prod]) { n.product = `${prefill.products[prod].name}: `; n.category = prefill.industries[prefill.products[prod].industry] ?? n.category; }
      if (mk && prefill.markets[mk]) { n.targetCountry = prefill.markets[mk]; n.country = prefill.markets[mk]; }
      if (cl && prefill.clusters[cl]) n.cluster = prefill.clusters[cl];
      if (type === "private-label") n.customization = "Private label: our own branding, labels and packaging.";
      return n;
    });
  }, [prefill]);

  const stepErrors = (i: number) => {
    const e: Record<string, string> = {};
    if (i === 0) { if (!v.category) e.category = "Choose a category"; if (v.product.trim().length < 10) e.product = "Describe the product in a sentence or two"; }
    if (i === 2) { if (!v.targetCountry) e.targetCountry = "Choose your target country"; }
    if (i === 4) {
      if (!v.name.trim()) e.name = "Name is required";
      if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = "Enter a valid email";
      if (!v.country) e.country = "Country is required";
      if (!v.consent) e.consent = "Please accept the privacy policy";
    }
    return e;
  };

  const go = (to: number) => {
    if (to > step) {
      const e = stepErrors(step);
      if (Object.keys(e).length) { setErrors(e); return; }
    }
    setErrors({}); setDir(to > step ? 1 : -1); setStep(to);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (step < STEPS.length - 1) return go(step + 1);
    const e = stepErrors(4);
    if (Object.keys(e).length) { setErrors(e); return; }
    await submit({ type: "sourcing", ...v });
  };

  const brief = useMemo(() => [
    ["Category", v.category], ["Product", v.product], ["Quantity", v.quantity && `${v.quantity} ${v.quantityUnit}`], ["Target price", v.targetPrice && `${v.currency} ${v.targetPrice} / unit`],
    ["Destination", v.targetCountry], ["Timeline", v.timeline], ["Customisation", v.customization], ["Packaging", v.packaging],
    ["Certifications", v.certifications.join(", ")], ["Samples", v.samples === "unsure" ? "" : v.samples === "yes" ? "Required" : "Not required"], ["Cluster", v.cluster],
  ] as const, [v]);

  if (status.state === "success") return <StatusPanel status={status} onReset={() => { setV(initial); setStep(0); }} />;

  const err = (k: string) => errors[k];
  const inv = (k: string) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-error` : undefined });

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <form ref={formRef} onSubmit={onSubmit} noValidate className="relative scroll-mt-28 lg:col-span-7">
        {/* progress */}
        <ol className="mb-12 grid grid-cols-5 gap-2" aria-label="Progress">
          {STEPS.map((s, i) => (
            <li key={s}>
              <button type="button" onClick={() => (i < step ? go(i) : undefined)} className="group block w-full text-left" aria-current={i === step ? "step" : undefined} disabled={i > step}>
                <span className="block h-px w-full overflow-hidden bg-line"><span className="block h-full bg-charcoal transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)]" style={{ transform: `scaleX(${i <= step ? 1 : 0})`, transformOrigin: "left" }} /></span>
                <span className={`ledger mt-3 sr-only md:not-sr-only md:block ${i === step ? "text-charcoal" : "text-stone-ink"}`}>{String(i + 1).padStart(2, "0")} {s}</span>
              </button>
            </li>
          ))}
        </ol>
        <p className="ledger mb-3 text-bronze-ink md:hidden">Step {step + 1} of {STEPS.length} · {STEPS[step]}</p>

        <AnimatePresence mode="wait" custom={dir}>
          <motion.div key={step} custom={dir} initial={{ opacity: 0, x: dir * 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: dir * -30 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="space-y-10">
            {step === 0 && (
              <>
                <fieldset>
                  <legend className="display mb-6 text-4xl">What would you like to source?</legend>
                  <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Product category">
                    {CATEGORY_OPTIONS.map((c) => (
                      <label key={c} className="chip"><input type="radio" name="category" value={c} checked={v.category === c} onChange={() => set("category", c)} className="sr-only" />{c}</label>
                    ))}
                  </div>
                  {err("category") && <p role="alert" className="mt-3 text-xs font-medium text-[#a2412f]">{err("category")}</p>}
                </fieldset>
                <Field label="Product description" name="product" error={err("product")} hint="Materials, dimensions, style, reference links: whatever you have.">
                  <textarea id="product" rows={4} className="field resize-y" value={v.product} onChange={(e) => set("product", e.target.value)} placeholder="e.g. 220 GSM organic cotton oversized T-shirt, garment-dyed, 4 colours" {...inv("product")} />
                </Field>
                {v.cluster && <p className="ledger text-stone-ink">Preferred cluster · {v.cluster} <button type="button" className="ml-2 underline" onClick={() => set("cluster", "")}>clear</button></p>}
              </>
            )}
            {step === 1 && (
              <>
                <h3 className="display text-4xl">Volume, price and timing</h3>
                <div className="grid gap-8 sm:grid-cols-2">
                  <Field label="Target quantity" name="quantity" hint="Per order or per year: tell us which.">
                    <div className="flex gap-3"><input id="quantity" inputMode="numeric" className="field" value={v.quantity} onChange={(e) => set("quantity", e.target.value)} placeholder="e.g. 2,000" />
                      <select aria-label="Unit" className="field w-32" value={v.quantityUnit} onChange={(e) => set("quantityUnit", e.target.value)}>{["pieces", "sets", "pairs", "kg", "litres", "metres", "containers"].map((u) => <option key={u}>{u}</option>)}</select></div>
                  </Field>
                  <Field label="Target price per unit" name="targetPrice" hint="Helps us match the right manufacturer tier.">
                    <div className="flex gap-3"><select aria-label="Currency" className="field w-24" value={v.currency} onChange={(e) => set("currency", e.target.value)}>{["USD", "GBP", "EUR", "AUD", "CAD", "AED", "INR"].map((c) => <option key={c}>{c}</option>)}</select>
                      <input id="targetPrice" inputMode="decimal" className="field" value={v.targetPrice} onChange={(e) => set("targetPrice", e.target.value)} placeholder="e.g. 4.50" /></div>
                  </Field>
                </div>
                <fieldset>
                  <legend className="field-label mb-4">Timeline</legend>
                  <div className="flex flex-wrap gap-2">{["Exploring", "Within 3 months", "3–6 months", "6+ months"].map((t) => <label key={t} className="chip"><input type="radio" name="timeline" className="sr-only" checked={v.timeline === t} onChange={() => set("timeline", t)} />{t}</label>)}</div>
                </fieldset>
              </>
            )}
            {step === 2 && (
              <>
                <h3 className="display text-4xl">Market and requirements</h3>
                <Field label="Target country (where goods will be sold)" name="targetCountry" error={err("targetCountry")}>
                  <select id="targetCountry" className="field" value={v.targetCountry} onChange={(e) => set("targetCountry", e.target.value)} {...inv("targetCountry")}><option value="">Select…</option>{COUNTRY_OPTIONS.map((c) => <option key={c}>{c}</option>)}</select>
                </Field>
                <Field label="Customisation requirements" name="customization" hint="Private label, colours, materials, sizes, branding.">
                  <textarea id="customization" rows={3} className="field resize-y" value={v.customization} onChange={(e) => set("customization", e.target.value)} />
                </Field>
                <Field label="Packaging requirements" name="packaging" hint="Retail box, polybag, plastic-free, Amazon FBA, barcodes…">
                  <textarea id="packaging" rows={3} className="field resize-y" value={v.packaging} onChange={(e) => set("packaging", e.target.value)} />
                </Field>
              </>
            )}
            {step === 3 && (
              <>
                <fieldset>
                  <legend className="display mb-2 text-4xl">Certifications</legend>
                  <p className="mb-6 text-sm text-stone-ink">Select any your buyers or market require. We verify certificates directly with the issuing bodies.</p>
                  <div className="flex flex-wrap gap-2">{CERT_OPTIONS.map((c) => { const on = v.certifications.includes(c); return <label key={c} className="chip"><input type="checkbox" className="sr-only" checked={on} onChange={() => set("certifications", on ? v.certifications.filter((x) => x !== c) : [...v.certifications, c])} />{c}</label>; })}</div>
                </fieldset>
                <fieldset>
                  <legend className="field-label mb-4">Do you need samples before bulk production?</legend>
                  <div className="flex flex-wrap gap-2">{([["yes", "Yes"], ["no", "No"], ["unsure", "Not sure yet"]] as const).map(([k, l]) => <label key={k} className="chip"><input type="radio" name="samples" className="sr-only" checked={v.samples === k} onChange={() => set("samples", k)} />{l}</label>)}</div>
                </fieldset>
              </>
            )}
            {step === 4 && (
              <>
                <h3 className="display text-4xl">Where should we send our response?</h3>
                <div className="grid gap-8 sm:grid-cols-2">
                  <Field label="Full name" name="name" error={err("name")}><input id="name" autoComplete="name" className="field" value={v.name} onChange={(e) => set("name", e.target.value)} {...inv("name")} /></Field>
                  <Field label="Company" name="company"><input id="company" autoComplete="organization" className="field" value={v.company} onChange={(e) => set("company", e.target.value)} /></Field>
                  <Field label="Business email" name="email" error={err("email")}><input id="email" type="email" autoComplete="email" className="field" value={v.email} onChange={(e) => set("email", e.target.value)} {...inv("email")} /></Field>
                  <Field label="Phone / WhatsApp (optional)" name="phone"><input id="phone" type="tel" autoComplete="tel" className="field" value={v.phone} onChange={(e) => set("phone", e.target.value)} /></Field>
                  <Field label="Your country" name="country" error={err("country")}><select id="country" className="field" value={v.country} onChange={(e) => set("country", e.target.value)} {...inv("country")}><option value="">Select…</option>{COUNTRY_OPTIONS.map((c) => <option key={c}>{c}</option>)}</select></Field>
                  <Field label="Your role" name="role"><select id="role" className="field" value={v.role} onChange={(e) => set("role", e.target.value)}><option value="">Select…</option>{["Founder / Owner", "Procurement / Sourcing", "Product / Design", "Amazon / E-commerce seller", "Importer / Distributor", "Other"].map((r) => <option key={r}>{r}</option>)}</select></Field>
                </div>
                <Consent checked={v.consent} onChange={(c) => set("consent", c)} error={err("consent")} />
                <AntiSpam />
              </>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-10"><StatusPanel status={status} /></div>

        <div className="mt-10 flex items-center justify-between gap-4 border-t border-line pt-8">
          <button type="button" onClick={() => go(step - 1)} disabled={step === 0} className="btn btn-ghost disabled:pointer-events-none disabled:opacity-0"><ArrowLeft className="h-4 w-4" /> Back</button>
          <button type="submit" className="btn btn-primary" disabled={status.state === "submitting"}>
            {step < STEPS.length - 1 ? <>Continue <ArrowRight className="arrow h-4 w-4" /></> : status.state === "submitting" ? "Sending…" : <>Submit enquiry <ArrowRight className="arrow h-4 w-4" /></>}
          </button>
        </div>
      </form>

      <aside className="lg:col-span-4 lg:col-start-9" aria-label="Your sourcing brief">
        <div className="relative overflow-hidden rounded-sm bg-charcoal p-7 text-ivory lg:sticky lg:top-28">
          <div className="flex items-center justify-between"><p className="ledger text-bronze-soft">Sourcing brief</p><p className="ledger text-ivory/60">Draft</p></div>
          <p className="mt-5 font-display text-3xl leading-tight">{v.category || "Your product"}</p>
          <dl className="mt-6 divide-y divide-ivory/10 border-t border-ivory/10 text-sm">
            {brief.map(([k, val]) => (
              <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-3 py-2.5">
                <dt className="ledger pt-0.5 text-[0.6rem] text-ivory/60">{k}</dt>
                <dd className={`break-words ${val ? "text-ivory/85" : "text-ivory/50"}`}>{val || "—"}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-xs leading-relaxed text-ivory/60">A complete brief gets a faster, more accurate response. Everything you share is treated as confidential.</p>
        </div>
      </aside>
    </div>
  );
}
