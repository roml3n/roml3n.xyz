import React, { useState } from "react";
import Image from "next/image";
import { useIntersectionObserver } from "@/app/hooks/useIntersectionObserver";

interface LazyImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  placeholder = "empty",
  blurDataURL,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "100px",
  });

  const shouldLoad = priority || hasIntersected;

  return (
    <div ref={ref} className={`relative ${className}`}>
      {shouldLoad ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setIsLoaded(true)}
          priority={priority}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
        />
      ) : (
        <div className="bg-lightgrey animate-pulse" style={{ width, height }} />
      )}
    </div>
  );
};
