import { projectWorld, WORLD_W, WORLD_H } from "@/lib/geo";
import { marketRegions, markets } from "@/content/markets";
import { MarketsExplorer, type RegionPoint } from "./MarketsExplorer";

export function WorldMarkets() {
  const origin = projectWorld(18.95, 72.95); // JNPT / Nhava Sheva near Mumbai
  const regions: RegionPoint[] = marketRegions.map((r) => ({
    id: r.id, label: r.label, ...projectWorld(r.lat, r.lon),
    markets: r.markets.map((m) => { const mk = markets.find((x) => x.slug === m)!; return { slug: mk.slug, name: mk.name, line: mk.heroLine, trade: mk.tradeNote }; }),
  }));
  return (
    <MarketsExplorer
      w={WORLD_W}
      h={WORLD_H}
      origin={origin}
      regions={regions}
      base={
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/maps/world-dots.svg" alt="" aria-hidden className="map-art h-full w-full" width={WORLD_W} height={WORLD_H} loading="lazy" decoding="async" />
      }
    />
  );
}
