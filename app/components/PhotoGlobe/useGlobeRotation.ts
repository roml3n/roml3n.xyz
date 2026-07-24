"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

import { LATITUDE_BANDS } from "./sphereLayout";

export interface GlobeRotation {
  x: number;
  y: number;
}

export interface GlobeRotationState {
  rotation: GlobeRotation;
  bandOffsets: readonly number[];
  tick: number;
}

const IDLE_X = -18;

const IDLE_SPEED = 0.16;

const FOLLOW = 0.06;

const DRAG_SENSITIVITY = 0.35;

const DRAG_FOLLOW = 0.12;

const MOMENTUM_FRICTION = 0.95;

const MOMENTUM_STOP_THRESHOLD = 0.01;

const SETTLE_THRESHOLD = 0.1;

const IDLE_RESUME_BLEND = 0.04;

const CLICK_SUPPRESS_DISTANCE = 4;

const FOCUS_FOLLOW = 0.08;

const FOCUS_STOP_THRESHOLD = 0.05;

const PARALLAX_GAIN = 6;

const OFFSET_MAX = 12;

const OFFSET_FOLLOW = 0.08;

const OFFSET_RENDER_THRESHOLD = 0.05;

const VELOCITY_SMOOTHING = 0.15;

const IDLE_OSC_AMP = 1.2;

const IDLE_OSC_SPEED = 0.008;

const IDLE_OSC_PHASE = 1.7;

// Zero-mean per-band multipliers: equator rows lag (negative), pole rows
// lead (positive), so the average spin speed stays that of the main
// rotation while the bands shear apart under angular velocity.
const BAND_FACTORS = Array.from(
  { length: LATITUDE_BANDS },
  (_, band) =>
    Math.abs((band + 0.5) / LATITUDE_BANDS - 0.5) * 2 - 0.5,
);

export function useGlobeRotation(
  paused = false,
  focus: GlobeRotation | null = null,
): GlobeRotationState {
  const prefersReducedMotion = useReducedMotion();

  const frame = useRef<number | null>(null);
  const pausedRef = useRef(paused);
  const focusRef = useRef(focus);

  const rotation = useRef<GlobeRotation>({
    x: IDLE_X,
    y: 0,
  });

  const target = useRef<GlobeRotation>({
    x: IDLE_X,
    y: 0,
  });

  const bandOffsets = useRef<number[]>(
    new Array(LATITUDE_BANDS).fill(0),
  );

  const velocity = useRef({
    x: 0,
    y: IDLE_SPEED,
  });

  const pointer = useRef({
    x: 0,
    y: 0,
  });

  const drag = useRef({
    active: false,
    lastX: 0,
    lastY: 0,
    moved: 0,
    momentumX: 0,
    momentumY: 0,
  });

  const [tick, rerender] = useState(0);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    focusRef.current = focus;
  }, [focus]);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const onMove = (event: PointerEvent) => {
      pointer.current.x =
        (event.clientX / window.innerWidth - 0.5) * 2;

      pointer.current.y =
        (event.clientY / window.innerHeight - 0.5) * 2;

      if (!drag.current.active) {
        return;
      }

      const deltaX = event.clientX - drag.current.lastX;
      const deltaY = event.clientY - drag.current.lastY;

      drag.current.lastX = event.clientX;
      drag.current.lastY = event.clientY;
      drag.current.moved += Math.abs(deltaX) + Math.abs(deltaY);

      const spinY = deltaX * DRAG_SENSITIVITY;
      const spinX = -deltaY * DRAG_SENSITIVITY;

      target.current.y += spinY;
      target.current.x += spinX;

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
    };

    const endDrag = () => {
      if (!drag.current.active) {
        return;
      }

      drag.current.active = false;
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

    let wobble = 0;
    let osc = 0;
    let prevY = rotation.current.y;
    let smoothVel = 0;

    const animate = () => {
      const offsets = bandOffsets.current;

      if (pausedRef.current) {
        const focusTarget = focusRef.current;
        let converging = false;

        if (focusTarget) {
          const deltaY =
            ((((focusTarget.y - rotation.current.y) % 360) + 540) % 360) -
            180;
          const deltaX = focusTarget.x - rotation.current.x;

          if (
            Math.abs(deltaY) > FOCUS_STOP_THRESHOLD ||
            Math.abs(deltaX) > FOCUS_STOP_THRESHOLD
          ) {
            rotation.current.y += deltaY * FOCUS_FOLLOW;
            rotation.current.x += deltaX * FOCUS_FOLLOW;

            converging = true;
          }
        }

        // Band offsets must fully decay while a photo is focused: the
        // focus rotation targets the card's base longitude, so any
        // residual offset would leave the card off-center.
        let maxOffset = 0;

        for (let band = 0; band < offsets.length; band += 1) {
          offsets[band] -= offsets[band] * FOCUS_FOLLOW;
          maxOffset = Math.max(maxOffset, Math.abs(offsets[band]));
        }

        target.current.x = rotation.current.x;
        target.current.y = rotation.current.y;
        prevY = rotation.current.y;
        smoothVel -= smoothVel * VELOCITY_SMOOTHING;

        if (converging || maxOffset > OFFSET_RENDER_THRESHOLD) {
          rerender((v) => (v + 1) % 100000);
        }

        frame.current = requestAnimationFrame(animate);
        return;
      }

      wobble += 0.012;

      if (drag.current.active) {
        rotation.current.y +=
          (target.current.y - rotation.current.y) * DRAG_FOLLOW;
        rotation.current.x +=
          (target.current.x - rotation.current.x) * DRAG_FOLLOW;
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
          target.current.x += drag.current.momentumX;
          target.current.y += drag.current.momentumY;

          drag.current.momentumX *= MOMENTUM_FRICTION;
          drag.current.momentumY *= MOMENTUM_FRICTION;

          const beforeY = rotation.current.y;

          rotation.current.y +=
            (target.current.y - rotation.current.y) * DRAG_FOLLOW;
          rotation.current.x +=
            (target.current.x - rotation.current.x) * DRAG_FOLLOW;

          velocity.current.y = rotation.current.y - beforeY;
        } else {
          drag.current.momentumX = 0;
          drag.current.momentumY = 0;

          const targetX =
            IDLE_X -
            pointer.current.y * 12 +
            Math.sin(wobble) * 1.4;

          velocity.current.y +=
            (IDLE_SPEED + pointer.current.x * 0.05 - velocity.current.y) *
            IDLE_RESUME_BLEND;

          rotation.current.y += velocity.current.y;

          rotation.current.x +=
            (targetX - rotation.current.x) * FOLLOW;

          target.current.x = rotation.current.x;
          target.current.y = rotation.current.y;
        }
      }

      const frameVel = rotation.current.y - prevY;
      prevY = rotation.current.y;
      smoothVel += (frameVel - smoothVel) * VELOCITY_SMOOTHING;
      osc += IDLE_OSC_SPEED;

      for (let band = 0; band < offsets.length; band += 1) {
        const velocityTerm = Math.max(
          -OFFSET_MAX,
          Math.min(
            OFFSET_MAX,
            smoothVel * BAND_FACTORS[band] * PARALLAX_GAIN,
          ),
        );

        const targetOffset =
          velocityTerm +
          Math.sin(osc + band * IDLE_OSC_PHASE) * IDLE_OSC_AMP;

        offsets[band] += (targetOffset - offsets[band]) * OFFSET_FOLLOW;
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
    bandOffsets: bandOffsets.current,
    tick,
  };
}
