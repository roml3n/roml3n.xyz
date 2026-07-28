"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { WORDS, COLORS, makeHueWalker } from "./badges";

const MONO_STACK =
  'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace';

function useMedia(query: string, server: boolean): boolean {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(query);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => server,
  );
}

function useReducedMotion(): boolean {
  return useMedia("(prefers-reduced-motion: reduce)", false);
}

function useFinePointer(): boolean {
  return useMedia("(hover: hover) and (pointer: fine)", true);
}

const FONT_PX = 11;
const CHAR_W = 6.6;
const PAD_X = 4;
const PAD_Y = 1;
const RADIUS = 3;
const GAP = 3;

const DROP_MS = 90;
const MIN_TRAVEL = 14;
const APPEAR_MS = 140;
const HOLD_MS = 620;
const FADE_MS = 260;
const LIFE_MS = APPEAR_MS + HOLD_MS + FADE_MS;
const MAX_LIVE = 22;

const SLAM_OFFSET = 5;
const SLAM_OVERSHOOT = 1.03;

const IDLE_WOBBLE = 0.35;
const IDLE_BREATH = 0.01;

const SCRAMBLE_MS = 130;
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/#*";

const SPEED_FULL = 40;
const INTENSITY_FLOOR = 0.35;

const REPEL_PX = 3;
const REPEL_RANGE = 64;
const REPEL_CHASE = 0.16;
const REPEL_DECAY = 0.05;

type Badge = {
  id: number;
  x: number;
  y: number;
  w: number;
  h: number;
  text: string;
  color: string;
  born: number;
  dirX: number;
  dirY: number;
  exitRot: number;
  seed: number;
  depth: number;
  scram: string;
  offX: number;
  offY: number;
  tgtX: number;
  tgtY: number;
};

const badgeH = FONT_PX + PAD_Y * 2;
const badgeW = (text: string) => Math.round(text.length * CHAR_W) + PAD_X * 2;

function hits(x: number, y: number, w: number, h: number, b: Badge): boolean {
  return (
    x < b.x + b.w + GAP &&
    x + w + GAP > b.x &&
    y < b.y + b.h + GAP &&
    y + h + GAP > b.y
  );
}

