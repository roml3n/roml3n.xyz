import Image from "next/image";
import WayaInterviewCard from "@/app/(pages)/work/waya-ssn/WayaInterviewCard";
import AnalysisCard from "@/app/(pages)/work/waya-ssn/AnalysisCard";
import MoreProjectsSection from "@/app/(pages)/work/MoreProjectsSection";
import Button from "@/app/components/Button";
import CaseImageCarousel from "@/app/components/CaseImageCarousel";
import CaseSection from "../caseSection";
import CaseIntroSection from "../CaseIntroSection";
import { IconBrandFigma } from "@tabler/icons-react";

const WayaSSN = () => {
  return (
    <section className="content-start w-full min-h-[calc(100dvh-23rem)] mt-24 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 grid-rows-auto gap-x-4 md:gap-x-6 gap-y-9 md:gap-y-16 relative justify-center self-center">
      <div className="row-span-1 col-span-4 md:col-span-8 lg:col-span-6  flex flex-col gap-1">
        <h2 className="h2">
          {" "}
          Designing U.S. banking for people without an SSN{" "}
        </h2>
        <h2 className="h2 opacity-40"> [ product design ] </h2>
      </div>

      {/* Hero  */}
      <div className="flex flex-col col-span-4 md:col-span-8 lg:col-span-12">
        <Image
          src="/images/work/waya-ssn/waya-ssn-hero.webp"
          alt="Two iPhones showing the Waya app"
          width={1280}
          height={720}
          className="w-full mb-4"
        />
        <div className="flex justify-between">
        <h5 className="h5 font-medium opacity-40 whitespace-pre-line">
          {" "}
          {`Waya \n [ 03.2024 ]`}{" "}
        </h5>
        <div className="flex w-fit gap-4">
          <Button
            variant="primary"
            label="Get on Play Store"
            url="https://play.google.com/store/apps/details?id=com.wayapay.neo.app&hl=en"
          />
          <Button
            variant="secondary"
            label="Get on App Store"
            url="https://apps.apple.com/app/waya-mobile-banking/id6445921373"
          />
        </div>
        </div>
       
      </div>

      {/* Intro  */}
      <CaseIntroSection
        intro={`In Q1 2024, during a design sprint at Waya, I worked on a feature aimed at one clear goal: helping new Americans and immigrants access financial services without a Social Security Number.

For many, arriving in the U.S. means starting over — no credit history, no established records, and often, no SSN. Traditional banks treat that as a hard stop. We saw it as a design problem worth solving, and our challenge was to rethink onboarding in a way that maintained compliance and security while expanding access.`}
        role={["Product Designer (solo)", "Design System", "Documentation"]}
        timeline={["Q1 2024", "Design sprint"]}
        type={["Mobile App", "Fintech", "B2C"]}
        tools={[{ label: "Figma", icon: IconBrandFigma }]}
        problem={{
          title: "Problems",
          description: (
            <>
              Most banks{" "}
              <strong className="font-semibold">require an SSN</strong> to
              open an account, locking new Americans and immigrants out of
              saving, investing, or receiving payments securely &mdash;
              pushing them toward expensive, limited alternatives.
            </>
          ),
        }}
        solution={{
          title: "Solution",
          description: (
            <>
              I designed a{" "}
              <strong className="font-semibold">
                flexible onboarding flow
              </strong>{" "}
              that accepts alternative forms of ID, backed by{" "}
              <strong className="font-semibold">
                robust encryption and clear security messaging
              </strong>{" "}
              to build trust from the first interaction.
            </>
          ),
        }}
        results={{
          title: "Results",
          description: (
            <>
              Incorporated regulatory requirements, including the W-8BEN
              form, into the flow{" "}
              <strong className="font-semibold">
                without making it feel intimidating
              </strong>
              , balancing compliance with accessibility and{" "}
              <strong className="font-semibold">
                expanding who could realistically open an account
              </strong>
              .
            </>
          ),
        }}
      />

      {/* Interview  */}

      <div className="w-full flex flex-col col-span-4 md:col-span-6 lg:col-span-8 md:col-start-2 lg:col-start-3">
        <h3 className="h3 opacity-70">What are users actually experiencing?</h3>
        <h5 className="h5 !font-normal">
          I conducted three interviews with stakeholders aged 25–45 to
          understand what this barrier felt like in real life. <br /> <br />
          My focus going in was:
        </h5>
        <div className="flex flex-col md:flex-row w-full gap-4">
          <WayaInterviewCard
            imgSrc="/images/work/waya-ssn/icons/challenges.svg"
            title="Understand user challenges"
            description="Gain insights into the unique challenges new Americans and immigrants face in accessing financial services."
          />
          <WayaInterviewCard
            imgSrc="/images/work/waya-ssn/icons/pain.svg"
            title="Identify pain points"
            description="Identify user frustrations in navigating current financial solutions to uncover key areas for improvement."
          />
          <WayaInterviewCard
            imgSrc="/images/work/waya-ssn/icons/assumption.svg"
            title="Validate Assumptions"
            description="Validate user needs through direct feedback, ensuring the solution tackles real challenges effectively."
          />
        </div>
        <h5 className="h5 !font-normal">
          What surfaced was deeper than just paperwork.
        </h5>
      </div>

      {/* Analysis of Results  */}
      <div className="w-full flex flex-col gap-4 col-span-4 md:col-span-6 lg:col-span-8 md:col-start-2 lg:col-start-3">
        <h3 className="h3 opacity-70">What the research revealed</h3>
        <h5 className="h5 !font-normal whitespace-pre-line">
          The feedback collected from the research phase brought to light a few
          key findings.
        </h5>
        <div className="flex flex-col gap-4">
          <AnalysisCard
            imgSrc="/images/work/waya-ssn/icons/documentation.svg"
            title="Documentation Barriers"
            desc="The requirement for an SSN was the primary blocker. Without it, users simply couldn’t open accounts, even when they had valid government IDs from their home countries."
            className="bg-[#EAEBF7]"
          />
          <AnalysisCard
            imgSrc="/images/work/waya-ssn/icons/exclusion.svg"
            title="Financial Exclusion"
            desc="Without access to traditional banking, users turned to high-fee alternatives. This limited their ability to build savings, send money efficiently, or participate fully in the economy."
            className="bg-[#EEEBF3]"
          />
          <AnalysisCard
            imgSrc="/images/work/waya-ssn/icons/trust.svg"
            title="Trust and Security Concerns"
            desc="Users were cautious about sharing sensitive personal information. Fear of identity theft and data misuse made digital onboarding feel risky. Trust wasn’t assumed. It had to be earned."
            className="bg-[#EDF2F6]"
          />
        </div>
      </div>

      {/* Problem & Goal */}
      <div className="w-full flex flex-col gap-4 col-span-4 md:col-span-6 lg:col-span-8 md:col-start-2 lg:col-start-3">
        <h3 className="h3 opacity-70">Defining the core problem</h3>
        <h5 className="h5 !font-normal whitespace-pre-line">
          New Americans and immigrants struggle to access financial services
          because onboarding systems are built around SSN-based verification.
          <br />
          <br />
          At the same time, users are understandably wary about sharing personal
          information without clear safeguards.
          <br />
          <br />
          We needed to create an onboarding experience that expanded access,
          preserved security, and built trust from the first interaction.
        </h5>
      </div>
      <h2 className="h2 !font-normal italic opacity-60 gap-4 col-span-4 md:col-span-6 lg:col-span-8 md:col-start-2 lg:col-start-3 ">
        Goal: Simplify onboarding so users can open an account without an SSN
        and start saving, sending, and spending as quickly as possible.
      </h2>

      {/* Solution Framework  */}
      <div className="w-full flex flex-col gap-4 col-span-4 md:col-span-6 lg:col-span-8 md:col-start-2 lg:col-start-3">
        <h3 className="h3 opacity-70">
          How might we design for access and trust?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 grid-rows-3 gap-0 md:gap-2">
          <p className="p-4 flex items-center col-span-2 bg-[#D5E3FF] h4 rounded-t-2xl md:rounded-lg">
            How might we simplify the account opening process for users who lack
            traditional documentation?
          </p>
          <p className="p-4 flex items-center col-span-3 bg-[#B0ECC8] h4 rounded-b-2xl md:rounded-lg mb-4 md:m-0">
            Develop a flexible account opening process that accepts alternative
            forms of identification, such as international passports,
            driver&apos;s licenses, or government-issued IDs from the
            user&apos;s home country
          </p>

          <p className="p-4 flex items-center col-span-2 bg-[#D5E3FF] h4 rounded-t-2xl md:rounded-lg">
            How might we ensure the security and privacy of users&apos; personal
            information while facilitating the account verification process,
            instilling trust and confidence in our platform?
          </p>
          <p className="p-4 flex items-center col-span-3 bg-[#B0ECC8] h4 rounded-b-2xl md:rounded-lg mb-4 md:m-0">
            Implement robust encryption protocols to safeguard users&apos;
            personal information during the account verification process.
            Provide clear and transparent communication to users regarding the
            security measures in place, reassuring them of the platform&apos;s
            commitment to protecting their privacy.
          </p>

          <p className="p-4 flex items-center col-span-2 bg-[#D5E3FF] h4 rounded-t-2xl md:rounded-lg">
            How might we design a user-friendly and intuitive digital flow that
            accommodates varying levels of digital literacy, ensuring
            accessibility and ease of use for all users?
          </p>
          <p className="p-4 flex items-center col-span-3 bg-[#B0ECC8] h4 rounded-b-2xl md:rounded-lg">
            Design an intuitive interface with clear navigation and visual cues
            to guide users through the account opening process step by step.
            Offer interactive tutorials, tooltips, and help sections within the
            platform to provide assistance and guidance to users.
          </p>
        </div>
      </div>

      <CaseSection>
        {/* Gallery  */}
        <CaseImageCarousel
          images={[
            {
              src: "/images/work/waya-ssn/waya-ssn-img-02.webp",
              alt: "screenshot of the finished product",
            },
            {
              src: "/images/work/waya-ssn/waya-ssn-img-01.webp",
              alt: "screenshot of the finished product",
            },
            {
              src: "/images/work/waya-ssn/waya-ssn-img-03.webp",
              alt: "screenshot of the finished product",
            },
            {
              src: "/images/work/waya-ssn/waya-ssn-img-04.webp",
              alt: "screenshot of the finished product",
            },
          ]}
        />
      
      </CaseSection>

    
      {/* Looking back  */}
      <div className="w-full flex flex-col gap-6 col-span-4 md:col-span-8 lg:col-span-12">
        <h3 className="h3 opacity-70">Looking back...</h3>
        <div className="flex gap-4 flex-col md:flex-row justify-start">
          <div className="flex flex-col items-start gap-4 w-full bg-[#EEF4F8] p-3 md:p-4 rounded-xl">
            <p className="h4 font-medium !text-fullgrey !opacity-100">
              What went well
            </p>
            <div className="flex gap-2 md:gap-4 flex-col md:flex-row">
              <h5 className="h5 rounded-md bg-gradient-to-b from-[#CEDDE7] to-transparent items-center p-4 md:p-6 h4 w-full justify-center">
                A genuinely user-centered approach grounded in real interviews
                shaped the direction of the feature.
              </h5>
              <h5 className="h5 rounded-md bg-gradient-to-b from-[#CEDDE7] to-transparent items-center p-4 md:p-6 h4 w-full justify-center">
                We successfully incorporated regulatory requirements, including
                the W-8BEN form, into the flow without making it feel
                intimidating. <br /> <br />
                The solution balanced compliance with accessibility, expanding
                who could realistically open an account.
              </h5>
            </div>
          </div>

          <div className="flex flex-col items-start gap-4 w-full bg-[#EEF4F8] p-3 md:p-4 rounded-xl">
            <p className="h4 font-medium !text-fullgrey !opacity-100">
              What was challenging
            </p>
            <div className="flex gap-2 md:gap-4 flex-col md:flex-row">
              <h5 className="h5 rounded-md bg-gradient-to-b from-[#CEDDE7] to-transparent items-center p-4 md:p-6 h4 w-full justify-center">
                Integrating advanced verification methods introduced technical
                complexity, which slowed development.
                <br />
                <br />
                The sprint timeline was tight, limiting deeper exploration and
                iteration in certain areas.
              </h5>
              <h5 className="h5 rounded-md bg-gradient-to-b from-[#CEDDE7] to-transparent items-center p-4 md:p-6 h4 w-full justify-center">
                If given more time, I would have tested additional variations of
                the onboarding flow to further simplify edge cases.
              </h5>
            </div>
          </div>
        </div>
      </div>

      {/* Lessons were learnt  */}
      <div className="w-full flex flex-col gap-4 col-span-4 md:col-span-8 lg:col-span-12">
        <h3 className="h3 opacity-70">
          This challenge wasn’t short of lessons
        </h3>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="bg-[#B0ECC8] pt-6 rounded-3xl h-full flex flex-col items-start justify-end w-full border border-black border-opacity-10 overflow-hidden">
            <p className="h4 font-medium px-6 pb-4">User-centric design 🔑</p>
            <h5 className="h5 flex bg-almostwhite p-6 rounded-2xl">
              Prioritizing a user-centric design approach is crucial for
              developing solutions that effectively address the needs and
              challenges of the target audience. By empathizing with users and
              understanding their unique circumstances, we can create more
              impactful and inclusive products.
            </h5>
          </div>
          <div className="bg-[#B0ECC8] pt-6 rounded-3xl h-full flex flex-col items-start justify-end w-full border border-black border-opacity-10 overflow-hidden">
            <p className="h4 font-medium px-6 pb-4">Regulatory compliance 💯</p>
            <h5 className="h5 flex bg-almostwhite p-6 rounded-2xl">
              Compliance with legal and regulatory requirements is essential,
              particularly in highly regulated industries such as fintech.
              Prioritizing compliance from the start of the project ensures that
              innovative solutions are developed within the boundaries of
              applicable laws and regulations.
            </h5>
          </div>
          <div className="bg-[#B0ECC8] pt-6 rounded-3xl h-full flex flex-col items-start justify-end w-full border border-black border-opacity-10 overflow-hidden">
            <p className="h4 font-medium px-6 pb-4">
              Innovation 🤝 Collaboration
            </p>
            <h5 className="h5 flex bg-almostwhite p-6 rounded-2xl">
              Innovation thrives on cross-functional collaboration and diverse
              perspectives. By fostering collaboration between design,
              engineering, compliance, and other teams, we can leverage a wide
              range of expertise to develop innovative solutions.
            </h5>
          </div>
        </div>
      </div>

      <MoreProjectsSection currentHref="/work/waya-ssn" />
    </section>
  );
};

export default WayaSSN;
