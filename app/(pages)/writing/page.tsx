"use client";
import React from "react";
import Footer from "@/app/components/Footer";
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
          <div className="text-center py-8">
            <p className="text-gray-600">No blog posts found.</p>
          </div>
        </div>
      </main>
      <Divider />
      <Footer />
    </section>
  );
};

export default Writing;
