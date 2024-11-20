import React from "react";
import Link from "next/link";

type ButtonLinkProps = {
  Label?: string;
  URL: string;
};

const ButtonLink: React.FC<ButtonLinkProps> = ({ Label = "Link", URL }) => {
  return (
    <div className="w-fit flex flex-col relative ">
      <Link href={URL} className="px-2 p-4 rounded-full h4 relative w-fit bg-red-400">
        {Label}
      </Link>
      <div className="relative h-2 bg-mainblue rounded-full opacity-20 transition-all duration-300  hover:p-2 origin-bottom hover:h-8"></div>
    </div>
  );
};

export default ButtonLink;
