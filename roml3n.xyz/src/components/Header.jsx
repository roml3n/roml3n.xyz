import React from "react";
import Button from "./Button";

const Header = () => {
  return (
    <div className = "w-full justify-between inline-flex relative py-8" >
      avatar
      <Button label="Let's Talk" />
    </div>
  );
};

export default Header;
