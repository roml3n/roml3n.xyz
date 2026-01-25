import React from "react";
import Image from "next/image";
import SocialLink from "../components/SocialLink";

export const AboutSection = () => {
  return (
    <section className="mt-[4rem] w-screen justify-center flex py-16 bg-hoverbg">
      <div className="w-[90%] md:w-[80%] max-w-7xl grid grid-cols-12 grid-rows-9 gap-6">
        <div
          className="flex flex-col gap-48
         col-span-5 row-span-9"
        >
          <div className="w-full flex flex-col gap-0">
            <h2 className="h2"> About </h2>
            <h2 className="h2 opacity-40"> me </h2>
          </div>

          <h6 className="w-full h6">
            My very first interaction with a computer was when I played my first
            video game, Grand Theft Auto: Vice City, during my early teens. I
            discovered a love for design in my early adult years after exploring
            nearly every field in computing. The only thing I didn’t try was
            running physics simulations; because I couldn’t sneak a quantum
            computer into my bedroom without my mum noticing. When I’m not
            staring longingly at a laptop screen, you’ll find me staring even
            more longingly at my phone’s screen, and when I’m not doing that
            either, I’d be exploring the city of Nairobi, or Los Santos, playing
            basketball, reading a new book chapter or channeling my inner Gordon
            Ramsay, and trying not to set my kitchen on fire.
          </h6>
        </div>

        <div className="flex bg-midgrey flex-col col-span-3 row-span-3 col-start-7">
          {/* <Image
          src={imgSrc}
          height={24}
          width={24}
          alt="screenshot"
          object-contain
        /> */}
        </div>

        <div className="flex bg-midgrey flex-col col-span-3 row-span-4 col-start-10">
          {/* <Image
          src={imgSrc}
          height={24}
          width={24}
          alt="screenshot"
          object-contain
        /> */}
        </div>
        <div className="flex bg-midgrey flex-col col-span-3 row-span-4 col-start-7">
          {/* <Image
          src={imgSrc}
          height={24}
          width={24}
          alt="screenshot"
          object-contain
        /> */}
        </div>
        <div className="flex bg-midgrey flex-col col-span-3 row-span-3 col-start-10">
          {/* <Image
          src={imgSrc}
          height={24}
          width={24}
          alt="screenshot"
          object-contain
        /> */}
        </div>

        <SocialLink
          channel="email"
          title="yo@roml3n.xyz"
          url="mailto:yo@roml3n.xyz"
          className="col-start-7"
        />
        <SocialLink
          channel="phone"
          title="yo@roml3n.xyz"
          url="tel:+254742524417"
          className="col-start-7"
        />
        <SocialLink
          channel="linkedin"
          title="in/roml3n"
          url="https://linkedin.com/in/roml3n"
          className="col-start-9"
        />
        <SocialLink
          channel="x"
          title="@roml3n.xyz"
          url="https://x.com/roml3n"
          className="col-start-9 row-start-8"
        />
      </div>
    </section>
  );
};
