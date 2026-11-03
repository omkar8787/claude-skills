import { PageHero } from "@/components/sections/PageHero";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Terms & Conditions", description: "Terms governing use of the NGB Ventures website and its tools.", path: "/terms" });

const S = [
  ["Use of this website", "This website provides general information about sourcing from India and about NGB Ventures’ services. By using it, you agree to these terms."],
  ["No professional advice", "Content, including compliance considerations, market guides and trade-policy notes, is general information, not legal, customs, tax or regulatory advice. Regulations and tariffs change. Verify requirements with qualified advisers and official sources."],
  ["Tools and estimates", "The landed-cost estimator, CBM calculator and supplier checklist are planning aids. Results depend entirely on the inputs you provide and aren’t official customs assessments, freight quotations or certifications."],
  ["Services", "Any services are provided under a separate written agreement that defines scope, fees and responsibilities. Submitting an enquiry doesn’t create a contract."],
  ["Third-party links", "Links to official and third-party sites are provided for convenience. We aren’t responsible for their content."],
  ["Intellectual property", "Site design, text and original illustrations belong to NGB Ventures unless stated otherwise. The India base map is © Victor Cazanave (CC BY 4.0). The world land data comes from Natural Earth via world-atlas (public domain / ISC)."],
  ["Liability", "To the extent permitted by law, NGB Ventures isn’t liable for losses arising from reliance on website content or tools. [PLACEHOLDER: have counsel finalise this clause.]"],
  ["Governing law", "[PLACEHOLDER: e.g. the laws of India, courts of Pune, subject to counsel review.]"],
];

export default function Terms() {
  return (
    <>
      <PageHero compact plate={{ slot: "page-legal", motif: "dots", tone: "stone", alt: "Terms", brief: "n/a" }} crumbs={[{ name: "Terms & conditions", href: "/terms" }]} title="Terms & conditions" lede="Draft template. Have it reviewed by qualified counsel before launch." />
      <article className="container-x max-w-3xl py-20">{S.map(([h, p]) => <section key={h} className="border-t border-line py-8"><h2 className="font-display text-3xl">{h}</h2><p className="mt-3 leading-relaxed text-stone-ink">{p}</p></section>)}<p className="ledger mt-8 text-stone-ink">Last updated: November 2026</p></article>
    </>
  );
}
