import React from "react";
import Image from "next/image";
import HeaderImage from "./header-img.png";
import Footer from "@/app/components/Footer";
import BlockQuote from "../BlockQuote";
import Divider from "@/app/components/ui/Divider";

const page = () => {
  return (
    <section className="m-auto items-center w-full gap-16">
      <main className="flex flex-col mt-10 md:mt-24 gap-16 items-center relative">
        {/* Title and sub */}
        <div className="flex flex-col gap-4 w-full">
          <h1 className="h2 w-full">On Learning to Code</h1>
          <h5 className="h5 w-full">October 08, 2024</h5>
        </div>

        {/* Body */}
        <div className="w-full flex flex-col gap-4 pb-32">
          <p className="h4">
            I thought learning to code would be a lot like picking up a new
            design tool — just watch a few tutorials, skim through the docs and
            off I’d be on my merry rectangle-drawing journey. I thought wrong.
            As a designer, I’m used to things looking the way I want them to.
            Enter code, the shatterer of dreams, the breaker of wills, where
            things work whenever they feel like it– and trust me, they usually
            don’t.
            <br />
            <br />
            <Image
              src={HeaderImage}
              alt="header image"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto rounded-xl"
              priority
            />
            <br />
            Ever since I was a kid, I’ve had a knack for questioning how things
            work. I grew a deep fascination with technology during my tender
            years, back when I used to play video games at the local internet
            cafe after school. I was obsessed to know how those characters moved
            on screen, how, wit the press of a button, Tommy Vercetti pulls out
            a grenade from his invisible inventory and hurls it at a police
            chopper. I remember thinking that every possible movement or
            interaction had been pre-recorded, just waiting to play out when I
            hit the right buttons. 🤷‍♂️ What can I say? I was a kid.
            <br />
            <br />
            That early fascination with technology grew into a deep passion as I
            got older. When I bought my first laptop, I spent hours staring
            longingly at coding tutorials on YouTube, wondering when I’d finally
            be able to spin code like that. Life, however, had other plans, and
            I ended up in design. But that yearning to code? It stuck with me.
            <br />
            <br />
            So when I finally sat down to write my first real lines of code
            (okay, technically, my first lines were written during those laptop
            tinkering days, but these are the first lines that actually
            mattered), I quickly realised that learning to code isn’t just about
            writing clean JavaScript. It’s about patience, debugging, and
            discovering that even code has its own kind of creativity. As it
            turns out, coding is full of surprises — here are five lessons I
            didn’t see coming.
            <br />
          </p>
          <ol className="h4">
            <li>1: Coding is a Different Kind of Creative </li>
            <li>2: Patience and Debugging are the New Wireframing</li>
            <li>3: Code Can Be Beautiful; But Not Always Pretty</li>
            <li>4: I Speak Dev</li>
            <li>5: Knowing Both Worlds is a Superpower</li>
          </ol>
          <br />
          <div className="h4 space-y-4">
            <p className="h3">Coding is a Different Kind of Creative</p>
            <p>
              In design, creativity is usually about colours, typography,
              spacing, and layouts — all synchronised perfectly to form the best
              user experience. In code, however, creativity isn’t just about
              making things look good; it’s also about making them work.
              <br />
              <br />
              Design is visual. It’s about how things look, how they feel, and
              how they guide the user’s experience. Coding, on the other hand,
              is about how things function, and you quickly learn that
              functionality is its own kind of art form. You’re not choosing
              colours and fonts here; you’re finding clever ways to make an
              element responsive, or creatively structuring functions to solve
              problems you didn’t even know existed when you started. Coding is
              fun, in a… not-so-fun way.
              <br />
              <br />
              Ah, the infamous “how to center a div” Google search. I’ll never
              forget the first time I typed those words into my browser. What
              seemed like a simple task turned into a battle between my designer
              brain and my still-forming coder brain. In design, centering
              something is as easy as dragging it into place, or hitting the
              magic Option+V, Option+H combo in Figma. But in code, it’s an
              exercise in creative problem-solving. After trying what felt like
              20 different methods, I finally managed to center the div — the
              solution was equal parts logic and luck. Who knew?
              <br />
              <br />
              And that’s when it hit me: coding is creativity, just in a
              completely different language. It’s the kind of creativity that
              challenges you to think abstractly, solve puzzles, and find beauty
              in functionality. And honestly? I’m starting to love it.
              <br />
              <br />
              But while creative problem-solving in code can be fun, it didn’t
              take long for me to discover that patience — and a lot of
              debugging — would become essential parts of this journey.
            </p>
            <br />
            <br />
          </div>

          <div className="h4 space-y-4">
            <p className="h3">Patience and Debugging are the New Wireframing</p>
            <p>
              Much like wireframing, where you test your layouts, working on
              numerous iterations until everything just clicks into place,
              debugging is an ancient art that requires lots of patience — and
              Green Lantern-level willpower.
              <br />
              <br />
              Wireframing is all about getting the structure right before you
              start fine-tuning the details. You’re moving things around,
              experimenting, tinkering, and fixing issues as they come up.
              Debugging is basically the same process, but with code. You run
              your code, it breaks, you fix it, and then it breaks again because
              you tried to fix it. It can feel like you’re stuck in an endless
              loop of ‘almost there’ moments, until you finally realise you
              forgot to add that one semicolon at the end of line 72.
              <br />
              <br />
              If there’s one thing debugging has taught me, it’s that coding is
              all about persistence. Debugging forces you to refine your code.
              You learn to embrace failure, knowing that each bug moves you a
              step closer to making things work. It’s frustrating, yes, but the
              satisfaction of finally fixing a bug is totally worth it — just
              like the moment a wireframe finally starts taking shape.
              <br />
              <br />
              Of course, once the bugs are squashed and your code finally works,
              you start to realise that coding has its own kind of beauty — just
              not the kind you see in design tools.
            </p>
            <br />
            <br />
          </div>

          <div className="h4 space-y-4">
            <p className="h3">Coding Can Be Beautiful; But Not Always Pretty</p>
            <p>
              It’s a designer’s instinct to make this look visually appealing —
              harmonious colours, sick typography, pixel-perfect layouts. We’re
              perfectionists. It’s in our nature, and I’m guilty of seeking
              perfection too. Code though, it has it’s own beauty, one not
              defined by how appealing it looks, but how well it runs.
              <br />
              <br />
              Coding’s taught me that beauty doesn’t always mean flawless
              visuals. It can also mean elegant logic, clean functionality, and
              the satisfaction of a problem solved. It’s a different kind of
              beauty — one that complements design by focusing not just on how
              things look, but how they work.
              <br />
              <br />
              Of course, writing functional code is only part of the story.
              Understanding how things work behind the scenes has also changed
              the way I collaborate with developers — because now, I can speak
              their language… at least, kind of.
            </p>
            <br />
            <br />
          </div>

          <div className="h4 space-y-4">
            <p className="h3">I Speak Dev</p>
            <p>
              Before I started learning to code, I struggled with communicating
              with developers. Even though I worked closely with the engineering
              team and joined many of their meetings, speaking in those meetings
              felt like ordering food in a foreign restaurant — I knew what I
              wanted, but putting it into words was where I fumbled. It was like
              sitting in a class where the teacher speaks too fast for you to
              keep up, so you just sit there, hearing but not really
              understanding.
              <br />
              <br />
              As a designer, I often felt like I was speaking a completely
              different language. My conversations with developers usually
              revolved around phrases like{" "}
              <span className="italic">
                “can we increase the padding of this button a bit more?”
              </span>{" "}
              or{" "}
              <span className="italic">
                “the spacing just doesn’t feel right.”
              </span>{" "}
              Meanwhile, they were talking about optimisation, performance, and
              the dreaded cross-browser compatibility. It was like we were
              speaking two different languages.
              <br />
              <br />
              I remember the first moments I stopped feeling like I was lost. It
              was during one of those moments that I realised I could finally
              speak their language — well, sort of. I still over-explain things,
              but at least now I understand the technical limitations and can
              speak up about potential issues before they become actual
              problems.
              <br />
              <br />
              Learning to code hasn’t made me a developer (not yet, anyway), but
              it’s definitely made me a better collaborator. I can bridge the
              gap between design and functionality, translating my design
              decisions into terms developers actually understand and resonate
              with. It’s less{" "}
              <span className="italic">“can we make it pop?”</span> and more
              <span className="italic">
                “how will this affect performance?”
              </span>
              — and let’s be honest, that’s a huge step forward.
            </p>
            <br />
            <br />
          </div>

          <div className="h4 space-y-4">
            <p className="h3">Knowing Both Worlds is a Superpower</p>
            <p>
              Being in both worlds is like a superpower. You get to move freely
              between two lines: creativity and functionality; you get to build
              out your ideas without feeling like you’re stuck, and that’s
              pretty cool if you ask me.
              <br />
              <br />
              <br />
              <BlockQuote quote="It’s a bird, It’s a plane, It’s… Designer-Who-Codes." />
            
              <br />
              <br />
              <br />
              As a designer, I used to stop at the visuals. I’d create
              pixel-perfect mockups and wireframes and hand them off to the
              developers, crossing my fingers that everything would come out as
              planned. But now, learning to code has changed the way I think
              about design. I don’t just focus on how things look — I think
              about how they’ll work, too. I’ve gained a deeper understanding of
              the entire journey, from concept to implementation.
            </p>
          </div>
          <br />
          <Divider />
          <br />

          <div className="h4 space-y-4">
            <p>
              I’m not a developer yet, but learning to code has completely
              changed how I design. Now, I think more holistically: “How will
              this work in a browser?” and “Is this animation even feasible?”
              are just a few of the questions I ask myself before approaching a
              design challenge. I’m more thoughtful, more flexible, and more
              confident in bringing my creative ideas to life. It’s a powerful
              combination — one that opens up new possibilities every day.
              <br />
              <br />
              So, what’s next, you might ask? Good question.
              <br />
              <br />
              I’m still learning to code, and there’s a lot I’ve yet to grasp.
              I’ll keep sharpening my skills and learning about new
              technologies. Right now, I’ve started learning React.js (update on
              that coming soon!) and I’m loving styling with Tailwind CSS. This
              journey is just beginning, and there are plenty more fun
              adventures — and maybe some challenging technologies — to master.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </section>
  );
};

export default page;
