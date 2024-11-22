"use client";
import React from "react";
import "./globals.css";
import Header from "./components/Header.jsx";
import { Hero } from "./sections/home/hero";
import { ProjectsSection } from "./sections/home/ProjectsSection";
import { ToolStackSection } from "./sections/home/ToolStackSection";
import DockSection from "./sections/home/DockSection";

function App() {
  return (
    <section className="m-auto items-center w-[80%] max-w-5xl">
      {" "}
      {/* Wrapper */}
      <div className="flex flex-col items-center relative">
        <Header />
        <main className="flex flex-col w-full">
          <Hero />
          <ProjectsSection />
          <ToolStackSection />
        </main>
        <DockSection className="flex justify-center w-fit" />{" "}
        {/* Floating Dock */}
      </div>
    </section>
  );
}

export default App;
