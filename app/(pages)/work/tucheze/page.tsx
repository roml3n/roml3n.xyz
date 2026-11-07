import CaseSection from "@/app/(pages)/work/caseSection";
import CaseIntroSection from "@/app/(pages)/work/CaseIntroSection";
import TuchezeCard from "@/app/(pages)/work/tucheze/TuchezeCard";
import Image from "next/image";
import Button from "@/app/components/Button";
import MoreProjectsSection from "@/app/(pages)/work/MoreProjectsSection";
import { IconBrandFigma } from "@tabler/icons-react";

const Tucheze = () => {
  return (
    <section className="content-start w-full min-h-[calc(100dvh-23rem)] mt-24 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 grid-rows-auto gap-x-4 md:gap-x-6 gap-y-9 md:gap-y-16 relative justify-center self-center">
      <div className="row-span-1 col-span-4 md:col-span-8 lg:col-span-6  flex flex-col gap-1">
        <h2 className="h2">
          {" "}
          Crafting a high-stakes experience for sports betting enthusiasts{" "}
        </h2>
        <h2 className="h2 opacity-40"> [ interface design ] </h2>
      </div>

      {/* Hero  */}
      <div className="flex flex-col col-span-4 md:col-span-8 lg:col-span-12">
        <Image
          src="/images/work/tucheze/tucheze-hero.webp"
          alt="Two iPhones displaying the Tucheze mobile interface"
          width={1280}
          height={720}
          className="w-full mb-4"
        />
        <div className="flex justify-between w-full">
        <h5 className="h5 font-medium opacity-40 whitespace-pre-line">
          {" "}
          {`The CB Group \n [ 05.2024 ]`}{" "}
        </h5><Button variant="primary" label="See live" url="https://tucheze.com" /></div>
      </div>

      {/* Intro  */}
      <CaseIntroSection
        intro={`Tucheze is an online sports and casino betting platform, and the existing interface wasn't matching the adrenaline of live games. Users wanted the immediacy and energy of a stadium, but the interface felt flat and static.

My role was to translate that excitement into visuals, making each interaction feel like game day, while balancing thrill with usability: users needed to move seamlessly between live games, dynamic bets, and real-time scores without getting lost in flashy chaos.`}
        role={["Product Designer (solo)"]}
        timeline={["May 2024"]}
        type={["Mobile App", "iGaming", "B2C"]}
        tools={[{ label: "Figma", icon: IconBrandFigma }]}
        problem={{
          title: "Problems",
          description: (
            <>
              The interface{" "}
              <strong className="font-semibold">
                felt flat and static
              </strong>{" "}
              against the adrenaline of live betting, and users struggled to
              move between live games, bets, and scores without getting lost.
            </>
          ),
        }}
        solution={{
          title: "Solution",
          description: (
            <>
              I designed a{" "}
              <strong className="font-semibold">
                visually dynamic interface
              </strong>{" "}
              that captures the excitement of live games, with{" "}
              <strong className="font-semibold">
                frictionless navigation
              </strong>{" "}
              between live games, bets, and scores &mdash; balancing
              high-energy visuals with usability.
            </>
          ),
        }}
        results={{
          title: "Results",
          description: (
            <>
              The redesign{" "}
              <strong className="font-semibold">
                increased user engagement
              </strong>{" "}
              &mdash; longer session times and higher interaction rates with
              key features &mdash; with users praising the dynamic visuals and
              intuitive layout.
            </>
          ),
        }}
      />

      <div className="flex flex-col gap-4 col-span-4 md:col-span-6 lg:col-span-8 md:col-start-2 lg:col-start-3">
      <h3 className="h3 opacity-70">Goals of the design</h3>
        <div className="flex flex-col md:flex-row w-full gap-4">
          <TuchezeCard
            description="Make it feel alive:
Create a visually dynamic interface that captures the excitement of high-stakes betting."
          />
          <TuchezeCard
            description="Navigate without friction:
Enable users to jump instantly between live games, bets, and scores."
          />
          <TuchezeCard description="Thrill meets clarity: Balance high-energy visuals with usability, so the interface excites without confusing." />
        </div>
      </div>

      {/* Gallery  */}
      <div className="col-span-4 md:col-span-8 lg:col-span-12 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 grid-rows-auto gap-2">
        <Image
          src="/images/work/tucheze/tucheze-img-01.webp"
          alt="screenshot of the finished product"
          width={1280}
          height={720}
          className="col-span-4 md:col-span-8 lg:col-span-12 rounded-md"
        />
        <Image
          src="/images/work/tucheze/tucheze-img-02.webp"
          alt="screenshot of the finished product"
          width={1280}
          height={720}
          className="col-span-4 md:col-span-8 lg:col-span-12 rounded-md"
        />
        <Image
          src="/images/work/tucheze/tucheze-img-03.webp"
          alt="screenshot of the finished product"
          width={1280}
          height={720}
          className="col-span-4 md:col-span-8 lg:col-span-12 rounded-md"
        />
        <Image
          src="/images/work/tucheze/tucheze-img-04.webp"
          alt="screenshot of the finished product"
          width={1280}
          height={720}
          className="col-span-4 md:col-span-8 lg:col-span-12 rounded-md"
        />
      </div>

      <CaseSection>
        <h3 className="flex flex-col gap-2 h3 opacity-70 italic">
          Kama si Tucheze, sichezi!
        </h3>
        <div className="flex flex-col gap-6">
          <h5 className="h5">
            The redesign increased user engagement: longer session times and
            higher interaction rates with key features, including quick-bet
            options. Users praised the dynamic visuals and intuitive layout of
            the platform, making it exciting but easy to navigate—both true for
            the fast pace of sports betting.
          </h5>
          <h5 className="h5">
            This project really cemented the importance of striking the right
            balance between visual flair and usability. It forced me to think
            about creating a design that was not only functional but also
            emotionally engaging, taught me how thoughtful visuals could really
            raise the bar for user experience and drive results.
          </h5>
        </div>
      </CaseSection>
      <MoreProjectsSection currentHref="/work/tucheze" />
    </section>
  );
};

export default Tucheze;
