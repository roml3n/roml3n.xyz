import React from "react";
import Image from "next/image";
import AvatarLG from "@/app/components/AvatarLG";

export const Hero = () => {
  return (
    <div className="relative top-11 flex flex-col gap-1 items-center">
      <div className="inline-flex gap-4 items-center">
        <div className="h1 text-center"> I&apos;m </div>
        <div className="h1 text-center italic !text-mainblue"> Roman </div>
        <AvatarLG />
      </div>
      <div className="inline-flex gap-4 items-center">
        <div className="h1 text-center "> a </div>
        <div className="h1 text-center "> Product </div>
        <div className="h1 text-center "> Designer </div>
      </div>
      <div className="inline-flex gap-4 items-center">
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
  );
};
