"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export interface GlobeRotation {
  x: number;
  y: number;
}

const IDLE_X = -18;

const IDLE_SPEED = 0.16;

const FOLLOW = 0.06;

const DRAG_SENSITIVITY = 0.35;

const MOMENTUM_FRICTION = 0.95;

const MOMENTUM_STOP_THRESHOLD = 0.01;

const IDLE_RESUME_BLEND = 0.04;

const CLICK_SUPPRESS_DISTANCE = 4;

const FOCUS_FOLLOW = 0.08;

const FOCUS_STOP_THRESHOLD = 0.05;

export function useGlobeRotation(
  paused = false,
  focus: GlobeRotation | null = null,
) {
  const prefersReducedMotion = useReducedMotion();

  const frame = useRef<number | null>(null);
  const pausedRef = useRef(paused);
  const focusRef = useRef(focus);

  const rotation = useRef<GlobeRotation>({
    x: IDLE_X,
    y: 0,
  });

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

  const [, rerender] = useState(0);

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

      rotation.current.y += spinY;
      rotation.current.x += spinX;

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

    const animate = () => {
      if (pausedRef.current) {
        const focusTarget = focusRef.current;

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

            rerender((v) => (v + 1) % 100000);
          }
        }

        frame.current = requestAnimationFrame(animate);
        return;
      }

      wobble += 0.012;

      if (drag.current.active) {
        rerender((v) => (v + 1) % 100000);
        frame.current = requestAnimationFrame(animate);
        return;
      }

      const hasMomentum =
        Math.abs(drag.current.momentumX) > MOMENTUM_STOP_THRESHOLD ||
        Math.abs(drag.current.momentumY) > MOMENTUM_STOP_THRESHOLD;

      if (hasMomentum) {
        rotation.current.x += drag.current.momentumX;
        rotation.current.y += drag.current.momentumY;

        drag.current.momentumX *= MOMENTUM_FRICTION;
        drag.current.momentumY *= MOMENTUM_FRICTION;

        velocity.current.y = drag.current.momentumY;
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

  return rotation.current;
}
