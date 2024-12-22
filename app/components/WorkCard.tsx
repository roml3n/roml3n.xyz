import React from "react";

interface WorkCardProps {
  children: React.ReactNode;
  index: number;
  activeIndex: number;
}

export const WorkCard: React.FC<WorkCardProps> = ({ children, index, activeIndex }) => {
    const topValue = 150 + (index - 1) * 16;

  const scale =
    index < activeIndex
      ? Math.pow(0.98, activeIndex - index)
      : 1;

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
      {children}
    </div>
  );
};
