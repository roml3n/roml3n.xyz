# Decisions

## 2026-07-17 (5)

The two pole-tier rings (`rowsFromPole <= 1`) compute their own
independently, exactly-evenly-spaced longitude angles
(`(index / keepCount) * 2π`) instead of snapping onto the shared
14-column base grid used by every other ring.

Reason:
An intermediate fix (picking evenly-spaced columns to *keep* from the
shared grid, rather than evenly-spaced columns to *skip*) still snapped
survivors to the base grid's discrete slots. Since 14 doesn't divide
evenly by the pole rows' keep counts (4 and 10), the snapped angles still
alternated between two different gap sizes (e.g. 77°/103° for the
pole-most ring) and visibly clumped. Computing angles directly from the
row's own `keepCount` gives exact, uniform gaps (90° for 4 cards, 36° for
10) at the cost of breaking the shared-longitude-grid/meridian-snap
invariant — but only for these two thin outer rings, which carry too few
cards for meridian alignment to read visually anyway. The other 8 of 10
rings are untouched and still share the base grid.

## 2026-07-17 (4)

`POLE_SCALE` retuned from 0.5x to 0.7x and `NEAR_POLE_SCALE` from 0.75x to
0.8x.

Reason:
With the pole-ring column thinning in place (see decision below), the
lower-density rings no longer needed as aggressive a size cut to avoid
overlap — the smaller drop keeps pole cards closer in size to the rest of
the globe while still relieving crowding.

## 2026-07-17 (3)

The pole-most latitude ring drops 4 extra columns (on top of the existing
grid-fit omission) and the next ring in drops 2 extra columns, via
`POLE_EXTRA_SKIP`/`NEAR_POLE_EXTRA_SKIP` merged into the same
`createSkippedColumns` mechanism `sphereLayout.ts` already used for grid-fit
omissions on the outermost rings.

Reason:
Shrinking pole cards (see decision above) alone still left them touching at
the reduced size; thinning the column count on the same two ring tiers
(scaled down = fewer, more spaced-out cards) relieves the remaining
crowding. Cards keep their shared longitude angles, so the meridian-line
grid snap is unaffected — some duplicate photos simply don't get a slot,
dropping the total rendered cards from 136 to 124.

## 2026-07-17 (2)

The pole-most latitude ring is scaled to 0.5x and the next ring in to 0.75x,
via a `poleScale` field on each `SpherePoint` (`sphereLayout.ts`) multiplied
into `GlobeCard`'s existing depth-based scale through `PhotoGlobe.tsx`'s
`scale` field (previously hardcoded to `1`).

Reason:
Cards near the poles sit on rings with much smaller circumference, so at
uniform size they visually overlap. Shrinking only the outermost two rings
(rather than a continuous pole-distance falloff) relieves crowding while
keeping every card on its original latitude/longitude grid coordinate.

## 2026-07-17

Drag-to-spin uses raw pointer delta applied 1:1 (scaled by a
`DRAG_SENSITIVITY` of 0.35) directly to rotation during an active drag,
instead of easing drag input through the existing `FOLLOW` damping.

Reason:
Damping drag input made the globe feel laggy under the pointer during the
reference interaction; only released momentum should feel damped, not the
drag itself.

---

Drag and momentum tracking listens on `window` via Pointer Events
(`pointerdown/move/up/cancel`), same as the pre-existing parallax
`pointermove` listener, rather than scoping to the globe container element.

Reason:
Keeps the change fully isolated to `useGlobeRotation.ts` per the task scope
constraint — no ref needs to be threaded through `PhotoGlobe.tsx`. The globe
is the dominant interactive surface on the page, so window-wide drag start is
an acceptable trade-off.

---

On release, per-frame drag velocity (the last frame's delta, not an average)
decays every frame via `MOMENTUM_FRICTION` (0.95) until it drops below
`MOMENTUM_STOP_THRESHOLD` (0.01), then idle auto-rotation resumes by easing
`velocity.y` from its last momentum value toward `IDLE_SPEED` via
`IDLE_RESUME_BLEND` (0.04, replacing the previous unnamed 0.05 magic
number in the same spot).

Reason:
Reusing the existing Y-velocity easing as the idle-resume blend means
momentum hands off into idle spin without a second, separate interpolation
step, avoiding a visible seam at the moment momentum ends.

---

A capture-phase `click` listener on `window` inside `useGlobeRotation.ts`
calls `stopPropagation()`/`preventDefault()` on the next click if the
preceding drag moved more than `CLICK_SUPPRESS_DISTANCE` (4px), instead of
returning an `isDragging` flag for `GlobeCard.tsx` to consume.

Reason:
Keeps the drag/click-conflict fix entirely inside `useGlobeRotation.ts`
(scope constraint) rather than adding a new prop that `PhotoGlobe.tsx` and
`GlobeCard.tsx` would need to thread through and gate `onClick` on.

## 2026-07-16

Renderer uses CSS 3D.

Reason:
Avoid Three.js dependency.

---

Cards use a 72px photo surface with an 8px exterior white outline.

Reason:
The denser globe needs clearer space between cards, while an exterior outline
creates a stronger Polaroid mat without reducing the visible image area.

---

Card-local depth scale ranges from 0.82 to 0.94.

Reason:
CSS perspective still supplies spatial depth, while the narrower local range
keeps background cards visually consistent instead of making them too small.

---

The exterior white outline has a 1px black-10 contrast ring.

Reason:
The extra edge keeps white Polaroid frames visible against the white page
background without changing their size or color.

---

Opacity never changes based on depth.

Reason:
Back cards bleeding through looked incorrect.

---

Stable depth sorting is preferred over hiding rear cards.

Reason:
Entire globe should remain visible.

---

FLIP animation will use manual getBoundingClientRect().

Reason:
layoutId does not behave reliably with nested 3D transforms.

---

Source photos repeat eight times with distinct stable IDs.

Reason:
136 deterministic placements create a dense spherical surface while keeping
each card anchored to its own latitude/longitude point.

---

Cards use ten latitude bands with fourteen shared longitude angles.

Reason:
Shared angles restore clean meridian lines. The top and bottom bands each skip
two fixed angles, reducing pole crowding without changing the remaining grid.

---

Cards have no per-photo roll and use their true rotated surface angles.

Reason:
Photo ID-based rotation made the surface look scattered. Grid positions and
outward-facing normals now determine every card's orientation.

---

Cards use an 8px exterior Polaroid frame with a 0.94 maximum local scale.

Reason:
The reference keeps close cards slightly restrained while giving each photo a
more visible white mat.

---

Card tilt is derived from each point's rotated sphere coordinates.

Reason:
Front cards remain straight while edge cards foreshorten with the globe,
without replacing the existing CSS projection and depth-sorting renderer.

---

Cards use CSS translate3d for their rotated sphere coordinates.

Reason:
Manual 2D projection flattened the card surface into a ring. Letting the
existing CSS perspective camera project x, y, and z keeps cards positioned on
the globe while the stable depth sort prevents stacking artifacts.

---

Camera distance is 770px for a 315px sphere radius.

Reason:
The proportional reduction keeps the same front-to-rear foreshortening while
giving the packed globe more space in the page layout.
