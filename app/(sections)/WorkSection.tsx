import React from "react";
import WorkCard from "../components/ui/WorkCard";

const WorkSection = () => {
  return (
    <section className="w-full mt-16 grid grid-cols-12 grid-rows-[auto_1fr_1fr_1fr] row gap-x-6 gap-y-16 relative justify-center self-center">
      <div className="row-span-1 col-span-2 flex flex-col gap-1">
        <h2 className="h2"> Work </h2>
        <h2 className="h2 opacity-40"> [5] </h2>
      </div>

      <WorkCard
        title="Improving visits by 28% through a marketing website redesign"
        company="PawaIT"
        date="08.2024"
        className="row-start-2"
      />
      <WorkCard
        title="Improving visits by 28% through a marketing website redesign"
        company="PawaIT"
        date="08.2024"
        className="row-start-2"
      />
      <WorkCard
        title="Improving visits by 28% through a marketing website redesign"
        company="PawaIT"
        date="08.2024"
        className="row-start-3"
      />
      <WorkCard
        title="Improving visits by 28% through a marketing website redesign"
        company="PawaIT"
        date="08.2024"
        className="row-start-3"
      />
      <WorkCard
        title="Improving visits by 28% through a marketing website redesign"
        company="PawaIT"
        date="08.2024"
        className="row-start-4"
      />
    </section>
  );
};

export default WorkSection;
