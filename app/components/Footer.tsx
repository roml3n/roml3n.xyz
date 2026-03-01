import React from "react";
import TransitionLink from "./transitions/TransitionLink";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full min-h-[34rem] md:min-h-[38rem] overflow-hidden grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 py-10 md:py-12">
      <div className="col-span-4 md:col-span-8 lg:col-span-12 gap-x-6 flex flex-col -gap-6 h-full">
        <div className="z-20 flex items-start justify-between gap-4 col-span-4 md:col-span-8 lg:col-span-12">
          {/* Logo  */}
          <TransitionLink
            href="/"
            className="h6 group font-medium hover:underline"
          >
            <div className="h-6 w-auto flex">
              <span
                aria-hidden="true"
                className="block h-6 w-[73px] bg-fullgrey transition-colors duration-300 ease-in-out group-hover:bg-mainblue"
                style={{
                  WebkitMaskImage: "url('/images/roml3n-logo.svg')",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  WebkitMaskSize: "contain",
                  maskImage: "url('/images/roml3n-logo.svg')",
                  maskRepeat: "no-repeat",
                  maskPosition: "center",
                  maskSize: "contain",
                }}
              />
              <span className="sr-only">roml3n logo</span>
            </div>
          </TransitionLink>

          {/* Links */}
          <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8 lg:gap-16">
            <TransitionLink
              href="mailto:yo@roml3n.xyz"
              className="h6 font-medium hover:text-mainblue transition-all duration-300"
            >
              Email{" "}
            </TransitionLink>
            <TransitionLink
              href="https://linkedin.com/in/roml3n"
              className="h6 font-medium hover:text-mainblue transition-all duration-300"
            >
              LinkedIn
            </TransitionLink>
            <TransitionLink
              href="https://x.com/roml3n"
              className="h6 font-medium hover:text-mainblue transition-all duration-300"
            >
              X/Twitter
            </TransitionLink>
          </div>
        </div>

        <div className="relative flex w-[90%] md:w-[60%] lg:w-1/2 h-auto items-center justify-center place-self-center">
          <Image
            src="/images/footer-img.webp"
            alt="watercolored image of roman sat in a chair listening to music"
            width={2400}
            height={2400}
            className="pointer-events-none w-full h-auto object-contain"
          />
        </div>
      </div>
      {/* glow effect */}
      {/* <div className="pointer-events-none absolute left-1/2 bottom-0 h-[18rem] w-[180vw] max-w-none -translate-x-1/2 translate-y-1/2 bg-[#33B0D5] rounded-[999px] blur-[100px] z-0" /> */}
    </footer>
  );
};

export default Footer;
