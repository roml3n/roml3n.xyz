"use client";
import React from "react";
import Image from "next/image";
import Footer from "@/app/components/Footer";
import CaseImageCarousel from "@/app/components/CaseImageCarousel";

//sections
import ProjectInfo from "@/app/(pages)/work/projectInfo";
import CaseSection from "@/app/(pages)/work/caseSection";
import Hero from "@/app/(pages)/work/waya-business/Hero";

const BigStore = () => {
  return (
    <section className="m-auto items-center w-full gap-16">
      <main className="flex flex-col mt-10 md:mt-24 items-center">
        <Hero />

        {/* Case Section */}
        <section className="relative flex flex-col gap-6 w-screen bg-fullwhite py-12 items-center justify-center">
          {/* 80% Wrapper */}
          <div className="wrapper w-[90%] md:w-[80%] max-w-screen-lg mx-auto flex flex-col gap-16 mb-12">
            <ProjectInfo
              Overview="Waya, a US-based neobank primarily focused on providing financial inclusion to new Americans and immigrants, faced a challenge where a growing number of immigrant-owned businesses needed their financial needs met, especially with the increasing documentation hell that is business bank account creation."
              Challenge={`I was brought in to lead the design of the end-to-end experience—from account creation and setup, to ordering a virtual or physical debit card, to (eventually) making the first deposit. `}
              Role={`Solo Designer
                Design System
                Documentation`}
              Timeline="Jul – Sep '23"
              Team={`Solo`}
            />

            <div className="flex flex-col gap-12 w-full"></div>

            <div className="flex flex-col items-center rounded-md p-12 gap-3 bg-[#EFEFEF]">
              <div className="overflow-hidden w-full h-fit transition-[height] duration-500 ease-in-out">
                <div className="flex flex-col gap-4 items-center w-full">
                  <Image
                    src="/images/work/waya-business/log-in.webp"
                    alt="Screenshot of log in page"
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                  />
                  <Image
                    src="/images/work/waya-business/2fa-waya-app.webp"
                    alt="Screenshot of 2fa page"
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                  />
                  <p className="h5 text-center italic opacity-70">
                    Logging in using your Waya Mobile App as the secondary auth
                    method kept the flow simple and intuitive
                  </p>
                </div>
              </div>
            </div>

            <CaseImageCarousel
              images={[
                {
                  src: "/images/work/waya-business/home-view.webp",
                  alt: "Screenshot of home view page",
                },
                {
                  src: "/images/work/waya-business/transactions.webp",
                  alt: "Screenshot of transactions page",
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
                  {
                    src: "/images/work/waya-business/use-card-before-it-gets-there.webp",
                    alt: "Screenshot of cards page",
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
                  {
                    src: "/images/work/waya-business/order-card-team-member.webp",
                    alt: "Screenshot of order card for team member page",
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
                  {
                    src: "/images/work/waya-business/add-funds-account.webp",
                    alt: "Screenshot of add funds to account page",
                  },
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
                    src: "/images/work/waya-business/download-statement.webp",
                    alt: "Screenshot of statement export page",
                  },
                  {
                    src: "/images/work/waya-business/team-roles.webp",
                    alt: "Screenshot of team roles page",
                  },
                ]}
                caption="Snippets of various pages in the account settings"
              />
            </CaseSection>
            <CaseSection
              title="Need more info about this project?"
              description="Please reach out for a detailed walkthrough of this project, including key wins, challenges and lessons learned."
            />
          </div>
        </section>
      </main>

      <Footer />
    </section>
  );
};

export default BigStore;
