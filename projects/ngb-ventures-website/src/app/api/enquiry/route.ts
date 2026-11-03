import { NextResponse, type NextRequest } from "next/server";
import { enquirySchema } from "@/lib/enquiry-schema";
import { deliver, verifyTurnstile } from "@/lib/enquiry-delivery";

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

  if (!(req.headers.get("content-type") ?? "").includes("application/json")) {
    return NextResponse.json({ ok: false, code: "bad_request", message: "Expected JSON." }, { status: 415 });
  }
  const origin = req.headers.get("origin");
  if (origin && new URL(origin).host !== req.headers.get("host")) {
    return NextResponse.json({ ok: false, code: "forbidden", message: "Cross-origin submissions are not allowed." }, { status: 403 });
  }
  if (limited(ip)) {
    return NextResponse.json({ ok: false, code: "rate_limited", message: "Too many submissions. Please try again in a few minutes." }, { status: 429 });
  }

  let body: unknown;
  try {
    const raw = await req.text();
    if (raw.length > 50_000) throw new Error("too large");
    body = JSON.parse(raw);
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

  const result = await deliver(data);
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
