import type { ReactNode } from "react";

export function SectionHead({ eyebrow, title, lede, align = "split", dark, id }: { eyebrow?: string; title: ReactNode; lede?: ReactNode; align?: "split" | "stack"; dark?: boolean; id?: string }) {
  return (
    <div className={`${align === "split" ? "grid gap-8 lg:grid-cols-12 lg:items-end" : "max-w-3xl"} ${dark ? "on-dark" : ""}`}>
      <div className={align === "split" ? "lg:col-span-7" : ""}>
        {eyebrow && <p className="eyebrow mb-6">{eyebrow}</p>}
        <h2 id={id} className="display text-balance text-[clamp(2.4rem,5.2vw,4.75rem)]">{title}</h2>
      </div>
      {lede && <div className={align === "split" ? "lg:col-span-4 lg:col-start-9" : "mt-6"}><p className="lede text-pretty">{lede}</p></div>}
    </div>
  );
}
