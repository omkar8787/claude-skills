/** Settings read in the browser from /site-config.js (editable on the host without a rebuild), with build-time env fallbacks. */
export type NgbConfig = { gaId?: string; formEndpoint?: string; formAccessKey?: string };

declare global {
  interface Window { NGB_CONFIG?: NgbConfig; dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void }
}

export function runtimeConfig(): NgbConfig {
  const w = typeof window !== "undefined" ? window.NGB_CONFIG ?? {} : {};
  return {
    gaId: (w.gaId || process.env.NEXT_PUBLIC_GA_ID || "").trim(),
    formEndpoint: (w.formEndpoint || process.env.NEXT_PUBLIC_FORM_ENDPOINT || "").trim(),
    formAccessKey: (w.formAccessKey || process.env.NEXT_PUBLIC_FORM_ACCESS_KEY || "").trim(),
  };
}

/** Sends a GA4 event when analytics is active; a no-op otherwise. */
export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") window.gtag("event", event, params);
}

const makeRef = () => `NGB-${new Date().toISOString().slice(2, 10).replace(/-/g, "")}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

export type EnquiryResult = { ok: boolean; id?: string; code?: string; message?: string; fieldErrors?: Record<string, string> };

/**
 * Posts an enquiry. Order: third-party form endpoint (if configured) → the site's own /api/enquiry.
 * Never reports success unless the receiving service confirmed it.
 */
export async function postEnquiry(body: FormData | Record<string, unknown>): Promise<EnquiryResult> {
  const cfg = runtimeConfig();
  const fd = body instanceof FormData ? body : new FormData();
  if (!(body instanceof FormData)) Object.entries(body).forEach(([k, v]) => { if (v != null && typeof v !== "object") fd.append(k, String(v)); });
  if (cfg.formEndpoint) {
    const out = new FormData();
    const ref = makeRef();
    fd.forEach((v, k) => { if (!["website", "startedAt", "turnstileToken"].includes(k)) out.append(k, v); });
    out.append("reference", ref);
    out.append("_subject", `NGB enquiry ${ref}: ${String(fd.get("pathway") || fd.get("type") || "general")}`);
    if (cfg.formAccessKey) out.append("access_key", cfg.formAccessKey);
    if (fd.get("website")) return { ok: true, id: ref }; // honeypot: accept silently, send nothing
    try {
      const res = await fetch(cfg.formEndpoint, { method: "POST", body: out, headers: { Accept: "application/json" } });
      if (res.ok) return { ok: true, id: ref };
    } catch { /* fall through to the site API */ }
  }
  const res = body instanceof FormData
    ? await fetch("/api/enquiry", { method: "POST", body })
    : await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const data = (await res.json().catch(() => ({}))) as EnquiryResult;
  return res.ok && data.ok ? { ok: true, id: data.id } : { ...data, ok: false };
}

/** Plain-text summary of a form for one-tap email / WhatsApp sending. */
export function summarise(fields: Record<string, unknown>) {
  const skip = new Set(["website", "startedAt", "turnstileToken", "consent", "type", "sourcePage"]);
  return Object.entries(fields)
    .filter(([k, v]) => !skip.has(k) && v !== "" && v != null && typeof v !== "object")
    .map(([k, v]) => `${k.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase())}: ${String(v)}`)
    .join("\n");
}
