import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import type { ReactNode } from "react";
import type { Titled } from "@/content/types";
import { processSteps } from "@/content/home";
import { Reveal } from "@/components/ui/Reveal";

export function IntroBlock({ eyebrow, title, paragraphs, aside }: { eyebrow: string; title: ReactNode; paragraphs: string[]; aside?: { k: string; v: ReactNode }[] }) {
  return (
    <section className="container-x py-24 lg:py-32">
      <div className="grid gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <p className="eyebrow mb-6">{eyebrow}</p>
          <h2 className="display text-balance text-[clamp(2rem,3.4vw,3.25rem)] leading-[1.02]">{title}</h2>
          <div className="prose-ngb mt-10 max-w-2xl text-[1.0625rem]">{paragraphs.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}</div>
        </Reveal>
        {aside && (
          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <div className="border-t border-charcoal lg:sticky lg:top-28">
              <p className="ledger border-b border-line py-4 text-bronze-ink">At a glance</p>
              <dl className="divide-y divide-line border-b border-charcoal">
              {aside.map((a) => (
                <div key={a.k} className="grid grid-cols-[7rem_1fr] gap-4 py-4 text-sm"><dt className="ledger pt-0.5 text-stone-ink">{a.k}</dt><dd className="leading-relaxed">{a.v}</dd></div>
              ))}
              </dl>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

export function NumberedList({ eyebrow, title, items, links }: { eyebrow: string; title: ReactNode; items: string[]; links?: { label: string; href: string }[] }) {
  return (
    <section className="border-t border-line bg-paper">
      <div className="container-x py-24 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4"><p className="eyebrow mb-6">{eyebrow}</p><h2 className="display text-[clamp(2.2rem,4vw,3.5rem)]">{title}</h2></div>
          <div className="lg:col-span-8">
            <ol className="grid gap-x-10 sm:grid-cols-2">
              {items.map((it, i) => (
                <li key={it} className="flex items-baseline gap-5 border-b border-line py-4"><span className="ledger text-bronze-ink">{String(i + 1).padStart(2, "0")}</span><span className="font-display text-[1.45rem] leading-snug">{it}</span></li>
              ))}
            </ol>
            {links && links.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-3">{links.map((l) => <Link key={l.href} href={l.href} className="btn btn-ghost">{l.label} <ArrowUpRight className="h-4 w-4" /></Link>)}</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CapabilityGrid({ eyebrow, title, items, dark }: { eyebrow: string; title: ReactNode; items: Titled[]; dark?: boolean }) {
  return (
    <section className={dark ? "on-dark tone-light bg-charcoal text-ivory" : ""}>
      <div className="container-x py-24 lg:py-32">
        <div className="max-w-3xl"><p className="eyebrow mb-6">{eyebrow}</p><h2 className="display text-[clamp(2.2rem,4.4vw,4rem)]">{title}</h2></div>
        <div className={`mt-14 grid gap-px overflow-hidden sm:grid-cols-2 ${items.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"} ${dark ? "bg-ivory/12" : "bg-line"}`}>
          {items.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.06} className={`p-8 lg:p-10 ${dark ? "bg-charcoal" : "bg-ivory"}`}>
              <span className={`ledger ${dark ? "text-bronze-soft" : "text-bronze-ink"}`}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-10 font-display text-[1.9rem] leading-tight">{c.title}</h3>
              <p className={`mt-4 leading-relaxed ${dark ? "text-ivory/65" : "text-stone-ink"}`}>{c.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TwoLists({ a, b }: { a: { eyebrow: string; title: string; items: string[] }; b: { eyebrow: string; title: string; items: string[] } }) {
  return (
    <section className="container-x py-24 lg:py-32">
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
        {[a, b].map((x) => (
          <Reveal key={x.title}>
            <p className="eyebrow mb-6">{x.eyebrow}</p>
            <h2 className="display text-[clamp(2rem,3.6vw,3.25rem)]">{x.title}</h2>
            <ul className="mt-10 border-t border-charcoal">
              {x.items.map((it) => <li key={it} className="flex items-start gap-4 border-b border-line py-4 text-[1.0rem] leading-relaxed"><Check className="mt-1 h-4 w-4 shrink-0 text-bronze-ink" />{it}</li>)}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function ComplianceGrid({ items, title = "Compliance considerations" }: { items: Titled[]; title?: string }) {
  return (
    <section className="on-dark tone-light bg-ink text-ivory">
      <div className="container-x py-24 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-6">Regulatory</p>
            <h2 className="display text-[clamp(2.2rem,4vw,3.5rem)]">{title}</h2>
            <p className="mt-6 text-sm leading-relaxed text-ivory/55">These are considerations to raise with your compliance advisor, testing lab or customs broker. They aren&apos;t legal advice. Regulations change, so verify current requirements for your product and market.</p>
          </div>
          <div className="grid gap-px overflow-hidden bg-ivory/10 sm:grid-cols-2 lg:col-span-8">
            {items.map((c) => (
              <div key={c.title} className="bg-ink p-7 lg:p-8"><h3 className="font-display text-2xl text-bronze-soft">{c.title}</h3><p className="mt-3 text-[0.95rem] leading-relaxed text-ivory/70">{c.body}</p></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function WorkflowStrip({ enquireHref }: { enquireHref: string }) {
  return (
    <section className="container-x py-24 lg:py-28">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div><p className="eyebrow mb-6">Sourcing workflow</p><h2 className="display text-[clamp(2.2rem,4vw,3.5rem)]">How a project <em>runs.</em></h2></div>
        <Link href={enquireHref} className="btn btn-primary">Start with step one <ArrowRight className="arrow h-4 w-4" /></Link>
      </div>
      <ol className="mt-14 grid grid-cols-1 gap-px overflow-hidden bg-line sm:grid-cols-2 lg:grid-cols-7">
        {processSteps.map((s) => (
          <li key={s.n} className="group bg-ivory p-6 transition-colors duration-500 hover:bg-charcoal hover:text-ivory">
            <span className="ledger text-bronze-ink group-hover:text-bronze-soft">{s.n}</span>
            <h3 className="mt-6 font-display text-[1.35rem] leading-tight">{s.title}</h3>
            <p className="ledger mt-6 text-[0.6rem] text-stone-ink group-hover:text-ivory/50">→ {s.output}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function InlineCta({ title, body, href, label }: { title: string; body: string; href: string; label: string }) {
  return (
    <section className="container-x pb-24">
      <div className="on-dark relative overflow-hidden rounded-sm bg-charcoal px-8 py-14 text-ivory md:px-14 md:py-16">
        <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div><h2 className="display max-w-2xl text-[clamp(2rem,4vw,3.5rem)]">{title}</h2><p className="mt-4 max-w-xl text-ivory/65">{body}</p></div>
          <Link href={href} className="btn btn-bronze">{label} <ArrowRight className="arrow h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  );
}
