import React from "react";
import Image from "next/image";

const ImagesSection = () => {
  return (
    <section className="m-auto items-center w-full">
      <div className="flex items-center gap-1 md:gap-4 relative">
        <div className="bg-fullwhite relative overflow-clip border border-solid border-midgrey rounded-[4%] aspect-[5/7] w-full">
          <Image src="/images/me/1000219239.jpg" fill alt=""></Image>
        </div>
        <div className="bg-fullwhite relative overflow-clip border border-solid border-midgrey rounded-[4%] aspect-[5/7] w-full">
          <Image src="/images/me/1000382870.jpg" fill alt=""></Image>
        </div>
        <div className="bg-fullwhite relative overflow-clip border border-solid border-midgrey rounded-[4%] aspect-[5/7] w-full">
          <Image
            src="/images/me/LRM_EXPORT_110594598770518_20200124_212334168.jpeg"
            fill
            alt=""
          ></Image>
        </div>
      </div>
    </section>
  );
};

export default ImagesSection;
