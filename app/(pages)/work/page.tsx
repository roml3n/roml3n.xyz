import type { Metadata } from "next";
import React from "react";

import WorkProjectsGrid from "@/app/components/WorkProjectsGrid";
import { workProjects } from "@/app/data/workProjects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected product design work and case studies — interfaces, systems, and craft.",
};

const WorkIndexPage = () => {
  const totalCount = String(workProjects.length).padStart(2, "0");

  return (
    <section
      id="work-index"
      className="w-full mt-16 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 grid-rows-auto gap-x-4 md:gap-x-6 gap-y-9 md:gap-y-16 relative justify-center self-center scroll-mt-20"
    >
      <div className="row-span-1 col-span-2 flex flex-col gap-1">
        <h2 className="page-heading">Work</h2>
        <h2 className="page-heading-sub"> [{totalCount}] </h2>
      </div>

      <WorkProjectsGrid projects={workProjects} />
    </section>
  );
};

export default WorkIndexPage;
