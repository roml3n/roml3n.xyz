"use client";
import React from "react";
import Header from "@/app/components/Header.jsx";
import DockSection from "@/app/sections/home/DockSection";
import Footer from "../components/Footer";
import BlogPostLink from "@/app/components/BlogPostLink";
import Divider from "@/app/components/ui/Divider";

const Writing = () => {
  return (
    <section className="m-auto items-center w-[80%] max-w-5xl gap-16">
      <Header />
      <main className="flex flex-col mt-24 gap-16 items-center relative">
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
            description="Lessons and thoughts on having side projects."
            url="/"
          />

          <BlogPostLink
            title="On supercharging my productivity"
            date="October 27, 2024"
            description="I share the tools that power my daily workflow."
            url="/"
          />

          <BlogPostLink
            title="On learning to code"
            date="October 8, 2024"
            description="Lessons I've learnt about coding."
            url="/"
          />

          <BlogPostLink
            title="On the death of Kenyan design"
            date="September 5, 2024"
            description="A rant on how design in Kenya is broken."
            url="/"
          />

          <BlogPostLink
            title="On bad design actually being a good thing"
            date="July 19, 2024"
            description="Musings from the late Enzo Mari, a pioneer in design."
            url="/"
          />

          <BlogPostLink
            title="On the AI renaissance"
            date="September 5, 2024"
            description="A rant on how AI is moving faster than we can keep up."
            url="/"
          />

          <BlogPostLink
            title="On upskilling"
            date="March 5, 2024"
            description="A rant on how important it is to level up, to stand out."
            url="/"
          />
        </div>

        <DockSection className="flex justify-center w-fit" />
      </main>
      <Divider />
      <Footer />
    </section>
  );
};

export default Writing;
