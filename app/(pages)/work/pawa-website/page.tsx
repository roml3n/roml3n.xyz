import Image from "next/image";
import Button from "@/app/components/Button";
import CaseImageCarousel from "@/app/components/CaseImageCarousel";
import CaseSection from "@/app/(pages)/work/caseSection";
import MoreProjectsSection from "@/app/(pages)/work/MoreProjectsSection";

const BigStore = () => {
  return (
    <section className="content-start w-full min-h-[calc(100dvh-23rem)] mt-24 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 grid-rows-auto gap-x-4 md:gap-x-6 gap-y-9 md:gap-y-16 relative justify-center self-center">
      <div className="row-span-1 col-span-4 md:col-span-8 lg:col-span-6  flex flex-col gap-1">
        <h2 className="h2">
          {" "}
          Improving web visits by 28% through a marketing website redesign{" "}
        </h2>
        <h2 className="h2 opacity-40"> [ product design ] </h2>
      </div>

      {/* Hero  */}
      <div className="flex flex-col col-span-4 md:col-span-8 lg:col-span-12">
        <Image
          src="/images/work/pawa-website/pawa-hero.webp"
          alt="A laptop mockup showing the Pawa IT website"
          width={1280}
          height={720}
          className="w-full mb-4"
        />
        <h5 className="h5 font-medium opacity-40 whitespace-pre-line">
          {" "}
          {`Pawa IT \n [ 07.2024 ]`}{" "}
        </h5>
      </div>

      {/* Intro  – Left */}
      <div className="flex flex-col gap-16 col-span-3">
        <Button
          variant="primary"
          label="See live"
          url="https://pawait.africa/"
        />
        <div className="flex flex-col gap-1 w-full">
          <h3 className="h3 ">Role</h3>
          <h5 className="h5 whitespace-preline">
            Solo Designer
            <br /> Design System
            <br /> Documentation
          </h5>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <h3 className="h3 ">Team</h3>
          <h5 className="h5">Solo</h5>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <h3 className="h3 ">Timeline</h3>
          <h5 className="h5">Aug – Nov ‘24 (3 months)</h5>
        </div>
      </div>

      {/* Intro  – Right */}
      <div className="flex flex-col gap-12 h5 lg:col-start-5 col-span-4 md:col-span-8">
        <div className="flex flex-col">
          <h3 className="h3 ">Overview</h3>
          <h5 className="h5 whitespace-preline">
            Pawa IT, a leading Google Cloud Partner, was expanding into AI and
            machine learning solutions. The company needed a site that reflected
            this evolution and spoke directly to C-level decision-makers driving
            digital transformation.
          </h5>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="h3 ">Challenge</h3>
          <h5 className="h5 whitespace-preline">
            The old site didn’t reflect Pawa IT’s shift toward AI and expanded
            cloud offerings. Content was scattered, visuals outdated, and
            navigation failed to guide execs to key solutions. My challenge was
            to redesign the site’s structure and identity to position Pawa IT as
            a forward-looking cloud and AI partner while driving engagement
            through demos and events.{" "}
          </h5>
        </div>
        <div className="flex flex-col gap-1 ">
          <h3 className="h3 ">Impact</h3>
          <div className="ul list-disc list-inside">
            <li className="h5 whitespace-preline">
              +28% weekly visits within 2 months
            </li>
            <li className="h5 whitespace-preline">
              4 AI-focused events generated, plus more demo requests and AI
              project initiations
            </li>
            <li className="h5 whitespace-preline">
              Positive stakeholder and enterprise feedback on clarity and
              professionalism
            </li>
            <li className="h5 whitespace-preline">
              Improved product discoverability through redesigned mega menu and
              bento grids
            </li>
          </div>
        </div>
      </div>

      <CaseSection
        title="Responsibility"
        description="I was brought into the team to lead the project end-to-end. I oversaw discovery, stakeholder analysis, competitive review, information architecture, brand system refresh, wireframing, high-fidelity design, prototyping, dev handoff and QA support."
      />

      {/* Discovery and Alignment */}
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
          <p className="h5 text-center italic opacity-70">Heuristic findings</p>
        </div>
      </CaseSection>

      {/* Information Architecture */}
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
            Products, Solutions and the newer Resources are now structured into
            their respective groups, making them easy to find and reference
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
            I restructured the top level pages into a neat mega menu component,
            grouping all similar pages together
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
            Early prototype of the mega menu component showing the interaction
            and motion{" "}
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
      <CaseSection description="I designed and built comprehensive iconography and illustration systems from scratch that would tie in well to the look and feel we were going for.">
        <CaseImageCarousel
          images={[
            {
              src: "/images/work/pawa-website/enhance-learning-collab.webp",
              alt: "Screenshot of custom illustrations and icons",
            },
            {
              src: "/images/work/pawa-website/why-work-w-gws.webp",
              alt: "Screenshot of custom illustrations and icons",
            },
            {
              src: "/images/work/pawa-website/how-different.webp",
              alt: "Screenshot of custom illustrations and icons",
            },
            {
              src: "/images/work/pawa-website/bdr.webp",
              alt: "Screenshot of custom illustrations and icons",
            },
            {
              src: "/images/work/pawa-website/ai-next-leap.webp",
              alt: "Screenshot of custom illustrations and icons",
            },
          ]}
          caption="Snapshot of custom illustrations in play within the brand system"
        />
      </CaseSection>
      <CaseSection title="Final UI Screenshots">
        <CaseImageCarousel
          images={[
            {
              src: "/images/work/pawa-website/mobile-workforce.webp",
              alt: "Screenshot of mobile device management webpage",
            },
            {
              src: "/images/work/pawa-website/gws-for-business.webp",
              alt: "Screenshot of Google Workspace for Business webpage",
            },
            {
              src: "/images/work/pawa-website/build-custom-apps.webp",
              alt: "Screenshot of Google AppSheet webpage",
            },
            {
              src: "/images/work/pawa-website/chromebooks.webp",
              alt: "Screenshot of Google Chromebooks webpage",
            },
            {
              src: "/images/work/pawa-website/chrome-os.webp",
              alt: "Screenshot of Google ChromeOS webpage",
            },
            {
              src: "/images/work/pawa-website/android-enterprise.webp",
              alt: "Screenshot of Android Enterprise webpage",
            },
            {
              src: "/images/work/pawa-website/about-timeline.webp",
              alt: "Screenshot of About page showing the interactive timeline component",
            },
          ]}
          caption="dynamism and interactivity so that hero sections don't feel boring"
        />
        <CaseImageCarousel
          images={[
            {
              src: "/images/work/pawa-website/solutions-around-your-needs.webp",
              alt: "Screenshot of solutions section",
            },
            {
              src: "/images/work/pawa-website/testimonials.webp",
              alt: "Screenshot of testimonials section",
            },
            {
              src: "/images/work/pawa-website/footer.webp",
              alt: "Screenshot of footer section",
            },
          ]}
          caption="section highlights"
        />
        <CaseImageCarousel
          images={[
            {
              src: "/images/work/pawa-website/pricing-1.webp",
              alt: "Screenshot of pricing section",
            },
            {
              src: "/images/work/pawa-website/pricing-2.webp",
              alt: "Screenshot of pricing section",
            },
          ]}
          caption="solution and services pricing cards"
        />
        <CaseImageCarousel
          images={[
            {
              src: "/images/work/pawa-website/404.webp",
              alt: "Screenshot of 404 page",
            },
          ]}
          caption="easily find your way back if lost"
        />
      </CaseSection>
      <CaseSection
        title="🚸 Light Usability Validation"
        description="Before launch I conducted quick internal usability sessions and stakeholder walkthroughs, focusing on the mega menu, event flow, and hero message clarity. Iterations were small but impactful — simplifying menu labels, tightening CTA copy, and reducing friction in the event forms. Post-launch I monitored analytics to validate assumptions and prioritized follow-up A/B tests."
      />
      <CaseSection
        title="😎 What I'm Most Proud Of"
        description={`• Delivering a strategic site redesign solo, from brand refresh to implementation-ready specs
              • Crafting a navigation system that balances breadth with immediacy
              • Designing reusable modular assets for marketing and sales campaigns`}
      />

      <MoreProjectsSection currentHref="/work/pawa-website" />
    </section>
  );
};

export default BigStore;
