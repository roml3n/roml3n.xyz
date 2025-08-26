"use client"
import React from "react";
import Footer from "@/app/components/Footer";
import { ProjectCard } from "@/app/components/ProjectCard";
import { ComingSoonCard } from "@/app/components/ComingSoonCard";

const projects = [
  {
    name: "Waya",
    description: "Simplifying remittances for the African diaspora",
    imageSrc: "/images/projectCard/waya-screen.png",
    href: "/work/waya-ssn",
    bgColor: "bg-[#F2E7E6]",
  },
  {
    name: "Tucheze",
    description: "A social gaming platform for trivia lovers",
    imageSrc: "/images/projectCard/tucheze-screen.png",
    href: "/work/tucheze",
    bgColor: "bg-[#E8F2EF]",
  },
  {
    name: "Bigstore",
    description: "An e-commerce solution for small businesses",
    imageSrc: "/images/projectCard/bigstore-screen.png",
    href: "/work/bigstore",
    bgColor: "bg-[#E8ECF1]",
  },
];

const Work = () => {
  return (
    <section className="m-auto items-center w-full gap-16">
      <main className="flex flex-col mt-10 md:mt-24 gap-16 items-center">
        <h1 className="h1 w-full">Work</h1>
        <div className="relative justify-center self-center w-full flex flex-col md:flex-row gap-4">
          <div className="p-0 md:pb-9 flex flex-col gap-4">
            {projects
              .filter((_, index) => index % 2 === 0)
              .map((project, index) => (
                <ProjectCard
                  key={project.name}
                  name={project.name}
                  description={project.description}
                  imageSrc={project.imageSrc}
                  href={project.href}
                  bgColor={project.bgColor}
                />
              ))}
          </div>
          <div className="p-0 md:pt-9 flex flex-col gap-4">
            {projects
              .filter((_, index) => index % 2 !== 0)
              .map((project, index) => (
                <ProjectCard
                  key={project.name}
                  name={project.name}
                  description={project.description}
                  imageSrc={project.imageSrc}
                  href={project.href}
                  bgColor={project.bgColor}
                />
              ))}
              <div className="flex justify-center">
                <ComingSoonCard
                    name="Stockpicha"
                    description="Branding a creative marketplace"
                />
             </div>
          </div>
        </div>
      </main>
      <Footer />
    </section>
  );
};

export default Work;