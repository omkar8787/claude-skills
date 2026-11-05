#!/usr/bin/env node
/** Generates static, cacheable map SVGs (kept out of HTML/RSC payloads). Runs automatically before `next build`. */
import fs from "node:fs";
import { geoNaturalEarth1, geoContains } from "d3-geo";
import { feature } from "topojson-client";
import india from "@svg-maps/india";

const land110 = JSON.parse(fs.readFileSync(new URL("../node_modules/world-atlas/land-110m.json", import.meta.url)));
fs.mkdirSync("public/maps", { recursive: true });

// India (CC BY 4.0, @svg-maps/india by Victor Cazanave)
const paths = india.locations.map((l) => `<path d="${l.path}"/>`).join("");
fs.writeFileSync(
  "public/maps/india.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${india.viewBox}"><!-- Map of India © Victor Cazanave, CC BY 4.0 --><g fill="rgba(246,243,237,0.045)" stroke="rgba(246,243,237,0.24)" stroke-width="0.6" stroke-linejoin="round">${paths}</g></svg>`,
);

// World dot matrix (Natural Earth land via world-atlas). Projection must match src/lib/geo.ts
const W = 1000, H = 520;
const projection = geoNaturalEarth1().scale(190).translate([W / 2 - 20, H / 2 + 30]);
const land = feature(land110, land110.objects.land);
const d = [];
for (let lat = 80; lat >= -58; lat -= 2.2) for (let lon = -180; lon < 180; lon += 2.2) {
  if (geoContains(land, [lon, lat])) { const p = projection([lon, lat]); d.push(`M${p[0].toFixed(1)} ${p[1].toFixed(1)}h0`); }
}
fs.writeFileSync("public/maps/world-dots.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}"><path d="${d.join("")}" stroke="rgba(246,243,237,0.22)" stroke-width="2.4" stroke-linecap="round" fill="none"/></svg>`);
console.log("maps generated:", fs.statSync("public/maps/india.svg").size, fs.statSync("public/maps/world-dots.svg").size, "bytes");

// Compact state geometry for the interactive Atlas (absolute coords, 1-decimal, sub-pixel points dropped).
function compact(d) {
  const toks = d.match(/[mzLl]|-?\d*\.?\d+(?:e-?\d+)?/g);
  let i = 0, cmd = "", x = 0, y = 0, sx = 0, sy = 0, out = [], lastX = null, lastY = null;
  const push = (c, px, py, force) => {
    if (!force && lastX !== null && Math.hypot(px - lastX, py - lastY) < 1.6) return;
    out.push(`${c}${px.toFixed(1)} ${py.toFixed(1)}`); lastX = px; lastY = py;
  };
  while (i < toks.length) {
    const t = toks[i];
    if (/[mzLl]/.test(t)) { cmd = t; i++; if (t === "z") { out.push("Z"); x = sx; y = sy; lastX = null; } continue; }
    const a = +toks[i], b = +toks[i + 1]; i += 2;
    if (cmd === "m") { x += a; y += b; sx = x; sy = y; push("M", x, y, true); cmd = "l"; }
    else if (cmd === "l") { x += a; y += b; push("L", x, y); }
    else if (cmd === "L") { x = a; y = b; push("L", x, y); }
  }
  return out.join("");
}
fs.mkdirSync("src/content/geo", { recursive: true });
const states = india.locations.map((l) => ({ id: l.id, name: l.name, d: compact(l.path) }));
fs.writeFileSync("src/content/geo/india-states.json", JSON.stringify({ viewBox: india.viewBox, states }));
console.log("atlas geometry:", fs.statSync("src/content/geo/india-states.json").size, "bytes");
