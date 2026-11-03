"use client";
import Link from "next/link";
import Script from "next/script";
import { useCallback, useRef, useState, type ReactNode } from "react";
import { Check, Mail, MessageCircle } from "lucide-react";
import { postEnquiry, summarise, track } from "@/lib/runtime-config";

export type Status = { state: "idle" | "submitting" | "success" | "error"; message?: string; code?: string; id?: string; summary?: string };

const TURNSTILE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
const WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

export function useEnquiry() {
  const startedAt = useRef(Date.now());
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = useCallback(async (payload: Record<string, unknown>) => {
    setStatus({ state: "submitting" });
    setErrors({});
    const turnstileToken = (formRef.current?.querySelector('[name="cf-turnstile-response"]') as HTMLInputElement | null)?.value || undefined;
    const body = { ...payload, startedAt: startedAt.current, turnstileToken, sourcePage: typeof window !== "undefined" ? window.location.pathname + window.location.search : "" };
    try {
      const data = await postEnquiry(body);
      if (data.ok) {
        track("generate_lead", { form: String(payload.type ?? "contact") });
        setStatus({ state: "success", id: data.id });
        return true;
      }
      if (data.fieldErrors) setErrors(data.fieldErrors);
      setStatus({ state: "error", message: data.message ?? "Something went wrong.", code: data.code, summary: summarise(payload) });
    } catch {
      setStatus({ state: "error", message: "Network error. Please check your connection and try again.", code: "network", summary: summarise(payload) });
    }
    return false;
  }, []);

  return { submit, status, errors, setErrors, formRef };
}

export function Field({ label, name, error, hint, children, className = "" }: { label: string; name: string; error?: string; hint?: string; children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label htmlFor={name} className="field-label">{label}</label>
      {children}
      {hint && !error && <p className="mt-2 text-xs text-stone-ink">{hint}</p>}
      {error && <p id={`${name}-error`} role="alert" className="mt-2 text-xs font-medium text-[#a2412f]">{error}</p>}
    </div>
  );
}

/** Honeypot + optional Turnstile widget. */
export function AntiSpam() {
  return (
    <>
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      {TURNSTILE_KEY && (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
          <div className="cf-turnstile mt-6" data-sitekey={TURNSTILE_KEY} data-theme="light" />
        </>
      )}
    </>
  );
}

export function Consent({ checked, onChange, error }: { checked: boolean; onChange: (v: boolean) => void; error?: string }) {
  return (
    <div>
      <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-stone-ink">
        <input type="checkbox" name="consent" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-1 h-4 w-4 accent-[#151515]" aria-invalid={!!error} />
        <span>I agree that NGB Ventures may use these details to respond to my enquiry, as described in the <Link href="/privacy" className="underline underline-offset-2">privacy policy</Link>.</span>
      </label>
      {error && <p role="alert" className="mt-2 text-xs font-medium text-[#a2412f]">{error}</p>}
    </div>
  );
}

export function StatusPanel({ status, onReset }: { status: Status; onReset?: () => void }) {
  if (status.state === "success") {
    return (
      <div className="rounded-sm border border-line bg-paper p-8 md:p-10" role="status">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-charcoal text-ivory"><Check className="h-5 w-5" /></span>
        <h3 className="display mt-6 text-4xl">Thank you. Your brief is with us.</h3>
        <p className="mt-4 max-w-lg leading-relaxed text-stone-ink">We review every enquiry personally and will reply by email. Please keep your reference for future correspondence.</p>
        {status.id && <p className="ledger mt-6 text-bronze-ink">Reference · {status.id}</p>}
        {onReset && <button type="button" onClick={onReset} className="btn btn-ghost mt-8">Submit another enquiry</button>}
      </div>
    );
  }
  if (status.state === "error") {
    return (
      <div className="rounded-sm border border-[#a2412f]/30 bg-[#a2412f]/5 p-5 text-sm" role="alert">
        <p className="font-semibold text-[#7d2f22]">{status.message}</p>
        {(status.code === "not_configured" || status.code === "delivery_failed" || status.code === "network") && (
          <div className="mt-4 flex flex-wrap gap-3 text-charcoal">
            {CONTACT_EMAIL && <a className="btn btn-primary min-h-11 px-5" href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Sourcing enquiry via NGB Ventures website")}&body=${encodeURIComponent((status.summary ? status.summary + "\n\n" : "") + "Sent from the NGB Ventures website")}`}><Mail className="h-4 w-4" /> Send by email</a>}
            {WA && <a className="btn btn-ghost min-h-11 px-5" href={`https://wa.me/${WA.replace(/\D/g, "")}?text=${encodeURIComponent("Hello NGB Ventures, here is my enquiry:\n\n" + (status.summary ?? ""))}`} target="_blank" rel="noopener noreferrer"><MessageCircle className="h-4 w-4" /> Send on WhatsApp</a>}
            {!CONTACT_EMAIL && !WA && <span className="text-stone-ink">Site owner: configure an enquiry channel (see README → Enquiry delivery).</span>}
          </div>
        )}
        {status.summary && (status.code === "not_configured" || status.code === "network") && <p className="mt-3 text-xs text-stone-ink">Your answers are copied into the message, so nothing is lost. Attach any reference image in your email or chat.</p>}
      </div>
    );
  }
  return null;
}
