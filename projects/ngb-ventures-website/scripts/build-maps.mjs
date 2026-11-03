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
