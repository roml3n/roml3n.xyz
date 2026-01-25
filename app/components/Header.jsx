import React from "react";
import Image from "next/image";

const Header = () => {
  return (
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
      <div className="flex h-6 px-3 items-center justify-center">
        <span className="h4 !font-medium">menu</span>
      </div>
    </header>
  );
};

export default Header;
