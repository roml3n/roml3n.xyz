import React from "react";
import Image from "next/image";
import AvatarLG from "@/app/components/AvatarLG";


export const Hero = () => {
  return (
    <section className="w-full flex flex-col gap-[40px] h-fit">

      {/* Me */} 
      <div className="w-full mt-10 md:mt-24 flex flex-col gap-0 items-center">
        <div className="w-full flex gap-4 justify-center items-center">
          <p className="h1 text-center">I&apos;m</p>
          <p className="h1 text-center italic !text-mainblue">Roman</p>
          <AvatarLG />
        </div>

        <div className="w-full flex gap-4 justify-center items-center">
          <p className="h1 text-center">a</p>
          <p className="h1 text-center">Product</p>
          <p className="h1 text-center">Designer</p>
        </div>

        <div className="w-full flex gap-4 justify-center items-center">
          <p className="h1 text-center">based</p>
          <p className="h1 text-center">in</p>
          <p className="h1 text-center">Nairobi</p>
          <Image
            src="/images/home/kenyaFlag.png"
            width={64}
            height={64}
            alt="The flag of Kenya"
            className="rounded-full size-12 md:size-16 border-none shadow-[0px_28px_34px_-19px_rgba(0,0,0,1)]"
          />
        </div>
      </div>

      {/* Description */}
      <p className="w-full h4 text-center">
        I’m a tinkerer, a maker, an experimenter, a curious being, and most of
        all, a lover of good craftsmanship. I enjoy creating digital experiences
        that tell stories, that inspire creativity, and that spark joy.
      </p>
    </section>
  );
};
