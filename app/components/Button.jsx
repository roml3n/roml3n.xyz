import React from "react";
import Link from "next/link";

const Button = ({ 
  url = "#", 
  label = "Button", 
  children, 
  className = "", 
  newTab = false 
}) => {
  return (
    <Link 
      href={url} 
      target={newTab ? "_blank" : "_self"} 
      rel={newTab ? "noopener noreferrer" : undefined} 
      className={`z-10 self-center gap-1 w-fit py-2 px-4 box-border border border-solid border-midgrey relative !bg-fullwhite rounded-full ${className}`}
    >
      {children || <p className="h4">{label}</p>}
    </Link>
  );
};

export default Button;
