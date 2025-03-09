import React from "react";
import Image from 'next/image';
import Button from "@/app/components/Button";


const Hero = () => {
  return (
    <section className="flex flex-col gap-6">
      <h1 className="h1 w-full">
      Crafting a high-stakes experience for sports betting enthusiasts
      </h1>
      <h4 className="h4 w-full">
      As online sports betting surged, Tucheze (Swahili for ‘Let&apos;s Play’) needed a UI that captured game-day excitement while staying user-friendly for all levels of bettors. This design focused on creating an intuitive, immersive experience that guided users through interactive games, offering quick thrills and even quicker wins—boosting engagement and building loyalty among sports enthusiasts.
      </h4>

      <div className="flex flex-col sm:flex-row w-fit gap-2 items-start justify-center">
        <Button
          target-blank
          url="https://tucheze.com"
          className="!bg-mainblue flex gap-2 group"
          newTab
        >
          <p className="h4 !text-fullwhite group-hover:mx-2 transition-all duration-300">See Live</p>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 7.5L7 17.5M17 7.5H8M17 7.5V16.5"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Button>
    
      </div>

      <div className="relative w-full overflow-hidden mt-6">
        <Image
          src="/images/work/tucheze/hero.png"
          alt="Two iPhones displaying the Tucheze mobile interface"
          width={2324}
          height={932}
          objectFit="cover"
        />
      </div>
    </section>
  );
};

export default Hero;
