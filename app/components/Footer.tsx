import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="w-full grid grid-cols-12 grid-rows-1 gap-x-6 gap-y-16 py-16">
      <div className="flex flex-col gap-3 col-span-6">
        <Link href="/" className="h6 font-medium hover:underline">
          Home
        </Link>
        <Link href="/" className="h6 font-medium hover:underline">
          About
        </Link>
        <Link href="/" className="h6 font-medium hover:underline">
          Work
        </Link>
        <Link href="/writing" className="h6 font-medium hover:underline">
          Writing
        </Link>
        <Link href="/photos" className="h6 font-medium hover:underline">
          Photos
        </Link>
      </div>
      <div className="flex flex-col gap-3 col-span-3">
        <Link
          rel="noopenner noreferrer"
          target="blank"
          href="mailto:yo@roml3n.xyz"
          className="h6 font-medium hover:underline"
        >
          yo@roml3n.xyz
        </Link>
        <Link
          rel="noopenner noreferrer"
          target="blank"
          href="tel:+254742524417"
          className="h6 font-medium hover:underline"
        >
          +254 742 524 417
        </Link>
      </div>
      <div className="flex flex-col gap-3 col-span-3">
        <Link
          rel="noopenner noreferrer"
          target="blank"
          href="https://linkedin.com/in/roml3n"
          className="h6 font-medium hover:underline"
        >
          LinkedIn
        </Link>
        <Link
          rel="noopenner noreferrer"
          target="blank"
          href="https://x.com/roml3n"
          className="h6 font-medium hover:underline"
        >
          X/Twitter
        </Link>
      </div>
    </div>
  );
};

export default Footer;
