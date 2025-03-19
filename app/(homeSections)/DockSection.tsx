"use client";
import React from "react";
import { FloatingDock } from "@/app/components/ui/floating-dock";
import {
  IconHomeFilled,
  IconPhotoFilled,
  IconPaletteFilled,
  IconUserFilled,
  IconBallpenFilled,
  // IconFlaskFilled,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const DockSection = ({ className }: { className: string }) => {
  return (
    <div className={cn(className)}>
      <FloatingDock
        items={[
          {
            title: "Home",
            icon: (
              <IconHomeFilled className="h-10 w-10 text-darkgrey group-hover:text-mainblue" />
            ),
            href: "/",
          },
          {
            title: "About",
            icon: (
              <IconUserFilled className="h-10 w-10 text-darkgrey group-hover:text-mainblue" />
            ),
            href: "/about",
          },
          {
            title: "Work",
            icon: (
              <IconPaletteFilled className="h-10 w-10 text-darkgrey group-hover:text-mainblue" />
            ),
            href: "/work",
          },
          {
            title: "Writing",
            icon: (
              <IconBallpenFilled className="h-10 w-10 text-darkgrey group-hover:text-mainblue" />
            ),
            href: "/writing",
          },
          // {
          //   title: "Experiments",
          //   icon: (
          //     <IconFlaskFilled className="h-10 w-10 text-darkgrey group-hover:text-mainblue" />
          //   ),
          //   href: "/experiments",
          // },
          {
            title: "Photos",
            icon: (
              <IconPhotoFilled className="h-10 w-10 text-darkgrey group-hover:text-mainblue" />
            ),
            href: "/photos",
          },
        ]}
        desktopClassName="fixed bottom-4 rounded-full !bg-lightgrey border border-solid !border-midgrey"
      />
    </div>
  );
};

export default DockSection;
