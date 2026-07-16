"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface CarouselImage {
  src: string;
  alt: string;
  type?: "image" | "video";
}

interface CaseImageCarouselProps {
  images: CarouselImage[];
  caption?: string;
}

const CaseImageCarousel = ({ images, caption }: CaseImageCarouselProps) => {
  const isSingle = images.length === 1;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex]);

  const lightbox = activeIndex !== null && (
    <div
      onClick={() => setActiveIndex(null)}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-white/30 backdrop-blur-xl animate-[fadeIn_0.25s_ease-out]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-fit h-fit p-3 bg-white border border-black/10 rounded-3xl shadow-2xl animate-[growIn_0.3s_cubic-bezier(0.16,1,0.3,1)]"
      >
        <Image
          src={images[activeIndex].src}
          alt=""
          width={2400}
          height={1350}
          className="w-auto h-auto max-w-[96vw] max-h-[94vh] rounded-sm object-contain"
        />
      </div>
    </div>
  );

  return (
    <>
      <div className="flex flex-col items-center rounded-2xl p-3 gap-3 bg-[#EFEFEF] w-full">
        <div className={`grid w-full gap-3 ${isSingle ? "grid-cols-1" : "md:grid-cols-2"}`}>
          {images.map((item, index) => (
            <div
              key={index}
              onClick={() => item.type !== "video" && setActiveIndex(index)}
              className={`relative w-full aspect-[16/10] rounded-[4px] overflow-hidden ${
                item.type !== "video" ? "cursor-zoom-in" : ""
              }`}
            >
              {item.type === "video" ? (
                <video
                  src={item.src}
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                />
              )}
            </div>
          ))}
        </div>

        {caption && <p className="h5 text-center italic opacity-70">{caption}</p>}
      </div>

      {mounted && lightbox && createPortal(lightbox, document.body)}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes growIn {
          from { opacity: 0; transform: scale(0.65); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  );
};

export default CaseImageCarousel;