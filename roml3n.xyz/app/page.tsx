import React from "react";
import "./globals.css";
import Header from "./components/Header.jsx";
import { Hero } from "./sections/home/hero";

function App() {
  return (
    <section>
      <div className="flex flex-col items-center w-[80%] max-w-5xl self-center relative mx-auto">
        <Header />
        <main className="relative">
          <Hero />
        </main>
      </div>
    </section>
  );
}

export default App;
