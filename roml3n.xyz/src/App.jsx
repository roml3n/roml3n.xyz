import React from "react";
import "./App.css";
import Header from "./components/Header";

function App() {
  return (
    <section>
      <div className="flex flex-col items-center w-[80%] max-w-5xl self-center relative mx-auto">
        <Header />
        <div className="h1 text-mainblue italic">This is Editorial!</div>
        <p>This text should now use your custom fonts.</p>
      </div>
    </section>
  );
}

export default App;
