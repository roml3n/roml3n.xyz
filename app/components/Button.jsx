import React from "react";
import TransitionLink from "./transitions/TransitionLink";

const Button = ({
  url = "#",
  label = "Button",
  className = "",
  newTab = false,
  variant = "ghost",
}) => {
  const baseLinkClasses = "inline-flex z-10 w-fit items-center rounded-full";

  const variantStyles = {
    primary:
      "pl-6 pr-3 py-3 bg-mainblue hover:bg-[#0A65A6] !text-fullwhite gap-4 justify-between min-w-[220px]",
    secondary:
      "pl-6 pr-3 py-3 bg-white hover:bg-almostwhite border border-solid border-midgrey !text-fullgrey gap-4 justify-between min-w-[220px]",
    ghost:
      "gap-1 justify-end sm:justify-start py-2 px-4 box-border border border-solid border-midgrey !bg-fullwhite",
  };

  const circleStyles = {
    primary: "bg-fullwhite text-fullgrey",
    secondary: "bg-mainblue text-fullwhite",
  };

  const labelStyles = {
    primary: "!text-fullwhite",
    secondary: "!text-fullgrey",
  };

  const isGhost = variant === "ghost";

  return (
    <TransitionLink
      href={url}
      target={newTab ? "_blank" : "_self"}
      rel={newTab ? "noopener noreferrer" : undefined}
      className={`${baseLinkClasses} ${variantStyles[variant] || variantStyles.ghost} ${className}`}
    >
      {isGhost ? (
        <p className="h4">{label}</p>
      ) : (
        <>
          <p className={`h4 ${labelStyles[variant] || ""}`}>{label}</p>
          <span
            className={`flex items-center justify-center p-3 rounded-full ${circleStyles[variant]}`}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M9.7002 4.88574L5.3457 9.2666H4.01855L7.90918 5.36328H0.00976562V4.4082H7.91016L4.03223 0.504883H5.35938L9.7002 4.88574Z"
                fill="currentColor"
              />
            </svg>
          </span>
        </>
      )}
    </TransitionLink>
  );
};

export default Button;
