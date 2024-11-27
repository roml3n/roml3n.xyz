import React from "react";
import Image from "next/image";

export const Photo: React.FC<{
  imageSrc: string;
  alt: string;
}> = ({ imageSrc, alt }) => {
  return (
    <div className="relative w-full aspect-[4/5] rounded-[4%] overflow-hidden border border-solid border-midgrey">
      <Image src={imageSrc} alt={alt} fill className="object-cover" />
    </div>
  );
};
