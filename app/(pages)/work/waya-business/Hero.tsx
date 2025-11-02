import React from "react";
import Image from "next/image";


const Hero = () => {
  return (
    <section className="relative flex flex-col gap-6">
      <h1 className="h1 w-full">
      Helping Waya empower immigrant founders to bank, build, and grow
      </h1>
      <h4 className="h4 w-full">
        As immigrant-owned businesses grew within Waya’s user base, the need for a smoother business banking solution became clear. I led the design of Waya Business from concept to final experience, simplifying account creation and helping immigrant founders access financial tools built for them.
      </h4>



      <div className="relative w-full overflow-hidden transform scale-[1.1] mt-24">
        <Image
          src="/images/work/waya-business/hero-img.webp"
          alt="Waya Business Screenshot"
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
