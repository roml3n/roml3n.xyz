"use client";

import Link from "next/link";
import type { LinkProps } from "next/link";
import React from "react";
import type { UrlObject } from "url";
import { usePageTransition } from "./PageTransitionProvider";

type TransitionOverride = "auto" | "major" | "minor" | "none";

type TransitionLinkProps = Omit<React.ComponentProps<typeof Link>, "href" | "onClick"> & {
  href: string | UrlObject;
  transition?: TransitionOverride;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

const hasProtocol = (value: string) => /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(value);

const buildQueryString = (query: UrlObject["query"]) => {
  if (!query) return "";
  if (typeof query === "string") return query.startsWith("?") ? query : `?${query}`;
  if (Array.isArray(query)) return "";

  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value == null) return;

    if (Array.isArray(value)) {
      value.forEach((entry) => {
        params.append(key, String(entry));
      });
      return;
    }

    params.append(key, String(value));
  });

  const queryString = params.toString();
  return queryString ? `?${queryString}` : "";
};

const hrefToString = (href: string | UrlObject): string => {
  if (typeof href === "string") return href;

  const pathname = href.pathname ?? "";
  const search = href.search ?? buildQueryString(href.query);
  const hash = href.hash ? `#${href.hash.replace(/^#/, "")}` : "";

  return `${pathname}${search}${hash}`;
};

const normalizeNavigationHref = (href: string): string => {
  if (!href.startsWith("http://") && !href.startsWith("https://")) return href;

  try {
    const parsed = new URL(href);
    if (parsed.origin !== window.location.origin) return href;
    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return href;
  }
};

const isModifiedClick = (event: React.MouseEvent<HTMLAnchorElement>) =>
  event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;

const isHashNavigation = (href: string) => href.startsWith("#") || href.startsWith("/#") || href.includes("#");

const isBypassLink = (href: string, target?: string, download?: boolean | string) => {
  if (download) return true;
  if (target && target !== "_self") return true;

  if (hasProtocol(href)) {
    if (!href.startsWith("http://") && !href.startsWith("https://")) return true;

    try {
      const parsed = new URL(href);
      return parsed.origin !== window.location.origin;
    } catch {
      return true;
    }
  }

  return false;
};

const toNavigationOptions = (props: Pick<LinkProps, "replace" | "scroll">) => ({
  replace: props.replace,
  scroll: props.scroll,
});

export default function TransitionLink({
  href,
  onClick,
  transition = "auto",
  replace,
  scroll,
  target,
  download,
  ...rest
}: TransitionLinkProps) {
  const { startTransitionNavigation } = usePageTransition();

  const resolvedHref = hrefToString(href);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (event.defaultPrevented || isModifiedClick(event)) return;
    if (isHashNavigation(resolvedHref)) return;

    if (isBypassLink(resolvedHref, target, download)) return;

    event.preventDefault();

    startTransitionNavigation(normalizeNavigationHref(resolvedHref), {
      transition,
      ...toNavigationOptions({ replace, scroll }),
    });
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      replace={replace}
      scroll={scroll}
      target={target}
      download={download}
      {...rest}
    />
  );
}
