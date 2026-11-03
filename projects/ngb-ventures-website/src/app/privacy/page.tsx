import { PageHero } from "@/components/sections/PageHero";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/content/site";

export const metadata = buildMetadata({ title: "Privacy Policy", description: "How NGB Ventures collects, uses and protects personal data submitted through this website.", path: "/privacy" });

const S = [
  ["Who we are", `${site.legalName} ("NGB Ventures", "we") operates this website from ${site.city}, ${site.region}, India. [PLACEHOLDER: registered address and contact email for privacy requests.]`],
  ["What we collect", "When you submit an enquiry, we collect the details you provide: name, company, email, phone (optional), country, role and project information. We also record the page you submitted from. Our hosting provider may process standard server logs, such as IP address and user agent, for security."],
  ["Why we use it", "We use your details only to respond to your enquiry, to prepare and deliver services you request, and to keep records of our correspondence. We don’t sell personal data."],
  ["Legal basis", "We process enquiry data to take steps at your request before entering into a contract, and for our legitimate interest in responding to business enquiries. Where consent is required, we ask for it."],
  ["Sharing", "With your knowledge, we may share project details (not your personal contact details unless necessary) with prospective manufacturers, inspection agencies or logistics partners, so we can deliver the services you request. Service providers that process data for us, such as email and hosting, act under contract."],
  ["International transfers", "Data may be processed in India and in countries where our service providers operate. We take reasonable steps to protect it."],
  ["Retention", "We keep enquiry records for as long as needed to respond and for legitimate business record-keeping, then delete or anonymise them. [PLACEHOLDER: define the retention period.]"],
  ["Your rights", "Depending on where you live (for example under the GDPR, UK GDPR or India’s Digital Personal Data Protection Act, 2023), you may have rights to access, correct, delete or object to processing of your data. Contact us to make a request."],
  ["Cookies & storage", "This site doesn’t use advertising cookies. The supplier checklist tool saves your progress in your own browser’s local storage, and it isn’t sent to us. [PLACEHOLDER: update if analytics are added.]"],
  ["Changes", "We may update this policy. The date below shows the latest version."],
];

export default function Privacy() {
  return (
    <>
      <PageHero compact plate={{ slot: "page-legal", motif: "dots", tone: "stone", alt: "Privacy", brief: "n/a" }} crumbs={[{ name: "Privacy policy", href: "/privacy" }]} title="Privacy policy" lede="Draft template. Have it reviewed by qualified counsel before launch." />
      <article className="container-x max-w-3xl py-20">{S.map(([h, p]) => <section key={h} className="border-t border-line py-8"><h2 className="font-display text-3xl">{h}</h2><p className="mt-3 leading-relaxed text-stone-ink">{p}</p></section>)}<p className="ledger mt-8 text-stone-ink">Last updated: November 2026</p></article>
    </>
  );
}
