/**
 * Photo Globe motion — edit values here, then `yarn build`.
 *
 * Back note card spread starts when the photo fly-in begins (same moment the
 * tile expands toward the lightbox). Tune duration, fade delay, and ease below.
 */

export const PHOTO_GLOBE_EASE = [0.23, 1, 0.32, 1] as const;

export type PhotoGlobeTransition =
  | {
      kind: "tween";
      duration: number;
      ease: readonly [number, number, number, number];
    }
  | {
      kind: "spring";
      stiffness: number;
      damping: number;
      mass: number;
    };

export const photoGlobeMotionDefaults = {
  globeRotation: {
    idleTiltX: 10,
    idleSpeed: 0.24,
    slowMultiplier: 0.49,
    follow: 0.035,
    dragFollow: 0.1,
    dragSensitivity: 0.1,
    focusFollow: 0.075,
  },
  globeCard: {
    hoverScale: 1.1,
    hoverDuration: 0.3,
    hoverEase: [...PHOTO_GLOBE_EASE] as [number, number, number, number],
  },
  lightboxOpen: {
    photoFlyDuration: 0.1,
    framePaddingDuration: 0.79,
    backdropFadeDuration: 0.53,
    flyRotateZ: 3,
    flyRotateXExtra: -3.5,
    flyRotateYExtra: 12,
    flyRollFactor: 0.45,
  },
  lightboxClose: {
    framePeelDuration: 0.13,
    photoReturnDuration: 0.33,
    photoFadeOutDuration: 0.09,
    backdropFadeDuration: 0.28,
  },
  lightboxFrame: {
    paddingInnerMin: 4.5,
    paddingInnerMax: 16,
    captionGap: 16,
    captionOpacityStart: 0.22,
    captionOpacityDuration: 0.5,
    closePeelMaskInset: 46,
  },
  lightboxNoteSpread: {
    spreadAnimDurationSec: 0.23,
    noteFadeDelayInSpread: 0.91,
    spreadEasePower: 5,
  },
  postcardStack: {
    stiffness: 0.195,
    damping: 0.33,
    backRotate: 4.5,
    backX: 40,
    backY: -42,
    slideDurationMs: 600,
  },
  shared: {
    openTransition: {
      kind: "spring",
      stiffness: 311,
      damping: 79,
      mass: 5.1,
    } satisfies PhotoGlobeTransition,
    closeTransition: {
      kind: "tween",
      duration: 0.36,
      ease: [...PHOTO_GLOBE_EASE] as [number, number, number, number],
    } satisfies PhotoGlobeTransition,
  },
} as const;

export type PhotoGlobeMotion = {
  globeRotation: {
    idleTiltX: number;
    idleSpeed: number;
    slowMultiplier: number;
    follow: number;
    dragFollow: number;
    dragSensitivity: number;
    focusFollow: number;
  };
  globeCard: {
    hoverScale: number;
    hoverDuration: number;
    hoverEase: readonly [number, number, number, number];
  };
  lightboxOpen: {
    photoFlyDuration: number;
    framePaddingDuration: number;
    backdropFadeDuration: number;
    openIntroTimelineMs: number;
    photoLandAtTimelineProgress: number;
    photoLandTimeSec: number;
    flyRotateZ: number;
    flyRotateXExtra: number;
    flyRotateYExtra: number;
    flyRollFactor: number;
  };
  lightboxClose: {
    framePeelDuration: number;
    photoReturnDuration: number;
    photoFadeOutDuration: number;
    photoFadeOutDelay: number;
    backdropFadeDuration: number;
  };
  lightboxFrame: {
    paddingInnerMin: number;
    paddingInnerMax: number;
    captionGap: number;
    captionOpacityStart: number;
    captionOpacityDuration: number;
    closePeelMaskInset: number;
  };
  lightboxNoteSpread: {
    spreadStartOffsetFromPhotoLandSec: number;
    spreadAnimDurationSec: number;
    noteFadeDelayInSpread: number;
    spreadEasePower: number;
    /** 0–1 on the open intro timeline where spread motion begins */
    spreadStartLinearProgress: number;
    /** 0–1 span on the intro timeline for the spread motion */
    spreadAnimLinearLength: number;
  };
  postcardStack: {
    stiffness: number;
    damping: number;
    backRotate: number;
    backX: number;
    backY: number;
    slideDurationMs: number;
  };
  shared: {
    openTransition: PhotoGlobeTransition;
    closeTransition: PhotoGlobeTransition;
  };
};

