import React from "react";
import Image from "next/image";
import Link from "next/link";

const SocialLink = ({
  iconSrc,
  label,
  alt,
  href,
}: {
  iconSrc: string;
  label: string;
  alt: string;
  href: string;
}) => {
  return (
    <Link href={href} passHref legacyBehavior>
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-between group"
      >
        <div className="flex items-center gap-3 ">
          <div className="flex items-center justify-center h-12 w-12 aspect-square rounded-xl border border-solid bg-fullwhite border-midgrey">
            <Image src={iconSrc} alt={alt} width={24} height={24} />
          </div>
          <div className="flex flex-col gap-2">
            <p className="h4">{label}</p>
          </div>
        </div>

        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full border border-solid border-midgrey bg-fullwhite p-1">
          <Image
            src="/images/icons/Arrow.svg"
            alt="Arrow"
            width={16}
            height={16}
          />
        </div>
      </a>
    </Link>
  );
};

export default SocialLink;
