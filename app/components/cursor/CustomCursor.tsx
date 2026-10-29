"use client";

import { useEffect, useState } from "react";
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
const LABEL_OFFSET = 14;
const IMAGE_SIZE = { width: 104, height: 72 };
const APPEAR_EASE = [0.16, 1, 0.3, 1] as const;

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

  useEffect(() => {
    const controls = animate(opacity, visible ? 1 : 0, {
      duration: reduceMotion ? 0 : 0.12,
      ease: APPEAR_EASE,
    });

    return () => controls.stop();
  }, [opacity, reduceMotion, visible]);

  if (!enabled) return null;

  const showDot =
    variant.kind === "default" ||
    variant.kind === "company" ||
    variant.kind === "label";

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[10001] h-0 w-0"
      style={{ x, y, opacity }}
    >
      <AnimatePresence>
        {showDot ? (
          <motion.div
            key="cursor-dot"
            className="absolute left-0 top-0 size-3 rounded-full bg-mainblue"
            style={{ x: "-50%", y: "-50%" }}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
            transition={{ duration: reduceMotion ? 0 : 0.12, ease: APPEAR_EASE }}
          />
        ) : null}
        {variant.kind === "text" ? (
          <motion.div
            key="cursor-caret"
            className="absolute left-0 top-0"
            style={{ height: variant.height, x: "-50%", y: "-50%" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.12, ease: APPEAR_EASE }}
          >
            <span
              className={
                reduceMotion
                  ? "block h-full w-0.5 bg-mainblue"
                  : "custom-cursor-caret block h-full w-0.5 bg-mainblue"
              }
            />
          </motion.div>
        ) : null}
      </AnimatePresence>

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

      <AnimatePresence mode="wait">
        {variant.kind === "label" ? (
          <motion.div
            key={variant.label}
            className={
              variant.label === "coming soon"
                ? "pointer-events-none absolute top-0 whitespace-nowrap rounded-sm bg-darkgrey px-4 py-1.5 font-montreal text-sm font-medium leading-none text-white"
                : "pointer-events-none absolute top-0 whitespace-nowrap rounded-sm bg-mainblue px-4 py-1.5 font-montreal text-sm font-medium leading-none text-white"
            }
            style={{ left: LABEL_OFFSET }}
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { clipPath: "inset(0 100% 0 0)", opacity: 1 }
            }
            animate={
              reduceMotion
                ? { opacity: 1 }
                : { clipPath: "inset(0 0% 0 0)", opacity: 1 }
            }
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { clipPath: "inset(0 100% 0 0)", opacity: 1 }
            }
            transition={{ duration: reduceMotion ? 0 : 0.22, ease: APPEAR_EASE }}
          >
            {variant.label}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
};

export default CustomCursor;
