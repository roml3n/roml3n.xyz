"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TransitionLink from "@/app/components/transitions/TransitionLink";
import type { WritingPost } from "@/lib/substack";

type WritingClientProps = {
  posts: WritingPost[];
};

export default function WritingClient({ posts }: WritingClientProps) {
  const [activePostIndex, setActivePostIndex] = useState<number | null>(null);
  const activePost = activePostIndex != null ? posts[activePostIndex] : null;

  return (
    <section className="content-start w-full min-h-[calc(100dvh-20rem)] md:min-h-[calc(100dvh-23rem)] mt-24 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 grid-rows-auto gap-x-4 md:gap-x-6 gap-y-9 md:gap-y-16 relative justify-center self-center">
      <div className="row-span-1 col-span-2 flex flex-col gap-1">
        <h2 className="h2"> Writing </h2>
        <h2 className="h2 opacity-40"> [{posts.length}] </h2>
      </div>

      <div className="hidden md:block row-start-2 md:col-span-3 lg:col-span-4">
        <div className="md:sticky md:top-28 pointer-events-none">
          <AnimatePresence mode="wait">
            {activePost ? (
              <motion.div
                key={`${activePost.href}-${activePostIndex}`}
                initial={{ opacity: 0, x: -20, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -12, scale: 0.98 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
                className="relative w-full max-w-md aspect-[16/9] rounded-sm overflow-hidden border border-midgrey/20 bg-hoverbg"
              >
                <img
                  src={activePost.previewImage}
                  alt={activePost.previewAlt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex flex-col gap-2 row-start-2 col-span-4 md:col-start-4 md:col-span-5 lg:col-start-5 lg:col-span-8">
        {posts.map((post, index) => (
          <TransitionLink
            key={`${post.href}-${post.date}-${index}`}
            href={post.href}
            target="_blank"
            rel="noopener noreferrer"
            className="h3 py-2 hover:bg-hoverbg hover:px-4 hover:border-r-4 hover:border-midgrey rounded-sm transition-all duration-300"
            onMouseEnter={() => setActivePostIndex(index)}
            onMouseLeave={() => setActivePostIndex((current) => (current === index ? null : current))}
            onFocus={() => setActivePostIndex(index)}
            onBlur={() => setActivePostIndex((current) => (current === index ? null : current))}
          >
            <div className="flex items-end justify-between gap-6">
              <div className="flex flex-col gap-1">
                <h3 className="h4 !text-fullgrey">{post.title}</h3>
                <p className="h6 hidden md:block text-darkgrey opacity-60">{post.description}</p>
              </div>
              <p className="h6 font-medium opacity-60">{post.date}</p>
            </div>
          </TransitionLink>
        ))}
      </div>
    </section>
  );
}
