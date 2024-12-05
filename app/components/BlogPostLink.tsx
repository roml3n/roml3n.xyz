import React from "react";
import Link from "next/link";

const BlogPostLink = ({
  title,
  description,
  date,
  url,
}: {
  title: string;
  description: string;
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
        <div className="p-4 gap-2 flex flex-col hover:bg-almostwhite hover:border hover:border-solid hover:border-midgrey transition-all duration-300 rounded-2xl w-full">
          <div className="flex justify-between">
            <h2 className="h2">{title}</h2>
            <p className="h4 font-medium">{date}</p>
          </div>
          <p className="h4">{description}</p>
        </div>
      </a>
    </Link>
  );
};

export default BlogPostLink;
