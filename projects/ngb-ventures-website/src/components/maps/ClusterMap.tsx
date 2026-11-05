import { clusters, projectIndia, formatCoord } from "@/content/clusters";
import { industries } from "@/content/industries";
import { IndiaMapBase } from "./IndiaMapBase";
import { ClusterExplorer, type ClusterPoint } from "./ClusterExplorer";

export function ClusterMap({ initial, filterable, only }: { initial?: string; filterable?: boolean; only?: string[] }) {
  const list = only ? clusters.filter((c) => only.includes(c.slug) || c.slug === "pune") : clusters;
  const points: ClusterPoint[] = list.map((c) => {
    const { x, y } = projectIndia(c.lat, c.lon);
    return {
      slug: c.slug, name: c.name, state: c.state, x: +x.toFixed(1), y: +y.toFixed(1), featured: c.featured || !!only,
      specialization: c.specialization, summary: c.summary, coord: formatCoord(c.lat, c.lon), products: c.products, gi: c.gi,
      industries: c.industrySlugs.map((s) => ({ slug: s, name: industries.find((i) => i.slug === s)?.name ?? s })),
    };
  });
  return <ClusterExplorer points={points} map={<IndiaMapBase className="h-full w-full" />} initial={initial ?? points[0].slug} filterable={filterable} />;
}
