"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { runtimeConfig, track } from "@/lib/runtime-config";

const CONSENT_KEY = "ngb-analytics-consent";
const EEA = ["AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IE","IT","LV","LT","LU","MT","NL","PL","PT","RO","SK","SI","ES","SE","IS","LI","NO","GB","CH"];

function readConsent(): "granted" | "denied" | null {
  try { const v = localStorage.getItem(CONSENT_KEY); return v === "granted" || v === "denied" ? v : null; } catch { return null; }
}

/**
 * Google Analytics 4 with Consent Mode v2.
 * Loads only when a measurement ID is set (site-config.js or NEXT_PUBLIC_GA_ID).
 * Analytics storage defaults to denied for EEA/UK/CH visitors until they accept; ad storage is always denied.
 */
export function Analytics() {
  const pathname = usePathname();
  const [gaId, setGaId] = useState("");
  const [ask, setAsk] = useState(false);

  useEffect(() => {
    const id = runtimeConfig().gaId;
    if (!id || !/^G-[A-Z0-9]+$/i.test(id) || window.gtag) { if (id) setGaId(id); return; }
    window.dataLayer = window.dataLayer || [];
    // gtag.js expects the native arguments object, not an array.
    // eslint-disable-next-line prefer-rest-params
    window.gtag = function gtag() { window.dataLayer!.push(arguments); };
    const choice = readConsent();
    const deny = { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" };
    window.gtag("consent", "default", { ...deny, analytics_storage: "denied", region: EEA, wait_for_update: 500 });
    window.gtag("consent", "default", { ...deny, analytics_storage: "granted" });
    if (choice) window.gtag("consent", "update", { analytics_storage: choice });
    window.gtag("js", new Date());
    window.gtag("config", id, { send_page_view: false, anonymize_ip: true });
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    document.head.appendChild(s);
    setGaId(id);
    setAsk(choice === null);
  }, []);

  useEffect(() => {
    if (!gaId) return;
    track("page_view", { page_location: window.location.href, page_path: window.location.pathname, page_title: document.title });
  }, [gaId, pathname]);

  // Outbound contact clicks → GA4 events, site-wide.
  useEffect(() => {
    if (!gaId) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      const href = a?.getAttribute("href") || "";
      if (href.startsWith("mailto:")) track("contact_email_click", { link_url: href.split("?")[0] });
      else if (href.includes("wa.me/")) track("contact_whatsapp_click", {});
      else if (href.startsWith("tel:")) track("contact_phone_click", {});
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [gaId]);

  if (!gaId || !ask) return null;
  const decide = (v: "granted" | "denied") => {
    try { localStorage.setItem(CONSENT_KEY, v); } catch { /* ignore */ }
    window.gtag?.("consent", "update", { analytics_storage: v });
    setAsk(false);
  };
  return (
    <div role="region" aria-label="Analytics consent" className="fixed inset-x-3 bottom-24 z-[70] mx-auto max-w-xl rounded-sm border border-line bg-ivory p-4 text-sm text-charcoal shadow-[0_20px_60px_-20px_rgba(0,0,0,.35)] md:bottom-6">
      <p className="leading-relaxed text-stone-ink">We use Google Analytics to understand which pages help international buyers. No advertising cookies. <a href="/privacy" className="underline underline-offset-2">Privacy</a></p>
      <div className="mt-3 flex gap-2"><button type="button" onClick={() => decide("granted")} className="btn btn-primary min-h-10 px-4">Accept analytics</button><button type="button" onClick={() => decide("denied")} className="btn btn-ghost min-h-10 px-4">Decline</button></div>
    </div>
  );
}
