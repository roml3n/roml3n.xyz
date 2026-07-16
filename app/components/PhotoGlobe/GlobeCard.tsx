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

  onClick?: () => void;
}

export const GlobeCard = forwardRef<HTMLButtonElement, GlobeCardProps>(
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
      onClick,
    },
    ref,
  ) {
    const prefersReducedMotion = useReducedMotion();

    const finalScale = Math.min(
      0.94,
      scale * (0.82 + depth * 0.12),
    );

    const shadowOpacity = 0.06 + depth * 0.08;

    const shadowBlur = 16 + depth * 14;

    const shadowY = 8 + depth * 8;

    const frameShadow = "0 0 0 9px rgba(0,0,0,0.1)";

    const clickable = depth > 0.45;

    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={selected}
        aria-label={`View ${imageAlt}`}
        aria-hidden={clickable ? undefined : true}
        tabIndex={clickable ? 0 : -1}
        onClick={clickable ? onClick : undefined}
        className="absolute left-1/2 top-1/2 appearance-none border-0 bg-transparent p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
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
              whileHover={
                clickable && !prefersReducedMotion
                  ? {
                      boxShadow:
                        `${frameShadow}, 0 18px 40px rgba(0,0,0,0.18)`,
                      scale: 1.06,
                      y: -8,
                    }
                  : undefined
              }
              whileTap={
                clickable && !prefersReducedMotion
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
              className="relative h-[72px] w-[72px] overflow-hidden rounded-[3px] bg-white"
              style={{
                boxShadow: `${frameShadow}, 0 ${shadowY}px ${shadowBlur}px rgba(0,0,0,${shadowOpacity})`,
                outline: "8px solid white",
              }}
            >
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                draggable={false}
                className="pointer-events-none select-none object-cover"
                sizes="72px"
              />
            </motion.div>
          </div>
        </div>
      </button>
    );
  },
);
