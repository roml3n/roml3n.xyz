import Image from "next/image";
import React from "react";

const WorkCard = ({
  title,
  company,
  date,
  coverImage,
  className = "",
}: {
  title: string;
  company: string;
  date: string;
  coverImage: string;
  className?: string;
}) => {
  return (
    <div
      className={`group relative flex flex-col gap-6 col-span-4 md:col-span-4 lg:col-span-6 row-span-1 ${className}`}
    >
      <span className="pointer-events-none absolute -inset-3 -z-10 rounded-lg bg-mainblue/20 opacity-0 scale-95 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100" />
      <div className="flex flex-col gap-1">
        <h4 className="h4 text-fullgrey w-full !leading-none">{title}</h4>
        <h5 className="h5 font-medium w-full opacity-60 !leading-tight">
          {company}
          <br />[ {date} ]
        </h5>
      </div>
      <div className="w-full aspect-[16/10] bg-midgrey rounded-sm">
        <Image
          src={coverImage}
          height={1080}
          width={675}
          alt="screenshot of project"
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default WorkCard;
