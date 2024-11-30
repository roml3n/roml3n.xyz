import React from "react";
import Image from "next/image";
import Link from "next/link";

const Reading = ({
  imgSrc,
  title,
  alt,
  href,
  author,
}: {
  imgSrc: string;
  title: string;
  alt: string;
  href: string;
  author: string;
}) => {
  return (
    <Link href={href} passHref legacyBehavior>
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-between group"
      >
        <div className="flex items-center gap-3 ">
          <div className="flex gap-3 items-center mr-4 w-full">
            <div className="justify-center items-center flex relative h-24 w-16 rounded-2xl border border-solid border-midgrey overflow-clip">
              <Image src={imgSrc} alt={alt} width={64} height={96} />
            </div>

            <div className="flex flex-col gsp-1">
              <p className="h4 font-medium">{title}</p>
              <p className="h4">{author}</p>
            </div>
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

export default Reading;
