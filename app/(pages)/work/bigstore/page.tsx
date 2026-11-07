import React from "react";
import Image from "next/image";

//sections
import Button from "@/app/components/Button";
import MoreProjectsSection from "@/app/(pages)/work/MoreProjectsSection";
import CaseIntroSection from "@/app/(pages)/work/CaseIntroSection";
import { IconBrandFigma } from "@tabler/icons-react";

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
        <div className="flex justify-between w-full">
        <h5 className="h5 font-medium opacity-40 whitespace-pre-line">
          {" "}
          {`The CB Group \n [ 07.2023 ]`}{" "}
        </h5> <div className="flex flex-col gap-4 col-span-2">
        <div className="flex gap-4"><Button
          variant="primary"
          label="Visit live site"
          url="https://bigstore.africa/"
        />
        <Button
          variant="secondary"
          label="View in Figma"
          url="https://www.figma.com/design/sfeDE3gipPzbHZU4fUUZwq/%F0%9F%9F%A2-bigstore---bigstore-website--deprecated-?node-id=0-1&t=0LF9XFvv1wJVYFzy-1"
        /></div></div>
      </div>
      </div>

      {/* Intro  */}
      <CaseIntroSection
        intro={`Shoppers were dropping off before completing purchases because key information was hidden, forms were confusing, and payment options were limited. Bigstore's digital experience was losing customers, and the team needed a redesign that actually made buying easy and enjoyable.

I took on the challenge to rethink the platform from the ground up, balancing usability with a fresh, modern look that could drive engagement and sales.`}
        role={["Product Designer (solo)"]}
        timeline={["Jul 2023"]}
        type={["Web", "E-commerce", "B2C"]}
        tools={[{ label: "Figma", icon: IconBrandFigma }]}
        problem={{
          title: "Problems",
          description: (
            <>
              Shoppers were{" "}
              <strong className="font-semibold">
                dropping off before completing purchases
              </strong>{" "}
              &mdash; product details and reviews were hard to find, checkout
              forms were confusing, and payment options and order tracking
              were limited.
            </>
          ),
        }}
        solution={{
          title: "Solution",
          description: (
            <>
              I redesigned{" "}
              <strong className="font-semibold">
                product details, reviews, checkout, and order tracking
              </strong>{" "}
              with clear descriptions, verified reviews, streamlined forms
              with upfront pricing, and{" "}
              <strong className="font-semibold">real-time tracking</strong>{" "}
              to remove friction at every step.
            </>
          ),
        }}
        results={{
          title: "Results",
          description: (
            <>
              Delivered a{" "}
              <strong className="font-semibold">
                redesigned end-to-end shopping experience
              </strong>{" "}
              that removed the friction causing drop-off, giving Bigstore a
              smoother, more trustworthy path from browsing to checkout.
            </>
          ),
        }}
      />

      {/* Interviews  */}
      <div className="flex flex-col col-span-4 md:col-span-6 lg:col-span-8 md:col-start-2 lg:col-start-3">
        <h3 className="h3 opacity-60">Listening to users</h3>
        <p className="h5">
          To understand the real frustrations, I interviewed four users, asking
          open-ended questions about their shopping habits, pain points, and
          expectations. These conversations revealed patterns that would guide
          every design decision.{" "}
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
              <h4 className="h4">User insight #1</h4>
            </div>
            <h5 className="h5 w-full opacity-70">
              "The scarcity of payment options was a major inconvenience! I had
              to scramble and find another method, which slowed everything down.
              More options would make shopping easier."
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
              <h4 className="h4">User insight #2</h4>
            </div>
            <h5 className="h5 w-full opacity-70">
              "I can’t see item reviews easily. Knowing what others think builds
              trust. Without that, I hesitate to buy."
            </h5>
          </div>
        </div>
      </div>

      {/* Problems  */}
      <div className="flex flex-col col-span-4 md:col-span-6 lg:col-span-8 md:col-start-2 lg:col-start-3">
        <h3 className="h3 opacity-60">A few problems became clear</h3>
        <p className="h5">
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
              <h4 className="h4 ">Product details</h4>
            </div>
            <h5 className="h5 w-full opacity-70">
              Users couldn’t find specifications or key features. Low-quality
              images and unclear descriptions made it hard to decide whether to
              buy.
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
              Lack of visible and verified reviews left users unsure about the
              quality of products, reducing confidence in their purchases.
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
              Confusing forms, missing payment options, and hidden fees
              frustrated users and slowed the process, leading to abandoned
              carts.
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
              Without real-time updates or clear return policies, users felt
              anxious about orders and unsure if they could trust Bigstore.
            </h5>
          </div>
        </div>
      </div>

      <Image
        src="/images/work/bigstore/bigstore-img-01.webp"
        alt="screenshot of the finished product"
        width={1280}
        height={720}
        className="col-span-4 md:col-span-6 lg:col-span-8 md:col-start-2 lg:col-start-3"
      />

      {/* Solutions  */}
      <div className="flex flex-col col-span-4 md:col-span-6 lg:col-span-8 md:col-start-2 lg:col-start-3">
        <h3 className="h3 opacity-60">
          Designing solutions that actually work
        </h3>
        <p className="h5">
          Based on the insights, I focused on fixes that would reduce friction,
          increase confidence, and make shopping smoother:
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
              <h4 className="h4 ">Product details</h4>
            </div>
            <ul className="w-full list-disc list-outside pl-5 opacity-70 space-y-1">
              <li className="h5">
                Clear, scannable product descriptions highlighting key features
                and benefits.
              </li>
              <li className="h5">
                High-quality images with zoom and multiple angles to help users
                assess products.
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
                Integrated user ratings with filters for specific scores.
              </li>
              <li className="h5">
                Prominent verified reviews, including photos and videos, to
                build trust.
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
                Streamlined forms that remove unnecessary steps.
              </li>
              <li className="h5">
                Display of all fees upfront to avoid surprises.
              </li>
              <li className="h5">
                Expanded payment options, including alternative methods for
                convenience.
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
                Real-time order tracking with maps and estimated delivery dates.
              </li>
              <li className="h5">
                Simplified, transparent return policies to build confidence and
                trust.
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
