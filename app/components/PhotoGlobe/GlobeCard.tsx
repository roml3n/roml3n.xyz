"use client";

import Image from "next/image";

interface GlobeCardProps {
  imageSrc: string;

  x: number;
  y: number;
  z: number;

  roll: number;

  depth: number;
}

export function GlobeCard({
  imageSrc,
  x,
  y,
  z,
  roll,
  depth,
}: GlobeCardProps) {
  const scale = 0.72 + depth * 0.38;

  const brightness = 0.82 + depth * 0.18;

  const blur = (1 - depth) * 0.35;

  const shadowOpacity = 0.06 + depth * 0.12;

  const shadowY = 8 + depth * 10;

  const shadowBlur = 20 + depth * 12;

  const clickable = depth > 0.35;

  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        transform: `
          translate3d(${x}px, ${y}px, ${z}px)
          translate(-50%, -50%)
          rotateZ(${roll}deg)
          scale(${scale})
        `,
        transformStyle: "preserve-3d",

        zIndex: Math.round(depth * 1000),

        filter: `
          brightness(${brightness})
          blur(${blur}px)
        `,

        pointerEvents: clickable ? "auto" : "none",

        willChange: "transform, filter",
      }}
    >
      <div
        className="relative h-[104px] w-[104px] overflow-hidden rounded-[2px] border-[4px] border-white bg-white"
        style={{
          boxShadow: `0 ${shadowY}px ${shadowBlur}px rgba(0,0,0,${shadowOpacity})`,
        }}
      >
        <Image
          src={imageSrc}
          alt=""
          fill
          draggable={false}
          className="pointer-events-none select-none object-cover"
        />
      </div>
    </div>
  );
}