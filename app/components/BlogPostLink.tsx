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
    <Link href={url} className="flex w-full items-center justify-between group">
      <div className="p-4 gap-2 flex items-center border border-midgrey border-opacity-0 hover:bg-almostwhite hover:border hover:border-solid hover:border-midgrey hover:border-opacity-100 hover:shadow-[0px_7px_29px_0px_rgba(100,100,111,0.1)] transition-all duration-300 rounded-2xl w-full">
        <h2 className="h5 font-medium">{title}</h2>
        <div className="h-[1px] bg-midgrey flex-grow" />
        <p className="h5 font-medium">{date}</p>
      </div>
    </Link>
  );
};

export default BlogPostLink;
