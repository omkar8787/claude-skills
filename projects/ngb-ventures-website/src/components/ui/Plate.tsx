import "server-only";
import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import type { Plate as PlateT, Motif, Tone } from "@/content/types";
import { GLYPHS, GLYPH_BY_SLOT } from "./glyphs";

const TONES: Record<Tone, { a: string; b: string; m: string; light: string }> = {
  charcoal: { a: "#141312", b: "#2c2925", m: "#a98758", light: "rgba(201,173,133,.28)" },
  bronze: { a: "#5c462b", b: "#a98758", m: "#f6f3ed", light: "rgba(255,240,214,.35)" },
  indigo: { a: "#161b27", b: "#33405a", m: "#c9ad85", light: "rgba(201,173,133,.22)" },
  clay: { a: "#4a2f20", b: "#8c5a3c", m: "#f0dfc6", light: "rgba(255,226,190,.3)" },
  olive: { a: "#2e2e20", b: "#5e5b3f", m: "#ddd3b0", light: "rgba(240,230,190,.25)" },
  madder: { a: "#2f1614", b: "#6e2f2a", m: "#ecd0b0", light: "rgba(255,210,170,.25)" },
  sand: { a: "#a8936f", b: "#e2d5bd", m: "#6b4f2b", light: "rgba(255,250,240,.55)" },
  stone: { a: "#4d4b46", b: "#8f8b84", m: "#f1ece3", light: "rgba(255,255,255,.28)" },
  forest: { a: "#13261d", b: "#2b4b3a", m: "#c9ad85", light: "rgba(201,173,133,.22)" },
};

const EXT = [".webp", ".jpg", ".jpeg", ".png", ".avif"];
const cache = new Map<string, string | null>();
function findPhoto(slot: string): string | null {
  if (cache.has(slot)) return cache.get(slot)!;
  let found: string | null = null;
  for (const e of EXT) {
    if (fs.existsSync(path.join(process.cwd(), "public", "media", slot + e))) { found = `/media/${slot}${e}`; break; }
  }
  cache.set(slot, found);
  return found;
}

function hash(s: string) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function rng(seed: number) { return () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; }; }

function MotifPattern({ motif, id, c }: { motif: Motif; id: string; c: string }) {
  const s = { stroke: c, fill: "none", strokeWidth: 1 } as const;
  switch (motif) {
    case "knit":
      return (
        <pattern id={id} width="28" height="20" patternUnits="userSpaceOnUse">
          <path d="M0 2 L7 16 L14 2 M14 2 L21 16 L28 2" {...s} strokeWidth={1.2} />
        </pattern>
      );
    case "weave":
      return (
        <pattern id={id} width="32" height="32" patternUnits="userSpaceOnUse">
          <rect x="1" y="3" width="14" height="10" {...s} /><rect x="17" y="1" width="10" height="14" {...s} />
          <rect x="3" y="17" width="10" height="14" {...s} /><rect x="17" y="19" width="14" height="10" {...s} />
        </pattern>
      );
    case "block":
      return (
        <pattern id={id} width="56" height="56" patternUnits="userSpaceOnUse">
          <g {...s}>
            <path d="M28 10 C33 18 33 22 28 28 C23 22 23 18 28 10Z M28 46 C33 38 33 34 28 28 C23 34 23 38 28 46Z M10 28 C18 23 22 23 28 28 C22 33 18 33 10 28Z M46 28 C38 23 34 23 28 28 C34 33 38 33 46 28Z" />
            <circle cx="28" cy="28" r="2.5" /><circle cx="0" cy="0" r="3" /><circle cx="56" cy="0" r="3" /><circle cx="0" cy="56" r="3" /><circle cx="56" cy="56" r="3" />
          </g>
        </pattern>
      );
    case "jali":
      return (
        <pattern id={id} width="48" height="48" patternUnits="userSpaceOnUse">
          <g {...s}><circle cx="24" cy="24" r="17" /><circle cx="0" cy="0" r="17" /><circle cx="48" cy="0" r="17" /><circle cx="0" cy="48" r="17" /><circle cx="48" cy="48" r="17" /><path d="M24 0 V7 M24 41 V48 M0 24 H7 M41 24 H48" /></g>
        </pattern>
      );
    case "radial":
      return (
        <pattern id={id} width="120" height="120" patternUnits="userSpaceOnUse">
          <g {...s}>{[8, 20, 32, 44, 56].map((r) => <circle key={r} cx="60" cy="60" r={r} />)}{Array.from({ length: 16 }).map((_, i) => { const a = (i / 16) * Math.PI * 2; return <path key={i} d={`M${60 + Math.cos(a) * 8} ${60 + Math.sin(a) * 8} L${60 + Math.cos(a) * 56} ${60 + Math.sin(a) * 56}`} strokeWidth={0.6} />; })}</g>
        </pattern>
      );
    case "botanical":
      return (
        <pattern id={id} width="64" height="80" patternUnits="userSpaceOnUse">
          <g {...s}><path d="M32 76 C32 50 32 30 32 6" /><path d="M32 60 C22 56 16 48 14 40 C24 42 30 50 32 60Z M32 44 C42 40 48 32 50 24 C40 26 34 34 32 44Z M32 28 C24 24 20 18 19 12 C27 14 31 20 32 28Z" /></g>
        </pattern>
      );
    case "facet":
      return (
        <pattern id={id} width="60" height="52" patternUnits="userSpaceOnUse">
          <g {...s}><path d="M0 0 L30 52 L60 0 Z M0 52 L30 0 L60 52" /><path d="M15 26 H45" /></g>
        </pattern>
      );
    case "blueprint":
      return (
        <pattern id={id} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0 H0 V40" {...s} strokeWidth={0.6} /><path d="M20 0 V40 M0 20 H40" {...s} strokeWidth={0.3} strokeDasharray="2 3" />
        </pattern>
      );
    case "route":
      return (
        <pattern id={id} width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="8" cy="8" r="0.9" fill={c} /></pattern>
      );
    case "fold":
      return (
        <pattern id={id} width="90" height="90" patternUnits="userSpaceOnUse">
          <path d="M0 90 L45 0 L90 90 Z" fill={c} fillOpacity={0.08} /><path d="M45 0 L90 90 M0 90 L45 0 M0 45 H90" {...s} strokeWidth={0.7} />
        </pattern>
      );
    case "dots":
    default:
      return (
        <pattern id={id} width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="7" cy="7" r="2" fill={c} /></pattern>
      );
  }
}

