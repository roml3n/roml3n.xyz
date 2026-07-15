"use client";

import { useEffect, useRef } from "react";

interface GlobeProps {
  children: React.ReactNode;
}

export function Globe({ children }: GlobeProps) {
  const globeRef = useRef<HTMLDivElement>(null);

  // current rotation
  const rotation = useRef({
    x: -18,
    y: 0,
  });

  // target rotation
  const target = useRef({
    x: -18,
    y: 360,
  });

  const frame = useRef<number>(0);

  useEffect(() => {
    const animate = () => {
      // keep adding to our desired rotation
      target.current.y += 0.12;

      // smooth interpolation
      rotation.current.x +=
        (target.current.x - rotation.current.x) * 0.08;

      rotation.current.y +=
        (target.current.y - rotation.current.y) * 0.08;

      if (globeRef.current) {
        globeRef.current.style.transform = `
          rotateX(${rotation.current.x}deg)
          rotateY(${rotation.current.y}deg)
        `;
      }

      frame.current = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(frame.current);
  }, []);

  return (
    <div
      ref={globeRef}
      className="absolute inset-0"
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}