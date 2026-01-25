"use client";
import React from "react";
import "./globals.css";

import { Hero } from "./(sections)/hero";
import { AboutSection } from "./(sections)/AboutSection";
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
        <WorkSection />
        <AboutSection />
      </main>
      <Footer />
    </section>
  );
}

export default App;
