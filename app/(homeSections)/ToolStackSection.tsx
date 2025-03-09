import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { StackIcon } from "@/app/components/StackIcon";

const tools = [
  {
    name: "Raycast",
    description:
      "This is quite literally my shortcut to everything. I use it about 1000 times a day, and it has replaced Spotlight on my Mac. It's proven quite handy and is very...instrumental, to how my workflow has evolved in recent times. That calculator and clipboard history are probably my most favorite features! Nice work, Tom! 👏🏾",
    website: "https://raycast.com/?via=roml3n",
    imageSrc: "/images/home/stackIcons/Raycast.png",
    alt: "Icon",
  },
  {
    name: "Arc",
    description:
      "My internet, my way. Arc has been my go-to web browser of choice and I remain one of its biggest advocators (unofficially, of course. Sponsor me, BCNY 😉). Its neat organization features and AI integration are some artistic works of engineering I find very useful.",
    website: "https://arc.net",
    imageSrc: "/images/home/stackIcons/Arc.png",
    alt: "Icon",
  },
  {
    name: "Todoist",
    description:
      "Tasks have never been so fun to check off! I use Todoist as my main task manager (and, occassionally, shopping list). It works just as you'd expect, and integrates to other apps I use quite frequently (Calendar, Notion, Slack).",
    website: "https://todoist.com",
    imageSrc: "/images/home/stackIcons/Todoist.png",
    alt: "Icon",
  },
  {
    name: "Notion",
    description:
      "I use Notion as my second brain–I dump everything in there, from random thoughts to writings and rants to ideas to projects I'm managing. With its vast template library and community, it makes sense why Notion is top of the food chain in productivity apps.",
    website: "https://notion.so",
    imageSrc: "/images/home/stackIcons/Notion.png",
    alt: "Icon",
  },
  {
    name: "Figma",
    description:
      "This is where my ideas take shape. I use Figma for almost everything design related, and unrelated–from dumping ideas for my next design project, to designing custom icons and illustrations, to drafting up contracts for clients to....you name it. The UI is very intuitive and it makes sense it would have good design, seeing as it's a tool meant for design.",
    website: "https://figma.com",
    imageSrc: "/images/home/stackIcons/Figma.png",
    alt: "Icon",
  },
  {
    name: "Framer",
    description:
      "I, more recently, started to use Framer not as a web builder, though it excels flawlessy at that (my first portfolio was  built on Framer), but as the final boss of prototyping. I can communicate interactions and layouts very clearly to engineers when I use this as it shows what the final product should look like on the web, because, well, it is the web.",
    website: "https://framer.com",
    imageSrc: "/images/home/stackIcons/Framer.png",
    alt: "Icon",
  },
  {
    name: "Adobe Photoshop",
    description:
      "The GOAT of graphic design, this needs no introduction. Photoshop was the first design app I ever used–well, first app that brought me money–and I've been using it since. What's that you say? I'm a pro? Why thank you, kind stranger, I can't disagree to that 😊 *blushes quite violently ",
    website: "https://adobe.com/photoshop",
    imageSrc: "/images/home/stackIcons/Photoshop.png",
    alt: "Icon",
  },
  {
    name: "Adobe Illustrator",
    description:
      "The bulkier, more serious brother to Photoshop. Illustrator has come in clutch sooo many times I can't count. I use this for brand identity design and drawing up quick illustrations. It's vector file editing superpower allows for so many applications; I recently designed two books using this (more on that soon).",
    website: "https://adobe.com/illustrator",
    imageSrc: "/images/home/stackIcons/Illustrator.png",
    alt: "Icon",
  },
  {
    name: "Protopie",
    description:
      "Protopie feels like an honorable mention in this list. I used to use it quite a lot to make mobile app prototypes and it was really great, I loved it. I've started playing around with Play so I haven't really used it a lot recently. The Import from Figma feature literally saved me HOURS of work.",
    website: "https://protopie.io",
    imageSrc: "/images/home/stackIcons/Protopie.png",
    alt: "Icon",
  },
  {
    name: "Spotify",
    description:
      "When I'm in the deep flow state, I tune out the world by pumping sick jams from my favorite playlists. My music taste evolves a lot, and I vibe to a bunch of different genres, though you'll mostly find me listening to the Chill Rap subgenre (give me JID, J Cole, Jack Harlow, Joyner Lucas–wait, they all have names starting with the letter J? I promise it wasn't intentional).",
    website: "https://spotify.com",
    imageSrc: "/images/home/stackIcons/Spotify.png",
    alt: "Icon",
  },
];

export const ToolStackSection = () => {
  const [currentToolIndex, setCurrentToolIndex] = useState(0);

  const changeToolIndex = useCallback(() => {
    setCurrentToolIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % tools.length;
      console.log(`Changing tool to: ${tools[newIndex].name}`);
      return newIndex;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(changeToolIndex, 7000);
    return () => clearInterval(interval);
  }, [changeToolIndex]);

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
        <div className="grid grid-cols-5 md:grid-cols-10 gap-2 w-full">
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              onClick={() => handleIconClick(index)}
              className="cursor-pointer"
              animate={{
                borderColor:
                  index === currentToolIndex ? "#0D85DB" : "transparent",
                borderWidth: 3,
                borderRadius: 18,
                boxShadow:
                  index === currentToolIndex
                    ? "0 0 15px 0 rgba(13, 133, 219, 0.4)" // Subtle glow
                    : "none",
              }}
              transition={{ duration: 0.5 }}
            >
              <StackIcon imageSrc={tool.imageSrc} alt={tool.alt} />
            </motion.div>
          ))}
        </div>

        {/* Dynamic Content Section */}
        <motion.div
          key={tools[currentToolIndex].name}
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
