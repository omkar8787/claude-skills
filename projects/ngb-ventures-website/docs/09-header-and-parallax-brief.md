# Brief: header visibility and parallax for a minimal, premium UI

## Title
Polish header visibility and parallax for a minimal, premium UI

## Role & stance
You are a UI/UX designer and front-end engineer refining a website's header behaviour and parallax effects. Remove the blinking header and make motion feel minimal and premium, without changing the site's intent. Give guidance that can be implemented directly.

## Task
1. Remove all header visibility flicker during scroll.
2. Make parallax stable, subtle and premium.
3. Specify micro-interactions and any supporting UI copy.
4. Provide implementation notes and reference CSS/JS.
5. Cover accessibility, performance and edge cases.

## Context
Observed during scrolling:
- The top header bar (menu) frequently appears and disappears, like blinking, which degrades the overall UI/UX.
- Parallax scrolling needs tightening to feel premium and minimal.

Root causes found in this codebase (NGB Ventures, Next.js + Motion):

| # | Cause | Effect |
|---|---|---|
| 1 | `hidden` was recomputed from each scroll event (`y > 480 && dy > 4`). Any small downward delta (1–4 px from a trackpad, momentum or touch) reset it to visible | Header toggled on almost every frame: **1,062 state changes** in one test scroll |
| 2 | The transition listed `transform`, but Tailwind v4's `translate-y-*` uses the CSS `translate` property | Hide and show were never animated, so they snapped and read as a blink |
| 3 | No rAF throttling, no guard against layout jumps (lazy `content-visibility` sections, scroll anchoring) or iOS rubber-band overscroll | Spurious deltas, and extra toggles near the top and bottom of the page |
| 4 | Parallax amplitudes of up to 150 px (hero tiles) and about 340 px (manifesto columns), also running on phones | Busy, "floaty" movement and unwanted motion on small screens |
| 5 | The mobile CTA bar's visibility depended on total page height, which changes as lazy sections render | Possible flicker near the page bottom |

## Inputs available
- Observations: header visibility flicker on scroll; parallax behaviour.
- Desired attributes: minimal, premium, smooth, non-intrusive.
- Target browsers/devices: [FILL: browser and device support matrix]
- Brand motion tokens, if any exist: [FILL: duration/easing tokens from the design system]

## Output requirements

