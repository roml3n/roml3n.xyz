import React from "react";
import WorkCard from "../components/ui/WorkCard";

const WorkSection = () => {
  return (
    <section className="w-full mt-16 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 grid-rows-[auto_1fr_1fr_1fr] gap-x-4 md:gap-x-6 gap-y-9 md:gap-y-16 relative justify-center self-center">
      <div className="row-span-1 col-span-2 flex flex-col gap-1">
        <h2 className="h2"> Work </h2>
        <h2 className="h2 opacity-40"> [5] </h2>
      </div>

      <WorkCard
        title="Improving visits by 28% through a marketing website redesign"
        company="PawaIT"
        date="08.2024"
        className="md:row-start-2"
      />
      <WorkCard
        title="Crafting a high-stakes experience for sports betting enthusiasts"
        company="The CB Group"
        date="05.2024"
        className="md:row-start-2"
      />
      <WorkCard
        title="Enhancing financial inclusion for new Americans and immigrants"
        company="Waya"
        date="03.2024"
        className="md:row-start-3"
      />
      <WorkCard
        title="Crafting a new financial experience for Waya Business accounts"
        company="Waya"
        date="07.2023"
        className="md:row-start-3"
      />
      <WorkCard
        title="Redesigning e-commerce to boost loyalty, sales, and satisfaction"
        company="PawaIT"
        date="04.2023"
        className="md:row-start-4"
      />
    </section>
  );
};

export default WorkSection;
