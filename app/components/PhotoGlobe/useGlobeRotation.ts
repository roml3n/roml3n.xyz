"use client";

import { useEffect, useRef, useState } from "react";

export interface GlobeRotation {
  x: number;
  y: number;
}

interface Pointer {
  x: number;
  y: number;
}

const IDLE_X = -18;

const IDLE_SPEED = 0.12;

const FOLLOW = 0.08;

export function useGlobeRotation() {
  const frame = useRef<number>();

  const rotation = useRef<GlobeRotation>({
    x: IDLE_X,
    y: 0,
  });

  const target = useRef<GlobeRotation>({
    x: IDLE_X,
    y: 0,
  });

  const pointer = useRef<Pointer>({
    x: 0,
    y: 0,
  });

  const [, force] = useState(0);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.current.x = event.clientX / window.innerWidth - 0.5;
      pointer.current.y = event.clientY / window.innerHeight - 0.5;
    };

    window.addEventListener("pointermove", onMove);

    return () => {
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  useEffect(() => {
    let time = 0;

    const animate = () => {
      time += 0.01;

      target.current.y += IDLE_SPEED;

      target.current.x =
        IDLE_X +
        pointer.current.y * 18 +
        Math.sin(time * 0.7) * 2;

      target.current.y += pointer.current.x * 0.12;

      rotation.current.x +=
        (target.current.x - rotation.current.x) * FOLLOW;

      rotation.current.y +=
        (target.current.y - rotation.current.y) * FOLLOW;

      force((v) => v + 1);

      frame.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  return rotation.current;
}