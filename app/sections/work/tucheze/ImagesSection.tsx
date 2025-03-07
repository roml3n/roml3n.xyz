import React from "react";
import Image from "next/image";

const CasePhotos = [
  { imageSrc: "/images/work/tucheze/r1-img1.png" },
  { imageSrc: "/images/work/tucheze/r1-img2.png" },
  { imageSrc: "/images/work/tucheze/r1-img3.png" },
  { imageSrc: "/images/work/tucheze/r2-img1.png" },
  { imageSrc: "/images/work/tucheze/r2-img2.png" },
  { imageSrc: "/images/work/tucheze/r2-img3.png" },
  { imageSrc: "/images/work/tucheze/r3-img1.png" },
  { imageSrc: "/images/work/tucheze/r3-img2.png" },
  { imageSrc: "/images/work/tucheze/r3-img3.png" },
  { imageSrc: "/images/work/tucheze/r4-img1.png" },
  { imageSrc: "/images/work/tucheze/r4-img2.png" },
  { imageSrc: "/images/work/tucheze/r4-img3.png" },
  { imageSrc: "/images/work/tucheze/r5-img1.png" },
  { imageSrc: "/images/work/tucheze/r5-img2.png" },
  { imageSrc: "/images/work/tucheze/r5-img3.png" },
];
const ImagesSection = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
      {CasePhotos.map((photo, index) => (
        <Image
          key={index}
          src={photo.imageSrc}
          alt="Tucheze screenshot"
          width={572}
          height={1156}
          className="pb-2"
        />
      ))}
    </div>
  );
};

export default ImagesSection;
