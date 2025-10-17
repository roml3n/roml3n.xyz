"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Footer from "@/app/components/Footer";
import { getBlogBySlug } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";
import PortableText from "@/components/PortableText";
import { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";

interface SanityImageAsset {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
}

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  featuredImage?: SanityImageAsset;
  content?: PortableTextBlock[];
  tags?: string[];
}

const BlogPostPage = () => {
  const params = useParams();
  const slug = params.slug as string;
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const post = await getBlogBySlug(slug);
        setBlogPost(post);
      } catch (error) {
        console.error('Error fetching blog post:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlogPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <section className="m-auto items-center w-full gap-16">
        <main className="flex flex-col mt-10 md:mt-24 gap-16 items-center">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mainblue mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading post...</p>
          </div>
        </main>
      </section>
    );
  }

  if (!blogPost) {
    return (
      <section className="m-auto items-center w-full gap-16">
        <main className="flex flex-col mt-10 md:mt-24 gap-16 items-center">
          <div className="text-center py-8">
            <h1 className="h1 mb-4">Blog Post Not Found</h1>
            <p className="text-gray-600">The blog post you&apos;re looking for doesn&apos;t exist.</p>
          </div>
        </main>
      </section>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="mx-auto items-center w-full gap-16">
      <main className="flex flex-col mt-10 md:mt-24 gap-16 items-center">
        {/* Header */}
        <div className="w-full max-w-4xl">
          <h1 className="h1 mb-6">{blogPost.title}</h1>
          
          <div className="flex items-center gap-4 text-gray-600 mb-6">
            <time dateTime={blogPost.publishedAt}>
              {formatDate(blogPost.publishedAt)}
            </time>
            
            {blogPost.tags && blogPost.tags.length > 0 && (
              <div className="flex gap-2">
                {blogPost.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {blogPost.excerpt && (
            <p className="text-xl text-gray-600 leading-relaxed mb-8 italic">
              {blogPost.excerpt}
            </p>
          )}
        </div>

        {/* Featured Image */}
        {blogPost.featuredImage && (
          <div className="w-full max-w-4xl">
            <Image
              src={urlFor(blogPost.featuredImage).url()}
              alt={blogPost.title}
              width={1000}
              height={600}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        )}

        {/* Content */}
        {blogPost.content && (
          <div className="w-full max-w-4xl prose prose-lg mb-24">
            <PortableText value={blogPost.content} />
          </div>
        )}
      </main>

      <Footer />
    </section>
  );
};

export default BlogPostPage;