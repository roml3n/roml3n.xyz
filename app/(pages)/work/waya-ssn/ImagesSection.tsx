import React from "react";
import Image from "next/image";

export const ImagesSection = () => {
  return (
    <div className="flex items-center flex-col gap-0 w-full relative">
      <Image
        src="/images/work/waya-ssn/image 1.png"
        alt="Final Visual"
        width={3048}
        height={1080}
        className="rounded-t-3xl"
      />
      <Image
        src="/images/work/waya-ssn/image 2.png"
        alt="Final Visual"
        width={3048}
        height={1080}
      />
      <Image
        src="/images/work/waya-ssn/image 3.png"
        alt="Final Visual"
        width={3048}
        height={1080}
      />
      <Image
        src="/images/work/waya-ssn/image 4.png"
        alt="Final Visual"
        width={3048}
        height={1080}
      />
    </div>
  );
};

export default ImagesSection;
