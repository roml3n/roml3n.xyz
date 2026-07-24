"use client";

import Image from "next/image";
import { Caveat } from "next/font/google";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import type { PhotoMeta } from "@/app/data/photos";

const caveat = Caveat({ subsets: ["latin"], weight: "600", display: "swap" });

export const CARD_W = 512;
export const CARD_H = 586;
const IMG_H = 467;

const CONFIG = {
  stiffness: 0.05,
  damping: 0.56,
  flickDistance: 62,
  flickVelocity: 0.66,
  frontRotate: 0,
  backRotate: 4.47,
  backX: 40,
  backY: -37,
  dragRotYMax: 35,
  dragRotXMax: 14,
  scaleFalloff: 0,
  shadowMax: 0.08,
  tapFlickStrength: 2.0,
  // A swipe counts as "change photo" (not "flip card") once it's clearly
  // horizontal and past one of these — bigger than flickDistance/Velocity
  // so a deliberate gallery-style swipe doesn't get mistaken for a flip.
  navHorizontalRatio: 1.4,
  navDistance: 90,
  navVelocity: 0.5,
} as const;

const FRONT = { rotate: CONFIG.frontRotate, x: 0, y: 0 };
const BACK = { rotate: CONFIG.backRotate, x: CONFIG.backX, y: CONFIG.backY };

const DEFAULT_META: Required<PhotoMeta> = {
  camera: "Sony A7 (IV)",
  focalLength: "24mm",
  location: "Nairobi, Kenya",
  aperture: "f/1.2",
  date: "Dec 12, 2025",
  shutter: "1/2500",
  note: "Chasing waves and losing to every single one of them.",
  signature: "R.",
};

const SLIDE_DURATION = 600;
const SLIDE_MAX_BLUR = 14;
// Blur px per px/ms of track speed — measured from actual per-frame travel.
const SLIDE_BLUR_PER_SPEED = 3;
// Extra distance past the viewport edge so cards start/end fully offscreen.
const SLIDE_OVERSHOOT = 48;

function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4);
}

// Slower launch than easeOutQuart but same destination — the back card
// visibly trails the front card (parallax) yet still exits the frame.
function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

interface SpringTarget {
  rotate: number;
  x: number;
  y: number;
}

type CardId = "photo" | "note";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function useSpring(
  target: SpringTarget,
  override: SpringTarget | null,
): [
  SpringTarget,
  (deltaVel: Partial<SpringTarget>) => void,
  (value: SpringTarget) => void,
] {
  const [value, setValue] = useState<SpringTarget>(override ?? target);
  const current = useRef<SpringTarget>(override ?? target);
  const vel = useRef<SpringTarget>({ rotate: 0, x: 0, y: 0 });
  const raf = useRef(0);

  const kick = useCallback((deltaVel: Partial<SpringTarget>) => {
    for (const key of Object.keys(deltaVel) as (keyof SpringTarget)[]) {
      vel.current[key] += deltaVel[key] ?? 0;
    }
  }, []);

  const reset = useCallback((resetValue: SpringTarget) => {
    cancelAnimationFrame(raf.current);
    current.current = { ...resetValue };
    vel.current = { rotate: 0, x: 0, y: 0 };
    setValue({ ...resetValue });
  }, []);

  useEffect(() => {
    cancelAnimationFrame(raf.current);

    if (override) {
      current.current = override;
      vel.current = { rotate: 0, x: 0, y: 0 };
      setValue(override);
      return;
    }

    function tick() {
      let settled = true;
      const next = { ...current.current };

      for (const key of Object.keys(target) as (keyof SpringTarget)[]) {
        const dx = target[key] - current.current[key];

        vel.current[key] =
          (vel.current[key] + dx * CONFIG.stiffness) * CONFIG.damping;
        next[key] = current.current[key] + vel.current[key];

        if (Math.abs(dx) > 0.05 || Math.abs(vel.current[key]) > 0.05) {
          settled = false;
        }
      }

      current.current = next;
      setValue({ ...next });

      if (!settled) {
        raf.current = requestAnimationFrame(tick);
      }
    }

    raf.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf.current);
    // Depend on the override's values, not its identity — a new object is
    // created every render while dragging.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    override !== null,
    override?.rotate,
    override?.x,
    override?.y,
    target.rotate,
    target.x,
    target.y,
  ]);

  return [value, kick, reset];
}

