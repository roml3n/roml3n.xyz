import Image from "next/image";

const aboutPhotos = [
  {
    src: "/images/about/about-office.webp",
    alt: "Team working at a shared table",
    aspectClass: "aspect-[250/170.667]",
    imageClassName: "size-full object-cover",
  },
  {
    src: "/images/about/about-bike.webp",
    alt: "Cycling outdoors",
    aspectClass: "aspect-[250/235.556]",
    imageClassName:
      "absolute left-0 w-full max-w-none object-cover h-[141.51%] top-[-6.22%]",
  },
  {
    src: "/images/about/about-me.webp",
    alt: "Portrait outdoors",
    aspectClass: "aspect-[250/235.556]",
    imageClassName:
      "absolute left-0 w-full max-w-none object-cover h-[141.51%] top-[-35.29%]",
  },
  {
    src: "/images/about/about-apollo.webp",
    alt: "Cat relaxing",
    aspectClass: "aspect-[250/170.667]",
    imageClassName:
      "absolute left-0 w-full max-w-none object-cover h-[239.45%] top-[-50.68%]",
  },
] as const;

export const AboutPhotoGrid = () => {
  const [colATop, colABottom, colBTop, colBBottom] = aboutPhotos;

  return (
    <div className="flex w-full min-w-0 gap-4 lg:w-[516px] lg:max-w-[min(516px,48%)] lg:shrink-0">
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <div
          className={`relative w-full overflow-hidden rounded-2xl bg-[#dfdfdf] ${colATop.aspectClass}`}
        >
          <Image
            src={colATop.src}
            alt={colATop.alt}
            width={675}
            height={1080}
            className={colATop.imageClassName}
            sizes="(max-width: 1024px) 45vw, 250px"
          />
        </div>
        <div
          className={`relative w-full overflow-hidden rounded-2xl bg-[#dfdfdf] ${colABottom.aspectClass}`}
        >
          <Image
            src={colABottom.src}
            alt={colABottom.alt}
            width={675}
            height={1080}
            className={colABottom.imageClassName}
            sizes="(max-width: 1024px) 45vw, 250px"
          />
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <div
          className={`relative w-full overflow-hidden rounded-2xl bg-[#dfdfdf] ${colBTop.aspectClass}`}
        >
          <Image
            src={colBTop.src}
            alt={colBTop.alt}
            width={675}
            height={1080}
            className={colBTop.imageClassName}
            sizes="(max-width: 1024px) 45vw, 250px"
          />
        </div>
        <div
          className={`relative w-full overflow-hidden rounded-2xl bg-[#dfdfdf] ${colBBottom.aspectClass}`}
        >
          <Image
            src={colBBottom.src}
            alt={colBBottom.alt}
            width={675}
            height={1080}
            className={colBBottom.imageClassName}
            sizes="(max-width: 1024px) 45vw, 250px"
          />
        </div>
      </div>
    </div>
  );
};
