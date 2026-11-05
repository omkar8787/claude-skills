#!/usr/bin/env node
/**
 * IndexNow: notify participating search engines (Bing, Yandex, Seznam, Naver…) of new or changed URLs.
 * Google does not use IndexNow; it discovers changes through the sitemap, RSS feed and Search Console.
 *
 *   node scripts/indexnow.mjs <old-sitemap.xml|-> <new-sitemap.xml> <public-dir>
 *
 * Compares <loc>/<lastmod> pairs and submits only URLs that are new or whose lastmod changed.
 * The key is the 32-hex-character file name of public/<key>.txt. Never fails the build.
 */
import fs from "node:fs";

const [oldPath, newPath, publicDir = "public"] = process.argv.slice(2);
const read = (p) => (p && p !== "-" && fs.existsSync(p) ? fs.readFileSync(p, "utf8") : "");
const parse = (xml) => new Map([...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, u]) => [u.match(/<loc>(.*?)<\/loc>/)?.[1], u.match(/<lastmod>(.*?)<\/lastmod>/)?.[1] ?? ""]).filter(([l]) => l));

const before = parse(read(oldPath));
const after = parse(read(newPath));
const changed = [...after].filter(([loc, mod]) => before.get(loc) !== mod).map(([loc]) => loc);
const keyFile = fs.readdirSync(publicDir).find((f) => /^[a-f0-9]{32}\.txt$/.test(f));

if (!keyFile) { console.log("IndexNow: no key file in", publicDir, "- skipped"); process.exit(0); }
if (!changed.length) { console.log("IndexNow: no new or changed URLs"); process.exit(0); }

const key = keyFile.replace(/\.txt$/, "");
const first = new URL(changed[0]);
const base = first.origin + (first.pathname.match(/^\/[^/]+\//)?.[0] ?? "/");
const body = { host: first.host, key, keyLocation: `${base}${keyFile}`, urlList: changed.slice(0, 10000) };
try {
  const res = await fetch("https://api.indexnow.org/indexnow", { method: "POST", headers: { "Content-Type": "application/json; charset=utf-8" }, body: JSON.stringify(body) });
  console.log(`IndexNow: submitted ${body.urlList.length} URL(s) → HTTP ${res.status}`);
  body.urlList.slice(0, 20).forEach((u) => console.log("  ", u));
} catch (e) {
  console.log("IndexNow: request failed (non-fatal):", e.message);
}
