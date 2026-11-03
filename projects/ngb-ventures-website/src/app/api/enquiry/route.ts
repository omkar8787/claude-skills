import { NextResponse, type NextRequest } from "next/server";
import { enquirySchema } from "@/lib/enquiry-schema";
import { deliver, verifyTurnstile } from "@/lib/enquiry-delivery";
import { readAttachment, MAX_UPLOAD } from "@/lib/upload";
import type { Attachment } from "@/lib/upload";

export const runtime = "nodejs";

// Best-effort in-memory rate limit (per instance). For multi-instance deployments use Upstash/Redis.
const hits = new Map<string, number[]>();
const WINDOW = 10 * 60 * 1000;
const LIMIT = 5;

function limited(ip: string) {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  arr.push(now);
  hits.set(ip, arr);
  if (hits.size > 5000) hits.clear();
  return arr.length > LIMIT;
}

export async function POST(req: NextRequest) {
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";

  const ctype = req.headers.get("content-type") ?? "";
  const isMultipart = ctype.includes("multipart/form-data");
  if (!ctype.includes("application/json") && !isMultipart) {
    return NextResponse.json({ ok: false, code: "bad_request", message: "Expected JSON or multipart form data." }, { status: 415 });
  }
  if (Number(req.headers.get("content-length") ?? 0) > MAX_UPLOAD + 200_000) {
    return NextResponse.json({ ok: false, code: "too_large", message: "The upload is too large. The limit is 4 MB." }, { status: 413 });
  }
  const origin = req.headers.get("origin");
  if (origin && new URL(origin).host !== req.headers.get("host")) {
    return NextResponse.json({ ok: false, code: "forbidden", message: "Cross-origin submissions are not allowed." }, { status: 403 });
  }
  if (limited(ip)) {
    return NextResponse.json({ ok: false, code: "rate_limited", message: "Too many submissions. Please try again in a few minutes." }, { status: 429 });
  }

  let body: unknown;
  let attachment: Attachment | null = null;
  try {
    if (isMultipart) {
      const form = await req.formData();
      const obj: Record<string, unknown> = {};
      for (const [k, v] of form.entries()) if (typeof v === "string" && k !== "file") obj[k] = v.slice(0, 5000);
      obj.startedAt = Number(obj.startedAt);
      obj.consent = obj.consent === "true";
      body = obj;
      const file = form.get("file");
      const read = await readAttachment(file instanceof File ? file : null);
      if (!read.ok) return NextResponse.json({ ok: false, code: "validation", message: read.message, fieldErrors: { file: read.message } }, { status: 422 });
      attachment = read.attachment;
    } else {
      const raw = await req.text();
      if (raw.length > 50_000) throw new Error("too large");
      body = JSON.parse(raw);
    }
  } catch {
    return NextResponse.json({ ok: false, code: "bad_request", message: "Invalid request body." }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) fieldErrors[issue.path.join(".")] ??= issue.message;
    return NextResponse.json({ ok: false, code: "validation", message: "Please check the highlighted fields.", fieldErrors }, { status: 422 });
  }
  const data = parsed.data;

  // Spam heuristics: honeypot filled or submitted implausibly fast → accept silently (don't teach bots), don't deliver.
  const elapsed = Date.now() - data.startedAt;
  if (data.website || elapsed < 2500) {
    return NextResponse.json({ ok: true, id: "NGB-RECEIVED" }, { status: 200 });
  }
  if (!(await verifyTurnstile(data.turnstileToken, ip))) {
    return NextResponse.json({ ok: false, code: "captcha", message: "Verification failed. Please retry." }, { status: 400 });
  }

  const result = await deliver(data, attachment);
  if (!result.configured) {
    return NextResponse.json(
      { ok: false, code: "not_configured", message: "Our enquiry inbox is not connected yet. Please email or WhatsApp us directly." },
      { status: 503 },
    );
  }
  if (!result.ok) {
    console.error("[enquiry] all delivery channels failed", result.results);
    return NextResponse.json({ ok: false, code: "delivery_failed", message: "We could not deliver your enquiry. Please try again or contact us directly." }, { status: 502 });
  }
  return NextResponse.json({ ok: true, id: result.id });
}

export function GET() {
  return NextResponse.json({ ok: false, message: "Method not allowed" }, { status: 405 });
}
