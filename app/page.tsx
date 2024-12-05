"use client";
import React from "react";
import "./globals.css";

import { Hero } from "./sections/home/hero";
import { ProjectsSection } from "./sections/home/ProjectsSection";
import { ToolStackSection } from "./sections/home/ToolStackSection";
import Footer from "@/app/components/Footer";

function App() {
  return (
    <section className="m-auto items-center w-full max-w-5xl">
      {" "}
      {/* Wrapper */}
      <div className="flex flex-col items-center relative">
        <main className="flex flex-col w-full">
          <Hero />
          <ProjectsSection />
          <ToolStackSection />
        </main>
       <Footer />
      </div>
    </section>
  );
}

export default App;
