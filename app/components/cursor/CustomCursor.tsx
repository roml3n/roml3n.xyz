"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import {
  CURSOR_LABELS,
  type CursorLabel,
} from "@/app/components/cursor/cursorProps";

const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";
const TEXT_HOST_SELECTOR =
  "p, h1, h2, h3, h4, h5, h6, li, blockquote, figcaption";
const INTERACTIVE_SELECTOR =
  "a, button, input, textarea, select, label, [role='button']";
const DOT_SIZE = 12;
const LABEL_LEFT = DOT_SIZE / 2 + 8;
const IMAGE_SIZE = { width: 104, height: 72 };
const APPEAR_EASE = [0.16, 1, 0.3, 1] as const;
const MORPH_DURATION = 0.46;

const labelChipClass =
  "inline-flex items-center whitespace-nowrap px-2 py-1.5 font-montreal text-[18px] font-medium leading-none text-white";

type CursorVariant =
  | { kind: "hidden" }
  | { kind: "default" }
  | { kind: "company"; images: string[] }
  | { kind: "label"; label: CursorLabel }
  | { kind: "text"; height: number }
  | { kind: "native" };

const isCursorLabel = (value: string | undefined): value is CursorLabel => {
  if (!value) return false;
  return CURSOR_LABELS.some((label) => label === value);
};

const readTextHeight = (element: HTMLElement) => {
  const fontSize = Number.parseFloat(getComputedStyle(element).fontSize);
  if (!Number.isFinite(fontSize) || fontSize <= 0) return 16;
  return Math.round(fontSize);
};

const resolveCursorTarget = (target: EventTarget | null): CursorVariant => {
  if (!(target instanceof Element)) return { kind: "default" };

  const explicit = target.closest("[data-cursor]");
  if (explicit instanceof HTMLElement) {
    const mode = explicit.dataset.cursor;

    if (mode === "native") return { kind: "native" };
    if (mode === "default") return { kind: "default" };

    if (mode === "company") {
      const images = (explicit.dataset.cursorImages ?? "")
        .split(",")
        .map((image) => image.trim())
        .filter(Boolean)
        .slice(0, 2);

      return { kind: "company", images };
    }

    if (mode === "label" && isCursorLabel(explicit.dataset.cursorLabel)) {
      return { kind: "label", label: explicit.dataset.cursorLabel };
    }

    if (mode === "text") {
      return { kind: "text", height: readTextHeight(explicit) };
    }
  }

  const textHost = target.closest(TEXT_HOST_SELECTOR);
  if (!(textHost instanceof HTMLElement)) return { kind: "default" };
  if (textHost.closest(INTERACTIVE_SELECTOR)) return { kind: "default" };

  const editable = textHost.closest("[contenteditable]");
  if (editable instanceof HTMLElement && editable.isContentEditable) {
    return { kind: "default" };
  }

  return { kind: "text", height: readTextHeight(textHost) };
};

const variantKey = (variant: CursorVariant) => {
  if (variant.kind === "company") return `company:${variant.images.join("|")}`;
  if (variant.kind === "label") return `label:${variant.label}`;
  if (variant.kind === "text") return `text:${variant.height}`;
  return variant.kind;
};

