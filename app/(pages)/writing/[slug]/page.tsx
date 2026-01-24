"use client";
import React from "react";
import Footer from "@/app/components/Footer";

const BlogPostPage = () => {
  return (
    <section className="m-auto items-center w-full gap-16">
      <main className="flex flex-col mt-10 md:mt-24 gap-16 items-center">
        <div className="text-center py-8">
          <h1 className="h1 mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600">The blog post you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </main>
      <Footer />
    </section>
  );
};

export default BlogPostPage;