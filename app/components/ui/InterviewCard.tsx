import React from "react";
import Image from "next/image";

interface InterviewCardProps {
  imgSrc: string;
  name: string;
  role: string;
  quote: string;
}

const InterviewCard: React.FC<InterviewCardProps> = ({
  imgSrc,
  name = "Name",
  role = "Role",
  quote = "Quote",
}) => {
  return (
    <div className="bg-almostwhite flex flex-col w-full gap-6 p-6 rounded-3xl overflow-hidden bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,214.2,0,0.1)_0%,rgba(255,252.08,244.56,0)_100%)]">
      <div className="inline-flex gap-2 flex-[0_0_auto] items-start relative">
        <Image
          className="relative w-[52px] h-[52px]"
          alt="Img"
          width={64}
          height={64}
          src={imgSrc}
        />

        <div className="flex flex-col">
          <div className="w-fit h4">{name}</div>
          <div className="w-fit opacity-40 h4 uppercase">{role}</div>
        </div>
      </div>

      <p className="h4 w-full">{quote}</p>
    </div>
  );
};

export default InterviewCard;
