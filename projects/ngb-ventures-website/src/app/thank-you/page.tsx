import Link from "next/link";
import { Check } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { RefLine } from "./RefLine";

export const metadata = buildMetadata({ title: "Thank You | Request Received", description: "Your enquiry has reached NGB Ventures. A member of the team will review it and reply by email.", path: "/thank-you", noindex: true });

export default function ThankYou() {
  return (
    <section className="on-dark tone-light flex min-h-[85svh] items-end bg-forest pb-20 pt-40 text-ivory">
      <div className="container-x">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-bronze text-charcoal"><Check className="h-6 w-6" /></span>
        <h1 className="display mt-8 text-[clamp(3rem,8vw,7rem)]">Thank you. <em>Your request is with us.</em></h1>
        <p className="lede mt-6 max-w-xl">A person at NGB Ventures will read it and reply by email. If we need more detail to assess feasibility, we&apos;ll ask.</p>
        <RefLine />
        <div className="mt-10 flex flex-wrap gap-3"><Link href="/discover" className="btn btn-bronze">Keep exploring India</Link><Link href="/origin" className="btn btn-ghost">Origin Collection</Link><Link href="/" className="btn btn-ghost">Home</Link></div>
      </div>
    </section>
  );
}
