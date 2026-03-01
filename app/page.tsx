"use client";
import React from "react";
import "./globals.css";

import { Hero } from "./hero";
import { AboutSection } from "./AboutSection";
import WorkSection from "./WorkSection";
import Footer from "@/app/components/Footer";
import ButtonLink from "@/app/components/ButtonLink";

function App() {
  return (
    <section className="w-full flex flex-col items-center relative">
      {" "}
      {/* Wrapper */}
      <main className="flex flex-col items-center w-full">
        <Hero />
        <WorkSection />
        <AboutSection />
      </main>
    </section>

    // To-do
    // [ ] design and build hero section on landing page
    // [ ] design footer
  );
}

export default App;
