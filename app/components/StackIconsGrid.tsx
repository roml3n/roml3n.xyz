import React from "react";
import { StackIcon } from "./StackIcon";

const icons = [
  { imageSrc: "/images/home/stackIcons/Arc.png", alt: "Arc Browser Icon" },
  { imageSrc: "/images/home/stackIcons/Figma.png", alt: "Figma Icon" },
  { imageSrc: "/images/home/stackIcons/Framer.png", alt: "Framer Icon" },
  { imageSrc: "/images/home/stackIcons/Illustrator.png", alt: "Illustrator Icon" },
  { imageSrc: "/images/home/stackIcons/Notion.png", alt: "Notion Icon" },
  { imageSrc: "/images/home/stackIcons/Photoshop.png", alt: "Photoshop Icon" },
  { imageSrc: "/images/home/stackIcons/Protopie.png", alt: "Protopie Icon" },
  { imageSrc: "/images/home/stackIcons/Raycast.png", alt: "Raycast Icon" },
  { imageSrc: "/images/home/stackIcons/Spotify.png", alt: "Spotify Icon" },
  { imageSrc: "/images/home/stackIcons/Todoist.png", alt: "Todoist Icon" },
];

export const StackIconsGrid = () => {
  return (
    <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
      {icons.map((icon, index) => (
        <StackIcon key={index} imageSrc={icon.imageSrc} alt={icon.alt} />
      ))}
    </div>
  );
};

export default StackIconsGrid;
