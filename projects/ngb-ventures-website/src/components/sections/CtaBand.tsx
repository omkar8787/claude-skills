import Link from "next/link";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { contactEmail, whatsappHref } from "@/content/site";
import { enquirySteps } from "@/content/home";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Closing call to action. By default it shows the buyer enquiry process and links to the single enquiry page
 * (no embedded form), which avoids repeating a full form and its consent text on every page.
 */
export function CtaBand({ title = "Have a product in mind? Request a sourcing proposal.", lede = "Tell us what you want to source, develop or launch. We will reply with a feasibility assessment and a proposed sourcing approach.", topic, withForm = false }: { title?: string; lede?: string; topic?: string; withForm?: boolean }) {
  const [a, b] = title.includes("?") ? [title.split("?")[0] + "?", title.split("?").slice(1).join("?").trim()] : [title, ""];
  return (
    <section className="relative overflow-hidden bg-paper" aria-labelledby="cta-h">
      <div className="container-x grid gap-16 py-24 lg:grid-cols-12 lg:py-32">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow mb-6">Start a project</p>
          <h2 id="cta-h" className="display text-balance text-[clamp(2.6rem,5vw,4.6rem)]">{a} {b && <em>{b}</em>}</h2>
          <p className="lede mt-8 max-w-md">{lede}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/quote" className="btn btn-primary">Request a Sourcing Proposal <ArrowRight className="arrow h-4 w-4" /></Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {contactEmail && <a href={`mailto:${contactEmail}`} className="inline-flex items-center gap-2 font-medium"><Mail className="h-4 w-4 text-bronze-ink" /> <span className="link-u">{contactEmail}</span></a>}
            {whatsappHref && <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-medium"><MessageCircle className="h-4 w-4 text-bronze-ink" /> <span className="link-u">WhatsApp</span></a>}
          </div>
        </Reveal>
        {withForm ? (
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <div className="bg-ivory p-6 shadow-[0_40px_80px_-50px_rgba(21,21,21,.35)] sm:p-10">
              <ContactForm compact defaultTopic={topic} />
            </div>
          </Reveal>
        ) : (
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <p className="ledger mb-6 text-bronze-ink">How an enquiry works</p>
            <ol className="divide-y divide-line border-y border-line">
              {enquirySteps.map((s, i) => (
                <li key={s.t} className="grid grid-cols-[3rem_1fr] gap-4 py-5">
                  <span className="ledger pt-1 text-bronze-ink">{String(i + 1).padStart(2, "0")}</span>
                  <div><p className="font-display text-[1.45rem] leading-tight">{s.t}</p><p className="mt-1.5 text-[0.95rem] leading-relaxed text-stone-ink">{s.b}</p></div>
                </li>
              ))}
            </ol>
          </Reveal>
        )}
      </div>
    </section>
  );
}
