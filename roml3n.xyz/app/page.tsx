"use client";
import React, { useState, useRef } from "react";
import "./globals.css";
import Header from "./components/Header.jsx";
import { Hero } from "./sections/home/hero";
import { ProjectCard } from "./components/ProjectCard";

function App() {
  const scrollRef = useRef(null);
  const [scrollState, setScrollState] = useState({
    atStart: true,
    atEnd: false,
  });

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

    setScrollState({
      atStart: scrollLeft === 0,
      atEnd: scrollLeft + clientWidth >= scrollWidth,
    });
  };

  return (
    // Wrapper
    <section className="m-auto items-center w-[80%] max-w-5xl">
      <div className="flex flex-col items-center relative">
        <Header />
        <main className="flex flex-col w-full overflow-x-visible">
          <Hero />

          {/* Scrollable project cards */}
          <div className="relative self-center w-[110%] flex flex-col">
            {/* Left Gradient */}
            {!scrollState.atStart && (
              <div className="absolute left-0 top-0 h-full w-[20%] bg-gradient-to-r from-lightgrey to-transparent pointer-events-none z-10"></div>
            )}

            {/* Scrollable Container */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex self-center w-[100%] gap-4 overflow-x-auto scrollbar-hide px-4"
            >
              <ProjectCard
                description="Bigstore"
                imageSrc="/images/projectCard/waya-screen.png"
              />

              <ProjectCard
                description="Crafting a high-stakes experience for sports betting enthusiasts"
                imageSrc="/images/projectCard/tucheze-screen.png"
              />

              <ProjectCard
                description="Enhancing financial inclusion for new Americans and immigrants"
                imageSrc="/images/projectCard/waya-screen.png"
              />

              <ProjectCard
                description="Stockpicha"
                imageSrc="/images/projectCard/tucheze-screen.png"
              />
            </div>

            {/* Right Gradient */}
            {!scrollState.atEnd && (
              <div className="absolute right-0 top-0 h-full w-[20%] bg-gradient-to-l from-lightgrey to-transparent pointer-events-none z-10"></div>
            )}
          </div>
        </main>
      </div>
    </section>
  );
}

export default App;
