import React from "react";
import Image from "next/image";

export const StackIcon: React.FC<{
  imageSrc: string;
  alt: string;
}> = ({ imageSrc, alt }) => {
  return (
    <div className="relative w-full aspect-square rounded-[20%] overflow-hidden border border-solid border-fullgrey border-opacity-20">
      <Image src={imageSrc} alt={alt} fill className="object-cover"/>
    </div>
  );
};
