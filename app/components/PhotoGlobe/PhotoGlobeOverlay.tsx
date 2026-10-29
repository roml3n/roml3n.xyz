"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";

import type { PhotoMeta } from "@/app/data/photos";
import {
  CARD_H,
  CARD_W,
  getImageRectFromCardRect,
  Postcard,
  type RectSnapshot,
} from "./Postcard";

export type { RectSnapshot };

interface Photo {
  alt?: string;
  id: string;
  imageSrc: string;
  meta?: PhotoMeta;
}

interface PhotoGlobeOverlayProps {
  photo: Photo;
  originRect: RectSnapshot;
  originLatitude: number;
  originLongitude: number;
  originRoll: number;
  returnRect: RectSnapshot | null;
  returnLatitude: number;
  returnLongitude: number;
  returnToOriginRect: boolean;
  closing: boolean;
  navDirection: 1 | -1 | null;
  onClose: () => void;
  onClosingComplete: () => void;
  onNavigate: (delta: 1 | -1) => void;
}

const EASE = [0.23, 1, 0.32, 1] as const;

const OPEN_IMAGE_DURATION = 0.34;
const OPEN_CHROME_DURATION = 0.22;
const CLOSE_CHROME_DURATION = 0.16;
const CLOSE_IMAGE_DURATION = 0.36;

const CHROME_CLIP_FULL = "inset(0% 0% 0% 0% round 1px)";
const CHROME_CLIP_HIDDEN = "inset(46% 38% 38% 38% round 1px)";

const BACKDROP_TAP_DISTANCE = 8;
const BACKDROP_NAV_HORIZONTAL_RATIO = 1.4;
const BACKDROP_NAV_DISTANCE = 90;
const BACKDROP_NAV_VELOCITY = 0.5;

type OverlayPhase =
  | "opening-image"
  | "opening-chrome"
  | "open"
  | "closing-chrome"
  | "closing-image";

function NavArrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 9.67 7.81"
      width="19"
      height="16"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      {direction === "left" ? (
        <path d="M4.438 7.028C4.438 7.028 3.612 7.812 3.612 7.812C3.612 7.812 0.000 3.906 0.000 3.906C0.000 3.906 3.612 0.000 3.612 0.000C3.612 0.000 4.438 0.770 4.438 0.770C4.438 0.770 2.044 3.332 2.044 3.332C2.044 3.332 9.674 3.332 9.674 3.332C9.674 3.332 9.674 4.466 9.674 4.466C9.674 4.466 2.044 4.466 2.044 4.466C2.044 4.466 4.438 7.028 4.438 7.028Z" fill="#FFFFFF" />
      ) : (
        <path d="M9.674 3.906C9.674 3.906 6.048 7.812 6.048 7.812C6.048 7.812 5.222 7.028 5.222 7.028C5.222 7.028 7.630 4.466 7.630 4.466C7.630 4.466 0.000 4.466 0.000 4.466C0.000 4.466 0.000 3.332 0.000 3.332C0.000 3.332 7.630 3.332 7.630 3.332C7.630 3.332 5.222 0.770 5.222 0.770C5.222 0.770 6.048 0.000 6.048 0.000C6.048 0.000 9.674 3.906 9.674 3.906Z" fill="#FFFFFF" />
      )}
    </svg>
  );
}

function ArrowKeycap({ direction }: { direction: "left" | "right" }) {
  return (
    <span className="flex size-4 items-center justify-center rounded-sm border border-b-2 border-[#DDDDDD99]">
      <svg
        viewBox="0 0 9.67 7.81"
        width="10"
        height="8"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {direction === "left" ? (
          <path d="M4.438 7.028C4.438 7.028 3.612 7.812 3.612 7.812C3.612 7.812 0.000 3.906 0.000 3.906C0.000 3.906 3.612 0.000 3.612 0.000C3.612 0.000 4.438 0.770 4.438 0.770C4.438 0.770 2.044 3.332 2.044 3.332C2.044 3.332 9.674 3.332 9.674 3.332C9.674 3.332 9.674 4.466 9.674 4.466C9.674 4.466 2.044 4.466 2.044 4.466C2.044 4.466 4.438 7.028 4.438 7.028Z" fill="#FFFFFF" />
        ) : (
          <path d="M9.674 3.906C9.674 3.906 6.048 7.812 6.048 7.812C6.048 7.812 5.222 7.028 5.222 7.028C5.222 7.028 7.630 4.466 7.630 4.466C7.630 4.466 0.000 4.466 0.000 4.466C0.000 4.466 0.000 3.332 0.000 3.332C0.000 3.332 7.630 3.332 7.630 3.332C7.630 3.332 5.222 0.770 5.222 0.770C5.222 0.770 6.048 0.000 6.048 0.000C6.048 0.000 9.674 3.906 9.674 3.906Z" fill="#FFFFFF" />
        )}
      </svg>
    </span>
  );
}

