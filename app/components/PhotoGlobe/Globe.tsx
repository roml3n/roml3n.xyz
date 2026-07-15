"use client";

import { useEffect, useRef } from "react";

export function Globe({
  children,
}: {
  children: React.ReactNode;
}) {
  const globeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    let rotX = -18;
    let rotY = 0;

    const animate = () => {
      rotY += 0.12;

      if (globeRef.current) {
        globeRef.current.style.transform =
          `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      }

      frame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      ref={globeRef}
      className="absolute inset-0"
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  );
}