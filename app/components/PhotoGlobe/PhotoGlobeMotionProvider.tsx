"use client";

import { createContext, useContext, type ReactNode } from "react";

import {
  buildPhotoGlobeMotion,
  photoGlobeMotionDefaults,
  type PhotoGlobeMotion,
} from "./photoGlobeMotion.defaults";

const PHOTO_GLOBE_MOTION = buildPhotoGlobeMotion(photoGlobeMotionDefaults);

const PhotoGlobeMotionContext = createContext<PhotoGlobeMotion>(PHOTO_GLOBE_MOTION);

export function PhotoGlobeMotionProvider({ children }: { children: ReactNode }) {
  return (
    <PhotoGlobeMotionContext.Provider value={PHOTO_GLOBE_MOTION}>
      {children}
    </PhotoGlobeMotionContext.Provider>
  );
}

export function usePhotoGlobeMotion(): PhotoGlobeMotion {
  return useContext(PhotoGlobeMotionContext);
}
