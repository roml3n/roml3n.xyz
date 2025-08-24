"use client";
import React, { useEffect, useState } from "react";
import Footer from "@/app/components/Footer";
import { ProjectCard } from "@/app/components/ProjectCard";
import { ComingSoonCard } from "@/app/components/ComingSoonCard";
import { getAllCaseStudies } from "@/lib/sanity";

interface CaseStudy {
  _id: string;
  title: string;
  description: string;
  slug: { current: string };
  featuredImage?: any;
  client?: string;
  projectType?: string;
  featured?: boolean;
}

const Work = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const studies = await getAllCaseStudies();
        setCaseStudies(studies);
      } catch (error) {
        console.error("Error fetching case studies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudies();
  }, []);

  // Generate background colors for project cards
  const bgColors = [
    "bg-[#F2E7E6]",
    "bg-[#E8F2EF]",
    "bg-[#E8ECF1]",
    "bg-[#F0F2F5]",
    "bg-[#F5F0F2]",
  ];

  return (
    <section className="m-auto items-center w-full gap-16">
      <main className="flex flex-col mt-10 md:mt-24 gap-16 items-center">
        <h1 className="h1 w-full">Work</h1>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mainblue mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading projects...</p>
          </div>
        ) : caseStudies.length > 0 ? (
          <div className="relative justify-center self-center w-full flex flex-col md:flex-row gap-4">
            <div className="p-0 md:pb-9 flex flex-col gap-4">
              {caseStudies
                .filter((_, index) => index % 2 === 0)
                .map((study, index) => (
                  <ProjectCard
                    key={study._id}
                    name={study.title}
                    description={study.description}
                    imageSrc={
                      study.featuredImage
                        ? `/api/sanity-image?url=${encodeURIComponent(study.featuredImage.asset._ref)}`
                        : "/images/projectCard/default-screen.png"
                    }
                    href={`/work/${study.slug.current}`}
                    bgColor={bgColors[index % bgColors.length]}
                  />
                ))}
            </div>

            <div className="p-0 md:pt-9 flex flex-col gap-4">
              {caseStudies
                .filter((_, index) => index % 2 === 1)
                .map((study, index) => (
                  <ProjectCard
                    key={study._id}
                    name={study.title}
                    description={study.description}
                    imageSrc={
                      study.featuredImage
                        ? `/api/sanity-image?url=${encodeURIComponent(study.featuredImage.asset._ref)}`
                        : "/images/projectCard/default-screen.png"
                    }
                    href={`/work/${study.slug.current}`}
                    bgColor={bgColors[(index + 1) % bgColors.length]}
                  />
                ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">No case studies found.</p>
          </div>
        )}

        {/* Keep the coming soon card for now */}
        <div className="flex justify-center">
          <ComingSoonCard
            name="Stockpicha"
            description="Branding a creative marketplace"
          />
        </div>
      </main>

      <Footer />
    </section>
  );
};

export default Work;
