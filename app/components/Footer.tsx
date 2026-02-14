import React from "react";
import Link from "next/link";
import TransitionLink from "./transitions/TransitionLink";

const Footer = () => {
  return (
    <div className="w-full grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 grid-rows-1 gap-x-6 gap-y-16 py-16">
      <div className="flex flex-col gap-3 col-span-4">
        <TransitionLink href="/" className="h6 font-medium hover:underline">
          Home
        </TransitionLink>
        <TransitionLink href="/#about" className="h6 font-medium hover:underline">
          About
        </TransitionLink>
        <TransitionLink href="/#work" className="h6 font-medium hover:underline">
          Work
        </TransitionLink>
        <TransitionLink href="/writing" className="h6 font-medium hover:underline">
          Writing
        </TransitionLink>
        <TransitionLink href="/photos" className="h6 font-medium hover:underline">
          Photos
        </TransitionLink>
      </div>
      <div className="flex flex-col gap-3 col-span-2 md:col-span-2 lg:col-span-4">
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
      <div className="flex flex-col gap-3 col-span-2 md:col-span-2 lg:col-span-4">
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
