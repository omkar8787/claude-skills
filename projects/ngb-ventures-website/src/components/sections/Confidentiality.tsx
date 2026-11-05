import { FileLock2, EyeOff, Handshake, MapPin } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

/** Confidentiality & win-win promise. Shown wherever buyers decide whether to share a brief. */
export const confidentialityPoints = [
  { Icon: FileLock2, t: "We sign an NDA", b: "We sign a non-disclosure agreement before you share designs, specifications, pricing or launch plans. Project details are shared only with the manufacturers and partners who need them." },
  { Icon: EyeOff, t: "No client names on display", b: "We do not publish client names, logos or products. That is why this site shows no client brands." },
  { Icon: Handshake, t: "Clear terms for everyone", b: "Project confidentiality, defined responsibilities and written commercial agreements form part of our engagement process, so the arrangement works for buyers, makers and partners alike." },
  { Icon: MapPin, t: "Focused on India", b: "We source exclusively from manufacturers, producers and artisan enterprises in India." },
];

export const confidentialityFaqs = [
  { q: "Will you sign an NDA?", a: "Yes. We sign a non-disclosure agreement before you share sensitive information such as designs, specifications, pricing or launch plans." },
  { q: "Why don't you show client brands or logos?", a: "Our engagements are confidential. We do not publish client names, logos, products or supplier details." },
  { q: "How do you protect our interests?", a: "Project confidentiality, defined responsibilities and written commercial agreements form part of our engagement process. NDAs are available before you share sensitive information." },
];

export function Confidentiality({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="rounded-sm border border-line bg-paper p-6">
        <p className="ledger text-bronze-ink">Confidential by default</p>
        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-stone-ink">
          {confidentialityPoints.map(({ Icon, t, b }) => (
            <li key={t} className="flex gap-3"><Icon className="mt-0.5 h-4 w-4 shrink-0 text-bronze-ink" strokeWidth={1.5} /><span><strong className="font-semibold text-charcoal">{t}.</strong> {b}</span></li>
          ))}
        </ul>
      </div>
    );
  }
  return (
    <section className="border-y border-line bg-paper py-24 lg:py-28" aria-labelledby="conf-h">
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7"><p className="eyebrow mb-6">Confidential by default</p><h2 id="conf-h" className="display text-[clamp(2.2rem,4.4vw,4rem)]">Confidential by default. <em>Clear terms for everyone.</em></h2></div>
          <p className="lede lg:col-span-4 lg:col-start-9">We work under NDA and do not display client names or work. Every engagement is set out in a written agreement.</p>
        </div>
        <ul className="mt-14 grid gap-px overflow-hidden bg-line sm:grid-cols-2 lg:grid-cols-4">
          {confidentialityPoints.map(({ Icon, t, b }, i) => (
            <Reveal as="li" key={t} delay={i * 0.05} className="bg-paper p-7 lg:p-8">
              <Icon className="h-6 w-6 text-bronze-ink" strokeWidth={1.25} />
              <p className="mt-6 font-display text-[1.75rem] leading-tight">{t}</p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-stone-ink">{b}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
