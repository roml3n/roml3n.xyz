"use client";
import React from "react";
import Footer from "@/app/components/Footer";
import Masonry from "react-masonry-css";
import { Photo } from "@/app/components/ui/Photo"; //fix this

const photos = [
  { imageSrc: "/images/home/stackIcons/Arc.png", alt: "Arc Browser Icon" },
  { imageSrc: "/images/home/stackIcons/Figma.png", alt: "Figma Icon" },
  { imageSrc: "/images/home/stackIcons/Framer.png", alt: "Framer Icon" },
  {
    imageSrc: "/images/home/stackIcons/Illustrator.png",
    alt: "Illustrator Icon",
  },
  { imageSrc: "/images/home/stackIcons/Notion.png", alt: "Notion Icon" },
  { imageSrc: "/images/home/stackIcons/Photoshop.png", alt: "Photoshop Icon" },
  { imageSrc: "/images/home/stackIcons/Protopie.png", alt: "Protopie Icon" },
  { imageSrc: "/images/home/stackIcons/Raycast.png", alt: "Raycast Icon" },
  { imageSrc: "/images/home/stackIcons/Spotify.png", alt: "Spotify Icon" },
  { imageSrc: "/images/home/stackIcons/Todoist.png", alt: "Todoist Icon" },
];

const MasonryGrid = () => {
  // Define the breakpoints for the masonry layout
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (

    <section className="m-auto items-center w-full gap-16">
    <main className="flex flex-col mt-10 md:mt-24 gap-16 items-center relative">
      <div>
        <h1 className="h1">Experiments</h1>
        <p className="h4 w-full">
          I&apos;m a tinkerer, I like experimenting here and there, whether
          it&apos;s with design, code, generative AI or (every once in a
          while) actual physical products. Here are some results of these
          experiments.
        </p>
      </div>
      
      <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {photos.map((photo, index) => (
        <Photo key={index} imageSrc={photo.imageSrc} alt={photo.alt} />
      ))}
    </Masonry>
    </main>
    <Footer />
  </section>

    
  );
};

export default MasonryGrid;

