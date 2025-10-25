"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useState, Suspense } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface CarouselImage {
  src: string;
  alt: string;
  type?: "image" | "video";
}

interface CaseImageCarouselProps {
  images: CarouselImage[];
  caption?: string;
  autoScrollDelay?: number;
}

const LoadingFallback = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mainblue"></div>
  </div>
);

const CaseImageCarousel = ({
  images,
  caption,
  autoScrollDelay = 3000,
}: CaseImageCarouselProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [videoRefs, setVideoRefs] = useState<HTMLVideoElement[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: autoScrollDelay, stopOnInteraction: false }),
  ]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const newIndex = emblaApi.selectedScrollSnap();
    setSelectedIndex(newIndex);

    // Handle video playback
    videoRefs.forEach((video, index) => {
      if (video) {
        if (index === newIndex && images[index]?.type === "video") {
          // Play current video
          video.currentTime = 0;
          video.play().catch(console.error);
        } else {
          // Pause other videos
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [emblaApi, videoRefs, images]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // If only one image/video, render static version
  if (images.length === 1) {
    const item = images[0];
    return (
      <Suspense fallback={<LoadingFallback />}>
        <div className="flex flex-col items-center rounded-md p-12 gap-3 bg-[#EFEFEF]">
          {item.type === "video" ? (
            <video
              ref={(el) => {
                if (el) {
                  setVideoRefs([el]);
                  el.play().catch(console.error);
                }
              }}
              src={item.src}
              className="w-full h-auto"
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <Image
              src={item.src}
              alt={item.alt}
              width={1920}
              height={1080}
              className="w-full h-auto"
            />
          )}
          {caption && (
            <p className="h5 text-center italic opacity-70">{caption}</p>
          )}
        </div>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<LoadingFallback />}>
      <div className="flex flex-col items-center rounded-md p-12 gap-3 bg-[#EFEFEF]">
        <div
          className={`overflow-hidden w-full h-fit transition-[height] duration-500 ease-in-out ${images.length > 1 ? "cursor-grab active:cursor-grabbing" : ""}`}
          ref={emblaRef}
        >
          <div className="flex items-center w-full">
            {images.map((item, index) => (
              <div key={index} className="flex-[0_0_100%] min-w-0">
                {item.type === "video" ? (
                  <video
                    ref={(el) => {
                      if (el) {
                        const newRefs = [...videoRefs];
                        newRefs[index] = el;
                        setVideoRefs(newRefs);
                        // Only play if this is the first slide
                        if (index === 0) {
                          el.play().catch(console.error);
                        }
                      }
                    }}
                    src={item.src}
                    className="w-full h-auto"
                    muted
                    playsInline
                  />
                ) : (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Indicator dots */}
        <div className="flex gap-1 mt-1">
          {images.map((_, index) => (
            <button
              key={index}
              className={`transition-all duration-300 ${
                index === selectedIndex
                  ? "h-2 rounded-full bg-fullgrey"
                  : "w-2 h-2 rounded-full bg-midgrey"
              }`}
              style={index === selectedIndex ? { width: "20px" } : {}}
              onClick={() => emblaApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {caption && (
          <p className="h5 text-center italic opacity-70">{caption}</p>
        )}
      </div>
    </Suspense>
  );
};

export default CaseImageCarousel;
