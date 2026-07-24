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

export const LATITUDE_BANDS = 10;

const POLE_SCALE = 0.65;

const NEAR_POLE_SCALE = 0.75;

const POLE_EXTRA_SKIP = 8;

const NEAR_POLE_EXTRA_SKIP = 4;

export function createSphereLayout(
  ids: string[],
  radius = 300,
): SpherePoint[] {
  if (ids.length === 0) return [];

  const latitudeBands = Math.min(LATITUDE_BANDS, ids.length);
  const longitudeColumns = Math.ceil(ids.length / latitudeBands);
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
    const keepCount = longitudeColumns - totalSkip;

    if (rowsFromPole <= 1) {
      for (let index = 0; index < keepCount; index += 1) {
        const longitude = (index / keepCount) * Math.PI * 2;

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

      continue;
    }

    for (let column = 0; column < longitudeColumns; column += 1) {
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

  return points;
}
