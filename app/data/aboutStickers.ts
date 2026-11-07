export const ABOUT_STICKER_FIELD_ASPECT = 508.288 / 201.26;

export type AboutStickerId =
  | "vercel"
  | "apple"
  | "figma"
  | "cursor"
  | "raycast"
  | "copper";

export type StickerInsetBleed = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export type AboutStickerDef = {
  id: AboutStickerId;
  label: string;
  /** Slot inside the 508.288 × 201.26 sticker field (Figma node `1498:6858`). */
  inset: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  bleed: StickerInsetBleed;
  kind: "image" | "raycast";
  src?: string;
  innerRotateDeg?: number;
  /** Asset already includes drop shadow (avoid double filter on drag). */
  builtInShadow?: boolean;
};

export const insetToRect = (inset: AboutStickerDef["inset"]) => ({
  leftPct: inset.left,
  topPct: inset.top,
  widthPct: 100 - inset.left - inset.right,
  heightPct: 100 - inset.top - inset.bottom,
});

/** Default layout from Figma `1498:6858`. */
export const aboutStickerDefs: AboutStickerDef[] = [
  {
    id: "vercel",
    label: "Vercel",
    kind: "image",
    src: "/images/about/stickers/sticker-vercel.svg",
    inset: { top: 19.78, right: 79.16, bottom: 26.42, left: 1.92 },
    bleed: { top: -2.77, right: -4.16, bottom: -4.62, left: -4.16 },
  },
  {
    id: "apple",
    label: "Apple",
    kind: "image",
    src: "/images/about/stickers/sticker-apple.svg",
    inset: { top: 66.53, right: 60.48, bottom: 1.29, left: 28.88 },
    bleed: { top: -4.5, right: -6.66, bottom: -7.72, left: -7.4 },
  },
  {
    id: "figma",
    label: "Figma",
    kind: "image",
    src: "/images/about/stickers/sticker-figma.svg",
    inset: { top: 0.68, right: 42.26, bottom: 26.26, left: 31.84 },
    bleed: { top: 0, right: 0, bottom: 0, left: 0 },
    builtInShadow: true,
  },
  {
    id: "cursor",
    label: "Cursor",
    kind: "image",
    src: "/images/about/stickers/sticker-cursor.svg",
    inset: {
      top: (121.75 / 201.26) * 100,
      left: (289.2 / 508.288) * 100,
      right: 100 - (289.2 / 508.288) * 100 - (79.511 / 508.288) * 100,
      bottom: 100 - (121.75 / 201.26) * 100 - (79.511 / 201.26) * 100,
    },
    bleed: { top: -2.73, right: -3.99, bottom: -5.25, left: -3.99 },
  },
  {
    id: "raycast",
    label: "Raycast",
    kind: "raycast",
    src: "/images/about/stickers/sticker-raycast.svg",
    inset: {
      top: (46.93 / 201.26) * 100,
      left: (347.64 / 508.288) * 100,
      right: 100 - (347.64 / 508.288) * 100 - (79.081 / 508.288) * 100,
      bottom: 100 - (46.93 / 201.26) * 100 - (77.938 / 201.26) * 100,
    },
    bleed: { top: -4.55, right: -5.93, bottom: -7.58, left: -5.93 },
    innerRotateDeg: -11.35,
  },
  {
    id: "copper",
    label: "Copper",
    kind: "image",
    src: "/images/about/stickers/sticker-copper.svg",
    inset: { top: 0, right: 3.98, bottom: 73.7, left: 85.64 },
    bleed: { top: -5.59, right: -7.37, bottom: -8.95, left: -7.38 },
  },
];
