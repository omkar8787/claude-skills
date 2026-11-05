import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { Guide } from "@/content/guides";
import type { Motif, Tone } from "@/content/types";

/**
 * Markdown articles: drop a file in `content/insights/<slug>.md` and it becomes a page at /insights/<slug>,
 * with sitemap, RSS, search, related links and Article structured data, on the next deploy.
 *
 * Front matter (between --- lines):
 *   title, description, date (YYYY-MM-DD), updated (optional), kind (story|guide), category,
 *   keywords (comma list), readTime (optional, auto-calculated), motif/tone (optional art), related (lines "Label | /path")
 * Body: "## Heading" starts a section; blank-line-separated paragraphs; "- " bullet lists.
 * Inline: **bold**, *italic*, [text](/internal-or-https-link).
 * Files starting with "_" (like _TEMPLATE.md) are ignored. Set `draft: true` to keep a file unpublished.
 */
const DIR = path.join(process.cwd(), "content", "insights");
const MOTIFS: Motif[] = ["weave", "knit", "block", "jali", "grain", "radial", "botanical", "facet", "blueprint", "route", "fold", "dots"];
const TONES: Tone[] = ["bronze", "indigo", "clay", "olive", "madder", "sand", "stone", "forest"];

function parseFrontMatter(src: string) {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new Error("Missing front matter (--- ... ---) at the top of the file");
  const data: Record<string, string> = {};
  const related: { label: string; href: string }[] = [];
  let inRelated = false;
  for (const raw of m[1].split(/\r?\n/)) {
    const line = raw.trimEnd();
    if (!line.trim()) continue;
    if (inRelated && /^\s*-\s+/.test(line)) {
      const [label, href] = line.replace(/^\s*-\s+/, "").split("|").map((x) => x.trim().replace(/^["']|["']$/g, ""));
      if (label && href) related.push({ label, href });
      continue;
    }
    inRelated = false;
    const kv = line.match(/^([A-Za-z]+):\s*(.*)$/);
    if (!kv) continue;
    if (kv[1] === "related" && !kv[2]) { inRelated = true; continue; }
    data[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, "");
  }
  return { data, related, body: m[2] };
}

function parseBody(body: string): Guide["sections"] {
  const sections: Guide["sections"] = [];
  let cur: Guide["sections"][number] | null = null;
  const blocks = body.replace(/\r\n/g, "\n").split(/\n{2,}/);
  for (const block of blocks) {
    const b = block.trim();
    if (!b) continue;
    const h = b.match(/^##\s+(.+?)(?:\n([\s\S]*))?$/);
    if (h) {
      cur = { h: h[1].trim(), p: [] };
      sections.push(cur);
      if (h[2]?.trim()) handle(h[2].trim());
      continue;
    }
    handle(b);
  }
  function handle(b: string) {
    if (!cur) { cur = { h: "Overview", p: [] }; sections.push(cur); }
    const lines = b.split("\n");
    if (lines.every((l) => /^\s*[-*]\s+/.test(l))) cur.list = [...(cur.list ?? []), ...lines.map((l) => l.replace(/^\s*[-*]\s+/, "").trim())];
    else cur.p.push(lines.map((l) => l.trim()).join(" "));
  }
  return sections;
}

const hash = (s: string) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);

export function loadMarkdownArticles(): Guide[] {
  if (!fs.existsSync(DIR)) return [];
  const out: Guide[] = [];
  for (const file of fs.readdirSync(DIR).sort()) {
    if (!file.endsWith(".md") || file.startsWith("_")) continue;
    const slug = file.replace(/\.md$/, "").toLowerCase().replace(/[^a-z0-9-]+/g, "-");
    const { data, related, body } = parseFrontMatter(fs.readFileSync(path.join(DIR, file), "utf8"));
    if (data.draft === "true") continue;
    for (const req of ["title", "description", "date"]) if (!data[req]) throw new Error(`content/insights/${file}: missing "${req}" in front matter`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date)) throw new Error(`content/insights/${file}: date must be YYYY-MM-DD`);
    const sections = parseBody(body);
    const words = body.split(/\s+/).filter(Boolean).length;
    const h = hash(slug);
    out.push({
      slug,
      kind: data.kind === "story" ? "story" : "guide",
      section: (["buyer-guides", "sourcing-research", "manufacturing-insights", "export-compliance"].includes(data.section) ? data.section : undefined) as Guide["section"],
      category: data.category || "Insights",
      date: data.date,
      modified: /^\d{4}-\d{2}-\d{2}$/.test(data.updated || "") ? data.updated : data.date,
      updated: (data.updated || data.date).slice(0, 7),
      title: data.title,
      description: data.description,
      readTime: data.readTime || `${Math.max(2, Math.round(words / 220))} min read`,
      keywords: (data.keywords || "").split(",").map((k) => k.trim()).filter(Boolean),
      related: related.length ? related : undefined,
      plate: {
        slot: `md-${slug}`,
        motif: MOTIFS.includes(data.motif as Motif) ? (data.motif as Motif) : MOTIFS[h % MOTIFS.length],
        tone: TONES.includes(data.tone as Tone) ? (data.tone as Tone) : TONES[h % TONES.length],
        alt: data.title,
        brief: data.imageBrief || "",
      },
      sections,
    });
  }
  return out;
}
