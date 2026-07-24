"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { GlobeCard } from "./GlobeCard";
import {
  PhotoGlobeOverlay,
  type RectSnapshot,
} from "./PhotoGlobeOverlay";
import { createSphereLayout } from "./sphereLayout";
import { useGlobeRotation, type GlobeRotation } from "./useGlobeRotation";

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
  navDirection: 1 | -1 | null;
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
  const [focusRotation, setFocusRotation] =
    useState<GlobeRotation | null>(null);
  const cardRefs = useRef(new Map<string, HTMLButtonElement>());
  const returningPhotoId = useRef<string | null>(null);

  const { rotation, bandOffsets, tick } = useGlobeRotation(
    selectedPhoto !== null,
    focusRotation,
  );

  const layout = useMemo(() => {
    return createSphereLayout(
      photos.map((photo) => photo.id),
      RADIUS,
    );
  }, [photos]);

  const rotationY = (rotation.y * Math.PI) / 180;
  const rotationX = (rotation.x * Math.PI) / 180;

  const cards = useMemo(() => {
    const bandTrig = bandOffsets.map((offset) => {
      const yaw = rotationY + (offset * Math.PI) / 180;

      return { cos: Math.cos(yaw), sin: Math.sin(yaw) };
    });

    return layout
      .map((point, index) => {
        const { cos: yawCos, sin: yawSin } = bandTrig[point.bandIndex];

        const x1 = point.x * yawCos - point.z * yawSin;

        const z1 = point.x * yawSin + point.z * yawCos;

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
    // `bandOffsets` is mutated in place each frame; `tick` is the frame
    // counter that invalidates this memo when only the offsets changed.
  }, [bandOffsets, layout, photos, rotationX, rotationY, tick]);

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

    const nextIndex = (index + delta + photos.length) % photos.length;
    const next = photos[nextIndex];
    const point = layout[nextIndex];

    if (point) {
      setFocusRotation({
        x: point.latitude * RAD_TO_DEG,
        y: point.longitude * RAD_TO_DEG,
      });
    }

    setSelectedPhoto({
      ...selectedPhoto,
      alt: next.alt,
      id: next.id,
      imageSrc: next.imageSrc,
      meta: next.meta,
      navDirection: delta,
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
    <section className="flex min-h-[470px] items-center justify-center overflow-visible sm:min-h-[620px] md:min-h-[720px] lg:min-h-[800px]">
      <div
        className="relative h-[330px] w-[330px] touch-none scale-[0.6] sm:h-[480px] sm:w-[480px] sm:scale-[0.68] md:h-[580px] md:w-[580px] md:scale-[0.84] lg:h-[665px] lg:w-[665px] lg:scale-100"
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
                navDirection: null,
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
          navDirection={selectedPhoto.navDirection}
          onClose={closeSelectedPhoto}
          onNavigate={navigateSelectedPhoto}
          onClosed={() => {
            returningPhotoId.current = selectedPhoto.id;
            setSelectedPhoto(null);
            setFocusRotation(null);
          }}
        />
      ) : null}
    </section>
  );
}