### A. Header behaviour spec
| State | Rule |
|---|---|
| Top of page (y < 120 px) | Always visible. Transparent over the hero, using the hero's foreground colour |
| Solid background | On when y > 32 px, off when y < 8 px (hysteresis band, so it can't flutter at the threshold) |
| Hide | Only below 400 px, and only after **72 px of net downward travel** |
| Reveal | After **24 px of net upward travel** (revealing is deliberately quicker than hiding) |
| Small reversals | Nudge the up/down counters; they never reset them. A long scroll with wobbles hides **once** |
| Layout jump (> 160 px in one frame) | Ignored: counters reset, no state change |
| Overscroll (iOS rubber band) | Scroll position clamped to [0, max] before any calculation |
| Menu open, or focus inside the header | Always visible (`pinned` flag, plus `:focus-within` in CSS) |
| `prefers-reduced-motion: reduce` | Never hides; colour changes only |

**Motion:** a single GPU-composited transform. Hide takes 350 ms and reveal takes 450 ms, both with `cubic-bezier(.2,.8,.2,1)`. Background, colour and shadow fade over 300 ms. Layout properties are never animated.

### B. Parallax spec
- **Amplitude:** at most about 60 px per element across its scroll range (hero tiles from -12 to -56 px). Opposing columns move about ±100 px over the whole section.
- **Desktop only (≥ 1024 px).** Phones and tablets render static, so no motion sickness and no jank.
- **Direct scroll mapping**, with no spring on parallax. Springs add lag, which reads as "floaty". Springs are acceptable for progress indicators only.
- **Properties:** only `transform` (translate or scale) on dedicated layers. Never `top`, `margin` or `background-position`.
- **Pinned sections** (journey, horizontal spotlight) are scrubbed rather than parallaxed. Keep them, with reduced-motion fallbacks.
- **Reduced motion:** all parallax disabled.

### C. Micro-interactions and copy
- Header CTA: a solid pill once the header is solid. Over the hero it uses the hero accent (`--hero-cta-bg`).
- Thin reading-progress line along the header's top edge, spring-smoothed and 2 px tall.
- Mobile CTA bar ("Start your sourcing brief") appears after about 90% of the first screen, hides again below 60% (hysteresis), and hides whenever the footer is visible.
- No new copy required. [FILL: any copy changes requested by the brand owner]

### D. Reference implementation (as shipped)

**Hook:** `src/lib/use-header-visibility.ts`
```ts
const update = () => {
  frame = 0;
  const max = Math.max(0, document.documentElement.scrollHeight - innerHeight);
  const y = Math.min(Math.max(scrollY, 0), max);            // clamp rubber-band
  const dy = y - lastY; lastY = y;
  if (Math.abs(dy) > 160) { down = 0; up = 0; }               // layout jump
  else if (dy > 0) { down += dy; up = Math.max(0, up - dy); }
  else if (dy < 0) { up -= dy; down = Math.max(0, down + dy); }
  const nextSolid = solid ? y > 8 : y > 32;
  let nextHidden = hidden;
  if (pinned || reduce.matches || y < 120) nextHidden = false;
  else if (!hidden && y > 400 && down > 72) nextHidden = true;
  else if (hidden && up > 24) nextHidden = false;
  if (nextHidden !== hidden) { down = 0; up = 0; }
  if (nextSolid !== solid || nextHidden !== hidden) { solid = nextSolid; hidden = nextHidden; setState({ solid, hidden }); }
};
const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };  // 1 read per frame
```

**CSS:** `src/app/globals.css`
```css
.site-header { transform: translate3d(0,0,0); will-change: transform;
  transition: transform .45s cubic-bezier(.2,.8,.2,1), background-color .3s ease, color .3s ease, box-shadow .3s ease; }
.site-header[data-hidden="true"] { transform: translate3d(0,-100%,0); transition-duration: .35s, .3s, .3s, .3s; }
.site-header:focus-within { transform: translate3d(0,0,0); }   /* keyboard users never lose the nav */
@media (prefers-reduced-motion: reduce) { .site-header { transition: background-color .2s ease, color .2s ease; } }
```

**Parallax (Motion):**
```ts
const still = reduce || !desktop;                     // desktop ≥ 1024px only
const y = useTransform(scrollYProgress, [0, 1], [0, still ? 0 : -48]);   // ≤ ~60px
```

## Constraints / Do-nots
- Don't change the core intent: fix header visibility, and make parallax minimal and premium.
- Don't add domain facts or requirements beyond those above.
- Don't animate layout properties (`top`, `height`, `margin`) for the header or parallax.
- Don't run parallax on touch or small screens, or when reduced motion is requested.
- Don't use scroll-jacking or smooth-scroll libraries that take over native scrolling.
- Don't hide the header while a menu is open or focus is inside it.

## Examples / References
- None supplied in the draft. [FILL: reference sites or recordings the brand owner admires]

## Execution checklist
- [x] Restate the core issues: header flicker (with root causes) and parallax.
- [x] Define minimal, premium goals: hysteresis-based header, small desktop-only parallax.
- [x] Implement and provide CSS/JS snippets.
- [x] Accessibility: reduced motion, focus-within, no motion on touch.
- [x] Performance: rAF-throttled reads, state updates only on change, transform-only animation.
- [x] Verify with an automated scroll test: before vs after (see below).
- [ ] [FILL: manual test on real iOS Safari and Android Chrome devices]

**Verification (headless Chromium, homepage, the same scripted scroll on both builds):**

| Scenario | Before | After | Expected |
|---|---|---|---|
| Jittery scroll down 6,000 px (small steps with tiny reversals), then up | 1,062 changes | **2** | Hide once, reveal once |
| Finger wobble ±6 px for 400 frames mid-page | 400 | **0** | No change |
| Bouncing between 0 and 380 px near the top | 0 | **0** | No change |

## Conflict resolution
If requirements conflict, prioritise in this order:
1. Constraints / do-nots.
2. Required outputs.
3. Examples / references.
4. Preferences.

Accessibility (reduced motion, keyboard focus) overrides any visual preference for motion.
