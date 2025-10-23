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
    <section className="m-auto items-center w-full max-w-5xl">
      {" "}
      {/* Wrapper */}
      <div className="flex flex-col items-center relative">
        <main className="flex flex-col w-full">
          <Hero />

          {/* Project Section */}
          <div className="mt-16 flex flex-col gap-4 md:gap-6">
            <div className="w-full flex flex-col md:flex-row justify-between items-center py-0 md:py-4">
              <h2 className="h2 pb-3 md:pb-0"> Featured Projects </h2>
              <ButtonLink Label="view all projects" URL="/work" />
            </div>
            <WorkSection />
          </div>

          <ToolStackSection />
        </main>
        <Footer />
      </div>
    </section>
  );
}

export default App;
