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
      className={`relative flex flex-col w-full rounded-xl  ${className}`}
      href={href}
    >
      {/* Project Image */}
      <div className="flex items-center justify-center relative w-full h-[390px] border border-orange-200">
        <Image
          src={image}
          alt="Project Image"
          width={514}
          height={390}
          className={`w-auto h-full border border-red-500 ${className}`}
        />
      </div>

      {/* Description */}
      <div className="w-full z-10 flex p-4 items-start justify-between">
        <div className="flex flex-col gap-2">
          <p className="w-full h4 !font-medium">{name}</p>
          <p className="w-full h5">{description}</p>
        </div>
        <div className="px-2 py-1 font-montreal rounded-full text-base font-medium text-darkgrey bg-[#121212]/10 flex-shrink-0">
          {tag}
        </div>
      </div>
    </Link>
  );
};
