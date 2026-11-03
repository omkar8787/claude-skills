import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CapabilityGrid, IntroBlock } from "@/components/sections/DetailBlocks";
import { CtaBand } from "@/components/sections/CtaBand";
import { Placeholder } from "@/components/ui/Placeholder";
import { Reveal } from "@/components/ui/Reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "About NGB Ventures | Next Global Brand, Pune", description: "NGB Ventures (Next Global Brand) is a Pune-based sourcing and manufacturing coordination partner helping international businesses work with Indian manufacturers.", path: "/about" });

const principles = [
  { title: "Specification first", body: "We put requirements in writing before we contact suppliers. Clear specifications are the cheapest form of quality control." },
  { title: "Evidence over claims", body: "Registrations, certificates and capability claims are checked against their sources, and the evidence is shared with you." },
  { title: "Clear roles", body: "Who manufactures, who exports, who ships and who imports is agreed up front. No grey areas at the port." },
  { title: "Honest feasibility", body: "If India, a cluster or a target price isn’t a good fit for your product, we’ll say so early." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero plate={{ slot: "about-hero", motif: "jali", tone: "bronze", alt: "NGB Ventures sourcing team at work", brief: "Team reviewing samples with a manufacturer on a factory floor" }} crumbs={[{ name: "About", href: "/about" }]} eyebrow="About NGB Ventures" title="Next Global Brand." italic="Built in India, for global buyers." lede="Your strategic manufacturing and sourcing partner in India, from Indian manufacturing excellence to global markets." ctas={[{ label: "How we work", href: "/services" }, { label: "Contact us", href: "/contact", variant: "ghost" }]} />
      <IntroBlock eyebrow="Who we are" title={<>A sourcing partner that <em>sits on your side</em> of the table.</>} paragraphs={[
        "NGB Ventures is a sourcing, manufacturing-coordination and export-facilitation business based in Pune, Maharashtra. We help international importers, brands, retailers and e-commerce sellers find, evaluate and work with Indian manufacturers.",
        "Our work spans the whole sourcing lifecycle: understanding requirements, identifying and verifying manufacturers, developing samples, coordinating production, arranging inspections, and coordinating export documentation and logistics with licensed partners.",
        "Pune is one of India’s major engineering and automotive centres, with road access to Jawaharlal Nehru Port (Nhava Sheva), one of the country’s main container gateways. It’s a practical base for coordinating with manufacturers across western India and beyond.",
      ]} aside={[{ k: "Name", v: "NGB Ventures (Next Global Brand)" }, { k: "Base", v: "Pune, Maharashtra, India" }, { k: "Serves", v: "US · UK · EU · AU · CA · UAE and others" }, { k: "Model", v: "Sourcing & coordination. We don’t own factories." }]} />
      <CapabilityGrid dark eyebrow="How we work" title={<>Four <em>principles</em></>} items={principles} />
      <section className="container-x py-24 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5"><p className="eyebrow mb-6">Leadership</p><h2 className="display text-[clamp(2.2rem,4vw,3.5rem)]">The people <em>behind the work</em></h2><p className="lede mt-6">Profiles of the NGB Ventures team will appear here.</p></Reveal>
          <div className="space-y-4 lg:col-span-6 lg:col-start-7">
            <Placeholder label="Founder & team profiles" note="Add verified names, roles, professional backgrounds and photos. Do not publish invented experience, client names or numbers." />
            <Placeholder label="Company registration" note="Add legal entity name, registration type (e.g. Pvt Ltd / LLP / proprietorship), GSTIN and IEC once confirmed. These strengthen trust and support Organization schema." />
            <Placeholder label="Memberships & certifications" note="Only list memberships (e.g. export promotion councils, chambers of commerce) that are current and verifiable." />
          </div>
        </div>
      </section>
      <section className="border-t border-line bg-paper py-20"><div className="container-x flex flex-wrap items-center justify-between gap-6"><h2 className="display text-[clamp(2rem,3.6vw,3rem)]">See where we source: <em>India’s clusters.</em></h2><Link href="/manufacturing" className="btn btn-primary">Manufacturing network <ArrowRight className="arrow h-4 w-4" /></Link></div></section>
      <CtaBand />
    </>
  );
}
