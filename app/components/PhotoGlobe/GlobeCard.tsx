"use client";

import { forwardRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface GlobeCardProps {
  imageSrc: string;

  x: number;
  y: number;
  z: number;

  roll: number;

  depth: number;

  scale: number;

  selected?: boolean;

  hidden?: boolean;

  onClick?: () => void;
}

export const GlobeCard = forwardRef<HTMLButtonElement, GlobeCardProps>(
  function GlobeCard(
    {
      imageSrc,
      x,
      y,
      roll,
      depth,
      scale,
      selected = false,
      hidden = false,
      onClick,
    },
    ref,
  ) {
    const finalScale = scale * (0.82 + depth * 0.18);

    const shadowOpacity = 0.06 + depth * 0.08;

    const shadowBlur = 16 + depth * 14;

    const shadowY = 8 + depth * 8;

    const clickable = depth > 0.45;

    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={selected}
        onClick={clickable ? onClick : undefined}
        className="absolute left-1/2 top-1/2 appearance-none border-0 bg-transparent p-0"
        style={{
          transform: `
            translate(-50%, -50%)
            translate3d(${x}px, ${y}px, 0px)
            rotateZ(${roll}deg)
            scale(${finalScale})
          `,
          zIndex: Math.round(depth * 1000),
          transformOrigin: "center",
          pointerEvents: clickable ? "auto" : "none",
          visibility: hidden ? "hidden" : "visible",
          willChange: "transform",
        }}
      >
        <motion.div
          whileHover={
            clickable
              ? {
                  boxShadow:
                    "0 18px 40px rgba(0,0,0,0.18)",
                  scale: 1.06,
                  y: -8,
                }
              : undefined
          }
          whileTap={
            clickable
              ? {
                  scale: 0.98,
                }
              : undefined
          }
          transition={{
            type: "spring",
            stiffness: 280,
            damping: 22,
          }}
          className="relative h-[104px] w-[104px] overflow-hidden rounded-[3px] border-[4px] border-white bg-white"
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
            sizes="104px"
          />
        </motion.div>
      </button>
    );
  },
);
