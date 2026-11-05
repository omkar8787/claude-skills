import { Confidentiality } from "@/components/sections/Confidentiality";
import { DobeAdvantage } from "@/components/sections/DobeAdvantage";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CapabilityGrid, IntroBlock } from "@/components/sections/DetailBlocks";
import { CtaBand } from "@/components/sections/CtaBand";
import { Placeholder } from "@/components/ui/Placeholder";
import { Reveal } from "@/components/ui/Reveal";
import { divisions } from "@/content/divisions";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "About NGB Ventures | Next Global Brand, Pune", description: "NGB Ventures (Next Global Brand) is a disability-owned, Pune-based sourcing, manufacturing, export and brand-development partner connecting global businesses with India's manufacturing ecosystem.", path: "/about" });

const principles = [
  { title: "Feasibility first", body: "Every enquiry starts with an honest assessment. If India, a particular cluster or a target price is not right for your product, we say so early." },
  { title: "Evidence over claims", body: "Registrations, certificates and GI status are checked against their sources. Anything we cannot verify is labelled as unverified." },
  { title: "Clear roles", body: "We state what we deliver ourselves and what we coordinate through independent, licensed partners, from the factory to the port." },
  { title: "Access for smaller makers", body: "Many of India's best products come from small producers. We work to bring them within reach of international buyers." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero plate={{ slot: "about-hero", motif: "jali", tone: "forest", alt: "NGB Ventures", brief: "Team reviewing samples with a manufacturer on a factory floor" }} crumbs={[{ name: "About", href: "/about" }]} eyebrow="About NGB Ventures · Next Global Brand" title="Your partner for" italic="sourcing from India." lede="NGB Ventures connects international businesses with India's manufacturing capabilities, from product discovery and private-label development to production coordination, export and brand development." ctas={[{ label: "Our capabilities", href: "/capabilities" }, { label: "Contact us", href: "/contact", variant: "ghost" }]} />
      <IntroBlock eyebrow="Who we are" title={<>A structured route into <em>India&apos;s manufacturing ecosystem.</em></>} paragraphs={[
        "NGB Ventures (Next Global Brand) is an India-based sourcing, manufacturing-coordination, export and brand-development business headquartered in Pune, Maharashtra.",
        "India makes a very wide range of products, from GI-protected crafts to precision components. For international buyers, however, the supply base can be fragmented, difficult to verify and slow to navigate. NGB Ventures provides a single, accountable point of contact: we research product requirements, identify and qualify manufacturers, coordinate development and export, and help build the brand that sells the product.",
        "NGB Ventures is a disability-owned business and exports under its own Importer-Exporter Code (IEC). Disability:IN DOBE® certification application in progress.",
      ]} aside={[{ k: "Name", v: "NGB Ventures (Next Global Brand)" }, { k: "Base", v: "Pune, Maharashtra, India" }, { k: "Model", v: "Sourcing, coordination and brand services. We do not own factories; manufacturing, testing, inspection and logistics involve independent partners." }, { k: "Supplier diversity", v: site.dobeStatus }]} />
      <section className="border-t border-line bg-paper py-24 lg:py-32">
        <div className="container-x">
          <p className="eyebrow mb-6">Four divisions</p>
          <h2 className="display max-w-3xl text-[clamp(2.2rem,4.4vw,4rem)]">From concept <em>to commerce.</em></h2>
          <ul className="mt-14 grid gap-px overflow-hidden bg-line sm:grid-cols-2 lg:grid-cols-4">
            {divisions.map((d, i) => (
              <Reveal as="li" key={d.slug} delay={i * 0.05} className="bg-paper"><Link href={d.route} className="group flex h-full flex-col justify-between p-6 transition-colors duration-500 hover:bg-charcoal hover:text-ivory"><div><span className="ledger text-bronze-ink group-hover:text-bronze-soft">{d.index}</span><p className="mt-6 font-display text-2xl leading-tight">{d.name}</p><p className="mt-3 text-sm leading-relaxed text-stone-ink group-hover:text-ivory/65">{d.kicker}</p></div><ArrowRight className="mt-8 h-4 w-4" /></Link></Reveal>
            ))}
          </ul>
        </div>
      </section>
      <CapabilityGrid dark eyebrow="How we work" title={<>Four <em>principles</em></>} items={principles} />
      <Confidentiality />
      <DobeAdvantage compact />
      <section className="container-x py-12">
        <div className="space-y-4">
          <Placeholder label="Company registration" note="Add the legal entity name, registration type, GSTIN and IEC once confirmed. They strengthen trust and Organization schema." />
          <Placeholder label="DOBE® status" note="Update the site-wide status text (src/content/site.ts → dobeStatus) only when Disability:IN formally grants certification." />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
