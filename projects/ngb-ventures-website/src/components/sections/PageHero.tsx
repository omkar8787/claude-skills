import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import type { Plate as PlateT } from "@/content/types";
import { Plate } from "@/components/ui/Plate";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { MaskLines } from "@/components/ui/MaskLines";

type Props = {
  plate: PlateT;
  eyebrow?: string;
  title: string;
  italic?: string;
  lede?: ReactNode;
  crumbs: { name: string; href: string }[];
  ctas?: { label: string; href: string; variant?: "bronze" | "ghost" }[];
  meta?: { k: string; v: string }[];
  plateLabel?: string;
  plateNumber?: string;
  compact?: boolean;
};

/** Light editorial hero shared by all inner pages. */
export function PageHero({ plate, eyebrow, title, italic, lede, crumbs, ctas = [], meta, compact }: Props) {
  return (
    <section className="on-dark tone-light relative isolate overflow-hidden bg-charcoal text-ivory">
      <div className="absolute inset-0 -z-10 lg:left-[46%]">
        <Plate plate={plate} priority className="h-full w-full" sizes="(min-width:1024px) 54vw, 100vw" intensity="full" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/70 to-transparent lg:via-charcoal/10" />
        <div className="absolute inset-0 bg-charcoal/80 lg:hidden" />
      </div>
      <div className={`container-x flex flex-col justify-end pb-14 pt-32 lg:pb-20 ${compact ? "min-h-[52svh] lg:min-h-[60svh]" : "min-h-[78svh] lg:min-h-[86svh]"}`}>
        <Breadcrumbs items={crumbs} />
        <div className="mt-10 max-w-4xl">
          {eyebrow && <p className="eyebrow mb-6">{eyebrow}</p>}
          <h1 className="display text-balance text-[clamp(3rem,7.6vw,7.25rem)]">
            <MaskLines lines={italic ? [title, <em key="i">{italic}</em>] : [title]} />
          </h1>
          {lede && <div className="lede mt-8 max-w-xl text-pretty">{lede}</div>}
          {ctas.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-3">
              {ctas.map((c) => <Link key={c.href + c.label} href={c.href} className={`btn ${c.variant === "ghost" ? "btn-ghost" : "btn-bronze"}`}>{c.label} <ArrowRight className="arrow h-4 w-4" /></Link>)}
            </div>
          )}
        </div>
        {meta && meta.length > 0 && (
          <dl className="mt-16 grid grid-cols-2 gap-6 border-t border-ivory/15 pt-6 md:grid-cols-4">
            {meta.map((m) => <div key={m.k}><dt className="ledger text-ivory/60">{m.k}</dt><dd className="mt-2 text-sm text-ivory/85">{m.v}</dd></div>)}
          </dl>
        )}
      </div>
    </section>
  );
}
