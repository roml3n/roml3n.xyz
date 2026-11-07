"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type CaseStudyHeroProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  coverFill?: string;
  className?: string;
};

const CaseStudyHero = ({
  src,
  alt,
  width,
  height,
  coverFill,
  className = "w-full mb-4",
}: CaseStudyHeroProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion() === true;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !coverFill) return;

    if (reduceMotion) {
      video.pause();
      try {
        video.currentTime = 0;
      } catch {
        /* noop */
      }
      return;
    }

    void video.play().catch(() => undefined);
  }, [coverFill, reduceMotion]);

  return (
    <div className={`relative isolate overflow-hidden bg-midgrey ${className}`}>
      {coverFill ? (
        <video
          ref={videoRef}
          src={coverFill}
          loop
          muted
          playsInline
          autoPlay={!reduceMotion}
          preload="metadata"
          aria-hidden={true}
          className="pointer-events-none absolute inset-0 z-0 size-full object-cover"
        />
      ) : null}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="relative z-[1] w-full object-contain"
        priority
      />
    </div>
  );
};

export default CaseStudyHero;
