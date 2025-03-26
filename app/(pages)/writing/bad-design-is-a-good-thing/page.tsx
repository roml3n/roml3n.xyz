import React from "react";
import Image from "next/image";
import HeaderImage from "./header-img.png";
import Footer from "@/app/components/Footer";
import BlockQuote from "../BlockQuote";

const page = () => {
  return (
    <section className="m-auto items-center w-full gap-16">
      <main className="flex flex-col mt-10 md:mt-24 gap-16 items-center relative">
        {/* Title and sub */}
        <div className="flex flex-col gap-4 w-full">
          <h1 className="h2 w-full">Bas Design is Actually a Good Thing</h1>
          <h5 className="h5 w-full">July 19, 2024</h5>
        </div>

        {/* Body */}
        <div className="w-full flex flex-col gap-4 pb-32">
          <div className="h4">
            In a world obsessed with sleek interfaces and polished aesthetics,
            it’s easy to overlook the value of imperfect or “bad” design. <br />
            <br />
            But believe it or not, bad design plays a crucial role in fostering
            adaptability, creativity, and resilience. <br />
            <br />
            “Design is dead” — A quote Enzo Mari, a legendary Italian designer
            and artist, enjoyed saying. Mari has always been an intellectual
            provocateur, prone to long rambling ruminations on art and design
            that vacillate between genuine brilliance and philosophical garbage.
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
          </div>

          <br />

          <div className="h4 space-y-4">
            <p className="h3">Coding is a Different Kind of Creative</p>
            <p>
              When we encounter poorly designed objects or interfaces, we’re
              often forced to think creatively and find solutions to overcome
              the challenges they present. This process of adaptation not only
              enhances our problem-solving skills but also makes us more
              resilient to unexpected changes. In essence, bad design forces us
              to engage more deeply with our environment, sharpening our ability
              to navigate complexity. <br />
              <br />
              You have a chair, it’s wonky. You sit on it anyway. Uncomfortable,
              isn’t it? It requires constant adjustments to maintain balance,
              turning a simple act of sitting into an impromptu core workout
              (summer body ftw). And who doesn’t love a surprise exercise
              session? Or even more embarrassing and relatable, you come face to
              face with a door you’re not sure you should pull or push to open.
              It’s okay, you’re not alone, we’ve all faced this at some point in
              our lives. For me, it was yesterday. This experience forces you to
              pause and rethink your approach, often leading to an awkward dance
              with the door that others might find amusing. These everyday
              examples highlight how bad design can prompt us to adapt and think
              critically. <br />
              <br />
              Enzo Mari believed that design should provoke thought and
              engagement rather than simply offer convenience. He argued that
              the imperfections and difficulties presented by certain designs
              could inspire users to adapt and innovate, leading to a richer,
              more meaningful interaction with the world around them.
            </p>
            <br />
            <br />
          </div>

          <div className="h4 space-y-4">
            <p className="h3">Bad Design Fosters Creativity</p>
            <p>
              Imperfect design can spark creativity by pushing us to think
              outside the box. When faced with a poorly designed product, users
              often come up with ingenious hacks and workarounds to make it
              function better. This process of creative problem-solving can lead
              to unexpected innovations and improvements. <br />
              <br />
              Mari’s work often reflected this principle. Instead of providing
              an instruction manual for a piece of furniture, for example, he
              might slap you with a drawing and some 2x4s, so you can make it
              yourself. This DIY approach not only made things harder to use or
              more difficult to understand, but it also encouraged a deeper
              level of engagement and creativity. <br />
              <br />
              By embracing the imperfections inherent in self-made objects, Mari
              believed that people could discover their own creative potential
              and develop a deeper appreciation for the design process.
            </p>
            <br />
            <br />
          </div>

          <div className="h4 space-y-4">
            <p className="h3">Bad Design Promotes Mindfulness</p>
            <p>
              Interacting with bad design can make us more mindful and present
              in our daily lives. When things work seamlessly, we tend to take
              them for granted. However, when we encounter obstacles, we become
              more aware of our actions and surroundings. This heightened
              awareness leads to a greater appreciation for well-designed
              objects and systems. <br />
              <br />
              Mari’s approach to design often emphasized the importance of
              mindfulness and intentionality. He believed that by engaging with
              the imperfections and challenges of the world, we could cultivate
              a deeper understanding and appreciation for the things we use and
              create. <br />
              <br />
              At its core, bad design teaches us to embrace change and
              uncertainty. It reminds us that perfection is an illusion and that
              growth often comes from grappling with the imperfect. By accepting
              and even welcoming flaws, we open ourselves up to new
              possibilities and opportunities for improvement. <br />
              <br />
              Good design quietly exists, blending seamlessly into our lives. In
              contrast, bad design demands our attention, engagement, and
              introspection. By making things harder to use or more difficult to
              understand, Mari wasn’t just being contrarian; he was railing
              against passive consumption. His legacy is that of dissent against
              ‘good’ design — visible only in rebellion against the norm.
            </p>
            <br />
            <BlockQuote quote="Good design is invisible. Bad design is unignorable." />
            <br />
            <br />
            <br />
          </div>

          <div className="h4 space-y-4">
            <p className="h3">My Two Cents</p>
            <p>
              While bad design may initially seem like a hindrance, it actually
              offers numerous benefits that can enrich our thinking. By
              encouraging adaptability, fostering creativity, promoting
              mindfulness, and helping us embrace change, imperfect design plays
              a crucial role in our personal and collective growth. Mari’s work
              challenges us to look beyond the seamless and the perfect, finding
              value and meaning in the imperfect and the unexpected.
            </p>{" "}
            <br />
            <br />
            <span className="italic">
              (Of course, this is not an excuse to design things badly!)
            </span>{" "}
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
      </main>

      <Footer />
    </section>
  );
};

export default page;
