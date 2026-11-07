"use client";

import React from "react";

import WorkCard from "@/app/components/WorkCard";
import TransitionLink from "@/app/components/transitions/TransitionLink";
import type { WorkProject } from "@/app/data/workProjects";

type WorkProjectsGridProps = {
  projects: WorkProject[];
};

const WorkProjectsGrid = ({ projects }: WorkProjectsGridProps) => {
  return (
    <>
      {projects.map((project) => (
        <TransitionLink
          key={`${project.title}-${project.date}`}
          href={project.href}
          className="contents"
        >
          <WorkCard
            title={project.title}
            company={project.company}
            date={project.date}
            className={project.className}
            coverImage={project.coverImage}
            coverFill={project.coverFill}
          />
        </TransitionLink>
      ))}
    </>
  );
};

export default WorkProjectsGrid;
