"use client";

import Image from "next/image";

interface GlobeCardProps {
  imageSrc: string;
  x: number;
  y: number;
  z: number;
  roll: number;
}

export function GlobeCard({
  imageSrc,
  x,
  y,
  z,
  roll,
}: GlobeCardProps) {
  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        transform: `
          translate3d(${x}px, ${y}px, ${z}px)
          rotateZ(${roll}deg)
        `,
        transformStyle: "preserve-3d",
      }}
    >
      <div className="relative h-[92px] w-[92px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-md border-[4px] border-white bg-white shadow-xl">
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