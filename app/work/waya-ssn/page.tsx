"use client";
import React from "react";
import Footer from "@/app/components/Footer";

import Hero from "@/app/sections/work/waya-ssn/Hero";
import ProjectInfo from "@/app/sections/work/projectInfo";
import CaseSection from "@/app/sections/work/caseSection";
import WayaInterviewCard from "@/app/components/ui/WayaInterviewCard";
import AnalysisCard from "@/app/components/ui/AnalysisCard";
import Divider from "@/app/components/ui/Divider";
import ImagesSection from "@/app/sections/work/waya-ssn/ImagesSection";
import MarqueeSection from "@/app/sections/work/waya-ssn/MarqueeSection";

const WayaSSN = () => {
  return (
    <section className="m-auto items-center w-full gap-16">
      <main className="flex flex-col mt-24 items-center">
        <Hero />

        {/* Case Section */}
        <section className="relative flex flex-col gap-6 w-screen bg-fullwhite py-12 items-center justify-center">
          {/* 80% Wrapper */}
          <div className="`wrapper` w-[80%] max-w-screen-lg mx-auto items-center flex flex-col gap-16 -mb-12">
            <ProjectInfo
              Overview="During the first quarter of 2024, as part of a design sprint, I had the fantastic opportunity to work on a new feature for Waya, a neobank aimed at providing financial inclusivity to new Americans and immigrants to the US."
              Role="Lead Designer"
              Timeline="1 week sprint"
              Team={`Alex (Project Lead)\nMercy\nAdrian`}
            />
            <Divider />
            <CaseSection
              title="What are users actually going through?"
              description="I conducted three interviews with key stakeholders between the ages of 25-45. Going in, I had a few things I wanted to accomplish by this stage:"
            >
              <div className="flex flex-col md:flex-row w-full gap-4">
                <WayaInterviewCard
                  imgSrc="/images/work/waya-ssn/challenges.svg"
                  title="Understand user challenges"
                  description="Gain insights into the unique challenges new Americans and immigrants face in accessing financial services."
                />
                <WayaInterviewCard
                  imgSrc="/images/work/waya-ssn/pain.svg"
                  title="Identify pain points"
                  description="Identify user frustrations in navigating current financial solutions to uncover key areas for improvement."
                />
                <WayaInterviewCard
                  imgSrc="/images/work/waya-ssn/assumption.svg"
                  title="Validate Assumptions"
                  description="Validate user needs through direct feedback, ensuring the solution tackles real challenges effectively."
                />
              </div>
            </CaseSection>

            <Divider />

            <CaseSection
              title="Analysis of the research findings"
              description="The feedback collected from the research phase brought to light a few key findings."
            >
              <div className="flex flex-col gap-4">
                <AnalysisCard
                  imgSrc="/images/work/waya-ssn/documentation.svg"
                  title="Documentation Challenges"
                  desc="Users face significant barriers in accessing traditional banking services due to stringent documentation requirements, particularly the need for Social Security Numbers. This limitation restricts their ability to open accounts."
                  className="bg-[#EAEBF7]"
                />
                <AnalysisCard
                  imgSrc="/images/work/waya-ssn/exclusion.svg"
                  title="Financial Exclusion"
                  desc="The inability to open bank accounts leaves immigrants financially excluded, forcing them to rely on alternative financial services with high fees and limited functionality. Some express frustration over the lack of accessible and affordable banking options tailored to their needs."
                  className="bg-[#EEEBF3]"
                />
                <AnalysisCard
                  imgSrc="/images/work/waya-ssn/trust.svg"
                  title="Trust and Rapport"
                  desc="Establishing trust and rapport with users is essential for engagement and adoption. Demonstrating empathy and actively listening to their  concerns fosters a sense of ownership and investment in the solution."
                  className="bg-[#EDF2F6]"
                />
              </div>
            </CaseSection>

            <CaseSection
              title="The problem"
              description={
                <>
                  {" "}
                  Immigrants and new Americans have trouble accessing financial
                  services as bank require them to provide SSNs. <br />
                  <br /> Users express concerns about the security and privacy
                  implications of providing personal information for account
                  verification purposes. Fear of identity theft or misuse of
                  personal data undermines trust in financial institutions and
                  digital platforms.{" "}
                </>
              }
            >
              <div className="flex flex-col gap-12">
                <Divider />
                <h2 className="h2 italic">
                  The goal was to simplify the onboarding process for new Waya
                  users, implementing a way to open an account without needing a
                  social security number, so they can get to save, send and
                  spend money as fast as possible.
                </h2>
                <Divider />
              </div>
            </CaseSection>

            <CaseSection
              title="How might we solve for this problem"
              description="Crafting a solution framework based around the research findings."
            >
              <div className="grid grid-cols-1 md:grid-cols-5 grid-rows-3 gap-0 md:gap-2">
                <p className="p-4 flex items-center col-span-2 bg-[#D5E3FF] h4 rounded-t-2xl md:rounded-lg">
                  How might we simplify the account opening process for users
                  who lack traditional documentation?
                </p>
                <p className="p-4 flex items-center col-span-3 bg-[#B0ECC8] h4 rounded-b-2xl md:rounded-lg mb-4 md:m-0">
                  Develop a flexible account opening process that accepts
                  alternative forms of identification, such as international
                  passports, driver&apos;s licenses, or government-issued IDs
                  from the user&apos;s home country
                </p>

                <p className="p-4 flex items-center col-span-2 bg-[#D5E3FF] h4 rounded-t-2xl md:rounded-lg">
                  How might we ensure the security and privacy of users&apos;
                  personal information while facilitating the account
                  verification process, instilling trust and confidence in our
                  platform?
                </p>
                <p className="p-4 flex items-center col-span-3 bg-[#B0ECC8] h4 rounded-b-2xl md:rounded-lg mb-4 md:m-0">
                  Implement robust encryption protocols to safeguard users&apos;
                  personal information during the account verification process.
                  Provide clear and transparent communication to users regarding
                  the security measures in place, reassuring them of the
                  platform&apos;s commitment to protecting their privacy.
                </p>

                <p className="p-4 flex items-center col-span-2 bg-[#D5E3FF] h4 rounded-t-2xl md:rounded-lg">
                  How might we design a user-friendly and intuitive digital flow
                  that accommodates varying levels of digital literacy, ensuring
                  accessibility and ease of use for all users?
                </p>
                <p className="p-4 flex items-center col-span-3 bg-[#B0ECC8] h4 rounded-b-2xl md:rounded-lg">
                  Design an intuitive interface with clear navigation and visual
                  cues to guide users through the account opening process step
                  by step. Offer interactive tutorials, tooltips, and help
                  sections within the platform to provide assistance and
                  guidance to users.
                </p>
              </div>
            </CaseSection>

            <ImagesSection />

            <MarqueeSection />

            <CaseSection title="Looking back...">
              <div className="flex flex-col items-start gap-4  bg-[#EEF4F8] p-4 md:p-6 rounded-3xl">
                <p className="h4 font-medium">What went well</p>
                <div className="flex gap-2 md:gap-4 flex-col md:flex-row">
                  <div className="rounded-xl bg-[#CEDDE7] items-center p-4 md:p-6 h4 w-full justify-center">
                    This project successfully employed a user-centric design
                    approach, gathering insights from user interviews to
                    understand the needs and pain points of users, which
                    informed the development of solutions tailored to address
                    their specific challenges.
                  </div>
                  <div className="rounded-xl bg-[#CEDDE7] items-center p-4 md:p-6 h4 w-full justify-center">
                    The solution successfully navigated regulatory requirements,
                    including tax compliance and ID verification, by
                    incorporating the W-8BEN form into the account opening
                    process, demonstrating a commitment to legal and regulatory
                    compliance while also prioritizing user needs and
                    accessibility.
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start gap-4 mt-6 bg-[#EEF4F8] p-4 md:p-6 rounded-3xl">
                <p className="h4 font-medium">What didn’t go so well</p>
                <div className="flex gap-2 md:gap-4 flex-col md:flex-row">
                  <div className="rounded-xl bg-[#CEDDE7] items-center p-4 md:p-6 h4 w-full justify-center">
                    The implementation of these advanced verification methods
                    presented technical challenges and complexities. This
                    resulted in delays during the development and rollout of the
                    feature.
                  </div>
                  <div className="rounded-xl bg-[#CEDDE7] items-center p-4 md:p-6 h4 w-full justify-center">
                    There was a significant time constraint for the ideation and
                    implementation of the feature, which may have cause us to
                    overlook a few key areas.
                  </div>
                </div>
              </div>
            </CaseSection>

            <Divider />

            <CaseSection title="This challenge wasn’t short of lessons">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="bg-[#B0ECC8] pt-6 rounded-3xl h-full flex flex-col items-start justify-end w-full border border-black border-opacity-10 overflow-hidden">
                  <p className="h4 font-medium px-6 pb-4">
                    User-centric design 🔑
                  </p>
                  <div className="h4 flex bg-almostwhite p-6 rounded-2xl">
                    Prioritizing a user-centric design approach is crucial for
                    developing solutions that effectively address the needs and
                    challenges of the target audience. By empathizing with users
                    and understanding their unique circumstances, we can create
                    more impactful and inclusive products.
                  </div>
                </div>
                <div className="bg-[#B0ECC8] pt-6 rounded-3xl h-full flex flex-col items-start justify-end w-full border border-black border-opacity-10 overflow-hidden">
                  <p className="h4 font-medium px-6 pb-4">
                    Regulatory compliance 💯
                  </p>
                  <div className="h4 flex bg-almostwhite p-6 rounded-2xl">
                    Compliance with legal and regulatory requirements is
                    essential, particularly in highly regulated industries such
                    as fintech. Prioritizing compliance from the start of the
                    project ensures that innovative solutions are developed
                    within the boundaries of applicable laws and regulations.
                  </div>
                </div>
                <div className="bg-[#B0ECC8] pt-6 rounded-3xl h-full flex flex-col items-start justify-end w-full border border-black border-opacity-10 overflow-hidden">
                  <p className="h4 font-medium px-6 pb-4">
                    Innovation 🤝 Collaboration
                  </p>
                  <div className="h4 flex bg-almostwhite p-6 rounded-2xl">
                    Innovation thrives on cross-functional collaboration and
                    diverse perspectives. By fostering collaboration between
                    design, engineering, compliance, and other teams, we can
                    leverage a wide range of expertise to develop innovative
                    solutions.
                  </div>
                </div>
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

export default WayaSSN;
