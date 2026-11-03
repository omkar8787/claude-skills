import type { ReactNode } from "react";

/** Line-by-line mask reveal for display headlines. Pure CSS: starts at first paint (no hydration wait → better LCP). */
export function MaskLines({ lines, className, delay = 0 }: { lines: ReactNode[]; className?: string; delay?: number }) {
  return (
    <span className={className}>
      {lines.map((l, i) => (
        <span key={i} className="-mb-[0.08em] block overflow-hidden pb-[0.08em]">
          <span className="mask-line" style={{ ["--d" as string]: `${delay + i * 0.1}s` }}>{l}</span>
        </span>
      ))}
    </span>
  );
}
