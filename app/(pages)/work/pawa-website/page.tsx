"use client";
import React from "react";
import Image from "next/image";
import Footer from "@/app/components/Footer";
import CaseImageCarousel from "@/app/components/CaseImageCarousel";

//sections
import ProjectInfo from "@/app/(pages)/work/projectInfo";
import CaseSection from "@/app/(pages)/work/caseSection";
import Divider from "@/app/components/ui/Divider";
import Hero from "@/app/(pages)/work/pawa-website/Hero";
import ImagesSection from "@/app/(pages)/work/pawa-website/ImagesSection";

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
              Overview="Redesign Bigstore's web app to streamline the shopping experience,
            fixing any issues and generating more sales."
              Challenge={`The old site didn't reflect Pawa IT's shift toward AI and expanded cloud offerings. Content was scattered, visuals outdated, and navigation failed to guide execs to key solutions.
My challenge was to redesign the site's structure and identity to position Pawa IT as a forward-looking cloud and AI partner while driving engagement through demos and events.`}
              Role="Lead Designer"
              Timeline="2 months"
              Team={`Hempstone Maroria (Project Lead)\nGerald Kamau (Lead Engineer)`}
              Impact={`• +28% weekly visits within 2 months
• 4 AI-focused events generated, plus more demo requests and AI project initiations
• Positive stakeholder and enterprise feedback on clarity and professionalism
• Improved product discoverability through redesigned mega menu and bento grids`}
            />

            <div className="flex flex-col gap-12 w-full"></div>
            <CaseSection
              title="Responsibility"
              description="I was brought into the team to lead the project end-to-end. I oversaw discovery, stakeholder analysis, competitive review, information architecture, brand system refresh, wireframing, high-fidelity design, prototyping, dev handoff and QA support."
            />

            {/* Discovery and Alignment  */}
            <CaseSection
              title="Discovery and alignment"
              description="I started by aligning product and business goals with the stakeholders, defining target personas and priority AI offerings. I paired a quick audit of site analytics with a stakeholder interview to identify high-value pages, traffic drop-off points, and immediate business KPIs. This phase set the north star metrics and boundaries for the redesign."
            >
              <div className="mt-4 flex flex-col gap-2 w-full">
                <Image
                  src="/images/work/pawa-website/stakeholders-goal-map.webp"
                  alt=""
                  width={1980}
                  height={1080}
                  className="w-full h-auto"
                />
                <p className="h5 text-center italic opacity-70">
                  Aligned business goals and KPIs with the Head of Marketing
                </p>
              </div>
            </CaseSection>

            {/* Competitive Analysis and Heuristic Eval */}
            <CaseSection
              title="Competitive & Heuristic Analysis"
              description="I reviewed 6–8 market leaders in cloud and AI and mapped common UX patterns: hero value propositions for execs, product demo flows, event funnels, and mega-menu architectures. I then ran a short heuristic review on our site to catalogue usability gaps (discoverability, CTA hierarchy, trust signals). Insights from this informed copy, IA, and the hero strategy."
            >
              <div className="mt-4 flex flex-col gap-2 w-full">
                <Image
                  src="/images/work/pawa-website/heuristic-findings.webp"
                  alt=""
                  width={1920}
                  height={1080}
                  className="w-full h-auto"
                />
                <p className="h5 text-center italic opacity-70">
                  Heuristic findings
                </p>
              </div>
            </CaseSection>

            {/* Information Architecture  */}
            <CaseSection
              title="Information architecture and Content Strategy"
              description="After noting the current IA and figuring out where to place the additional solution offerings, I reorganized the site into three primary pillars — Products, Solutions, Resources — to reduce cognitive load for  visitors and surface demos quickly. I designed a mega menu that exposes product pages, demo CTAs, and event funnels at a glance. I also developed the bento-grid approach for modular content blocks that marketing can reuse for campaigns."
            >
              <div className="mt-4 flex flex-col gap-2 w-full">
                <Image
                  src="/images/work/pawa-website/sitemap-before.webp"
                  alt=""
                  width={1920}
                  height={1080}
                  className="w-full h-auto"
                />
                <p className="h5 text-center italic opacity-70">
                  Sitemap before the redesign
                </p>
              </div>
              <div className="mt-4 flex flex-col gap-2 w-full">
                <Image
                  src="/images/work/pawa-website/sitemap-after.webp"
                  alt=""
                  width={1920}
                  height={1080}
                  className="w-full h-auto"
                />
                <p className="h5 text-center italic opacity-70">
                  Proposed sitemap for redesign.
                  <br />
                  Products, Solutions and the newer Resources are now structured
                  into their respective groups, making them easy to find and
                  reference
                </p>
              </div>
              <div className="mt-4 flex flex-col gap-2 w-full">
                <Image
                  src="/images/work/pawa-website/mega-menu-overview.webp"
                  alt=""
                  width={1920}
                  height={1080}
                  className="w-full h-auto"
                />
                <p className="h5 text-center italic opacity-70">
                  I restructured the top level pages into a neat mega menu
                  component, grouping all similar pages together
                </p>
              </div>
              <div className="mt-4 flex flex-col gap-2 w-full">
                <Image
                  src="/images/work/pawa-website/mega-menu-interaction.webp"
                  alt=""
                  width={1920}
                  height={1080}
                  className="w-full h-auto rounded-2xl"
                />
                <p className="h5 text-center italic opacity-70">
                  Early prototype of the mega menu component showing the
                  interaction and motion{" "}
                </p>
              </div>
            </CaseSection>

            <CaseSection
              title="Visual Design & Prototyping"
              description="I translated strategy into polished UI and interactive prototypes: a dynamic hero with a node animation (particles.js, translated to a React component) to capture attention, prioritized bento grids for modular storytelling, a hand-crated technical illustration system built entirely in Figma. I built interactive Framer prototypes for the main user journeys, then prepared a dev-ready handoff (component specs, design tokens, accessibility notes) and a phased implementation plan. Accessibility and responsive behavior (contrast, keyboard navigation for the mega menu, mobile-first IA) were embedded throughout the process."
            >
              <CaseImageCarousel
                images={[
                  {
                    src: "/images/work/pawa-website/homepage-before.webp",
                    alt: "Screenshot of homepage before redesign",
                  },
                  {
                    src: "/images/work/pawa-website/homepage-after.webp",
                    alt: "Screenshot of homepage after redesign",
                  },
                ]}
                caption="Homepage (before and after)"
              />
            </CaseSection>
          </div>
        </section>
      </main>

      <Footer />
    </section>
  );
};

export default BigStore;