interface PostcardPhoto {
  alt?: string;
  id: string;
  imageSrc: string;
  meta?: PhotoMeta;
}

interface SlideState {
  // Track positions of the outgoing stack's front and back layers; the
  // incoming stack rides exactly one slot behind each layer.
  back: number;
  blur: number;
  blurBack: number;
  dir: 1 | -1;
  from: PostcardPhoto;
  fromFront: CardId;
  front: number;
  // Slot width used by this slide (center → fully offscreen), captured so
  // interrupts stay continuous even if the viewport changed.
  slot: number;
}

interface PostcardProps {
  photo: PostcardPhoto;
  navDirection?: 1 | -1 | null;
  onNavigate?: (delta: 1 | -1) => void;
  open: boolean;
  scale?: number;
}

export function Postcard({
  photo,
  navDirection = null,
  onNavigate,
  open,
  scale = 1,
}: PostcardProps) {
  const meta = { ...DEFAULT_META, ...photo.meta };

  // Card content is authored at a fixed design size (CARD_W/CARD_H) and
  // uniformly scaled to fit the viewport, so small screens shrink text
  // right along with everything else. A sqrt falloff gives the meta row
  // a partial boost — legible on small screens, unchanged at scale 1.
  const metaFontScale = Math.min(
    1.5,
    1 / Math.sqrt(Math.min(1, Math.max(scale, 0.01))),
  );

  const [frontCard, setFrontCard] = useState<CardId>("photo");
  const [slide, setSlide] = useState<SlideState | null>(null);
  const [drag, setDrag] = useState({
    active: false,
    card: null as CardId | null,
    x: 0,
    y: 0,
  });

  const dragStart = useRef({ t: 0, x: 0, y: 0 });
  const dragDistance = useRef(0);
  const draggedCard = useRef<CardId | null>(null);
  const suppressClick = useRef(false);
  const prevPhotoRef = useRef(photo);
  const frontCardRef = useRef(frontCard);
  const slideRef = useRef<SlideState | null>(null);
  const slideRaf = useRef(0);

  useEffect(() => {
    frontCardRef.current = frontCard;
  }, [frontCard]);

  useEffect(() => {
    if (!open) {
      setFrontCard("photo");
    }
  }, [open]);

  const targetFor = (card: CardId) => {
    if (!open) {
      return card === "photo" ? FRONT : BACK;
    }

    return frontCard === card ? FRONT : BACK;
  };

  const overrideFor = (card: CardId) =>
    drag.active && drag.card === card
      ? { rotate: targetFor(card).rotate, x: drag.x, y: drag.y }
      : null;

  const [photoSpring, kickPhoto, resetPhotoSpring] = useSpring(
    targetFor("photo"),
    overrideFor("photo"),
  );
  const [noteSpring, kickNote, resetNoteSpring] = useSpring(
    targetFor("note"),
    overrideFor("note"),
  );

  // Layout effect so the first painted frame after a photo change already
  // has the incoming stack offscreen — a plain effect runs post-paint and
  // flashes the new card centered for one frame.
  useLayoutEffect(() => {
    const prev = prevPhotoRef.current;
    prevPhotoRef.current = photo;

    if (prev.id === photo.id) {
      return;
    }

    const interrupted = slideRef.current;
    const fromFront = interrupted ? "photo" : frontCardRef.current;

    setFrontCard("photo");
    resetPhotoSpring(FRONT);
    resetNoteSpring(BACK);
    draggedCard.current = null;
    setDrag({ active: false, card: null, x: 0, y: 0 });

    if (!navDirection) {
      return;
    }

    const dir = navDirection;

    // Slot width: from center to fully past the viewport edge (in stage
    // coordinates, hence / scale) so cards start and end offscreen.
    const slot =
      (window.innerWidth / scale + CARD_W) / 2 + SLIDE_OVERSHOOT;

    // Continuity on interrupt: the outgoing stack starts wherever the
    // (previously incoming) stack currently sits on the track.
    const startFront = interrupted
      ? interrupted.front + interrupted.dir * interrupted.slot
      : 0;
    const startBack = interrupted
      ? interrupted.back + interrupted.dir * interrupted.slot
      : 0;
    const targetX = -dir * slot;

    cancelAnimationFrame(slideRaf.current);

    const start = performance.now();
    let lastFront = startFront;
    let lastBack = startBack;
    let lastT = start;

    const commit = (state: SlideState | null) => {
      slideRef.current = state;
      setSlide(state);
    };

    commit({
      back: startBack,
      blur: 0,
      blurBack: 0,
      dir,
      from: prev,
      fromFront,
      front: startFront,
      slot,
    });

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / SLIDE_DURATION);

      if (t >= 1) {
        commit(null);
        return;
      }

      const front =
        startFront + (targetX - startFront) * easeOutQuart(t);
      const back = startBack + (targetX - startBack) * easeOutCubic(t);
      const dt = Math.max(1, now - lastT);
      const blur = Math.min(
        SLIDE_MAX_BLUR,
        (Math.abs(front - lastFront) / dt) * SLIDE_BLUR_PER_SPEED,
      );
      const blurBack = Math.min(
        SLIDE_MAX_BLUR,
        (Math.abs(back - lastBack) / dt) * SLIDE_BLUR_PER_SPEED,
      );

      lastFront = front;
      lastBack = back;
      lastT = now;

      commit({
        back,
        blur,
        blurBack,
        dir,
        from: prev,
        fromFront,
        front,
        slot,
      });
      slideRaf.current = requestAnimationFrame(tick);
    };

    slideRaf.current = requestAnimationFrame(tick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photo.id]);

  useEffect(() => {
    return () => cancelAnimationFrame(slideRaf.current);
  }, []);

  const swap = useCallback(() => {
    setFrontCard((card) => (card === "photo" ? "note" : "photo"));
  }, []);

  const makeHandlers = (card: CardId) => ({
    onPointerDown: (event: React.PointerEvent<HTMLDivElement>) => {
      if (slide) {
        return;
      }

      event.currentTarget.setPointerCapture(event.pointerId);
      dragStart.current = {
        t: performance.now(),
        x: event.clientX,
        y: event.clientY,
      };
      dragDistance.current = 0;
      draggedCard.current = card;
      setDrag({ active: true, card, x: 0, y: 0 });
    },
    onPointerMove: (event: React.PointerEvent<HTMLDivElement>) => {
      if (draggedCard.current !== card) {
        return;
      }

      const x = (event.clientX - dragStart.current.x) / scale;
      const y = (event.clientY - dragStart.current.y) / scale;

      dragDistance.current = Math.hypot(x, y);
      setDrag({ active: true, card, x, y });
    },
    onPointerUp: () => {
      if (draggedCard.current !== card) {
        return;
      }

      draggedCard.current = null;

      const dt = Math.max(1, performance.now() - dragStart.current.t);
      const velocity = dragDistance.current / dt;
      const { x: dx, y: dy } = drag;
      const vx = dx / dt;
      const isHorizontal =
        Math.abs(dx) > Math.abs(dy) * CONFIG.navHorizontalRatio;
      const passesNavThreshold =
        Math.abs(dx) > CONFIG.navDistance ||
        Math.abs(vx) > CONFIG.navVelocity;

      if (onNavigate && isHorizontal && passesNavThreshold) {
        suppressClick.current = true;
        onNavigate(dx < 0 ? 1 : -1);
        setDrag({ active: false, card: null, x: 0, y: 0 });
        return;
      }

      if (
        dragDistance.current > CONFIG.flickDistance ||
        velocity > CONFIG.flickVelocity
      ) {
        swap();
        suppressClick.current = true;
      } else if (dragDistance.current > 6) {
        suppressClick.current = true;
      }

      setDrag({ active: false, card: null, x: 0, y: 0 });
    },
    onClick: () => {
      if (suppressClick.current) {
        suppressClick.current = false;
        return;
      }

      if (slide) {
        return;
      }

      const dx = (BACK.x - FRONT.x) * CONFIG.tapFlickStrength;
      const dy = (BACK.y - FRONT.y) * CONFIG.tapFlickStrength;
      const drot =
        (BACK.rotate - FRONT.rotate) * CONFIG.tapFlickStrength * 0.3;

      const kick = frontCard === "photo" ? kickPhoto : kickNote;

      kick({ rotate: drot, x: dx, y: dy });
      swap();
    },
  });

  const tiltFor = (card: CardId) => {
    if (!drag.active || drag.card !== card) {
      return { rotX: 0, rotY: 0, scale: 1, shadow: 0 };
    }

    const rotY = clamp(
      (drag.x / 220) * CONFIG.dragRotYMax,
      -CONFIG.dragRotYMax,
      CONFIG.dragRotYMax,
    );
    const rotX = clamp(
      (-drag.y / 160) * CONFIG.dragRotXMax,
      -CONFIG.dragRotXMax,
      CONFIG.dragRotXMax,
    );
    const dist = Math.hypot(drag.x, drag.y);

    return {
      rotX,
      rotY,
      scale: 1 - Math.min(CONFIG.scaleFalloff, dist / 1400),
      shadow: Math.min(CONFIG.shadowMax, dist / 500),
    };
  };

  const photoTilt = tiltFor("photo");
  const noteTilt = tiltFor("note");

  const zIndexFor = (card: CardId) => {
    if (drag.active && drag.card === card) {
      return 3;
    }

    return frontCard === card ? 2 : 1;
  };

  // Two rigid tracks (front layer, back layer): the incoming stack rides
  // exactly one slot behind the outgoing stack on each, so each pair glides
  // in lockstep — the incoming card "pushes" the outgoing one out. The back
  // track's slower easing is the parallax.
  const slideNewX = slide ? slide.front + slide.dir * slide.slot : 0;
  const slideNewBackX = slide ? slide.back + slide.dir * slide.slot : 0;

  const cardShellStyle = (
    card: CardId,
    spring: SpringTarget,
    tilt: ReturnType<typeof tiltFor>,
    offsetX = 0,
    blur = 0,
  ): React.CSSProperties => ({
    boxShadow: "3.6px 10.8px 36px rgba(0,0,0,0.08)",
    cursor: drag.active && drag.card === card ? "grabbing" : "grab",
    filter: blur > 0.2 ? `blur(${blur}px)` : undefined,
    touchAction: "none",
    transform: `translate(${spring.x + offsetX}px, ${spring.y}px) rotate(${spring.rotate}deg) rotateY(${tilt.rotY}deg) rotateX(${tilt.rotX}deg) scale(${tilt.scale})`,
    zIndex: zIndexFor(card),
  });

  return (
    <div
      style={{
        height: CARD_H,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        width: CARD_W,
      }}
    >
      <div
        className="relative"
        style={{ height: CARD_H, perspective: 1400, width: CARD_W }}
      >
        {slide ? (
          <OutgoingStack slide={slide} metaFontScale={metaFontScale} />
        ) : null}

        <div
          {...makeHandlers("note")}
          className="absolute inset-0 select-none overflow-hidden rounded-[2px] bg-lightgrey transition-opacity duration-300"
          style={{
            ...cardShellStyle(
              "note",
              noteSpring,
              noteTilt,
              slideNewBackX,
              slide ? slide.blurBack : 0,
            ),
            opacity: open ? 1 : 0,
          }}
        >
          <NoteFace
            note={meta.note}
            signature={meta.signature}
            shadow={noteTilt.shadow}
          />
        </div>

        <div
          {...makeHandlers("photo")}
          className="absolute inset-0 select-none overflow-hidden rounded-[2px] bg-fullwhite"
          style={cardShellStyle(
            "photo",
            photoSpring,
            photoTilt,
            slideNewX,
            slide ? slide.blur : 0,
          )}
        >
          <PhotoFace
            photo={photo}
            meta={meta}
            shadow={photoTilt.shadow}
            metaFontScale={metaFontScale}
          />
        </div>
      </div>
    </div>
  );
}

