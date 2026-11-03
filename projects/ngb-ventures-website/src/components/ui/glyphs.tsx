/**
 * Engraving-style line illustrations (200×200 artboards) used as the subject of art plates.
 * Original drawings for NGB Ventures. Thin strokes, no fills, drawn to read as catalogue plates.
 */
import type { ReactNode } from "react";

const gear = (() => {
  const teeth = 14, R = 70, r = 58, cx = 100, cy = 100; const pts: string[] = [];
  for (let i = 0; i < teeth * 2; i++) {
    const a0 = (i / (teeth * 2)) * Math.PI * 2; const a1 = ((i + 1) / (teeth * 2)) * Math.PI * 2; const rad = i % 2 === 0 ? R : r;
    pts.push(`${(cx + Math.cos(a0) * rad).toFixed(1)},${(cy + Math.sin(a0) * rad).toFixed(1)}`, `${(cx + Math.cos(a1) * rad).toFixed(1)},${(cy + Math.sin(a1) * rad).toFixed(1)}`);
  }
  return `M${pts.join(" L")} Z`;
})();

export const GLYPHS: Record<string, ReactNode> = {
  tee: <><path d="M70 30 L50 38 L22 62 L36 84 L56 72 L56 172 L144 172 L144 72 L164 84 L178 62 L150 38 L130 30 C124 44 112 50 100 50 C88 50 76 44 70 30 Z" /><path d="M76 33 C82 45 92 48 100 48 C108 48 118 45 124 33" /><path d="M56 160 H144 M36 84 L42 80 M164 84 L158 80" opacity=".6" /><path d="M92 62 H108 V74 H92 Z" opacity=".5" /></>,
  towels: <><path d="M30 150 H170 V176 H30 Z M40 122 H160 V150 H40 Z M50 94 H150 V122 H50 Z M60 66 H140 V94 H60 Z" /><path d="M30 166 H170 M40 140 H160 M50 112 H150 M60 84 H140" opacity=".55" /><path d="M150 150 C158 150 160 156 160 163 M140 122 C148 122 150 128 150 136" opacity=".55" /></>,
  vase: <><path d="M84 28 H116 M88 28 C88 44 93 50 93 58 C70 70 54 95 54 122 C54 152 74 174 100 174 C126 174 146 152 146 122 C146 95 130 70 107 58 C107 50 112 44 112 28" /><path d="M58 104 C80 112 120 112 142 104 M55 128 C80 136 120 136 145 128" opacity=".6" /><path d="M70 116 l6 -6 l6 6 l6 -6 l6 6 l6 -6 l6 6 l6 -6 l6 6 l6 -6 l6 6 l6 -6 l6 6" opacity=".5" /></>,
  chair: <><path d="M62 26 L66 104 M138 26 L134 104 M63 44 H137 M64 62 H136 M64 80 H136" /><path d="M48 104 H152 V116 H48 Z M56 116 V176 M144 116 V176 M56 152 H144" /><path d="M80 44 V80 M100 44 V80 M120 44 V80" opacity=".45" /></>,
  ring: <><circle cx="100" cy="124" r="48" /><circle cx="100" cy="124" r="39" opacity=".7" /><path d="M78 74 L89 56 H111 L122 74 L100 96 Z M78 74 H122 M89 56 L95 74 L100 96 M111 56 L105 74 L100 96" /><path d="M100 34 V44 M74 44 l6 6 M126 44 l-6 6" opacity=".5" /></>,
  gem: <><path d="M40 78 L66 44 H134 L160 78 L100 168 Z M40 78 H160 M66 44 L84 78 L100 168 M134 44 L116 78 L100 168 M84 78 L100 44 L116 78" /><path d="M100 22 V32 M164 40 l-8 6 M36 40 l8 6" opacity=".5" /></>,
  bottle: <><path d="M90 20 H110 V40 H90 Z M93 40 V52 M107 40 V52" /><path d="M80 62 C80 55 86 52 92 52 H108 C114 52 120 55 120 62 V164 C120 170 116 176 110 176 H90 C84 176 80 170 80 164 Z" /><path d="M80 96 H120 M80 142 H120" opacity=".6" /><path d="M100 136 C100 120 100 112 100 104 M100 122 C92 120 88 114 88 108 C95 109 99 114 100 122 Z M100 116 C108 114 112 108 112 102 C105 103 101 108 100 116 Z" opacity=".75" /></>,
  jar: <><path d="M60 70 H140 V58 C140 52 136 48 130 48 H70 C64 48 60 52 60 58 Z" /><path d="M64 70 V160 C64 168 70 176 80 176 H120 C130 176 136 168 136 160 V70" /><path d="M64 104 H136 M64 140 H136" opacity=".55" /><path d="M60 60 H140" opacity=".45" /></>,
  box: <><path d="M100 46 L168 80 L168 148 L100 182 L32 148 L32 80 Z M32 80 L100 114 L168 80 M100 114 V182" /><path d="M32 80 L58 58 L126 92 L100 114 M168 80 L142 58 L74 24 L100 46" opacity=".6" /><path d="M54 126 L80 139 M54 136 L72 145" opacity=".5" /></>,
  bag: <><path d="M46 78 H154 L162 178 H38 Z" /><path d="M74 78 C74 36 126 36 126 78 M84 78 C84 50 116 50 116 78" /><path d="M44 104 H156 M46 92 H154" opacity=".45" /><path d="M66 120 H134 M66 128 H134 M66 136 H134 M66 144 H134 M66 152 H134" opacity=".35" /></>,
  lamp: <><path d="M100 8 V58 M90 58 H110 L112 70 H88 Z" /><path d="M88 70 C62 76 42 100 36 130 H164 C158 100 138 76 112 70" /><path d="M60 110 h4 M76 102 h4 M92 98 h4 M108 98 h4 M124 102 h4 M140 110 h4 M52 122 h4 M68 116 h4 M84 112 h4 M100 112 h4 M116 112 h4 M132 116 h4 M148 122 h4" strokeWidth="2.4" strokeLinecap="round" opacity=".7" /><path d="M66 142 L52 178 M100 142 V184 M134 142 L148 178 M83 142 L76 168 M117 142 L124 168" opacity=".45" /></>,
  bowl: <><path d="M28 94 H172 C172 138 142 168 100 168 C58 168 28 138 28 94 Z" /><path d="M28 94 C28 103 60 110 100 110 C140 110 172 103 172 94" /><path d="M80 168 L76 180 H124 L120 168" /><path d="M48 124 h1 M62 132 h1 M78 136 h1 M96 138 h1 M114 137 h1 M132 133 h1 M148 125 h1 M58 146 h1 M76 152 h1 M96 154 h1 M116 152 h1 M136 146 h1" strokeWidth="3" strokeLinecap="round" opacity=".6" /></>,
  shoe: <><path d="M28 140 C28 120 38 104 54 100 L84 92 C92 80 100 70 110 66 L124 64 C128 80 138 96 160 104 C172 108 178 120 176 140 Z" /><path d="M28 140 H176 V154 H28 Z" /><path d="M96 84 L106 92 M102 76 L112 84 M108 70 L118 78" /><path d="M40 147 h132" strokeDasharray="2 4" opacity=".6" /></>,
  ball: <><circle cx="100" cy="100" r="64" /><path d="M54 54 C82 82 118 118 146 146 M60 48 C88 76 124 112 152 140" /><path d="M62 66 l6 -6 M72 76 l6 -6 M82 86 l6 -6 M92 96 l6 -6 M102 106 l6 -6 M112 116 l6 -6 M122 126 l6 -6 M132 136 l6 -6" opacity=".6" /></>,
  top: <><path d="M100 22 V54" /><path d="M70 60 H130 C142 60 150 70 150 82 C150 110 122 140 100 176 C78 140 50 110 50 82 C50 70 58 60 70 60 Z" /><path d="M52 86 H148 M58 106 H142 M72 128 H128" opacity=".6" /><circle cx="100" cy="20" r="4" /></>,
  notebook: <><path d="M56 26 H150 V176 H56 Z M70 26 V176" /><path d="M136 26 V176" opacity=".7" /><path d="M82 60 H124 M82 72 H124 M82 84 H112" opacity=".5" /><path d="M150 40 c4 2 4 6 0 8 c4 2 4 6 0 8 c4 2 4 6 0 8 c4 2 4 6 0 8 c4 2 4 6 0 8 c4 2 4 6 0 8 c4 2 4 6 0 8 c4 2 4 6 0 8" opacity=".5" /></>,
  gear: <><path d={gear} /><circle cx="100" cy="100" r="34" /><circle cx="100" cy="100" r="12" /><path d="M100 18 V30 M100 170 V182 M18 100 H30 M170 100 H182" opacity=".45" strokeDasharray="2 3" /></>,
  spool: <><path d="M78 26 H122 L142 172 H58 Z" /><path d="M72 172 H128" /><path d="M76 44 L124 54 M74 62 L126 74 M72 80 L128 94 M70 98 L130 114 M68 116 L132 134 M66 134 L134 152" opacity=".55" /><path d="M120 30 C150 40 170 70 176 110" strokeDasharray="1 5" strokeLinecap="round" /></>,
  leaf: <><path d="M100 178 C100 120 100 80 100 24" /><path d="M100 120 C70 112 50 90 48 60 C80 64 98 90 100 120 Z M100 88 C128 80 146 58 150 32 C120 36 102 58 100 88 Z" /><path d="M100 120 L62 72 M100 88 L138 44" opacity=".5" /></>,
  bamboo: <><path d="M84 18 V182 M108 18 V182" /><path d="M82 60 H110 M82 112 H110 M82 160 H110" /><path d="M108 60 C126 50 146 50 160 36 C142 34 124 40 108 60 Z M84 112 C66 100 48 102 34 90 C52 86 70 92 84 112 Z" opacity=".75" /></>,
  loofah: <><path d="M60 50 C90 20 150 40 156 90 C162 140 120 178 80 168 C40 158 30 80 60 50 Z" /><path d="M64 62 L150 120 M58 82 L140 148 M60 104 L118 162 M80 48 L156 100 M102 40 L154 76 M66 60 L50 120 M90 46 L64 156 M118 46 L94 166 M144 62 L126 160" opacity=".45" /></>,
  globe: <><circle cx="100" cy="100" r="70" /><ellipse cx="100" cy="100" rx="30" ry="70" /><path d="M30 100 H170 M40 64 H160 M40 136 H160" opacity=".7" /><path d="M100 30 V170" opacity=".5" /></>,
  magnifier: <><circle cx="88" cy="88" r="50" /><circle cx="88" cy="88" r="40" opacity=".55" /><path d="M124 124 L170 170 M118 130 L164 176 M130 118 L176 164" /><path d="M64 70 C70 60 80 54 92 54" opacity=".6" /></>,
  seal: <><circle cx="100" cy="92" r="56" /><circle cx="100" cy="92" r="44" opacity=".6" /><path d="M78 92 L94 108 L124 76" /><path d="M72 140 L60 182 L82 170 L94 186 L100 148 M128 140 L140 182 L118 170 L106 186 L100 148" opacity=".7" /></>,
  tag: <><path d="M40 60 L100 30 H170 V100 L140 160 L40 60 Z" transform="rotate(10 100 100)" /><circle cx="148" cy="54" r="9" /><path d="M148 54 C160 30 180 26 188 40" /><path d="M86 90 L118 122 M76 100 L108 132" opacity=".5" /></>,
  clipboard: <><path d="M52 34 H148 V182 H52 Z" /><path d="M80 24 H120 V44 H80 Z" /><path d="M70 72 l8 8 l14 -14 M100 74 H132 M70 104 l8 8 l14 -14 M100 106 H132 M70 136 l8 8 l14 -14 M100 138 H132" opacity=".75" /></>,
  document: <><path d="M56 22 H124 L150 48 V180 H56 Z M124 22 V48 H150" /><path d="M72 76 H134 M72 92 H134 M72 108 H134 M72 124 H118" opacity=".55" /><circle cx="120" cy="154" r="14" opacity=".7" /><path d="M72 152 H98" opacity=".55" /></>,
  ship: <><path d="M24 128 H176 L160 160 H40 Z" /><path d="M44 128 V104 H70 V128 M70 128 V96 H96 V128 M96 128 V104 H122 V128 M122 128 V88 H140 V128" opacity=".75" /><path d="M140 88 V60 H156 V128" /><path d="M10 176 c10 -6 20 -6 30 0 s20 6 30 0 s20 -6 30 0 s20 6 30 0 s20 -6 30 0 s20 6 30 0" opacity=".55" /></>,
  camera: <><path d="M30 64 H70 L80 48 H120 L130 64 H170 V160 H30 Z" /><circle cx="100" cy="110" r="34" /><circle cx="100" cy="110" r="22" opacity=".6" /><path d="M146 80 h10" /></>,
  compass: <><circle cx="100" cy="100" r="68" /><circle cx="100" cy="100" r="58" opacity=".5" /><path d="M100 46 L114 100 L100 154 L86 100 Z M86 100 H114" /><path d="M100 26 V36 M100 164 V174 M26 100 H36 M164 100 H174" /></>,
  stamp: <><path d="M60 40 H140 V70 H60 Z M84 70 V96 H116 V70" /><path d="M40 96 H160 V120 H40 Z" /><path d="M56 150 C66 138 82 138 92 150 C82 162 66 162 56 150 Z M108 150 C118 138 134 138 144 150 C134 162 118 162 108 150 Z M100 132 C108 142 108 158 100 168 C92 158 92 142 100 132 Z" opacity=".7" /></>,
};

