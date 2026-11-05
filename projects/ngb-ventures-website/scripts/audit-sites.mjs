#!/usr/bin/env node
/**
 * Competitive audit harness. Run from a machine with unrestricted internet access:
 *   node scripts/audit-sites.mjs            (requires: npm i -D playwright && npx playwright install chromium)
 * Output: docs/audit/<host>/{desktop,mobile}-<n>.png and docs/audit/audit.json
 * Scores in docs/01-research-and-creative-direction.md must cite this evidence.
 */
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const SITES = {
  "smallworldindia.com": ["https://smallworldindia.com/", "https://smallworldindia.com/industries/apparel"],
  "discoverglobal.com": ["https://discoverglobal.com/"],
  "triburg.co.in": ["https://www.triburg.co.in/"],
  "sowtex.com": ["https://sowtex.com/"],
  "globalsources.com": ["https://www.globalsources.com/"],
  "indiamart.com": ["https://www.indiamart.com/"],
  "qima.com": ["https://www.qima.com/"],
  "sourcify.com": ["https://www.sourcify.com/"],
  "makersrow.com": ["https://makersrow.com/"],
  "welspunliving.com": ["https://www.welspunliving.com/"],
  "arvind.com": ["https://www.arvind.com/"],
  "shahi.co.in": ["https://www.shahi.co.in/"],
  "lifung.com": ["https://www.lifung.com/"],
  "aesop.com": ["https://www.aesop.com/"],
  "linear.app": ["https://linear.app/"],
  "stripe.com": ["https://stripe.com/"],
  "apple.com": ["https://www.apple.com/"],
};
const MAX_PAGES = 3;
const out = path.resolve("docs/audit");
fs.mkdirSync(out, { recursive: true });

const extract = () => {
  const q = (s) => [...document.querySelectorAll(s)];
  return {
    title: document.title,
    description: document.querySelector("meta[name=description]")?.content ?? null,
    canonical: document.querySelector("link[rel=canonical]")?.href ?? null,
    h1: q("h1").map((e) => e.innerText.trim()).slice(0, 3),
    h2: q("h2").map((e) => e.innerText.trim()).slice(0, 20),
    nav: q("header a, nav a").map((e) => e.innerText.trim()).filter(Boolean).slice(0, 60),
    ctas: q("a,button").map((e) => e.innerText.trim()).filter((t) => /quote|contact|enquir|inquir|start|get|book|talk|request|demo/i.test(t)).slice(0, 20),
    forms: q("form").length,
    jsonLdTypes: q('script[type="application/ld+json"]').flatMap((s) => { try { const j = JSON.parse(s.textContent); return [].concat(j).map((x) => x["@type"]); } catch { return []; } }),
    images: q("img").length,
    imagesWithoutAlt: q("img:not([alt])").length,
    internalLinks: [...new Set(q("a[href]").map((a) => a.href).filter((h) => h.startsWith(location.origin)))].slice(0, 200),
    overflowX: document.documentElement.scrollWidth - window.innerWidth,
  };
};

const browser = await chromium.launch();
const report = {};
for (const [host, seeds] of Object.entries(SITES)) {
  const dir = path.join(out, host);
  fs.mkdirSync(dir, { recursive: true });
  report[host] = { pages: [], error: null };
  try {
    const queue = [...seeds];
    const seen = new Set();
    while (queue.length && report[host].pages.length < MAX_PAGES) {
      const url = queue.shift();
      if (seen.has(url)) continue;
      seen.add(url);
      for (const [label, viewport] of [["desktop", { width: 1440, height: 900 }], ["mobile", { width: 390, height: 844 }]]) {
        const page = await browser.newPage({ viewport });
        const t0 = Date.now();
        const res = await page.goto(url, { waitUntil: "networkidle", timeout: 60000 }).catch((e) => ({ error: e.message }));
        const loadMs = Date.now() - t0;
        const n = report[host].pages.length;
        await page.screenshot({ path: path.join(dir, `${label}-${n}.png`), fullPage: false }).catch(() => {});
        await page.screenshot({ path: path.join(dir, `${label}-${n}-full.png`), fullPage: true }).catch(() => {});
        const data = await page.evaluate(extract).catch((e) => ({ error: e.message }));
        if (label === "desktop") {
          report[host].pages.push({ url, status: res?.status?.() ?? null, loadMs, ...data });
          // pick meaningful next pages (industries/services/products/about/contact)
          (data.internalLinks || []).filter((h) => /industr|service|product|categor|about|contact|sourcing|manufactur/i.test(h)).slice(0, 5).forEach((h) => queue.push(h));
        } else {
          report[host].pages[report[host].pages.length - 1].mobile = { loadMs, overflowX: data.overflowX };
        }
        await page.close();
      }
    }
  } catch (e) {
    report[host].error = String(e);
  }
  console.log(host, report[host].error ?? `${report[host].pages.length} pages`);
}
fs.writeFileSync(path.join(out, "audit.json"), JSON.stringify(report, null, 2));
await browser.close();
