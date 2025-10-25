import React from "react";
import Image from "next/image";
import Link from "next/link";

interface CompanyWorkProps {
  companyName: string;
  companyLogo?: string;
  companyLogoAlt?: string;
  period: string;
  websiteName: string;
  websiteLink: string;
  className?: string;
  logoBg: string;
  textColor?: "light" | "dark";
  children: React.ReactNode;
}

export const CompanyWork: React.FC<CompanyWorkProps> = ({
  companyName,
  companyLogo,
  companyLogoAlt = "company logo",
  period,
  websiteName,
  websiteLink,
  className,
  logoBg,
  textColor = "dark",
  children,
}) => {
  return (
    <div
      className={`w-full flex flex-col rounded-[1.5rem] md:rounded-[1.75rem] gap-3 md:gap-4 p-3 md:p-4 ${className}`}
    >
      <div className="flex justify-between items-start w-full">
        <div className="flex gap-2 md:gap-3 items-center">
          {companyLogo && (
            <div
              className={`flex items-center justify-center rounded-xl p-1 md:p-0 h-10 w-10 md:h-16 md:w-16 ${logoBg}`}
            >
              <Image
                src={companyLogo}
                alt={companyLogoAlt}
                width={36}
                height={36}
              />
            </div>
          )}
          <div className="flex flex-col gap-0">
            <h3
              className={`h4 md:h3 font-montreal font-medium ${textColor === "light" ? "!text-white" : "text-black"}`}
            >
              {companyName}
            </h3>
            <p
              className={`h6 font-montreal font-normal opacity-60 text-base ${textColor === "light" ? "!text-white" : "!text-fullgrey"}`}
            >
              {period}
            </p>
          </div>
        </div>

        <Link
          href={websiteLink}
          target="_blank"
          rel="noreferrer noopener nofollow"
          className={`flex group gap-1 md:gap-2 rounded-full px-2 py-1 ${
            textColor === "light"
              ? "bg-white/10 hover:bg-white/20"
              : "bg-fullgrey/10 hover:bg-fullgrey/20"
          }`}
        >
          <p
            className={`h6 font-montreal font-medium text-sm md:text-base group-hover:!text-mainblue transition-all duration-300 ${
              textColor === "light" ? "!text-lightgrey" : "!text-fullgrey/80 "
            }`}
          >
            {websiteName}
          </p>
          <Image
            src="/images/icons/Arrow.svg"
            alt="arrow icon"
            width={16}
            height={16}
            className={`group-hover:!text-mainblue ${textColor === "light" ? "invert" : ""}`}
          />
        </Link>
      </div>

      {/* Project Cards Grid */}
      <div className="flex flex-col md:grid md:grid-cols-2 gap-3 md:gap-4">
        {children}
      </div>
    </div>
  );
};
