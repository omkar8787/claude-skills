import { guides } from "@/content/guides";
import { site } from "@/content/site";
import { absUrl } from "@/lib/seo";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** RSS 2.0 feed of stories and buyer guides. */
export function GET() {
  const items = guides.map((g) => `    <item>
      <title>${esc(g.title)}</title>
      <link>${absUrl(`/insights/${g.slug}`)}</link>
      <guid isPermaLink="true">${absUrl(`/insights/${g.slug}`)}</guid>
      <description>${esc(g.description)}</description>
      ${g.category ? `<category>${esc(g.category)}</category>` : ""}
      <pubDate>${new Date(g.date ?? "2026-11-01").toUTCString()}</pubDate>
    </item>`).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(site.name)}: Insights from India</title>
    <link>${absUrl("/insights")}</link>
    <atom:link href="${absUrl("/insights/feed.xml")}" rel="self" type="application/rss+xml" />
    <description>Stories from India's craft and food regions, and practical guides for international buyers.</description>
    <language>en</language>
${items}
  </channel>
</rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
