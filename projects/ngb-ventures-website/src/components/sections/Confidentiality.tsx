import { FileLock2, EyeOff, Layers, MapPin } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

/** Confidentiality & category-exclusivity promise. Shown wherever buyers decide whether to share a brief. */
export const confidentialityPoints = [
  { Icon: FileLock2, t: "We sign an NDA", b: "Before you share designs, specifications, pricing or plans, we sign a non-disclosure agreement. Your brief stays between us and the makers who need it." },
  { Icon: EyeOff, t: "No client names on display", b: "We never show client names, logos or products. That's why you won't see brand logos anywhere on this site. Our work stays yours." },
  { Icon: Layers, t: "One brand per product", b: "If we're developing a copper bottle for your brand, we won't take on a competing brand for the same product. No conflicts of interest." },
  { Icon: MapPin, t: "Made in India, every time", b: "Everything we source, make and ship comes from India's own makers, farms and factories." },
];

export const confidentialityFaqs = [
  { q: "Will you sign an NDA?", a: "Yes. We sign a non-disclosure agreement before you share anything sensitive, such as designs, specifications, pricing or launch plans." },
  { q: "Why don't you show client brands or logos?", a: "Because we work under NDA. Our clients' products, suppliers and plans are confidential, so we never publish their names, logos or work." },
  { q: "Do you work with competing brands?", a: "No. We work with one brand per product. If we're developing a product for your brand, such as a copper bottle, we won't take on a competing brand for the same product. The exact scope is written into your agreement." },
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
          <div className="lg:col-span-7"><p className="eyebrow mb-6">Confidential by default</p><h2 id="conf-h" className="display text-[clamp(2.2rem,4.4vw,4rem)]">Your brand stays yours. <em>One brand per product.</em></h2></div>
          <p className="lede lg:col-span-4 lg:col-start-9">We work under NDA, so we never put client names or work on show. And we don&apos;t sell the same idea twice.</p>
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
