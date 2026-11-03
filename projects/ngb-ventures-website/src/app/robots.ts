import type { MetadataRoute } from "next";
import { absUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/thank-you"] }], sitemap: absUrl("/sitemap.xml"), host: absUrl("/") };
}
