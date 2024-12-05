import React from "react";
import Link from "next/link";

type ButtonLinkProps = {
  Label?: string;
  URL: string;
};

const ButtonLink: React.FC<ButtonLinkProps> = ({ Label = "Link", URL }) => {
  return (
    <div className="w-fit flex flex-col relative group">
      <Link href={URL} className="px-2 z-10 rounded-full h4 relative transition-all duration-300 w-fit group-hover:mt-[4px]">
        {Label}
      </Link>
      <div className="relative h-2 bg-mainblue -mt-2 rounded-full opacity-20 transition-all duration-300 group-hover:h-8 group-hover:-mt-[28px]"></div>
    </div>
  );
};

export default ButtonLink;