function shuffled(n: number, rnd: () => number): number[] {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const STATIC: Array<{ text: string; color: string }> = [
  { text: "tinkerer", color: COLORS[0] },
  { text: "curious", color: COLORS[2] },
  { text: "crafted", color: COLORS[4] },
  { text: "pixel perfect", color: COLORS[6] },
];

export function BadgeTrailCard() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [badges, setBadges] = useState<Badge[]>([]);
  const reduced = useReducedMotion();
  const fine = useFinePointer();
  const interactive = fine && !reduced;

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !interactive) return;

    const rnd = Math.random;

    let onScreen = false;
    let hidden = false;
    let raf = 0;
    let seq = 0;
    const live: Badge[] = [];

    let px = -1;
    let py = -1;
    let lastDropT = 0;
    let lastDropX = 0;
    let lastDropY = 0;
    let haveLast = false;

    let bag: number[] = [];
    const nextWord = () => {
      if (bag.length === 0) bag = shuffled(WORDS.length, rnd);
      return WORDS[bag.pop()!];
    };

    const nextColor = makeHueWalker(rnd() * 360);

    let prevPx = -1;
    let prevPy = -1;

    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      px = e.clientX - r.left;
      py = e.clientY - r.top;
    };
    const onLeave = () => {
      px = -1;
      py = -1;
    };

    let lastNow = 0;
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (!onScreen || hidden) return;

      const dtFrames = lastNow ? Math.min(4, (now - lastNow) / 16.6667) : 1;
      lastNow = now;

      const r = host.getBoundingClientRect();

      for (let i = live.length - 1; i >= 0; i--) {
        if (now - live[i].born >= LIFE_MS) live.splice(i, 1);
      }

      if (px >= 0 && live.length < MAX_LIVE) {
        const traveled = haveLast ? Math.hypot(px - lastDropX, py - lastDropY) : Infinity;
        if (now - lastDropT >= DROP_MS && traveled >= MIN_TRAVEL) {
          const text = nextWord();
          const w = badgeW(text);
          const h = badgeH;

          let x = px - w / 2;
          let y = py - h / 2;
          x = Math.max(0, Math.min(r.width - w, x));
          y = Math.max(0, Math.min(r.height - h, y));

          const collides = live.some((b) => hits(x, y, w, h, b));
          if (!collides) {
            let dx = prevPx >= 0 ? px - prevPx : 0;
            let dy = prevPy >= 0 ? py - prevPy : -1;
            const speed = Math.hypot(prevPx >= 0 ? px - prevPx : 0, prevPy >= 0 ? py - prevPy : 0);
            const dm = Math.hypot(dx, dy) || 1;
            dx /= dm;
            dy /= dm;

            const intensity =
              INTENSITY_FLOOR + (1 - INTENSITY_FLOOR) * Math.max(0, Math.min(1, speed / SPEED_FULL));
            const cxn = x + w / 2;
            const cyn = y + h / 2;

            for (const b of live) {
              const bx = b.x + b.w / 2;
              const by = b.y + b.h / 2;
              const vx = bx - cxn;
              const vy = by - cyn;
              const d = Math.hypot(vx, vy) || 1;
              if (d < REPEL_RANGE) {
                const push = REPEL_PX * (1 - d / REPEL_RANGE);
                b.tgtX += (vx / d) * push;
                b.tgtY += (vy / d) * push;
              }
            }
            live.push({
              id: seq++,
              x,
              y,
              w,
              h,
              text,
              color: nextColor(intensity),
              born: now,
              dirX: dx,
              dirY: dy,
              exitRot: (rnd() < 0.5 ? -1 : 1) * (4 + rnd() * 5),
              seed: rnd() * 1000,
              depth: 0,
              scram: text,
              offX: 0,
              offY: 0,
              tgtX: 0,
              tgtY: 0,
            });
            lastDropT = now;
            lastDropX = px;
            lastDropY = py;
            haveLast = true;
          }
        }
      }
      prevPx = px;
      prevPy = py;

      const n = live.length;
      const chaseK = 1 - Math.pow(1 - REPEL_CHASE, dtFrames);
      const decayK = 1 - Math.pow(1 - REPEL_DECAY, dtFrames);
      for (let i = 0; i < n; i++) {
        const b = live[i];
        b.depth = n > 1 ? 1 - i / (n - 1) : 0;

        b.offX += (b.tgtX - b.offX) * chaseK;
        b.offY += (b.tgtY - b.offY) * chaseK;
        b.tgtX *= 1 - decayK;
        b.tgtY *= 1 - decayK;

        const age = now - b.born;
        if (age < SCRAMBLE_MS && b.text.length > 1) {
          const prog = age / SCRAMBLE_MS;
          const locked = Math.floor(prog * b.text.length);
          let s = "";
          for (let c = 0; c < b.text.length; c++) {
            s += c < locked ? b.text[c] : SCRAMBLE_CHARS[Math.floor(rnd() * SCRAMBLE_CHARS.length)];
          }
          b.scram = s;
        } else {
          b.scram = b.text;
        }
      }

      setBadges(live.slice());
    };

    const io = new IntersectionObserver(
      (es) => {
        onScreen = es[0]?.isIntersecting ?? false;
      },
      { threshold: 0.15 },
    );
    io.observe(host);
    const onVis = () => {
      hidden = document.hidden;
    };
    document.addEventListener("visibilitychange", onVis);

    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [interactive]);

  return (
    <div
      ref={hostRef}
      data-canvas-card
      aria-hidden
      className="absolute inset-0 z-20 select-none overflow-hidden"
      style={{
        fontFamily: MONO_STACK,
        pointerEvents: interactive ? "auto" : "none",
        cursor: interactive ? "crosshair" : "default",
      }}
    >
      {!interactive ? (
        <div className="absolute top-6 right-6 md:top-10 md:right-10 flex flex-wrap gap-2 max-w-[220px] justify-end">
          {STATIC.map((b, i) => (
            <span
              key={i}
              style={{
                fontFamily: MONO_STACK,
                fontSize: FONT_PX,
                lineHeight: 1,
                padding: `${PAD_Y}px ${PAD_X}px`,
                borderRadius: RADIUS,
                background: b.color,
                color: "#000",
                textTransform: "uppercase",
              }}
            >
              {b.text}
            </span>
          ))}
        </div>
      ) : (
        (() => {
          const clock = performanceNowSafe();
          return (
            <>
              {badges.map((b) => {
                const m = badgeMotion(b, clock);
                const depthScale = 1 - b.depth * 0.06;
                const depthDim = 1 - b.depth * 0.12;
                return (
                  <span
                    key={b.id}
                    style={{
                      position: "absolute",
                      left: b.x,
                      top: b.y,
                      fontFamily: MONO_STACK,
                      fontSize: FONT_PX,
                      lineHeight: 1,
                      whiteSpace: "nowrap",
                      padding: `${PAD_Y}px ${PAD_X}px`,
                      borderRadius: RADIUS,
                      background: b.color,
                      boxShadow: "0 1px 2px -1px rgba(0,0,0,0.45)",
                      color: "#000",
                      textTransform: "uppercase",
                      opacity: m.opacity * depthDim,
                      transform: `translate(${m.dx + b.offX}px, ${m.dy + b.offY}px) scale(${m.scale * depthScale}) rotate(${m.rot}deg)`,
                      transformOrigin: "center",
                      pointerEvents: "none",
                      willChange: "opacity, transform",
                    }}
                  >
                    {b.scram}
                  </span>
                );
              })}
            </>
          );
        })()
      )}
    </div>
  );
}

function performanceNowSafe(): number {
  return typeof performance !== "undefined" ? performance.now() : 0;
}

function badgeMotion(
  b: Badge,
  clock: number,
): { dx: number; dy: number; scale: number; rot: number; opacity: number } {
  const age = clock - b.born;
  let opacity = 1;
  let scale = 1;
  let rot = 0;
  let dx = 0;
  let dy = 0;

  if (age < APPEAR_MS) {
    const t = age / APPEAR_MS;
    const spring = 1 - Math.pow(1 - t, 3);
    opacity = Math.min(1, t * 1.4);
    const base = 0.9 + 0.1 * spring;
    scale = base + (SLAM_OVERSHOOT - 1) * Math.sin(Math.PI * t);
    const back = (1 - spring) * SLAM_OFFSET;
    dx = -b.dirX * back;
    dy = -b.dirY * back;
  } else if (age > APPEAR_MS + HOLD_MS) {
    const t = Math.min(1, (age - APPEAR_MS - HOLD_MS) / FADE_MS);
    const e = t * t;
    opacity = 1 - t;
    scale = 1 - 0.2 * e;
    rot = b.exitRot * e;
  }

  if (age >= APPEAR_MS) {
    const idle = opacity;
    const p = clock * 0.004 + b.seed;
    dx += Math.sin(p) * IDLE_WOBBLE * idle;
    dy += Math.cos(p * 1.3 + 0.7) * IDLE_WOBBLE * idle;
    scale += Math.sin(p * 0.9) * IDLE_BREATH * idle;
  }

  return { dx, dy, scale, rot, opacity };
}
