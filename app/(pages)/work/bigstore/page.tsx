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
import MoreProjectsSection from "@/app/(pages)/work/MoreProjectsSection";

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
          url="https://www.figma.com/design/sfeDE3gipPzbHZU4fUUZwq/%F0%9F%9F%A2-bigstore---bigstore-website--deprecated-?node-id=0-1&t=0LF9XFvv1wJVYFzy-1"
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
      <div className="flex flex-col lg:col-start-5 col-span-4 md:col-span-8 gap-4">
        <h3 className="h3 opacity-60">Ask and ye shall be answered...</h3>
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

      {/* Problems  */}
      <div className="flex flex-col lg:col-start-5 col-span-4 md:col-span-8 gap-4">
        <h3 className="h3 opacity-60">A few problems became clear</h3>
        <p className="h6">
          The feedback collected from the research phase brought to light
          several key issues that needed attention.
        </p>
        <div className="flex flex-col bg-[radial-gradient(circle_at_center,_#FFF0E8_20%,_#fff_50%)] md:grid md:grid-cols-2 grid-rows-2 gap-4 w-full">
          <div className="col-span-1 flex flex-col rounded-lg gap-4 p-4 justify-start border border-transparent bg-fff md:[background:linear-gradient(#fff,#fff)_padding-box,linear-gradient(135deg,#ffffff_65%,#ccc)_border-box]">
            <div className="flex items-center gap-2">
              <Image
                src="/images/work/bigstore/descriptions.svg"
                alt="descriptions icon"
                height={48}
                width={48}
              />
              <h4 className="h4 ">Product descriptions</h4>
            </div>
            <h5 className="h5 w-full opacity-70">
              Users struggled to find product features and specifications
              leading to confusion and hesitation to purchase. Low-quality or
              inadequate product images make it difficult to assess item details
              and features accurately.
            </h5>
          </div>
          <div className="col-span-1 flex flex-col rounded-lg gap-4 p-4 justify-start bg-fullwhite">
            <div className="flex items-center gap-2">
              <Image
                src="/images/work/bigstore/reviews.svg"
                alt="reviews icon"
                height={48}
                width={48}
              />
              <h4 className="h4 ">Product reviews</h4>
            </div>
            <h5 className="h5 w-full opacity-70">
              Users struggled to find product features and specifications
              leading to confusion and hesitation to purchase. Low-quality or
              inadequate product images make it difficult to assess item details
              and features accurately.
            </h5>
          </div>
          <div className="col-span-1 flex flex-col rounded-lg gap-4 p-4 justify-start bg-fullwhite">
            <div className="flex items-center gap-2">
              <Image
                src="/images/work/bigstore/checkout.svg"
                alt="checkout icon"
                height={48}
                width={48}
              />
              <h4 className="h4 ">Checkout & payments</h4>
            </div>
            <h5 className="h5 w-full opacity-70">
              Confusing forms and unnecessary information requests created a
              frustrating and time-consuming experience. Users felt restricted
              and inconvenienced if their preferred payment methods were
              unavailable.
            </h5>
          </div>
          <div className="col-span-1 flex flex-col rounded-lg gap-4 p-4 justify-start border border-transparent bg-fff md:[background:linear-gradient(#fff,#fff)_padding-box,linear-gradient(135deg,#ccc,#fff_35%)_border-box]">
            <div className="flex items-center gap-2">
              <Image
                src="/images/work/bigstore/tracking.svg"
                alt="tracking icon"
                height={48}
                width={48}
              />
              <h4 className="h4 ">Order tracking</h4>
            </div>
            <h5 className="h5 w-full opacity-70">
              Lack of real-time updates or detailed information leaves users
              anxious and unsure about their orders. Unclear return processes
              discourage purchases and create negative brand perception.
            </h5>
          </div>
        </div>
      </div>

      <Image
        src="/images/work/bigstore/bigstore-img-01.webp"
        alt="screenshot of the finished product"
        width={1280}
        height={720}
        className="lg:col-start-5 col-span-4 md:col-span-8"
      />

      {/* Solutions  */}
      <div className="flex flex-col lg:col-start-5 col-span-4 md:col-span-8 gap-4">
        <h3 className="h3 opacity-60">
          Modern problems require modern solutions
        </h3>
        <p className="h6">
          To address these challenges, I devised a few key solutions...
        </p>
        <div className="flex flex-col bg-[radial-gradient(circle_at_center,_#FFF0E8_20%,_#fff_50%)] md:grid md:grid-cols-2 grid-rows-2 gap-4 w-full">
          <div className="col-span-1 flex flex-col rounded-lg gap-4 p-4 justify-start border border-transparent bg-fff md:[background:linear-gradient(#fff,#fff)_padding-box,linear-gradient(135deg,#ffffff_65%,#ccc)_border-box]">
            <div className="flex items-center gap-2">
              <Image
                src="/images/work/bigstore/descriptions.svg"
                alt="descriptions icon"
                height={48}
                width={48}
              />
              <h4 className="h4 ">Product descriptions</h4>
            </div>
            <ul className="w-full list-disc list-outside pl-5 opacity-70 space-y-1">
              <li className="h5">
                Craft clear and concise product descriptions with key features,
                benefits and specifications for easy scanning.
              </li>
              <li className="h5">
                Utilise high-quality visuals to showcase products with zoom
                functionality and multiple angles.
              </li>
            </ul>
          </div>
          <div className="col-span-1 flex flex-col rounded-lg gap-4 p-4 justify-start bg-fullwhite">
            <div className="flex items-center gap-2">
              <Image
                src="/images/work/bigstore/reviews.svg"
                alt="reviews icon"
                height={48}
                width={48}
              />
              <h4 className="h4 ">Product reviews</h4>
            </div>
            <ul className="w-full list-disc list-outside pl-5 opacity-70 space-y-1">
              <li className="h5">
                Integrate user ratings with ability to filter to show only
                specific ratings.
              </li>
              <li className="h5">
                Encourage user reviews with photos or videos and display
                verified reviews prominently alongside products.
              </li>
            </ul>
          </div>
          <div className="col-span-1 flex flex-col rounded-lg gap-4 p-4 justify-start bg-fullwhite">
            <div className="flex items-center gap-2">
              <Image
                src="/images/work/bigstore/checkout.svg"
                alt="checkout icon"
                height={48}
                width={48}
              />
              <h4 className="h4 ">Checkout & payments</h4>
            </div>
            <ul className="w-full list-disc list-outside pl-5 opacity-70 space-y-1">
              <li className="h5">
                Eliminate unnecessary steps and consolidate requests into
                logical stages.
              </li>
              <li className="h5">
                Display all fees upfront to avoid surprises at checkout.
              </li>
              <li className="h5">
                Expand payment options integrating alternative payment methods
                for greater convenience.
              </li>
            </ul>
          </div>
          <div className="col-span-1 flex flex-col rounded-lg gap-4 p-4 justify-start border border-transparent bg-fff md:[background:linear-gradient(#fff,#fff)_padding-box,linear-gradient(135deg,#ccc,#fff_35%)_border-box]">
            <div className="flex items-center gap-2">
              <Image
                src="/images/work/bigstore/tracking.svg"
                alt="tracking icon"
                height={48}
                width={48}
              />
              <h4 className="h4 ">Order tracking</h4>
            </div>
            <ul className="w-full list-disc list-outside pl-5 opacity-70 space-y-1">
              <li className="h5">
                Implement real-time order tracking by offering detailed updates
                with map tracking and estimated delivery dates to keep users
                informed.
              </li>
              <li className="h5">
                Simplify return policies by making them clear, user-friendly,
                and transparent to build trust and encourage purchases.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Gallery  */}
      <div className="col-span-4 md:col-span-8 lg:col-span-12 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 grid-rows-auto gap-2">
        <Image
          src="/images/work/bigstore/bigstore-img-02.webp"
          alt="screenshot of the finished product"
          width={1280}
          height={720}
          className="col-span-4 md:col-span-8 lg:col-span-12 rounded-md"
        />
        <Image
          src="/images/work/bigstore/bigstore-img-03.webp"
          alt="screenshot of the finished product"
          width={1280}
          height={720}
          className="col-span-4 lg:col-span-6 rounded-md"
        />
        <Image
          src="/images/work/bigstore/bigstore-img-04.webp"
          alt="screenshot of the finished product"
          width={1280}
          height={720}
          className="col-span-4 lg:col-span-6 rounded-md"
        />
        <Image
          src="/images/work/bigstore/bigstore-img-05.webp"
          alt="screenshot of the finished product"
          width={1280}
          height={720}
          className="col-span-4 md:col-span-8 lg:col-span-12 rounded-md"
        />
        <Image
          src="/images/work/bigstore/bigstore-img-06.webp"
          alt="screenshot of the finished product"
          width={1280}
          height={720}
          className="col-span-4 lg:col-span-6 rounded-md"
        />
        <Image
          src="/images/work/bigstore/bigstore-img-07.webp"
          alt="screenshot of the finished product"
          width={1280}
          height={720}
          className="col-span-4 lg:col-span-6 rounded-md"
        />
        <Image
          src="/images/work/bigstore/bigstore-img-08.webp"
          alt="screenshot of the finished product"
          width={1280}
          height={720}
          className="col-span-4 md:col-span-8 lg:col-span-12 rounded-md"
        />
        <Image
          src="/images/work/bigstore/bigstore-img-09.webp"
          alt="screenshot of the finished product"
          width={1280}
          height={720}
          className="col-span-4 lg:col-span-6 rounded-md"
        />
        <Image
          src="/images/work/bigstore/bigstore-img-10.webp"
          alt="screenshot of the finished product"
          width={1280}
          height={720}
          className="col-span-4 lg:col-span-6 rounded-md"
        />
      </div>

      <MoreProjectsSection currentHref="/work/bigstore" />
    </section>
  );
};

export default BigStore;