function OutgoingStack({
  slide,
  metaFontScale,
}: {
  slide: SlideState;
  metaFontScale: number;
}) {
  const meta = { ...DEFAULT_META, ...slide.from.meta };
  const photoInFront = slide.fromFront === "photo";

  const positionStyle = (
    pos: SpringTarget,
    offsetX: number,
    blur: number,
    zIndex: number,
  ): React.CSSProperties => ({
    boxShadow: "3.6px 10.8px 36px rgba(0,0,0,0.08)",
    filter: blur > 0.2 ? `blur(${blur}px)` : undefined,
    pointerEvents: "none",
    transform: `translate(${pos.x + offsetX}px, ${pos.y}px) rotate(${pos.rotate}deg)`,
    zIndex,
  });

  return (
    <>
      <div
        className="absolute inset-0 select-none overflow-hidden rounded-[2px] bg-lightgrey"
        style={positionStyle(
          photoInFront ? BACK : FRONT,
          photoInFront ? slide.back : slide.front,
          photoInFront ? slide.blurBack : slide.blur,
          photoInFront ? 1 : 2,
        )}
      >
        <NoteFace note={meta.note} signature={meta.signature} shadow={0} />
      </div>
      <div
        className="absolute inset-0 select-none overflow-hidden rounded-[2px] bg-fullwhite"
        style={positionStyle(
          photoInFront ? FRONT : BACK,
          photoInFront ? slide.front : slide.back,
          photoInFront ? slide.blur : slide.blurBack,
          photoInFront ? 2 : 1,
        )}
      >
        <PhotoFace
          photo={slide.from}
          meta={meta}
          shadow={0}
          metaFontScale={metaFontScale}
        />
      </div>
    </>
  );
}

