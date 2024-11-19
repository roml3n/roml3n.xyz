
import React from "react";
import Image from "next/image"; // Import the Next.js Image component

export const ProjectCard: React.FC<{
  description: string;
  imageSrc: string;
}> = ({ description, imageSrc }) => {
  return (
    <div className="flex shrink-0 grow-0 flex-col justify-between relative !w-[427px] pt-6 px-6 h-[620px] bg-fullwhite rounded-2xl overflow-hidden border border-solid border-mid-grey">
      <p className="w-full top-[36px] left-6 h3">{description}</p>
      <Image src={imageSrc} alt="Frame Image" width={427} height={64} />
    </div>
  );
};
