import React from "react";
import Button from "./Button";
import AvatarSM from "./AvatarSM";

const Header = () => {
  return (
    <div className="z-[9000] sticky top-0 w-full justify-between inline-flex py-8 mx-auto">
      <AvatarSM />
      <Button
        className="hover:px-6 transition-all duration-300"
        label="Let's Talk"
        url="mailto:roman25lenjo@gmail.com"
      />
    </div>
  );
};

export default Header;
