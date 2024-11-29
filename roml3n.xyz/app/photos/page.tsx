"use client";
import React from "react";
import Header from "@/app/components/Header.jsx";
import DockSection from "@/app/sections/home/DockSection";
import Footer from "../components/Footer";
import PhotoGrid from "../components/PhotoGrid";

const Photos = () => {
  return (
    <section className="m-auto items-center w-[80%] max-w-5xl gap-16">
      <Header />
      <main className="flex flex-col mt-24 gap-16 items-center relative">
        <h1 className="h1 w-full">Photos</h1>

        <div className="w-screen px-2 sm:px-3 lg:px-[2%] flex flex-col">
          <PhotoGrid />
        </div>

        <DockSection className="flex justify-center w-fit" />
      </main>

      <Footer />
    </section>
  );
};

export default Photos;
