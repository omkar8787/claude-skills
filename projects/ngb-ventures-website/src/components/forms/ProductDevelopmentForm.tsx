"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { AntiSpam, Consent, Field, StatusPanel, useEnquiry } from "./shared";
import { COUNTRY_OPTIONS } from "@/lib/enquiry-schema";

const STAGES = [["idea", "Just an idea"], ["sketch", "Sketch / drawings"], ["reference-sample", "Reference sample"], ["tech-pack", "Tech pack / full spec"], ["existing-product", "Existing product to re-source"]] as const;
const init = { productName: "", stage: "idea" as (typeof STAGES)[number][0], description: "", materials: "", dimensions: "", quantity: "", targetCost: "", targetMarket: "", references: "", timeline: "", name: "", company: "", email: "", phone: "", country: "", role: "", consent: false, website: "" };

export function ProductDevelopmentForm() {
  const [v, setV] = useState(init);
  const { submit, status, errors, setErrors, formRef } = useEnquiry();
  const set = <K extends keyof typeof init>(k: K, val: (typeof init)[K]) => setV((s) => ({ ...s, [k]: val }));
  if (status.state === "success") return <StatusPanel status={status} onReset={() => setV(init)} />;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!v.productName.trim()) er.productName = "Give your product a working name";
    if (v.description.trim().length < 20) er.description = "Describe the product in a little more detail (20+ characters)";
    if (!v.targetMarket) er.targetMarket = "Choose a target market";
    if (!v.name.trim()) er.name = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(v.email)) er.email = "Enter a valid email";
    if (!v.country) er.country = "Country is required";
    if (!v.consent) er.consent = "Please accept the privacy policy";
    if (Object.keys(er).length) { setErrors(er); formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus(); return; }
    await submit({ type: "product-development", ...v });
  };
  const inv = (k: string) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-error` : undefined });

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="relative space-y-16">
      <section className="space-y-8">
        <p className="ledger text-bronze-ink">01 · The product</p>
        <Field label="Working product name" name="productName" error={errors.productName}><input id="productName" className="field" value={v.productName} onChange={(e) => set("productName", e.target.value)} {...inv("productName")} /></Field>
        <fieldset><legend className="field-label mb-4">How developed is it?</legend>
          <div className="flex flex-wrap gap-2">{STAGES.map(([k, l]) => <label key={k} className="chip"><input type="radio" name="stage" className="sr-only" checked={v.stage === k} onChange={() => set("stage", k)} />{l}</label>)}</div>
        </fieldset>
        <Field label="Describe the product" name="description" error={errors.description} hint="Function, look and feel, who it's for, what makes it different."><textarea id="description" rows={5} className="field resize-y" value={v.description} onChange={(e) => set("description", e.target.value)} {...inv("description")} /></Field>
        <div className="grid gap-8 md:grid-cols-2">
          <Field label="Materials (if known)" name="materials"><input id="materials" className="field" value={v.materials} onChange={(e) => set("materials", e.target.value)} /></Field>
          <Field label="Approximate dimensions" name="dimensions"><input id="dimensions" className="field" value={v.dimensions} onChange={(e) => set("dimensions", e.target.value)} /></Field>
        </div>
        <Field label="Reference links" name="references" hint="Links to sketches, Pinterest boards, competitor products or shared drives. Please don't send confidential files until an NDA is in place."><textarea id="references" rows={2} className="field resize-y" value={v.references} onChange={(e) => set("references", e.target.value)} /></Field>
      </section>
      <section className="space-y-8">
        <p className="ledger text-bronze-ink">02 · Commercials</p>
        <div className="grid gap-8 md:grid-cols-3">
          <Field label="First-order quantity" name="quantity"><input id="quantity" className="field" value={v.quantity} onChange={(e) => set("quantity", e.target.value)} /></Field>
          <Field label="Target unit cost" name="targetCost"><input id="targetCost" className="field" value={v.targetCost} onChange={(e) => set("targetCost", e.target.value)} placeholder="e.g. USD 6" /></Field>
          <Field label="Target market" name="targetMarket" error={errors.targetMarket}><select id="targetMarket" className="field" value={v.targetMarket} onChange={(e) => set("targetMarket", e.target.value)} {...inv("targetMarket")}><option value="">Select…</option>{COUNTRY_OPTIONS.map((c) => <option key={c}>{c}</option>)}</select></Field>
        </div>
        <fieldset><legend className="field-label mb-4">When do you want to launch?</legend>
          <div className="flex flex-wrap gap-2">{["Exploring", "Within 6 months", "6–12 months", "12+ months"].map((t) => <label key={t} className="chip"><input type="radio" name="timeline" className="sr-only" checked={v.timeline === t} onChange={() => set("timeline", t)} />{t}</label>)}</div>
        </fieldset>
      </section>
      <section className="space-y-8">
        <p className="ledger text-bronze-ink">03 · About you</p>
        <div className="grid gap-8 md:grid-cols-2">
          <Field label="Full name" name="name" error={errors.name}><input id="name" autoComplete="name" className="field" value={v.name} onChange={(e) => set("name", e.target.value)} {...inv("name")} /></Field>
          <Field label="Business email" name="email" error={errors.email}><input id="email" type="email" autoComplete="email" className="field" value={v.email} onChange={(e) => set("email", e.target.value)} {...inv("email")} /></Field>
          <Field label="Company / brand" name="company"><input id="company" className="field" value={v.company} onChange={(e) => set("company", e.target.value)} /></Field>
          <Field label="Your country" name="country" error={errors.country}><select id="country" className="field" value={v.country} onChange={(e) => set("country", e.target.value)} {...inv("country")}><option value="">Select…</option>{COUNTRY_OPTIONS.map((c) => <option key={c}>{c}</option>)}</select></Field>
          <Field label="Phone / WhatsApp (optional)" name="phone"><input id="phone" type="tel" className="field" value={v.phone} onChange={(e) => set("phone", e.target.value)} /></Field>
        </div>
        <Consent checked={v.consent} onChange={(c) => set("consent", c)} error={errors.consent} />
        <AntiSpam />
      </section>
      <StatusPanel status={status} />
      <button type="submit" className="btn btn-primary" disabled={status.state === "submitting"}>{status.state === "submitting" ? "Sending…" : <>Submit product brief <ArrowRight className="arrow h-4 w-4" /></>}</button>
    </form>
  );
}
