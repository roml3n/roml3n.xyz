"use client";
import React from "react";
import "./globals.css";

import { Hero } from "./(sections)/hero";
import { ToolStackSection } from "./(sections)/ToolStackSection";
import WorkSection from "./(sections)/WorkSection";
import Footer from "@/app/components/Footer";
import ButtonLink from "@/app/components/ButtonLink";

function App() {
  return (
    <section className="w-full flex flex-col items-center relative">
      {" "}
      {/* Wrapper */}
      <main className="flex flex-col items-center w-full">
        <Hero />

        {/* Project Section */}
        <div className=" w-full mt-16 max-w-5xl flex flex-col gap-4 md:gap-6">
          <div className="w-full flex flex-col md:flex-row justify-between items-center py-0 md:py-4">
            <h2 className="h2 pb-3 md:pb-0"> Featured Projects </h2>
            <ButtonLink Label="view all projects" URL="/work" />
          </div>
          <WorkSection />
        </div>

        <ToolStackSection />
      </main>
      <Footer />
    </section>
  );
}

export default App;
