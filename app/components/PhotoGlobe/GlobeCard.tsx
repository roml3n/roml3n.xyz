"use client";

import Image from "next/image";

interface GlobeCardProps {
  imageSrc: string;
  x: number;
  y: number;
  z: number;
}

export function GlobeCard({
  imageSrc,
  x,
  y,
  z,
}: GlobeCardProps) {
  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        transform: `translate3d(${x}px, ${y}px, ${z}px)`,
        transformStyle: "preserve-3d",
      }}
    >
      <div className="relative h-[88px] w-[88px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-md border-[3px] border-white bg-white shadow-2xl">
        <Image
          src={imageSrc}
          alt=""
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}