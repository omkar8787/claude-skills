"use client";
import { postEnquiry, summarise, track } from "@/lib/runtime-config";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ImagePlus, X } from "lucide-react";
import { AntiSpam, Consent, Field, StatusPanel, type Status } from "./shared";
import { COUNTRY_OPTIONS, ROLES } from "@/lib/enquiry-schema";

export const PATHWAY_META = {
  sourcing: { label: "Source a product", prompt: "What are you looking for?", hint: "Describe the product, material, size, finish, or link a reference.", upload: true },
  manufacturing: { label: "Manufacture / private label", prompt: "Describe the product you want manufactured", hint: "OEM (your specs), ODM (adapt a manufacturer's design) or private label: tell us what you have.", upload: true },
  brand: { label: "Launch or grow a brand", prompt: "Tell us about your product and brand goals", hint: "Stage, channels (Amazon, D2C, retail), target markets and what you need help with.", upload: true },
  procurement: { label: "Corporate procurement", prompt: "What are you looking to procure?", hint: "Category, volumes, supplier-diversity requirements and timelines.", upload: false },
  supplier: { label: "I'm a manufacturer / publisher", prompt: "Tell us about your business", hint: "Products, location, capacity, export experience and certifications. We'll review and get back to you.", upload: true },
  general: { label: "Something else", prompt: "How can we help?", hint: "", upload: false },
} as const;
type Pathway = keyof typeof PATHWAY_META;

const CATEGORIES = ["Not sure yet", "Home décor & handicrafts", "Textiles & apparel", "Furniture & woodcraft", "Kitchen & tableware", "Beauty, essential oils & natural products", "Eco-friendly products", "Jewellery & accessories", "Footwear & leather", "Toys & educational", "Packaging, printing & publishing", "Engineering & components", "Food, spices & nutrition", "Corporate & festive gifting", "GI / origin products", "Other"];
const DEST = [...COUNTRY_OPTIONS.slice(0, 8), "Singapore", "Southeast Asia (other)", "Other EU country", "Other"];

const init = { details: "", category: CATEGORIES[0], destination: "", quantity: "", budget: "", customization: "", timeline: "", region: "", name: "", email: "", company: "", phone: "", country: "", role: "" as string, consent: false };

