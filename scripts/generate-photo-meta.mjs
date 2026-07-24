#!/usr/bin/env node
// Reads real camera EXIF (camera model, aperture, shutter speed, focal
// length, capture date) out of the photos page images and writes it to
// app/data/photoExif.generated.json, keyed by filename. photos.ts merges
// this in as a base layer under any manual `meta` set on a sourcePhoto,
// so location/note/signature (not present in EXIF) stay hand-authored.
//
// Runs automatically before `npm run dev` and `npm run build`. To run it
// on demand: `npm run generate:photo-meta`.

import { readdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import exifr from "exifr";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PHOTOS_DIR = path.join(
  __dirname,
  "..",
  "public",
  "images",
  "(photosPage)",
);
const OUTPUT_PATH = path.join(
  __dirname,
  "..",
  "app",
  "data",
  "photoExif.generated.json",
);

function formatAperture(fNumber) {
  return typeof fNumber === "number" ? `f/${fNumber}` : undefined;
}

function formatShutter(exposureTime) {
  if (typeof exposureTime !== "number" || exposureTime <= 0) {
    return undefined;
  }

  return exposureTime >= 1
    ? `${exposureTime}s`
    : `1/${Math.round(1 / exposureTime)}`;
}

function formatFocalLength(exif) {
  const mm = exif.FocalLengthIn35mmFormat ?? exif.FocalLength;

  return typeof mm === "number" ? `${Math.round(mm)}mm` : undefined;
}

function formatDate(exif) {
  const date = exif.DateTimeOriginal ?? exif.CreateDate;

  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    return undefined;
  }

  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

async function main() {
  const files = (await readdir(PHOTOS_DIR)).filter((file) =>
    /\.(jpe?g|png|heic)$/i.test(file),
  );

  const result = {};

  for (const file of files.sort()) {
    const exif = await exifr
      .parse(path.join(PHOTOS_DIR, file))
      .catch(() => null);

    if (!exif) {
      continue;
    }

    const meta = {
      camera: exif.Model,
      aperture: formatAperture(exif.FNumber),
      shutter: formatShutter(exif.ExposureTime),
      focalLength: formatFocalLength(exif),
      date: formatDate(exif),
    };

    for (const key of Object.keys(meta)) {
      if (meta[key] === undefined) {
        delete meta[key];
      }
    }

    if (Object.keys(meta).length > 0) {
      result[file] = meta;
    }
  }

  await writeFile(OUTPUT_PATH, `${JSON.stringify(result, null, 2)}\n`);

  console.log(
    `Wrote EXIF metadata for ${Object.keys(result).length}/${files.length} photos to ${path.relative(process.cwd(), OUTPUT_PATH)}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
