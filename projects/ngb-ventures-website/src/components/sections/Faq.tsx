import { Plus } from "lucide-react";
import type { FAQ } from "@/content/types";
import { JsonLd, faqLd } from "@/lib/seo";

export function Faq({ faqs, title = "Questions buyers ask" }: { faqs: FAQ[]; title?: string }) {
  if (!faqs.length) return null;
  return (
    <section className="container-x py-24 lg:py-32" aria-labelledby="faq-h">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4"><p className="eyebrow mb-6">FAQ</p><h2 id="faq-h" className="display text-[clamp(2.4rem,4.5vw,4rem)]">{title}</h2></div>
        <div className="divide-y divide-line border-y border-line lg:col-span-8">
          {faqs.map((f) => (
            <details key={f.q} className="group py-2 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left">
                <h3 className="font-display text-[1.6rem] leading-snug">{f.q}</h3>
                <Plus className="mt-2 h-5 w-5 shrink-0 transition-transform duration-500 group-open:rotate-45" aria-hidden />
              </summary>
              <p className="max-w-2xl pb-6 leading-relaxed text-stone-ink">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
      <JsonLd data={faqLd(faqs)} />
    </section>
  );
}
