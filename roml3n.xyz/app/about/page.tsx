"use client";
import React from "react";
import Header from "@/app/components/Header.jsx";
import ImagesSection from "@/app/sections/about/ImagesSection";
import ExperienceSection from "@/app/sections/about/ExperienceSection";
import OnTheWebSection from "@/app/sections/about/OnTheWebSection";
import CurrentlyReadingSection from "@/app/sections/about/CurrentlyReadingSection";
import DockSection from "@/app/sections/home/DockSection";


const about = () => {
  return (
    <section className="m-auto items-center w-[80%] max-w-5xl gap-16">
      <Header />
      <main className="flex flex-col mt-24 gap-16 items-center relative">
        <ImagesSection />
        <p className="h4 w-full">
          My very first interaction with a computer was when I played my first
          video game, Grand Theft Auto: Vice City, during my early teens. I
          discovered a love for design in my early adult years after exploring
          nearly every field in computing—coding, cybersecurity, you name it, I
          probably dabbled in it. The only thing I didn’t try was running
          physics simulations; because I couldn’t sneak a quantum computer into
          my bedroom without my mum noticing. When I’m not staring longingly at
          a laptop screen, you’ll find me staring even more longingly at my
          phone’s screen, and when I’m not doing that either, I’d be exploring
          the city of Nairobi, or Los Santos (as Trevor), playing basketball,
          reading a new book chapter or channeling my inner Gordon Ramsay, and
          trying not to set my kitchen on fire.
        </p>
        <ExperienceSection />
        <div className="w-full h-[1px] bg-midgrey"></div>
        <OnTheWebSection />
        <CurrentlyReadingSection />
        <DockSection className="flex justify-center w-fit" />{" "}
      </main>
    </section>
  );
};

export default about;
