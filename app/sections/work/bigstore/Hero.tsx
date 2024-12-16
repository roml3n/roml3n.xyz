import React from "react";
import Image from 'next/image';
import Button from "@/app/components/Button";


const Hero = () => {
  return (
    <section className="flex flex-col gap-6">
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

      <div className="flex flex-col sm:flex-row w-fit gap-2 items-start justify-center">
        <Button
          target-blank
          url="https://bigstore.africa"
          className="!bg-mainblue flex gap-2"
          newTab
        >
          <p className="h4 !text-fullwhite">See Live</p>
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
        <Button
          target-blank
          url="https://bigstore.africa"
          className="flex gap-2"
          newTab
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 9.5C15.7956 9.5 16.5587 9.81607 17.1213 10.3787C17.6839 10.9413 18 11.7044 18 12.5C18 13.2956 17.6839 14.0587 17.1213 14.6213C16.5587 15.1839 15.7956 15.5 15 15.5C14.2044 15.5 13.4413 15.1839 12.8787 14.6213C12.3161 14.0587 12 13.2956 12 12.5C12 11.7044 12.3161 10.9413 12.8787 10.3787C13.4413 9.81607 14.2044 9.5 15 9.5ZM15 9.5C15.7956 9.5 16.5587 9.18393 17.1213 8.62132C17.6839 8.05871 18 7.29565 18 6.5C18 5.70435 17.6839 4.94129 17.1213 4.37868C16.5587 3.81607 15.7956 3.5 15 3.5H9C8.20435 3.5 7.44129 3.81607 6.87868 4.37868C6.31607 4.94129 6 5.70435 6 6.5C6 7.29565 6.31607 8.05871 6.87868 8.62132C7.44129 9.18393 8.20435 9.5 9 9.5M15 9.5H9M9 9.5C8.20435 9.5 7.44129 9.81607 6.87868 10.3787C6.31607 10.9413 6 11.7044 6 12.5C6 13.2956 6.31607 14.0587 6.87868 14.6213C7.44129 15.1839 8.20435 15.5 9 15.5M9 15.5H12M9 15.5C8.40666 15.5 7.82664 15.6759 7.33329 16.0056C6.83994 16.3352 6.45543 16.8038 6.22836 17.3519C6.0013 17.9001 5.94189 18.5033 6.05765 19.0853C6.1734 19.6672 6.45912 20.2018 6.87868 20.6213C7.29824 21.0409 7.83279 21.3266 8.41473 21.4424C8.99667 21.5581 9.59987 21.4987 10.1481 21.2716C10.6962 21.0446 11.1648 20.6601 11.4944 20.1667C11.8241 19.6734 12 19.0933 12 18.5V3.5"
              stroke="#49505D"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p className="h4">See it in Figma</p>
        </Button>
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
