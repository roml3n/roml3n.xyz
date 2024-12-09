"use client";
import React from "react";
import Footer from "@/app/components/Footer";

import ProjectInfo from '@/app/sections/work/bigstore/projectInfo';
import Hero from '@/app/sections/work/bigstore/Hero';

const BigStore = () => {
  return (
    <section className="m-auto items-center w-full gap-16">
      <main className="flex flex-col mt-24 items-center">
        <Hero />

        {/* Case Section */}
        <section className="relative flex flex-col gap-6 w-screen bg-fullwhite py-12 items-center justify-center">
          {/* 80% Wrapper */}
          <div className="`wrapper` w-[80%] max-w-screen-lg mx-auto">
            <ProjectInfo />


          </div>
        </section>
      </main>

      <Footer />
    </section>
  );
};

export default BigStore;
