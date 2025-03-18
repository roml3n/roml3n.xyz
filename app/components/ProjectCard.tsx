import React from "react";
import Image from "next/image";
import Link from "next/link";

export const ProjectCard: React.FC<{
  name: string;
  description: string;
  imageSrc: string;
  href: string;
  className?: string;
  bgColor: string;
}> = ({ name, description, imageSrc, href, className, bgColor }) => {
  return (
    <div
      className={`relative flex shrink-0 grow-0 flex-col justify-between w-full  rounded-2xl overflow-hidden border border-solid border-fullgrey/10  ${bgColor}`}
    >
      <div className="w-full flex flex-col gap-3 pt-6 pb-0 px-6">
        <p className="w-full h3">{name}</p>
        <p className="w-full h5">{description}</p>
        <Link
          href={href}
          className="h5 font-medium rounded-full w-fit !text-mainblue bg-white/60 hover:bg-white transition-all duration-300 px-4 py-2"
        >
          View case study
        </Link>
      </div>

      <div className="relative w-full h-auto">
        <Image
          src={imageSrc}
          alt="Frame Image"
          width={421}
          height={357}
          className={`w-full h-auto ${className}`}
        />
      </div>
    </div>
  );
};
