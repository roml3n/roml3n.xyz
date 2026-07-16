"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

interface Photo {
  alt?: string;
  id: string;
  imageSrc: string;
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
}

const EASE = [0.16, 1, 0.3, 1] as const;

function getCenterRect() {
  const size = Math.min(
    520,
    window.innerWidth - 48,
    window.innerHeight - 96,
  );

  return {
    height: size,
    left: window.innerWidth / 2 - size / 2,
    top: window.innerHeight / 2 - size / 2,
    width: size,
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
      if (event.key === "Escape" && !closing) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closing, onClose]);

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
        animate={{
          backdropFilter:
            closing || !hasEntered ? "blur(0px)" : "blur(8px)",
          opacity: closing || !hasEntered ? 0 : 1,
        }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.45,
          ease: EASE,
        }}
      />

      <motion.div
        ref={photoRef}
        role="dialog"
        aria-label={`Viewing ${photo.alt ?? "selected gallery photo"}`}
        aria-modal="true"
        tabIndex={-1}
        className="fixed z-10 overflow-hidden rounded-[3px] border-[4px] border-white bg-white shadow-[0_30px_80px_rgba(0,0,0,0.22)]"
        initial={false}
        animate={targetTransform}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.45,
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
        <Image
          src={photo.imageSrc}
          alt={photo.alt ?? "Selected gallery photo"}
          fill
          draggable={false}
          className="pointer-events-none select-none object-cover"
          sizes="(max-width: 768px) 80vw, 520px"
        />
      </motion.div>
    </div>,
    document.body,
  );
}
