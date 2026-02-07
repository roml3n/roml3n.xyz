import React from "react";
import Image from "next/image";
import Link from "next/link";

const Experience = ({
  iconSrc,
  company,
  alt,
  href,
  role,
  time,
}: {
  iconSrc: string;
  company: string;
  alt: string;
  href: string;
  role: string;
  time: string;
}) => {
  return (
    <Link
      href={href}
      passHref
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-full items-center justify-between group"
    >
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex gap-3 items-center ">
          <div className="justify-center items-center flex relative h-20 w-20 aspect-square rounded-2xl border border-solid border-midgrey bg-fullwhite">
            <Image src={iconSrc} alt={alt} width={48} height={48} />
          </div>
          <div className="flex flex-col">
            <p className="h4 font-medium">{role}</p>
            <p className="h4">{company}</p>
          </div>
        </div>
        <p className="h4">{time}</p>
      </div>
    </Link>
  );
};

export default Experience;
