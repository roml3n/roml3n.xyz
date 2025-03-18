"use client";
import React from "react";
import Footer from "@/app/components/Footer";
import { Photo } from "@/app/components/ui/Photo";

const photos = [
  { imageSrc: "/images/home/stackIcons/Arc.png" },
  { imageSrc: "/images/home/stackIcons/Figma.png" },
  { imageSrc: "/images/home/stackIcons/Framer.png" },
  { imageSrc: "/images/home/stackIcons/Illustrator.png" },
  { imageSrc: "/images/home/stackIcons/Notion.png" },
  { imageSrc: "/images/home/stackIcons/Photoshop.png" },
  { imageSrc: "/images/home/stackIcons/Protopie.png" },
  { imageSrc: "/images/home/stackIcons/Raycast.png" },
  { imageSrc: "/images/home/stackIcons/Spotify.png" },
  { imageSrc: "/images/home/stackIcons/Todoist.png" },
];

const Photos = () => {
  return (
    <section className="m-auto items-center w-full gap-16">
      <main className="flex flex-col mt-10 md:mt-24 gap-16 items-center relative">
        <h1 className="h1 w-full">Photos</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 w-screen px-2 sm:px-3 lg:px-[2%]">
          {photos.map((photo, index) => (
            <Photo key={index} imageSrc={photo.imageSrc} alt="Photo" />
          ))}
        </div>
      </main>

      <Footer />
    </section>
  );
};

export default Photos;