/** Which illustration each plate slot uses. Slots without an entry render pattern-only. */
export const GLYPH_BY_SLOT: Record<string, string> = {
  "industry-apparel": "tee", "industry-home-textiles": "towels", "industry-handicrafts": "vase", "industry-furniture": "chair", "industry-jewelry": "ring",
  "industry-essential-oils": "bottle", "industry-beauty": "jar", "industry-packaging": "box", "industry-eco": "bag", "industry-lighting": "lamp",
  "industry-kitchenware": "bowl", "industry-leather": "shoe", "industry-sports": "ball", "industry-toys": "top", "industry-stationery": "notebook", "industry-engineering": "gear",
  "product-cotton-tshirts": "tee", "product-organic-cotton-bags": "bag", "product-jute-bags": "bag", "product-natural-loofah": "loofah", "product-brass-home-decor": "vase",
  "product-wooden-handicrafts": "bowl", "product-bamboo-products": "bamboo", "product-essential-oils": "bottle", "product-cotton-bath-towels": "towels",
  "cluster-tirupur": "spool", "cluster-ludhiana": "spool", "cluster-jaipur": "stamp", "cluster-moradabad": "vase", "cluster-saharanpur": "chair", "cluster-rajkot": "gear",
  "cluster-surat": "gem", "cluster-panipat": "towels", "cluster-agra": "shoe", "cluster-pune": "gear", "cluster-sivakasi": "notebook", "cluster-khambhat": "gem",
  "cluster-kannauj": "bottle", "cluster-karur": "towels", "cluster-bhadohi": "towels", "cluster-jodhpur": "chair", "cluster-firozabad": "vase", "cluster-kanpur": "shoe",
  "cluster-jalandhar": "ball", "cluster-channapatna": "top", "cluster-alappuzha": "leaf",
  "service-supplier-identification": "magnifier", "service-verification": "seal", "service-private-label": "tag", "service-oem": "gear", "service-product-development": "compass",
  "service-quality-inspection": "magnifier", "service-factory-audits": "clipboard", "service-packaging": "box", "service-export": "document", "service-logistics": "ship",
  "service-photography": "camera", "service-consultancy": "compass",
  "market-usa": "globe", "market-uk": "globe", "market-germany": "globe", "market-france": "globe", "market-netherlands": "ship", "market-australia": "globe", "market-canada": "globe", "market-uae": "ship",
  "home-why-india": "stamp", "about-hero": "compass", "page-industries": "spool", "page-products": "box", "page-manufacturing": "gear", "page-services": "compass", "page-markets": "globe", "page-resources": "document", "page-contact": "seal", "page-enquire": "document", "page-tools": "compass",
};
