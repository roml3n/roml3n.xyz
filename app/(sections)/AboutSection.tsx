import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { StackIcon } from "@/app/components/StackIcon";

export const AboutSection = () => {
  return (
    <section className="mt-[4rem] w-screen justify-center flex py-16 bg-hoverbg">
      <div className="w-[90%] md:w-[80%] max-w-7xl grid grid-cols-12 grid-rows-9 gap-6">
        <div className="flex bg-blue-400 flex-col gap-48
         col-span-5 row-span-9">
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

        <div className="flex bg-red-400 flex-col col-span-6 row-span-9 col-start-7">
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
      </div>
    </section>
  );
};
