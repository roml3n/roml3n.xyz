"use client";
import Image from "next/image";
import React, { lazy, useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { LazyWrapper } from "@/app/components/LazyWrapper";
import { photos } from "@/app/data/photos";

// Lazy load the Photo component - keep original name
const Photo = lazy(() =>
  import("@/app/components/Photo").then((module) => ({
    default: module.Photo,
  })),
);

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
};

const Photos = () => {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [isTabletOrDesktop, setIsTabletOrDesktop] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [slideDirection, setSlideDirection] = useState(1);
  const leftArrowControls = useAnimationControls();
  const rightArrowControls = useAnimationControls();

  const closeModal = useCallback(() => {
    setActivePhotoIndex(null);
  }, []);

  const openAt = useCallback(
    (index: number) => {
      if (!isTabletOrDesktop) return;
      setSlideDirection(1);
      setActivePhotoIndex(index);
    },
    [isTabletOrDesktop],
  );

  const runArrowFeedback = useCallback(
    (controls: ReturnType<typeof useAnimationControls>, direction: 1 | -1) => {
      const amplitude = 5 * direction;
      return controls.start({
        scale: [1, 0.88, 1],
        x: [0, amplitude, 0],
        transition: { duration: 0.28, ease: "easeInOut" },
      });
    },
    [],
  );

  const goPrev = useCallback(() => {
    if (activePhotoIndex === null || activePhotoIndex === 0) return;
    setSlideDirection(-1);
    setActivePhotoIndex(activePhotoIndex - 1);
    void runArrowFeedback(leftArrowControls, -1);
  }, [activePhotoIndex, leftArrowControls, runArrowFeedback]);

  const goNext = useCallback(() => {
    if (activePhotoIndex === null || activePhotoIndex === photos.length - 1)
      return;
    setSlideDirection(1);
    setActivePhotoIndex(activePhotoIndex + 1);
    void runArrowFeedback(rightArrowControls, 1);
  }, [activePhotoIndex, rightArrowControls, runArrowFeedback]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const syncViewport = (event?: MediaQueryListEvent) => {
      const matches = event ? event.matches : mediaQuery.matches;
      setIsTabletOrDesktop(matches);
      if (!matches) {
        setActivePhotoIndex(null);
      }
    };

    syncViewport();
    mediaQuery.addEventListener("change", syncViewport);
    return () => {
      mediaQuery.removeEventListener("change", syncViewport);
    };
  }, []);

  useEffect(() => {
    if (activePhotoIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activePhotoIndex]);

  useEffect(() => {
    if (activePhotoIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
      if (event.key === "ArrowLeft") {
        goPrev();
      }
      if (event.key === "ArrowRight") {
        goNext();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [activePhotoIndex, closeModal, goNext, goPrev]);

  const atFirstPhoto = activePhotoIndex === 0;
  const atLastPhoto = activePhotoIndex === photos.length - 1;
  const lightbox =
    activePhotoIndex !== null ? (
      <div
        className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/55 px-4 md:px-8"
        role="dialog"
        aria-modal="true"
        aria-label="Photo viewer"
        onClick={closeModal}
      >
        <button
          type="button"
          aria-label="Previous photo"
          onClick={(event) => {
            event.stopPropagation();
            goPrev();
          }}
          className={`absolute left-4 top-1/2 -translate-y-1/2 transition-opacity md:left-10 ${
            atFirstPhoto ? "opacity-30" : "opacity-90 hover:opacity-100"
          }`}
        >
          <motion.span animate={leftArrowControls} className="inline-flex">
            <Image
              src="/images/icons/nav-left-arrow.svg"
              alt=""
              width={48}
              height={48}
              aria-hidden="true"
            />
          </motion.span>
        </button>

        <div
          className="relative h-[min(84vh,980px)] w-[min(46vw,760px)] overflow-hidden rounded-[4px] shadow-2xl"
          onClick={(event) => event.stopPropagation()}
        >
          <AnimatePresence initial={false} mode="wait" custom={slideDirection}>
            <motion.div
              key={activePhotoIndex}
              className="absolute inset-0"
              custom={slideDirection}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={photos[activePhotoIndex].imageSrc}
                alt={`Photo ${activePhotoIndex + 1} of ${photos.length}`}
                fill
                className="object-cover"
                sizes="(min-width: 1280px) 760px, 46vw"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          type="button"
          aria-label="Next photo"
          onClick={(event) => {
            event.stopPropagation();
            goNext();
          }}
          className={`absolute right-4 top-1/2 -translate-y-1/2 transition-opacity md:right-10 ${
            atLastPhoto ? "opacity-30" : "opacity-90 hover:opacity-100"
          }`}
        >
          <motion.span animate={rightArrowControls} className="inline-flex">
            <Image
              src="/images/icons/nav-right-arrow.svg"
              alt=""
              width={48}
              height={48}
              aria-hidden="true"
            />
          </motion.span>
        </button>
      </div>
    ) : null;

  return (
    <>
      <section className="content-start w-full min-h-[calc(100dvh-20rem)] md:min-h-[calc(100dvh-23rem)] mt-24 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 grid-rows-auto gap-x-4 md:gap-x-6 gap-y-9 md:gap-y-16 relative justify-center self-center">
        <div className="row-span-1 col-span-2 flex flex-col gap-1">
          <h2 className="h2"> Photos </h2>
          <h2 className="h2 opacity-40"> [{photos.length}] </h2>
        </div>

        <div className="row-start-2 col-span-4 md:col-span-8 lg:col-span-12 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {photos.map((photo, index) => (
            <LazyWrapper key={index}>
              <Photo
                imageSrc={photo.imageSrc}
                alt={`Photo ${index + 1}`}
                interactive={isTabletOrDesktop}
                onClick={() => openAt(index)}
              />
            </LazyWrapper>
          ))}
        </div>
      </section>

      {isMounted && lightbox ? createPortal(lightbox, document.body) : null}
    </>
  );
};

export default Photos;
