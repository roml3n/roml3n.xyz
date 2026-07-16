export interface SpherePoint {
  latitude: number;
  longitude: number;
  roll: number;
  x: number;
  y: number;
  z: number;
}

const LATITUDE_BANDS = 10;

function createSkippedColumns(columns: number, count: number) {
  return new Set(
    Array.from(
      { length: count },
      (_, index) => Math.floor(((index + 1) * columns) / (count + 1)),
    ),
  );
}

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
  const topSkippedColumns = createSkippedColumns(
    longitudeColumns,
    topOmissions,
  );
  const bottomSkippedColumns = createSkippedColumns(
    longitudeColumns,
    bottomOmissions,
  );
  const points: SpherePoint[] = [];

  for (let row = 0; row < latitudeBands; row += 1) {
    const latitude =
      ((row + 0.5) / latitudeBands - 0.5) * Math.PI;
    const latitudeRadius = Math.cos(latitude);
    const skippedColumns =
      row === 0
        ? topSkippedColumns
        : row === latitudeBands - 1
          ? bottomSkippedColumns
          : undefined;

    for (let column = 0; column < longitudeColumns; column += 1) {
      if (skippedColumns?.has(column)) {
        continue;
      }

      const longitude = (column / longitudeColumns) * Math.PI * 2;

      points.push({
        latitude,
        longitude,
        roll: 0,
        x: Math.sin(longitude) * latitudeRadius * radius,
        y: Math.sin(latitude) * radius,
        z: Math.cos(longitude) * latitudeRadius * radius,
      });
    }
  }

  return points;
}
