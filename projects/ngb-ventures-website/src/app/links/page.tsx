import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SocialLinks } from "@/components/social/SocialLinks";
import { BrandIcon } from "@/components/social/icons";
import { guides } from "@/content/guides";
import { site, contactEmail, whatsappHref } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Links", description: "NGB Ventures: source anything from India, corporate gifting, stories and contact. Links for social media.", path: "/links", noindex: true });

/** "Link in bio" page for Instagram and other social profiles. Add UTM tags to the bio URL itself, not to these links. */
export default function LinksPage() {
  const latest = guides[0];
  const links = [
    { label: "Request a sourcing proposal", sub: "Tell us what you need. A person reviews every enquiry.", href: "/quote" },
    { label: "Corporate & festive gifting", sub: "Hampers, welcome kits, Diwali and year-end", href: "/corporate-gifting" },
    { label: "Explore what India makes", sub: "23 product spotlights, filters and GI origins", href: "/discover" },
    { label: `Read: ${latest.title}`, sub: `${latest.kind === "story" ? "Story" : "Guide"} · ${latest.readTime}`, href: `/insights/${latest.slug}` },
    { label: "India Manufacturing Atlas", sub: "Select a state, meet its makers", href: "/atlas" },
    { label: "Import from a disability-owned exporter", sub: "Disability:IN DOBE® certification application in progress", href: "/export#dobe" },
  ];
  return (
    <>
    {/* This page already has its own WhatsApp button. */}
    <style>{".wa-float{display:none}"}</style>
    <section className="on-dark tone-light min-h-[100svh] bg-charcoal pb-20 pt-28 text-ivory">
      <div className="mx-auto w-full max-w-md px-5">
        <p className="eyebrow mb-4">{site.name}</p>
        <h1 className="display text-[2.6rem] leading-[1.02]">India to the world. <em>From concept to commerce.</em></h1>
        <p className="mt-4 text-[0.95rem] leading-relaxed text-ivory/75">Sourcing, manufacturing, branding and export from Pune, India. We work under NDA.</p>
        <ul className="mt-8 space-y-3">
          {links.map((l) => (
            <li key={l.href}><Link href={l.href} className="group flex items-center justify-between gap-4 rounded-md border border-ivory/20 bg-ivory/5 px-5 py-4 transition-colors hover:bg-ivory hover:text-charcoal">
              <span><span className="block font-semibold leading-snug">{l.label}</span><span className="mt-0.5 block text-[0.8rem] text-ivory/70 group-hover:text-charcoal/70">{l.sub}</span></span>
              <ArrowUpRight className="h-5 w-5 shrink-0" />
            </Link></li>
          ))}
        </ul>
        <div className="mt-6 grid grid-cols-2 gap-3">
          {whatsappHref && <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-bronze w-full"><BrandIcon name="whatsapp" /> WhatsApp</a>}
          {contactEmail && <a href={`mailto:${contactEmail}`} className="btn btn-ghost w-full">Email us</a>}
        </div>
        <SocialLinks className="mt-8 justify-center" />
      </div>
    </section>
    </>
  );
}
