import React from "react";
import Button from "./Button";
import AvatarSM from "./AvatarSM";

const Header = () => {
  return (
    <div className="w-full justify-between inline-flex relative py-8">
      <AvatarSM />
      <Button label="Let's Talk" />
    </div>
  );
};

export default Header;
