import React from "react";
import Image from "next/image";

//sections
import ProjectInfo from "@/app/(pages)/work/projectInfo";
import CaseSection from "@/app/(pages)/work/caseSection";
import InterviewCard from "@/app/(pages)/work/bigstore/InterviewCard";
import WorkProblemsCard from "@/app/(pages)/work/bigstore/WorkProblemsCard";
import Divider from "@/app/components/Divider";
import Hero from "@/app/(pages)/work/bigstore/Hero";
import ImagesSection from "@/app/(pages)/work/bigstore/ImagesSection";
import Button from "@/app/components/Button";

const BigStore = () => {
  return (
    <section className="content-start w-full min-h-[calc(100dvh-23rem)] mt-24 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 grid-rows-auto gap-x-4 md:gap-x-6 gap-y-9 md:gap-y-16 relative justify-center self-center">
      <div className="row-span-1 col-span-4 md:col-span-8 lg:col-span-6  flex flex-col gap-1">
        <h2 className="h2">
          {" "}
          Redesigning e-commerce to boost loyalty, sales, and satisfaction{" "}
        </h2>
        <h2 className="h2 opacity-40"> [ product design ] </h2>
      </div>

      {/* Hero  */}
      <div className="flex flex-col col-span-4 md:col-span-8 lg:col-span-12">
        <Image
          src="/images/work/bigstore/bigstore-hero-red.webp"
          alt="An open MacBook Pro with the bigstore home page open agaisnt a red background"
          width={1280}
          height={720}
          className="w-full mb-4"
        />
        <h6 className="h6 font-medium opacity-40 whitespace-pre-line">
          {" "}
          {`The CB Group
[ 07.2023 ]`}{" "}
        </h6>
      </div>

      {/* Intro  */}
      <div className="flex flex-col gap-4 col-span-2">
        <Button
          variant="primary"
          label="Visit live site"
          url="https://bigstore.africa/"
        />
        <Button
          variant="secondary"
          label="View in Figma"
          url="https://bigstore.africa/"
        />
      </div>

      <h6 className="h6 lg:col-start-5 col-span-4 md:col-span-8">
        In the increasingly competitive landscape of e-commerce, Bigstore
        recognized the need to revamp its digital presence to stand out and
        drive higher conversion rates. I undertook the challenge of redesigning
        Bigstore's platform with the dual objectives of delivering a visually
        stunning experience while enhancing usability to boost customer
        engagement and sales. The redesign saw an alkd;lmkadmsasa/.....
      </h6>

      {/* Interviews  */}
      <div className="flex flex-col lg:col-start-5 col-span-4 md:col-span-8 gap-6">
        <h3 className="h3">Ask and ye shall be answered...</h3>
        <p className="h6">
          I conducted four interviews, with respondents answering more than 10
          open ended questions. This process helped unmask users’ pain points
          and frustrations with the existing website, unlocking invaluable
          insights that would be the driving force of the design journey.{" "}
        </p>
        <div className="flex gap-4 w-full">
          <div className="flex flex-col rounded-sm gap-4 p-4 justify-start bg-[#f5f5f5]">
            <div className="flex items-center gap-2">
              <Image
                src="/images/work/bigstore/gerald-avatar.webp"
                alt="Memoji icon of interviewee one"
                height={32}
                width={32}
              />
              <h4 className="h4">Respondent #1</h4>
            </div>
            <h5 className="h5 w-full opacity-70">
              "The scarcity of payment options was a major inconvenience! I had
              to scramble and find another payment method, which slowed down the
              process. Offering more payment options...would definitely improve
              my experience."
            </h5>
          </div>
          <div className="flex flex-col rounded-sm gap-4 p-4 justify-start bg-[#f5f5f5]">
            <div className="flex items-center gap-2">
              <Image
                src="/images/work/bigstore/beatrice-avatar.webp"
                alt="Memoji icon of interviewee one"
                height={32}
                width={32}
              />
              <h4 className="h4">Respondent #2</h4>
            </div>
            <h5 className="h5 w-full opacity-70">
              "It's frustrating that I can't see item reviews. Seeing other
              people's experiences and opinions help me build trust and makes me
              feel more confident about spending my money. Without reviews, I'd
              be hesitant to buy."
            </h5>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BigStore;
