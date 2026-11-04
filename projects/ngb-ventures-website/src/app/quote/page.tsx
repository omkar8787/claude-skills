import { Confidentiality } from "@/components/sections/Confidentiality";
import { Mail, MessageCircle } from "lucide-react";
import { LeadForm } from "@/components/forms/LeadForm";
import { PageHero } from "@/components/sections/PageHero";
import { contactEmail, whatsappHref, messaging } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Request a Quote | Source a Product from India", description: "Tell us what you want to source, manufacture or launch. Describe the product, choose a destination and upload a reference image: an initial enquiry takes about 60 seconds.", path: "/quote" });

export default function Quote() {
  return (
    <>
      <PageHero compact plate={{ slot: "page-quote", motif: "fold", tone: "charcoal", alt: "Request a quote", brief: "" }} crumbs={[{ name: "Request a quote", href: "/quote" }]} eyebrow="Request a quote · about 60 seconds" title="You bring the vision." italic="We help build the supply chain." lede="You don't need to know where India makes it. That's what we help you discover." />
      <section className="container-x grid gap-16 py-16 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-7"><LeadForm /></div>
        <aside className="lg:col-span-4 lg:col-start-9">
          <div className="space-y-8 lg:sticky lg:top-28">
            <div><p className="ledger text-bronze-ink">What happens next</p>
              <ol className="mt-4 space-y-4 text-[0.95rem] leading-relaxed text-stone-ink">{["We read your request and ask any clarifying questions.", "We assess feasibility: clusters, manufacturer types, compliance and indicative cost drivers.", "If it makes sense to proceed, we agree a written scope and fee before any work starts."].map((s, i) => <li key={s} className="flex gap-4"><span className="ledger pt-1 text-stone-ink">0{i + 1}</span>{s}</li>)}</ol></div>
            <div className="border-l-2 border-bronze bg-paper p-6 text-sm leading-relaxed text-stone-ink">{messaging.honesty}</div>
            <Confidentiality compact />
            {(contactEmail || whatsappHref) && <div className="space-y-2 text-sm">{contactEmail && <a href={`mailto:${contactEmail}`} className="flex items-center gap-2 underline underline-offset-2"><Mail className="h-4 w-4" /> {contactEmail}</a>}{whatsappHref && <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 underline underline-offset-2"><MessageCircle className="h-4 w-4" /> WhatsApp us</a>}</div>}
            <p className="text-xs leading-relaxed text-stone-ink">Files are used only to answer your enquiry. Please don&apos;t upload confidential designs yet. Ask us and we&apos;ll sign an NDA first.</p>
          </div>
        </aside>
      </section>
    </>
  );
}
