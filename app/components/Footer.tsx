import React from "react";
import TransitionLink from "./transitions/TransitionLink";
import Image from "next/image";

const Footer = () => {
  return (
    <footer
      id="about"
      className="w-screen place-self-center justify-center flex py-8 md:py-16 bg-[radial-gradient(150%_80%_at_bottom,_#B3E2EF_0%,_#FFFFFF_50%)]"
    >
      <div className="w-[90%] md:w-[80%] max-w-7xl flex flex-col">
        {/* Logo and Links  */}
        <div className="z-20 flex items-start md:items-center justify-between gap-4 col-span-4 md:col-span-8 lg:col-span-12">
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
          <div className="flex flex-col md:flex-row items-start gap-2 md:gap-8 lg:gap-16">
            <TransitionLink
              href="mailto:yo@roml3n.xyz"
              className="h5 font-medium hover:text-mainblue transition-all duration-300"
            >
              Email{" "}
            </TransitionLink>
            <TransitionLink
              href="https://linkedin.com/in/roml3n"
              className="h5 font-medium hover:text-mainblue transition-all duration-300"
            >
              LinkedIn
            </TransitionLink>
            <TransitionLink
              href="https://x.com/roml3n"
              className="h5 font-medium hover:text-mainblue transition-all duration-300"
            >
              X/Twitter
            </TransitionLink>
          </div>
        </div>

        {/* Image  */}
        <div className="relative flex w-[90%] md:w-[60%] lg:w-1/2 h-auto items-center justify-center place-self-center -mt-12 md:-mt-6 lg:-mt-10">
          <Image
            src="/images/footer-img.webp"
            alt="watercolored image of roman sat in a chair listening to music"
            width={2400}
            height={2400}
            className="pointer-events-none w-full h-auto object-contain"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
