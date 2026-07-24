"use client";

import { photos, PHOTO_COUNT } from "@/app/data/photos";
import { PhotoGlobe } from "@/app/components/PhotoGlobe/PhotoGlobe";

export default function Photos() {
  return (
    <section className="content-start w-full min-h-[calc(100dvh-20rem)] md:min-h-[calc(100dvh-23rem)] mt-24 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-x-4 md:gap-x-6 gap-y-9 md:gap-y-16 relative justify-center self-center">
      <div className="row-span-1 col-span-2 flex flex-col gap-1">
        <h2 className="h2">Photos</h2>
        <h2 className="h2 opacity-40">[{PHOTO_COUNT}]</h2>
      </div>

      <div className="row-start-2 col-span-4 md:col-span-8 lg:col-span-12">
        <PhotoGlobe photos={photos} />
      </div>
    </section>
  );
}