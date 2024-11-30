"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", mouseMove);

    const handleMouseEnterLink = () => setCursorVariant("hover");
    const handleMouseLeaveLink = () => setCursorVariant("default");

    const links = document.querySelectorAll("a");
    links.forEach((link) => {
      link.addEventListener("mouseenter", handleMouseEnterLink);
      link.addEventListener("mouseleave", handleMouseLeaveLink);
    });

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleMouseEnterLink);
        link.removeEventListener("mouseleave", handleMouseLeaveLink);
      });
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x,
      y: mousePosition.y,
    },
    hover: {
      height: 32,
      width: 32,
      x: mousePosition.x,
      y: mousePosition.y,
    },
  };

  return (
    <motion.div
      className="w-4 h-4 bg-midgrey border-fullgrey border border-opacity-30 rounded-full fixed top-0 left-0 z-[99999]"
      variants={variants}
      animate={cursorVariant}
    />
  );
};

export default CustomCursor;