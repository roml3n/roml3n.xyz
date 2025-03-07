import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { StackIcon } from "@/app/components/StackIcon";
// import { StackIconsGrid } from "@/app/components/StackIconsGrid";

const tools = [
  {
    name: "Arc",
    description:
      "This is where my ideas take shape. I use Figma for almost everything design related...",
    website: "https://arc.net",
    imageSrc: "/images/home/stackIcons/Arc.png",
    alt: "Arc Browser Icon",
  },
  {
    name: "Figma",
    description:
      "This is where my ideas take shape. I use Figma for almost everything design related, and unrelated–from dumping ideas for my next design project, to designing custom icons and illustrations, to drafting up contracts for clients to....you name it. The UI is very intuitive and it makes sense it would have good design, seeing as it's a tool meant for design.",
    website: "https://figma.com",
    imageSrc: "/images/home/stackIcons/Arc.png",
    alt: "Arc Browser Icon",
  },

  // Add more tools here
];

export const ToolStackSection = () => {
  const [currentToolIndex, setCurrentToolIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentToolIndex((prevIndex) => (prevIndex + 1) % tools.length);
    }, 3000); // Change tool every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const handleIconClick = (index: number) => {
    setCurrentToolIndex(index);
  };

  return (
    <section className="mt-[4rem] flex flex-col self-center items-center w-screen py-16 pb-32 rounded-t-[2rem] border-t border-midgrey bg-fullwhite">
      <div className="flex flex-col w-[80%] max-w-[1024px] gap-9">
        <p className="h2">
          My tool
          <span className="p-2 h2 italic !text-mainblue">stack</span>
        </p>

        {/* Tool Icons Section */}
        <div className="flex overflow-x-auto">
          {tools.map((tool, index) => (
            <div
              key={index}
              onClick={() => handleIconClick(index)}
              className="cursor-pointer"
            >
              <StackIcon imageSrc={tool.imageSrc} alt={tool.alt} />
              <div className="icon-placeholder">{tool.name}</div>
            </div>
          ))}
        </div>

        {/* Dynamic Content Section */}
        <motion.div
          className="flex flex-col gap-4 p-4 rounded-xl bg-lightgrey"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <a
            href={tools[currentToolIndex].website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center group"
          >
            <div className="flex items-center gap-2">
              <h3 className="h4 !font-semibold !text-darkgrey">
                {tools[currentToolIndex].name}
              </h3>
              <Image
                src="/LinkArrow.svg"
                alt="arrow"
                width={18}
                height={18}
                className="flex items-center rounded-full bg-midgrey group-hover:bg-fullwhite"
              />
            </div>
          </a>
          <p className="h4">{tools[currentToolIndex].description}</p>
        </motion.div>
      </div>
    </section>
  );
};