function PhotoFace({
  photo,
  meta,
  shadow,
  metaFontScale,
}: {
  photo: PostcardProps["photo"];
  meta: Required<PhotoMeta>;
  shadow: number;
  metaFontScale: number;
}) {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] bg-black"
        style={{ opacity: shadow }}
      />
      <div className="flex h-full w-full flex-col gap-4 bg-fullwhite p-4">
        <div
          className="relative shrink-0 overflow-hidden"
          style={{ height: IMG_H }}
        >
          <Image
            src={photo.imageSrc}
            alt={photo.alt ?? "Postcard photo"}
            fill
            draggable={false}
            className="pointer-events-none select-none object-cover"
            sizes={`${CARD_W}px`}
          />
        </div>
        <div className="flex items-start gap-[7px] self-stretch">
          <div className="flex flex-1 flex-col gap-2">
            <InfoRow
              icon={<CameraIcon />}
              value={meta.camera}
              fontScale={metaFontScale}
            />
            <InfoRow
              icon={<FocalLengthIcon />}
              value={meta.focalLength}
              fontScale={metaFontScale}
            />
            <InfoRow
              icon={<LocationIcon />}
              value={meta.location}
              fontScale={metaFontScale}
            />
          </div>
          <div className="flex flex-1 flex-col items-end gap-2">
            <InfoRow
              icon={<ApertureIcon />}
              value={meta.aperture}
              fontScale={metaFontScale}
              fixed
            />
            <InfoRow
              icon={<CalendarIcon />}
              value={meta.date}
              fontScale={metaFontScale}
              fixed
            />
            <InfoRow
              icon={<ShutterIcon />}
              value={meta.shutter}
              fontScale={metaFontScale}
              fixed
            />
          </div>
        </div>
      </div>
    </>
  );
}

