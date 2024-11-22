import React from 'react';
import { FloatingDock } from "@/app/components/ui/floating-dock";
import {
    IconHomeFilled,
    IconPhotoFilled,
    IconPaletteFilled,
    IconUserFilled,
    IconBallpenFilled,
    IconFlaskFilled,
  } from "@tabler/icons-react";

const DockSection = ({ className } : { className: string }) => {
  return (
    <div className={className}>
        <FloatingDock
          items={[
            {
              title: "Home",
              icon: (
                <IconHomeFilled className="h-12 w-12 text-darkgrey group-hover:text-mainblue" />
              ),
              href: "#",
            },
            {
              title: "About",
              icon: (
                <IconUserFilled className="h-12 w-12 text-darkgrey group-hover:text-mainblue" />
              ),
              href: "#",
            },
            {
              title: "Work",
              icon: (
                <IconPaletteFilled className="h-12 w-12 text-darkgrey group-hover:text-mainblue" />
              ),
              href: "#",
            },
            {
              title: "Writing",
              icon: (
                <IconBallpenFilled className="h-12 w-12 text-darkgrey group-hover:text-mainblue" />
              ),
              href: "#",
            },
            {
              title: "Experiments",
              icon: (
                <IconFlaskFilled className="h-12 w-12 text-darkgrey group-hover:text-mainblue" />
              ),
              href: "#",
            },
            {
              title: "Photos",
              icon: (
                <IconPhotoFilled className="h-12 w-12 text-darkgrey group-hover:text-mainblue" />
              ),
              href: "#",
            },
          ]}
          desktopClassName="fixed bottom-4 rounded-full !bg-lightgrey border border-solid !border-midgrey"
        />
    </div>
  )
}

export default DockSection