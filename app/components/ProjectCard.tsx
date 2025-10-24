import React from "react";
import Image from "next/image";
import Link from "next/link";

export const ProjectCard: React.FC<{
  name: string;
  description: string;
  tag: string;
  image: string;
  href: string;
  className?: string;
}> = ({ name, description, tag, image, href, className }) => {
  return (
    <Link
      className={`relative flex flex-col w-full rounded-xl overflow-clip ${className}`}
      href={href}
    >
      {/* Project Image */}
      <div className="flex items-center justify-center relative w-full h-auto">
        <Image
          src={image}
          alt="Project Image"
          width={514}
          height={381.5}
          className={`w-full h-auto ${className}`}
        />
      </div>

      {/* Description */}
      <div className="w-full z-10 flex flex-col md:flex-row gap-4 md:gap-0 p-4 items-start justify-between">
        <div className="flex flex-col gap-2">
          <p className="w-full h4 !font-medium">{name}</p>
          <p className="w-full h5">{description}</p>
        </div>
        <div className="px-2 py-0.5 md:px-2 md:py-1 -ml-1 md:m-0 font-montreal rounded-full text-sm md:text-base font-medium text-darkgrey bg-[#121212]/10 flex-shrink-0">
          {tag}
        </div>
      </div>
    </Link>
  );
};
