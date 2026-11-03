import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";
import { industries } from "@/content/industries";
import { services } from "@/content/services";
import { markets } from "@/content/markets";
import { site, contactEmail, whatsappHref } from "@/content/site";

const resources = [
  { label: "Resources hub", href: "/resources" },
  { label: "How to source from India", href: "/resources/how-to-source-from-india" },
  { label: "Incoterms for India imports", href: "/resources/incoterms-for-india-imports" },
  { label: "Landed-cost estimator", href: "/tools/landed-cost-calculator" },
  { label: "CBM & container calculator", href: "/tools/cbm-calculator" },
  { label: "Supplier evaluation checklist", href: "/tools/supplier-evaluation-checklist" },
  { label: "Product development request", href: "/product-development" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark relative overflow-hidden bg-charcoal text-ivory">
      <div className="container-x pt-24 pb-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-8 max-w-sm text-[0.95rem] leading-relaxed text-ivory/65">
              {site.fullName}: a Pune-based sourcing and manufacturing coordination partner connecting international buyers with Indian manufacturing capabilities.
            </p>
            <div className="mt-8 space-y-2 text-[0.95rem]">
              {contactEmail ? <a className="link-u block w-fit" href={`mailto:${contactEmail}`}>{contactEmail}</a> : <Link className="link-u block w-fit" href="/contact">Send us an enquiry</Link>}
              {site.contact.phone && <a className="link-u block w-fit" href={`tel:${site.contact.phone.replace(/\s/g, "")}`}>{site.contact.phone}</a>}
              {whatsappHref && <a className="link-u block w-fit" href={whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp</a>}
              <p className="ledger pt-3 text-ivory/60">{site.city}, {site.region}, {site.country} · {site.contact.hours}</p>
            </div>
          </div>
          <FooterCol title="Industries" className="lg:col-span-3" links={industries.map((i) => ({ label: i.name, href: `/industries/${i.slug}` }))} twoCol />
          <FooterCol title="Services" className="lg:col-span-2" links={services.map((s) => ({ label: s.name, href: `/services/${s.slug}` }))} />
          <div className="space-y-12 lg:col-span-3">
            <FooterCol title="Resources" links={resources} />
            <FooterCol title="Markets" links={markets.map((m) => ({ label: m.name, href: `/markets/${m.slug}` }))} twoCol />
          </div>
        </div>

        <svg className="mt-24 block w-full select-none" viewBox="0 0 1000 120" aria-hidden focusable="false">
          <text x="0" y="100" textLength="1000" lengthAdjust="spacingAndGlyphs" fill="rgba(246,243,237,0.06)" style={{ fontFamily: "var(--font-display)", fontSize: 128 }}>Next Global Brand</text>
        </svg>

        <div className="rule mt-8" />
        <div className="mt-8 flex flex-col gap-6 text-sm text-ivory/55 md:flex-row md:items-center md:justify-between">
          <p>© {year} {site.legalName}. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {(["linkedin", "instagram", "youtube"] as const).map((k) =>
              site.social[k] ? (
                <li key={k}><a href={site.social[k]} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 capitalize hover:text-ivory">{k === "linkedin" ? "LinkedIn" : k === "youtube" ? "YouTube" : "Instagram"} <ArrowUpRight className="h-3.5 w-3.5" /></a></li>
              ) : null,
            )}
            <li><Link href="/privacy" className="hover:text-ivory">Privacy policy</Link></li>
            <li><Link href="/terms" className="hover:text-ivory">Terms &amp; conditions</Link></li>
            <li><Link href="/sitemap.xml" className="hover:text-ivory">Sitemap</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links, className = "", twoCol }: { title: string; links: { label: string; href: string }[]; className?: string; twoCol?: boolean }) {
  return (
    <div className={className}>
      <p className="ledger mb-5 text-bronze-soft">{title}</p>
      <ul className={`grid gap-x-6 gap-y-2.5 text-[0.9rem] text-ivory/70 ${twoCol ? "grid-cols-2 lg:grid-cols-1 xl:grid-cols-2" : ""}`}>
        {links.map((l) => (
          <li key={l.href}><Link href={l.href} className="transition-colors hover:text-ivory">{l.label}</Link></li>
        ))}
      </ul>
    </div>
  );
}
