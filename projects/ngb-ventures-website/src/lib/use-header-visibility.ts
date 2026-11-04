"use client";
import { useEffect, useState } from "react";

/**
 * Flicker-free header state for a hide-on-scroll-down / reveal-on-scroll-up header.
 *
 * Why the previous version blinked: it recomputed `hidden` from each single scroll event, so any
 * tiny downward delta (trackpads, momentum, phones) reset it to visible and the next delta hid it again.
 *
 * This version:
 *  - reads scroll once per animation frame (rAF), and updates React state only when a value changes;
 *  - accumulates travel in each direction separately with hysteresis: hide after 72px of net downward
 *    travel, reveal after 24px of net upward travel. Small reversals only nudge the counters, so jitter
 *    can never toggle the header, yet a long scroll with tiny wobbles still hides it once;
 *  - ignores layout jumps (>160px in one frame: scroll anchoring, lazy sections, anchor links);
 *  - clamps iOS rubber-band overscroll at the top and bottom;
 *  - only hides below 400px and always reveals above 120px (a band, so bouncing near the top can't toggle it);
 *  - keeps the header visible near the top, when `pinned` (menus open), and for reduced-motion users;
 *  - gives the solid background its own hysteresis (on above 32px, off below 8px).
 */
export const HEADER_HIDE_AFTER = 72;
export const HEADER_REVEAL_AFTER = 24;
export const HEADER_TOP_ZONE = 120;
/** The header may only hide below this point; with HEADER_TOP_ZONE this forms a hysteresis band near the top. */
export const HEADER_HIDE_MIN_Y = 400;
const JUMP = 160;

export function useHeaderVisibility(pinned: boolean) {
  const [state, setState] = useState({ solid: false, hidden: false });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lastY = window.scrollY;
    let down = 0;
    let up = 0;
    let solid = false;
    let hidden = false;
    let frame = 0;

    const update = () => {
      frame = 0;
      const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const y = Math.min(Math.max(window.scrollY, 0), max);
      const dy = y - lastY;
      lastY = y;

      if (Math.abs(dy) > JUMP) { down = 0; up = 0; } // layout jump, not a user gesture
      else if (dy > 0) { down += dy; up = Math.max(0, up - dy); }
      else if (dy < 0) { up -= dy; down = Math.max(0, down + dy); }

      const nextSolid = solid ? y > 8 : y > 32;
      let nextHidden = hidden;
      if (pinned || reduce.matches || y < HEADER_TOP_ZONE) nextHidden = false;
      else if (!hidden && y > HEADER_HIDE_MIN_Y && down > HEADER_HIDE_AFTER) nextHidden = true;
      else if (hidden && up > HEADER_REVEAL_AFTER) nextHidden = false;
      if (nextHidden !== hidden) { down = 0; up = 0; }

      if (nextSolid !== solid || nextHidden !== hidden) {
        solid = nextSolid;
        hidden = nextHidden;
        setState({ solid, hidden });
      }
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pinned]);

  return state;
}
