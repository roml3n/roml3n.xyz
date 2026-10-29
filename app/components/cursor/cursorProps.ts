export const CURSOR_LABELS = [
  "view case study",
  "view overview",
  "coming soon",
] as const;

export type CursorLabel = (typeof CURSOR_LABELS)[number];

export const companyCursorImages: Record<string, readonly string[]> = {
  "Value Chain Factory": ["/images/hero/value-chain-factory.png"],
  "Pawa IT Solutions": [
    "/images/work/pawa-website/pawa-hero.webp",
    "/images/work/bigstore/bigstore-hero-red.webp",
  ],
  PawaIT: [
    "/images/work/pawa-website/pawa-hero.webp",
    "/images/work/bigstore/bigstore-hero-red.webp",
  ],
  "The CB Group, Waya": [
    "/images/work/waya-ssn/waya-ssn-hero.webp",
    "/images/work/tucheze/tucheze-hero.webp",
  ],
  Waya: [
    "/images/work/waya-ssn/waya-ssn-hero.webp",
    "/images/work/waya-business-cover.webp",
  ],
  "The CB Group": ["/images/work/tucheze/tucheze-hero.webp"],
};

export const cursorCompanyProps = (company: string) => {
  const images = companyCursorImages[company] ?? [];

  return {
    "data-cursor": "company",
    "data-cursor-images": images.join(","),
  };
};

export const cursorLabelProps = (label: CursorLabel) => {
  return {
    "data-cursor": "label",
    "data-cursor-label": label,
  };
};

export const cursorTextProps = () => {
  return {
    "data-cursor": "text",
  };
};

export const cursorNativeProps = () => {
  return {
    "data-cursor": "native",
  };
};
