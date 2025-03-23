"use client";
import React from "react";
import Footer from "@/app/components/Footer";
import BlogPostLink from "@/app/components/BlogPostLink";
import Divider from "@/app/components/ui/Divider";

const blogPosts = [
  { title: "On side projects", date: "12.2024", slug: "on-side-projects" },
  {
    title: "Tools that supercharge my workflow",
    date: "10.2024",
    slug: "tools-that-supercharge-my-workflow",
  },
  {
    title: "On learning to code",
    date: "10.2024",
    slug: "on-learning-to-code",
  },
  {
    title: "Bad design is a good thing",
    date: "07.2024",
    slug: "bad-design-is-a-good-thing",
  },
  {
    title: "On the AI renaissance",
    date: "09.2024",
    slug: "on-the-ai-renaissance",
  },
  { title: "On upskilling", date: "03.2024", slug: "on-upskilling" },
];

const Writing = () => {
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
          {blogPosts.map((post, index) => (
            <BlogPostLink
              key={index}
              title={post.title}
              date={post.date}
              url={`./writing/${post.slug}/`}
            />
          ))}
        </div>
      </main>
      <Divider />
      <Footer />
    </section>
  );
};

export default Writing;
