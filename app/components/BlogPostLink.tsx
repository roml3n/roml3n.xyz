import React from "react";
import Link from "next/link";

const BlogPostLink = ({
  title,
  date,
  url,
}: {
  title: string;
  date: string;
  url: string;
}) => {
  return (
    <Link href={url} passHref legacyBehavior>
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-between group"
      >
        <div className="p-4 gap-2 flex items-center hover:bg-almostwhite hover:border hover:border-solid hover:border-midgrey transition-all duration-300 rounded-2xl w-full">
          <h2 className="h4 font-medium">{title}</h2>
          <div className="h-[1px] bg-midgrey flex-grow" />
          <p className="h4 font-medium">{date}</p>
        </div>
      </a>
    </Link>
  );
};

export default BlogPostLink;
