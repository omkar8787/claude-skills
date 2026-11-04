#!/usr/bin/env node
/**
 * Exports a self-contained, relative-path static preview of the site (for hosting under any sub-path,
 * e.g. a private Claude Artifact). Requires the production server running: `npm run build && npm start`.
 *
 *   node scripts/export-preview.mjs [baseUrl=http://localhost:3000] [outDir=preview-export]
 *
 * LIVE MODE (static hosting such as GitHub Pages): set LIVE_BASE to the site's base path, e.g.
 *   LIVE_BASE=/claude-skills/ CONTACT_EMAIL=hello@example.com node scripts/export-preview.mjs http://localhost:3000 out
 * → absolute base-path links, extensionless page URLs, no preview badge, 404.html, sitemap.xml,
 *   robots.txt, opengraph-image.png and .nojekyll; forms show a contact fallback (no server on static hosts).
 *
 * What it does:
 *  - Crawls every URL in /sitemap.xml and saves it as site/<path>.html
 *  - Rewrites root-relative href/src ("/industries/x", "/_next/...", "/maps/...") to relative paths
 *  - Copies .next/static and public assets; fixes font URLs in CSS
 *  - Patches webpack's public path so client chunks resolve relative to the script location
 *  - Injects a small preview shim: native link navigation (no client router), disabled form
 *    submission with an honest notice, silenced route prefetches
 */
import fs from "node:fs";
import path from "node:path";

const base = process.argv[2] || "http://localhost:3000";
const out = path.resolve(process.argv[3] || "preview-export");
const site = path.join(out, "site");
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(site, { recursive: true });

const sitemap = await (await fetch(base + "/sitemap.xml")).text();
const basePathPrefix = (process.env.LIVE_BASE || "").replace(/\/$/, "");
const routes = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => { const p = new URL(m[1]).pathname; return (basePathPrefix && p.startsWith(basePathPrefix) ? p.slice(basePathPrefix.length) : p) || "/"; });
// Pages that are deliberately not in the sitemap (noindex) but still need exporting.
for (const extra of ["/search", "/thank-you", "/links"]) if (!routes.includes(extra)) routes.push(extra);
const routeSet = new Set(routes);

const LIVE = process.env.LIVE_BASE || "";
const formMsg = LIVE
  ? "Online form delivery isn't switched on for this site yet. Send your brief in one tap below. Your answers are already filled in."
  : "Preview only: forms are disabled in this preview copy.";
