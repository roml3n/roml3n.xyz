"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import {
  cursorCompanyProps,
  cursorLabelProps,
} from "@/app/components/cursor/cursorProps";

import WorkCardCoverFill, {
  isInteractiveFillSrc,
} from "@/app/components/WorkCardCoverFill";

const WorkCard = ({
  title,
  company,
  date,
  coverImage,
  coverFill,
  className = "",
}: {
  title: string;
  company: string;
  date: string;
  coverImage: string;
  coverFill?: string;
  className?: string;
}) => {
  const hasInteractiveFill = Boolean(
    coverFill && isInteractiveFillSrc(coverFill),
  );
  const [fillActive, setFillActive] = useState(false);
  const [canInteract, setCanInteract] = useState(false);

  useEffect(() => {
    const hoverMq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      setCanInteract(hoverMq.matches && !motionMq.matches);
    };

    sync();
    hoverMq.addEventListener("change", sync);
    motionMq.addEventListener("change", sync);

    return () => {
      hoverMq.removeEventListener("change", sync);
      motionMq.removeEventListener("change", sync);
    };
  }, []);

  const handlePointerEnter = useCallback(() => {
    if (hasInteractiveFill && canInteract) setFillActive(true);
  }, [canInteract, hasInteractiveFill]);

  const handlePointerLeave = useCallback(() => {
    if (hasInteractiveFill) setFillActive(false);
  }, [hasInteractiveFill]);

  return (
    <div
      {...cursorLabelProps("view case study")}
      onPointerEnter={hasInteractiveFill ? handlePointerEnter : undefined}
      onPointerLeave={hasInteractiveFill ? handlePointerLeave : undefined}
      className={`group relative flex flex-col gap-6 col-span-4 md:col-span-4 lg:col-span-6 row-span-1 ${className}`}
    >
      <span
        aria-hidden={true}
        className="work-card-hover pointer-events-none absolute -inset-2 -z-10 rounded-2xl opacity-0 scale-95 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100"
      />
      <div className="flex flex-col gap-1 px-1">
        <h4 className="h4 text-fullgrey w-full !leading-none">{title}</h4>
        <h5 className="h5 font-medium w-full opacity-60 !leading-tight">
          <span {...cursorCompanyProps(company)}>{company}</span>
          <br />[ {date} ]
        </h5>
      </div>
      <div className="relative isolate w-full aspect-[16/10] overflow-hidden rounded-xl bg-midgrey">
        {coverFill ? (
          <WorkCardCoverFill
            coverFill={coverFill}
            isActive={fillActive}
            canInteract={canInteract}
          />
        ) : null}
        <Image
          src={coverImage}
          height={1080}
          width={675}
          alt="screenshot of project"
          className="relative z-[1] size-full object-contain"
        />
      </div>
    </div>
  );
};

export default WorkCard;
