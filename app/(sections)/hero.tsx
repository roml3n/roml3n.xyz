import React from "react";
import Image from "next/image";
import AvatarLG from "@/app/components/AvatarLG";

export const Hero = () => {
  return (
    <section className="w-screen justify-center h-screen bg-[#121212] flex flex-col self-center items-center pt-32 pb-12">
      {/* Me */}
      <div className="w-[90%] md:w-[80%] max-w-7xl h-full grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 grid-rows-[auto_auto_1fr] gap-4 md:gap-6">
        <p className="col-start-1 row-start-1 row-span-1 col-span-4 h1 !font-montreal !text-[105px] text-left font-bold !text-fullwhite">
          roman
        </p>

        <div className="row-start-2 row-span-1 col-span-4 md:col-span-6 lg:col-span-8 w-full flex flex-col gap-6 justify-start items-start opacity-70">
          <p className="h4 text-left !text-fullwhite">/ro:man/</p>
          <p className="h4 text-left !text-fullwhite">
            <em>(noun) </em>
            <br />A tinkerer, a maker, an experimenter, a curious being, and
            most of all, a lover of good craftsmanship. I enjoy creating digital
            experiences that tell stories, that inspire creativity, and that
            spark joy.
          </p>
        </div>

        <p className="col-start-1 md:col-start-3 lg:col-start-5 row-start-3 row-span-1 col-span-4 md:col-span-6 lg:col-span-8 w-full h4 text-left place-self-end !text-fullwhite opacity-70">
          I’m a tinkerer, a maker, an experimenter, a curious being, and most of
          all, a lover of good craftsmanship. I enjoy creating digital
          experiences that tell stories, that inspire creativity, and that spark
          joy.
        </p>
      </div>
    </section>
  );
};
