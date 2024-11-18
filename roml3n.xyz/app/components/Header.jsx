import React from "react";
import Button from "./Button";
import AvatarSM from "./AvatarSM";

const Header = () => {
  return (
    <div className="w-full justify-between inline-flex relative py-8">
      <div className="rounded-full border border-solid border-midgrey overflow-hidden">
        {" "}
        <AvatarSM />
      </div>
      <Button label="Let's Talk" />
    </div>
  );
};

export default Header;
