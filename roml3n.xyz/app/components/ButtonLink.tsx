import React from "react";
import Link from "next/link";

type ButtonLinkProps = {
  Label?: string; // Optional string
  URL: string; // Required string
};

const ButtonLink: React.FC<ButtonLinkProps> = ({ Label = "Link", URL }) => {
  return (
    <div className="w-fit flex flex-col group relative">
      <Link href={URL} className="px-2 h4 relative w-fit">
        {Label}
      </Link>
      <div className="relative h-3 bg-mainblue rounded-full opacity-20 transition-all duration-300 origin-bottom group-hover:h-full"></div>
    </div>
  );
};

export default ButtonLink;
