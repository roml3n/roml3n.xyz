export interface SpherePoint {
  x: number;
  y: number;
  z: number;
  roll: number;
}

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

function seededRoll(seed: string) {
  let hash = 0;

  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }

  return (hash % 13) - 6;
}

export function createSphereLayout(
  ids: string[],
  radius = 300,
): SpherePoint[] {
  if (ids.length === 0) return [];

  if (ids.length === 1) {
    return [
      {
        x: 0,
        y: 0,
        z: 0,
        roll: seededRoll(ids[0]),
      },
    ];
  }

  return ids.map((id, index) => {
    const t = index / (ids.length - 1);

    const y = 1 - t * 2;
    const r = Math.sqrt(1 - y * y);

    const theta = GOLDEN_ANGLE * index;

    return {
      x: Math.cos(theta) * r * radius,
      y: y * radius,
      z: Math.sin(theta) * r * radius,
      roll: seededRoll(id),
    };
  });
}