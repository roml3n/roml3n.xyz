import React from "react";
import Button from "@/app/components/Button";
import WorkCard from "@/app/components/WorkCard";
import TransitionLink from "@/app/components/transitions/TransitionLink";
import { workProjects } from "@/app/data/workProjects";

type MoreProjectsSectionProps = {
  currentHref: string;
};

const MoreProjectsSection = ({ currentHref }: MoreProjectsSectionProps) => {
  if (workProjects.length < 2) return null;

  const currentIndex = workProjects.findIndex(
    (project) => project.href === currentHref,
  );

  const nextProjects =
    currentIndex === -1
      ? workProjects.slice(0, 2)
      : [1, 2].map(
          (offset) =>
            workProjects[(currentIndex + offset) % workProjects.length],
        );

  return (
    <section className="col-span-4 md:col-span-8 lg:col-span-12 w-full pt-10 md:pt-12 border-t-2 border-midgrey/70 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-x-4 md:gap-x-6 gap-y-8 md:gap-y-10">
      <div className="col-span-4 md:col-span-8 lg:col-span-12 flex flex-col gap-1">
        <h2 className="h2 opacity-60">More projects</h2>
      </div>

      {nextProjects.map((project) => (
        <TransitionLink
          key={`${project.title}-${project.date}`}
          href={project.href}
          className="contents"
        >
          <WorkCard
            title={project.title}
            company={project.company}
            date={project.date}
            coverImage={project.coverImage}
          />
        </TransitionLink>
      ))}

      <div className="col-span-4 md:col-span-8 lg:col-span-12">
        <Button variant="secondary" label="Explore all projects" url="/#work" />
      </div>
    </section>
  );
};

export default MoreProjectsSection;
