import "server-only";
import { geoNaturalEarth1 } from "d3-geo";

export const WORLD_W = 1000;
export const WORLD_H = 520;

const projection = geoNaturalEarth1().scale(190).translate([WORLD_W / 2 - 20, WORLD_H / 2 + 30]);

export function projectWorld(lat: number, lon: number) {
  const p = projection([lon, lat])!;
  return { x: +p[0].toFixed(1), y: +p[1].toFixed(1) };
}

