"use client";

import { useMemo } from "react";

import { Globe } from "./Globe";
import { GlobeCard } from "./GlobeCard";
import { createSphereLayout } from "./sphereLayout";

interface Photo {
  id: string;
  imageSrc: string;
}

export function PhotoGlobe({
  photos,
}: {
  photos: readonly Photo[];
}) {
  const layout = useMemo(() => {
    return createSphereLayout(
      photos.map((photo) => photo.id),
      300,
    );
  }, [photos]);

  return (
    <section className="flex h-[70vh] items-center justify-center overflow-hidden">
      <div
        className="relative h-[650px] w-[650px]"
        style={{
          perspective: "1200px",
        }}
      >
        <Globe>
          {photos.map((photo, index) => (
            <GlobeCard
              key={photo.id}
              imageSrc={photo.imageSrc}
              x={layout[index].x}
              y={layout[index].y}
              z={layout[index].z}
            />
          ))}
        </Globe>
      </div>
    </section>
  );
}