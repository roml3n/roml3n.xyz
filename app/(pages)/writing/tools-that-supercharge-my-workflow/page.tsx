import React from "react";
import Image from "next/image";
import HeaderImage from "./header-img.png";
import Raycast from "./raycast-img.png";
import Arc from "./arc-img.png";
import Notion from "./notion-img.png";
import Figma from "./figma-img.png";
import Framer from "./framer-img.png";
import Todoist from "./todoist-img.png";
import Shottr from "./shottr-img.png";
import Cosmos from "./cosmos-img.png";
import electric from "./electric-img.png";

import Footer from "@/app/components/Footer";
import Link from "next/link";
import ButtonLink from "@/app/components/ButtonLink";
import Divider from "@/app/components/ui/Divider";

const page = () => {
  return (
    <section className="m-auto items-center w-full gap-16">
      <main className="flex flex-col mt-10 md:mt-24 gap-16 items-center relative">
        {/* Title and sub */}
        <div className="flex flex-col gap-4 w-full">
          <h1 className="h2 w-full">The Tools that Supercharge My Workflow</h1>
          <h5 className="h5 w-full">October 27, 2024</h5>
        </div>

        <Image
          src={HeaderImage}
          alt="header image"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto rounded-xl"
          priority
        />

        {/* Body */}
        <div className="w-full flex flex-col gap-16 pb-16">
          <p className="h4">
            Every designer and developer has a few essential tools they can’t
            live without. For me, it’s a mix of docked apps, keyboard shortcuts,
            and trusty online tools. These are the ones that keep my workflow
            smooth and my creativity flowing, day in and day out.
          </p>

          <h3 className="h3">The Key Players</h3>

          {/* Raycast */}
          <div className="w-full flex flex-col gap-4">
            <Link href="https://raycast.com/?via=roml3n" className="flex gap-2">
              <p className="h4 font-medium">Raycast</p>
              <div className="flex items-center justify-center rounded-full border border-solid border-midgrey bg-fullwhite p-1">
                <Image
                  src="/images/icons/Arrow.svg"
                  alt="Arrow"
                  width={16}
                  height={16}
                />
              </div>
            </Link>
            <p className="h4 italic">Take back control of your computer</p>

            <Image
              src={Raycast}
              alt="header image"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto rounded-xl"
              priority
            />
            <p className="h4">
              A Spotlight (or Alfred) replacement on steroids. From the
              calculator that lets me type in natural language, the super useful
              clipboard history that holds up to 256 entries, AI chats in any
              window, third-party extension support, keyboard shortcuts and the
              mahoosive online community, Raycast does it all. They just
              completed a Series B of funding in order to bring all that
              productivity to Windows and iOS.
            </p>
          </div>

          {/* Arc */}
          <div className="w-full flex flex-col gap-4">
            <Link href="https://arc.net" className="flex gap-2">
              <p className="h4 font-medium">Arc</p>
              <div className="flex items-center justify-center rounded-full border border-solid border-midgrey bg-fullwhite p-1">
                <Image
                  src="/images/icons/Arrow.svg"
                  alt="Arrow"
                  width={16}
                  height={16}
                />
              </div>
            </Link>
            <p className="h4 italic">My internet, my way</p>

            <Image
              src={Arc}
              alt="header image"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto rounded-xl"
              priority
            />
            <p className="h4">
              The browser seeking to reinvent the internet. Arc, a beautiful web
              browser birthed by The Browser Company, New York, has lived on my
              dock since the first day I tried it. I find my workflow super neat
              when using Arc and I open way less tabs. The spaces and AI
              features are godsends. I love how I can find anything on a webpage
              by simply asking a question. It’s build atop the Chromium platform
              so it supports the all my favourite Chrome extensions.
            </p>
          </div>

          {/* Notion */}
          <div className="w-full flex flex-col gap-4">
            <Link href="https://notion.so" className="flex gap-2">
              <p className="h4 font-medium">Notion</p>
              <div className="flex items-center justify-center rounded-full border border-solid border-midgrey bg-fullwhite p-1">
                <Image
                  src="/images/icons/Arrow.svg"
                  alt="Arrow"
                  width={16}
                  height={16}
                />
              </div>
            </Link>
            <p className="h4 italic">My second brain</p>

            <Image
              src={Notion}
              alt="header image"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto rounded-xl"
              priority
            />
            <p className="h4">
              I have used Notion for years for all my note-taking activities.
              It’s quite literally, my{" "}
              <ButtonLink
                URL="https://www.buildingasecondbrain.com/"
                Label="second brain."
                className="!inline-flex"
              />
              I use the databases a lot, and the ability to deep link and nest
              pages is such an underrated feature. I don’t use Notion AI a lot,
              though, as I have always preferred ChatGPT and Claude for more
              conversational tasks and I organise my files well so I don’t AI
              search a lot either.
            </p>
          </div>

          {/* Figma */}
          <div className="w-full flex flex-col gap-4">
            <Link href="https://figma.com" className="flex gap-2">
              <p className="h4 font-medium">Figma</p>
              <div className="flex items-center justify-center rounded-full border border-solid border-midgrey bg-fullwhite p-1">
                <Image
                  src="/images/icons/Arrow.svg"
                  alt="Arrow"
                  width={16}
                  height={16}
                />
              </div>
            </Link>
            <p className="h4 italic">Where my ideas take shape</p>

            <Image
              src={Figma}
              alt="header image"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto rounded-xl"
              priority
            />
            <p className="h4">
              Because, obviously. I use Figma for everything design related.
              From quick ideating to short inspiration dumps to illustration
              design to web design to app design to quick photo editing. And
              when you go deep into the rabbit hole that is the rich plugin
              ecosystem, you unlock endless possibilities. I like the new
              features they’ve been dropping lately, and ever since they
              acquired Magician, I know they’re absolutely gonna cook with Figma
              AI. One thing I see in the foreseeable future is them introducing
              Figma Sites. I’m calling it now.
            </p>
          </div>

          {/* Framer */}
          <div className="w-full flex flex-col gap-4">
            <Link href="https://framer.com" className="flex gap-2">
              <p className="h4 font-medium">Framer</p>
              <div className="flex items-center justify-center rounded-full border border-solid border-midgrey bg-fullwhite p-1">
                <Image
                  src="/images/icons/Arrow.svg"
                  alt="Arrow"
                  width={16}
                  height={16}
                />
              </div>
            </Link>
            <p className="h4 italic">
              As the final boss of prototyping or as a static web builder
            </p>

            <Image
              src={Framer}
              alt="header image"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto rounded-xl"
              priority
            />
            <p className="h4">
              The web builder that took the internet by storm. Framer, which
              actually started as a prototyping tool, is a tool I’ve found
              myself using quite a lot recently, and it has lived up to my
              expectations. It has a big community behind it too and amazing
              customer support. The team is always ready to help and they’d
              sometimes even jump into your files (with permission of course)
              and fix the issues for you. Super cool. Plugins are also amazing.
            </p>
          </div>

          {/* Todoist */}
          <div className="w-full flex flex-col gap-4">
            <Link href="https://todoist.com" className="flex gap-2">
              <p className="h4 font-medium">Todoist</p>
              <div className="flex items-center justify-center rounded-full border border-solid border-midgrey bg-fullwhite p-1">
                <Image
                  src="/images/icons/Arrow.svg"
                  alt="Arrow"
                  width={16}
                  height={16}
                />
              </div>
            </Link>
            <p className="h4 italic">Tasks and lists, the right way </p>

            <Image
              src={Todoist}
              alt="header image"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto rounded-xl"
              priority
            />
            <p className="h4">
              This is my go-to task app. I’ve tried a lot of task management
              apps in the past, even tried making my own, but I always find
              myself coming back to Todoist. The interface is so intuitive and I
              love how I can just type in natural language and the app would
              pick up what I mean.
            </p>
          </div>

          {/* Shottr */}
          <div className="w-full flex flex-col gap-4">
            <Link href="https://shottr.cc" className="flex gap-2">
              <p className="h4 font-medium">Shottr</p>
              <div className="flex items-center justify-center rounded-full border border-solid border-midgrey bg-fullwhite p-1">
                <Image
                  src="/images/icons/Arrow.svg"
                  alt="Arrow"
                  width={16}
                  height={16}
                />
              </div>
            </Link>
            <p className="h4 italic">Beautiful screenshots</p>
            <Image
              src={Shottr}
              alt="header image"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto rounded-xl"
              priority
            />
            <p className="h4">
              The screenshot app that I’ve loved. This is what I use for
              everyday screenshots. It’s free and does everything you’d expect
              from a screenshot app. It has a beautiful UI that lets you
              annotate, crop, scribble on and reimagine screenshots,
              customisable keyboard shortcuts and a built in OCR feature. The
              only thing I’d like them to add is screen recording.
            </p>
          </div>

          {/* Cosmos */}
          <div className="w-full flex flex-col gap-4">
            <Link href="https://cosmos.so" className="flex gap-2">
              <p className="h4 font-medium">Cosmos</p>
              <div className="flex items-center justify-center rounded-full border border-solid border-midgrey bg-fullwhite p-1">
                <Image
                  src="/images/icons/Arrow.svg"
                  alt="Arrow"
                  width={16}
                  height={16}
                />
              </div>
            </Link>
            <p className="h4 italic">For moments of inspiration</p>
            <Image
              src={Cosmos}
              alt="header image"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto rounded-xl"
              priority
            />
            <p className="h4">
              Cosmos is an inspiration and discovery platform that lets you save
              links, curate items into ‘clusters’ and share them with anyone. It
              has a sleek minimal interface that prioritises user experience.
              The recommendations algo works flawlessly, too. It has replaced
              Pinterest in my workflow.
            </p>
          </div>

          {/* Visual Electric */}
          <div className="w-full flex flex-col gap-4">
            <Link href="https://visualelectric.com" className="flex gap-2">
              <p className="h4 font-medium">Visual Electric</p>
              <div className="flex items-center justify-center rounded-full border border-solid border-midgrey bg-fullwhite p-1">
                <Image
                  src="/images/icons/Arrow.svg"
                  alt="Arrow"
                  width={16}
                  height={16}
                />
              </div>
            </Link>
            <p className="h4 italic">For AI images you can control</p>
            <Image
              src={electric}
              alt="header image"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto rounded-xl"
              priority
            />
            <p className="h4">
              A collaborative AI image generator for designers. It runs on VE2,
              their in-house image generation pipeline that gives you a ton of
              customisation options of the images you generate. You can choose a
              style, or explore and find inspiration from the discover feed. It
              gives you an option to edit the image after it has been generated,
              and you can remix styles too.{" "}
            </p>
          </div>
        </div>

        {/* Same Energy */}
        <div className="w-full flex flex-col gap-4">
          <Link href="https://same.energy" className="flex gap-2">
            <p className="h4 font-medium">Same Energy</p>
            <div className="flex items-center justify-center rounded-full border border-solid border-midgrey bg-fullwhite p-1">
              <Image
                src="/images/icons/Arrow.svg"
                alt="Arrow"
                width={16}
                height={16}
              />
            </div>
          </Link>
          <p className="h4 italic">Visual search made easy</p>

          <p className="h4">
            A visual search engine based on machine learning. Search for an
            image, and it gives you similar images that have the ‘same energy’
            as the one you searched for/clicked on. Perfect for seeking
            inspiration or for one of those moments when you feel you need to
            feast your eyes on some vintage graphic posters. I know it’s not
            just me who does this.{" "}
          </p>
        </div>

        <h3 className="h3 w-full">Some more apps I&apos;d like to try</h3>

        {/* Rive */}
        <div className="w-full flex flex-col gap-4">
          <Link href="https://rive.app" className="flex gap-2">
            <p className="h4 font-medium">Rive</p>
            <div className="flex items-center justify-center rounded-full border border-solid border-midgrey bg-fullwhite p-1">
              <Image
                src="/images/icons/Arrow.svg"
                alt="Arrow"
                width={16}
                height={16}
              />
            </div>
          </Link>
          <p className="h4 italic">
            The design tool that creates functional graphics
          </p>

          <p className="h4">
            An advanced, interactive animation tool for designers and developers
            to create and integrate vector animations directly into apps and
            websites. With Rive, you can create real-time animations that
            respond to user inputs, making it a powerful tool for adding
            dynamic, interactive content. It’s primarily aimed at creating
            interactive animations, like animated icons, loading animations, or
            complex UI interactions, which can all be customised to react to
            various triggers or inputs.
          </p>
        </div>

        {/* Spline */}
        <div className="w-full flex flex-col gap-4">
          <Link href="https://spline.design" className="flex gap-2">
            <p className="h4 font-medium">Spline</p>
            <div className="flex items-center justify-center rounded-full border border-solid border-midgrey bg-fullwhite p-1">
              <Image
                src="/images/icons/Arrow.svg"
                alt="Arrow"
                width={16}
                height={16}
              />
            </div>
          </Link>
          <p className="h4 italic">3D design without the hassle </p>

          <p className="h4">
            A 3D design tool that enables designers to create, edit, and
            interact with 3D models and animations directly in the browser.
            Unlike traditional 3D software, Spline is designed for web-based
            projects, with a user-friendly interface that makes it accessible
            for designers without extensive 3D experience. It’s popular for
            creating immersive web experiences, where users can interact with 3D
            objects in real time.
          </p>
        </div>
        {/* Play */}
        <div className="w-full flex flex-col gap-4">
          <Link href="https://createwithplay.com" className="flex gap-2">
            <p className="h4 font-medium">Play</p>
            <div className="flex items-center justify-center rounded-full border border-solid border-midgrey bg-fullwhite p-1">
              <Image
                src="/images/icons/Arrow.svg"
                alt="Arrow"
                width={16}
                height={16}
              />
            </div>
          </Link>
          <p className="h4 italic">Prototype iOS apps like a boss</p>

          <p className="h4">
            A mobile app design and prototyping tool built with the power of iOS
            and Swift. Play lets you design and prototype apps with ease using
            native iOS materials, like date pickers, maps and input fields, and
            brings over their in-built functionality right out of the box. Play
            also lets you share your prototypes as AppClips, a super fast and
            lightweight way to preview an iOS apps without the need to install
            it.
          </p>
        </div>
        <Divider />
        <p className="h4 pb-16">
          Having a set of go-to tools, whether docked or just a few clicks away,
          keeps me productive, inspired, and organised. Whatever I’m doing, this
          setup works for me because every tool has its purpose. If you haven’t
          tried some of these, check them out — they might just find a permanent
          place in your workflow too.
        </p>
      </main>

      <Footer />
    </section>
  );
};

export default page;
