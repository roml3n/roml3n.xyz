import React from "react";
import TransitionLink from "./transitions/TransitionLink";

const Button = ({ 
  url = "#", 
  label = "Button", 
  children, 
  className = "", 
  newTab = false 
}) => {
  return (
    <TransitionLink 
      href={url} 
      target={newTab ? "_blank" : "_self"} 
      rel={newTab ? "noopener noreferrer" : undefined} 
      className={`flex z-10 gap-1 w-fit items-center justify-end sm:justify-start py-2 px-4 box-border border border-solid border-midgrey !bg-fullwhite rounded-full ${className}`}
    >
      {children || <p className="h4">{label}</p>}
    </TransitionLink>
  );
};

export default Button;
