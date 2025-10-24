import React, { lazy } from "react";
import { LazyWrapper } from "@/app/components/LazyWrapper";
import { useIntersectionObserver } from "@/app/hooks/useIntersectionObserver";

// Lazy load components - keep original names
const CompanyWork = lazy(() => import("@/app/components/CompanyWork").then(module => ({ default: module.CompanyWork })));
const ProjectCard = lazy(() => import("@/app/components/ProjectCard").then(module => ({ default: module.ProjectCard })));

const WorkSection = () => {
  const { ref, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "200px",
  });

  return (
    <div
      ref={ref}
      className="w-full md:w-[110%] relative justify-center self-center flex flex-col gap-8"
    >
      {hasIntersected ? (
        <>
          {/* Company/Client Project Cards */}
          <LazyWrapper>
            <CompanyWork
              // Pawa IT
              companyName="Pawa IT"
              companyLogo="/images/icons/Pawa.svg"
              logoBg="bg-[#262261]"
              companyLogoAlt="Pawa IT Solutions logo"
              period="2024 - present"
              websiteName="pawait.africa"
              websiteLink="https://pawait.africa"
              className="bg-white"
            >
              <ProjectCard
                name="Marketing Website Redesign"
                description="Redesigning the marketing website to reflect new focus on artificial intelligence and data."
                tag="Product Design"
                image="/images/projectCard/website-img.webp"
                href="/work/pawa-website"
                className="col-span-1 bg-[#EAE3F8] "
              />
              <ProjectCard
                name="Brand Refresh"
                description="Expanding the Pawa brand to be more consistent across digital communications"
                tag="Brand Design"
                image="/images/projectCard/konversations-img.webp"
                href="/work/pawa-brand"
                className="col-span-1 bg-[#E2EBEE]"
              />
              <ProjectCard
                name="Konversations"
                description="Turning everyday customer interactions into detailed, highly actionable AI-enhanced insights"
                tag="Product Design"
                image="/images/projectCard/konversations-group-img.webp"
                href="/work/konversations"
                className="col-span-2 bg-[#DCDBEF]"
              />
            </CompanyWork>
          </LazyWrapper>

          <LazyWrapper>
            <CompanyWork
              // Waya
              companyName="Waya"
              companyLogo="/images/icons/Waya.svg"
              logoBg="bg-gradient-to-br from-[#0BB8E2] to-[#07B7B1]"
              companyLogoAlt="Waya logo"
              period="2023 - 2024"
              websiteName="getwaya.com"
              websiteLink="https://getwaya.com"
              className="bg-[#D9DEE3]"
            >
              <ProjectCard
                name="Non-SSN sign up"
                description="Enhancing financial inclusion for immigrants and new Americans"
                tag="Product Design"
                image="/images/projectCard/waya-ssn-img.webp"
                href="/work/waya-ssn"
                className="col-span-1 bg-gradient-to-b from-[#EFF5FA] to-[#C0C6CC]"
              />
              <ProjectCard
                name="Waya Business for Web"
                description="Crafting a new financial experience for Waya Business accounts"
                tag="Product Design"
                image="/images/projectCard/waya-business-img.webp"
                href="/work/waya-business"
                className="col-span-1 bg-gradient-to-b from-[#D7D7D7] to-[#F4F4F4]"
              />
            </CompanyWork>
          </LazyWrapper>

          <LazyWrapper>
            <CompanyWork
              // CB Group
              companyName="The CB Group"
              logoBg="bg-[#ffffff]"
              companyLogo="/images/icons/CB.svg"
              companyLogoAlt="Creative Brands logo"
              period="2023 - 2024"
              websiteName="thecbgroup.io"
              websiteLink="https://thecbgroup.io"
              className="bg-[#121212]"
              textColor="light"
            >
              <ProjectCard
                name="Bigstore"
                description="Redesigning e-commerce to boost loyalty, sales, and satisfaction"
                tag="Product Design"
                image="/images/projectCard/bigstore-img.webp"
                href="/work/bigstore"
                className="col-span-1 bg-[#C2D5D3]"
              />
              <ProjectCard
                name="Tucheze"
                description="Crafting a high-stakes experience for sports betting enthusiasts"
                tag="Visual Design"
                image="/images/projectCard/tucheze-img-1.webp"
                href="/work/tucheze"
                className="col-span-1 bg-gradient-to-b from-[#C4CFD8]/40 to-[#C4CFD8]"
              />
            </CompanyWork>
          </LazyWrapper>
        </>
      ) : (
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mainblue"></div>
        </div>
      )}
    </div>
  );
};

export default WorkSection;
