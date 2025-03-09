import React from "react";
import Image from "next/image";

const images = [
  "/images/work/waya-ssn/marquee/Image01.png",
  "/images/work/waya-ssn/marquee/Image02.png",
  "/images/work/waya-ssn/marquee/Image03.png",
  "/images/work/waya-ssn/marquee/Image04.png",
  "/images/work/waya-ssn/marquee/Image05.png",
  "/images/work/waya-ssn/marquee/Image06.png",
  "/images/work/waya-ssn/marquee/Image07.png",
  "/images/work/waya-ssn/marquee/Image08.png",
  "/images/work/waya-ssn/marquee/Image09.png",
  "/images/work/waya-ssn/marquee/Image10.png",
  "/images/work/waya-ssn/marquee/Image11.png",
  "/images/work/waya-ssn/marquee/Image12.png",
  "/images/work/waya-ssn/marquee/Image13.png",
  "/images/work/waya-ssn/marquee/Image14.png",
  "/images/work/waya-ssn/marquee/Image15.png",
  "/images/work/waya-ssn/marquee/Image16.png",
  "/images/work/waya-ssn/marquee/Image17.png",
  "/images/work/waya-ssn/marquee/Image18.png",
  "/images/work/waya-ssn/marquee/Image19.png",
  "/images/work/waya-ssn/marquee/Image20.png",
  "/images/work/waya-ssn/marquee/Image21.png",
  "/images/work/waya-ssn/marquee/Image22.png",
  "/images/work/waya-ssn/marquee/Image23.png",
  "/images/work/waya-ssn/marquee/Image24.png",
];

const MarqueeSection: React.FC = () => {
  return (
    <div className="relative overflow-hidden w-[120%]">
        
      <div className="absolute left-0 w-[40%] h-full bg-gradient-to-r from-fullwhite to-transparent pointer-events-none z-10"></div>
      <div className="absolute right-0 h-full w-[40%] bg-gradient-to-l from-fullwhite to-transparent pointer-events-none z-10"></div>

      <div className="flex animate-marquee">
        {[...images, ...images].map((imgSrc, index) => (
          <div key={index} className="flex-shrink-0 mx-2 h-full">
            <Image
              src={imgSrc}
              alt={`Image ${index + 1}`}
              width={480}
              height={490}
              className="object-cover h-full w-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarqueeSection;
