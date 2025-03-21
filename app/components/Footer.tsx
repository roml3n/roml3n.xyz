import React from "react";

const Footer = () => {
  return (
    <div className="w-full relative py-8 -z-10 flex flex-col md:flex-row gap-4 md:justify-between mb-28">
      <p className="h4">©{new Date().getFullYear()} Roman Lenjo</p>
      <p className="h4">Crafted with ❤️ from 🇰🇪</p>
    </div>
  );
};

export default Footer;
