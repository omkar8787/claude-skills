import Link from "next/link";
import { ArrowRight, Check, Handshake } from "lucide-react";
import type { ReactNode } from "react";
import type { Division } from "@/content/divisions";
import { divisions } from "@/content/divisions";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";

export function DivisionHero({ d, crumbs }: { d: Division; crumbs?: { name: string; href: string }[] }) {
  return (
    <PageHero
      plate={{ slot: `div-${d.slug}`, motif: "jali", tone: d.tone, alt: d.name, brief: d.name }}
      crumbs={crumbs ?? [{ name: "Capabilities", href: "/capabilities" }, { name: d.name, href: d.route }]}
      eyebrow={`Division ${d.index} · ${d.kicker}`}
      title={d.headline.split(". ")[0] + (d.headline.includes(". ") ? "." : "")}
      italic={d.headline.includes(". ") ? d.headline.split(". ").slice(1).join(". ") : undefined}
      lede={d.lede}
      ctas={[{ label: d.cta.label, href: d.cta.href }, { label: "All capabilities", href: "/capabilities", variant: "ghost" }]}
    />
  );
}

/** Honest split: what NGB delivers itself vs. what it coordinates through independent partners. */
export function DeliveredCoordinated({ d }: { d: Division }) {
  return (
    <section className="container-x py-24 lg:py-32">
      <div className="max-w-3xl"><p className="eyebrow mb-6">Clear roles</p><h2 className="display text-[clamp(2.2rem,4.4vw,4rem)]">What we do. <em>What we coordinate.</em></h2>
        <p className="lede mt-6">We&apos;re explicit about who does what. NGB Ventures doesn&apos;t own factories, freight companies or labs. We work with independent, licensed partners, chosen per project.</p></div>
      <div className="mt-14 grid gap-px overflow-hidden bg-line lg:grid-cols-2">
        <Reveal className="bg-ivory p-8 lg:p-12">
          <p className="ledger text-bronze-ink">Delivered by NGB Ventures</p>
          <ul className="mt-6 space-y-3">{d.delivered.map((x) => <li key={x} className="flex gap-3 leading-relaxed"><Check className="mt-1 h-4 w-4 shrink-0 text-bronze-ink" />{x}</li>)}</ul>
        </Reveal>
        <Reveal delay={0.08} className="bg-paper p-8 lg:p-12">
          <p className="ledger text-stone-ink">Coordinated through independent partners</p>
          <ul className="mt-6 space-y-3">{d.coordinated.map((x) => <li key={x} className="flex gap-3 leading-relaxed text-stone-ink"><Handshake className="mt-1 h-4 w-4 shrink-0" />{x}</li>)}</ul>
        </Reveal>
      </div>
      <div className="mt-14 grid gap-8 md:grid-cols-3">
        {d.outcomes.map((o, i) => <div key={o} className="border-t border-charcoal pt-4"><span className="ledger text-bronze-ink">Outcome {i + 1}</span><p className="mt-3 font-display text-2xl leading-snug">{o}</p></div>)}
      </div>
    </section>
  );
}

export function NextDivisions({ current }: { current: string }) {
  const rest = divisions.filter((d) => d.slug !== current);
  return (
    <section className="border-t border-line bg-paper py-20">
      <div className="container-x">
        <p className="eyebrow mb-8">Works with</p>
        <ul className="grid gap-px overflow-hidden bg-line sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((d) => (
            <li key={d.slug} className="bg-paper"><Link href={d.route} className="group flex h-full flex-col justify-between p-6 transition-colors duration-500 hover:bg-charcoal hover:text-ivory">
              <div><span className="ledger text-bronze-ink group-hover:text-bronze-soft">{d.index} · {d.kicker}</span><p className="mt-6 font-display text-2xl">{d.name}</p></div>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">Explore <ArrowRight className="h-4 w-4" /></span></Link></li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function SplitBlock({ eyebrow, title, children, dark }: { eyebrow: string; title: ReactNode; children: ReactNode; dark?: boolean }) {
  return (
    <section className={dark ? "on-dark tone-light bg-charcoal text-ivory" : ""}>
      <div className="container-x grid gap-12 py-24 lg:grid-cols-12 lg:py-32">
        <div className="lg:col-span-4"><p className="eyebrow mb-6">{eyebrow}</p><h2 className="display text-[clamp(2.2rem,4vw,3.6rem)]">{title}</h2></div>
        <div className="lg:col-span-7 lg:col-start-6">{children}</div>
      </div>
    </section>
  );
}
