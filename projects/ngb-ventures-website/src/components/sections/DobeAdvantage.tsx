import Link from "next/link";
import { ShieldCheck } from "lucide-react";

/**
 * "Import from a disability-owned exporter": the DOBE® story told from the importer's side.
 * NGB Ventures is the exporter of record under its own IEC, so buyers transact directly with the
 * disability-owned business. Certification is NOT yet granted: every benefit is framed as
 * what certification will enable, and no certified badge is shown.
 */
export const dobeBenefits: [string, string][] = [
  ["You buy directly from the disability-owned business", "We export under our own Importer-Exporter Code (IEC) as the exporter of record. Your purchase order and invoice are with us, not with a middleman, so the spend is clearly attributable."],
  ["Counts towards your diversity spend", "Once certified, purchases from us can be reported as disability-owned spend where your supplier-diversity programme recognises DOBE® suppliers."],
  ["Helps your customers' goals too", "If you supply large retailers or corporations, your purchases from us can support their Tier 2 diverse-spend reporting."],
  ["Ownership verified independently", "Disability:IN checks that the business is at least 51% owned, managed and controlled by a person with a disability, so your team doesn't have to."],
  ["Findable by procurement teams", "Certified businesses are listed in Disability:IN's supplier directory, used by corporate buyers looking for disability-owned vendors."],
  ["Purpose without compromise", "Inclusion adds value, never shortcuts: NDAs, verified makers, independent inspections and clear contracts stay standard."],
];

export const dobeFaqs = [
  { q: "Is NGB Ventures DOBE® certified?", a: "Not yet. Our Disability:IN DOBE® certification application is underway. We don't display a certified badge, or describe ourselves as certified, until it's formally granted." },
  { q: "How does importing from a disability-owned exporter help us?", a: "We export under our own IEC, so you buy directly from the disability-owned business. Once certification is granted, that spend can count towards supplier-diversity goals where your programme recognises DOBE® suppliers, including Tier 2 reporting for your own customers." },
  { q: "Does certification guarantee contracts or better prices?", a: "No. Programme rules differ by company, and some only recognise certain supplier locations. Please check with your supplier-diversity team. Our work is earned on product, price and service." },
];

export function DobeAdvantage({ id = "dobe", compact = false }: { id?: string; compact?: boolean }) {
  return (
    <section id={id} className="on-dark scroll-mt-24 bg-forest py-24 text-ivory lg:py-32" aria-labelledby={`${id}-h`}>
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-6">Import from a disability-owned exporter</p>
            <h2 id={`${id}-h`} className="display text-[clamp(2.4rem,5vw,4.6rem)]">Every shipment <em>does more good.</em></h2>
            <p className="lede mt-8 max-w-xl">NGB Ventures is a disability-owned business, and we export under our own IEC. When you import from us, you buy directly from the business that holds the DOBE® application.</p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="rounded-sm border border-ivory/20 p-6">
              <p className="flex items-center gap-2 font-semibold"><ShieldCheck className="h-5 w-5 text-bronze-soft" /> DOBE® certification</p>
              <p className="mt-2 text-sm leading-relaxed text-ivory/75">Application underway with Disability:IN. The benefits below apply once it&apos;s granted. Until then, we never show a certified badge.</p>
            </div>
          </div>
        </div>
        {!compact && (
          <ol className="mt-16 grid gap-px overflow-hidden rounded-sm bg-ivory/15 sm:grid-cols-2 lg:grid-cols-3">
            {dobeBenefits.map(([t, b], i) => (
              <li key={t} className="bg-forest p-7 lg:p-8">
                <span className="ledger text-bronze-soft">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-5 font-display text-[1.6rem] leading-tight">{t}</p>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ivory/75">{b}</p>
              </li>
            ))}
          </ol>
        )}
        <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-2xl text-sm leading-relaxed text-ivory/75">Certification doesn&apos;t guarantee contracts, preference or pricing, and programme rules differ by company. Please check with your supplier-diversity team how an India-based, disability-owned exporter is recognised.</p>
          <Link href="/quote?type=procurement" className="btn btn-bronze shrink-0">Ask about importing from us</Link>
        </div>
      </div>
    </section>
  );
}
