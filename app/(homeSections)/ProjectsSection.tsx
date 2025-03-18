"use client";
import React from "react";
import { ProjectCard } from "@/app/components/ProjectCard";
import ButtonLink from "@/app/components/ButtonLink";

export const ProjectsSection = () => {
  return (
    <section className="flex flex-col gap-0 md:gap-9 w-full items-center mt-[6.75rem]">
      {/* Project Heading */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center py-0 md:py-4">
        <h2 className="h2 pb-3 md:pb-0"> Featured Projects </h2>
        <ButtonLink Label="view all projects" URL="/work" />
      </div>

      {/* Project Cards */}
      <div className="relative justify-center self-center w-full flex gap-4">
        <div className="pt-9">
          <ProjectCard
            name="Bigstore"
            description="Redesigning e-commerce to boost loyalty, sales, and satisfaction"
            imageSrc="/images/projectCard/bigstore-screen.png"
            href="/work/bigstore"
            bgColor="bg-[#F2E7E6]"
          />
        </div>

        <div className="pb-9">
          <ProjectCard
            name="Waya"
            description="Enhancing financial inclusion for new Americans and immigrants"
            imageSrc="/images/projectCard/waya-screen.png"
            href="/work/waya-ssn"
            bgColor="bg-[#E8F2EF]"
          />
        </div>
      </div>
    </section>
  );
};
