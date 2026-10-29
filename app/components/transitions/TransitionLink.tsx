"use client";

import Link from "next/link";
import React from "react";
import type { LinkProps } from "next/link";
import type { UrlObject } from "url";

type TransitionLinkProps = Omit<React.ComponentProps<typeof Link>, "href"> & {
  href: string | UrlObject;
  transition?: "auto" | "major" | "minor" | "none";
} & LinkProps;

const TransitionLink = ({
  transition: _transition,
  ...props
}: TransitionLinkProps) => {
  return <Link {...props} />;
};

export default TransitionLink;
