import React from "react";
import CautionMarquee from "@/app/components/CautionMarquee";

export const ComingSoonCard: React.FC<{
  name: string;
  description: string;
}> = ({ name, description }) => {
  return (
    <div className="relative flex flex-col shrink-0 grow-0 justify-between w-full  rounded-2xl gap-4 overflow-hidden border border-solid border-fullgrey/10  bg-[E8E6F0]">
      <div className="w-full flex flex-col gap-3 pt-6 pb-0 px-6 opacity-40">
        <p className="w-full h3">{name}</p>
        <p className="w-full h5">{description}</p>
        <p className="h5 font-medium rounded-full w-fit !text-fullgrey bg-midgrey px-4 py-2">
          View case study
        </p>
      </div>

      <div className="relative w-full h-[357px] bg-black/30 rounded-ss-2xl my-0 mr-0 ml-6" />

      {/* Caution Cards */}
      <div className="relative h-12 -mb-[40px] bottom-[200px] scale-[105%]">
        <div className="absolute inset-0 rotate-6 ">
          <CautionMarquee direction="right" />
        </div>
        <div className="absolute inset-0 -rotate-6">
          <CautionMarquee direction="left" />
        </div>
      </div>
    </div>
  );
};
