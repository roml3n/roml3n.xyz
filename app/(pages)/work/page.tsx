"use client";
import React from "react";
import Footer from "@/app/components/Footer";
import { ProjectCard } from "@/app/components/ProjectCard";
import { ComingSoonCard } from "@/app/components/ComingSoonCard";

const Work = () => {
  return (
    <section className="m-auto items-center w-full gap-16">
      <main className="flex flex-col mt-10 md:mt-24 gap-16 items-center">
        <h1 className="h1 w-full">Work</h1>

        <div className="relative justify-center self-center w-full flex flex-col md:flex-row gap-4">
          <div className="p-0 md:pb-9 flex flex-col gap-4">
            <ProjectCard
              name="Bigstore"
              description="Redesigning e-commerce to boost loyalty, sales, and satisfaction"
              imageSrc="/images/projectCard/bigstore-screen.png"
              href="/work/bigstore"
              bgColor="bg-[#F2E7E6]"
            />

            <ProjectCard
              name="Waya"
              description="Enhancing financial inclusion for new Americans and immigrants"
              imageSrc="/images/projectCard/waya-screen.png"
              href="/work/waya-ssn"
              bgColor="bg-[#E8F2EF]"
            />
          </div>

          <div className="p-0 md:pt-9 flex flex-col gap-4">
            <ProjectCard
              name="Tucheze"
              description="Crafting a high-stakes experience for sports betting enthusiasts"
              imageSrc="/images/projectCard/tucheze-screen.png"
              href="/work/tucheze"
              bgColor="bg-[#E8ECF1]"
            />
            <ComingSoonCard
              name="Stockpicha"
              description="Branding a creative marketplace"
            />
          </div>
        </div>
      </main>

      <Footer />
    </section>
  );
};

export default Work;
