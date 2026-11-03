import type { Metadata } from "next";
import { createElement } from "react";
import { site } from "@/content/site";
import type { FAQ } from "@/content/types";

/** Absolute URL that respects a base path in the site URL (e.g. https://user.github.io/repo). */
export const absUrl = (p = "/") => site.url.replace(/\/$/, "") + (p.startsWith("/") ? p : `/${p}`);

/** Keeps titles ≤ ~65 chars: drops trailing " | segment" when too long, appends brand only if it fits. */
export function seoTitle(raw: string) {
  let t = raw.trim();
  while (t.length > 62 && t.includes(" | ")) t = t.slice(0, t.lastIndexOf(" | "));
  if (t.includes(site.name)) return t;
  return t.length + 15 <= 65 ? `${t} | ${site.name}` : t;
}

/** Trims descriptions to ≤ 158 chars at a sentence, else word boundary. */
export function seoDescription(raw: string, max = 158) {
  const d = raw.replace(/\s+/g, " ").trim();
  if (d.length <= max) return d;
  const cut = d.slice(0, max);
  const sentence = cut.lastIndexOf(". ");
  if (sentence > 90) return cut.slice(0, sentence + 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:·—-]+$/, "") + "…";
}

export function buildMetadata({ title: rawTitle, description: rawDesc, path, noindex }: { title: string; description: string; path: string; noindex?: boolean }): Metadata {
  const url = absUrl(path);
  const title = seoTitle(rawTitle);
  const description = seoDescription(rawDesc);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: site.name, type: "website", locale: "en_US" },
    twitter: { card: "summary_large_image", title, description },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}

/** Escapes `<` so JSON-LD can't break out of the script element. */
export function JsonLd({ data }: { data: object | object[] }) {
  return createElement("script", {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: JSON.stringify(data).replace(/</g, "\\u003c") },
  });
}

export const organizationLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": absUrl("/#organization"),
  name: site.name,
  alternateName: site.fullName,
  url: site.url,
  logo: absUrl("/icon.svg"),
  description: site.description,
  address: { "@type": "PostalAddress", addressLocality: site.city, addressRegion: site.region, addressCountry: "IN" },
  areaServed: ["US", "GB", "DE", "FR", "NL", "AU", "CA", "AE"],
  ...(site.contact.email ? { email: site.contact.email } : {}),
  ...(site.contact.phone ? { telephone: site.contact.phone } : {}),
  sameAs: Object.values(site.social).filter(Boolean),
});

export const websiteLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": absUrl("/#website"),
  url: site.url,
  name: site.name,
  publisher: { "@id": absUrl("/#organization") },
});

export const breadcrumbLd = (items: { name: string; href: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absUrl(it.href) })),
});

export const faqLd = (faqs: FAQ[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

/** Service schema: used for services and for "sourcing of <product/industry>" pages (no fake offers/prices). */
export const serviceLd = ({ name, description, path, serviceType, areaServed }: { name: string; description: string; path: string; serviceType: string; areaServed?: string | string[] }) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  url: absUrl(path),
  serviceType,
  provider: { "@id": absUrl("/#organization") },
  areaServed: areaServed ?? ["US", "GB", "DE", "FR", "NL", "AU", "CA", "AE"],
});

export const itemListLd = (name: string, items: { name: string; href: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name,
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: absUrl(it.href) })),
});

export const placeLd = (c: { name: string; state: string; lat: number; lon: number; summary: string; path: string }) => ({
  "@context": "https://schema.org",
  "@type": "Place",
  name: `${c.name}, ${c.state}`,
  description: c.summary,
  url: absUrl(c.path),
  geo: { "@type": "GeoCoordinates", latitude: c.lat, longitude: c.lon },
  containedInPlace: { "@type": "Country", name: "India" },
});
