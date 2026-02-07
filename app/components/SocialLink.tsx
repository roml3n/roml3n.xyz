import Link from "next/link";
import React from "react";

const SocialLink = ({
  channel,
  title,
  url,
  className,
}: {
  channel: string;
  title: string;
  url: string;
  className?: string;
}) => {
  return (
    <div className={`flex flex-col col-span-2 row-span-1 group ${className}`}>
      <h6 className="h6 opacity-60">
        [{" "}
        <span className="group-hover:px-1 transition-all duration-300">
          {channel}
        </span>{" "}
        ]
      </h6>
      <Link
        rel="noopenner noreferrer"
        target="blank"
        href={url}
        className="h4 group-hover:underline group-hover:!text-mainblue transition-all duration-300"
      >
        {title}
      </Link>
    </div>
  );
};

export default SocialLink;
