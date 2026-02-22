import Image from "next/image";
import WayaInterviewCard from "@/app/(pages)/work/waya-ssn/WayaInterviewCard";
import AnalysisCard from "@/app/(pages)/work/waya-ssn/AnalysisCard";
import MoreProjectsSection from "@/app/(pages)/work/MoreProjectsSection";
import Button from "@/app/components/Button";

const WayaSSN = () => {
  return (
    <section className="content-start w-full min-h-[calc(100dvh-23rem)] mt-24 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 grid-rows-auto gap-x-4 md:gap-x-6 gap-y-9 md:gap-y-16 relative justify-center self-center">
      <div className="row-span-1 col-span-4 md:col-span-8 lg:col-span-6  flex flex-col gap-1">
        <h2 className="h2">
          {" "}
          Enhancing financial inclusion for new Americans and immigrants{" "}
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
        <h5 className="h5 font-medium opacity-40 whitespace-pre-line">
          {" "}
          {`Waya \n [ 03.2024 ]`}{" "}
        </h5>
      </div>

      {/* Intro  */}
      <div className="flex flex-col gap-4 col-span-3">
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

      <div className="flex flex-col gap-6 md:col-start-5 col-span-4 md:col-span-8">
        <div className="flex flex-col gap-1 w-full">
          <h3 className="h3 opacity-60">Overview</h3>
          <h5 className="h5 ">
            During the first quarter of 2024, as part of a design sprint, I had
            the fantastic opportunity to work on a new feature for Waya, a
            neobank aimed at providing financial inclusivity to new Americans
            and immigrants to the US.
          </h5>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <h3 className="h3 opacity-60">Challenge</h3>
          <h5 className="h5">
            Despite the increasing demand for financial services among new
            Americans and immigrants, many are unable to access traditional
            banking due to the requirement of SSNs. This practice limits tons of
            people's ability to save, invest, and participate fully in the
            economy.
          </h5>
        </div>
      </div>

      {/* Interview  */}

      <div className="w-full flex flex-col gap-4 col-span-4 md:col-span-8 lg:col-start-5">
        <h3 className="h3 opacity-70">
          What are users actually going through?
        </h3>
        <h5 className="h5 !font-normal whitespace-pre-line">
          I conducted three interviews with key stakeholders between the ages of
          25-45. Going in, I had a few things I wanted to accomplish by this
          stage:
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
      </div>

      {/* Analysis of Results  */}
      <div className="w-full flex flex-col gap-4 col-span-4 md:col-span-8 lg:col-start-5">
        <h3 className="h3 opacity-70">Analysis of the research findings</h3>
        <h5 className="h5 !font-normal whitespace-pre-line">
          The feedback collected from the research phase brought to light a few
          key findings.
        </h5>
        <div className="flex flex-col gap-4">
          <AnalysisCard
            imgSrc="/images/work/waya-ssn/icons/documentation.svg"
            title="Documentation Challenges"
            desc="Users face significant barriers in accessing traditional banking services due to stringent documentation requirements, particularly the need for Social Security Numbers. This limitation restricts their ability to open accounts."
            className="bg-[#EAEBF7]"
          />
          <AnalysisCard
            imgSrc="/images/work/waya-ssn/icons/exclusion.svg"
            title="Financial Exclusion"
            desc="The inability to open bank accounts leaves immigrants financially excluded, forcing them to rely on alternative financial services with high fees and limited functionality. Some express frustration over the lack of accessible and affordable banking options tailored to their needs."
            className="bg-[#EEEBF3]"
          />
          <AnalysisCard
            imgSrc="/images/work/waya-ssn/icons/trust.svg"
            title="Trust and Rapport"
            desc="Establishing trust and rapport with users is essential for engagement and adoption. Demonstrating empathy and actively listening to their  concerns fosters a sense of ownership and investment in the solution."
            className="bg-[#EDF2F6]"
          />
        </div>
      </div>

      {/* Problem & Goal */}
      <div className="w-full flex flex-col gap-4 col-span-4 md:col-span-8 lg:col-start-5">
        <h3 className="h3 opacity-70">The problem</h3>
        <h5 className="h5 !font-normal whitespace-pre-line">
          Immigrants and new Americans have trouble accessing financial services
          as bank require them to provide SSNs. <br />
          <br /> Users express concerns about the security and privacy
          implications of providing personal information for account
          verification purposes. Fear of identity theft or misuse of personal
          data undermines trust in financial institutions and digital platforms.
        </h5>
      </div>
      <h2 className="h2 !font-normal italic opacity-60 gap-4 col-span-4 md:col-span-8 lg:col-start-5 ">
        The goal was to simplify the onboarding process for new Waya users,
        implementing a way to open an account without needing a social security
        number, so they can get to save, send and spend money as fast as
        possible.
      </h2>

      {/* Solution Framework  */}
      <div className="w-full flex flex-col gap-4 col-span-4 md:col-span-8 lg:col-start-5">
        <h3 className="h3 opacity-70">How might we solve for this problem</h3>
        <h5 className="h5 !font-normal whitespace-pre-line">
          Crafting a solution framework based around the research findings.
        </h5>
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

      {/* Gallery  */}
      <div className="col-span-4 md:col-span-8 lg:col-span-12 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 grid-rows-auto gap-2">
        <Image
          src="/images/work/waya-ssn/waya-ssn-img-01.webp"
          alt="screenshot of the finished product"
          width={1280}
          height={720}
          className="col-span-4 md:col-span-8 lg:col-span-12 rounded-md border border-black/10"
        />
        <Image
          src="/images/work/waya-ssn/waya-ssn-img-02.webp"
          alt="screenshot of the finished product"
          width={1280}
          height={720}
          className="col-span-4 md:col-span-8 lg:col-span-12 rounded-md border border-black/10"
        />
        <Image
          src="/images/work/waya-ssn/waya-ssn-img-03.webp"
          alt="screenshot of the finished product"
          width={1280}
          height={720}
          className="col-span-4 md:col-span-8 lg:col-span-12 rounded-md border border-black/10"
        />
        <Image
          src="/images/work/waya-ssn/waya-ssn-img-04.webp"
          alt="screenshot of the finished product"
          width={1280}
          height={720}
          className="col-span-4 md:col-span-8 lg:col-span-12 rounded-md border border-black/10"
        />
      </div>

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
                This project successfully employed a user-centric design
                approach, gathering insights from user interviews to understand
                the needs and pain points of users, which informed the
                development of solutions tailored to address their specific
                challenges.
              </h5>
              <h5 className="h5 rounded-md bg-gradient-to-b from-[#CEDDE7] to-transparent items-center p-4 md:p-6 h4 w-full justify-center">
                The solution successfully navigated regulatory requirements,
                including tax compliance and ID verification, by incorporating
                the W-8BEN form into the account opening process, demonstrating
                a commitment to legal and regulatory compliance while also
                prioritizing user needs and accessibility.
              </h5>
            </div>
          </div>

          <div className="flex flex-col items-start gap-4 w-full bg-[#EEF4F8] p-3 md:p-4 rounded-xl">
            <p className="h4 font-medium !text-fullgrey !opacity-100">
              What didn’t go so well
            </p>
            <div className="flex gap-2 md:gap-4 flex-col md:flex-row">
              <h5 className="h5 rounded-md bg-gradient-to-b from-[#CEDDE7] to-transparent items-center p-4 md:p-6 h4 w-full justify-center">
                The implementation of these advanced verification methods
                presented technical challenges and complexities. This resulted
                in delays during the development and rollout of the feature.
              </h5>
              <h5 className="h5 rounded-md bg-gradient-to-b from-[#CEDDE7] to-transparent items-center p-4 md:p-6 h4 w-full justify-center">
                There was a significant time constraint for the ideation and
                implementation of the feature, which may have cause us to
                overlook a few key areas.
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
