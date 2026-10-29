export interface SpherePoint {
  bandIndex: number;
  latitude: number;
  longitude: number;
  roll: number;
  x: number;
  y: number;
  z: number;
  poleScale: number;
}

export const LATITUDE_BANDS = 7;

/** Shared meridian count — every ring uses these same longitude angles. */
export const LONGITUDE_COLUMNS = 11;

const POLE_SCALE = 0.72;

const NEAR_POLE_SCALE = 0.82;

/** Extra column skips on pole rings (still on the shared meridian grid). */
const POLE_EXTRA_SKIP = 3;

const NEAR_POLE_EXTRA_SKIP = 1;

function skippedColumnIndices(
  totalColumns: number,
  skipCount: number,
): Set<number> {
  const indices = new Set<number>();

  if (skipCount <= 0 || totalColumns <= 0) {
    return indices;
  }

  for (let i = 0; i < skipCount; i += 1) {
    indices.add(Math.floor((i * totalColumns) / skipCount) % totalColumns);
  }

  return indices;
}

export function createSphereLayout(
  ids: string[],
  radius = 300,
): SpherePoint[] {
  if (ids.length === 0) return [];

  const latitudeBands = Math.min(LATITUDE_BANDS, ids.length);
  const longitudeColumns = LONGITUDE_COLUMNS;
  const missingSlots = latitudeBands * longitudeColumns - ids.length;
  const topOmissions = Math.ceil(missingSlots / 2);
  const bottomOmissions = Math.floor(missingSlots / 2);
  const points: SpherePoint[] = [];

  for (let row = 0; row < latitudeBands; row += 1) {
    const latitude =
      ((row + 0.5) / latitudeBands - 0.5) * Math.PI;
    const latitudeRadius = Math.cos(latitude);

    const rowsFromPole = Math.min(row, latitudeBands - 1 - row);
    const poleScale =
      rowsFromPole === 0
        ? POLE_SCALE
        : rowsFromPole === 1
          ? NEAR_POLE_SCALE
          : 1;
    const extraSkip =
      rowsFromPole === 0
        ? POLE_EXTRA_SKIP
        : rowsFromPole === 1
          ? NEAR_POLE_EXTRA_SKIP
          : 0;

    const baseOmission =
      row === 0
        ? topOmissions
        : row === latitudeBands - 1
          ? bottomOmissions
          : 0;
    const totalSkip = baseOmission + extraSkip;
    const skipColumns = skippedColumnIndices(longitudeColumns, totalSkip);

    for (let column = 0; column < longitudeColumns; column += 1) {
      if (skipColumns.has(column)) {
        continue;
      }

      const longitude = (column / longitudeColumns) * Math.PI * 2;

      points.push({
        bandIndex: row,
        latitude,
        longitude,
        roll: 0,
        x: Math.sin(longitude) * latitudeRadius * radius,
        y: Math.sin(latitude) * radius,
        z: Math.cos(longitude) * latitudeRadius * radius,
        poleScale,
      });
    }
  }

  return points.slice(0, ids.length);
}