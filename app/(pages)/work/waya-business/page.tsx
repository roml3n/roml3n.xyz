"use client";
import Image from "next/image";
import Footer from "@/app/components/Footer";
import CaseImageCarousel from "@/app/components/CaseImageCarousel";

//sections
import CaseSection from "@/app/(pages)/work/caseSection";
import MoreProjectsSection from "@/app/(pages)/work/MoreProjectsSection";

const WayaBusiness = () => {
  return (
    <section className="content-start w-full min-h-[calc(100dvh-23rem)] mt-24 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 grid-rows-auto gap-x-4 md:gap-x-6 gap-y-9 md:gap-y-16 relative justify-center self-center">
      <div className="row-span-1 col-span-4 md:col-span-8 lg:col-span-6  flex flex-col gap-1">
        <h2 className="h2">
          {" "}
          Empowering immigrant founders to bank, build, and grow{" "}
        </h2>
        <h2 className="h2 opacity-40"> [ product design ] </h2>
      </div>

      {/* Hero  */}
      <div className="flex flex-col col-span-4 md:col-span-8 lg:col-span-12">
        <Image
          src="/images/work/waya-business/hero-img.webp"
          alt="A collage of screenshots from the Waya Business web application"
          width={1080}
          height={720}
          className="w-[80%] self-center mb-4"
        />
        <h5 className="h5 font-medium opacity-40 whitespace-pre-line">
          {" "}
          {`Waya \n [ 07.2023 ]`}
        </h5>
      </div>

      {/* Intro  */}
      <div className="flex flex-col gap-6 col-span-4 md:col-span-6 lg:col-span-8 md:col-start-2 lg:col-start-3">
        <div className="flex flex-col gap-1 w-full">
          <h3 className="h3 opacity-60">Overview</h3>
          <h5 className="h5 ">
            Waya, a US-based neobank primarily focused on providing financial
            inclusion to new Americans and immigrants, faced a challenge where a
            growing number of immigrant-owned businesses needed their financial
            needs met, especially with the increasing documentation hell that is
            business bank account creation.
          </h5>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <h3 className="h3 opacity-60">Challenge</h3>
          <h5 className="h5">
            I was brought in to lead the design of the end-to-end
            experience—from account creation and setup, to ordering a virtual or
            physical debit card, to (eventually) making the first deposit.
          </h5>
        </div>
      </div>

      <div className="flex flex-col gap-12 w-full col-span-4 md:col-span-8 lg:col-span-12">
        <CaseImageCarousel
          images={[
            {
              src: "/images/work/waya-business/log-in.webp",
              alt: "Screenshot of log in page",
            },
            {
              src: "/images/work/waya-business/2fa-waya-app.webp",
              alt: "Screenshot of 2fa page",
            },
          ]}
          caption=" Logging in using your Waya Mobile App as the secondary auth
                method kept the flow simple and intuitive"
        />
        <CaseImageCarousel
          images={[
            {
              src: "/images/work/waya-business/home-view.webp",
              alt: "Screenshot of home view page",
            },
            {
              src: "/images/work/waya-business/transaction-details.webp",
              alt: "Screenshot of transaction details page",
            },
          ]}
          caption="The first few pages you interact with as an account holder, with a nice overview of all your accounts, transactions and cards."
        />
        <CaseSection
          description={`The card flow had to be nailed perfectly, as this was a huge success metric identified in our initial discovery sessions. We added support for both physical and virtual cards, secured through one of our banking partners, Mastercard™.\n
Ordering a card should feel frictionless and next to natural. As such, we decided to keep the active cards in the same page so they can be viewed on the go, with the associated user shown to the right.\n
The entry point for ordering a new card was neatly tucked away in the top right, with an initial entry point as part of the final onboarding flow (because of the sensitive nature of this flow, it is not shown here, please reach out for more details).`}
        >
          <CaseImageCarousel
            images={[
              {
                src: "/images/work/waya-business/cards.webp",
                alt: "Screenshot of cards page",
              },
              {
                src: "/images/work/waya-business/cards-detail.webp",
                alt: "Screenshot of card details page",
              },
            ]}
            caption="To keep the user in flow, we added a way to use your Waya card even *before* it gets delivered to you."
          />
        </CaseSection>
        <CaseSection description="Teams were vital to the app, so we built a simple, but robust experience for all team needs. Ordering cards, assigning them to checking accounts, assigning them to team members with spending limits were all added to make the experience as smooth and intuitive as possible.">
          <CaseImageCarousel
            images={[
              {
                src: "/images/work/waya-business/order-card-order.webp",
                alt: "Screenshot of the card ordering page",
              },
              {
                src: "/images/work/waya-business/order-card-you.webp",
                alt: "Screenshot of order card for yourself page",
              },
            ]}
            caption="You could order a physical card for yourself or any member of your team"
          />
          <CaseImageCarousel
            images={[
              {
                src: "/images/work/waya-business/add-funds.webp",
                alt: "Screenshot of deposit options",
              },
              // {
              //   src: "/images/work/waya-business/add-funds-account.webp",
              //   alt: "Screenshot of add funds to account page",
              // },
              {
                src: "/images/work/waya-business/add-funds-done.webp",
                alt: "Screenshot of success state",
              },
            ]}
            caption="The deposit experience was just as straightforward"
          />
          <CaseImageCarousel
            images={[
              {
                src: "/images/work/waya-business/send-money.webp",
                alt: "Screenshot of send money page",
              },
              {
                src: "/images/work/waya-business/send-money-waya2waya.webp",
                alt: "Screenshot of waya to waya transfer",
              },
              {
                src: "/images/work/waya-business/send-money-intl-transfer-summary.webp",
                alt: "Screenshot of international transfer summary",
              },
              {
                src: "/images/work/waya-business/send-money-success.webp",
                alt: "Screenshot of successful transfer",
              },
            ]}
            caption="Catering for numerous channels for sending money, whether locally, or abroad"
          />
          <CaseImageCarousel
            images={[
              {
                src: "/images/work/waya-business/settings-business-details.webp",
                alt: "Screenshot of business details settings",
              },
              {
                src: "/images/work/waya-business/settings.webp",
                alt: "Screenshot of settings",
              },
              {
                src: "/images/work/waya-business/waya-plaid-connection.webp",
                alt: "Screenshot showing Waya uses Plaid to securely connect bank accounts",
              },
              {
                src: "/images/work/waya-business/team-roles.webp",
                alt: "Screenshot of team roles page",
              },
            ]}
            caption="Snippets of various pages in the account settings"
          />
        </CaseSection>
      </div>
      <MoreProjectsSection currentHref="/work/waya-business" />
    </section>
  );
};

export default WayaBusiness;
