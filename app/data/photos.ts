export interface PhotoMeta {
  camera?: string;
  focalLength?: string;
  location?: string;
  aperture?: string;
  date?: string;
  shutter?: string;
  note?: string;
  signature?: string;
}

interface SourcePhoto {
  alt?: string;
  id: string;
  imageSrc: string;
  meta?: PhotoMeta;
}

const sourcePhotos: readonly SourcePhoto[] = [
  { id: "photo-1", imageSrc: "/images/(photosPage)/photo_1.jpg" },
  { id: "photo-2",
    imageSrc: "/images/(photosPage)/photo_2.jpg" },
  { id: "photo-3",
    imageSrc: "/images/(photosPage)/photo_3.jpg" },
  { id: "photo-4",
    imageSrc: "/images/(photosPage)/photo_4.jpg" },
  { id: "photo-5",
    imageSrc: "/images/(photosPage)/photo_5.jpg" },
  { id: "photo-6",
    imageSrc: "/images/(photosPage)/photo_6.jpg" },
  { id: "photo-7",
    imageSrc: "/images/(photosPage)/photo_7.jpg" },
    { id: "photo-8",
    imageSrc: "/images/(photosPage)/photo_8.jpg" },
  { id: "photo-9",
    imageSrc: "/images/(photosPage)/photo_9.jpg" },
  { id: "photo-10",
    imageSrc: "/images/(photosPage)/photo_10.jpg" },
  { id: "photo-11",
    imageSrc: "/images/(photosPage)/photo_11.jpg" },
  { id: "photo-12",
    imageSrc: "/images/(photosPage)/photo_12.jpg" },
  { id: "photo-13",
    imageSrc: "/images/(photosPage)/photo_13.jpg" },
  { id: "photo-14",
    imageSrc: "/images/(photosPage)/photo_14.jpg" },
  { id: "photo-15",
    imageSrc: "/images/(photosPage)/photo_15.jpg" },
  { id: "photo-16",
    imageSrc: "/images/(photosPage)/photo_16.jpg" },
  { id: "photo-17",
    imageSrc: "/images/(photosPage)/photo_17.jpg" },
];

// The globe's sphere grid wants enough cards to fill every lat/long
// slot, so each real photo is repeated a few times to pad it out.
// This is purely a display-density trick — it must never affect the
// real photo count shown elsewhere on the site.
const MIN_GLOBE_CARDS = 120;

const PHOTO_REPEAT_COUNT = Math.max(
  1,
  Math.ceil(MIN_GLOBE_CARDS / sourcePhotos.length),
);

export const PHOTO_COUNT = sourcePhotos.length;

export const photos = Array.from(
  { length: PHOTO_REPEAT_COUNT },
  (_, copyIndex) =>
    sourcePhotos.map((photo) => ({
      ...photo,
      id: `${photo.id}-copy-${copyIndex + 1}`,
    })),
).flat();
