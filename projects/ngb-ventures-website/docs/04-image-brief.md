# Image brief: photography slots

Every visual on the site is a numbered **plate** with a stable slot ID. Until licensed photography is supplied, each slot renders an original art-directed illustration (pattern + engraved line drawing), so nothing appears broken or grey.

**To replace a plate with a photo:** save the image as `public/media/<slot>.webp` (or `.jpg`/`.png`/`.avif`) and rebuild. The `Plate` component detects the file at build time and serves it through `next/image` (responsive sizes, AVIF/WebP, lazy loading).

## Photography standards
- Licensed for commercial web use (commissioned shoot, Unsplash/Pexels licence, or paid stock). Keep licence records in `docs/licences/`.
- Never hotlink or reuse competitor imagery.
- Minimum 2400px on the long edge. Export WebP at quality 78–82.
- Grade: warm-neutral, low saturation, soft directional light, deep but not crushed shadows. It should match the charcoal/ivory/bronze system.
- Show real Indian manufacturing contexts. Get model releases for identifiable people, and avoid staged "handshake" stock.
- Recommended: one 2-day commissioned shoot in Pune plus visits to 2–3 partner workshops, covering the hero, process, QC and packaging slots.

## Slots (81)

| Slot | Alt text | Shot brief | Fallback motif / tone |
|---|---|---|---|
| `cluster-tirupur` | Circular knitting machines producing cotton jersey | Rows of circular knitting machines with cones of cotton yarn; motion blur; cool industrial light. | knit / indigo |
| `cluster-ludhiana` | Woollen knitwear on a flat-knitting machine | Woollen sweater panels on a flat-knitting machine; warm red-brown tones. | knit / madder |
| `cluster-jaipur` | Hand block printing on cotton fabric | Artisan pressing a carved wooden block onto cotton; madder red and indigo dyes; overhead light. | block / madder |
| `cluster-moradabad` | Brass vessels being polished in a workshop | Polishing a brass vessel on a buffing wheel; sparks of light; bronze and black. | radial / bronze |
| `cluster-saharanpur` | Intricate hand-carved wooden panel | Macro of a hand-carved floral wood panel; raking light showing depth; warm brown. | grain / clay |
| `cluster-rajkot` | Molten metal being poured in a foundry | Foundry pour with glowing metal; dark environment; orange accents against charcoal. | blueprint / charcoal |
| `cluster-surat` | Synthetic fabric rolls on a weaving floor | Rolls of shimmering synthetic fabric in a weaving shed; cool tones; depth. | weave / indigo |
| `cluster-panipat` | Handloom weaving a flat-weave rug | Weaver at a handloom with a flat-weave rug in progress; warm sand tones; rhythmic threads. | weave / sand |
| `cluster-agra` | Leather shoe being hand-lasted | Shoemaker lasting a leather upper; tools and pattern pieces; dramatic warm light. | grain / madder |
| `cluster-pune` | Precision engineering workshop in Pune | Modern CNC shop floor with clean lines; cool daylight; stone grey palette. | blueprint / stone |
| `cluster-sivakasi` | Offset printing press with printed sheets | Printed sheets coming off an offset press; CMYK registration marks; crisp light. | fold / sand |
| `cluster-khambhat` | Polished agate and carnelian beads | Pile of polished carnelian and agate beads; translucent glow; deep red and amber. | facet / madder |
| `cluster-kannauj` | Copper stills used in traditional attar distillation | Copper deg stills over fire with rose petals; smoky warm light. | botanical / olive |
| `cluster-karur` | Woven cotton kitchen linen | Stacked woven kitchen towels in checks and stripes; soft light. | weave / stone |
| `cluster-bhadohi` | Hand-knotted carpet on a loom | Back of a hand-knotted carpet on a vertical loom; rich madder reds. | weave / madder |
| `cluster-jodhpur` | Solid-wood furniture in a Jodhpur workshop | Solid wood tables stacked in a sunlit Jodhpur workshop; sand tones. | grain / sand |
| `cluster-firozabad` | Hand-blown glass being shaped | Glowing glass gather on a blowpipe; dark furnace background. | radial / olive |
| `cluster-kanpur` | Stacks of finished leather hides | Stacks of finished leather hides in a warehouse; warm brown tones. | grain / clay |
| `cluster-jalandhar` | Hand-stitched cricket balls | Hand-stitching cricket balls; tight crop; red leather and white thread. | dots / indigo |
| `cluster-channapatna` | Lacquered wooden toys being turned on a lathe | Lathe-turning a lacquered toy; colourful lac sticks; warm light. | dots / madder |
| `cluster-alappuzha` | Coir fibre being woven into mats | Coir fibre and woven mats beside backwaters; natural tones. | weave / olive |
| `guide-how-to-source` | Sourcing documents and samples | Desk with samples, spec sheets and a map of India | route / bronze |
| `guide-incoterms` | Container port operations | Container being loaded at an Indian port | route / indigo |
| `industry-apparel` | Cotton knitwear being finished on a garment production line | Close-up of hands guiding cotton jersey through a sewing machine; warm side light; shallow depth of field; indigo and natural cotton tones. | knit / indigo |
| `industry-home-textiles` | Folded stacks of woven cotton towels and bed linen | Overhead flat-lay of folded towels and linen in natural, oatmeal and indigo tones; soft daylight; linen texture visible. | weave / sand |
| `industry-handicrafts` | Artisan hand-finishing a carved décor piece | Artisan's hands with a carving tool on a mango-wood bowl; workshop dust in a shaft of light; terracotta and warm brown palette. | jali / clay |
| `industry-furniture` | Solid wood furniture being finished in a workshop | Craftsman sanding a solid mango-wood tabletop; long horizontal composition; grain detail; amber light. | grain / clay |
| `industry-jewelry` | Silver and gemstone jewelry laid out on a dark workbench | Macro of silver rings and cut gemstones on dark slate; single hard light; sparkle and deep shadow. | facet / charcoal |
| `industry-essential-oils` | Amber essential-oil bottles beside fresh botanicals | Amber glass bottles with dried lemongrass, vetiver roots and flowers on stone; soft morning light; olive and amber palette. | botanical / olive |
| `industry-beauty` | Natural soap bars and skincare jars on stone | Handmade soap bars and amber jars on travertine with botanicals; editorial still life; neutral sand palette. | botanical / sand |
| `industry-packaging` | Kraft rigid boxes and printed packaging prototypes | Kraft boxes, tissue and printed sleeves arranged geometrically; top-down; crisp shadows; neutral palette. | fold / sand |
| `industry-eco` | Woven jute bags and natural fibre products | Close-up of jute weave and coir rope with a tote bag; natural daylight; olive and straw tones. | weave / olive |
| `industry-lighting` | Pierced brass lantern casting patterned light | Pierced brass lantern glowing in a dark room, patterns on walls; long exposure; charcoal and gold. | radial / charcoal |
| `industry-kitchenware` | Hammered copper and brass serveware | Hammered copper bowls and brass tumblers on a linen table; warm overhead light; reflective metal detail. | radial / bronze |
| `industry-leather` | Leather hides and hand-stitched footwear | Cognac leather hides, cutting patterns and a hand-stitched shoe on a cobbler's bench; dramatic side light. | grain / madder |
| `industry-sports` | Hand-stitched sports balls and equipment | Hand-stitching a leather ball; tight crop on stitches and needle; cool daylight with indigo shadows. | dots / indigo |
| `industry-toys` | Lacquered wooden toys in bright colours | Lacquered Channapatna wooden toys on a neutral background; playful but editorial composition; saturated reds softened by soft light. | dots / madder |
| `industry-stationery` | Handmade paper journals with deckle edges | Stacked handmade cotton-rag paper with deckle edges and a leather journal; soft north light; stone grey palette. | fold / stone |
| `industry-engineering` | CNC-machined metal components under inspection | Machined steel parts on a granite inspection table with a micrometer; cool tones; precision detail. | blueprint / charcoal |
| `market-usa` | Container port at dusk representing US imports | US-bound container stack at dusk; port cranes; blue hour. | route / indigo |
| `market-uk` | Indian home décor in a British interior | Indian brass and textiles styled in a London townhouse interior; grey daylight. | jali / stone |
| `market-germany` | Precision inspection representing German quality expectations | Quality lab with textile testing equipment; clinical cool light. | blueprint / charcoal |
| `market-france` | Hand-embroidered fabric for French fashion | Hand embroidery on silk in a Parisian atelier styling; soft daylight. | block / clay |
| `market-netherlands` | European port logistics | Port of Rotterdam-style container terminal aerial; grey-blue. | route / stone |
| `market-australia` | Indian wooden homewares in a sunlit Australian interior | Wooden homewares styled in a bright coastal interior; warm sand light. | grain / sand |
| `market-canada` | Textile goods prepared for Canadian retail | Folded woollen throws and textiles in a cabin-style interior; warm red tones. | weave / madder |
| `market-uae` | Indian décor in a Gulf hospitality interior | Brass lanterns and textiles in a contemporary Gulf hotel lobby; golden light. | jali / sand |
| `product-cotton-tshirts` | Folded cotton T-shirts in neutral colours | Folded heavyweight tees in a tonal stack; studio light; fabric texture visible. | knit / stone |
| `product-organic-cotton-bags` | Natural organic cotton tote bags | Natural calico totes hanging against a lime-washed wall; soft daylight. | weave / sand |
| `product-jute-bags` | Woven jute bags with rope handles | Jute shopping bags with rope handles, close crop on weave; warm straw light. | weave / olive |
| `product-natural-loofah` | Natural loofah sponges and cut pads | Dried loofah gourds and sliced discs on linen; airy light; natural beige. | dots / sand |
| `product-brass-home-decor` | Polished brass vases and candle holders | Group of brass vessels in varied finishes on travertine; low warm sun; long shadows. | radial / bronze |
| `product-wooden-handicrafts` | Hand-carved wooden bowls and boxes | Carved wooden boxes and bowls; side light emphasising carving; warm brown. | grain / clay |
| `product-bamboo-products` | Woven bamboo baskets and homeware | Woven bamboo baskets nested; diagonal composition; green-gold light. | weave / olive |
| `product-essential-oils` | Amber bottles of essential oils with herbs | Rows of amber dropper bottles with lemongrass; backlit glow; olive palette. | botanical / olive |
| `product-cotton-bath-towels` | Stacked plush cotton bath towels | Rolled and stacked plush towels in oatmeal and stone; soft bathroom daylight. | weave / stone |
| `service-supplier-identification` | Mapping manufacturing options across India | Map with pins and fabric swatches on a desk; overhead; analytical mood. | dots / stone |
| `service-verification` | Reviewing supplier documents | Hands reviewing certificates and registration documents with a pen; clean desk; soft light. | blueprint / stone |
| `service-private-label` | Branded private-label packaging | Unbranded product with hang tags and printed packaging prototypes; clean studio. | fold / sand |
| `service-oem` | Engineering drawings beside machined parts | Technical drawing with calipers and a machined part; cool, precise. | blueprint / charcoal |
| `service-product-development` | Product prototypes and material swatches | Prototypes, swatches and sketches on a studio table; warm creative light. | fold / clay |
| `service-quality-inspection` | Inspector measuring a product against specifications | Inspector with measuring tape and checklist on a factory table; documentary feel. | blueprint / stone |
| `service-factory-audits` | Auditor walking a factory floor | Auditor with tablet walking between production lines; wide shot; natural light. | jali / charcoal |
| `service-packaging` | Custom packaging dielines and samples | Unfolded box dielines and printed samples; graphic flat-lay. | fold / sand |
| `service-export` | Export documents and shipping containers | Shipping documents with containers out of focus behind; port dusk; indigo tones. | route / indigo |
| `service-logistics` | Container ship leaving an Indian port | Container ship at sea at dawn from above; muted blues and charcoal. | route / charcoal |
| `service-photography` | Product photography studio set-up | Softbox lighting a product on a seamless backdrop; behind-the-scenes. | radial / stone |
| `service-consultancy` | Strategy session with sourcing documents | Strategy session with laptop, samples and notes; warm office light. | jali / bronze |
| `about-hero` | NGB Ventures sourcing team at work | Team reviewing samples with a manufacturer on a factory floor | jali / bronze |
| `page-contact` | NGB Ventures, Pune | Pune cityscape at dusk | jali / charcoal |
| `page-enquire` | Sourcing brief | Hands writing a product brief beside fabric swatches | fold / charcoal |
| `page-industries` | Textile production in India | Wide shot of fabric rolls in a mill | weave / indigo |
| `page-manufacturing` | Indian manufacturing cluster | Aerial of an industrial cluster at dusk | blueprint / charcoal |
| `page-markets` | Container ship departing an Indian port | Container ship departing JNPT at dusk | route / indigo |
| `home-hero` | Indian manufacturing floor at dawn | Wide cinematic shot of a textile or craft production floor at dawn; long light shafts; people at work; charcoal and bronze grade. | jali / charcoal |
| `home-why-india` | Artisan hand block printing textiles | Artisan hand block printing on a long table; rows of printed cotton; warm madder and indigo palette. | block / madder |
| `page-legal` | Privacy | n/a | dots / stone |
| `page-products` | Product samples on a studio table | Product samples arranged on a studio table | fold / sand |
| `page-resources` | Sourcing tools and documents | Calculator, tape measure and documents | blueprint / stone |
| `page-services` | Sourcing consultation | Sourcing team reviewing samples | jali / bronze |
| `page-tools` | CBM & container calculator | Planning tools on a desk | blueprint / stone |
