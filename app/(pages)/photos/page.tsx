"use client";
import React, { lazy } from "react";
import Footer from "@/app/components/Footer";
import { LazyWrapper } from "@/app/components/LazyWrapper";

// Lazy load the Photo component - keep original name
const Photo = lazy(() => import("@/app/components/ui/Photo").then(module => ({ default: module.Photo })));

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
    <section className="m-auto items-center w-full gap-16">
      <main className="flex flex-col mt-10 md:mt-24 gap-16 items-center relative">
        <div className="flex flex-col gap-8">
          <h1 className="h1 w-full">Photos</h1>
          <p className="w-full h4">
            Every now and then there are moments in which I step behind (or in
            front of) some sort of camera, a DSLR, mirrorless, film, or the most
            popular one–the smartphone. These are some results of those moments.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 w-screen px-2 sm:px-3 lg:px-[2%]">
          {photos.map((photo, index) => (
            <LazyWrapper key={index}>
              <Photo imageSrc={photo.imageSrc} alt="Photo" />
            </LazyWrapper>
          ))}
        </div>
      </main>

      <Footer />
    </section>
  );
};

export default Photos;
