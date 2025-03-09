import React from "react";
import Reading from "@/app/components/ui/reading";

const CurrentlyReadingSection = () => {
  return (
    <section className="m-auto gap-6 flex flex-col items-center w-full">
      <div className="w-full text-left h2">Currrently reading</div>

      <div className="flex flex-col gap-4 relative w-full md:flex-row md:gap-20">
        <div className="flex flex-col gap-4 w-full justify-start ">
          <Reading
            imgSrc="/images/about/silo.png"
            title="The Silo Saga Omnibus"
            author="Hugh Howey"
            alt="book cover"
            href="https://www.goodreads.com/book/show/54957253-the-silo-saga-omnibus"
          />

          <Reading
            imgSrc="/images/about/clockwork-angel.png"
            title="Clockwork Angel"
            author="Cassandra Clare"
            alt="book cover"
            href="https://www.goodreads.com/book/show/7171637-clockwork-angel"
          />
        </div>

        <div className="flex flex-col gap-4 w-full justify-start">
          <Reading
            imgSrc="/images/about/atomic-habits.png"
            title="Atomic Habits"
            author="James Clear"
            alt="book cover"
            href="https://www.goodreads.com/book/show/40121378-atomic-habits"
          />

          <Reading
            imgSrc="/images/about/show-your-work.png"
            title="Show Your Work"
            author="Austin Kleon"
            alt="book cover"
            href="https://www.goodreads.com/book/show/18290401-show-your-work"
          />
        </div>
      </div>
    </section>
  );
};

export default CurrentlyReadingSection;
