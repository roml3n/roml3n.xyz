// import Image from "next/image";
import React from "react";

const WorkCard = ({
  title,
  company,
  date,
  imgSrc,
  className = "",
}: {
  title: string;
  company: string;
  date: string;
  imgSrc?: string;
  className?: string;
}) => {
  return (
    <div className={`flex flex-col gap-6 col-span-4 md:col-span-4 lg:col-span-6 row-span-1 ${className}`}>
      <div className="flex flex-col gap-1">
        <h4 className="h4 text-fullgrey w-full">{title}</h4>
        <h5 className="h5 font-medium w-full opacity-60">
          {company}
          <br />[ {date} ]
        </h5>
      </div>
      <div className="w-full aspect-[16/10] bg-midgrey rounded-sm">
        {/* <Image
          src={imgSrc}
          height={24}
          width={24}
          alt="screenshot"
          object-contain
        /> */}
      </div>
    </div>
  );
};

export default WorkCard;
