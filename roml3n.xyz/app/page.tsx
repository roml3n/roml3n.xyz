import React from "react";
import "./globals.css";
import Header from "./components/Header.jsx";

function App() {
  return (
    <section>
      <div className="flex flex-col items-center w-[80%] max-w-5xl self-center relative mx-auto">
        <Header />
        <div className="h1 text-mainblue">This is Editorial!</div>
        <p className="h4">This text should now use your custom fonts.</p>
      </div>
    </section>
  );
}

export default App;
