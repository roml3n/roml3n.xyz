"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";

import type { PhotoMeta } from "@/app/data/photos";
import { CARD_H, CARD_W, Postcard } from "./Postcard";

interface Photo {
  alt?: string;
  id: string;
  imageSrc: string;
  meta?: PhotoMeta;
}

export interface RectSnapshot {
  height: number;
  left: number;
  top: number;
  width: number;
}

interface PhotoGlobeOverlayProps {
  photo: Photo;
  originRect: RectSnapshot;
  originRoll: number;
  returnRect: RectSnapshot | null;
  closing: boolean;
  onClose: () => void;
  onClosed: () => void;
  onNavigate: (delta: 1 | -1) => void;
}

const EASE = [0.16, 1, 0.3, 1] as const;

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
  const width = Math.min(
    CARD_W,
    window.innerWidth - 48,
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
    scaleX: from.width / to.width,
    scaleY: from.height / to.height,
    x:
      from.left + from.width / 2 -
      (to.left + to.width / 2),
    y:
      from.top + from.height / 2 -
      (to.top + to.height / 2),
  };
}

export function PhotoGlobeOverlay({
  photo,
  originRect,
  originRoll,
  returnRect,
  closing,
  onClose,
  onClosed,
  onNavigate,
}: PhotoGlobeOverlayProps) {
  const prefersReducedMotion = useReducedMotion();
  const photoRef = useRef<HTMLDivElement>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [centerRect, setCenterRect] = useState<RectSnapshot | null>(null);

  useEffect(() => {
    setMounted(true);
    setCenterRect(getCenterRect());
  }, []);

  useEffect(() => {
    if (mounted && !closing) {
      photoRef.current?.focus();
    }
  }, [closing, mounted]);

  useEffect(() => {
    if (!mounted || centerRect === null || closing) {
      return;
    }

    if (prefersReducedMotion) {
      setHasEntered(true);
      return;
    }

    const frame = requestAnimationFrame(() => {
      setHasEntered(true);
    });

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [centerRect, closing, mounted, prefersReducedMotion]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (closing) {
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
  }, [closing, onClose, onNavigate]);

  if (!mounted || centerRect === null) {
    return null;
  }

  const returnTransform = returnRect
    ? getFlipTransform(returnRect, centerRect)
    : null;

  const originTransform = {
    ...getFlipTransform(originRect, centerRect),
    rotate: originRoll,
  };

  const centerTransform = {
    rotate: 0,
    scaleX: 1,
    scaleY: 1,
    x: 0,
    y: 0,
  };

  const targetTransform = closing && returnTransform
    ? { ...returnTransform, rotate: originRoll }
    : hasEntered
      ? centerTransform
    : {
        ...originTransform,
      };

  return createPortal(
    <div
      className="fixed inset-0 z-50"
      onClick={onClose}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-[rgba(5,9,15,0.28)]"
        initial={false}
        style={{ willChange: "backdrop-filter, opacity" }}
        animate={{
          backdropFilter:
            closing || !hasEntered ? "blur(0px)" : "blur(8px)",
          opacity: closing || !hasEntered ? 0 : 1,
        }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.5,
          ease: EASE,
        }}
      />

      <motion.div
        ref={photoRef}
        role="dialog"
        aria-label={`Viewing ${photo.alt ?? "selected gallery photo"}`}
        aria-modal="true"
        tabIndex={-1}
        className="fixed z-10"
        initial={false}
        animate={targetTransform}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.5,
          ease: EASE,
        }}
        onAnimationComplete={() => {
          if (closing) {
            onClosed();
          }
        }}
        onClick={(event) => {
          event.stopPropagation();
        }}
        style={{
          height: centerRect.height,
          left: centerRect.left,
          top: centerRect.top,
          willChange: "transform",
          width: centerRect.width,
        }}
      >
        <Postcard
          photo={photo}
          open={hasEntered && !closing}
          scale={centerRect.width / CARD_W}
        />
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 right-0 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 px-6 text-center font-montreal text-base leading-5 text-white"
        style={{ top: centerRect.top + centerRect.height + 24 }}
        initial={false}
        animate={{ opacity: closing || !hasEntered ? 0 : 1 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.5,
          ease: EASE,
        }}
      >
        <span>Click or flick to swap cards.</span>
        <span className="flex items-center gap-1.5">
          Hit
          <span className="flex items-center gap-1">
            <ArrowKeycap direction="left" />
            or
            <ArrowKeycap direction="right" />
          </span>
          to cycle photos.
        </span>
      </motion.div>
    </div>,
    document.body,
  );
}
