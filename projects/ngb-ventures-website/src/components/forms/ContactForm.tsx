"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { AntiSpam, Consent, Field, StatusPanel, useEnquiry } from "./shared";
import { COUNTRY_OPTIONS } from "@/lib/enquiry-schema";

const init = { name: "", company: "", email: "", phone: "", country: "", role: "", topic: "Sourcing project", message: "", consent: false, website: "" };

export function ContactForm({ compact = false, defaultTopic }: { compact?: boolean; defaultTopic?: string }) {
  const [v, setV] = useState({ ...init, topic: defaultTopic ?? init.topic });
  const { submit, status, errors, setErrors, formRef } = useEnquiry();
  const set = <K extends keyof typeof init>(k: K, val: (typeof init)[K]) => setV((s) => ({ ...s, [k]: val }));

  if (status.state === "success") return <StatusPanel status={status} onReset={() => setV(init)} />;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!v.name.trim()) er.name = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(v.email)) er.email = "Enter a valid email";
    if (!v.country) er.country = "Country is required";
    if (v.message.trim().length < 10) er.message = "Tell us a little more (10+ characters)";
    if (!v.consent) er.consent = "Please accept the privacy policy";
    if (Object.keys(er).length) return setErrors(er);
    await submit({ type: "contact", ...v });
  };
  const inv = (k: string) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-error` : undefined });

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="relative space-y-8">
      <div className={`grid gap-8 ${compact ? "sm:grid-cols-2" : "md:grid-cols-2"}`}>
        <Field label="Full name" name="name" error={errors.name}><input id="name" autoComplete="name" className="field" value={v.name} onChange={(e) => set("name", e.target.value)} {...inv("name")} /></Field>
        <Field label="Business email" name="email" error={errors.email}><input id="email" type="email" autoComplete="email" className="field" value={v.email} onChange={(e) => set("email", e.target.value)} {...inv("email")} /></Field>
        <Field label="Company" name="company"><input id="company" autoComplete="organization" className="field" value={v.company} onChange={(e) => set("company", e.target.value)} /></Field>
        <Field label="Country" name="country" error={errors.country}><select id="country" className="field" value={v.country} onChange={(e) => set("country", e.target.value)} {...inv("country")}><option value="">Select…</option>{COUNTRY_OPTIONS.map((c) => <option key={c}>{c}</option>)}</select></Field>
        {!compact && <Field label="Phone / WhatsApp (optional)" name="phone"><input id="phone" type="tel" autoComplete="tel" className="field" value={v.phone} onChange={(e) => set("phone", e.target.value)} /></Field>}
        {!compact && <Field label="Topic" name="topic"><select id="topic" className="field" value={v.topic} onChange={(e) => set("topic", e.target.value)}>{["Sourcing project", "Consultation request", "Quality inspection / audit", "Partnership", "Other"].map((t) => <option key={t}>{t}</option>)}</select></Field>}
      </div>
      <Field label="What are you looking to source?" name="message" error={errors.message}>
        <textarea id="message" rows={compact ? 3 : 5} className="field resize-y" value={v.message} onChange={(e) => set("message", e.target.value)} placeholder="Product, quantity, target market…" {...inv("message")} />
      </Field>
      <Consent checked={v.consent} onChange={(c) => set("consent", c)} error={errors.consent} />
      <AntiSpam />
      <StatusPanel status={status} />
      <button type="submit" className="btn btn-primary" disabled={status.state === "submitting"}>{status.state === "submitting" ? "Sending…" : <>Discuss Your Project <ArrowRight className="arrow h-4 w-4" /></>}</button>
    </form>
  );
}
