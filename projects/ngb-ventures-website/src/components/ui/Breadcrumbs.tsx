import Link from "next/link";
import { JsonLd, breadcrumbLd } from "@/lib/seo";

export function Breadcrumbs({ items }: { items: { name: string; href: string }[] }) {
  const all = [{ name: "Home", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className="ledger text-ivory/75">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {all.map((it, i) => (
            <li key={it.href} className="flex items-center gap-2">
              {i < all.length - 1 ? <Link href={it.href} className="hover:text-ivory transition-colors">{it.name}</Link> : <span aria-current="page" className="text-ivory/90">{it.name}</span>}
              {i < all.length - 1 && <span aria-hidden>/</span>}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbLd(all)} />
    </>
  );
}
