import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="on-dark flex min-h-[80svh] items-end bg-charcoal pb-20 pt-40 text-ivory">
      <div className="container-x">
        <p className="ledger text-bronze-soft">Error 404 · Page not found</p>
        <h1 className="display mt-6 text-[clamp(3rem,9vw,8rem)]">This route <em>doesn’t ship.</em></h1>
        <p className="lede mt-6 max-w-lg">The page you’re looking for has moved or doesn’t exist. Try one of these instead.</p>
        <div className="mt-10 flex flex-wrap gap-3"><Link href="/" className="btn btn-bronze">Home <ArrowRight className="arrow h-4 w-4" /></Link><Link href="/industries" className="btn btn-ghost">Industries</Link><Link href="/quote" className="btn btn-ghost">Start an enquiry</Link></div>
      </div>
    </section>
  );
}
