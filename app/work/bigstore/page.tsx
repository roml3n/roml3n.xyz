"use client";
import React from "react";
import Footer from "@/app/components/Footer";

import ProjectInfo from "@/app/sections/work/projectInfo";
import CaseSection from "@/app/sections/work/caseSection";
import InterviewCard from "@/app/components/ui/InterviewCard";
import Hero from "@/app/sections/work/bigstore/Hero";

const BigStore = () => {
  return (
    <section className="m-auto items-center w-full gap-16">
      <main className="flex flex-col mt-24 items-center">
        <Hero />

        {/* Case Section */}
        <section className="relative flex flex-col gap-6 w-screen bg-fullwhite py-12 items-center justify-center">
          {/* 80% Wrapper */}
          <div className="`wrapper` w-[80%] max-w-screen-lg mx-auto flex flex-col gap-16">
            <ProjectInfo
              Overview="Redesign Bigstore’s web app to streamline the shopping experience,
            fixing any issues and generating more sales."
              Role="Lead Designer"
              Timeline="2 months"
              Team={`Hempstone Maroria (Project Lead)\nGerald Kamau (Lead Engineer)`}
            />

            <CaseSection
              title="Ask and ye shall be answered..."
              description="I conducted four interviews, with respondents answering more than 10 open ended questions. This process helped unmask users’ pain points and frustrations with the existing website, unlocking invaluable insights that would be the driving force of the design journey."
            >
              <div className="flex flex-col md:flex-row w-full gap-5">
                <InterviewCard
                  imgSrc="/images/work/bigstore/gerald-avatar.png"
                  name="Gerald"
                  role="Software Engineer"
                  quote="&quot;The scarcity of payment options was a major inconvenience! I had to scramble and find another payment method, which slowed down the process. Offering more payment options...would definitely improve my experience.&quot;"
                />
                <InterviewCard
                  imgSrc="/images/work/bigstore/beatrice-avatar.png"
                  name="Beatrice"
                  role="Customer Specialist"
                  quote="&quot;It's frustrating that I can't see item reviews. Seeing other people's experiences and opinions help me build trust and makes me feel more confident about spending my money. Without reviews, I'd be hesitant to buy.&quot;"
                />
              </div>
            </CaseSection>
          </div>
        </section>
      </main>

      <Footer />
    </section>
  );
};

export default BigStore;
