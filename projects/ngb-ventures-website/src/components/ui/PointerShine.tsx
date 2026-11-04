"use client";
import { useEffect } from "react";

/**
 * One document-level listener that feeds the pointer position to the nearest `.shine` element
 * (as --mx / --my), for a soft "light across brass" highlight. Fine pointers only, rAF-throttled,
 * skipped for reduced motion. No custom cursor: the real cursor is never replaced.
 */
export function PointerShine() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0; let ev: PointerEvent | null = null;
    const apply = () => {
      frame = 0; if (!ev) return;
      const el = (ev.target as HTMLElement | null)?.closest?.(".shine") as HTMLElement | null;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${ev.clientX - r.left}px`);
      el.style.setProperty("--my", `${ev.clientY - r.top}px`);
    };
    const onMove = (e: PointerEvent) => { ev = e; if (!frame) frame = requestAnimationFrame(apply); };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => { document.removeEventListener("pointermove", onMove); if (frame) cancelAnimationFrame(frame); };
  }, []);
  return null;
}
