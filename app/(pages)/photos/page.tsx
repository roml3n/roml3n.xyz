"use client";
import React, { lazy } from "react";
import { LazyWrapper } from "@/app/components/LazyWrapper";

// Lazy load the Photo component - keep original name
const Photo = lazy(() =>
  import("@/app/components/Photo").then((module) => ({
    default: module.Photo,
  })),
);

const photos = [
  { imageSrc: "/images/(photosPage)/photo_1.jpg" },
  { imageSrc: "/images/(photosPage)/photo_2.jpg" },
  { imageSrc: "/images/(photosPage)/photo_3.jpg" },
  { imageSrc: "/images/(photosPage)/photo_4.jpg" },
  { imageSrc: "/images/(photosPage)/photo_5.jpg" },
  { imageSrc: "/images/(photosPage)/photo_6.jpg" },
  { imageSrc: "/images/(photosPage)/photo_7.jpg" },
  { imageSrc: "/images/(photosPage)/photo_8.jpg" },
  { imageSrc: "/images/(photosPage)/photo_9.jpg" },
  { imageSrc: "/images/(photosPage)/photo_10.jpg" },
  { imageSrc: "/images/(photosPage)/photo_11.jpg" },
  { imageSrc: "/images/(photosPage)/photo_12.jpg" },
  { imageSrc: "/images/(photosPage)/photo_13.jpg" },
  { imageSrc: "/images/(photosPage)/photo_14.jpg" },
  { imageSrc: "/images/(photosPage)/photo_15.jpg" },
  { imageSrc: "/images/(photosPage)/photo_16.jpg" },
  { imageSrc: "/images/(photosPage)/photo_17.jpg" },
];

const Photos = () => {
  return (
    <section className="content-start w-full min-h-[calc(100dvh-20rem)] md:min-h-[calc(100dvh-23rem)] mt-24 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 grid-rows-auto gap-x-4 md:gap-x-6 gap-y-9 md:gap-y-16 relative justify-center self-center">
      <div className="row-span-1 col-span-2 flex flex-col gap-1">
        <h2 className="h2"> Photos </h2>
        <h2 className="h2 opacity-40"> [{photos.length}] </h2>
      </div>

      <div className="row-start-2 col-span-4 md:col-span-8 lg:col-span-12 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {photos.map((photo, index) => (
          <LazyWrapper key={index}>
            <Photo imageSrc={photo.imageSrc} alt="Photo" />
          </LazyWrapper>
        ))}
      </div>
    </section>
  );
};

export default Photos;
