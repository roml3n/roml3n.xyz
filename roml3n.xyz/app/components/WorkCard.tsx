import { React, ReactNode } from "react";

export const WorkCard: React.FC<{ title: string; index: number; children?: ReactNode; }> = ({ title, index, children }) => 
    {
        const topValue = 150 + index * 16;
        return (
    <div
    className={`work-card w-full flex h-[489px] bg-fullwhite rounded-2xl border border-solid border-midgrey items-center justify-center h2 sticky top-[${topValue}px] shadow-2xl`}
    >
      {title}
    </div>
  );
};
