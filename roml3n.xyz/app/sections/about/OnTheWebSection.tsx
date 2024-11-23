import React from "react";
import Image from "next/image";

const OnTheWebSection = () => {
  return (
    <section className="m-auto items-center w-[80%] max-w-5xl">
      <div className="w-full text-left h2">On the web</div>

      <div className="w-full flex gap-0">
        <div className="flex flex-col gap-3 w-full">
          {/* Left */}
          <div className="flex gap-3">
            <div className="place-items-center h-12 w-12 aspect-square rounded-2xl border border-solid border-midgrey">
              <Image
                src="/images/icons/Linkedin.svg"
                alt="LinkedIn Icon"
                width={24}
                height={24}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="h4">/in/roml3n</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="place-items-center h-12 w-12 aspect-square rounded-2xl border border-solid border-midgrey">
              <Image
                src="/images/icons/Figma.svg"
                alt="Figma Icon"
                width={24}
                height={24}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="h4">/roml3n</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="place-items-center h-12 w-12 aspect-square rounded-2xl border border-solid border-midgrey">
              <Image
                src="/images/icons/Medium.svg"
                alt="Medium Icon"
                width={24}
                height={24}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="h4">/romlen</p>
            </div>
          </div>

          {/* Right */}
          <div className="flex gap-3">
            <div className="place-items-center h-12 w-12 aspect-square rounded-2xl border border-solid border-midgrey">
              <Image
                src="/images/icons/Twitter.svg"
                alt="X Icon"
                width={24}
                height={24}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="h4">/roml3n</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="place-items-center h-12 w-12 aspect-square rounded-2xl border border-solid border-midgrey">
              <Image
                src="/images/icons/Behance.svg"
                alt="Behance Icon"
                width={24}
                height={24}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="h4">/roml3n</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="place-items-center h-12 w-12 aspect-square rounded-2xl border border-solid border-midgrey">
              <Image
                src="/images/icons/Dribbble.svg"
                alt="Dribbble Icon"
                width={24}
                height={24}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="h4">/romlen</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OnTheWebSection;
