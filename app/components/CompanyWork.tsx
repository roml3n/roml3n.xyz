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
  children,
}) => {
  return (
    <div className={`w-full flex flex-col rounded-[1.75rem] gap-4 p-4 ${className}`}>
      <div className="flex justify-between items-start w-full">
        <div className="flex gap-3 items-center">
          {companyLogo && (
            <div className="flex items-center justify-center bg-[#262261] rounded-xl h-16 w-16">
              <Image
                src={companyLogo}
                alt={companyLogoAlt}
                width={36}
                height={36}
              />
            </div>
          )}
          <div className="flex flex-col gap-1">
            <h3 className="h3 font-montreal font-medium">{companyName}</h3>
            <p className="h5 font-montreal font-normal text-base">{period}</p>
          </div>
        </div>

        <Link
          href={websiteLink}
          target="_blank"
          rel="noreferrer noopener nofollow"
          className="flex gap-2 bg-fullgrey/10 rounded-full px-3 py-2"
        >
          <p className="h5 font-montreal text-normal text-base">
            {websiteName}
          </p>
          <Image
            src="/images/icons/Arrow.svg"
            alt="arrow icon"
            width={16}
            height={16}
          />
        </Link>
      </div>

      {/* Project Cards Grid */}
      <div className="flex flex-row md:grid md:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  );
};
