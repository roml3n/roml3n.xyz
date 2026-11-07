"use client";

import React, { useEffect, useRef } from "react";

const isVideoSrc = (src: string) => /\.(webm|mp4|mov)$/i.test(src);

const isInteractiveFillSrc = (src: string) => isVideoSrc(src);

type WorkCardCoverFillProps = {
  coverFill: string;
  isActive?: boolean;
  canInteract?: boolean;
};

const WorkCardCoverFill = ({
  coverFill,
  isActive = false,
  canInteract = true,
}: WorkCardCoverFillProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldPlay = isActive && canInteract;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVideoSrc(coverFill)) return;

    const syncPausedFrame = () => {
      video.pause();
      try {
        video.currentTime = 0;
      } catch {
        /* metadata may not be ready */
      }
    };

    if (video.readyState >= 1) {
      syncPausedFrame();
    } else {
      video.addEventListener("loadeddata", syncPausedFrame, { once: true });
      return () => video.removeEventListener("loadeddata", syncPausedFrame);
    }
  }, [coverFill]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVideoSrc(coverFill)) return;

    if (shouldPlay) {
      void video.play().catch(() => undefined);
      return;
    }

    video.pause();
    try {
      video.currentTime = 0;
    } catch {
      /* noop */
    }
  }, [coverFill, shouldPlay]);

  if (!isVideoSrc(coverFill)) {
    return null;
  }

  return (
    <div
      aria-hidden={true}
      className="pointer-events-none absolute inset-0 z-0 size-full"
    >
      <video
        ref={videoRef}
        src={coverFill}
        loop
        muted
        playsInline
        preload="metadata"
        className="size-full object-cover"
      />
    </div>
  );
};

export { isInteractiveFillSrc, isVideoSrc };
export default WorkCardCoverFill;
