import React, { useEffect, useRef } from "react";

const CautionMarquee: React.FC<{ direction?: "left" | "right" }> = ({
  direction = "left",
}) => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const marqueeElement = marqueeRef.current;
    if (!marqueeElement) return;

    let position = 0;
    const speed = 0.5; // Reduced speed for slower movement
    const multiplier = direction === "left" ? -1 : 1;

    const animate = () => {
      position += speed * multiplier;

      // Get the width of a single item (approximation)
      const singleItemWidth = 150; // Estimate based on text and spacing

      // Reset position when one item has scrolled out of view
      if (direction === "left" && position <= -singleItemWidth) {
        position += singleItemWidth;
      } else if (direction === "right" && position >= 0) {
        position = -singleItemWidth;
      }

      marqueeElement.style.transform = `translateX(${position}px)`;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    // Cleanup function
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [direction]);

  return (
    <div className="w-full h-12 bg-[#FCC014] relative shadow-lg">
      {/* Black diagonal stripes */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, #000, #000 10px, transparent 10px, transparent 20px)",
          backgroundSize: "28.28px 28.28px",
        }}
      ></div>

      {/* Coming Soon Text Marquee */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden shadow-xl border border-black/30">
        <div
          ref={marqueeRef}
          className="flex w-screen z-20 whitespace-nowrap "
          style={{ backgroundColor: "#FCC014" }}
        >
          {[...Array(300)].map((_, i) => (
            <span
              key={i}
              className="h5 p-1 !text-black font-medium"
              style={{ backgroundColor: "#FCC014" }}
            >
              COMING SOON&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CautionMarquee;
