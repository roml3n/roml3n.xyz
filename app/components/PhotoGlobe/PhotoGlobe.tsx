"use client";

import { useMemo } from "react";

import { GlobeCard } from "./GlobeCard";
import { createSphereLayout } from "./sphereLayout";
import { useGlobeRotation } from "./useGlobeRotation";

interface Photo {
  id: string;
  imageSrc: string;
}

const RADIUS = 300;

export function PhotoGlobe({
  photos,
}: {
  photos: readonly Photo[];
}) {
  const rotation = useGlobeRotation();

  const layout = useMemo(() => {
    return createSphereLayout(
      photos.map((photo) => photo.id),
      RADIUS,
    );
  }, [photos]);

  const rotationY = (rotation.y * Math.PI) / 180;
  const rotationX = (rotation.x * Math.PI) / 180;

  const cards = useMemo(() => {
    return layout
      .map((point, index) => {
        // rotate around Y
        const x1 =
          point.x * Math.cos(rotationY) -
          point.z * Math.sin(rotationY);

        const z1 =
          point.x * Math.sin(rotationY) +
          point.z * Math.cos(rotationY);

        // rotate around X
        const y2 =
          point.y * Math.cos(rotationX) -
          z1 * Math.sin(rotationX);

        const z2 =
          point.y * Math.sin(rotationX) +
          z1 * Math.cos(rotationX);

        const depth = (z2 + RADIUS) / (RADIUS * 2);

        return {
          id: photos[index].id,
          imageSrc: photos[index].imageSrc,

          x: x1,
          y: y2,
          z: z2,

          roll: point.roll,

          depth,
        };
      })
      .sort((a, b) => a.z - b.z);
  }, [layout, photos, rotationX, rotationY]);

  return (
    <section className="flex h-[70vh] items-center justify-center overflow-hidden">
      <div
        className="relative h-[700px] w-[700px]"
        style={{
          perspective: "1400px",
        }}
      >
        {cards.map((photo) => (
          <GlobeCard
            key={photo.id}
            imageSrc={photo.imageSrc}
            x={photo.x}
            y={photo.y}
            z={photo.z}
            roll={photo.roll}
            depth={photo.depth}
          />
        ))}
      </div>
    </section>
  );
}