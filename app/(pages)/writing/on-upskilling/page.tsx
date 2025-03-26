import React from "react";
import Footer from "@/app/components/Footer";
import Image from "next/image";
import HeaderImage from "./header-img.png";
import ButtonLink from "@/app/components/ButtonLink";

const page = () => {
  return (
    <section className="m-auto items-center w-full gap-16">
      <main className="flex flex-col mt-10 md:mt-24 gap-16 items-center relative">
        {/* Title and sub */}
        <div className="flex flex-col gap-4 w-full">
          <h1 className="h2 w-full">On Upskilling</h1>
          <h5 className="h5 w-full">March 26, 2025</h5>
        </div>

        {/* Body */}
        <div className="w-full flex flex-col gap-4 pb-32">
          <p className="h4 italic">Lessons from Sung Jinwoo</p>
          <Image
            src={HeaderImage}
            alt="header image"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto rounded-xl"
            priority
          />
          <p className="h4">
            <br />
            <br />
            I&apos;ve been watching{" "}
            <ButtonLink
              URL="https://www.imdb.com/title/tt21209876/"
              Label="Solo Leveling"
              className="!inline-flex"
            />{" "}
            a lot recently,{" "}
            <span className="italic">
              (even if they make us wait an entire week for a 20-minute episode)
            </span>
            , and it got me thinking–upskilling as a designer is a lot like
            Jinwoo&apos;s journey. You start out feeling like the weakest in the
            room, with everyone else around you seemingly light-years ahead and
            you keep beating yourself up over if you&apos;ll ever catch up. But
            rather than letting this get the best of him, Jinwoo persists,
            always pushing forward, and before you realize it, he&apos;s in a
            league of his own. This is the way of learning design. You start
            with the basics, only to find a whole world full of tools,
            frameworks, and research techniques; and before you know it, your
            list of things to learn appears endless. And the process never
            really stops.
            <br />
            <br />
            You&apos;re learning Figma today, and tomorrow all the buzz is about
            Framer and AI-driven design systems. Motion design? You&apos;ll have
            to learn that too. And if you don&apos;t know at least a bit of
            front-end code, you&apos;re lagging behind. It used to feel like a
            competition, like if I didn&apos;t learn quickly enough, I&apos;d
            get left behind. But Solo Leveling made me remember that upskilling
            is not about following trends—it&apos;s about stacking skills like
            they&apos;re abilities in a game. Each new thing you learn gives you
            more options, more ways to solve problems, more confidence to
            attempt greater things. Jinwoo doesn&apos;t even acquire random
            skills mind you—he builds his basic strengths first. That&apos;s
            been a huge shift in mindset for me.
            <br />
            <br />
            Rather than stressing about having the latest flashy tools, I
            concentrate on learning the fundamentals. Good user experience, a
            strong visual hierarchy, and good storytelling—these are never out
            of style. When I&apos;m learning a new skill, I try to approach it
            as something I&apos;m adding to my toolkit, rather than just ticking
            the requirements list. The most striking thing is that Jinwoo
            doesn&apos;t develop his skills out of a sense of duty—he improves
            because he{" "} <span className="italic">wants</span> to grow.
            That&apos;s the mindset shift I&apos;m aiming for. Rather than
            viewing learning as something I have to do, I want to approach it as
            leveling up in a videogame. Not because I have to keep up, but
            because it makes me more incisive, more competent, and more
            resilient. Quite frankly, it&apos;s a much healthier attitude to
            have.
          </p>
        </div>
      </main>

      <Footer />
    </section>
  );
};

export default page;
