import type { MetadataRoute } from "next";
import { industries } from "@/content/industries";
import { products } from "@/content/products";
import { clusters } from "@/content/clusters";
import { markets } from "@/content/markets";
import { services } from "@/content/services";
import { guides } from "@/content/guides";
import { giProducts } from "@/content/gi";
import { divisions } from "@/content/divisions";
import { absUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-11-03");
  const e = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({ url: absUrl(path), lastModified: now, changeFrequency, priority });
  return [
    e("/", 1, "weekly"),
    ...["/about", "/capabilities", "/discover", "/atlas", "/origin", "/advertising", "/publishers-printing", "/industries", "/products", "/manufacturing", "/services", "/markets", "/insights", "/contact", "/quote"].map((p) => e(p, 0.85)),
    ...divisions.map((d) => e(d.route, 0.9)),
    ...giProducts.map((g) => e(`/origin/${g.slug}`, 0.8)),
    ...industries.map((i) => e(`/industries/${i.slug}`, 0.9)),
    ...products.map((p) => e(`/products/${p.slug}`, 0.8)),
    ...clusters.map((c) => e(`/manufacturing/${c.slug}`, 0.7)),
    ...markets.map((m) => e(`/markets/${m.slug}`, 0.8)),
    ...services.map((s) => e(`/services/${s.slug}`, 0.8)),
    ...guides.map((g) => e(`/insights/${g.slug}`, 0.6)),
    ...["market-readiness", "landed-cost-calculator", "cbm-calculator", "supplier-evaluation-checklist"].map((t) => e(`/tools/${t}`, 0.7)),
    e("/privacy", 0.2, "yearly"),
    e("/terms", 0.2, "yearly"),
  ];
}
