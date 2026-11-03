"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Copy, ExternalLink } from "lucide-react";

type Dest = "US" | "UK" | "EU" | "AE" | "AU" | "CA" | "SG";
const DESTS: { id: Dest; name: string; tool: { label: string; href: string }; origin: string }[] = [
  { id: "US", name: "United States", tool: { label: "USITC HTS", href: "https://hts.usitc.gov/" }, origin: "No India–US free trade agreement in force at last review. Additional tariffs on Indian goods were introduced in 2025, so check current HTS duties and any additional tariffs before quoting landed cost." },
  { id: "UK", name: "United Kingdom", tool: { label: "UK Trade Tariff", href: "https://www.gov.uk/trade-tariff" }, origin: "The India–UK CETA was signed in July 2025. Preferential rates apply only once it's in force and rules of origin are met." },
  { id: "EU", name: "European Union", tool: { label: "EU Access2Markets", href: "https://trade.ec.europa.eu/access-to-markets/en/home" }, origin: "Check the current status of EU–India FTA negotiations. Assume standard (MFN/GSP) treatment unless confirmed otherwise." },
  { id: "AE", name: "United Arab Emirates", tool: { label: "Dubai Customs", href: "https://www.dubaicustoms.gov.ae/" }, origin: "India–UAE CEPA has been in force since 1 May 2022. A valid CEPA certificate of origin is needed to claim preference." },
  { id: "AU", name: "Australia", tool: { label: "ABF tariff classification", href: "https://www.abf.gov.au/importing-exporting-and-manufacturing/tariff-classification" }, origin: "India–Australia ECTA has been in force since 29 Dec 2022. Preference needs valid proof of origin under product-specific rules." },
  { id: "CA", name: "Canada", tool: { label: "CBSA Customs Tariff", href: "https://www.cbsa-asfc.gc.ca/trade-commerce/tariff-tarif/menu-eng.html" }, origin: "No India–Canada FTA in force at last review. Check MFN rates in the Customs Tariff." },
  { id: "SG", name: "Singapore", tool: { label: "Singapore Customs", href: "https://www.customs.gov.sg/" }, origin: "India–Singapore CECA and ASEAN–India agreements may apply. Check the rules of origin for your product." },
];

const ATTRS = [
  ["children", "Designed for children (toys, kidswear, kids' books)"],
  ["foodContact", "Touches food or drink (tableware, kitchenware, packaging)"],
  ["edible", "Food, beverage or agricultural product"],
  ["wood", "Contains wood, bamboo, coir or other plant material"],
  ["electrical", "Electrical or electronic (lamps, devices)"],
  ["cosmetic", "Applied to skin or hair (cosmetics, oils, soaps)"],
  ["textile", "Textile or apparel"],
  ["leather", "Leather or footwear"],
  ["jewellery", "Jewellery or metal items in skin contact"],
  ["green", "Marketed as organic, eco, natural or biodegradable"],
  ["amazon", "Sold on Amazon"],
] as const;
type Attr = (typeof ATTRS)[number][0];

