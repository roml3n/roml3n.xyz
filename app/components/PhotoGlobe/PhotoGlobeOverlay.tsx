"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion } from "framer-motion";

interface Photo {
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

export function PhotoGlobeOverlay({
  photo,
  originRect,
  originRoll,
  returnRect,
  closing,
  onClose,
  onClosed,
}: PhotoGlobeOverlayProps) {
  const [mounted, setMounted] = useState(false);
  const [centerRect, setCenterRect] = useState<RectSnapshot | null>(null);

  useEffect(() => {
    setMounted(true);
    setCenterRect(getCenterRect());
  }, []);

  if (!mounted || centerRect === null) {
    return null;
  }

  const targetRect = closing && returnRect ? returnRect : centerRect;

  return createPortal(
    <div
      className="fixed inset-0 z-50"
      onClick={onClose}
    >
      <motion.div
        className="fixed overflow-hidden rounded-[3px] border-[4px] border-white bg-white shadow-[0_30px_80px_rgba(0,0,0,0.22)]"
        initial={{
          height: originRect.height,
          left: originRect.left,
          rotate: originRoll,
          top: originRect.top,
          width: originRect.width,
        }}
        animate={{
          height: targetRect.height,
          left: targetRect.left,
          rotate: closing ? originRoll : 0,
          top: targetRect.top,
          width: targetRect.width,
        }}
        transition={{
          duration: 0.45,
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
      >
        <Image
          src={photo.imageSrc}
          alt=""
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
