"use client";
import React from "react";
import Footer from "../components/Footer";
import PhotoGrid from "../components/PhotoGrid";

const Photos = () => {
  return (
    <section className="m-auto items-center w-full gap-16">
      <main className="flex flex-col mt-10 md:mt-24 gap-16 items-center relative">
        <h1 className="h1 w-full">Photos</h1>

        <div className="w-screen px-2 sm:px-3 lg:px-[2%] flex flex-col">
          <PhotoGrid />
        </div>

      </main>

      <Footer />
    </section>
  );
};

export default Photos;
