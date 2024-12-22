import React from "react";
import Image from "next/image";

const AnalysisCard = ({
  imgSrc,
  title,
  desc,
  className = "",
}: {
  imgSrc: string;
  title: string;
  desc: string;
  className?: string;
}) => {
  return (
    <div className={`flex flex-col gap-4 rounded-2xl p-6 ${className}`}>
      <div className="flex gap-2 items-center">
        <Image src={imgSrc} height={32} width={32} alt="icon" />
        <p className="h4 font-medium">{title}</p>
      </div>
      <p className="h4 opacity-60">{desc}</p>
    </div>
  );
};

export default AnalysisCard;
