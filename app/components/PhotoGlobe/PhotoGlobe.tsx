"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";

import { GlobeCard } from "./GlobeCard";
import {
  PhotoGlobeOverlay,
  type RectSnapshot,
} from "./PhotoGlobeOverlay";
import { createSphereLayout } from "./sphereLayout";
import { useGlobeRotation, type GlobeRotation } from "./useGlobeRotation";
import { usePhotoGlobeMotion } from "./PhotoGlobeMotionProvider";

import type { PhotoMeta } from "@/app/data/photos";
import { cursorNativeProps } from "@/app/components/cursor/cursorProps";

interface Photo {
  alt?: string;
  id: string;
  imageSrc: string;
  meta?: PhotoMeta;
}

const RADIUS = 338;
const CAMERA_DISTANCE = 820;
const RAD_TO_DEG = 180 / Math.PI;

interface SelectedPhoto extends Photo {
  closing: boolean;
  navDirection: 1 | -1 | null;
  originRect: RectSnapshot;
  originLatitude: number;
  originLongitude: number;
  originRoll: number;
  navigatedDuringOpen: boolean;
  returnRect: RectSnapshot | null;
  returnLatitude: number;
  returnLongitude: number;
  returnToOriginRect: boolean;
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
  const faceRefs = useRef(new Map<string, HTMLDivElement>());
  const returningPhotoId = useRef<string | null>(null);
  const [globeHovered, setGlobeHovered] = useState(false);
  const [globeSlotRevealed, setGlobeSlotRevealed] = useState(false);

  const rotationMode = selectedPhoto
    ? "frozen"
    : globeHovered
      ? "slow"
      : "normal";

  const motion = usePhotoGlobeMotion();

  const { rotation, tick } = useGlobeRotation(
    rotationMode,
    focusRotation,
    motion.globeRotation,
  );

  const layout = useMemo(() => {
    return createSphereLayout(
      photos.map((photo) => photo.id),
      RADIUS,
    );
  }, [photos]);

  const rotationY = (rotation.y * Math.PI) / 180;
  const rotationX = (rotation.x * Math.PI) / 180;
  const yawCos = Math.cos(rotationY);
  const yawSin = Math.sin(rotationY);
  const pitchCos = Math.cos(rotationX);
  const pitchSin = Math.sin(rotationX);

  const cards = useMemo(() => {
    return layout
      .map((point, index) => {
        const x1 = point.x * yawCos - point.z * yawSin;
        const z1 = point.x * yawSin + point.z * yawCos;

        const y2 = point.y * pitchCos - z1 * pitchSin;
        const z2 = point.y * pitchSin + z1 * pitchCos;

        const latitude =
          Math.asin(Math.max(-1, Math.min(1, y2 / RADIUS))) * RAD_TO_DEG;

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
    // `tick` invalidates this memo when rotation changes each frame.
  }, [layout, photos, pitchCos, pitchSin, tick, yawCos, yawSin]);

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
      navigatedDuringOpen: true,
    });
  };

  const closeSelectedPhoto = () => {
    if (!selectedPhoto || selectedPhoto.closing) {
      return;
    }

    const face = faceRefs.current.get(selectedPhoto.id);
    const cardPose = cards.find((entry) => entry.id === selectedPhoto.id);
    const navigated = selectedPhoto.navigatedDuringOpen;
    const measuredRect = face
      ? snapshotRect(face.getBoundingClientRect())
      : selectedPhoto.originRect;

    setSelectedPhoto({
      ...selectedPhoto,
      closing: true,
      returnRect: measuredRect,
      returnLatitude: cardPose?.latitude ?? selectedPhoto.originLatitude,
      returnLongitude: cardPose?.longitude ?? selectedPhoto.originLongitude,
      returnToOriginRect: !navigated,
    });
  };

  const handleClosingComplete = () => {
    if (!selectedPhoto) {
      return;
    }

    const photoId = selectedPhoto.id;
    returningPhotoId.current = photoId;

    flushSync(() => {
      setGlobeSlotRevealed(false);
      setSelectedPhoto(null);
      setFocusRotation(null);
    });
  };

  return (
    <section
      {...cursorNativeProps()}
      className="flex min-h-[470px] items-center justify-center overflow-visible sm:min-h-[620px] md:min-h-[720px] lg:min-h-[800px]"
    >
      <div
        className="relative h-[330px] w-[330px] touch-none scale-[0.6] sm:h-[480px] sm:w-[480px] sm:scale-[0.68] md:h-[580px] md:w-[580px] md:scale-[0.84] lg:h-[665px] lg:w-[665px] lg:scale-100"
        onPointerEnter={() => {
          setGlobeHovered(true);
        }}
        onPointerLeave={() => {
          setGlobeHovered(false);
        }}
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
                faceRefs.current.set(photo.id, element);
              } else {
                faceRefs.current.delete(photo.id);
              }
            }}
            buttonRef={(element) => {
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
            hidden={
              selectedPhoto?.id === photo.id && !globeSlotRevealed
            }
            onClick={() => {
              const face = faceRefs.current.get(photo.id);

              if (!face) {
                return;
              }

              setFocusRotation(null);
              setGlobeSlotRevealed(false);

              setSelectedPhoto({
                closing: false,
                alt: photo.alt,
                id: photo.id,
                imageSrc: photo.imageSrc,
                meta: photo.meta,
                navDirection: null,
                originRect: snapshotRect(face.getBoundingClientRect()),
                originLatitude: photo.latitude,
                originLongitude: photo.longitude,
                originRoll: photo.roll,
                navigatedDuringOpen: false,
                returnRect: null,
                returnLatitude: photo.latitude,
                returnLongitude: photo.longitude,
                returnToOriginRect: true,
              });
            }}
          />
        ))}
      </div>

      {selectedPhoto ? (
        <PhotoGlobeOverlay
          photo={selectedPhoto}
          originRect={selectedPhoto.originRect}
          originLatitude={selectedPhoto.originLatitude}
          originLongitude={selectedPhoto.originLongitude}
          originRoll={selectedPhoto.originRoll}
          returnRect={selectedPhoto.returnRect}
          returnLatitude={selectedPhoto.returnLatitude}
          returnLongitude={selectedPhoto.returnLongitude}
          returnToOriginRect={selectedPhoto.returnToOriginRect}
          closing={selectedPhoto.closing}
          navDirection={selectedPhoto.navDirection}
          onClose={closeSelectedPhoto}
          onNavigate={navigateSelectedPhoto}
          onClosingComplete={handleClosingComplete}
          onRevealGlobeSlot={() => {
            setGlobeSlotRevealed(true);
          }}
        />
      ) : null}
    </section>
  );
}