export function LeadForm({ defaultPathway = "sourcing" }: { defaultPathway?: Pathway }) {
  const router = useRouter();
  const [pathway, setPathway] = useState<Pathway>(defaultPathway);
  const [v, setV] = useState(init);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [drag, setDrag] = useState(false);
  const startedAt = useRef(Date.now());
  const formRef = useRef<HTMLFormElement>(null);
  const set = <K extends keyof typeof init>(k: K, val: (typeof init)[K]) => setV((s) => ({ ...s, [k]: val }));
  const meta = PATHWAY_META[pathway];

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const t = p.get("type");
    const map: Record<string, Pathway> = { sourcing: "sourcing", manufacturing: "manufacturing", "private-label": "manufacturing", brand: "brand", procurement: "procurement", supplier: "supplier", publisher: "supplier", general: "general" };
    if (t && map[t]) setPathway(map[t]);
    setV((s) => {
      const n = { ...s };
      const product = p.get("product"); const cat = p.get("category"); const country = p.get("country"); const qty = p.get("qty"); const region = p.get("region"); const cluster = p.get("cluster"); const market = p.get("market");
      if (product) n.details = product;
      if (cat && CATEGORIES.includes(cat)) n.category = cat;
      if (country && DEST.includes(country)) n.destination = country;
      if (market) { const m = { usa: "United States", uk: "United Kingdom", germany: "Germany", france: "France", netherlands: "Netherlands", australia: "Australia", canada: "Canada", uae: "United Arab Emirates" }[market]; if (m) n.destination = m; }
      if (qty) n.quantity = qty;
      if (region) n.region = region;
      if (cluster) n.region = cluster;
      const ind = p.get("industry");
      const indMap: Record<string, string> = { "food-nutrition": "Food, spices & nutrition", gifting: "Corporate & festive gifting", apparel: "Textiles & apparel", "home-textiles": "Textiles & apparel", handicrafts: "Home décor & handicrafts", "furniture-woodcraft": "Furniture & woodcraft", "jewelry-accessories": "Jewellery & accessories", "essential-oils": "Beauty, essential oils & natural products", "beauty-personal-care": "Beauty, essential oils & natural products", packaging: "Packaging, printing & publishing", "eco-friendly": "Eco-friendly products", lighting: "Home décor & handicrafts", "kitchenware-tableware": "Kitchen & tableware", "footwear-leather": "Footwear & leather", "sports-fitness": "Other", "toys-educational": "Toys & educational", "stationery-paper": "Packaging, printing & publishing", "engineering-industrial": "Engineering & components" };
      if (ind && indMap[ind]) n.category = indMap[ind];
      const prodSlug = p.get("product");
      if (prodSlug && /^[a-z0-9-]+$/.test(prodSlug)) n.details = `${prodSlug.replace(/-/g, " ")}: `;
      if (t === "private-label") n.customization = "Private label: our own branding, labels and packaging.";
      return n;
    });
    if (p.get("type") === "publisher") setV((s) => ({ ...s, role: "Publisher" }));
  }, []);

  const pick = (f: File | null) => {
    setErrors((e) => ({ ...e, file: "" }));
    if (!f) { setFile(null); setPreview(null); return; }
    if (f.size > 4 * 1024 * 1024) { setErrors((e) => ({ ...e, file: "That file is over 4 MB. Please choose a smaller one." })); return; }
    if (!/^(image\/(jpeg|png|webp)|application\/pdf)$/.test(f.type)) { setErrors((e) => ({ ...e, file: "Please choose a JPG, PNG, WebP or PDF." })); return; }
    setFile(f);
    setPreview(f.type.startsWith("image/") ? URL.createObjectURL(f) : null);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (v.details.trim().length < 10) er.details = "Tell us a little more (10+ characters)";
    if (!v.name.trim()) er.name = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(v.email)) er.email = "Enter a valid email";
    if (!v.country) er.country = "Country is required";
    if (!v.role) er.role = "Choose the option that fits best";
    if (!v.consent) er.consent = "Please accept the privacy policy";
    setErrors(er);
    if (Object.keys(er).length) { formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus(); return; }
    setStatus({ state: "submitting" });
    const fd = new FormData();
    Object.entries({ ...v, type: "lead", pathway, consent: String(v.consent), startedAt: String(startedAt.current), sourcePage: window.location.pathname + window.location.search }).forEach(([k, val]) => fd.append(k, String(val)));
    const hp = (formRef.current?.querySelector('[name="website"]') as HTMLInputElement | null)?.value ?? "";
    fd.append("website", hp);
    const ts = (formRef.current?.querySelector('[name="cf-turnstile-response"]') as HTMLInputElement | null)?.value;
    if (ts) fd.append("turnstileToken", ts);
    if (file) fd.append("file", file);
    const summary = summarise({ pathway, ...v, attachment: file ? `${file.name} (please attach it to this message)` : "" });
    try {
      const data = await postEnquiry(fd);
      if (data.ok) { track("generate_lead", { form: "quote", pathway }); router.push(`/thank-you?ref=${encodeURIComponent(data.id ?? "")}&type=${pathway}`); return; }
      if (data.fieldErrors) setErrors(data.fieldErrors);
      setStatus({ state: "error", message: data.message ?? "Something went wrong.", code: data.code, summary });
    } catch {
      setStatus({ state: "error", message: "Network error. Please check your connection and try again.", code: "network", summary });
    }
  };
  const inv = (k: string) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-error` : undefined });

  return (
    <form ref={formRef} onSubmit={submit} noValidate className="relative space-y-12">
      <fieldset>
        <legend className="field-label mb-4">I want to…</legend>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(PATHWAY_META) as Pathway[]).map((k) => (
            <label key={k} className="chip"><input type="radio" name="pathway" className="sr-only" checked={pathway === k} onChange={() => setPathway(k)} />{PATHWAY_META[k].label}</label>
          ))}
        </div>
      </fieldset>

      <section className="space-y-8">
        <Field label={meta.prompt} name="details" error={errors.details} hint={meta.hint}>
          <textarea id="details" rows={4} className="field resize-y text-lg" value={v.details} onChange={(e) => set("details", e.target.value)} placeholder={pathway === "sourcing" ? "e.g. 2,000 hammered brass whiskey cups, 300 ml, our logo engraved, gift box" : ""} {...inv("details")} />
        </Field>
        {pathway !== "general" && pathway !== "supplier" && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Field label="Category" name="category"><select id="category" className="field" value={v.category} onChange={(e) => set("category", e.target.value)}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select></Field>
            <Field label="Destination country" name="destination"><select id="destination" className="field" value={v.destination} onChange={(e) => set("destination", e.target.value)}><option value="">Select…</option>{DEST.map((c) => <option key={c}>{c}</option>)}</select></Field>
            <Field label="Estimated quantity" name="quantity"><input id="quantity" className="field" value={v.quantity} onChange={(e) => set("quantity", e.target.value)} placeholder="e.g. 2,000 units" /></Field>
            <Field label="Budget / target price" name="budget"><input id="budget" className="field" value={v.budget} onChange={(e) => set("budget", e.target.value)} placeholder="e.g. USD 6 per unit" /></Field>
          </div>
        )}
        {(pathway === "sourcing" || pathway === "manufacturing" || pathway === "brand") && (
          <Field label="Customisation requirements (optional)" name="customization"><input id="customization" className="field" value={v.customization} onChange={(e) => set("customization", e.target.value)} placeholder="Logo, colours, materials, packaging, certifications…" /></Field>
        )}
        {v.region && <p className="ledger text-bronze-ink">Region of interest · {v.region} <button type="button" className="ml-2 underline" onClick={() => set("region", "")}>clear</button></p>}

        {meta.upload && (
          <div>
            <p className="field-label mb-3">Reference image or spec sheet (optional)</p>
            <label
              htmlFor="file"
              onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
              onDragLeave={() => setDrag(false)}
              onDrop={(e) => { e.preventDefault(); setDrag(false); pick(e.dataTransfer.files?.[0] ?? null); }}
              className={`flex cursor-pointer items-center gap-5 rounded-sm border border-dashed p-5 transition-colors ${drag ? "border-bronze bg-bronze/10" : "border-charcoal/25 hover:border-charcoal/60"}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {preview ? <img src={preview} alt="Selected reference" className="h-16 w-16 rounded-sm object-cover" /> : <span className="flex h-16 w-16 items-center justify-center rounded-sm bg-paper"><ImagePlus className="h-6 w-6 text-bronze-ink" /></span>}
              <span className="text-sm leading-relaxed text-stone-ink">{file ? <><strong className="text-charcoal">{file.name}</strong> · {Math.round(file.size / 1024)} KB</> : <>Drop a photo here or <span className="underline">browse</span>. JPG, PNG, WebP or PDF, up to 4 MB.</>}</span>
              <input id="file" type="file" accept="image/jpeg,image/png,image/webp,application/pdf" className="sr-only" onChange={(e) => pick(e.target.files?.[0] ?? null)} aria-describedby={errors.file ? "file-error" : undefined} />
            </label>
            {file && <button type="button" onClick={() => pick(null)} className="mt-2 inline-flex items-center gap-1 text-xs text-stone-ink underline"><X className="h-3 w-3" /> Remove file</button>}
            {errors.file && <p id="file-error" role="alert" className="mt-2 text-xs font-medium text-[#a2412f]">{errors.file}</p>}
          </div>
        )}
      </section>

      <section className="space-y-8">
        <p className="ledger text-bronze-ink">About you</p>
        <div className="grid gap-8 sm:grid-cols-2">
          <Field label="Full name" name="name" error={errors.name}><input id="name" autoComplete="name" className="field" value={v.name} onChange={(e) => set("name", e.target.value)} {...inv("name")} /></Field>
          <Field label="Business email" name="email" error={errors.email}><input id="email" type="email" autoComplete="email" className="field" value={v.email} onChange={(e) => set("email", e.target.value)} {...inv("email")} /></Field>
          <Field label="Company" name="company"><input id="company" autoComplete="organization" className="field" value={v.company} onChange={(e) => set("company", e.target.value)} /></Field>
          <Field label="Your country" name="country" error={errors.country}><select id="country" className="field" value={v.country} onChange={(e) => set("country", e.target.value)} {...inv("country")}><option value="">Select…</option>{[...COUNTRY_OPTIONS.slice(0, 8), "India", "Singapore", "Other EU country", "Other"].map((c) => <option key={c}>{c}</option>)}</select></Field>
          <Field label="Which best describes you?" name="role" error={errors.role}><select id="role" className="field" value={v.role} onChange={(e) => set("role", e.target.value)} {...inv("role")}><option value="">Select…</option>{ROLES.map((r) => <option key={r}>{r}</option>)}</select></Field>
          <Field label="Phone / WhatsApp (optional)" name="phone"><input id="phone" type="tel" autoComplete="tel" className="field" value={v.phone} onChange={(e) => set("phone", e.target.value)} /></Field>
        </div>
        <Consent checked={v.consent} onChange={(c) => set("consent", c)} error={errors.consent} />
        <AntiSpam />
      </section>

      <StatusPanel status={status} />
      <div className="flex flex-wrap items-center gap-5">
        <button type="submit" className="btn btn-primary" disabled={status.state === "submitting"}>{status.state === "submitting" ? "Sending…" : <>Send my request <ArrowRight className="arrow h-4 w-4" /></>}</button>
        <p className="text-sm text-stone-ink">A person at NGB reads every request. No automated quotes.</p>
      </div>
    </form>
  );
}
