import React from "react";
import Image from "next/image";
import Button from "@/app/components/Button";

const Hero = () => {
  return (
    <section className="relative flex flex-col gap-6">
      <h1 className="h1 w-full">
        Revamping the web experience to reflect company’s focus on AI{" "}
      </h1>
      <h4 className="h4 w-full">
        I led an end-to-end redesign of Pawa IT’s marketing site to reposition
        the brand around cloud and AI, delivering a visual overhaul, a
        streamlined information architecture, a dynamic hero, a modular content
        system, and a refreshed brand identity. The relaunch drove a 28% uplift
        in weekly visits, and generated four major AI events.
      </h4>

      <div className="flex flex-col sm:flex-row gap-2 justify-start">
        <Button
          target-blank
          url="https://pawait.africa"
          className="!bg-mainblue flex gap-2 group"
          newTab
        >
          <p className="h4 !text-fullwhite  group-hover:mx-2 transition-all duration-300">
            See Live
          </p>
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
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      </div>

      <div className="relative w-full overflow-hidden transform scale-[1.4] mt-28">
        <Image
          src="/images/work/pawa-website/pawa-hero-img.webp"
          alt="Big Store Screenshot"
          width={2324}
          height={932}
          layout="intrinsic"
          className="w-full h-auto"
        />
      </div>
    </section>
  );
};

export default Hero;
