"use client";

import { photos } from "@/app/data/photos";
import { PhotoGlobe } from "@/app/components/PhotoGlobe/PhotoGlobe";
import { PhotoGlobeMotionProvider } from "@/app/components/PhotoGlobe/PhotoGlobeMotionProvider";

export default function Photos() {
  return (
    <PhotoGlobeMotionProvider>
      <section
        aria-label="Photos"
        className="mt-12 flex w-full min-h-[calc(100dvh-4.5rem)] items-center justify-center"
      >
        <PhotoGlobe photos={photos} />
      </section>
    </PhotoGlobeMotionProvider>
  );
}
