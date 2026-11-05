import Link from "next/link";
import { ShieldCheck } from "lucide-react";

/**
 * "Import from a disability-owned exporter": the DOBE® story told from the importer's side.
 * NGB Ventures is the exporter of record under its own IEC, so buyers transact directly with the
 * disability-owned business. Certification is NOT yet granted: every benefit is framed as
 * what certification will enable, and no certified badge is shown.
 */
export const dobeBenefits: [string, string][] = [
  ["Buy directly from the disability-owned business", "NGB Ventures exports under its own Importer-Exporter Code (IEC) as exporter of record, so your purchase order and invoice are with the disability-owned business itself."],
  ["Supplier-diversity reporting", "If certification is granted, purchases may be reportable as disability-owned spend, depending on your supplier-diversity programme and its eligibility rules."],
  ["Tier 2 reporting for your customers", "If you supply large retailers or corporations, purchases from a certified diverse supplier may support their Tier 2 reporting, subject to their programme rules."],
  ["Independent ownership verification", "DOBE® certification involves Disability:IN verifying that a business is at least 51% owned, managed and controlled by people with disabilities."],
  ["Visibility to procurement teams", "Certified businesses can be found through Disability:IN's supplier resources used by corporate procurement teams."],
  ["The same commercial standards", "Supplier diversity does not replace commercial rigour: NDAs, supplier qualification, independent inspection and written agreements remain standard."],
];

export const dobeFaqs = [
  { q: "Is NGB Ventures DOBE® certified?", a: "No. Disability:IN DOBE® certification application in progress. We do not display a certified-supplier badge or describe ourselves as certified unless certification is formally granted." },
  { q: "How could importing from a disability-owned exporter help us?", a: "NGB Ventures exports under its own IEC, so you buy directly from the disability-owned business. If certification is granted, any procurement benefit depends on your supplier-diversity programme and its eligibility rules, including how it treats suppliers based outside your country." },
  { q: "Does certification guarantee contracts or better prices?", a: "No. Programme rules differ by company, and some only recognise certain supplier locations. Please check with your supplier-diversity team. Our work is earned on product, price and service." },
];

export function DobeAdvantage({ id = "dobe", compact = false }: { id?: string; compact?: boolean }) {
  return (
    <section id={id} className="on-dark scroll-mt-24 bg-forest py-24 text-ivory lg:py-32" aria-labelledby={`${id}-h`}>
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-6">Supplier diversity</p>
            <h2 id={`${id}-h`} className="display text-[clamp(2.4rem,5vw,4.6rem)]">Import from a <em>disability-owned exporter.</em></h2>
            <p className="lede mt-8 max-w-xl">NGB Ventures is a disability-owned business and exports under its own IEC. When you import through us, you buy directly from the business that has applied for DOBE® certification.</p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="rounded-sm border border-ivory/20 p-6">
              <p className="flex items-center gap-2 font-semibold"><ShieldCheck className="h-5 w-5 text-bronze-soft" /> DOBE® certification</p>
              <p className="mt-2 text-sm leading-relaxed text-ivory/75">Disability:IN DOBE® certification application in progress. The points below describe what certification could enable if granted. We do not display a certified-supplier badge.</p>
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
          <p className="max-w-2xl text-sm leading-relaxed text-ivory/75">Certification does not guarantee contracts, preferred status or pricing. Benefits depend on your supplier-diversity programme and its eligibility rules; please confirm with your supplier-diversity team how an India-based, disability-owned exporter is recognised.</p>
          <Link href="/quote?type=procurement" className="btn btn-bronze shrink-0">Ask about importing from us</Link>
        </div>
      </div>
    </section>
  );
}
