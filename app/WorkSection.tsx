import React from "react";

import TransitionLink from "./components/transitions/TransitionLink";
import WorkProjectsGrid from "./components/WorkProjectsGrid";
import { getFeaturedWorkProjects } from "./data/workProjects";

const WorkSection = () => {
  const featuredProjects = getFeaturedWorkProjects();

  return (
    <section
      id="featured-work"
      className="w-full mt-16 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 grid-rows-auto gap-x-4 md:gap-x-6 gap-y-9 md:gap-y-16 relative justify-center self-center scroll-mt-20"
    >
      <div className="row-span-1 col-span-4 md:col-span-8 lg:col-span-12 flex flex-row flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
        <div className="flex flex-col gap-1">
          <h2 className="h2">Featured work</h2>
        </div>
        <TransitionLink
          href="/work"
          className="h5 font-medium shrink-0 text-darkgrey hover:text-fullgrey transition-colors duration-200 ease-out underline underline-offset-4"
          aria-label="View all work"
        >
          View all work
        </TransitionLink>
      </div>

      <WorkProjectsGrid projects={featuredProjects} />
    </section>
  );
};

export default WorkSection;
