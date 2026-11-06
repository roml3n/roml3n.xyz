# Featured work & `/work` index — design

**Date:** 2025-11-07  
**Status:** Approved for implementation (pending written spec review)

## Context

The homepage `WorkSection` currently renders every entry from `app/data/workProjects.ts` with a “Work” heading and total count. Individual case studies live under `app/(pages)/work/<slug>/`. `sitemap.ts` already lists `/work`, but there is no `app/(pages)/work/page.tsx`. Header “Work” and `MoreProjectsSection` point at `/#work`.

## Goals

1. Homepage: a **Featured work** block with **at most four** cards in a **single grid**, plus **View all work** on the **right** (same row as the section title).
2. A dedicated **`/work`** page listing **all** portfolio entries from `workProjects`.
3. Data-driven **featured** flag (recommended: boolean per project; cap four via convention + dev guard).
4. Softer **hover background** on work cards (`WorkCard`).

## Non-goals

- Separate “Case studies” vs “Projects” groupings on the homepage (explicitly one grid).
- CMS or runtime authoring of featured items (keep editing `workProjects.ts`).
- Changing individual case study page layout or `MoreProjectsSection` card logic beyond the “Explore all projects” URL.

## Data model

Extend each object in `workProjects` with:

```ts
featured: boolean;
```

- **Homepage grid:** `workProjects.filter((p) => p.featured).slice(0, 4)`, rendered in **array order** among featured items.
- **Enforcement:** At most four projects have `featured: true`. Use a **development-only** assertion (or clear comment + lint/test) so adding a fifth surfaces immediately during dev.
- **Ordering:** Order of featured cards = order of featured entries in the `workProjects` array (same as approach A in the brainstorm).

Optional later (not in initial build): `featuredOrder` if homepage order must differ from file order — **omit until needed**.

## Homepage — Featured work (`WorkSection`)

- Section `id`: Prefer **`featured-work`** for clarity; if changed from `work`, update any remaining `/#work` references to `/#featured-work` or remove hash usage where nav goes to `/work`. (Header will target `/work`; verify no stray `/#work` after implementation.)
- **Header row:** Left — title **“Featured work”** and a bracket count of **featured** items only (e.g. `[04]` when four featured), not total portfolio size.
- **Right:** **View all work** link to `/work` (use existing `TransitionLink` / typography patterns from the site).
- **Grid:** Reuse `WorkCard` + existing grid conventions; only the data source is filtered featured items (max four).

## `/work` page

- Add `app/(pages)/work/page.tsx`.
- Title: **Work** (or match site heading hierarchy).
- List **all** `workProjects` in **file order** (same card grid as today’s full homepage block).
- Ensure metadata (title/description) is sensible for SEO; align with other top-level routes.

## Navigation & deep links

- **`app/components/Header.jsx`:** Change Work `href` from `/#work` to `/work` for desktop and mobile items.
- **Active state:** `isDesktopActive("work")` should treat **Work** as active on `/work` and `/work/*`, **not** on `/` alone (homepage is not the work index).
- **`app/(pages)/work/MoreProjectsSection.tsx`:** Change “Explore all projects” from `/#work` to `/work`.

## Work card hover

- In `app/components/WorkCard.tsx`, reduce hover panel strength, e.g. `bg-mainblue/20` → approximately **`bg-mainblue/12–15`**; finalize by eye in the browser.
- Follow-up polish (optional): replace `transition-all` with explicit properties (`transform`, `opacity`, `background-color`) per animation guidelines.

## Edge cases

- **1–3 featured:** Show only those cards; no placeholders.
- **0 featured:** Show **no cards**, keep the section heading row and **View all work**, and show count **`[00]`** so the layout stays predictable during content setup.

## Files touched (implementation checklist)

- `app/data/workProjects.ts` — `featured` field + dev guard.
- `app/WorkSection.tsx` — heading, count, CTA, featured-only grid.
- `app/(pages)/work/page.tsx` — new full list.
- `app/components/Header.jsx` — `/work` href, active logic.
- `app/(pages)/work/MoreProjectsSection.tsx` — CTA URL.
- `app/components/WorkCard.tsx` — hover opacity.
- Grep for `/#work` and `id="work"` — align with final section id choice.

## Testing (manual)

- Homepage: at most four featured cards; title + “View all work” alignment matches design.
- `/work`: all projects visible, order matches data.
- Header: Work navigates to `/work`; active state on `/work` and case study routes, not on `/`.
- Case study footer: “Explore all projects” → `/work`.
- Card hover: visibly softer than before; keyboard/focus if applicable.
