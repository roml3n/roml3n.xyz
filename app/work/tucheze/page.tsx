"use client";
import React from "react";
import Footer from "@/app/components/Footer";

import Hero from "@/app/sections/work/tucheze/Hero";
import ProjectInfo from "@/app/sections/work/projectInfo";
import CaseSection from "@/app/sections/work/caseSection";
import TuchezeCard from "@/app/components/ui/TuchezeCard";
import Divider from "@/app/components/ui/Divider";
import ImagesSection from "@/app/sections/work/tucheze/ImagesSection";

const Tucheze = () => {
  return (
    <section className="m-auto items-center w-full gap-16">
      <main className="flex flex-col mt-24 items-center">
        <Hero />

        {/* Case Section */}
        <section className="relative flex flex-col gap-6 w-screen bg-fullwhite py-12 items-center justify-center">
          {/* 80% Wrapper */}
          <div className="`wrapper` w-[80%] max-w-screen-lg mx-auto items-center flex flex-col gap-16 -mb-12">
            <ProjectInfo
              Overview="Tucheze, an online sports and casino betting platform, needed a visual experience in order to match the excitement of live sports and high-stakes games. With solid user research and foundational UX insights already established, my role was to instil the excitement and immediacy of a game-day atmosphere into the interface through strategic visual design. The core goal was to create a UI that provided immediate excitement and let users easily move between dynamic games, live betting, and real-time score updates."
              Role="Visual Designer"
              Timeline="2 months"
              Team={`Roman Lenjo\nIsaiah Mekenye`}
            />
            <Divider />
            <CaseSection title="To be considered a success, the design needed to:">
              <div className="flex flex-col md:flex-row w-full gap-4">
                <TuchezeCard description="Establish a visually compelling interface that could captivate users and make the betting experience feel dynamic and immersive." />
                <TuchezeCard description="Create intuitive pathways for users to jump quickly between various betting options and interactive games, reducing friction and enhancing enjoyment." />
                <TuchezeCard description="Balance the interface between usability and thrill, making it visually exciting without compromising clarity or ease of navigation." />
              </div>
            </CaseSection>

            <ImagesSection />

            <CaseSection>
              <div className="flex flex-col gap-2 h2 italic">
                Kama si Tucheze, sichezi!
              </div>
              <div className="flex flex-col gap-6">
                <p className="h4">
                  The redesign increased user engagement: longer session times
                  and higher interaction rates with key features, including
                  quick-bet options. Users praised the dynamic visuals and
                  intuitive layout of the platform, making it exciting but easy
                  to navigate—both true for the fast pace of sports betting.
                </p>
                <p className="h4">
                  This project really cemented the importance of striking the
                  right balance between visual flair and usability. It forced me
                  to think about creating a design that was not only functional
                  but also emotionally engaging, taught me how thoughtful
                  visuals could really raise the bar for user experience and
                  drive results.
                </p>
              </div>
            </CaseSection>
            <div className="gradient w-screen h-16 bg-gradient-to-b from-transparent to-almostwhite"></div>
          </div>
        </section>
      </main>

      <Footer />
    </section>
  );
};

export default Tucheze;
