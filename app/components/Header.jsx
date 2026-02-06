"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Header = ({ menuCounts }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const formatCount = (value) => {
    if (typeof value !== "number") return undefined;
    return String(value).padStart(2, "0");
  };
  const menuItems = useMemo(
    () => [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      {
        label: "Work",
        href: "/work",
        meta: formatCount(menuCounts?.work),
      },
      {
        label: "Writing",
        href: "/writing",
        meta: formatCount(menuCounts?.writing),
      },
      { label: "Playground", href: "/playground" },
      { label: "Photos", href: "/photos", meta: "72" },
    ],
    [menuCounts]
  );

  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="z-[9999] fixed top-3 left-1/2 -translate-x-1/2 p-1 flex items-center w-fit gap-2 rounded-2xl bg-midgrey shadow-sm">
        {/* Logo Container */}
        <div className="px-4 py-2 bg-fullwhite rounded-xl flex items-center justify-center shadow-sm w-fit">
          <div className="h-6 w-auto flex">
            <Image
              src="/images/roml3n-logo.svg"
              height={24}
              width={73}
              alt="roml3n logo"
              className="object-contain"
            />
          </div>
        </div>

        {/* Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex h-6 px-3 items-center justify-center rounded-lg transition-colors hover:bg-hoverbg"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span className="h4 !font-medium">{menuOpen ? "close" : "menu"}</span>
        </button>
      </header>

      <div
        className={`menu-overlay fixed inset-0 z-[9998] bg-fullwhite ${
          menuOpen ? "menu-overlay--open" : "menu-overlay--closed"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="menu-wipe" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>

        {/* page content  */}
        <div className="menu-overlay-content h-full w-full px-6 py-6 md:px-10 md:py-10">
          <div className="w-full h-full -mt-6 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 md:grid-rows-[auto_auto_auto_1fr] lg:grid-rows-[auto_1fr_auto] gap-x-4 md:gap-x-6 gap-y-9 md:gap-y-16 relative justify-center self-center">
            <div className="flex flex-col items-start justify-start text-right md:col-start-7 lg:col-start-11 col-span-2 uppercase tracking-[0.2em] h6 !text-sm text-darkgrey">
              <h6>Nairobi, Kenya</h6>
              <h6>0255H EAT [GMT+3]</h6>
            </div>

            <div className="menu-overlay-image md:relative lg:fixed md:col-span-8 md:col-start-1 md:w-full md:row-span-1 md:row-start-4 md:-m-6 lg:top-6 lg:left-6 lg:bottom-6 lg:w-[33vw] lg:max-w-[560px] lg:max-h-[2048px] rounded-[28px] overflow-hidden">
              <Image
                src="/images/(photosPage)/photo_1.jpg"
                alt="Menu visual"
                fill
                className="object-cover"
                priority
              />
            </div>

            <nav className="menu-overlay-list md:col-start-1 lg:col-start-6 col-span-4 self-center md:row-span-2 lg:row-span-1 md:row-start-2 flex flex-col gap-1 md:gap-3">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="group inline-flex py- items-start gap-2 text-4xl md:text-5xl font-montreal font-medium text-fullgrey transition-all duration-300 hover:bg-hoverbg hover:px-4 hover:border-r-4 hover:border-midgrey rounded-sm"
                >
                  <span className="relative">
                    <span className="menu-overlay-link">{item.label}</span>
                  </span>
                  {item.meta && (
                    <span className="text-xs md:text-sm text-darkgrey font-montreal opacity-60 tracking-[0.2em]">
                      [{item.meta}]
                    </span>
                  )}
                </Link>
              ))}
            </nav>

            <div className="flex flex-col gap-6 md:col-start-5 md:col-span-4 md:row-start-2 md:row-span-2 lg:col-start-6 lg:col-span-3 row-start-3">
              <div>
                <p className="h6 opacity-60 text-midgrey">[ email ]</p>
                <p className="h5 !font-medium text-darkgrey">yo@roml3n.xyz</p>
              </div>
              <div>
                <p className="h6 opacity-60 text-midgrey">[ phone ]</p>
                <p className="h5 !font-medium text-darkgrey">
                  +254 742 524 417
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-6 md:col-start-5 md:col-span-4 md:row-start-3 md:row-span-2 lg:col-start-6 lg:col-span-3 row-start-3">
              <div>
                <p className="h6 opacity-60 text-midgrey">[ linkedin ]</p>
                <p className="h5 !font-medium text-darkgrey">in/roml3n</p>
              </div>
              <div>
                <p className="h6 opacity-60 text-midgrey">[ x ]</p>
                <p className="h5 !font-medium text-darkgrey">@roml3n</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
