"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import SocialLink from "../components/SocialLink";
import TransitionLink from "./transitions/TransitionLink";
import Link from "next/link";

const Header = ({ menuCounts }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [nairobiTime, setNairobiTime] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const menuCloseDelayMs = 320;

  const handleMenuItemClick = (event, href) => {
    const isHashLink = href.startsWith("/#");
    if (!isHashLink) {
      setMenuOpen(false);
      return;
    }

    event.preventDefault();
    const targetId = href.slice(2);
    setMenuOpen(false);

    if (pathname !== "/") {
      window.setTimeout(() => {
        router.push(href);
      }, menuCloseDelayMs);
      return;
    }

    window.setTimeout(() => {
      const target = document.getElementById(targetId);
      if (!target) return;
      window.history.replaceState(null, "", href);
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }, menuCloseDelayMs);
  };

  const formatCount = (value) => {
    if (typeof value !== "number") return undefined;
    return String(value).padStart(2, "0");
  };
  const menuItems = useMemo(
    () => [
      { label: "Home", href: "/" },
      { label: "About", href: "/#about" },
      {
        label: "Work",
        href: "/#work",
        meta: formatCount(menuCounts?.work),
      },
      {
        label: "Writing",
        href: "/writing",
        meta: formatCount(menuCounts?.writing),
      },
      { label: "Photos", href: "/photos", meta: formatCount(menuCounts?.photos) },
    ],
    [menuCounts],
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

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Africa/Nairobi",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const updateTime = () => {
      const formatted = formatter.format(new Date()).replace(":", "");
      setNairobiTime(`${formatted}H`);
    };

    updateTime();
    const intervalId = window.setInterval(updateTime, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <>
      <header className="z-[9999] fixed top-3 left-1/2 -translate-x-1/2 p-1 flex items-center w-fit gap-1 rounded-2xl bg-midgrey shadow-sm">
        {/* Logo Container */}
        <Link href="/" className="group block">
          <div className="px-4 py-2 bg-fullwhite rounded-xl flex items-center justify-center shadow-sm w-fit">
            <div className="h-6 w-auto flex">
              <span
                aria-hidden="true"
                className="block h-6 w-[73px] bg-fullgrey transition-colors duration-300 ease-in-out group-hover:bg-mainblue"
                style={{
                  WebkitMaskImage: "url('/images/roml3n-logo.svg')",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  WebkitMaskSize: "contain",
                  maskImage: "url('/images/roml3n-logo.svg')",
                  maskRepeat: "no-repeat",
                  maskPosition: "center",
                  maskSize: "contain",
                }}
              />
              <span className="sr-only">roml3n logo</span>
            </div>
          </div>
        </Link>

        {/* Morphing Menu Toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-mainblue hover:bg-[#0A65A6] transition-opacity hover:opacity-90"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={`absolute h-[1.5px] w-6 rounded-full bg-fullwhite transition-all duration-300 ease-in-out ${
              menuOpen ? "translate-y-0 rotate-45" : "-translate-y-1 rotate-0"
            }`}
            aria-hidden="true"
          />
          <span
            className={`absolute h-[1.5px] w-6 rounded-full bg-fullwhite transition-all duration-300 ease-in-out ${
              menuOpen ? "translate-y-0 -rotate-45" : "translate-y-1 rotate-0"
            }`}
            aria-hidden="true"
          />
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
          <div className="w-full h-full -mt-6 grid grid-cols-4 grid-rows-[auto_auto_auto_1fr] md:grid-cols-8 lg:grid-cols-12 md:grid-rows-[auto_auto_auto_1fr] lg:grid-rows-[auto_1fr_auto] gap-x-4 md:gap-x-6 gap-y-9 md:gap-y-16 relative justify-center self-center">
            <div className="md:flex flex-col items-start justify-start text-right hidden md:col-start-7 lg:col-start-11 col-span-2 uppercase tracking-[0.2em] h6 !text-sm text-darkgrey">
              <h6>Nairobi, Kenya</h6>
              <h6>{nairobiTime || "----H"} EAT [GMT+3]</h6>
            </div>

            <div className="menu-overlay-image relative lg:fixed col-span-4 col-start-1 row-start-4 md:col-span-8 md:col-start-1 md:w-full md:row-span-1 md:row-start-4 md:-m-6 lg:m-0 lg:top-6 lg:left-6 lg:bottom-6 lg:w-[33vw] lg:max-w-[560px] lg:max-h-[2048px] rounded-xl overflow-hidden mt-12 sm:mt-8 md:mt-6 lg:mt-0">
              <Image
                src="/images/me/a-field-of-rome.png"
                alt="Menu visual"
                fill
                className="object-cover"
                priority
              />
            </div>

            <nav className="menu-overlay-list mt-12 md:mt-0 col-start-1 lg:col-start-6 col-span-4 self-start md:self-center md:row-span-2 lg:row-span-1 row-start-2 flex flex-col gap-1 md:gap-3">
              {menuItems.map((item) => (
                <TransitionLink
                  key={item.label}
                  href={item.href}
                  onClick={(event) => handleMenuItemClick(event, item.href)}
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
                </TransitionLink>
              ))}
            </nav>

            <div className="flex flex-col gap-6 col-start-1 col-span-2 md:col-start-5 md:col-span-4 md:row-span-2 lg:col-start-6 lg:col-span-3 row-start-3 md:row-start-2 lg:row-start-3">
              <SocialLink
                channel="email"
                title="yo@roml3n.xyz"
                url="mailto:yo@roml3n.xyz"
                className="col-start-1 md:col-start-5 lg:col-start-7 row-start-7 md:row-start-7 lg:row-start-8"
              />
              <SocialLink
                channel="phone"
                title="+254 742 524 417"
                url="tel:+254742524417"
                className="col-start-1 md:col-start-5 lg:col-start-7 row-start-8 md:row-start-8 lg:row-start-9"
              />
            </div>

            <div className="flex flex-col gap-6 col-start-3 col-span-2 md:col-start-5 lg:col-start-9 md:col-span-4  md:row-span-2  lg:col-span-3 row-start-3 md:row-start-3 lg:row-start-3">
              <SocialLink
                channel="linkedin"
                title="in/roml3n"
                url="https://linkedin.com/in/roml3n"
                className="col-start-3 md:col-start-7 lg:col-start-9 row-start-8 md:row-start-7 lg:row-start-8"
              />
              <SocialLink
                channel="x"
                title="@roml3n.xyz"
                url="https://x.com/roml3n"
                className="col-start-3 md:col-start-7 lg:col-start-9 row-start-9 md:row-start-8 lg:row-start-9"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
