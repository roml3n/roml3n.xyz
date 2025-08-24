"use client";
import React, { useEffect, useState } from "react";
import Footer from "@/app/components/Footer";
import BlogPostLink from "@/app/components/BlogPostLink";
import Divider from "@/app/components/ui/Divider";
import { getAllBlogs } from "@/lib/sanity";

interface BlogPost {
  _id: string;
  title: string;
  publishedAt: string;
  slug: { current: string };
  excerpt?: string;
  tags?: string[];
}

const Writing = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await getAllBlogs();
        setBlogPosts(blogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: '2-digit', 
      year: 'numeric' 
    }).replace('/', '.');
  };

  return (
    <section className="m-auto items-center w-full gap-16">
      <main className="flex flex-col mt-10 md:mt-24 gap-16 items-center relative">
        <h1 className="h1 w-full">
          {" "}
          My thoughts and,
          <br />
          <span className=" h1 italic !text-mainblue"> occasionally </span>...
          rants
        </h1>

        {/* Blog Posts */}
        <div className="w-full flex flex-col gap-4 pb-32">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mainblue mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading posts...</p>
            </div>
          ) : blogPosts.length > 0 ? (
            blogPosts.map((post) => (
              <BlogPostLink
                key={post._id}
                title={post.title}
                date={formatDate(post.publishedAt)}
                url={`./writing/${post.slug.current}/`}
              />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No blog posts found.</p>
            </div>
          )}
        </div>
      </main>
      <Divider />
      <Footer />
    </section>
  );
};

export default Writing;
