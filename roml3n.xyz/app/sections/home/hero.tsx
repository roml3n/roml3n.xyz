import React from "react";
import Image from "next/image";
import AvatarLG from "@/app/components/AvatarLG";

export const Hero = () => {
  return (
    <section className="block flex-col gap-12 h-fit">
      <div className="relative top-11 flex flex-col h-fit gap-0 items-center">
        <div className="inline-flex gap-4 h-fit items-center">
          <div className="h1 text-center"> I&apos;m </div>
          <div className="h1 text-center italic !text-mainblue"> Roman </div>
          <AvatarLG />
        </div>
        <div className="inline-flex gap-4 h-fit items-center">
          <div className="h1 text-center "> a </div>
          <div className="h1 text-center "> Product </div>
          <div className="h1 text-center "> Designer </div>
        </div>
        <div className="inline-flex gap-4 h-fit items-center">
          <div className="h1 text-center "> based </div>
          <div className="h1 text-center"> in </div>
          <div className="h1 text-center"> Nairobi </div>
          <Image
            src="/images/home/kenyaFlag.png"
            width={64}
            height={64}
            alt="The flag of Kenya"
            className="rounded-full border-none"
          />
        </div>
      </div>
      <div className="block w-full h4 text-center">
      I’m a tinkerer, a maker, an experimenter, a curious being, and most of all, a lover of good craftsmanship. I enjoy creating digital experiences that tell stories, that inspire creativity, and that spark joy.
      </div>
    </section>
  );
};
