import React from "react";
import { cursorCompanyProps } from "@/app/components/cursor/cursorProps";

type CompanyLinkProps = {
  label: string;
};

const CompanyLink = ({ label }: CompanyLinkProps) => {
  return (
    <span
      {...cursorCompanyProps(label)}
      className="shrink-0 whitespace-nowrap font-montreal text-lg font-medium leading-normal text-fullgrey underline decoration-[#ACACFC] decoration-[0.055em] underline-offset-[0.2em] transition-[text-decoration-color,text-decoration-thickness] duration-300 hover:decoration-mainblue hover:decoration-[calc(0.055em+2px)]"
    >
      {label}
    </span>
  );
};

const RoleLine = ({
  role,
  children,
}: {
  role: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex shrink-0 items-center gap-2">
      <p className="whitespace-nowrap font-montreal text-lg font-medium leading-normal text-fullgrey">
        {role}
      </p>
      {children}
    </div>
  );
};

export const Hero = () => {
  return (
    <section className="relative flex min-h-[509px] w-full flex-col items-center justify-end py-16 pt-28 lg:h-[509px] lg:pt-16">
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 bg-lightgrey"
      />
      <div className="flex w-full flex-col items-start gap-[30px]">
        <h1 className="w-full max-w-[638px] font-season text-[40px] font-normal leading-normal text-fullgrey sm:text-[52px] lg:w-[638px] lg:text-[64px]">
          Roman Lenjo is a designer who builds
        </h1>

        <div className="flex w-full flex-col items-start gap-10 xl:flex-row xl:gap-20">
          <div className="flex flex-col items-start gap-2">
            <p className="font-montreal text-base font-medium leading-normal text-darkgrey opacity-60">
              Now
            </p>
            <RoleLine role="Product Designer at">
              <span className="flex items-center gap-1.5">
                <span className="relative size-7 shrink-0 overflow-hidden rounded-lg bg-fullwhite">
                  <span className="absolute left-1/2 top-1/2 h-[23.946px] w-[17.938px] -translate-x-1/2 -translate-y-1/2 overflow-hidden">
                    <img
                      alt=""
                      src="/images/hero/value-chain-factory.png"
                      className="absolute left-[-16.66%] top-[-13.76%] h-[135.29%] w-[145.61%] max-w-none"
                    />
                  </span>
                  <span className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_0.5px_2px_0px_rgba(223,155,254,0.16),inset_0px_-15px_12px_0px_rgba(0,27,84,0.13)]" />
                </span>
                <CompanyLink label="Value Chain Factory" />
              </span>
            </RoleLine>
          </div>

          <div className="flex flex-col items-start gap-2">
            <p className="font-montreal text-base font-medium leading-normal text-darkgrey opacity-60">
              Before
            </p>
            <div className="flex flex-col items-start gap-2">
              <RoleLine role="UI/UX Designer at">
                <span className="flex items-center gap-1.5">
                  <span className="relative flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#262261]">
                    <img
                      alt=""
                      src="/images/hero/pawa.svg"
                      width={36}
                      height={36}
                      className="size-9 max-w-none"
                    />
                    <span className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_0.5px_4px_0px_rgba(255,255,255,0.16),inset_0px_-23px_4px_0px_rgba(0,0,0,0.13)]" />
                  </span>
                  <CompanyLink label="Pawa IT Solutions" />
                </span>
              </RoleLine>

              <RoleLine role="Product Designer at">
                <span className="flex items-center gap-1.5">
                  <span className="flex items-center">
                    <span className="relative z-[2] -mr-1 flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#121212]">
                      <img
                        alt=""
                        src="/images/hero/cb-group.svg"
                        width={24}
                        height={12}
                        className="h-[11.762px] w-[23.521px] max-w-none"
                      />
                      <span className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_0.5px_2px_0px_rgba(255,255,255,0.16),inset_0px_-23px_4px_0px_rgba(0,0,0,0.13)]" />
                    </span>
                    <span className="relative z-[1] flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[linear-gradient(-31.36deg,#07B7B1_12.494%,#0BB8E2_88.796%)]">
                      <img
                        alt=""
                        src="/images/hero/waya.svg"
                        width={17}
                        height={12}
                        className="h-[12.472px] w-[16.913px] max-w-none"
                      />
                      <span className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_0.5px_2px_0px_rgba(255,255,255,0.16),inset_0px_-23px_4px_0px_rgba(0,0,0,0.13)]" />
                    </span>
                  </span>
                  <CompanyLink label="The CB Group, Waya" />
                </span>
              </RoleLine>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
