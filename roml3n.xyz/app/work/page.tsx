"use client";
import React from "react";
import Footer from "../components/Footer";
import { WorkCard } from "../components/WorkCard";

const Photos = () => {
  return (
    <section className="m-auto items-center w-full gap-16">
      <main className="flex flex-col mt-24 gap-16 items-center">
        <h1 className="h1 w-full">Work</h1>

        <div
          id="sticky-container"
          className="w-full max-w-[1274px] flex flex-col gap-4 sticky top-[-150px]"
        >
          <WorkCard title="Uno" index={0} />
          <WorkCard title="Dos" index={1} />
          <WorkCard title="Tres" index={2} />
          <WorkCard title="Quatro" index={3} />{" "}
        </div>
      </main>

      <Footer />
    </section>
  );
};

export default Photos;
