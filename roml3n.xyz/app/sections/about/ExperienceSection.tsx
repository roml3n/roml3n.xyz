import React from "react";
import Image from "next/image";

import Experience from "@/app/components/ui/experience";
const ExperienceSection = () => {
  return (
    <section className="m-auto flex gap-6 flex-col items-center w-full">
      <div className="w-full text-left h2">Work experience</div>

      <div className="w-full flex flex-col gap-3">
        <Experience
        iconSrc="/images/icons/Pawa.svg"
        company="Pawa IT Solutions"
        alt="Pawa IT Solutions Logo"
        href="https://linkedin.com/company/pawa-it"
        role="Product Designer"
        time="now"
        />

        <Experience
        iconSrc="/images/icons/CB.svg"
        company="The Creative Brands Group"
        alt="The CB Group Logo"
        href="https://www.linkedin.com/company/thecreativebrandsgroup"
        role="Brand and Product Designer"
        time="2023"
        />

        <Experience
        iconSrc="/images/icons/Waya.svg"
        company="Waya"
        alt="Waya Logo"
        href="https://www.linkedin.com/company/wayapay"
        role="Product Designer"
        time="2023"
        />

        <Experience
        iconSrc="/images/icons/Kalax.svg"
        company="Kalax Computer World"
        alt="Computer Icon"
        href="https://www.linkedin.com/company/kalax-computer-system-inc/"
        role="Visual Designer"
        time="2020"
        />

      </div>
    </section>
  );
};

export default ExperienceSection;
