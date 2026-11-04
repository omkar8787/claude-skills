import { SocialLinks } from "@/components/social/SocialLinks";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";
import { divisions } from "@/content/divisions";
import { guides } from "@/content/guides";
import { site, contactEmail, whatsappHref, messaging } from "@/content/site";

const discover = [
  { label: "Product Discovery", href: "/discover" },
  { label: "India Manufacturing Atlas", href: "/atlas" },
  { label: "GI & Origin Collection", href: "/origin" },
  { label: "Industries we serve", href: "/industries" },
  { label: "Manufacturing clusters", href: "/manufacturing" },
  { label: "Product guides", href: "/products" },
  { label: "Food, spices & nutrition", href: "/industries/food-nutrition" },
  { label: "Corporate gifting", href: "/corporate-gifting" },
  { label: "Publishers & Printing", href: "/publishers-printing" },
  { label: "Global markets", href: "/markets" },
  { label: "Import from a disability-owned exporter", href: "/export#dobe" },
];
const insights = [
  { label: "Insights & Research", href: "/insights" },
  { label: "Market readiness check", href: "/tools/market-readiness" },
  { label: "Landed-cost estimator", href: "/tools/landed-cost-calculator" },
  { label: "CBM calculator", href: "/tools/cbm-calculator" },
  { label: "Supplier checklist", href: "/tools/supplier-evaluation-checklist" },
  // Newest articles, linked site-wide so search engines discover new content from every page.
  ...guides.slice(0, 3).map((g) => ({ label: g.title.split(":")[0], href: `/insights/${g.slug}` })),
];
const company = [
  { label: "About NGB Ventures", href: "/about" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "All services", href: "/services" },
  { label: "Advertising & Marketing", href: "/advertising" },
  { label: "Contact", href: "/contact" },
  { label: "Request a quote", href: "/quote" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark tone-light relative overflow-hidden bg-charcoal text-ivory">
      <div className="container-x pb-10 pt-24">
        <div className="grid gap-12 border-b border-ivory/10 pb-16 lg:grid-cols-12 lg:items-end">
          <p className="display text-[clamp(2.4rem,5vw,4.6rem)] lg:col-span-8">{messaging.promise.split(". ")[0]}. <em>{messaging.promise.split(". ")[1]}</em></p>
          <div className="lg:col-span-4 lg:text-right"><Link href="/quote" className="btn btn-bronze">Source a product <ArrowUpRight className="h-4 w-4" /></Link></div>
        </div>
        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Logo />
            <p className="mt-8 max-w-sm text-[0.95rem] leading-relaxed text-ivory/65">{site.positioning} A disability-owned sourcing, manufacturing, export and brand-development partner based in Pune, India.</p>
            <p className="ledger mt-5 text-bronze-soft">{site.dobeStatus}</p>
            <div className="mt-8 space-y-2 text-[0.95rem]">
              {contactEmail ? <a className="link-u block w-fit" href={`mailto:${contactEmail}`}>{contactEmail}</a> : <Link className="link-u block w-fit" href="/contact">Send us an enquiry</Link>}
              {site.contact.phone && <a className="link-u block w-fit" href={`tel:${site.contact.phone.replace(/\s/g, "")}`}>{site.contact.phone}</a>}
              {whatsappHref && <a className="link-u block w-fit" href={whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp</a>}
              <p className="ledger pt-3 text-ivory/75">{site.city}, {site.region}, {site.country}</p>
              <SocialLinks className="pt-4" />
            </div>
          </div>
          <FooterCol title="Capabilities" className="lg:col-span-2" links={divisions.map((d) => ({ label: d.name, href: d.route }))} />
          <FooterCol title="Discover India" className="lg:col-span-3" links={discover} />
          <FooterCol title="Insights & tools" className="lg:col-span-2" links={insights} />
          <FooterCol title="Company" className="lg:col-span-2" links={company} />
        </div>

        <svg className="mt-24 block w-full select-none" viewBox="0 0 1000 120" aria-hidden focusable="false">
          <text x="0" y="100" textLength="1000" lengthAdjust="spacingAndGlyphs" fill="rgba(246,243,237,0.06)" style={{ fontFamily: "var(--font-display)", fontSize: 128 }}>India to the World</text>
        </svg>

        <div className="rule mt-8" />
        <div className="mt-8 flex flex-col gap-6 text-sm text-ivory/75 md:flex-row md:items-center md:justify-between">
          <p>© {year} {site.legalName}. {site.signoff}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li><Link href="/privacy" className="hover:text-ivory">Privacy policy</Link></li>
            <li><Link href="/terms" className="hover:text-ivory">Terms &amp; conditions</Link></li>
            <li><Link href="/sitemap.xml" className="hover:text-ivory">Sitemap</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links, className = "" }: { title: string; links: { label: string; href: string }[]; className?: string }) {
  return (
    <div className={className}>
      <p className="ledger mb-5 text-bronze-soft">{title}</p>
      <ul className="grid gap-y-2.5 text-[0.9rem] text-ivory/70">
        {links.map((l) => <li key={l.href}><Link href={l.href} className="transition-colors hover:text-ivory">{l.label}</Link></li>)}
      </ul>
    </div>
  );
}
