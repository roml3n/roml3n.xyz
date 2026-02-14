import React from "react";
import Image from "next/image";
import Button from "@/app/components/Button";

const Hero = () => {
  return (
    <section className="relative flex flex-col gap-6">
      <h1 className="h1 w-full">
        Redesigning e-commerce to boost loyalty, sales, and satisfaction
      </h1>
      <h4 className="h4 w-full">
        In the increasingly competitive landscape of e-commerce, Bigstore
        recognized the need to revamp its digital presence to stand out and
        drive higher conversion rates. I undertook the challenge of redesigning
        Bigstore&apos;s platform with the dual objectives of delivering a
        visually stunning experience while enhancing usability to boost customer
        engagement and sales.
      </h4>

      <div className="flex flex-col sm:flex-row gap-2 justify-start">
        <Button
          variant="ghost"
          target-blank
          url="https://bigstore.africa"
          className="!bg-mainblue flex gap-2 group"
          newTab
          label="See Live"
        />
        <Button
          variant="ghost"
          target-blank
          url="https://www.figma.com/design/sfeDE3gipPzbHZU4fUUZwq/%F0%9F%9F%A2-bigstore-%2F-bigstore-website-%5Bdeprecated%5D?node-id=151-16493&t=hB6qx1fvsVGA2xNr-1"
          className="flex gap-2 group"
          newTab
          label="See it in Figma"
        />
      </div>

      <div className="relative w-full overflow-hidden transform scale-[1.2] mt-6">
        <Image
          src="/images/work/bigstore/bigstore-hero.png"
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
