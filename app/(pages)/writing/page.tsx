"use client";
import React from "react";
import Footer from "@/app/components/Footer";
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
        <div className="w-full flex flex-col gap-4 pb-32">
          <BlogPostLink title="On side projects" date="11.2024" url="/" />

          <BlogPostLink
            title="On supercharging my productivity"
            date="10.2024"
            url="/"
          />

          <BlogPostLink title="On learning to code" date="10.2024" url="/" />

          <BlogPostLink
            title="On the death of Kenyan design"
            date="09.2024"
            url="/"
          />

          <BlogPostLink
            title="On bad design actually being a good thing"
            date="07.2024"
            url="/"
          />

          <BlogPostLink title="On the AI renaissance" date="09.2024" url="/" />

          <BlogPostLink title="On upskilling" date="03.2024" url="/" />
        </div>
      </main>
      <Divider />
      <Footer />
    </section>
  );
};

export default Writing;
