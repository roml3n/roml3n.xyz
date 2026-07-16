import Image from "next/image";
import Button from "@/app/components/Button";
import CaseImageCarousel from "@/app/components/CaseImageCarousel";
import CaseSection from "@/app/(pages)/work/caseSection";
import MoreProjectsSection from "@/app/(pages)/work/MoreProjectsSection";

const BigStore = () => {
  return (
    <section className="content-start w-full min-h-[calc(100dvh-23rem)] mt-24 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 grid-rows-auto gap-x-4 md:gap-x-6 gap-y-9 md:gap-y-16 relative justify-center self-center">
      <div className="row-span-1 col-span-4 md:col-span-8 lg:col-span-6  flex flex-col gap-1">
        <h2 className="h2"> Repositioning Pawa IT for the AI era </h2>
        <h2 className="h2 opacity-40"> [ interface design ] </h2>
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
        <div className="w-full flex justify-between"><h5 className="h5 font-medium opacity-40 whitespace-pre-line">
          {" "}
          {`Pawa IT \n [ 07.2024 ]`}{" "}
        </h5>
        <Button
          variant="primary"
          label="See live"
          url="https://pawait.africa/"
        /></div>
        
      </div>

      {/* Metadata */}
      <div className="flex justify-between w-full col-span-4 md:col-span-6 lg:col-span-8 md:col-start-2 lg:col-start-3">
        <div className="flex flex-col gap-1">
          <h3 className="h3 ">Role</h3>
          <h5 className="h5 whitespace-preline">
            Solo Designer
            <br /> Design System
            <br /> Documentation
          </h5>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="h3 ">Team</h3>
          <h5 className="h5">Solo</h5>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="h3 ">Timeline</h3>
          <h5 className="h5">Aug &mdash; Nov 24 (3 months)</h5>
        </div>
      </div>

      {/* Intro */}
      <div className="w-full flex flex-col gap-4 col-span-4 md:col-span-6 lg:col-span-8 md:col-start-2 lg:col-start-3">
        <div className="flex flex-col">
          <h3 className="h3 ">Overview</h3>
          <h5 className="h5 whitespace-preline">
            As Pawa IT expanded beyond cloud services into AI and machine
            learning, the website no longer reflected the company&apos;s
            direction. The messaging felt dated, navigation buried high-value
            solutions, and the experience didn&apos;t speak to the C-level
            decision-makers driving digital transformation.
            <br />
            <br />
            The goal wasn&apos;t just a visual refresh. It was a strategic
            repositioning, aligning the digital presence with the company&apos;s
            evolution into an AI-first cloud partner.
          </h5>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="h3 ">Challenge</h3>
          <h5 className="h5 whitespace-preline">
            The existing site didn&apos;t communicate Pawa IT&apos;s shift
            toward AI. Content was scattered, visuals felt outdated, and
            navigation failed to guide executives toward demos, events, and core
            solutions.
            <br />
            <br />
            My challenge was to restructure the site architecture, modernize the
            brand system, and create a digital experience that positioned Pawa
            IT as a forward-looking AI and cloud partner, while increasing
            engagement across demos and events.
          </h5>
        </div>
        <div className="flex flex-col gap-1 ">
          <h3 className="h3 ">Impact</h3>
          <div className="ul list-disc list-inside">
            <li className="h5 whitespace-preline">
              +28% weekly visits within two months
            </li>
            <li className="h5 whitespace-preline">
              4 AI-focused events generated, alongside increased demo requests
              and AI project inquiries
            </li>
            <li className="h5 whitespace-preline">
              Positive enterprise and stakeholder feedback on clarity and
              professionalism
            </li>
            <li className="h5 whitespace-preline">
              Improved product discoverability through a redesigned mega menu
              and modular bento grid system
            </li>
          </div>
        </div>
      </div>

      <CaseSection
        title="My role"
        description="I led the redesign end-to-end. This included discovery, stakeholder alignment, competitive analysis, information architecture, brand system refresh, wireframing, high-fidelity UI, prototyping, developer handoff, and QA support."
      />

      {/* Discovery and Alignment */}
      <CaseSection
        title="Aligning business and product direction"
        description={`I began by aligning product and marketing leadership around clear goals, priority AI offerings, and target personas.\n
I paired stakeholder interviews with a lightweight analytics audit to identify:
• High-value pages
• Traffic drop-off points
• Conversion bottlenecks
• Core KPIs for demos and events \n
This phase established clear north star metrics and defined the boundaries for the redesign.`}
      >
        <div className="mt-4 flex flex-col gap-2 w-full">
          <Image
            src="/images/work/pawa-website/stakeholders-goal-map.webp"
            alt=""
            width={1980}
            height={1080}
            className="w-full h-auto col-span-4 md:col-span-6 lg:col-span-12"
          />
          <p className="h5 text-center italic opacity-70">
            Aligned business goals and KPIs with the Head of Marketing
          </p>
        </div>
      </CaseSection>

      {/* Competitive Analysis and Heuristic Eval */}
      <CaseSection
        title="Learning from the market"
        description={`I analyzed 6–8 leading cloud and AI companies to identify common patterns: \n
• Executive-focused value propositions in hero sections
• Clear demo pathways
• Event-driven acquisition funnels
• Scalable mega-menu architectures \n
I then conducted a heuristic review of the existing site, cataloguing gaps in discoverability, CTA hierarchy, and trust signals. These findings directly informed the new IA, hero strategy, and content hierarchy.`}
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
        title="Restructuring the information architecture"
        description={`The old structure buried solutions and scattered resources. I reorganized the site into three clear pillars:\n
• Products
• Solutions
• Resources
This reduced cognitive load and surfaced demos and events more prominently. \n
I then designed a scalable mega menu that exposed key offerings and CTAs at a glance, and introduced a modular bento grid system that marketing could reuse for campaigns and landing pages. The goal was clarity at scale.`}
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
            src="/images/work/pawa-website/mega-menu-interaction.webp"
            alt=""
            width={1920}
            height={1080}
            className="w-full h-auto rounded-2xl"
          />
          <p className="h5 text-center italic opacity-70">
            Early prototype of the mega menu component showing the interaction
            and motion{" "} <br /> I restructured the top level pages into a neat mega menu component,
            grouping all similar pages together
          </p>
        </div>
      </CaseSection>

      <CaseSection
        title="Visual system & prototyping"
        description={`I translated strategy into a modern, implementation-ready UI:
• A dynamic hero featuring node animation to visually reinforce AI positioning
• A custom illustration and iconography system built entirely in Figma
• Modular bento components for storytelling and campaign flexibility \n
Interactive prototypes were built to validate user journeys before handoff. I delivered component specs, design tokens, accessibility documentation, and a phased rollout plan to engineering. \n
Accessibility and responsiveness were embedded throughout, including contrast compliance, keyboard navigation for the mega menu, and mobile-first behavior.`}
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
          ]}
          caption="Snapshot of custom illustrations in play within the brand system"
        />
      </CaseSection>
      <CaseSection >
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
              src: "/images/work/pawa-website/chromebooks.webp",
              alt: "Screenshot of Google Chromebooks webpage",
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
            {
              src: "/images/work/pawa-website/404.webp",
              alt: "Screenshot of 404 page",
            },
          ]}
          caption="section highlights"
        />
       
      </CaseSection>
      <CaseSection
        title="🚸 Light Usability Validation"
        description={`Before launch, I ran quick internal usability sessions and stakeholder walkthroughs focused on:\n
• Mega menu clarity
• Event funnel friction
• Hero messaging effectiveness\n
Small refinements had outsized impact: simplified labels, tighter CTA copy, and reduced form friction. Post-launch, I monitored analytics and defined follow-up A/B tests to validate assumptions.`}
      />
      <CaseSection
        title="😎 What I'm Most Proud Of"
        description={`• Delivering a strategic repositioning project solo, from brand refresh to implementation-ready system
• Designing a navigation system that balances breadth with immediacy
• Creating reusable modular assets that empower marketing and sales beyond the core site`}
      />

      <MoreProjectsSection currentHref="/work/pawa-website" />
    </section>
  );
};

export default BigStore;
