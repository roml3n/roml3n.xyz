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
  /**
   * depth
   *
   * Front:
   * z = +300
   *
   * Back:
   * z = -300
   */
  const radius = 300;

  const depth = (z + radius) / (radius * 2);

  const scale = 0.72 + depth * 0.42;

  const opacity = 0.2 + depth * 0.8;

  const brightness = 0.55 + depth * 0.45;

  const blur = (1 - depth) * 1.6;

  const shadow = depth * 32;

  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        transform: `
          translate3d(${x}px, ${y}px, ${z}px)
          rotateZ(${roll}deg)
          scale(${scale})
        `,
        transformStyle: "preserve-3d",

        opacity,

        zIndex: Math.round(depth * 1000),

        filter: `
          brightness(${brightness})
          blur(${blur}px)
        `,

        pointerEvents: depth > 0.45 ? "auto" : "none",
      }}
    >
      <div
        className="relative h-[104px] w-[104px]
                   -translate-x-1/2 -translate-y-1/2
                   overflow-hidden
                   rounded-[2px]
                   border-[4px]
                   border-white
                   bg-white"
        style={{
          boxShadow: `0 ${shadow}px ${shadow * 1.5}px rgba(0,0,0,.16)`,
        }}
      >
        <Image
          src={imageSrc}
          alt=""
          fill
          draggable={false}
          className="pointer-events-none object-cover select-none"
        />
      </div>
    </div>
  );
}