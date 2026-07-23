"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { GlobeCard } from "./GlobeCard";
import {
  PhotoGlobeOverlay,
  type RectSnapshot,
} from "./PhotoGlobeOverlay";
import { createSphereLayout } from "./sphereLayout";
import { useGlobeRotation } from "./useGlobeRotation";

import type { PhotoMeta } from "@/app/data/photos";

interface Photo {
  alt?: string;
  id: string;
  imageSrc: string;
  meta?: PhotoMeta;
}

const RADIUS = 315;
const CAMERA_DISTANCE = 770;
const RAD_TO_DEG = 180 / Math.PI;

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
  const returningPhotoId = useRef<string | null>(null);

  const rotation = useGlobeRotation(selectedPhoto !== null);

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

        const latitude =
          Math.asin(Math.max(-1, Math.min(1, y2 / RADIUS))) *
          RAD_TO_DEG;

        const longitude = Math.atan2(x1, z2) * RAD_TO_DEG;

        return {
          alt: photos[index].alt ?? `Photo ${index + 1}`,
          id: photos[index].id,
          imageSrc: photos[index].imageSrc,
          meta: photos[index].meta,

          x: x1,
          y: y2,

          z: z2,

          scale: point.poleScale,

          depth: (z2 + RADIUS) / (RADIUS * 2),

          roll: point.roll,
          latitude,
          longitude,

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

  useEffect(() => {
    if (selectedPhoto || !returningPhotoId.current) {
      return;
    }

    cardRefs.current.get(returningPhotoId.current)?.focus();
    returningPhotoId.current = null;
  }, [selectedPhoto]);

  const navigateSelectedPhoto = (delta: 1 | -1) => {
    if (!selectedPhoto || selectedPhoto.closing) {
      return;
    }

    const index = photos.findIndex(
      (photo) => photo.id === selectedPhoto.id,
    );

    if (index === -1) {
      return;
    }

    const next = photos[(index + delta + photos.length) % photos.length];

    setSelectedPhoto({
      ...selectedPhoto,
      alt: next.alt,
      id: next.id,
      imageSrc: next.imageSrc,
      meta: next.meta,
    });
  };

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
    <section className="flex min-h-[800px] items-center justify-center overflow-visible">
      <div
        className="relative h-[665px] w-[665px]"
        style={{
          perspective: `${CAMERA_DISTANCE}px`,
          transformStyle: "preserve-3d",
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
            imageAlt={photo.alt}
            imageSrc={photo.imageSrc}
            x={photo.x}
            y={photo.y}
            z={photo.z}
            latitude={photo.latitude}
            longitude={photo.longitude}
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
                alt: photo.alt,
                id: photo.id,
                imageSrc: photo.imageSrc,
                meta: photo.meta,
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
          onNavigate={navigateSelectedPhoto}
          onClosed={() => {
            returningPhotoId.current = selectedPhoto.id;
            setSelectedPhoto(null);
          }}
        />
      ) : null}
    </section>
  );
}
