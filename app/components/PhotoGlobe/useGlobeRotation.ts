"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export interface GlobeRotation {
  x: number;
  y: number;
}

export interface GlobeRotationState {
  rotation: GlobeRotation;
  tick: number;
}

const MAX_SPIN_SPEED = 4.5;

const MAX_DRAG_GAP = 120;

const MAX_FLING_TRAVEL = 180;

const FLING_REST_MS = 300;

const MAX_TILT = 35;

const MOMENTUM_FRICTION = 0.95;

const MOMENTUM_STOP_THRESHOLD = 0.01;

const SETTLE_THRESHOLD = 0.1;

const IDLE_RESUME_BLEND = 0.04;

const CLICK_SUPPRESS_DISTANCE = 4;

const FOCUS_STOP_THRESHOLD = 0.05;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

import type { PhotoGlobeMotion } from "./photoGlobeMotion.defaults";
import { PHOTO_GLOBE_MOTION } from "./photoGlobeMotion.defaults";

export type GlobeRotationMode = "normal" | "slow" | "frozen";

export function useGlobeRotation(
  mode: GlobeRotationMode = "normal",
  focus: GlobeRotation | null = null,
  tuning: PhotoGlobeMotion["globeRotation"] = PHOTO_GLOBE_MOTION.globeRotation,
): GlobeRotationState {
  const prefersReducedMotion = useReducedMotion();

  const frame = useRef<number | null>(null);
  const modeRef = useRef(mode);
  const focusRef = useRef(focus);
  const tuningRef = useRef(tuning);

  const rotation = useRef<GlobeRotation>({
    x: tuning.idleTiltX,
    y: 0,
  });

  const target = useRef<GlobeRotation>({
    x: tuning.idleTiltX,
    y: 0,
  });

  const velocity = useRef({
    x: 0,
    y: tuning.idleSpeed,
  });

  const drag = useRef({
    active: false,
    lastX: 0,
    lastY: 0,
    moved: 0,
    momentumX: 0,
    momentumY: 0,
  });

  const rest = useRef({
    pending: false,
    until: 0,
  });

  const [tick, rerender] = useState(0);

  useEffect(() => {
    tuningRef.current = tuning;
  }, [tuning]);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    focusRef.current = focus;
  }, [focus]);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const onMove = (event: PointerEvent) => {
      if (!drag.current.active) {
        return;
      }

      const deltaX = event.clientX - drag.current.lastX;
      const deltaY = event.clientY - drag.current.lastY;

      drag.current.lastX = event.clientX;
      drag.current.lastY = event.clientY;
      drag.current.moved += Math.abs(deltaX) + Math.abs(deltaY);

      const t = tuningRef.current;
      const spinY = -deltaX * t.dragSensitivity;
      const spinX = -deltaY * t.dragSensitivity;

      target.current.y = clamp(
        target.current.y + spinY,
        rotation.current.y - MAX_DRAG_GAP,
        rotation.current.y + MAX_DRAG_GAP,
      );

      target.current.x = clamp(
        target.current.x + spinX,
        t.idleTiltX - MAX_TILT,
        t.idleTiltX + MAX_TILT,
      );

      drag.current.momentumX = spinX;
      drag.current.momentumY = spinY;
    };

    const onDown = (event: PointerEvent) => {
      drag.current.active = true;
      drag.current.lastX = event.clientX;
      drag.current.lastY = event.clientY;
      drag.current.moved = 0;
      drag.current.momentumX = 0;
      drag.current.momentumY = 0;
      velocity.current.y = 0;
      rest.current.pending = false;
      rest.current.until = 0;
    };

    const endDrag = () => {
      if (!drag.current.active) {
        return;
      }

      drag.current.active = false;

      const gapY = Math.abs(target.current.y - rotation.current.y);
      const budgetY = Math.max(0, MAX_FLING_TRAVEL - gapY);
      const maxMomentumY = budgetY * (1 - MOMENTUM_FRICTION);

      drag.current.momentumY = clamp(
        drag.current.momentumY,
        -maxMomentumY,
        maxMomentumY,
      );

      const maxMomentumX = MAX_TILT * (1 - MOMENTUM_FRICTION);

      drag.current.momentumX = clamp(
        drag.current.momentumX,
        -maxMomentumX,
        maxMomentumX,
      );

      if (drag.current.moved > CLICK_SUPPRESS_DISTANCE) {
        rest.current.pending = true;
      }
    };

    const onClickCapture = (event: MouseEvent) => {
      if (drag.current.moved > CLICK_SUPPRESS_DISTANCE) {
        event.stopPropagation();
        event.preventDefault();
        drag.current.moved = 0;
      }
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);
    window.addEventListener("click", onClickCapture, true);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", endDrag);
      window.removeEventListener("pointercancel", endDrag);
      window.removeEventListener("click", onClickCapture, true);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const animate = () => {
      const mode = modeRef.current;
      const t = tuningRef.current;
      const idleX = t.idleTiltX;
      const speedScale = mode === "slow" ? t.slowMultiplier : 1;

      if (mode === "frozen") {
        const focusTarget = focusRef.current;

        if (!focusTarget) {
          frame.current = requestAnimationFrame(animate);
          return;
        }

        const deltaY =
          ((((focusTarget.y - rotation.current.y) % 360) + 540) % 360) -
          180;
        const deltaX = focusTarget.x - rotation.current.x;

        if (
          Math.abs(deltaY) > FOCUS_STOP_THRESHOLD ||
          Math.abs(deltaX) > FOCUS_STOP_THRESHOLD
        ) {
          rotation.current.y += deltaY * t.focusFollow;
          rotation.current.x += deltaX * t.focusFollow;
          target.current.x = rotation.current.x;
          target.current.y = rotation.current.y;
          rerender((v) => (v + 1) % 100000);
        }

        frame.current = requestAnimationFrame(animate);
        return;
      }

      if (drag.current.active) {
        rotation.current.y += clamp(
          (target.current.y - rotation.current.y) * t.dragFollow,
          -MAX_SPIN_SPEED * speedScale,
          MAX_SPIN_SPEED * speedScale,
        );
        rotation.current.x += clamp(
          (target.current.x - rotation.current.x) * t.dragFollow,
          -MAX_SPIN_SPEED * speedScale,
          MAX_SPIN_SPEED * speedScale,
        );
      } else {
        const hasMomentum =
          Math.abs(drag.current.momentumX) > MOMENTUM_STOP_THRESHOLD ||
          Math.abs(drag.current.momentumY) > MOMENTUM_STOP_THRESHOLD;

        const settling =
          Math.abs(target.current.y - rotation.current.y) >
            SETTLE_THRESHOLD ||
          Math.abs(target.current.x - rotation.current.x) >
            SETTLE_THRESHOLD;

        if (hasMomentum || settling) {
          target.current.x = clamp(
            target.current.x + drag.current.momentumX * speedScale,
            idleX - MAX_TILT,
            idleX + MAX_TILT,
          );
          target.current.y += drag.current.momentumY * speedScale;

          drag.current.momentumX *= MOMENTUM_FRICTION;
          drag.current.momentumY *= MOMENTUM_FRICTION;

          const beforeY = rotation.current.y;

          rotation.current.y += clamp(
            (target.current.y - rotation.current.y) * t.dragFollow,
            -MAX_SPIN_SPEED * speedScale,
            MAX_SPIN_SPEED * speedScale,
          );
          rotation.current.x += clamp(
            (target.current.x - rotation.current.x) * t.dragFollow,
            -MAX_SPIN_SPEED * speedScale,
            MAX_SPIN_SPEED * speedScale,
          );

          velocity.current.y = rotation.current.y - beforeY;
        } else if (
          rest.current.pending ||
          performance.now() < rest.current.until
        ) {
          if (rest.current.pending) {
            rest.current.pending = false;
            rest.current.until = performance.now() + FLING_REST_MS;
          }

          drag.current.momentumX = 0;
          drag.current.momentumY = 0;
          velocity.current.y = 0;

          target.current.x = rotation.current.x;
          target.current.y = rotation.current.y;
        } else {
          drag.current.momentumX = 0;
          drag.current.momentumY = 0;

          const idleTarget = t.idleSpeed * speedScale;

          velocity.current.y +=
            (idleTarget - velocity.current.y) * IDLE_RESUME_BLEND;

          rotation.current.y += velocity.current.y;
          rotation.current.x += (idleX - rotation.current.x) * t.follow;

          target.current.x = rotation.current.x;
          target.current.y = rotation.current.y;
        }
      }

      rerender((v) => (v + 1) % 100000);

      frame.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (frame.current) {
        cancelAnimationFrame(frame.current);
      }
    };
  }, [prefersReducedMotion]);

  return {
    rotation: rotation.current,
    tick,
  };
}
