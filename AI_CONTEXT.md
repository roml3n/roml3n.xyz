# roml3n.xyz

## Overview

This is my personal portfolio website built with:

- Next.js (App Router)
- TypeScript
- TailwindCSS
- Framer Motion

The goal of this project is to create a premium feeling portfolio with tasteful motion design. Every interaction should feel intentional.

The current task is rebuilding the `/photos` page into an interactive rotating 3D photo globe.

---

# Design Goal

The gallery should NOT feel like a normal image grid.

It should feel like an object floating in space.

Think:

- Apple
- Linear
- Stripe
- Arc Browser

Motion should be subtle.

Nothing should feel gimmicky.

The globe should look expensive.

---

# Inspiration

(I'm attaching a reference video.)

Use the attached video as the visual source of truth.

The implementation does NOT need to be identical.

It should capture the same feeling.

Important characteristics:

- floating globe
- smooth idle rotation
- slight pointer influence
- square white photo cards
- premium easing
- one photo expands from the globe into the center
- clicking outside returns it back into the globe
- blurred backdrop
- clean motion

---

# Constraints

DO NOT introduce:

- Three.js
- React Three Fiber
- @react-three/*
- GSAP
- new animation libraries

The project already contains Framer Motion.

Stay with:

- CSS transforms
- CSS perspective
- Framer Motion

No additional dependencies.

---

# Architecture Rules

These rules are NOT optional.

The current architecture is frozen.

Do NOT redesign it.

Do NOT rewrite components just because another solution exists.

Only modify files necessary for the current milestone.

Avoid large refactors.

Build incrementally.

---

# Current Component Structure

PhotoGlobe/

- PhotoGlobe.tsx
- GlobeCard.tsx
- sphereLayout.ts
- useGlobeRotation.ts

This structure should remain.

If additional components are needed, add them rather than replacing existing ones.

---

# Current Progress

Completed:

✅ Fibonacci sphere layout

✅ Stable IDs

✅ Sphere point generation

✅ Smooth idle rotation

✅ Pointer influence

✅ Perspective projection

✅ Stable depth sorting

✅ Hover interaction

✅ Click-ready GlobeCard component

Renderer is considered complete.

Do not redesign the rendering system unless there is an actual bug.

---

# Remaining Roadmap

Complete these milestones IN ORDER.

Do not skip ahead.

## Phase 1

Selected photo state

PhotoGlobe owns

selectedPhoto

Clicking a GlobeCard should only update state.

No overlay yet.

---

## Phase 2

Portal overlay

Create

PhotoGlobeOverlay.tsx

Render into

document.body

using

createPortal()

---

## Phase 3

FLIP animation

When a card is clicked:

Measure

getBoundingClientRect()

Animate

card

↓

center overlay

When closing:

Measure original position again

Animate

center

↓

globe

Do NOT use layoutId.

Use manual FLIP.

---

## Phase 4

Backdrop

Animate

opacity

backdrop blur

body scroll locking

Escape key

outside click

---

## Phase 5

Interaction polish

Hover lift

Shadow increase

Cursor

Touch support

Reduced motion

Keyboard accessibility

---

# Animation Guidelines

Everything should feel soft.

Avoid snappy animations.

Preferred easing:

ease: [0.16,1,0.3,1]

Animation duration

~450ms

Nothing should bounce aggressively.

---

# Visual Rules

Cards

- white border
- square
- object-cover
- subtle shadow

Keep cards fully opaque.

Never fade cards because they're on the back side.

Avoid visual clutter.

---

# Debugging Rules

If something appears visually wrong:

DO NOT rewrite the renderer.

First verify:

- perspective values
- z sorting
- transforms
- sphere radius
- projection math

Only modify constants before modifying architecture.

---

# Coding Rules

TypeScript

No any.

Keep files small.

Avoid unnecessary abstractions.

Avoid deeply nested components.

Comment only where necessary.

---

# Working Style

Act like a senior frontend engineer joining an existing project.

Do not continuously rethink architecture.

Do not replace working code.

Do not rewrite files that are unrelated.

Implement ONE milestone at a time.

Wait until that milestone works before continuing.

If changes are required in multiple files:

Finish one file completely before moving to the next.

---

# Goal

By the end of this task the photo page should have:

- rotating globe
- premium motion
- click to expand
- blurred backdrop
- smooth return animation
- fully responsive
- accessible
- no additional dependencies

The final experience should feel polished rather than flashy.