export type PhotoGlobeMotionInput = {
  globeRotation: PhotoGlobeMotion["globeRotation"];
  globeCard: PhotoGlobeMotion["globeCard"];
  lightboxOpen: Omit<
    PhotoGlobeMotion["lightboxOpen"],
    "openIntroTimelineMs" | "photoLandAtTimelineProgress" | "photoLandTimeSec"
  >;
  lightboxClose: Omit<
    PhotoGlobeMotion["lightboxClose"],
    "photoFadeOutDelay"
  >;
  lightboxFrame: PhotoGlobeMotion["lightboxFrame"];
  lightboxNoteSpread: Omit<
    PhotoGlobeMotion["lightboxNoteSpread"],
    | "spreadStartOffsetFromPhotoLandSec"
    | "spreadStartLinearProgress"
    | "spreadAnimLinearLength"
  >;
  postcardStack: PhotoGlobeMotion["postcardStack"];
  shared: PhotoGlobeMotion["shared"];
};

export function buildPhotoGlobeMotion(raw: PhotoGlobeMotionInput): PhotoGlobeMotion {
  const openIntroTimelineMs =
    (raw.lightboxOpen.photoFlyDuration + raw.lightboxOpen.framePaddingDuration) *
    1000;
  const introTotalSec = openIntroTimelineMs / 1000;
  const photoLandTimeSec = raw.lightboxOpen.photoFlyDuration;
  const photoLandAtTimelineProgress = photoLandTimeSec / introTotalSec;

  /** Spread begins at open intro t=0 — in sync with photo fly / expand. */
  const spreadStartOffsetFromPhotoLandSec = -photoLandTimeSec;
  const spreadStartLinearProgress = 0;
  const spreadAnimLinearLength =
    raw.lightboxNoteSpread.spreadAnimDurationSec / introTotalSec;

  return {
    ...raw,
    lightboxOpen: {
      ...raw.lightboxOpen,
      openIntroTimelineMs,
      photoLandAtTimelineProgress,
      photoLandTimeSec,
    },
    lightboxClose: {
      ...raw.lightboxClose,
      photoFadeOutDelay: Math.max(
        0,
        raw.lightboxClose.photoReturnDuration -
          raw.lightboxClose.photoFadeOutDuration,
      ),
    },
    lightboxNoteSpread: {
      ...raw.lightboxNoteSpread,
      spreadStartOffsetFromPhotoLandSec,
      spreadStartLinearProgress,
      spreadAnimLinearLength,
    },
  };
}

export const PHOTO_GLOBE_MOTION = buildPhotoGlobeMotion(photoGlobeMotionDefaults);

/** Framer Motion transition from stored motion config. */
export function framerTransitionFromPhotoGlobe(
  transition: PhotoGlobeTransition,
  prefersReducedMotion: boolean,
) {
  if (prefersReducedMotion) {
    return { duration: 0 } as const;
  }

  if (transition.kind === "spring") {
    return {
      type: "spring" as const,
      stiffness: transition.stiffness,
      damping: transition.damping,
      mass: transition.mass,
    };
  }

  return {
    type: "tween" as const,
    duration: transition.duration,
    ease: [...transition.ease] as [number, number, number, number],
  };
}

export function tweenEaseFromPhotoGlobe(transition: PhotoGlobeTransition) {
  if (transition.kind === "tween") {
    return transition.ease;
  }

  return PHOTO_GLOBE_EASE;
}
