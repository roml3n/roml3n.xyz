import React from "react";
import Image from "next/image";

interface WorkProblemCardProps {
  imgSrc: string;
  problem: string;
  description: string[];
  className?: string;
}

const WorkProblemsCard: React.FC<WorkProblemCardProps> = ({
  imgSrc,
  problem = "Name",
  description = ["Description"],
  className = "",
}) => {
  return (
    <div
      className={`bg-almostwhite flex flex-col w-full gap-6 p-6 rounded-3xl overflow-hidden ${className}`}
    >
      <div className="flex items-center h4 font-medium gap-4">
        <Image
          className="relative w-[52px] h-[52px]"
          alt="Img"
          width={64}
          height={64}
          src={imgSrc}
        />
        <div className="w-fit h4">{problem}</div>
      </div>
      <ul className="list-disc pl-5">
        {description.map((description, index) => (
          <li key={index} className="h4 w-full">
            {description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkProblemsCard;
