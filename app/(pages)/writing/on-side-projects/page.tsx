import React from "react";
import Footer from "@/app/components/Footer";

const page = () => {
  return (
    <section className="m-auto items-center w-full gap-16">
      <main className="flex flex-col mt-10 md:mt-24 gap-16 items-center relative">
        {/* Title and sub */}
        <div className="flex flex-col gap-4 w-full">
          <h1 className="h2 w-full">On Side Projects</h1>
          <h5 className="h5 w-full">December 06, 2024</h5>
        </div>

        {/* Body */}
        <div className="w-full flex flex-col gap-4 pb-32">
          <p className="h4 italic">Ramblings of a product designer.</p>
          <p className="h4">
            For as long as I can remember, I’ve always had some side project on
            the go — whether it’s design-related, coding, or something
            completely random. Like that time I started a garden in my parents’
            backyard or that other time I built a small coop for my sisters’
            rabbits and guinea pigs. It’s just exhilarating working on something
            just for yourself, or even for someone close to you. No
            stakeholders, no deadlines — just pure curiosity and creativity.
            <br />
            <br />
            There is this magic in the creation of something new. A sort of
            magic which, if not described, is easily felt. It’s that spark of an
            idea that sticks with you-the “What if I tried this?” moment. It’s
            that feeling right after using some app and wishing it had that
            feature or flow; and you set out to build it out, just because you
            can.
            <br />
            <br />
            It’s not always rainbows and sunshine, of course. Sometimes you hit
            a roadblock or get distracted by life (or another side project,
            haha). But there’s always something so incredibly satisfying about
            seeing progress, even if it’s just a few hours of work squeezed in
            here and there.
            <br />
            <br />
            Side projects often take me on endless rabbit holes of learning and
            exploration. For example, I have this idea for an interaction I want
            to incorporate into my current project, and to make it happen, I
            need to learn GSAP — a JavaScript animation library. It’s a
            challenge, sure, but a welcome one.
            <br />
            <br />
            It is surprising how much side projects can teach in the span of
            years — new skills, new ways of thinking, and even how to fail
            gracefully, or, to quote Buzz Lightyear, “fall in style”. Sometimes,
            they spark ideas that influence my main work. Other times, they’re
            simply a fun escape, and that’s more than enough. If you’ve ever
            thought about starting a side project, just do it. It doesn’t need
            to be big or perfect — it just needs to excite you. Who knows where
            it might lead?
          </p>
        </div>
      </main>

      <Footer />
    </section>
  );
};

export default page;