type Item = { area: string; text: string };
function rules(dest: Dest, a: Record<Attr, boolean>): Item[] {
  const out: Item[] = [
    { area: "Classification", text: "Confirm the HS code (6-digit internationally, longer nationally). It decides duty, product rules and paperwork. Final classification is the importer's and customs broker's decision." },
    { area: "Documents", text: "Commercial invoice, packing list, bill of lading or airway bill, and certificate of origin. The exporter needs an IEC (Importer-Exporter Code) in India." },
    { area: "Commercial", text: "Agree the Incoterm (e.g. FOB, CIF, DAP), cargo insurance and who acts as importer of record." },
  ];
  const by = (m: Partial<Record<Dest, string>>, area: string) => { const t = m[dest] ?? m.EU; if (t) out.push({ area, text: t }); };
  if (a.children) by({ US: "CPSIA applies: third-party testing by a CPSC-accepted lab, a Children's Product Certificate and tracking labels. Toys also need ASTM F963.", EU: "Toy Safety rules: EN 71 testing, CE marking and an EU economic operator. The new Toy Safety Regulation phases in over coming years.", UK: "UK toy safety rules: EN 71 testing and UKCA (or CE where accepted), plus a UK importer's details.", AU: "Australian mandatory standards and bans for children's products and toys (ACCC).", CA: "Canada Consumer Product Safety Act and Toys Regulations.", AE: "UAE conformity schemes may apply to toys. Check ECAS/EQM requirements.", SG: "Singapore Consumer Protection (Safety Requirements) Registration Scheme may apply." }, "Product safety");
  if (a.foodContact) by({ US: "FDA food-contact requirements (21 CFR). California Prop 65 for lead and other listed substances.", EU: "EU Framework Regulation 1935/2004 plus material-specific rules. German buyers often expect LFGB testing.", UK: "UK food-contact materials rules (based on retained EU law).", AU: "Food-contact materials must meet the Australia New Zealand Food Standards Code.", CA: "Health Canada guidance on food packaging and food-contact materials.", AE: "UAE/GCC food-contact standards.", SG: "SFA requirements for food-contact articles." }, "Food contact");
  if (a.edible) by({ US: "FDA: food-facility registration, prior notice and FSMA requirements. Labelling must follow FDA rules.", EU: "EU food law, pesticide MRLs and contaminant limits, plus EU labelling (allergens, nutrition).", UK: "UK food import controls and labelling.", AU: "Imported Food Inspection Scheme and FSANZ labelling.", CA: "CFIA Safe Food for Canadians licence and labelling.", AE: "UAE food registration (e.g. ZAD/municipality systems) and Arabic labelling.", SG: "SFA import licence and food labelling." }, "Food law");
  if (a.edible) out.push({ area: "India export", text: "FSSAI licence. APEDA registration for scheduled agricultural products. Phytosanitary certificates where required." });
  if (a.wood) by({ US: "Lacey Act: plant-product declarations may be required. ISPM-15 for wood packaging.", EU: "EU Deforestation Regulation (check current application dates) and ISPM-15 for pallets and crates.", UK: "UK Timber Regulations and ISPM-15.", AU: "Strict biosecurity: check BICON import conditions. Treatment or inspection may be required.", CA: "CFIA plant-health requirements and ISPM-15.", AE: "Phytosanitary requirements for plant products and ISPM-15.", SG: "NParks/AVS plant-import conditions and ISPM-15." }, "Biosecurity & timber");
  if (a.electrical) by({ US: "NRTL certification (e.g. UL/ETL) for mains products. FCC rules for electronics.", EU: "CE marking under the LVD, EMC and RoHS directives, plus WEEE registration.", UK: "UKCA (or CE where accepted), electrical safety regulations and WEEE.", AU: "RCM mark and electrical-equipment safety (EESS) registration.", CA: "CSA or cUL certification.", AE: "ECAS/EQM conformity for electrical products.", SG: "Safety Mark (CPS scheme) for controlled goods." }, "Electrical");
  if (a.cosmetic) by({ US: "MoCRA: facility registration, product listing, safety substantiation and adverse-event reporting.", EU: "Regulation (EC) 1223/2009: EU Responsible Person, safety assessment, PIF and CPNP notification.", UK: "UK Cosmetics Regulation: UK Responsible Person and SCPN notification.", AU: "AICIS registration of the importer and ingredient checks.", CA: "Cosmetic Notification Form within 10 days of first sale and ingredient Hotlist checks.", AE: "Cosmetic product registration (e.g. via municipality/MoIAT schemes).", SG: "HSA cosmetic product notification." }, "Cosmetics");
  if (a.cosmetic && dest !== "US") out.push({ area: "Fragrance", text: "Check IFRA standards and allergen labelling for fragrance ingredients." });
  if (a.textile) by({ US: "FTC Textile Act and Care Labeling Rule: fibre content, country of origin and care instructions.", EU: "Textile Regulation (EU) 1007/2011 fibre labelling. REACH restricted substances (e.g. azo dyes).", UK: "UK textile labelling rules and UK REACH.", AU: "Care-labelling mandatory standard.", CA: "Textile Labelling Act: bilingual fibre content and dealer identity.", AE: "Arabic/English labelling for consumer textiles.", SG: "General consumer labelling requirements." }, "Textile labelling");
  if (a.leather) by({ US: "Prop 65 and state chemical rules. CITES permits for any exotic leathers.", EU: "REACH chromium VI limit for leather in skin contact. Footwear labelling directive 94/11/EC.", UK: "UK REACH chromium VI limit and footwear labelling." }, "Leather");
  if (a.jewellery) by({ US: "Lead/cadmium limits for children's jewellery (CPSIA, state laws). FTC Jewelry Guides for claims.", EU: "REACH limits on nickel release, lead and cadmium.", UK: "UK REACH metal limits. Hallmarking for precious metals above exemption weights." }, "Jewellery");
  if (a.green) by({ US: "FTC Green Guides: substantiate eco, recyclable and biodegradable claims.", EU: "EU rules against greenwashing: claims must be specific and evidenced. Certified-organic textiles need GOTS/OCS transaction certificates.", UK: "CMA Green Claims Code.", AU: "ACCC guidance on environmental claims." }, "Environmental claims");
  if (a.amazon) out.push({ area: "Marketplace", text: "Amazon category approvals, product-safety documents, FBA packaging and labelling, and Brand Registry if you're launching a brand." });
  return out;
}

