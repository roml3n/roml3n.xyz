"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type PanInfo,
} from "framer-motion";
import {
  useCallback,
  useEffect,
  useState,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from "react";

import { AboutStickerArt } from "./AboutStickerArt";
import type { AboutStickerDef } from "@/app/data/aboutStickers";
import { insetToRect } from "@/app/data/aboutStickers";

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const LIFT_PX = 6;

type LayoutBox = {
  left: number;
  top: number;
  width: number;
  height: number;
};

type DraggableAppStickerProps = {
  sticker: AboutStickerDef;
  anchor: LayoutBox;
  boundsRef: RefObject<HTMLDivElement | null>;
  zIndex: number;
};

export const DraggableAppSticker = ({
  sticker,
  anchor,
  boundsRef,
  zIndex,
}: DraggableAppStickerProps) => {
  const reducedMotion = useReducedMotion();
  const [isDragging, setIsDragging] = useState(false);

  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const liftY = useMotionValue(0);
  const yTotal = useTransform(
    [dragY, liftY],
    ([drag, lift]) => (drag as number) + (lift as number),
  );

  const skewX = useSpring(0, { stiffness: 320, damping: 22, mass: 0.35 });
  const skewY = useSpring(0, { stiffness: 320, damping: 22, mass: 0.35 });
  const scale = useSpring(1, { stiffness: 400, damping: 28 });

  const rect = insetToRect(sticker.inset);
  const baseLeft = anchor.left + (rect.leftPct / 100) * anchor.width;
  const baseTop = anchor.top + (rect.topPct / 100) * anchor.height;
  const width = (rect.widthPct / 100) * anchor.width;
  const height = (rect.heightPct / 100) * anchor.height;

  const handleDrag = useCallback(
    (_: unknown, info: PanInfo) => {
      if (reducedMotion) return;
      skewX.set(clamp(info.velocity.x * 0.015, -14, 14));
      skewY.set(clamp(info.velocity.y * 0.015, -14, 14));
    },
    [reducedMotion, skewX, skewY],
  );

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
    if (!reducedMotion) {
      liftY.set(-LIFT_PX);
      scale.set(1.04);
    }
  }, [liftY, reducedMotion, scale]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    liftY.set(0);
    skewX.set(0);
    skewY.set(0);
    scale.set(1);
  }, [liftY, skewX, skewY, scale]);

  useEffect(() => {
    dragX.set(0);
    dragY.set(0);
  }, [anchor.left, anchor.top, anchor.width, anchor.height, dragX, dragY]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const useCssShadow = !sticker.builtInShadow;
  const stickerShadow = useCssShadow
    ? "drop-shadow(0 10px 18px rgba(73, 80, 93, 0.22)) drop-shadow(0 2px 4px rgba(73, 80, 93, 0.12))"
    : "none";
  const stickerShadowDragging = useCssShadow
    ? "drop-shadow(0 22px 32px rgba(73, 80, 93, 0.28)) drop-shadow(0 8px 12px rgba(73, 80, 93, 0.16))"
    : "drop-shadow(0 14px 22px rgba(73, 80, 93, 0.22))";

  return (
    <motion.div
      role="img"
      aria-label={sticker.label}
      tabIndex={0}
      className="absolute touch-none cursor-grab overflow-visible outline-none active:cursor-grabbing select-none focus-visible:ring-2 focus-visible:ring-mainblue/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f5f5]"
      style={{
        left: baseLeft,
        top: baseTop,
        width,
        height,
        zIndex: isDragging ? 50 : zIndex,
        x: dragX,
        y: yTotal,
        skewX,
        skewY,
        scale,
        filter: isDragging ? stickerShadowDragging : stickerShadow,
        willChange: "transform",
      }}
      drag={!reducedMotion}
      dragMomentum={false}
      dragElastic={reducedMotion ? 0 : 0.14}
      dragConstraints={boundsRef}
      onPointerDown={handlePointerDown}
      onDrag={handleDrag}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      transition={{
        filter: { duration: 0.16, ease: [0.23, 1, 0.32, 1] },
      }}
    >
      <AboutStickerArt sticker={sticker} />
    </motion.div>
  );
};
