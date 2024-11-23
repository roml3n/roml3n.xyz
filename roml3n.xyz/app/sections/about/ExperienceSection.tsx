import React from "react";
import Image from "next/image";

const ExperienceSection = () => {
  return (
    <section className="m-auto items-center w-[80%] max-w-5xl">
      <div className="w-full text-left h2">Work experience</div>

      <div className="w-full flex flex-col gap-3">
        <div className="flex justify-between">
          <div className="flex gap-3">
            <div className="place-items-center h-20 w-20 aspect-square rounded-2xl border border-solid border-midgrey">
              <Image 
              src="/images/icons/Pawa.svg"
              alt="Pawa IT Solutions Logo"
              width={48}
              height={48}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="h4 bold">Product Designer</p>
              <p className="h4">Pawa IT Solutions</p>
            </div>

            <p className="h4">now</p>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex gap-3">
            <div className="place-items-center h-20 w-20 aspect-square rounded-2xl border border-solid border-midgrey">
            <Image 
              src="/images/icons/CB.svg"
              alt="The Creative Brands Group Logo"
              width={48}
              height={48}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="h4 bold">Brand and Product Designer</p>
              <p className="h4">The Creative Brands Group</p>
            </div>

            <p className="h4">2023</p>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex gap-3">
            <div className="place-items-center h-20 w-20 aspect-square rounded-2xl border border-solid border-midgrey">
            <Image 
              src="/images/icons/Waya.svg"
              alt="Waya Logo"
              width={48}
              height={48}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="h4 bold">Product Designer</p>
              <p className="h4">Waya</p>
            </div>

            <p className="h4">2023</p>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex gap-3">
            <div className="place-items-center h-20 w-20 aspect-square rounded-2xl border border-solid border-midgrey">
            <Image 
              src="/images/icons/Kalax.svg"
              alt="Kalax Computer World Logo"
              width={48}
              height={48}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="h4 bold">Visual Designer</p>
              <p className="h4">Kalax Computer World</p>
            </div>

            <p className="h4">2020</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
