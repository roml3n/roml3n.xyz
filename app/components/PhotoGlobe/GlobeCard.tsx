"use client";

import { forwardRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

interface GlobeCardProps {
  imageAlt: string;
  imageSrc: string;
  x: number;
  y: number;
  z: number;
  latitude: number;
  longitude: number;
  depth: number;
  scale: number;
  selected?: boolean;
  hidden?: boolean;
  buttonRef?: React.Ref<HTMLButtonElement>;
  onClick?: () => void;
}

export const GlobeCard = forwardRef<HTMLDivElement, GlobeCardProps>(
  function GlobeCard(
    {
      imageAlt,
      imageSrc,
      x,
      y,
      z,
      latitude,
      longitude,
      depth,
      scale,
      selected = false,
      hidden = false,
      buttonRef,
      onClick,
    },
    faceRef,
  ) {
    const prefersReducedMotion = useReducedMotion();

    const finalScale = Math.min(
      0.94,
      scale * (0.82 + depth * 0.12),
    );

    const shadowOpacity = 0.06 + depth * 0.08;
    const shadowBlur = 16 + depth * 14;
    const shadowY = 8 + depth * 8;

    const clickable = depth > 0.45;

    return (
      <button
        ref={buttonRef}
        type="button"
        aria-pressed={selected}
        aria-label={`View ${imageAlt}`}
        aria-hidden={clickable ? undefined : true}
        tabIndex={clickable ? 0 : -1}
        onClick={clickable ? onClick : undefined}
        className="absolute left-1/2 top-1/2 appearance-none border-0 bg-transparent p-0 outline-none focus:outline-none focus-visible:outline-none"
        style={{
          transform: `
            translate(-50%, -50%)
            translate3d(${x}px, ${y}px, ${z}px)
            scale(${finalScale})
          `,
          zIndex: Math.round(depth * 1000),
          transformOrigin: "center",
          transformStyle: "preserve-3d",
          pointerEvents: clickable ? "auto" : "none",
          cursor: clickable ? "pointer" : "default",
          touchAction: "none",
          visibility: hidden ? "hidden" : "visible",
          willChange: "transform",
        }}
      >
        <div
          style={{
            transform: `rotateY(${longitude}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          <div
            style={{
              transform: `rotateX(${-latitude}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            <motion.div
              ref={faceRef}
              whileHover={
                clickable && !prefersReducedMotion ? { scale: 1.1 } : undefined
              }
              transition={{
                duration: 0.16,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="relative h-[72px] w-[54px] overflow-hidden rounded-[1px] border border-black/10"
              style={{
                borderRadius: 1,
                boxShadow: `0 ${shadowY}px ${shadowBlur}px rgba(0,0,0,${shadowOpacity})`,
              }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-[1px]">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  draggable={false}
                  className="pointer-events-none select-none object-cover"
                  sizes="54px"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </button>
    );
  },
);
