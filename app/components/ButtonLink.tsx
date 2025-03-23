import React from "react";
import Link from "next/link";

type ButtonLinkProps = {
  Label?: string;
  URL: string;
  className?: string;
};

const ButtonLink: React.FC<ButtonLinkProps> = ({
  Label = "Link",
  URL,
  className,
}) => {
  return (
    <span className="w-fit inline-block relative group">
      <div className="flex flex-col ">
        <Link
          href={URL}
          className={`px-[2px] group-hover:px-[2px] z-10 rounded-full h4 relative transition-all duration-300 w-fit  ${className}`}
        >
          {Label}
        </Link>
        <span className="relative h-[3px] bg-mainblue -mt-[5px] rounded-md opacity-20 transition-all duration-300 group-hover:h-[1rem] sm:group-hover:h-[1.1rem] md:group-hover:h-[1.5rem] group-hover:-mt-[18px] sm:group-hover:-mt-[19px] md:group-hover:-mt-[24px]"></span>
      </div>
    </span>
  );
};

export default ButtonLink;
