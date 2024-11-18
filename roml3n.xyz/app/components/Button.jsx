import React from "react";

const Button = ({ label = "Button" }) => {
  return (
    <div className="inline-flex self-center gap-1 w-fit py-2 px-4 h4 box-border border border-solid border-midgrey relative bg-fullwhite whitespace-nowrap rounded-full ">
      {label}
    </div>
  );
};

export default Button;
