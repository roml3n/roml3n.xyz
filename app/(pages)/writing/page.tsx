"use client";
import React from "react";
import Link from "next/link";

const Writing = () => {
  return (
    <section className="w-full h-full mt-24 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 grid-rows-auto gap-x-4 md:gap-x-6 gap-y-9 md:gap-y-16 relative justify-center self-center">
      <div className="row-span-1 col-span-2 flex flex-col gap-1">
        <h2 className="h2"> Writing </h2>
        <h2 className="h2 opacity-40"> [5] </h2>
      </div>

      {/* posts */}
      <div className="flex flex-col gap-2 row-start-2 lg:col-start-5 col-span-4 md:col-span-8">
        <Link
          href="/writing/my-first-post"
          className="h3 py-2 hover:bg-hoverbg hover:px-4 hover:border-r-4 hover:border-midgrey rounded-sm transition-all duration-300"
        >
          <div className="flex items-end justify-between gap-6">
            <div className="flex flex-col gap-1">
              <h3 className="h4 !text-fullgrey">My First Post</h3>
              <p className="h6 hidden md:block text-darkgrey opacity-60">
                This is a short description of the post.
              </p>
            </div>
            <p className="h6 font-medium opacity-60">08.2024</p>
          </div>
        </Link>
        <Link
          href="/writing/my-first-post"
          className="h3 py-2 hover:bg-hoverbg hover:px-4 hover:border-r-4 hover:border-midgrey rounded-sm transition-all duration-300"
        >
          <div className="flex items-end justify-between gap-6">
            <div className="flex flex-col gap-1">
              <h3 className="h4 !text-fullgrey">My First Post</h3>
              <p className="h6 hidden md:block text-darkgrey opacity-60">
                This is a short description of the post.
              </p>
            </div>
            <p className="h6 font-medium opacity-60">08.2024</p>
          </div>
        </Link>
        <Link
          href="/writing/my-first-post"
          className="h3 py-2 hover:bg-hoverbg hover:px-4 hover:border-r-4 hover:border-midgrey rounded-sm transition-all duration-300"
        >
          <div className="flex items-end justify-between gap-6">
            <div className="flex flex-col gap-1">
              <h3 className="h4 !text-fullgrey">My First Post</h3>
              <p className="h6 hidden md:block text-darkgrey opacity-60">
                This is a short description of the post.
              </p>
            </div>
            <p className="h6 font-medium opacity-60">08.2024</p>
          </div>
        </Link>
        <Link
          href="/writing/my-first-post"
          className="h3 py-2 hover:bg-hoverbg hover:px-4 hover:border-r-4 hover:border-midgrey rounded-sm transition-all duration-300"
        >
          <div className="flex items-end justify-between gap-6">
            <div className="flex flex-col gap-1">
              <h3 className="h4 !text-fullgrey">My First Post</h3>
              <p className="h6 hidden md:block text-darkgrey opacity-60">
                This is a short description of the post.
              </p>
            </div>
            <p className="h6 font-medium opacity-60">08.2024</p>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Writing;
