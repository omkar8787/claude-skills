import "server-only";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import type { Enquiry } from "./enquiry-schema";
import type { Attachment } from "./upload";

export type DeliveryResult = { channel: string; ok: boolean; error?: string };

const clean = (e: Enquiry) => {
  const { website: _hp, turnstileToken: _t, startedAt: _s, ...rest } = e as Enquiry & { website?: string };
  void _hp; void _t; void _s;
  return rest;
};

export function configuredChannels() {
  return {
    resend: Boolean(process.env.RESEND_API_KEY && process.env.ENQUIRY_TO_EMAIL && process.env.ENQUIRY_FROM_EMAIL),
    webhook: Boolean(process.env.ENQUIRY_WEBHOOK_URL),
    file: process.env.ENQUIRY_FILE_SINK === "true" && process.env.NODE_ENV !== "production",
  };
}

/** Lead category used for routing, e.g. "sourcing / Retailer / United States". */
export function leadCategory(e: Enquiry) {
  if (e.type === "lead") return `${e.pathway} / ${e.role} / ${e.destination || e.country}`;
  if (e.type === "sourcing") return `sourcing / ${e.category} / ${e.targetCountry}`;
  if (e.type === "product-development") return `manufacturing / product-development / ${e.targetMarket}`;
  return `general / ${e.topic}`;
}

function toText(id: string, e: Enquiry, att?: Attachment | null) {
  const lines = Object.entries(clean(e)).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : String(v)}`);
  return `New ${e.type} enquiry (${id})\nCategory: ${leadCategory(e)}\n${att ? `Attachment: ${att.filename} (${Math.round(att.size / 1024)} KB)\n` : ""}\n${lines.join("\n")}`;
}

async function viaResend(id: string, e: Enquiry, att?: Attachment | null): Promise<DeliveryResult> {
  try {
    const subject = e.type === "lead" ? `${e.pathway} lead: ${e.role} → ${e.destination || e.country}` : e.type === "sourcing" ? `Sourcing enquiry: ${e.category} → ${e.targetCountry}` : e.type === "product-development" ? `Product development: ${e.productName}` : `Contact: ${e.topic}`;
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: process.env.ENQUIRY_FROM_EMAIL, to: process.env.ENQUIRY_TO_EMAIL!.split(","), reply_to: e.email, subject: `[NGB] ${subject}`, text: toText(id, e, att), ...(att ? { attachments: [{ filename: att.filename, content: att.base64 }] } : {}) }),
      signal: AbortSignal.timeout(10000),
    });
    return res.ok ? { channel: "resend", ok: true } : { channel: "resend", ok: false, error: `HTTP ${res.status}` };
  } catch (err) {
    return { channel: "resend", ok: false, error: (err as Error).message };
  }
}

async function viaWebhook(id: string, e: Enquiry, att?: Attachment | null): Promise<DeliveryResult> {
  try {
    const attachment = att ? (att.size <= 2 * 1024 * 1024 ? { filename: att.filename, contentType: att.contentType, base64: att.base64 } : { filename: att.filename, contentType: att.contentType, note: "Larger than 2 MB; delivered by email channel only" }) : null;
    const body = JSON.stringify({ id, receivedAt: new Date().toISOString(), category: leadCategory(e), enquiry: clean(e), attachment });
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (process.env.ENQUIRY_WEBHOOK_SECRET) headers["X-NGB-Signature"] = crypto.createHmac("sha256", process.env.ENQUIRY_WEBHOOK_SECRET).update(body).digest("hex");
    const res = await fetch(process.env.ENQUIRY_WEBHOOK_URL!, { method: "POST", headers, body, signal: AbortSignal.timeout(10000) });
    return res.ok ? { channel: "webhook", ok: true } : { channel: "webhook", ok: false, error: `HTTP ${res.status}` };
  } catch (err) {
    return { channel: "webhook", ok: false, error: (err as Error).message };
  }
}

async function viaFile(id: string, e: Enquiry, att?: Attachment | null): Promise<DeliveryResult> {
  try {
    const dir = path.join(process.cwd(), ".data");
    await fs.mkdir(dir, { recursive: true });
    if (att) { await fs.mkdir(path.join(dir, "uploads"), { recursive: true }); await fs.writeFile(path.join(dir, "uploads", `${id}-${att.filename}`), Buffer.from(att.base64, "base64")); }
    await fs.appendFile(path.join(dir, "enquiries.jsonl"), JSON.stringify({ id, receivedAt: new Date().toISOString(), category: leadCategory(e), enquiry: clean(e), attachment: att?.filename ?? null }) + "\n");
    return { channel: "file", ok: true };
  } catch (err) {
    return { channel: "file", ok: false, error: (err as Error).message };
  }
}

export async function deliver(e: Enquiry, att: Attachment | null = null) {
  const id = `NGB-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(2).toString("hex").toUpperCase()}`;
  const ch = configuredChannels();
  const jobs: Promise<DeliveryResult>[] = [];
  if (ch.resend) jobs.push(viaResend(id, e, att));
  if (ch.webhook) jobs.push(viaWebhook(id, e, att));
  if (ch.file) jobs.push(viaFile(id, e, att));
  const results = await Promise.all(jobs);
  return { id, configured: jobs.length > 0, results, ok: results.some((r) => r.ok) };
}

export async function verifyTurnstile(token: string | undefined, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured: rely on honeypot + timing + rate limit
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
      signal: AbortSignal.timeout(8000),
    });
    const data = (await res.json()) as { success?: boolean };
    return Boolean(data.success);
  } catch {
    return false;
  }
}
