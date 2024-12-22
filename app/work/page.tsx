"use client";
import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { WorkCard } from "../components/WorkCard";
import Image from "next/image";

const Work = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const cards = document.querySelectorAll(".work-card");
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();

        if (rect.top > 0 && rect.top < window.innerHeight / 2) {
          setActiveIndex(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const workItems = [
    {
      title: "Redesigning e-commerce to boost loyalty, sales, and satisfaction",
      tag: "Product Design",
      image: "/images/work/work-bigstore.png",
    },
    {
      title: "Enhancing financial inclusion for new Americans and immigrants",
      tag: "Product Design",
      image: "/images/work/work-waya.png",
    },
    {
      title: "Crafting a high-stakes experience for sports betting enthusiasts",
      tag: "UI Design",
      image: "/images/work/work-tucheze.png",
    },
    {
      title: "Brandin for exsgdh",
      tag: "UI Design",
      image: "/images/work/work-waya.png",
    },
  ];

  return (
    <section className="m-auto items-center w-full gap-16">
      <main className="flex flex-col mt-24 gap-16 items-center">
        <h1 className="h1 w-full">Work</h1>

        <div
          id="sticky-container"
          className="w-full max-w-[1274px] flex flex-col gap-4 sticky"
        >
          {workItems.map((item, index) => (
            <WorkCard key={index} index={index} activeIndex={activeIndex}>
              <div className="flex w-full justify-between self-center">
                <h2 className="h2 w-[75%] flex-wrap">{item.title}</h2>
                <div className="self-start px-4 py-2 bg-almostwhite border border-solid border-midgrey rounded-full w-fit">
                  <p className="h4">{item.tag}</p>
                </div>
              </div>

              <Image
                src={item.image}
                alt={item.title}
                className="w-[80%] h-auto rounded-md mt-4"
                width={480}
                height={480}
              />
            </WorkCard>
          ))}
        </div>
      </main>

      <Footer />
    </section>
  );
};

export default Work;