function NoteFace({
  note,
  signature,
  shadow,
}: {
  note: string;
  signature: string;
  shadow: number;
}) {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-black"
        style={{ opacity: shadow }}
      />
      <div className="relative flex h-full w-full flex-col justify-between p-6">
        <div className="absolute right-5 top-5 h-14 w-12 rotate-3 border-2 border-dashed border-black/25" />
        <p
          className={`${caveat.className} mt-6 max-w-[80%] text-2xl leading-[1.5] text-black/80`}
        >
          {note}
        </p>
        <div className="flex items-end justify-between">
          <span className={`${caveat.className} text-3xl text-black/70`}>
            {signature}
          </span>
          <div className="h-8 w-16 border-t border-dashed border-black/20" />
        </div>
      </div>
    </>
  );
}

function InfoRow({
  icon,
  value,
  fontScale,
  fixed = false,
}: {
  icon: React.ReactNode;
  value: string;
  fontScale: number;
  fixed?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-[7.2px] ${
        fixed ? "w-[128px]" : "w-full"
      }`}
    >
      {icon}
      <span
        className="whitespace-nowrap font-montreal font-medium text-fullgrey"
        style={{ fontSize: 14 * fontScale, lineHeight: `${18 * fontScale}px` }}
      >
        {value}
      </span>
    </div>
  );
}

function CameraIcon() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <g transform="matrix(1 0 0 1 0 1.742)">
        <path d="M11.413 2.141C11.413 2.141 10.051 0.000 10.051 0.000C10.051 0.000 5.949 0.000 5.949 0.000C5.949 0.000 4.587 2.141 4.587 2.141C4.587 2.141 0.000 2.141 0.000 2.141C0.000 2.141 0.000 12.516 0.000 12.516C0.000 12.516 16.000 12.516 16.000 12.516C16.000 12.516 16.000 2.141 16.000 2.141C16.000 2.141 11.413 2.141 11.413 2.141ZM6.464 0.938C6.464 0.938 9.536 0.938 9.536 0.938C9.536 0.938 10.302 2.141 10.302 2.141C10.302 2.141 5.698 2.141 5.698 2.141C5.698 2.141 6.464 0.938 6.464 0.938ZM15.063 11.578C15.063 11.578 0.938 11.578 0.938 11.578C0.938 11.578 0.938 3.078 0.938 3.078C0.938 3.078 15.063 3.078 15.063 3.078C15.063 3.078 15.063 11.578 15.063 11.578Z" fill="#6C727C" />
      </g>
      <g transform="matrix(1 0 0 1 4.641 5.711)">
        <path d="M3.359 0.000C1.507 0.000 0.000 1.507 0.000 3.359C0.000 5.212 1.507 6.719 3.359 6.719C5.212 6.719 6.719 5.212 6.719 3.359C6.719 1.507 5.212 0.000 3.359 0.000ZM3.359 5.781C2.024 5.781 0.938 4.695 0.938 3.359C0.938 2.024 2.024 0.938 3.359 0.938C4.695 0.938 5.781 2.024 5.781 3.359C5.781 4.695 4.695 5.781 3.359 5.781Z" fill="#6C727C" />
      </g>
      <g transform="matrix(1 0 0 1 13.133 5.703)">
        <path d="M0.000 0.000C0.000 0.000 0.953 0.000 0.953 0.000C0.953 0.000 0.953 0.953 0.953 0.953C0.953 0.953 0.000 0.953 0.000 0.953C0.000 0.953 0.000 0.000 0.000 0.000Z" fill="#6C727C" />
      </g>
    </svg>
  );
}

function FocalLengthIcon() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <g transform="matrix(0 1 -1 0 16 0)">
        <path d="M0.000 0.000C0.000 0.000 0.000 16.000 0.000 16.000C0.000 16.000 16.000 16.000 16.000 16.000C16.000 16.000 16.000 0.000 16.000 0.000C16.000 0.000 0.000 0.000 0.000 0.000ZM15.063 0.980C15.063 0.980 15.063 1.889 15.063 1.889C15.063 1.889 0.938 1.889 0.938 1.889C0.938 1.889 0.938 0.980 0.938 0.980C0.938 0.980 15.063 0.980 15.063 0.980ZM6.766 15.063C6.958 14.568 7.439 14.216 8.000 14.216C8.561 14.216 9.042 14.568 9.234 15.063C9.234 15.063 6.766 15.063 6.766 15.063ZM10.210 15.063C9.990 14.044 9.083 13.279 8.000 13.279C6.917 13.279 6.010 14.044 5.790 15.063C5.790 15.063 0.938 15.063 0.938 15.063C0.938 15.063 0.938 2.827 0.938 2.827C0.938 2.827 15.063 2.827 15.063 2.827C15.063 2.827 15.063 15.063 15.063 15.063C15.063 15.063 10.210 15.063 10.210 15.063Z" fill="#6C727C" />
        <path transform="matrix(1 0 0 1 6.261 3.636)" d="M2.814 2.401C2.814 2.401 3.477 1.739 3.477 1.739C3.477 1.739 1.739 0.000 1.739 0.000C1.739 0.000 0.000 1.739 0.000 1.739C0.000 1.739 0.663 2.401 0.663 2.401C0.663 2.401 1.270 1.795 1.270 1.795C1.270 1.795 1.270 6.991 1.270 6.991C1.270 6.991 0.663 6.384 0.663 6.384C0.663 6.384 0.000 7.047 0.000 7.047C0.000 7.047 1.739 8.786 1.739 8.786C1.739 8.786 3.477 7.047 3.477 7.047C3.477 7.047 2.814 6.384 2.814 6.384C2.814 6.384 2.207 6.991 2.207 6.991C2.207 6.991 2.207 1.795 2.207 1.795C2.207 1.795 2.814 2.401 2.814 2.401Z" fill="#6C727C" />
      </g>
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <g transform="matrix(1 0 0 1 2.205 0)">
        <path d="M5.795 0.000C2.599 0.000 0.000 2.599 0.000 5.795C0.000 9.760 5.186 15.581 5.406 15.827C5.614 16.058 5.976 16.057 6.183 15.827C6.404 15.581 11.589 9.760 11.589 5.795C11.589 2.599 8.990 0.000 5.795 0.000ZM5.795 14.679C4.049 12.606 1.043 8.516 1.043 5.795C1.043 3.175 3.175 1.043 5.795 1.043C8.414 1.043 10.546 3.175 10.546 5.795C10.546 8.516 7.540 12.605 5.795 14.679Z" fill="#6C727C" />
      </g>
      <g transform="matrix(1 0 0 1 5.085 2.879)">
        <path d="M2.915 0.000C1.308 0.000 0.000 1.308 0.000 2.915C0.000 4.523 1.308 5.831 2.915 5.831C4.523 5.831 5.831 4.523 5.831 2.915C5.831 1.308 4.523 0.000 2.915 0.000ZM2.915 4.787C1.883 4.787 1.044 3.948 1.044 2.915C1.044 1.883 1.883 1.043 2.915 1.043C3.948 1.043 4.787 1.883 4.787 2.915C4.787 3.948 3.948 4.787 2.915 4.787Z" fill="#6C727C" />
      </g>
    </svg>
  );
}

function ApertureIcon() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <path d="M8.000 0.000C3.589 0.000 0.000 3.589 0.000 8.000C0.000 12.411 3.589 16.000 8.000 16.000C12.411 16.000 16.000 12.411 16.000 8.000C16.000 3.589 12.411 0.000 8.000 0.000ZM8.000 0.938C9.315 0.938 10.546 1.299 11.602 1.927C11.602 1.927 5.511 6.353 5.511 6.353C5.511 6.353 4.128 2.097 4.128 2.097C5.240 1.364 6.571 0.938 8.000 0.938ZM8.001 5.702C8.001 5.702 10.185 7.289 10.185 7.289C10.185 7.289 9.350 9.858 9.350 9.858C9.350 9.858 6.650 9.858 6.650 9.858C6.650 9.858 5.815 7.290 5.815 7.290C5.815 7.290 8.001 5.702 8.001 5.702ZM0.938 8.000C0.938 5.891 1.867 3.995 3.338 2.700C3.338 2.700 5.664 9.858 5.664 9.858C5.664 9.858 1.186 9.858 1.186 9.858C1.024 9.266 0.938 8.643 0.938 8.000ZM7.662 15.054C4.906 14.924 2.558 13.206 1.515 10.796C1.515 10.796 9.046 10.796 9.046 10.796C9.046 10.796 7.662 15.054 7.662 15.054ZM8.655 15.032C8.655 15.032 10.983 7.868 10.983 7.868C10.983 7.868 14.605 10.500 14.605 10.500C13.667 12.969 11.384 14.780 8.655 15.032ZM8.798 5.123C8.798 5.123 12.417 2.494 12.417 2.494C14.029 3.789 15.063 5.776 15.063 8.000C15.063 8.532 15.003 9.050 14.891 9.549C14.891 9.549 8.798 5.123 8.798 5.123Z" fill="#6C727C" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <path d="M15.375 12.250C14.341 12.250 13.500 11.409 13.500 10.375C13.500 10.375 13.500 1.875 13.500 1.875C13.500 1.530 13.220 1.250 12.875 1.250C12.875 1.250 11.000 1.250 11.000 1.250C11.000 1.250 11.000 0.625 11.000 0.625C11.000 0.280 10.720 0.000 10.375 0.000C10.030 0.000 9.750 0.280 9.750 0.625C9.750 0.625 9.750 1.250 9.750 1.250C9.750 1.250 3.750 1.250 3.750 1.250C3.750 1.250 3.750 0.625 3.750 0.625C3.750 0.280 3.470 0.000 3.125 0.000C2.780 0.000 2.500 0.280 2.500 0.625C2.500 0.625 2.500 1.250 2.500 1.250C2.500 1.250 0.625 1.250 0.625 1.250C0.280 1.250 0.000 1.530 0.000 1.875C0.000 1.875 0.000 15.375 0.000 15.375C0.000 15.720 0.280 16.000 0.625 16.000C0.625 16.000 12.875 16.000 12.875 16.000C13.220 16.000 13.500 15.720 13.500 15.375C13.500 15.375 13.500 13.500 13.500 13.500C13.500 13.500 15.375 13.500 15.375 13.500C15.720 13.500 16.000 13.220 16.000 12.875C16.000 12.530 15.720 12.250 15.375 12.250ZM3.125 12.250C2.091 12.250 1.250 11.409 1.250 10.375C1.250 10.375 1.250 6.250 1.250 6.250C1.250 6.250 12.250 6.250 12.250 6.250C12.250 6.250 12.250 10.375 12.250 10.375C12.250 11.078 12.483 11.727 12.876 12.250C12.876 12.250 3.125 12.250 3.125 12.250ZM2.500 2.500C2.500 2.500 2.500 3.125 2.500 3.125C2.500 3.470 2.780 3.750 3.125 3.750C3.470 3.750 3.750 3.470 3.750 3.125C3.750 3.125 3.750 2.500 3.750 2.500C3.750 2.500 9.750 2.500 9.750 2.500C9.750 2.500 9.750 3.125 9.750 3.125C9.750 3.470 10.030 3.750 10.375 3.750C10.720 3.750 11.000 3.470 11.000 3.125C11.000 3.125 11.000 2.500 11.000 2.500C11.000 2.500 12.250 2.500 12.250 2.500C12.250 2.500 12.250 5.000 12.250 5.000C12.250 5.000 1.250 5.000 1.250 5.000C1.250 5.000 1.250 2.500 1.250 2.500C1.250 2.500 2.500 2.500 2.500 2.500ZM12.250 14.750C12.250 14.750 1.250 14.750 1.250 14.750C1.250 14.750 1.250 12.873 1.250 12.873C1.773 13.267 2.422 13.500 3.125 13.500C3.125 13.500 12.250 13.500 12.250 13.500C12.250 13.500 12.250 14.750 12.250 14.750Z" fill="#6C727C" />
    </svg>
  );
}

function ShutterIcon() {
  return (
    <svg viewBox="0 0 12.13 16" width="13" height="16" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <path d="M11.585 14.902C11.585 14.902 10.644 14.902 10.644 14.902C10.644 14.902 10.644 13.216 10.644 13.216C10.644 11.510 9.708 9.942 8.008 8.800C7.797 8.658 7.665 8.352 7.665 8.000C7.665 7.648 7.797 7.342 8.008 7.200C9.708 6.058 10.644 4.490 10.644 2.784C10.644 2.784 10.644 1.098 10.644 1.098C10.644 1.098 11.585 1.098 11.585 1.098C11.888 1.098 12.134 0.852 12.134 0.549C12.134 0.246 11.888 0.000 11.585 0.000C11.585 0.000 0.549 0.000 0.549 0.000C0.246 0.000 0.000 0.246 0.000 0.549C0.000 0.852 0.246 1.098 0.549 1.098C0.549 1.098 1.490 1.098 1.490 1.098C1.490 1.098 1.490 2.784 1.490 2.784C1.490 4.490 2.426 6.058 4.126 7.200C4.337 7.342 4.469 7.648 4.469 8.000C4.469 8.352 4.337 8.658 4.126 8.800C2.426 9.942 1.490 11.510 1.490 13.216C1.490 13.216 1.490 14.902 1.490 14.902C1.490 14.902 0.549 14.902 0.549 14.902C0.246 14.902 0.000 15.148 0.000 15.451C0.000 15.754 0.246 16.000 0.549 16.000C0.549 16.000 11.585 16.000 11.585 16.000C11.888 16.000 12.134 15.754 12.134 15.451C12.134 15.148 11.888 14.902 11.585 14.902ZM2.588 13.216C2.588 11.423 3.935 10.251 4.738 9.712C5.257 9.363 5.567 8.723 5.567 8.000C5.567 7.277 5.257 6.637 4.738 6.288C3.935 5.749 2.588 4.577 2.588 2.784C2.588 2.784 2.588 1.098 2.588 1.098C2.588 1.098 9.546 1.098 9.546 1.098C9.546 1.098 9.546 2.784 9.546 2.784C9.546 4.577 8.199 5.749 7.396 6.288C6.877 6.637 6.567 7.277 6.567 8.000C6.567 8.724 6.877 9.363 7.396 9.712C8.199 10.251 9.546 11.423 9.546 13.216C9.546 13.216 9.546 14.902 9.546 14.902C9.546 14.902 2.588 14.902 2.588 14.902C2.588 14.902 2.588 13.216 2.588 13.216Z" fill="#6C727C" />
    </svg>
  );
}
