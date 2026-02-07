import React from "react";
import Image from "next/image";

interface InterviewCardProps {
  imgSrc: string;
  title: string;
  description: string;
}

const WayaInterviewCard: React.FC<InterviewCardProps> = ({
  imgSrc,
  title,
  description,
}) => {
  return (
    <div className="bg-almostwhite flex flex-col w-full gap-3 p-6 rounded-3xl overflow-hidden bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,214.2,0,0.1)_0%,rgba(255,252.08,244.56,0)_100%)]">
      <Image
        alt="Img"
        width={36}
        height={36}
        src={imgSrc}
      />

      <div className="w-fit h4 font-medium">{title}</div>
      <div className="w-fit opacity-70 h4">{description}</div>
    </div>
  );
};

export default WayaInterviewCard;
