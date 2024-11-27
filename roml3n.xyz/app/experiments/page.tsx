"use client";
import React from "react";
import Header from "@/app/components/Header.jsx";
import DockSection from "@/app/sections/home/DockSection";
import Footer from "../components/Footer";

const experiments = () => {
  return (
    <section className="m-auto items-center w-[80%] max-w-5xl gap-16">
      <Header />
      <main className="flex flex-col mt-24 gap-16 items-center relative">
        <div>
          <h1 className="h1">Experiments</h1>
          <p className="h4 w-full">
            I’m a tinkerer, I like experimenting here and there, whether it’s
            with design, code, generative AI or (every once in a while) actual
            physical products. Here are some results of these experiments.
          </p>
        </div>
        <DockSection className="flex justify-center w-fit" />
      </main>
      <Footer />
    </section>
  );
};

export default experiments;
