import React from "react";
import Link from "next/link";

interface WorkCardProps {
  children: React.ReactNode;
  index: number;
  activeIndex: number;
  href: string;
}

export const WorkCard: React.FC<WorkCardProps> = ({
  children,
  index,
  activeIndex,
  href,
}) => {
  const topValue = 150 + (index - 1) * 16;

  const scale = index < activeIndex ? Math.pow(0.98, activeIndex - index) : 1;

  return (
    <div
      className="work-card w-full flex flex-col h-fit pt-8 px-16 gap-6 bg-fullwhite rounded-[16px] border border-solid border-midgrey items-center justify-center sticky"
      style={{
        top: `${topValue}px`,
        transform: `scale(${scale})`,
        transition: "transform 0.3s ease",
        zIndex: 100 + index,
      }}
    >
      <Link href={href} className="w-full h-full flex flex-col items-center">
        {children}
      </Link>
    </div>
  );
};