function Feature({ motif, c, seed }: { motif: Motif; c: string; seed: string }) {
  const r = rng(hash(seed));
  if (motif === "grain") {
    // Procedural wood grain: offset, wavy contour lines around a knot.
    const cx = 200 + r() * 400, cy = 150 + r() * 300;
    return (
      <g stroke={c} fill="none" strokeWidth={1}>
        {Array.from({ length: 18 }).map((_, i) => {
          const rad = 12 + i * 28; const w = 0.18 + r() * 0.12;
          const pts = Array.from({ length: 22 }).map((__, k) => { const a = (k / 21) * Math.PI * 2; const rr = rad * (1 + Math.sin(a * 3 + i * 0.4) * w * 0.3); return `${(cx + Math.cos(a) * rr * 2.4).toFixed(0)},${(cy + Math.sin(a) * rr * 0.7).toFixed(0)}`; });
          return <polyline key={i} points={pts.join(" ")} opacity={0.35 + (i % 3) * 0.15} />;
        })}
      </g>
    );
  }
  if (motif === "route") {
    return (
      <g stroke={c} fill="none" strokeWidth={1.2}>
        {Array.from({ length: 5 }).map((_, i) => <path key={i} d={`M ${120 + i * 30} ${520 - i * 20} Q ${400} ${60 + i * 50} ${700 + r() * 60} ${200 + i * 60}`} strokeDasharray="1 7" strokeLinecap="round" opacity={0.8} />)}
        <circle cx="120" cy="520" r="5" fill={c} />
      </g>
    );
  }
  if (motif === "radial") {
    const cx = 260 + r() * 300, cy = 200 + r() * 200;
    return <g stroke={c} fill="none">{Array.from({ length: 12 }).map((_, i) => <circle key={i} cx={cx} cy={cy} r={30 + i * 34} opacity={0.6 - i * 0.04} strokeWidth={i % 4 === 0 ? 1.4 : 0.6} />)}</g>;
  }
  if (motif === "blueprint") {
    const cx = 300 + r() * 220, cy = 250 + r() * 120;
    return (
      <g stroke={c} fill="none" strokeWidth={1}>
        <circle cx={cx} cy={cy} r={140} /><circle cx={cx} cy={cy} r={92} /><circle cx={cx} cy={cy} r={28} />
        <path d={`M${cx - 200} ${cy} H${cx + 200} M${cx} ${cy - 200} V${cy + 200}`} strokeDasharray="10 4 2 4" opacity={0.7} />
        <path d={`M${cx - 140} ${cy + 175} H${cx + 140} M${cx - 140} ${cy + 168} V${cy + 182} M${cx + 140} ${cy + 168} V${cy + 182}`} />
      </g>
    );
  }
  return null;
}