function getCenterRect() {
  const isMobile = window.innerWidth < 640;

  const width = Math.min(
    isMobile ? CARD_W * 0.8 : CARD_W,
    window.innerWidth - (isMobile ? 110 : 72),
    ((window.innerHeight - 96) * CARD_W) / CARD_H,
  );
  const height = (width * CARD_H) / CARD_W;

  return {
    height,
    left: window.innerWidth / 2 - width / 2,
    top: window.innerHeight / 2 - height / 2,
    width,
  };
}

function getFlipTransform(from: RectSnapshot, to: RectSnapshot) {
  return {
    rotate: 0,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scaleX: from.width / to.width,
    scaleY: from.height / to.height,
    x: from.left + from.width / 2 - (to.left + to.width / 2),
    y: from.top + from.height / 2 - (to.top + to.height / 2),
  };
}

const CENTER_IMAGE = {
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  rotateZ: 0,
  scaleX: 1,
  scaleY: 1,
  x: 0,
  y: 0,
};

export function PhotoGlobeOverlay({
  photo,
  originRect,
  originLatitude,
  originLongitude,
  originRoll,
  returnRect,
  returnLatitude,
  returnLongitude,
  returnToOriginRect,
  closing,
  navDirection,
  onClose,
  onClosingComplete,
  onNavigate,
}: PhotoGlobeOverlayProps) {
  const prefersReducedMotion = useReducedMotion();
  const photoRef = useRef<HTMLDivElement>(null);
  const closeCompletedRef = useRef(false);
  const phaseTimeoutRef = useRef<number | null>(null);
  const backdropDrag = useRef({ active: false, startX: 0, startY: 0, t: 0 });
  const [mounted, setMounted] = useState(false);
  const [centerRect, setCenterRect] = useState<RectSnapshot | null>(null);
  const [phase, setPhase] = useState<OverlayPhase>("opening-image");
  const [imageAtCenter, setImageAtCenter] = useState(false);

  const handleBackdropPointerDown = (event: React.PointerEvent) => {
    const target = event.target as HTMLElement;

    if (photoRef.current?.contains(target) || target.closest("button")) {
      return;
    }

    backdropDrag.current = {
      active: true,
      startX: event.clientX,
      startY: event.clientY,
      t: performance.now(),
    };
  };

  const handleBackdropPointerUp = (event: React.PointerEvent) => {
    if (!backdropDrag.current.active) {
      return;
    }

    backdropDrag.current.active = false;

    if (phase === "closing-chrome" || phase === "closing-image") {
      return;
    }

    const dx = event.clientX - backdropDrag.current.startX;
    const dy = event.clientY - backdropDrag.current.startY;
    const dt = Math.max(1, performance.now() - backdropDrag.current.t);
    const vx = dx / dt;
    const isHorizontal =
      Math.abs(dx) > Math.abs(dy) * BACKDROP_NAV_HORIZONTAL_RATIO;
    const passesNavThreshold =
      Math.abs(dx) > BACKDROP_NAV_DISTANCE ||
      Math.abs(vx) > BACKDROP_NAV_VELOCITY;

    if (isHorizontal && passesNavThreshold) {
      onNavigate(dx < 0 ? 1 : -1);
      return;
    }

    if (Math.hypot(dx, dy) < BACKDROP_TAP_DISTANCE) {
      onClose();
    }
  };

  useLayoutEffect(() => {
    setMounted(true);
    setCenterRect(getCenterRect());
  }, []);

  useLayoutEffect(() => {
    if (!mounted || centerRect === null) {
      return;
    }

    if (prefersReducedMotion) {
      setImageAtCenter(true);
      setPhase("open");
      return;
    }

    const frame = requestAnimationFrame(() => {
      setImageAtCenter(true);
    });

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [centerRect, mounted, prefersReducedMotion]);

  useLayoutEffect(() => {
    if (!closing) {
      closeCompletedRef.current = false;
      return;
    }

    if (phase === "closing-chrome" || phase === "closing-image") {
      return;
    }

    if (phase === "opening-image") {
      setImageAtCenter(true);
      setPhase("closing-image");
      return;
    }

    setPhase("closing-chrome");

    if (phaseTimeoutRef.current) {
      window.clearTimeout(phaseTimeoutRef.current);
    }

    phaseTimeoutRef.current = window.setTimeout(() => {
      setPhase("closing-image");
      phaseTimeoutRef.current = null;
    }, (prefersReducedMotion ? 0 : CLOSE_CHROME_DURATION) * 1000);
  }, [closing, phase, prefersReducedMotion]);

  useEffect(() => {
    return () => {
      if (phaseTimeoutRef.current) {
        window.clearTimeout(phaseTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (mounted && phase === "open") {
      photoRef.current?.focus();
    }
  }, [mounted, phase]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (phase === "closing-chrome" || phase === "closing-image") {
        return;
      }

      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowLeft") {
        onNavigate(-1);
      } else if (event.key === "ArrowRight") {
        onNavigate(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, onNavigate, phase]);

  if (!mounted || centerRect === null) {
    return null;
  }

  const centerImageRect = getImageRectFromCardRect(centerRect);
  const cardScale = centerRect.width / CARD_W;

  const originImageTransform = {
    ...getFlipTransform(originRect, centerImageRect),
    rotate: originRoll * 0.45,
    rotateX: -originLatitude - 8,
    rotateY: originLongitude + 12,
    rotateZ: 3,
  };

  const returnImageTransform = returnRect
    ? {
        ...getFlipTransform(returnRect, centerImageRect),
        rotate: returnToOriginRect ? originRoll * 0.45 : 0,
        rotateX: returnToOriginRect
          ? -originLatitude - 8
          : -returnLatitude,
        rotateY: returnToOriginRect
          ? originLongitude + 12
          : returnLongitude,
        rotateZ: returnToOriginRect ? 3 : 0,
      }
    : null;

  const imageTarget =
    phase === "closing-image" && returnImageTransform
      ? returnImageTransform
      : imageAtCenter
        ? CENTER_IMAGE
        : originImageTransform;

  const imageDuration = prefersReducedMotion
    ? 0
    : phase === "closing-image"
      ? CLOSE_IMAGE_DURATION
      : OPEN_IMAGE_DURATION;

  const chromeClip =
    phase === "opening-chrome" || phase === "open"
      ? CHROME_CLIP_FULL
      : CHROME_CLIP_HIDDEN;

  const chromeClipActive =
    phase === "opening-chrome" || phase === "closing-chrome";

  const chromeDuration = prefersReducedMotion
    ? 0
    : phase === "closing-chrome"
      ? CLOSE_CHROME_DURATION
      : phase === "opening-chrome"
        ? OPEN_CHROME_DURATION
        : 0;

  const chromeVisible =
    phase === "opening-chrome" ||
    phase === "open" ||
    phase === "closing-chrome";

  const backdropVisible =
    phase === "open" ||
    phase === "opening-chrome" ||
    phase === "closing-chrome";

  // Full postcard (with image) only while interactively open — fly layer handles globe↔lightbox.
  const postcardOwnsImage = phase === "open";

  const showFlyImage =
    phase === "opening-image" ||
    phase === "opening-chrome" ||
    phase === "closing-chrome" ||
    phase === "closing-image";

  const handleImageAnimationComplete = () => {
    if (phase === "opening-image") {
      setPhase("opening-chrome");

      if (phaseTimeoutRef.current) {
        window.clearTimeout(phaseTimeoutRef.current);
      }

      phaseTimeoutRef.current = window.setTimeout(() => {
        setPhase("open");
        phaseTimeoutRef.current = null;
      }, (prefersReducedMotion ? 0 : OPEN_CHROME_DURATION) * 1000);

      return;
    }

    if (phase === "closing-image") {
      if (closeCompletedRef.current) {
        return;
      }

      closeCompletedRef.current = true;
      onClosingComplete();
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 touch-none"
      onPointerDown={handleBackdropPointerDown}
      onPointerUp={handleBackdropPointerUp}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-[rgba(5,9,15,0.28)]"
        initial={false}
        style={{ willChange: "backdrop-filter, opacity" }}
        animate={{
          backdropFilter: backdropVisible ? "blur(8px)" : "blur(0px)",
          opacity: backdropVisible ? 1 : 0,
        }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.28,
          ease: EASE,
        }}
      />

      <motion.div
        ref={photoRef}
        role="dialog"
        aria-label={`Viewing ${photo.alt ?? "selected gallery photo"}`}
        aria-modal="true"
        tabIndex={-1}
        className="fixed z-10 outline-none focus:outline-none focus-visible:outline-none"
        initial={false}
        animate={{
          clipPath: chromeClipActive ? chromeClip : "none",
          opacity: chromeVisible ? 1 : 0,
        }}
        transition={{
          clipPath: {
            duration: chromeClipActive ? chromeDuration : 0,
            ease: EASE,
          },
          opacity: {
            duration: prefersReducedMotion ? 0 : 0.12,
            ease: EASE,
          },
        }}
        onClick={(event) => {
          event.stopPropagation();
        }}
        style={{
          height: centerRect.height,
          left: centerRect.left,
          overflow: phase === "open" ? "visible" : "hidden",
          top: centerRect.top,
          width: centerRect.width,
          willChange: chromeClipActive ? "clip-path, opacity" : "opacity",
        }}
      >
        <Postcard
          photo={photo}
          navDirection={navDirection}
          onNavigate={phase === "open" ? onNavigate : undefined}
          open
          closing={phase === "closing-chrome"}
          hideImage={!postcardOwnsImage}
          scale={cardScale}
        />
      </motion.div>

      {showFlyImage ? (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed z-20 overflow-hidden rounded-[1px] border border-black/10"
          initial={false}
          animate={imageTarget}
          transition={{
            duration:
              phase === "opening-chrome" || phase === "closing-chrome"
                ? 0
                : imageDuration,
            ease: EASE,
            type: "tween",
          }}
          onAnimationComplete={handleImageAnimationComplete}
          style={{
            height: centerImageRect.height,
            left: centerImageRect.left,
            top: centerImageRect.top,
            transformOrigin: "center",
            transformPerspective: 1400,
            transformStyle: "preserve-3d",
            width: centerImageRect.width,
            willChange: "transform",
            boxShadow: "3.6px 10.8px 36px rgba(0,0,0,0.08)",
            borderRadius: 1,
          }}
        >
          <Image
            src={photo.imageSrc}
            alt=""
            fill
            draggable={false}
            className="pointer-events-none select-none object-cover"
            sizes={`${Math.round(centerImageRect.width)}px`}
            priority
          />
        </motion.div>
      ) : null}

      {(["left", "right"] as const).map((side) => (
        <motion.button
          key={side}
          type="button"
          aria-label={side === "left" ? "Previous photo" : "Next photo"}
          className="fixed top-1/2 z-30 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full text-white outline-none transition-colors hover:bg-white/10 focus:outline-none focus-visible:outline-none md:flex"
          style={side === "left" ? { left: 16 } : { right: 16 }}
          initial={false}
          animate={{ opacity: phase === "open" ? 1 : 0 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.22,
            ease: EASE,
          }}
          onClick={(event) => {
            event.stopPropagation();
            onNavigate(side === "left" ? -1 : 1);
          }}
        >
          <NavArrow direction={side} />
        </motion.button>
      ))}

      <motion.div
        className="fixed left-0 right-0 z-30 flex flex-col items-center gap-5"
        style={{ top: centerRect.top + centerRect.height + 24 }}
        initial={false}
        animate={{ opacity: phase === "open" ? 1 : 0 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.22,
          ease: EASE,
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none flex flex-wrap items-center justify-center gap-x-2 gap-y-1 px-6 text-center font-montreal text-base leading-5 text-white"
        >
          <span>Click or flick to swap cards.</span>
          <span className="hidden items-center gap-1.5 md:flex">
            Hit
            <span className="flex items-center gap-1">
              <ArrowKeycap direction="left" />
              or
              <ArrowKeycap direction="right" />
            </span>
            to cycle photos.
          </span>
          <span className="md:hidden">
            Swipe to browse, tap outside to close.
          </span>
        </div>
      </motion.div>
    </div>,
    document.body,
  );
}
