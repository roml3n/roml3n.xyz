import React from "react";
import Image from "next/image";

export const Photo: React.FC<{
  imageSrc: string;
  alt: string;
  onClick?: () => void;
  interactive?: boolean;
}> = ({ imageSrc, alt, onClick, interactive = false }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!interactive || !onClick) return;
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    onClick();
  };

  return (
    <div
      className={`relative w-full aspect-[4/5] rounded-[4%] overflow-hidden border border-solid border-midgrey ${
        interactive
          ? "cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fullgrey focus-visible:ring-offset-2"
          : ""
      }`}
      onClick={interactive ? onClick : undefined}
      onKeyDown={handleKeyDown}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? `Open ${alt}` : undefined}
    >
      <Image src={imageSrc} alt={alt} fill className="object-cover" />
    </div>
  );
};
