"use client";

import { useEffect, useRef, useState } from "react";
import { RevealGL, renderCornerText } from "./reveal-gl";

const FONT_STACK = 'Georgia, "Times New Roman", Times, serif';

const BG = "#1b1a17";
const INK = "#d9d2c4";
const EDGE = "#2a2823";

const DARK_WASH = [
  "radial-gradient(55% 75% at 18% 12%, rgba(0,0,0,0.35), transparent 60%)",
  "radial-gradient(48% 66% at 82% 22%, rgba(0,0,0,0.28), transparent 62%)",
  "radial-gradient(65% 55% at 50% 0%,  rgba(0,0,0,0.22), transparent 55%)",
  "radial-gradient(42% 52% at 8% 85%,  rgba(0,0,0,0.26), transparent 60%)",
  "radial-gradient(52% 60% at 92% 88%, rgba(0,0,0,0.22), transparent 62%)",
  "radial-gradient(85% 46% at 50% 100%,rgba(0,0,0,0.20), transparent 55%)",
].join(", ");

const MAX_BLUR = 16;
const K_IN = 16;
const DAMP = 1.12;
const REVEALED_AT = 0.98;
const PARALLAX_AMP = 0.006;

const TL_ANCHOR: [number, number] = [0.16, 0.18];
const BR_ANCHOR: [number, number] = [0.84, 0.82];

function hexToRgb(hex: string): [number, number, number] {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const n = parseInt(h, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function springStep(pos: number, vel: number, target: number, k: number, damp: number, dt: number): [number, number] {
  const c = 2 * Math.sqrt(k) * damp;
  const accel = -k * (pos - target) - c * vel;
  const v = vel + accel * dt;
  return [pos + v * dt, v];
}

export interface TextRevealCardProps {
  topLines: string[];
  bottomLines: string[];
  className?: string;
}

export function TextRevealCard({ topLines, bottomLines, className = "" }: TextRevealCardProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [glFailed, setGlFailed] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = host.clientWidth || 1;
    let H = host.clientHeight || 1;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const edge = hexToRgb(EDGE);
    const seed = Math.random() * 7;

    const gl = new RevealGL();
    const useGL = gl.available;
    if (!useGL) {
      setGlFailed(true);
      return;
    }
    gl.resize(W, H, dpr);
    host.appendChild(gl.canvas);

    const mount = () => {
      const art = renderCornerText({
        top: topLines,
        bottom: bottomLines,
        font: FONT_STACK,
        fill: INK,
        cardW: W,
        cardH: H,
        dpr,
      });
      gl.setTexture(art);
    };
    mount();

    let pTgtX = 0.5, pTgtY = 0.5;
    let pCurX = 0.5, pCurY = 0.5;
    let cursorUV: [number, number] = [-1, -1];
    let hoverTgt = 0, hoverCur = 0;
    const onMove = (e: PointerEvent) => {
      const b = host.getBoundingClientRect();
      const ux = (e.clientX - b.left) / b.width;
      const uy = (e.clientY - b.top) / b.height;
      pTgtX = ux; pTgtY = uy;
      cursorUV = [ux, uy];
      hoverTgt = 1;
    };
    const onLeave = () => { pTgtX = 0.5; pTgtY = 0.5; hoverTgt = 0; };
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);

    let phase: "in" | "settled" = "in";
    let progress = 0;
    let vel = 0;
    let held = 0;
    let clock = 0;
    let last = 0;
    let raf = 0;
    let running = false;

    const loop = () => {
      if (!running) return;
      const now = performance.now();
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;
      clock += dt;

      [progress, vel] = springStep(progress, vel, 1, K_IN, DAMP, dt);
      if (phase === "in" && progress >= REVEALED_AT) phase = "settled";

      const pk = 1 - Math.pow(0.0009, dt);
      pCurX += (pTgtX - pCurX) * pk;
      pCurY += (pTgtY - pCurY) * pk;
      hoverCur += (hoverTgt - hoverCur) * (1 - Math.pow(0.002, dt));

      const amp = PARALLAX_AMP * hoverCur;
      const parTL: [number, number] = [
        (pCurX - TL_ANCHOR[0]) * amp,
        (pCurY - TL_ANCHOR[1]) * amp,
      ];
      const parBR: [number, number] = [
        (pCurX - BR_ANCHOR[0]) * amp,
        (pCurY - BR_ANCHOR[1]) * amp,
      ];

      const p = Math.max(0, Math.min(1, progress));
      gl.draw(p, MAX_BLUR, edge, clock, W / Math.max(1, H), seed, parTL, parBR, cursorUV, hoverCur);

      held += ((phase === "settled" ? 1 : 0) - held) * (1 - Math.pow(0.02, dt));
      const breathe = Math.sin(clock * 0.45) * 0.5 + 0.5;
      const s = 1 + held * breathe * 0.0015;
      const b = 1 + held * (breathe - 0.5) * 0.012;
      gl.canvas.style.transform = `scale(${s.toFixed(4)})`;
      gl.canvas.style.filter = `brightness(${b.toFixed(3)})`;

      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      last = 0;
    };

    const renderStill = () => {
      gl.draw(1, 0, edge, 0, W / Math.max(1, H), seed, [0, 0], [0, 0], [-1, -1], 0);
    };

    let onScreen = false;
    let hidden = false;
    const sync = () => {
      if (reduced) return;
      if (onScreen && !hidden) start();
      else stop();
    };

    const io = new IntersectionObserver(
      (es) => { onScreen = es[0]?.isIntersecting ?? false; sync(); },
      { threshold: 0.15 },
    );
    io.observe(host);

    const onVis = () => { hidden = document.hidden; sync(); };
    document.addEventListener("visibilitychange", onVis);

    let resizeT = 0;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(resizeT);
      resizeT = window.setTimeout(() => {
        W = host.clientWidth || 1;
        H = host.clientHeight || 1;
        if (W < 2 || H < 2) return;
        gl.resize(W, H, dpr);
        mount();
      }, 120);
    });
    ro.observe(host);

    if (reduced) renderStill();
    else sync();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      window.clearTimeout(resizeT);
      document.removeEventListener("visibilitychange", onVis);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      gl.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={hostRef}
      data-canvas-card
      aria-label="Two small text blocks in opposite corners that materialize once from a soft cloudy mask on page load."
      className={`relative w-full h-full select-none overflow-hidden rounded-[12px] border ${className}`}
      style={{ backgroundColor: BG, borderColor: EDGE }}
    >
      <div
        className="pointer-events-none absolute"
        style={{ inset: "-8%", backgroundImage: DARK_WASH }}
      />
      {glFailed && (
        <div
          className="pointer-events-none absolute inset-0 p-[3.5%] flex flex-col justify-between"
          style={{ color: INK, fontFamily: FONT_STACK }}
        >
          <div className="text-left text-sm md:text-base leading-snug">
            {topLines.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
          <div className="text-right text-sm md:text-base leading-snug self-end">
            {bottomLines.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
