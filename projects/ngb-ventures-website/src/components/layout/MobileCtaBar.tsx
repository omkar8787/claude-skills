"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

const HIDE_ON = ["/enquire", "/contact", "/product-development"];

/** Discreet mobile-only CTA that appears after the hero and hides near the footer and on form pages. */
export function MobileCtaBar() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [hidden, setHidden] = useState(false); // decided after mount → identical server/client markup
  useEffect(() => { const path = pathname.replace(/\.html$/, ""); setHidden(HIDE_ON.some((p) => path.endsWith(p))); }, [pathname]);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY; const max = document.documentElement.scrollHeight - window.innerHeight;
      setShow(y > window.innerHeight * 0.9 && y < max - 900);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);
  if (hidden) return null;
  return (
    <div className={`no-print fixed inset-x-3 bottom-3 z-40 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] md:hidden ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`}>
      <Link href="/enquire" className="flex h-14 items-center justify-between rounded-full bg-charcoal pl-6 pr-2 text-sm font-semibold text-ivory shadow-[0_20px_40px_-15px_rgba(0,0,0,.6)]">
        Start your sourcing brief
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-bronze text-charcoal"><ArrowRight className="h-4 w-4" /></span>
      </Link>
    </div>
  );
}
