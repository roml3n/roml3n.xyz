import type { AboutStickerDef } from "@/app/data/aboutStickers";

type AboutStickerArtProps = {
  sticker: AboutStickerDef;
};

export const AboutStickerArt = ({ sticker }: AboutStickerArtProps) => {
  const bleedStyle = {
    top: `${sticker.bleed.top}%`,
    right: `${sticker.bleed.right}%`,
    bottom: `${sticker.bleed.bottom}%`,
    left: `${sticker.bleed.left}%`,
  };

  if (sticker.kind === "raycast" && sticker.src) {
    return (
      <div className="flex size-full items-center justify-center">
        <div
          className="relative h-[84.63%] w-[85.26%]"
          style={{ rotate: `${sticker.innerRotateDeg ?? 0}deg` }}
        >
          <div className="absolute" style={bleedStyle}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src={sticker.src}
              className="block size-full max-w-none"
              draggable={false}
            />
          </div>
        </div>
      </div>
    );
  }

  if (!sticker.src) return null;

  return (
    <div className="relative size-full">
      <div className="absolute" style={bleedStyle}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src={sticker.src}
          width={sticker.id === "figma" ? 132 : undefined}
          height={sticker.id === "figma" ? 148 : undefined}
          className="block size-full max-w-none"
          draggable={false}
        />
      </div>
    </div>
  );
};
