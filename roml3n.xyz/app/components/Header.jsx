import React from "react";
import Button from "./Button";
import AvatarSM from "./AvatarSM";

const Header = () => {
  return (
    <div className="z-50 sticky top-0 w-full justify-between inline-flex py-8">
      <AvatarSM />
      <Button label="Let's Talk"/>
    </div>
  );
};

export default Header;
