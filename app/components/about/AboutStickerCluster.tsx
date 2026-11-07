"use client";

import { useLayoutEffect, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";

import { aboutStickerDefs, ABOUT_STICKER_FIELD_ASPECT } from "@/app/data/aboutStickers";
import { DraggableAppSticker } from "./DraggableAppSticker";

type LayoutBox = {
  left: number;
  top: number;
  width: number;
  height: number;
};

const emptyBox: LayoutBox = { left: 0, top: 0, width: 0, height: 0 };

type AboutStickerClusterProps = {
  boundsRef: RefObject<HTMLDivElement | null>;
};

export const AboutStickerCluster = ({ boundsRef }: AboutStickerClusterProps) => {
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const [anchor, setAnchor] = useState<LayoutBox>(emptyBox);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const measure = () => {
      const boundsEl = boundsRef.current;
      const anchorEl = anchorRef.current;
      if (!boundsEl || !anchorEl) return;

      const boundsRect = boundsEl.getBoundingClientRect();
      const anchorRect = anchorEl.getBoundingClientRect();

      setAnchor({
        left: anchorRect.left - boundsRect.left,
        top: anchorRect.top - boundsRect.top,
        width: anchorRect.width,
        height: anchorRect.height,
      });
      setReady(anchorRect.width > 0 && boundsRect.width > 0);
    };

    measure();
    const raf = requestAnimationFrame(measure);

    const ro = new ResizeObserver(measure);
    if (boundsRef.current) ro.observe(boundsRef.current);
    const anchorEl = anchorRef.current;
    if (anchorEl) ro.observe(anchorEl);

    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure);
    };
  }, [boundsRef]);

  const stickers =
    ready && boundsRef.current
      ? aboutStickerDefs.map((sticker, index) => (
          <DraggableAppSticker
            key={sticker.id}
            sticker={sticker}
            anchor={anchor}
            boundsRef={boundsRef}
            zIndex={10 + index}
          />
        ))
      : null;

  return (
    <>
      <div
        ref={anchorRef}
        className="relative w-full shrink-0"
        style={{ aspectRatio: ABOUT_STICKER_FIELD_ASPECT }}
        aria-hidden
      />
      {stickers && boundsRef.current
        ? createPortal(stickers, boundsRef.current)
        : null}
    </>
  );
};
