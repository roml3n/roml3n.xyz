import CaseSection from "@/app/(pages)/work/caseSection";
import TuchezeCard from "@/app/(pages)/work/tucheze/TuchezeCard";
import Image from "next/image";
import Button from "@/app/components/Button";
import MoreProjectsSection from "@/app/(pages)/work/MoreProjectsSection";

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
        <h5 className="h5 font-medium opacity-40 whitespace-pre-line">
          {" "}
          {`The CB Group \n [ 05.2024 ]`}{" "}
        </h5>
      </div>

      {/* Intro  */}
      <div className="flex flex-col gap-4 col-span-2">
        <Button variant="primary" label="See live" url="https://tucheze.com" />
      </div>

      <h5 className="h5 lg:col-start-5 col-span-4 md:col-span-8">
        As online sports betting surged, Tucheze (Swahili for ‘Let&apos;s Play’)
        needed a UI that captured game-day excitement while staying
        user-friendly for all levels of bettors. This design focused on creating
        an intuitive, immersive experience that guided users through interactive
        games, offering quick thrills and even quicker wins—boosting engagement
        and building loyalty among sports enthusiasts.
      </h5>
      <CaseSection title="To be considered a success, the design needed to:">
        <div className="flex flex-col md:flex-row w-full gap-4">
          <TuchezeCard description="Establish a visually compelling interface that could captivate users and make the betting experience feel dynamic and immersive." />
          <TuchezeCard description="Create intuitive pathways for users to jump quickly between various betting options and interactive games, reducing friction and enhancing enjoyment." />
          <TuchezeCard description="Balance the interface between usability and thrill, making it visually exciting without compromising clarity or ease of navigation." />
        </div>
      </CaseSection>

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
