"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const formatCount = (value) => {
  if (typeof value !== "number") return undefined;
  return String(value).padStart(2, "0");
};

const desktopItems = [
  { id: "work", label: "Work", href: "/#work" },
  { id: "notes", label: "Notes", href: "/writing" },
  { id: "photos", label: "Photos", href: "/photos" },
  { id: "about", label: "About", href: "/#about" },
];

const Header = ({ menuCounts }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hash, setHash] = useState("");
  const pathname = usePathname();

  const mobileItems = useMemo(
    () => [
      {
        label: "Home",
        href: "/",
        color: { light: "#9d9dff", dark: "#370b8f" },
      },
      {
        label: "About",
        href: "/#about",
        color: { light: "#ff5c01", dark: "#6e1626" },
      },
      {
        label: "Work",
        href: "/#work",
        meta: formatCount(menuCounts?.work),
        color: { light: "#ffcd04", dark: "#755606" },
      },
      {
        label: "Writing",
        href: "/writing",
        meta: formatCount(menuCounts?.writing),
        color: { light: "#85af25", dark: "#253504" },
      },
      {
        label: "Photos",
        href: "/photos",
        meta: formatCount(menuCounts?.photos),
        color: { light: "#9debff", dark: "#0b758f" },
      },
    ],
    [menuCounts],
  );

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash.replace("#", ""));
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflowX = "hidden";
    document.body.style.overflowY = menuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflowX = "";
      document.body.style.overflowY = "";
    };
  }, [menuOpen]);

  const handleNavClick = (event, href) => {
    setMenuOpen(false);
    if (!href.startsWith("/#") || pathname !== "/") return;

    event.preventDefault();
    const target = document.getElementById(href.slice(2));
    window.history.replaceState(null, "", href);
    setHash(href.slice(2));
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const isDesktopActive = (id) => {
    if (id === "notes") return pathname.startsWith("/writing");
    if (id === "photos") return pathname.startsWith("/photos");
    if (id === "about") return pathname === "/" && hash === "about";
    if (id === "work") {
      return pathname.startsWith("/work") || (pathname === "/" && hash !== "about");
    }
    return false;
  };

  return (
    <header className="fixed top-4 left-1/2 z-[9999] w-[min(1120px,calc(100%-2rem))] -translate-x-1/2">
      <div className="hidden items-center justify-between md:flex">
        <Logo />
        <nav
          aria-label="Primary"
          className="flex h-12 items-center gap-8 overflow-hidden rounded-full bg-[rgba(146,146,146,0.1)] px-7 backdrop-blur-[12px]"
        >
          {desktopItems.map((item) => {
            const active = isDesktopActive(item.id);
            return (
              <Link
                key={item.id}
                href={item.href}
                aria-current={active ? "page" : undefined}
                onClick={(event) => handleNavClick(event, item.href)}
                className={`relative flex h-12 items-center gap-2 font-montreal text-lg font-medium ${
                  active ? "text-mainblue" : "text-darkgrey hover:text-fullgrey"
                }`}
              >
                {active ? (
                  <span className="size-2 shrink-0 rounded-[8px] bg-mainblue" />
                ) : null}
                {item.label}
                {active ? <ActiveGlow /> : null}
              </Link>
            );
          })}
        </nav>
      </div>

      <div
        className={`mx-auto w-full max-w-[348px] md:hidden ${
          menuOpen
            ? "flex flex-col gap-2 rounded-[28px] bg-[rgba(146,146,146,0.1)] p-1 backdrop-blur-[12px]"
            : ""
        }`}
      >
        <div className="flex items-center justify-between">
          <Logo />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="relative flex h-12 w-[72px] items-center justify-center rounded-full bg-[rgba(146,146,146,0.1)] backdrop-blur-[12px]"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`absolute h-[1.5px] w-6 rounded-full bg-mainblue transition-all duration-300 ease-in-out ${
                menuOpen ? "translate-y-0 rotate-45" : "-translate-y-1 rotate-0"
              }`}
              aria-hidden="true"
            />
            <span
              className={`absolute h-[1.5px] w-6 rounded-full bg-mainblue transition-all duration-300 ease-in-out ${
                menuOpen ? "translate-y-0 -rotate-45" : "translate-y-1 rotate-0"
              }`}
              aria-hidden="true"
            />
          </button>
        </div>

        {menuOpen ? (
          <nav aria-label="Primary" className="flex flex-col gap-2 px-2 pb-2">
            {mobileItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={(event) => handleNavClick(event, item.href)}
                className="flex items-center gap-2.5 font-montreal text-[36px] font-medium leading-none text-fullgrey"
              >
                <span
                  aria-hidden="true"
                  className="flex size-6 shrink-0 items-center justify-center"
                  style={{ backgroundColor: item.color.light }}
                >
                  <span
                    className="size-3 rounded-full"
                    style={{ backgroundColor: item.color.dark }}
                  />
                </span>
                <span>{item.label}</span>
                {item.meta ? (
                  <span className="font-normal text-xl tracking-[0.2px] text-darkgrey opacity-60">
                    [ {item.meta} ]
                  </span>
                ) : null}
              </Link>
            ))}
          </nav>
        ) : null}
      </div>
    </header>
  );
};

const Logo = () => {
  return (
    <Link
      href="/"
      aria-label="roml3n home"
      className="flex items-center justify-center rounded-full bg-white px-6 py-3"
    >
      <img
        alt=""
        src="/images/menu/roml3n-wordmark.svg"
        width={73}
        height={24}
        className="h-[24.004px] w-[73.048px] max-w-none"
      />
    </Link>
  );
};

const ActiveGlow = () => {
  return (
    <>
      <img
        alt=""
        src="/images/menu/nav-glow-gold.svg"
        width={107}
        height={44}
        className="pointer-events-none absolute left-1/2 top-[-18px] h-[43.648px] w-[107.254px] max-w-none -translate-x-1/2"
      />
      <img
        alt=""
        src="/images/menu/nav-glow-blue.svg"
        width={107}
        height={44}
        className="pointer-events-none absolute bottom-[-18px] left-1/2 h-[44.148px] w-[107.254px] max-w-none -translate-x-1/2"
      />
    </>
  );
};

export default Header;
