import React from "react";

const Button = ({ label = "Button" }) => {
  return (
    <div className="z-10 self-center gap-1 w-fit py-2 px-4 box-border border border-solid border-midgrey relative !bg-fullwhite rounded-full">
      <p className="h4">{label}</p>
    </div>
  );
};

export default Button;