export function MarketReadiness() {
  const [dest, setDest] = useState<Dest>("US");
  const [a, setA] = useState<Record<Attr, boolean>>(() => Object.fromEntries(ATTRS.map(([k]) => [k, false])) as Record<Attr, boolean>);
  const items = useMemo(() => rules(dest, a), [dest, a]);
  const d = DESTS.find((x) => x.id === dest)!;
  const summary = `NGB Ventures: preliminary market-readiness questions (${d.name})\n\n${items.map((i) => `• [${i.area}] ${i.text}`).join("\n")}\n\nTrade agreement: ${d.origin}\nThis is a preliminary list, not legal or customs advice.`;

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <div className="space-y-10 lg:col-span-5">
        <fieldset><legend className="field-label mb-4">1 · Destination market</legend>
          <div className="flex flex-wrap gap-2">{DESTS.map((x) => <label key={x.id} className="chip"><input type="radio" name="dest" className="sr-only" checked={dest === x.id} onChange={() => setDest(x.id)} />{x.name}</label>)}</div>
        </fieldset>
        <fieldset><legend className="field-label mb-4">2 · What describes your product?</legend>
          <div className="space-y-2">{ATTRS.map(([k, l]) => (
            <label key={k} className="flex cursor-pointer items-start gap-3 border-b border-line py-2.5 text-[0.95rem]"><input type="checkbox" className="mt-1 h-4 w-4 accent-[#151515]" checked={a[k]} onChange={(e) => setA({ ...a, [k]: e.target.checked })} />{l}</label>
          ))}</div>
        </fieldset>
      </div>
      <div className="lg:col-span-6 lg:col-start-7" aria-live="polite">
        <div className="rounded-sm bg-charcoal p-7 text-ivory md:p-9 lg:sticky lg:top-28">
          <p className="ledger text-bronze-soft">Preliminary checklist · {d.name}</p>
          <p className="display mt-3 text-5xl">{items.length} <span className="text-2xl text-ivory/60">questions to resolve</span></p>
          <ul className="mt-6 divide-y divide-ivory/10 border-y border-ivory/10">{items.map((i, n) => <li key={n} className="grid gap-1 py-3.5 sm:grid-cols-[8.5rem_1fr]"><span className="ledger pt-0.5 text-[0.6rem] text-bronze-soft">{i.area}</span><span className="text-sm leading-relaxed text-ivory/85">{i.text}</span></li>)}</ul>
          <div className="mt-5 rounded-sm bg-ivory/5 p-4 text-sm leading-relaxed text-ivory/75"><strong className="text-ivory">Trade agreement:</strong> {d.origin}</div>
          <div className="mt-6 flex flex-wrap gap-2">
            <a href={d.tool.href} target="_blank" rel="noopener noreferrer" className="btn btn-ghost h-10 min-h-0 px-4 text-xs">{d.tool.label} <ExternalLink className="h-3.5 w-3.5" /></a>
            <button type="button" className="btn btn-ghost h-10 min-h-0 px-4 text-xs" onClick={() => navigator.clipboard?.writeText(summary).catch(() => {})}><Copy className="h-3.5 w-3.5" /> Copy checklist</button>
            <Link href={`/quote?type=sourcing&country=${encodeURIComponent(d.name === "European Union" ? "Other EU country" : d.name)}`} className="btn btn-bronze h-10 min-h-0 px-4 text-xs">Get help with this</Link>
          </div>
          <p className="mt-6 text-xs leading-relaxed text-ivory/55">A preliminary list of questions, not legal, regulatory or customs advice. Requirements depend on the exact product, HS classification and current rules. Confirm with your compliance advisor, an accredited lab and a licensed customs broker.</p>
        </div>
      </div>
    </div>
  );
}
