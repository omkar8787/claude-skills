import { PageHero } from "@/components/sections/PageHero";
import { SplitBlock, NextDivisions } from "@/components/division/DivisionTemplate";
import { Reveal } from "@/components/ui/Reveal";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { buildMetadata, JsonLd, serviceLd } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Advertising & Marketing | Amazon PPC, Meta & Google Ads", description: "Amazon PPC, sponsored ads, Meta and Google advertising, retargeting, influencer marketing and conversion optimisation for consumer brands, measured on ROAS and CAC.", path: "/advertising" });

const channels = [
  ["Amazon", "Listing optimisation, A+ content strategy, Sponsored Products, Brands and Display, and keyword harvesting."],
  ["Meta", "Prospecting and retargeting across Facebook and Instagram, creative testing frameworks and catalogue ads."],
  ["Google", "Search, Shopping/Performance Max and YouTube, with feed optimisation and conversion tracking."],
  ["Influencers & PR", "Creator seeding, partnerships and launch PR. Disclosed and compliant with advertising rules."],
];
const metrics = [
  ["ROAS", "Return on ad spend: revenue attributed to ads ÷ ad spend. Useful, but it can flatter retargeting."],
  ["CAC", "Customer acquisition cost: total acquisition spend ÷ new customers. It decides whether growth is profitable."],
  ["CVR", "Conversion rate: orders ÷ sessions. Listing and landing-page quality move it the most."],
  ["TACoS", "Total advertising cost of sales on Amazon: ad spend ÷ total revenue. It shows organic lift over time."],
];

export default function Advertising() {
  return (
    <>
      <PageHero plate={{ slot: "page-advertising", motif: "jali", tone: "clay", alt: "Advertising", brief: "" }} crumbs={[{ name: "Capabilities", href: "/capabilities" }, { name: "Advertising & Marketing", href: "/advertising" }]} eyebrow="Division 04 · Advertising & marketing" title="Put your product" italic="in front of buyers." lede="Marketplace and performance advertising for consumer brands, planned around unit economics and measurable results." ctas={[{ label: "Launch your brand with NGB", href: "/quote?type=brand" }, { label: "Brand development", href: "/brand-development", variant: "ghost" }]} />
      <section className="container-x py-24 lg:py-32">
        <div className="grid gap-px overflow-hidden bg-line md:grid-cols-2">
          {channels.map(([t, b], i) => <Reveal key={t} delay={i * 0.05} className="bg-ivory p-8 lg:p-12"><p className="display text-5xl">{t}</p><p className="mt-5 leading-relaxed text-stone-ink">{b}</p></Reveal>)}
        </div>
      </section>
      <SplitBlock dark eyebrow="How we measure" title={<>Numbers that <em>decide growth.</em></>}>
        <dl className="divide-y divide-ivory/10 border-y border-ivory/10">
          {metrics.map(([k, v]) => <div key={k} className="grid grid-cols-[6rem_1fr] gap-6 py-6"><dt className="display text-4xl text-bronze-soft">{k}</dt><dd className="leading-relaxed text-ivory/75">{v}</dd></div>)}
        </dl>
        <p className="mt-8 text-sm text-ivory/75">We report every month in plain language. We don&apos;t publish client results we don&apos;t have, and we don&apos;t promise outcomes.</p>
      </SplitBlock>
      <Faq faqs={[
        { q: "What does a typical engagement include?", a: "Usually an audit or launch plan, account setup or restructure, creative and listing work, campaign management and monthly reporting. Scope and fees are agreed per brand." },
        { q: "Do you work with brands outside India?", a: "Yes. Most of our advertising focus is international marketplaces and D2C sites in the US, UK, EU, UAE and Australia." },
      ]} title="Frequently asked questions" />
      <NextDivisions current="brand-development" />
      <CtaBand title="Growing your brand abroad? Plan your launch with us." topic="Sourcing project" />
      <JsonLd data={serviceLd({ name: "Amazon PPC, Meta and Google advertising", description: metadata.description as string, path: "/advertising", serviceType: "Digital advertising" })} />
    </>
  );
}
