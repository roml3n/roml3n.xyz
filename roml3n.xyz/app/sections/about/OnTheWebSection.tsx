import React from "react";
import Image from "next/image";
import SocialLink from "@/app/components/ui/social-link";

const OnTheWebSection = () => {
  return (
    <section className="m-auto gap-6 flex flex-col items-center w-full">
      <div className="w-full text-left h2">On the web</div>

      <div className="w-full flex gap-16">
        {/* Left */}
        <div className="flex flex-col gap-3 w-full">
          <SocialLink
            iconSrc="/images/icons/Linkedin.svg"
            alt="LinkedIn Icon"
            label="/in/roml3n"
            href="https://linkedin.com/in/roml3n"
          />
          <SocialLink
            iconSrc="/images/icons/Figma.svg"
            alt="Figma Icon"
            label="/roml3n"
            href="https://figma.com/@roml3n"
          />
        </div>

        {/* Center */}
        <div className="flex flex-col gap-3 w-full">
          <SocialLink
            iconSrc="/images/icons/Medium.svg"
            alt="Medium Icon"
            label="/roml3n"
            href="https://romlen.medium.com"
          />
          <SocialLink
            iconSrc="/images/icons/Twitter.svg"
            alt="X Icon"
            label="/roml3n"
            href="https://x.com/roml3n"
          />
        </div>

        {/* Right */}
        <div className="flex flex-col gap-3 w-full">
          <SocialLink
            iconSrc="/images/icons/Behance.svg"
            alt="Behance Icon"
            label="/roml3n"
            href="https://behance.net/roml3n"
          />
          <SocialLink
            iconSrc="/images/icons/Dribbble.svg"
            alt="Dribbble Icon"
            label="/roml3n"
            href="https://dribbble.com/roml3n"
          />
        </div>
      </div>
    </section>
  );
};

export default OnTheWebSection;
