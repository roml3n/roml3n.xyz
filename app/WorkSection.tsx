import React from "react";
import WorkCard from "./components/WorkCard";
import { workProjects } from "./data/workProjects";

const WorkSection = () => {
  return (
    <section
      id="work"
      className="w-full mt-16 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 grid-rows-[auto_1fr_1fr_1fr] gap-x-4 md:gap-x-6 gap-y-9 md:gap-y-16 relative justify-center self-center scroll-mt-20"
    >
      <div className="row-span-1 col-span-2 flex flex-col gap-1">
        <h2 className="h2"> Work </h2>
        <h2 className="h2 opacity-40"> [{workProjects.length}] </h2>
      </div>

      {workProjects.map((project) => (
        <WorkCard
          key={`${project.title}-${project.date}`}
          title={project.title}
          company={project.company}
          date={project.date}
          className={project.className}
          coverImage={project.coverImage}
        />
      ))}
    </section>
  );
};

export default WorkSection;
