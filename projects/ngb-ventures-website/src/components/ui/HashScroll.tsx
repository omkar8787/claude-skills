"use client";
import { useEffect } from "react";

/**
 * Lands #anchor links precisely. The browser jumps to the anchor before scripts finish laying out
 * pinned/scroll-driven sections, which can shift the page afterwards. Once layout settles, re-align
 * to the target, but only if the user hasn't started scrolling themselves.
 */
export function HashScroll() {
  useEffect(() => {
    const align = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      let userMoved = false;
      const stop = () => { userMoved = true; };
      window.addEventListener("wheel", stop, { once: true, passive: true });
      window.addEventListener("touchstart", stop, { once: true, passive: true });
      window.addEventListener("keydown", stop, { once: true });
      const go = () => {
        if (userMoved) return;
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.getBoundingClientRect().top;
        if (Math.abs(top) > 4) window.scrollBy({ top, behavior: "instant" as ScrollBehavior });
      };
      [120, 600, 1400].forEach((t) => window.setTimeout(go, t));
    };
    if (document.readyState === "complete") align(); else window.addEventListener("load", align, { once: true });
  }, []);
  return null;
}
