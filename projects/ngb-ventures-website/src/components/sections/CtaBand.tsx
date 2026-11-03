import Link from "next/link";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { contactEmail, whatsappHref } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

export function CtaBand({ title = "Have a Product Idea? Let's Manufacture It in India.", lede = "Tell us what you're looking to source. We'll help you explore the right manufacturing opportunities.", topic, withForm = true }: { title?: string; lede?: string; topic?: string; withForm?: boolean }) {
  const [a, b] = title.includes("?") ? [title.split("?")[0] + "?", title.split("?").slice(1).join("?").trim()] : [title, ""];
  return (
    <section className="relative overflow-hidden bg-paper" aria-labelledby="cta-h">
      <div className="container-x grid gap-16 py-24 lg:grid-cols-12 lg:py-36">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow mb-6">Discuss your project</p>
          <h2 id="cta-h" className="display text-balance text-[clamp(2.75rem,5.6vw,5.25rem)]">{a} {b && <em>{b}</em>}</h2>
          <p className="lede mt-8 max-w-md">{lede}</p>
          <ol className="mt-12 space-y-5 border-t border-line pt-8">
            {["We read your brief and ask any clarifying questions.", "We outline feasible clusters, manufacturer types and next steps.", "If it makes sense to proceed, we agree a scope together."].map((s, i) => (
              <li key={s} className="flex gap-5"><span className="ledger pt-1 text-bronze-ink">0{i + 1}</span><span className="text-[0.95rem] leading-relaxed text-stone-ink">{s}</span></li>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {contactEmail && <a href={`mailto:${contactEmail}`} className="inline-flex items-center gap-2 font-medium"><Mail className="h-4 w-4 text-bronze-ink" /> <span className="link-u">{contactEmail}</span></a>}
            {whatsappHref && <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-medium"><MessageCircle className="h-4 w-4 text-bronze-ink" /> <span className="link-u">WhatsApp us</span></a>}
            <Link href="/enquire" className="inline-flex items-center gap-2 font-medium"><ArrowRight className="h-4 w-4 text-bronze-ink" /> <span className="link-u">Use the detailed sourcing brief</span></Link>
          </div>
        </Reveal>
        {withForm && (
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <div className="bg-ivory p-6 shadow-[0_40px_80px_-50px_rgba(21,21,21,.35)] sm:p-10">
              <ContactForm compact defaultTopic={topic} />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
