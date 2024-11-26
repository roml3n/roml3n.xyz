import React from "react";
import Reading from "@/app/components/ui/reading";

const CurrentlyReadingSection = () => {
  return (
    <section className="m-auto gap-6 flex flex-col items-center w-full">
      <div className="w-full text-left h2">Currrently reading</div>

      <div className="flex flex-col gap-4 relative w-full md:flex-row md:gap-0">
        <div className="flex flex-col gap-4 w-full justify-start">
          <Reading
            imgSrc="/"
            title="The Silo Saga Omnibus"
            author="Hugh Howey"
            alt="book cover"
            href="#"
          />

          <Reading
            imgSrc="/"
            title="Clockwork Angel"
            author="Cassandra Clare"
            alt="book cover"
            href="#"
          />
        </div>

        <div className="flex flex-col gap-4 w-full justify-start">
          <Reading
            imgSrc="/"
            title="Atomic Habits"
            author="James Clear"
            alt="book cover"
            href="#"
          />

          <Reading
            imgSrc="/"
            title="Show Your Work"
            author="Austin Kleon"
            alt="book cover"
            href="#"
          />
        </div>
      </div>
    </section>
  );
};

export default CurrentlyReadingSection;
