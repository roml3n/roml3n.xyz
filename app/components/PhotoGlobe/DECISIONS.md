# Decisions

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
