import React from "react";
import Image from "next/image";
import { BorderTrail } from "./BorderTrail";

export const ProjectCard: React.FC<{
  description: string;
  imageSrc: string;
}> = ({ description, imageSrc }) => {
  return (
    <div className="relative flex shrink-0 grow-0 flex-col justify-between !w-[427px] pt-6 px-6 h-[620px] bg-fullwhite rounded-2xl overflow-hidden border border-solid border-midgrey group">
      {/* BorderTrail */}
      <div className="absolute inset-0 z-10 opacity-0 transition-opacity duration-300 rounded-2xl group-hover:opacity-100">
        <BorderTrail
          style={{
            boxShadow:
              "0px 0px 60px 120px rgb(59 130 246 / 10%), 0 0 100px 90px rgb(59 130 246 / 50%), 0 0 140px 90px rgb(59 130 246 / 10%)",
          }}
          size={100}
        />
      </div>

      <p className="w-full top-[36px] left-6 h3">{description}</p>
      <Image src={imageSrc} alt="Frame Image" width={427} height={64} />
    </div>
  );
};
