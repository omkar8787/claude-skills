"use client";
import { useEffect, useState } from "react";
import { Link2, Share2, Check } from "lucide-react";
import { BrandIcon } from "./icons";
import { track } from "@/lib/runtime-config";

/** Share the current page to WhatsApp, LinkedIn, Facebook, X, or copy the link. Uses the native share sheet on phones. */
export function ShareBar({ title, className = "" }: { title: string; className?: string }) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [native, setNative] = useState(false);
  useEffect(() => { setUrl(window.location.href.split("#")[0]); setNative(typeof navigator.share === "function"); }, []);
  if (!url) return null;
  const u = encodeURIComponent(url), t = encodeURIComponent(title);
  const targets = [
    { k: "whatsapp" as const, label: "WhatsApp", href: `https://wa.me/?text=${t}%20${u}` },
    { k: "linkedin" as const, label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { k: "facebook" as const, label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { k: "x" as const, label: "X", href: `https://x.com/intent/post?text=${t}&url=${u}` },
  ];
  const btn = "inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-charcoal transition-colors hover:border-charcoal hover:bg-charcoal hover:text-ivory";
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <span className="ledger mr-2 text-stone-ink">Share</span>
      {native && <button type="button" className={btn} aria-label="Share" onClick={() => { track("share", { method: "native", content_type: "page" }); navigator.share({ title, url }).catch(() => {}); }}><Share2 className="h-4 w-4" /></button>}
      {targets.map((s) => (
        <a key={s.k} href={s.href} target="_blank" rel="noopener noreferrer" className={btn} aria-label={`Share on ${s.label}`} onClick={() => track("share", { method: s.k, content_type: "page" })}><BrandIcon name={s.k} /></a>
      ))}
      <button type="button" className={btn} aria-label={copied ? "Link copied" : "Copy link"} onClick={async () => { try { await navigator.clipboard.writeText(url); setCopied(true); track("share", { method: "copy" }); setTimeout(() => setCopied(false), 1800); } catch { /* ignore */ } }}>
        {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
      </button>
    </div>
  );
}
