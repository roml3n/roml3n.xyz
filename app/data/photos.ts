const sourcePhotos = [
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
] as const;

const PHOTO_REPEAT_COUNT = 8;

export const photos = Array.from(
  { length: PHOTO_REPEAT_COUNT },
  (_, copyIndex) =>
    sourcePhotos.map((photo) => ({
      ...photo,
      id: `${photo.id}-copy-${copyIndex + 1}`,
    })),
).flat();
