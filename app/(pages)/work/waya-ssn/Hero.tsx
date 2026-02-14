import React from "react";
import Image from "next/image";
import Button from "@/app/components/Button";

const Hero = () => {
  return (
    <section className="flex flex-col gap-6">
      <h1 className="h1 w-full">
        Enhancing financial inclusion for new Americans and immigrants
      </h1>
      <h4 className="h4 w-full">
        Despite the increasing demand for financial services among new Americans
        and immigrants, many are unable to access traditional banking due to the
        requirement of SSNs. This practice limits tons of people&apos;s ability
        to save, invest, and participate fully in the economy.
      </h4>

      <div className="flex flex-col sm:flex-row w-fit gap-2 items-start justify-center">
        <Button
          variant="ghost"
          target-blank
          url="https://play.google.com/store/apps/details?id=com.wayapay.neo.app&hl=en"
          className="!bg-green-500 flex gap-2 group"
          newTab
          label="Download on Google Play"
        />

        <Button
          variant="ghost"
          target-blank
          url="https://apps.apple.com/app/waya-mobile-banking/id6445921373"
          className="!bg-mainblue flex gap-2 group"
          newTab
          label="Get it on App Store"
        />
      </div>

      <div className="relative w-full overflow-hidden mt-6">
        <Image
          src="/images/work/waya-ssn/hero.png"
          alt="Two iPhones displaying the Waya mobile app"
          width={2324}
          height={932}
          objectFit="cover"
        />
      </div>
    </section>
  );
};

export default Hero;