const CustomCursor = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useMotionValue(0);
  const pillWidth = useMotionValue(0);
  const pillHeight = useMotionValue(0);
  const pillLeft = useMotionValue(DOT_SIZE / 2);
  const measureRef = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion() === true;
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>({ kind: "hidden" });

  useEffect(() => {
    const media = window.matchMedia(FINE_POINTER_QUERY);

    const syncPointer = () => {
      const active = media.matches;
      setEnabled(active);
      document.documentElement.classList.toggle("custom-cursor", active);
    };

    syncPointer();
    media.addEventListener("change", syncPointer);

    return () => {
      media.removeEventListener("change", syncPointer);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let currentKey = variantKey({ kind: "hidden" });

    const commit = (next: CursorVariant) => {
      const nextKey = variantKey(next);
      if (nextKey === currentKey) return;
      currentKey = nextKey;
      setVariant(next);
    };

    const handlePointerMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      commit(resolveCursorTarget(event.target));
    };

    const handlePointerOut = (event: PointerEvent) => {
      if (event.relatedTarget instanceof Node) return;
      commit({ kind: "hidden" });
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerout", handlePointerOut);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerout", handlePointerOut);
      setVariant({ kind: "hidden" });
    };
  }, [enabled, x, y]);

  const visible = variant.kind !== "hidden" && variant.kind !== "native";
  const labelText = variant.kind === "label" ? variant.label : "";
  const isText = variant.kind === "text";
  const shapeHeight = isText ? variant.height : DOT_SIZE;

  useLayoutEffect(() => {
    const nextWidth =
      labelText && measureRef.current ? measureRef.current.offsetWidth : 0;
    const nextHeight =
      labelText && measureRef.current ? measureRef.current.offsetHeight : 0;
    const morph = {
      duration: reduceMotion ? 0 : MORPH_DURATION,
      ease: APPEAR_EASE,
    };
    const widthControls = animate(pillWidth, nextWidth, morph);
    const heightControls = animate(pillHeight, nextHeight, morph);
    const leftControls = animate(
      pillLeft,
      labelText ? LABEL_LEFT : DOT_SIZE / 2,
      morph,
    );

    return () => {
      widthControls.stop();
      heightControls.stop();
      leftControls.stop();
    };
  }, [labelText, pillHeight, pillLeft, pillWidth, reduceMotion]);

  useEffect(() => {
    const controls = animate(opacity, visible ? 1 : 0, {
      duration: reduceMotion ? 0 : 0.12,
      ease: APPEAR_EASE,
    });

    return () => controls.stop();
  }, [opacity, reduceMotion, visible]);

  if (!enabled) return null;

  const pillTone =
    labelText === "coming soon" ? "bg-darkgrey" : "bg-mainblue";

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[10001] h-0 w-0"
      style={{ x, y, opacity }}
    >
      <span
        ref={measureRef}
        className={`invisible absolute left-0 top-0 ${labelChipClass} ${pillTone}`}
      >
        {labelText}
      </span>

      <AnimatePresence>
        {variant.kind === "company"
          ? variant.images.map((src, index) => {
              const imageSet = variant.images.join("|");
              const rotation = index === 1 ? 6 : 0;

              return (
                <motion.img
                  key={`${imageSet}:${src}:${index}`}
                  src={src}
                  alt=""
                  width={IMAGE_SIZE.width}
                  height={IMAGE_SIZE.height}
                  draggable={false}
                  className="pointer-events-none absolute max-w-none rounded-md object-cover shadow-[0_10px_24px_rgba(15,23,42,0.16)]"
                  style={{
                    left: 8 + index * 4,
                    top: 8 + index * 4,
                    width: IMAGE_SIZE.width,
                    height: IMAGE_SIZE.height,
                    maxWidth: "none",
                    zIndex: variant.images.length - index,
                    originX: 0,
                    originY: 0,
                  }}
                  initial={
                    reduceMotion
                      ? { opacity: 0, rotate: rotation }
                      : { opacity: 0, scale: 0.92, rotate: rotation }
                  }
                  animate={
                    reduceMotion
                      ? { opacity: 1, rotate: rotation }
                      : { opacity: 1, scale: 1, rotate: rotation }
                  }
                  exit={
                    reduceMotion
                      ? { opacity: 0, rotate: rotation }
                      : { opacity: 0, scale: 0.92, rotate: rotation }
                  }
                  transition={{
                    duration: reduceMotion ? 0 : 0.18,
                    ease: APPEAR_EASE,
                  }}
                />
              );
            })
          : null}
      </AnimatePresence>

      <motion.div
        className={
          isText && !reduceMotion
            ? "custom-cursor-caret absolute left-0 top-0 bg-mainblue"
            : "absolute left-0 top-0 bg-mainblue"
        }
        style={{ x: "-50%", y: "-50%" }}
        initial={false}
        animate={{
          width: isText ? 2 : DOT_SIZE,
          height: shapeHeight,
          borderRadius: isText ? 1 : DOT_SIZE / 2,
        }}
        transition={{
          duration: reduceMotion ? 0 : MORPH_DURATION,
          ease: APPEAR_EASE,
        }}
      />

      <motion.div
        className={`absolute overflow-hidden ${pillTone}`}
        style={{
          left: pillLeft,
          top: 0,
          y: "-50%",
          width: pillWidth,
          height: pillHeight,
        }}
      >
        <span className={labelChipClass}>{labelText}</span>
      </motion.div>
    </motion.div>
  );
};

export default CustomCursor;
