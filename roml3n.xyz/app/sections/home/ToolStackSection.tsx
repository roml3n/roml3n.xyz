import React from 'react';
import { StackIconsGrid } from '@/app/components/StackIconsGrid';

export const ToolStackSection = () => {
  return (
    <section className="mt-[4rem] flex flex-col self-center items-center w-screen py-16 pb-32 rounded-t-[2rem] border-t border-midgrey bg-fullwhite">
    <div className="flex flex-col w-[80%] max-w-[1024px] gap-9">
      <p className="h2">
        My tool
        <span className="p-2 h2 italic !text-mainblue">stack</span>
      </p>
      <StackIconsGrid />   {/* Icons */}
    </div>
  </section>
  )
}
