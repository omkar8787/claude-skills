"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

const HIDE_ON = ["/quote", "/contact", "/quote?type=manufacturing"];

/** Discreet mobile-only CTA that appears after the hero and hides near the footer and on form pages. */
export function MobileCtaBar() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [hidden, setHidden] = useState(false); // decided after mount → identical server/client markup
  useEffect(() => { const path = pathname.replace(/\.html$/, ""); setHidden(HIDE_ON.some((p) => path.endsWith(p))); }, [pathname]);
  useEffect(() => {
    // Visible after the first screen and until the footer appears. Uses hysteresis plus an
    // IntersectionObserver on the footer, so changing page height (lazy sections) can't make it flicker.
    let past = false, footer = false, frame = 0;
    const apply = () => setShow(past && !footer);
    const update = () => {
      frame = 0;
      const y = window.scrollY, h = window.innerHeight;
      const next = past ? y > h * 0.6 : y > h * 0.9;
      if (next !== past) { past = next; apply(); }
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    const el = document.querySelector("footer");
    const io = el ? new IntersectionObserver(([e]) => { footer = e.isIntersecting; apply(); }, { rootMargin: "0px 0px 120px 0px" }) : null;
    if (el && io) io.observe(el);
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); io?.disconnect(); if (frame) cancelAnimationFrame(frame); };
  }, [pathname]);
  if (hidden) return null;
  return (
    <div className={`no-print fixed inset-x-3 bottom-3 z-40 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] md:hidden ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`}>
      <Link href="/quote" className="flex h-14 items-center justify-between rounded-full bg-charcoal pl-6 pr-2 text-sm font-semibold text-ivory shadow-[0_20px_40px_-15px_rgba(0,0,0,.6)]">
        Start your sourcing brief
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-bronze text-charcoal"><ArrowRight className="h-4 w-4" /></span>
      </Link>
    </div>
  );
}
