"use client";
import React from "react";
import Image from "next/image";
import Footer from "@/app/components/Footer";

//sections
import ProjectInfo from "@/app/(pages)/work/projectInfo";
import CaseSection from "@/app/(pages)/work/caseSection";
import InterviewCard from "@/app/components/ui/InterviewCard";
import WorkProblemsCard from "@/app/components/ui/WorkProblemsCard";
import Divider from "@/app/components/ui/Divider";
import Hero from "@/app/(pages)/work/bigstore/Hero";
import ImagesSection from "@/app/(pages)/work/bigstore/ImagesSection";

const BigStore = () => {
  return (
    <section className="m-auto items-center w-full gap-16">
      <main className="flex flex-col mt-10 md:mt-24 items-center">
        <Hero />

        {/* Case Section */}
        <section className="relative flex flex-col gap-6 w-screen bg-fullwhite py-12 items-center justify-center">
          {/* 80% Wrapper */}
          <div className="`wrapper` w-[90%] md:w-[80%] max-w-screen-lg mx-auto flex flex-col gap-16 -mb-12">
            <ProjectInfo
              Overview="Redesign Bigstore’s web app to streamline the shopping experience,
            fixing any issues and generating more sales."
              Role="Lead Designer"
              Timeline="2 months"
              Team={`Hempstone Maroria (Project Lead)\nGerald Kamau (Lead Engineer)`}
            />
            <Divider />
            <CaseSection
              title="Ask and ye shall be answered..."
              description="I conducted four interviews, with respondents answering more than 10 open ended questions. This process helped unmask users’ pain points and frustrations with the existing website, unlocking invaluable insights that would be the driving force of the design journey."
            >
              <div className="flex flex-col md:flex-row w-full gap-5">
                <InterviewCard
                  imgSrc="/images/work/bigstore/gerald-avatar.png"
                  name="Gerald"
                  role="Software Engineer"
                  quote='"The scarcity of payment options was a major inconvenience! I had to scramble and find another payment method, which slowed down the process. Offering more payment options...would definitely improve my experience."'
                />
                <InterviewCard
                  imgSrc="/images/work/bigstore/beatrice-avatar.png"
                  name="Beatrice"
                  role="Customer Specialist"
                  quote="&quot;It's frustrating that I can't see item reviews. Seeing other people's experiences and opinions help me build trust and makes me feel more confident about spending my money. Without reviews, I'd be hesitant to buy.&quot;"
                />
              </div>
            </CaseSection>
            <Divider />
            <CaseSection
              title="A few problems became clear"
              description="The feedback collected from the research phase brought to light several key issues that needed attention."
            >
              <div className="grid grid-cols-1 grid-rows-3 md:grid-cols-2 md:grid-rows-2 gap-4">
                <WorkProblemsCard
                  imgSrc="/images/work/bigstore/descriptions.svg"
                  problem="Product descriptions"
                  description={[
                    "Users struggled to find product features and specifications leading to confusion and hesitation to purchase.",
                    "Low-quality or inadequate product images make it difficult to assess item details and features accurately.",
                  ]}
                />
                <WorkProblemsCard
                  imgSrc="/images/work/bigstore/reviews.svg"
                  problem="Product reviews"
                  description={[
                    "Users struggled to find product features and specifications leading to confusion and hesitation to purchase. Low-quality or inadequate product images make it difficult to assess item details and features accurately.",
                  ]}
                />

                <WorkProblemsCard
                  imgSrc="/images/work/bigstore/checkout.svg"
                  problem="Checkout & payments"
                  description={[
                    "Confusing forms and unnecessary information requests created a frustrating and time-consuming experience.",
                    "Users felt restricted and inconvenienced if their preferred payment methods were unavailable.",
                  ]}
                />
                <WorkProblemsCard
                  imgSrc="/images/work/bigstore/tracking.svg"
                  problem="Order tracking"
                  description={[
                    "Lack of real-time updates or detailed information leaves users anxious and unsure about their orders.",
                    "Unclear return processes discourage purchases and create negative brand perception.",
                  ]}
                />
              </div>
            </CaseSection>

            <div className="w-full relative pb-[72.97%]">
              <Image
                src="/images/work/bigstore/laptop-diagonal.png"
                fill
                alt="Image of bigstore"
                className="object-cover"
              />
            </div>

            <CaseSection title="Modern problems require modern solutions">
              <div className="grid grid-cols-1 grid-rows-3 md:grid-cols-2 md:grid-rows-2 gap-4">
                <WorkProblemsCard
                  imgSrc="/images/work/bigstore/descriptions.svg"
                  problem="Product descriptions"
                  description={[
                    "Craft clear and concise product descriptions with key features, benefits and specifications for easy scanning.",
                    "Utilize high-quality visuals to showcase products with zoom functionality and multiple angles.",
                  ]}
                />
                <WorkProblemsCard
                  imgSrc="/images/work/bigstore/reviews.svg"
                  problem="Product reviews"
                  description={[
                    "Integrate user ratings with ability to filter to show only specific ratings.",
                    "Encourage user reviews with photos or videos and display verified reviews prominently alongside products.",
                  ]}
                />

                <WorkProblemsCard
                  imgSrc="/images/work/bigstore/checkout.svg"
                  problem="Checkout & payments"
                  description={[
                    "Eliminate unnecessary steps and consolidate requests into logical stages.",
                    "Display all fees upfront to avoid surprises at checkout.",
                    "Expand payment options integrating alternative payment methods for greater convenience.",
                  ]}
                />
                <WorkProblemsCard
                  imgSrc="/images/work/bigstore/tracking.svg"
                  problem="Order tracking"
                  description={[
                    "Implement real-time order tracking by offering detailed updates with map tracking and estimated delivery dates to keep users informed.",
                    "Simplify return policies by making them clear, user-friendly, and transparent to build trust and encourage purchases.",
                  ]}
                />
              </div>
            </CaseSection>
            <div className="flex flex-col items-center">
              {" "}
              <ImagesSection />
              <div className="gradient w-screen h-64 bg-gradient-to-b from-transparent to-almostwhite"></div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </section>
  );
};

export default BigStore;
