"use client";

import { useRef } from "react";

import SocialLink from "./components/SocialLink";
import { AboutStickerCluster } from "./components/about/AboutStickerCluster";
import { AboutPhotoGrid } from "./components/about/AboutPhotoGrid";

export const AboutSection = () => {
  const boundsRef = useRef<HTMLDivElement | null>(null);

  return (
    <section
      id="about"
      className="relative mt-16 w-full scroll-mt-20 py-16"
    >
      <div
        ref={boundsRef}
        className="relative w-full overflow-hidden"
      >
        <div className="flex w-full flex-col items-stretch gap-10 lg:flex-row lg:items-end lg:gap-14">
          <div className="flex w-full min-w-0 flex-col lg:max-w-[508px] lg:flex-1">
            <AboutStickerCluster boundsRef={boundsRef} />

            <div className="flex flex-col gap-6">
              <h2 className="font-season text-[2rem] font-normal leading-none text-fullgrey md:text-[2.5rem] lg:text-5xl">
                About
              </h2>

              <div className="h6 max-w-none tracking-[0.01em]">
                <p className="mb-0">
                  My very first interaction with a computer was when I played my
                  first video game, Grand Theft Auto: Vice City, during my early
                  teens.
                </p>
                <p className="mb-0">&nbsp;</p>
                <p className="mb-0">
                  I discovered a love for design in my early adult years after
                  exploring nearly every field in computing. The only thing I
                  didn&apos;t try was running physics simulations; because I
                  couldn&apos;t sneak a quantum computer into my bedroom without
                  my mum noticing.
                </p>
                <p className="mb-0">&nbsp;</p>
                <p>
                  When I&apos;m not staring longingly at a laptop screen,
                  you&apos;ll find me staring even more longingly at my
                  phone&apos;s screen, and when I&apos;m not doing that either,
                  I&apos;d be exploring the city of Nairobi, or Los Santos,
                  playing basketball, reading a new book chapter or channeling my
                  inner Gordon Ramsay, and trying not to set my kitchen on fire.
                </p>
              </div>
            </div>
          </div>

          <AboutPhotoGrid />
        </div>

        <div className="mt-10 grid w-full grid-cols-2 gap-x-4 gap-y-3 md:grid-cols-4 lg:mt-14">
          <SocialLink
            channel="email"
            title="yo@roml3n.xyz"
            url="mailto:yo@roml3n.xyz"
            className="col-span-2 md:col-span-1"
          />
          <SocialLink
            channel="phone"
            title="+254 742 524 417"
            url="tel:+254742524417"
            className="col-span-2 md:col-span-1"
          />
          <SocialLink
            channel="linkedin"
            title="in/roml3n"
            url="https://linkedin.com/in/roml3n"
            className="col-span-1"
          />
          <SocialLink
            channel="x"
            title="@roml3n.xyz"
            url="https://x.com/roml3n"
            className="col-span-1"
          />
        </div>
      </div>
    </section>
  );
};