type Props = {
  plate: PlateT;
  className?: string;
  label?: string;
  number?: string;
  priority?: boolean;
  sizes?: string;
  /** "full" renders motif across the frame, "quiet" lowers motif contrast for text overlays */
  intensity?: "full" | "quiet";
};

/**
 * Editorial "plate": uses a licensed photo from /public/media/<slot>.* if present,
 * otherwise renders an original, art-directed SVG composition (no grey boxes).
 */
export function Plate({ plate, className = "", label, number, priority, sizes = "100vw", intensity = "full" }: Props) {
  const photo = findPhoto(plate.slot);
  const t = TONES[plate.tone];
  const id = `p-${plate.slot}`;
  const glyph = intensity === "full" ? GLYPHS[GLYPH_BY_SLOT[plate.slot] ?? ""] : undefined;
  return (
    <div className={`tone-reset relative isolate overflow-hidden ${className}`} style={{ background: t.a }}>
      {photo ? (
        <Image src={photo} alt={plate.alt} fill priority={priority} sizes={sizes} className="object-cover" />
      ) : (
        <svg role="img" aria-label={plate.alt} className="absolute inset-0 h-full w-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={t.b} /><stop offset="1" stopColor={t.a} /></linearGradient>
            <radialGradient id={`${id}-l`} cx="0.7" cy="0.25" r="0.75"><stop offset="0" stopColor={t.light} /><stop offset="1" stopColor="rgba(0,0,0,0)" /></radialGradient>
            <radialGradient id={`${id}-v`} cx="0.5" cy="0.5" r="0.8"><stop offset="0.55" stopColor="rgba(0,0,0,0)" /><stop offset="1" stopColor="rgba(0,0,0,.45)" /></radialGradient>
            <MotifPattern motif={plate.motif} id={`${id}-m`} c={t.m} />
            <linearGradient id={`${id}-fade`} x1="0" y1="0" x2="1" y2="0.6"><stop offset="0" stopColor="#fff" stopOpacity={intensity === "quiet" ? 0.12 : 0.05} /><stop offset="0.55" stopColor="#fff" stopOpacity={intensity === "quiet" ? 0.22 : 0.5} /><stop offset="1" stopColor="#fff" stopOpacity={intensity === "quiet" ? 0.3 : 0.85} /></linearGradient>
            <mask id={`${id}-mask`}><rect width="800" height="600" fill={`url(#${id}-fade)`} /></mask>
          </defs>
          <rect width="800" height="600" fill={`url(#${id}-g)`} />
          <g mask={`url(#${id}-mask)`} opacity={(plate.tone === "sand" ? 0.55 : 0.42) * (glyph ? 0.55 : 1)}>
            <rect width="800" height="600" fill={`url(#${id}-m)`} />
            {!glyph && <Feature motif={plate.motif} c={t.m} seed={plate.slot} />}
          </g>
          <rect width="800" height="600" fill={`url(#${id}-l)`} />
          {glyph && (
            <g fill="none" stroke={t.m} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="400" cy="300" r="205" fill={t.light} stroke="none" opacity={0.55} />
              <circle cx="400" cy="300" r="232" strokeWidth={0.8} opacity={0.35} strokeDasharray="1 6" />
              <g transform="translate(406 306) scale(1.95) translate(-100 -100)" opacity={0.22} strokeWidth={1.1}>{glyph}</g>
              <g transform="translate(400 300) scale(1.95) translate(-100 -100)" opacity={0.92} strokeWidth={1.05}>{glyph}</g>
            </g>
          )}
          <rect width="800" height="600" fill={`url(#${id}-v)`} />
        </svg>
      )}
      <div aria-hidden className="grain pointer-events-none absolute inset-0" />
      {(label || number) && (
        <div className={`pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 md:p-5 ledger ${plate.tone === "sand" && !photo ? "text-charcoal/70" : "text-ivory/75"}`}>
          {number && <span>PL. {number}</span>}
          {label && <span className="truncate text-right">{label}</span>}
        </div>
      )}
    </div>
  );
}
