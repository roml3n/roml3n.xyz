"use client";
import React from "react";
import Footer from "../components/Footer";
import BlogPostLink from "@/app/components/BlogPostLink";
import Divider from "@/app/components/ui/Divider";

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
        <div className="w-full flex flex-col gap-4">
          <BlogPostLink
            title="On side projects"
            date="November 15, 2024"
            url="/"
          />

          <BlogPostLink
            title="On supercharging my productivity"
            date="October 27, 2024"
            url="/"
          />

          <BlogPostLink
            title="On learning to code"
            date="October 8, 2024"
            url="/"
          />

          <BlogPostLink
            title="On the death of Kenyan design"
            date="September 5, 2024"
            url="/"
          />

          <BlogPostLink
            title="On bad design actually being a good thing"
            date="July 19, 2024"
            url="/"
          />

          <BlogPostLink
            title="On the AI renaissance"
            date="September 5, 2024"
            url="/"
          />

          <BlogPostLink title="On upskilling" date="March 5, 2024" url="/" />
        </div>
      </main>
      <Divider />
      <Footer />
    </section>
  );
};

export default Writing;
