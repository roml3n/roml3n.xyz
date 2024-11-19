"use client";
import React, { useState, useRef } from "react";
import "./globals.css";
import Header from "./components/Header.jsx";
import { Hero } from "./sections/home/hero";
import { ProjectCard } from "./components/ProjectCard";
import ButtonLink from "./components/ButtonLink";

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
        <main className="flex flex-col w-full">
          <Hero />

          {/* Projects Showcase */}

          <section className="flex flex-col gap-9 w-full items-center mt-[6.75rem]">
            {/* Project Heading */}
            <div className="w-full flex justify-between items-center py-4">
              <h2 className="h2"> Featured Projects </h2>
              <ButtonLink Label="view all projects" URL="#" />
            </div>

            {/* Project Cards */}
            <div className=" relative self-center w-[115%] flex flex-col">
              {/* Left Gradient */}
              {!scrollState.atStart && (
                <div className="absolute left-0 top-0 h-full w-[12%] bg-gradient-to-r from-lightgrey to-transparent pointer-events-none z-10"></div>
              )}

              {/* Scrollables */}
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="px-[4.5rem] flex self-center w-[100%] gap-4 overflow-x-auto scrollbar-hide"
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
                <div className="absolute right-0 top-0 h-full w-[12%] bg-gradient-to-l from-lightgrey to-transparent pointer-events-none z-10"></div>
              )}
            </div>
          </section>
        </main>
      </div>
    </section>
  );
}

export default App;
