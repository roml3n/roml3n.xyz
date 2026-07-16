"use client";

import { useEffect, useRef, useState } from "react";

export interface GlobeRotation {
  x: number;
  y: number;
}

const IDLE_X = -18;

const IDLE_SPEED = 0.16;

const FOLLOW = 0.06;

export function useGlobeRotation() {
  const frame = useRef<number | null>(null);

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

  const [, rerender] = useState(0);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.current.x =
        (event.clientX / window.innerWidth - 0.5) * 2;

      pointer.current.y =
        (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("pointermove", onMove);

    return () => {
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  useEffect(() => {
    let wobble = 0;

    const animate = () => {
      wobble += 0.012;

      const targetX =
        IDLE_X -
        pointer.current.y * 12 +
        Math.sin(wobble) * 1.4;

      velocity.current.y +=
        (IDLE_SPEED + pointer.current.x * 0.05 - velocity.current.y) *
        0.05;

      rotation.current.y += velocity.current.y;

      rotation.current.x +=
        (targetX - rotation.current.x) * FOLLOW;

      rerender((v) => (v + 1) % 100000);

      frame.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (frame.current) {
        cancelAnimationFrame(frame.current);
      }
    };
  }, []);

  return rotation.current;
}
