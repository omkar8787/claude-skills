import { Confidentiality } from "@/components/sections/Confidentiality";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CapabilityGrid, IntroBlock } from "@/components/sections/DetailBlocks";
import { CtaBand } from "@/components/sections/CtaBand";
import { Placeholder } from "@/components/ui/Placeholder";
import { Reveal } from "@/components/ui/Reveal";
import { divisions } from "@/content/divisions";
import { messaging, site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "About NGB Ventures | Next Global Brand, Pune", description: "NGB Ventures (Next Global Brand) is a disability-owned, Pune-based sourcing, manufacturing, export and brand-development partner connecting global businesses with India's manufacturing ecosystem.", path: "/about" });

const principles = [
  { title: "Feasibility first", body: "Every request starts with an honest assessment. If India, a cluster or a target price isn't right for your product, we say so early." },
  { title: "Evidence over claims", body: "Registrations, certificates and GI status are checked against their sources. What we can't verify, we label as unverified." },
  { title: "Clear roles", body: "We state what we deliver and what we coordinate through independent, licensed partners. No grey areas at the factory or the port." },
  { title: "Access for more makers", body: "India's best products often come from small producers. We work to bring them within reach of global buyers." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero plate={{ slot: "about-hero", motif: "jali", tone: "forest", alt: "NGB Ventures", brief: "Team reviewing samples with a manufacturer on a factory floor" }} crumbs={[{ name: "About", href: "/about" }]} eyebrow="About NGB Ventures · Next Global Brand" title="India has the makers." italic="We help the world reach them." lede={`${site.positioning} ${site.philosophy}`} ctas={[{ label: "Our capabilities", href: "/capabilities" }, { label: "Contact us", href: "/contact", variant: "ghost" }]} />
      <IntroBlock eyebrow="Who we are" title={<>A modern gateway to <em>India&apos;s manufacturing ecosystem.</em></>} paragraphs={[
        "NGB Ventures, for Next Global Brand, is an India-based sourcing, manufacturing-coordination, export and brand-development business headquartered in Pune, Maharashtra.",
        "We started from a simple observation. India makes an extraordinary range of products, from GI-protected crafts to precision components, but for international buyers it can feel fragmented, hard to verify and slow to navigate. We want to be the single point of access: one desk that can investigate almost any legitimate product requirement, find the right makers, develop and export the product, and help build the brand that sells it.",
        "NGB Ventures is a disability-owned business. Our Disability:IN DOBE® certification application is underway, and inclusive procurement is one of our five divisions. It's part of the business, not a footnote.",
      ]} aside={[{ k: "Name", v: "NGB Ventures (Next Global Brand)" }, { k: "Base", v: "Pune, Maharashtra, India" }, { k: "Model", v: "Sourcing, coordination & brand services. We don't own factories." }, { k: "Supplier diversity", v: site.dobeStatus }]} />
      <section className="border-t border-line bg-paper py-24 lg:py-32">
        <div className="container-x">
          <p className="eyebrow mb-6">Five divisions</p>
          <h2 className="display max-w-3xl text-[clamp(2.2rem,4.4vw,4rem)]">{messaging.promise.split(". ")[0]}. <em>{messaging.promise.split(". ")[1]}</em></h2>
          <ul className="mt-14 grid gap-px overflow-hidden bg-line sm:grid-cols-2 lg:grid-cols-5">
            {divisions.map((d, i) => (
              <Reveal as="li" key={d.slug} delay={i * 0.05} className="bg-paper"><Link href={d.route} className="group flex h-full flex-col justify-between p-6 transition-colors duration-500 hover:bg-charcoal hover:text-ivory"><div><span className="ledger text-bronze-ink group-hover:text-bronze-soft">{d.index}</span><p className="mt-6 font-display text-2xl leading-tight">{d.name}</p><p className="mt-3 text-sm leading-relaxed text-stone-ink group-hover:text-ivory/65">{d.kicker}</p></div><ArrowRight className="mt-8 h-4 w-4" /></Link></Reveal>
            ))}
          </ul>
        </div>
      </section>
      <CapabilityGrid dark eyebrow="How we work" title={<>Four <em>principles</em></>} items={principles} />
      <Confidentiality />
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
