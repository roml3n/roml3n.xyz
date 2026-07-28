import React from "react";
import { TextRevealCard } from "./text-reveal/TextRevealCard";
import { BadgeTrailCard } from "./badge-trail/BadgeTrailCard";

const TOP_LINES = [
  "/ro:man/",
  "(noun) A tinkerer, a maker,",
  "an experimenter, a curious being.",
];

const BOTTOM_LINES = [
  "A lover of good craftsmanship.",
  "I enjoy creating experiences that",
  "tell stories and spark joy.",
];

export const Hero = () => {
  return (
    <section className="relative w-screen justify-center h-screen bg-[#121212] flex flex-col self-center items-center pt-32 pb-12">
      <BadgeTrailCard />
      {/* Me */}
      <div className="w-[90%] md:w-[80%] max-w-7xl h-full grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 grid-rows-[auto_1fr] gap-4 md:gap-6">
        <p className="col-start-1 row-start-1 row-span-1 col-span-4 h1 !font-montreal !text-[105px] text-left font-bold !text-fullwhite">
          roman
        </p>

        <div className="col-start-1 row-start-2 col-span-4 md:col-span-8 lg:col-span-12 w-full h-full">
          <TextRevealCard topLines={TOP_LINES} bottomLines={BOTTOM_LINES} />
        </div>
      </div>
    </section>
  );
};
