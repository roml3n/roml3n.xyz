"use client";
import React, { useState, useRef } from "react";
import { ProjectCard } from "@/app/components/ProjectCard";
import ButtonLink from "@/app/components/ButtonLink";

export const ProjectsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
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
    <section className="flex flex-col gap-0 md:gap-9 w-full items-center mt-[6.75rem]">
      {/* Project Heading */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center py-0 md:py-4">
        <h2 className="h2 pb-3 md:pb-0"> Featured Projects </h2>
        <ButtonLink Label="view all projects" URL="/work" />
      </div>

      {/* Project Cards */}
      <div className=" relative justify-start self-center w-[150%] md:w-[115%] h-fit flex flex-col scale-[85%] md:scale-100">
        {/* Left Gradient */}
        {!scrollState.atStart && (
          <div className="absolute left-0 top-0 h-full w-[20%] bg-gradient-to-r from-lightgrey to-transparent pointer-events-none z-10"></div>
        )}

        {/* Scrollables */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="px-[4.5rem] flex self-center w-[100%] gap-4 overflow-x-auto scrollbar-hide"
        >
          <ProjectCard
            description="Redesigning e-commerce to boost loyalty, sales, and satisfaction"
            imageSrc="/images/projectCard/bigstore-screen.png"
            href="/work/bigstore"
            edge={true}
          />

          <ProjectCard
            description="Enhancing financial inclusion for new Americans and immigrants"
            imageSrc="/images/projectCard/waya-screen.png"
            href="/work/waya-ssn"
          />

          <ProjectCard
            description="Crafting a high-stakes experience for sports betting enthusiasts"
            imageSrc="/images/projectCard/tucheze-screen.png"
            href="/work/tucheze"
          />

          <ProjectCard
            description="Stockpicha"
            imageSrc="/images/projectCard/tucheze-screen.png"
            href="/work/bigstore"
          />
        </div>
        {/* Right Gradient */}
        {!scrollState.atEnd && (
          <div className="absolute right-0 top-0 h-full w-[20%] bg-gradient-to-l from-lightgrey to-transparent pointer-events-none z-10"></div>
        )}
      </div>
    </section>
  );
};