const fileFor = (route) => (route === "/" ? "index.html" : route.replace(/^\//, "") + ".html");

const badge = (prefix) => `<div style="position:fixed;right:12px;bottom:12px;z-index:9999;font:500 11px/1.2 ui-monospace,monospace;letter-spacing:.08em;text-transform:uppercase;background:#151515;color:#C9AD85;border:1px solid rgba(201,173,133,.4);border-radius:999px;padding:8px 12px;display:flex;gap:10px;align-items:center"><span>Preview</span><a href="${prefix}all-pages.html" style="color:#F6F3ED;text-decoration:underline">All pages</a></div>`;
const shim = (prefix) => `<script>(function(){
  var P=${JSON.stringify(prefix)};
  // 1) Native navigation for internal links (bypass the Next.js client router on static hosting)
  window.addEventListener("click",function(e){var a=e.target&&e.target.closest&&e.target.closest("a[href]");if(!a)return;var h=a.getAttribute("href");if(!h||h.charAt(0)==="#"||/^[a-z]+:/i.test(h)||a.target==="_blank")return;e.stopPropagation();},true);
  // 2) Forms: no backend in the preview. Return an honest notice instead of a fake success.
  var f=window.fetch;window.fetch=function(u,o){var s=String(u&&u.url||u);
    if(s.indexOf("/api/enquiry")>-1){return Promise.resolve(new Response(JSON.stringify({ok:false,code:${JSON.stringify(LIVE ? "not_configured" : "preview")},message:${JSON.stringify(formMsg)}}),{status:503,headers:{"content-type":"application/json"}}));}
    if(s.indexOf("_rsc=")>-1||(o&&o.headers&&(o.headers.RSC||o.headers.rsc))){return new Promise(function(){});}
    return f.apply(this,arguments);};
  // 3) Preview badge, added after hydration so React's markup is untouched
  ${LIVE ? "" : `window.addEventListener("load",function(){setTimeout(function(){var d=document.createElement("div");d.innerHTML=${JSON.stringify(badge(prefix))};document.body.appendChild(d.firstChild);},300);});`}
})();</script>`;


function rewrite(html, depth) {
  const prefix = LIVE || (depth ? "../".repeat(depth) : "./");
  const fix = (url) => {
    if (!url.startsWith("/") || url.startsWith("//")) return url;
    const [pathAndQuery, hash] = url.split("#");
    const [p, q] = pathAndQuery.split("?");
    let target;
    if (p.startsWith("/_next/") || /\.[a-z0-9]{2,5}$/i.test(p)) target = p.slice(1);
    else if (p === "/") target = LIVE ? "" : "index.html";
    else if (routeSet.has(p)) target = p.slice(1) + (LIVE ? "" : ".html");
    else if (p === "/tools") target = LIVE ? "insights" : "insights.html";
    else target = LIVE ? "" : "index.html";
    return prefix + target + (q ? "?" + q : "") + (hash !== undefined ? "#" + hash : "");
  };
  html = html.replace(/(\s(?:href|src|action|poster))="([^"]*)"/g, (m, attr, url) => `${attr}="${fix(url)}"`);
  html = html.replace(/(\simageSrcSet|\ssrcset)="([^"]*)"/gi, (m, attr, v) => `${attr}="${v.split(",").map((s) => { const [u, d] = s.trim().split(/\s+/); return fix(u) + (d ? " " + d : ""); }).join(", ")}"`);
  // React re-renders from the embedded RSC flight payload, so root-relative URLs inside it must be rewritten too.
  html = html.replace(/<script>self\.__next_f\.push\(([\s\S]*?)\)<\/script>/g, (m, body) =>
    `<script>self.__next_f.push(${body.replace(/(?<!children\\":)\\"(\/[^"\\]*)\\"/g, (mm, url) => `\\"${fix(url)}\\"`)})</script>`);
  html = html.replace("<head>", "<head>" + shim(prefix));
  if (LIVE) html = html.replace(/opengraph-image\?[^"\\]*/g, "opengraph-image.png");
  return html;
}

let n = 0;
for (const route of routes) {
  const res = await fetch(base + route);
  if (!res.ok) throw new Error(`${route} → ${res.status}`);
  const file = fileFor(route);
  const depth = file.split("/").length - 1;
  const dest = path.join(site, file);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, rewrite(await res.text(), depth));
  n++;
}

// Static assets
fs.cpSync(".next/static", path.join(site, "_next/static"), { recursive: true });
for (const f of ["maps", "media", "icon.svg", "site-config.js"]) if (fs.existsSync(path.join("public", f))) fs.cpSync(path.join("public", f), path.join(site, f), { recursive: true });
// IndexNow key file (public/<32-hex>.txt)
for (const f of fs.readdirSync("public")) if (/^[a-f0-9]{32}\.txt$/.test(f)) fs.copyFileSync(path.join("public", f), path.join(site, f));

// CSS: font URLs are root-relative → relative to css dir
for (const f of fs.readdirSync(path.join(site, "_next/static/css"))) {
  const p = path.join(site, "_next/static/css", f);
  fs.writeFileSync(p, fs.readFileSync(p, "utf8").replace(/url\(\/_next\/static\//g, "url(../"));
}
// Webpack public path → derived from the runtime script's own URL
for (const f of fs.readdirSync(path.join(site, "_next/static/chunks")).filter((x) => x.startsWith("webpack-"))) {
  const p = path.join(site, "_next/static/chunks", f);
  const src = fs.readFileSync(p, "utf8");
  const patched = src.replace('r.p="/_next/"', 'r.p=(function(){try{var s=document.currentScript&&document.currentScript.src;if(s)return s.replace(/static\\/chunks\\/[^/]*$/,"")}catch(e){}return"/_next/"})()');
  if (patched === src) throw new Error("webpack public path pattern not found");
  fs.writeFileSync(p, patched);
}
// Some hosts reject literal U+FFFD; Next's polyfills use it inside string literals, so escape it.
(function esc(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) esc(p); else if (f.endsWith(".js")) { const t = fs.readFileSync(p, "utf8"); if (t.includes("\uFFFD")) fs.writeFileSync(p, t.split("\uFFFD").join("\\uFFFD")); } } })(path.join(site, "_next"));
if (LIVE) {
  const nf = await fetch(base + "/__ngb_missing_page__");
  fs.writeFileSync(path.join(site, "404.html"), rewrite(await nf.text(), 0));
  // Static hosts can't send HTTP redirects: write tiny forwarding pages for retired URLs (canonical + meta refresh).
  const SITE_ORIGIN = new URL([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)][0][1]).origin;
  for (const [from, to] of [["/inclusive-procurement", "/export#dobe"], ["/resources", "/insights"], ["/enquire", "/quote"], ["/request-a-quote", "/quote"], ["/gi", "/origin"]]) {
    const target = LIVE.replace(/\/$/, "") + to;
    fs.writeFileSync(path.join(site, from.slice(1) + ".html"), `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Moved</title><link rel="canonical" href="${SITE_ORIGIN}${target}"><meta name="robots" content="noindex,follow"><meta http-equiv="refresh" content="0; url=${target}"></head><body><p>This page has moved to <a href="${target}">${target}</a>.</p></body></html>`);
  }
  for (const [src, dst] of [["/sitemap.xml", "sitemap.xml"], ["/robots.txt", "robots.txt"], ["/insights/feed.xml", "insights/feed.xml"]]) fs.writeFileSync(path.join(site, dst), await (await fetch(base + src)).text());
  fs.writeFileSync(path.join(site, "opengraph-image.png"), Buffer.from(await (await fetch(base + "/opengraph-image")).arrayBuffer()));
  fs.writeFileSync(path.join(site, ".nojekyll"), "");
}
console.log(`exported ${n} pages to ${out}${LIVE ? ` (live mode, base ${LIVE})` : ""}`);
