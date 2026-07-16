# Decisions

## 2026-07-16

Renderer uses CSS 3D.

Reason:
Avoid Three.js dependency.

---

Cards remain 104px.

Reason:
Closer to reference.

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