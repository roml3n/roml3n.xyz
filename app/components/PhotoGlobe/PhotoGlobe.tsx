"use client";

import { useMemo, useRef, useState } from "react";

import { GlobeCard } from "./GlobeCard";
import {
  PhotoGlobeOverlay,
  type RectSnapshot,
} from "./PhotoGlobeOverlay";
import { createSphereLayout } from "./sphereLayout";
import { useGlobeRotation } from "./useGlobeRotation";

interface Photo {
  id: string;
  imageSrc: string;
}

const RADIUS = 360;
const CAMERA_DISTANCE = 1100;

interface SelectedPhoto extends Photo {
  closing: boolean;
  originRect: RectSnapshot;
  originRoll: number;
  returnRect: RectSnapshot | null;
}

function snapshotRect(rect: DOMRect): RectSnapshot {
  return {
    height: rect.height,
    left: rect.left,
    top: rect.top,
    width: rect.width,
  };
}

export function PhotoGlobe({
  photos,
}: {
  photos: readonly Photo[];
}) {
  const [selectedPhoto, setSelectedPhoto] =
    useState<SelectedPhoto | null>(null);
  const cardRefs = useRef(new Map<string, HTMLButtonElement>());

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
        const x1 =
          point.x * Math.cos(rotationY) -
          point.z * Math.sin(rotationY);

        const z1 =
          point.x * Math.sin(rotationY) +
          point.z * Math.cos(rotationY);

        const y2 =
          point.y * Math.cos(rotationX) -
          z1 * Math.sin(rotationX);

        const z2 =
          point.y * Math.sin(rotationX) +
          z1 * Math.cos(rotationX);

        const perspective =
          CAMERA_DISTANCE /
          (CAMERA_DISTANCE - z2);

        return {
          id: photos[index].id,
          imageSrc: photos[index].imageSrc,

          x: x1 * perspective,
          y: y2 * perspective,

          z: z2,

          scale: perspective,

          depth: (z2 + RADIUS) / (RADIUS * 2),

          roll: point.roll,

          order: index,
        };
      })
      .sort((a, b) => {
        if (Math.abs(a.z - b.z) > 2) {
          return a.z - b.z;
        }

        return a.order - b.order;
      });
  }, [layout, photos, rotationX, rotationY]);

  const closeSelectedPhoto = () => {
    if (!selectedPhoto || selectedPhoto.closing) {
      return;
    }

    const card = cardRefs.current.get(selectedPhoto.id);
    const returnRect = card
      ? snapshotRect(card.getBoundingClientRect())
      : selectedPhoto.originRect;

    setSelectedPhoto({
      ...selectedPhoto,
      closing: true,
      returnRect,
    });
  };

  return (
    <section className="flex h-[70vh] items-center justify-center overflow-hidden">
      <div
        className="relative h-[760px] w-[760px]"
        style={{
          perspective: "1600px",
        }}
      >
        {cards.map((photo) => (
          <GlobeCard
            key={photo.id}
            ref={(element) => {
              if (element) {
                cardRefs.current.set(photo.id, element);
              } else {
                cardRefs.current.delete(photo.id);
              }
            }}
            imageSrc={photo.imageSrc}
            x={photo.x}
            y={photo.y}
            z={photo.z}
            roll={photo.roll}
            depth={photo.depth}
            scale={photo.scale}
            selected={selectedPhoto?.id === photo.id}
            hidden={selectedPhoto?.id === photo.id}
            onClick={() => {
              const card = cardRefs.current.get(photo.id);

              if (!card) {
                return;
              }

              setSelectedPhoto({
                closing: false,
                id: photo.id,
                imageSrc: photo.imageSrc,
                originRect: snapshotRect(card.getBoundingClientRect()),
                originRoll: photo.roll,
                returnRect: null,
              });
            }}
          />
        ))}
      </div>

      {selectedPhoto ? (
        <PhotoGlobeOverlay
          photo={selectedPhoto}
          originRect={selectedPhoto.originRect}
          originRoll={selectedPhoto.originRoll}
          returnRect={selectedPhoto.returnRect}
          closing={selectedPhoto.closing}
          onClose={closeSelectedPhoto}
          onClosed={() => {
            setSelectedPhoto(null);
          }}
        />
      ) : null}
    </section>
  );
}
