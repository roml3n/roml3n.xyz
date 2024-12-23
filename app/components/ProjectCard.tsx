import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BorderTrail } from "./BorderTrail";

export const ProjectCard: React.FC<{
  description: string;
  imageSrc: string;
  href: string;
  className?: string;
  edge?: boolean;
}> = ({ description, imageSrc, href, className, edge }) => {
  return (
    <>
      <Link href={href}>
        <div className="relative flex shrink-0 grow-0 flex-col justify-between !w-[427px] h-[620px] bg-fullwhite rounded-2xl overflow-hidden border border-solid border-midgrey group pt-6">
          {/* BorderTrail */}
          <div className="absolute inset-0 z-2 opacity-0 transition-opacity duration-300 rounded-2xl group-hover:opacity-100">
            <BorderTrail
              style={{
                boxShadow:
                  "0px 0px 60px 120px rgb(59 130 246 / 10%), 0 0 100px 90px rgb(59 130 246 / 50%), 0 0 140px 90px rgb(59 130 246 / 10%)",
              }}
              size={100}
            />
          </div>

          <p className="w-full top-[36px] left-6 h3 px-6">{description}</p>
          <div className={`relative w-full h-auto px-6 ${edge ? "scale-[115%] bottom-2" : ""}`}>
            <Image
              src={imageSrc}
              alt="Frame Image"
              width={854}
              height={128}
              className={`w-full h-auto ${className}`}
            />
          </div>
        </div>
      </Link>
    </>
  );
};
