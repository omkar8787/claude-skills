import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/sections/PageHero";
import { site, contactEmail, whatsappHref } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Contact NGB Ventures | Sourcing Partner in Pune, India", description: "Contact NGB Ventures in Pune, India to discuss sourcing, private label, product development, inspections or export coordination.", path: "/contact" });

export default function ContactPage() {
  const rows = [
    { Icon: Mail, k: "Email", v: contactEmail ? <a href={`mailto:${contactEmail}`} className="link-u">{contactEmail}</a> : <span className="text-stone-ink">Use the form. Our email address will be published here.</span> },
    { Icon: MessageCircle, k: "WhatsApp", v: whatsappHref ? <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="link-u">Chat on WhatsApp</a> : <span className="text-stone-ink">Available soon</span> },
    { Icon: Phone, k: "Phone", v: site.contact.phone ? <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="link-u">{site.contact.phone}</a> : <span className="text-stone-ink">Available soon</span> },
    { Icon: MapPin, k: "Location", v: <>{site.contact.address || `${site.city}, ${site.region}, ${site.country}`}<br /><span className="text-stone-ink">{site.contact.hours}</span></> },
  ];
  return (
    <>
      <PageHero compact plate={{ slot: "page-contact", motif: "jali", tone: "charcoal", alt: "NGB Ventures, Pune", brief: "Pune cityscape at dusk" }} crumbs={[{ name: "Contact", href: "/contact" }]} eyebrow="Contact" title="Let’s talk about" italic="your product." lede="For detailed sourcing requests, use the sourcing brief. For everything else, write to us here." ctas={[{ label: "Use the detailed sourcing brief", href: "/enquire" }]} />
      <section className="container-x grid gap-16 py-20 lg:grid-cols-12 lg:py-28">
        <div className="lg:col-span-4">
          <dl className="divide-y divide-line border-y border-charcoal">
            {rows.map(({ Icon, k, v }) => <div key={k} id={`contact-${k.toLowerCase()}`} className="flex gap-5 py-6"><Icon className="mt-1 h-5 w-5 shrink-0 text-bronze-ink" strokeWidth={1.4} /><div><dt className="ledger text-stone-ink">{k}</dt><dd className="mt-2 leading-relaxed">{v}</dd></div></div>)}
          </dl>
          <p className="mt-8 text-sm leading-relaxed text-stone-ink">We support buyers worldwide from Pune, India. We don’t operate overseas offices. Looking for a manufacturer directory? We don’t publish one, because we match suppliers to each brief instead. <Link href="/services/supplier-identification" className="underline underline-offset-2">How supplier identification works →</Link></p>
        </div>
        <div className="lg:col-span-7 lg:col-start-6"><ContactForm /></div>
      </section>
    </>
  );
}
