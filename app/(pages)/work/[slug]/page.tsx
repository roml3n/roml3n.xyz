"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Footer from "@/app/components/Footer";
import { getCaseStudyBySlug } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";
// import PortableText from "@/components/PortableText";

interface CaseStudy {
  _id: string;
  title: string;
  slug: { current: string };
  client?: string;
  projectType?: string;
  description?: string;
  challenge?: string;
  solution?: string;
  techStack?: string[];
  featuredImage?: any;
  gallery?: any[];
  liveUrl?: string;
  githubUrl?: string;
  startDate?: string;
  endDate?: string;
}

const CaseStudyPage = () => {
  const params = useParams();
  const slug = params.slug as string;
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaseStudy = async () => {
      try {
        const study = await getCaseStudyBySlug(slug);
        setCaseStudy(study);
      } catch (error) {
        console.error('Error fetching case study:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchCaseStudy();
    }
  }, [slug]);

  if (loading) {
    return (
      <section className="m-auto items-center w-full gap-16">
        <main className="flex flex-col mt-10 md:mt-24 gap-16 items-center">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mainblue mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading case study...</p>
          </div>
        </main>
      </section>
    );
  }

  if (!caseStudy) {
    return (
      <section className="m-auto items-center w-full gap-16">
        <main className="flex flex-col mt-10 md:mt-24 gap-16 items-center">
          <div className="text-center py-8">
            <h1 className="h1 mb-4">Case Study Not Found</h1>
            <p className="text-gray-600">The case study you're looking for doesn't exist.</p>
          </div>
        </main>
      </section>
    );
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <section className="m-auto items-center w-full gap-16">
      <main className="flex flex-col mt-10 md:mt-24 gap-16 items-center">
        {/* Header */}
        <div className="w-full max-w-4xl">
          <h1 className="h1 mb-6">{caseStudy.title}</h1>
          
          {caseStudy.client && (
            <p className="text-xl text-gray-600 mb-4">
              <span className="font-semibold">Client:</span> {caseStudy.client}
            </p>
          )}
          
          {caseStudy.projectType && (
            <p className="text-lg text-gray-600 mb-6">
              <span className="font-semibold">Project Type:</span> {caseStudy.projectType}
            </p>
          )}

          {caseStudy.description && (
            <p className="text-lg leading-relaxed mb-8">{caseStudy.description}</p>
          )}
        </div>

        {/* Featured Image */}
        {caseStudy.featuredImage && (
          <div className="w-full max-w-6xl">
            <img
              src={urlFor(caseStudy.featuredImage).url()}
              alt={caseStudy.title}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        )}

        {/* Project Details */}
        <div className="w-full max-w-4xl space-y-12">
          {caseStudy.challenge && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Challenge</h2>
              <p className="text-lg leading-relaxed">{caseStudy.challenge}</p>
            </div>
          )}

          {caseStudy.solution && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Solution</h2>
              <p className="text-lg leading-relaxed">{caseStudy.solution}</p>
            </div>
          )}

          {/* Tech Stack */}
          {caseStudy.techStack && caseStudy.techStack.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {caseStudy.techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Project Timeline */}
          {(caseStudy.startDate || caseStudy.endDate) && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Timeline</h2>
              <div className="flex gap-4 text-lg">
                {caseStudy.startDate && (
                  <span>
                    <span className="font-semibold">Start:</span> {formatDate(caseStudy.startDate)}
                  </span>
                )}
                {caseStudy.endDate && (
                  <span>
                    <span className="font-semibold">End:</span> {formatDate(caseStudy.endDate)}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Project Links */}
          {(caseStudy.liveUrl || caseStudy.githubUrl) && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Links</h2>
              <div className="flex gap-4">
                {caseStudy.liveUrl && (
                  <a
                    href={caseStudy.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-mainblue text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View Live Project
                  </a>
                )}
                {caseStudy.githubUrl && (
                  <a
                    href={caseStudy.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    View Source Code
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Image Gallery */}
        {caseStudy.gallery && caseStudy.gallery.length > 0 && (
          <div className="w-full max-w-6xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Project Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {caseStudy.gallery.map((image, index) => (
                <Image
                  key={index}
                  src={urlFor(image).url()}
                  fill
                  alt={`${caseStudy.title} - Image ${index + 1}`}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </section>
  );
};

export default CaseStudyPage;
