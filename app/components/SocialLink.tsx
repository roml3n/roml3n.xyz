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
    <div className={`flex flex-col col-span-2 row-span-1 ${className}`}>
      <h6 className="h6 opacity-60">[ {channel} ]</h6>
      <Link rel="noopenner noreferrer" target="blank" href={url} className="h4 hover:underline">
        {title}
      </Link>
    </div>
  );
};

export default SocialLink;
