// "use client";
// import React, { useState, useEffect } from "react";
// import Footer from "../components/Footer";
// import { WorkCard } from "../components/WorkCard";

// const Work = () => {
//   const [activeIndex, setActiveIndex] = useState(0); 

//   // Scroll handler to detect the active card
//   useEffect(() => {
//     const handleScroll = () => {
//       const cards = document.querySelectorAll(".work-card");
//       cards.forEach((card, index) => {
//         const rect = card.getBoundingClientRect();

//         // If the card is near the top of the viewport, mark it as active
//         if (rect.top > 0 && rect.top < window.innerHeight / 2) {
//           setActiveIndex(index);
//         }
//       });
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <section className="m-auto items-center w-full gap-16">
//       <main className="flex flex-col mt-24 gap-16 items-center">
//         <h1 className="h1 w-full">Work</h1>

//         <div
//           id="sticky-container"
//           className="w-full max-w-[1274px] flex flex-col gap-4 sticky"
//         >
//           {["One", "Two", "Three", "Four", "Five"].map((title, index) => (
//             <WorkCard key={index} title={title} index={index} activeIndex={activeIndex} />
//           ))}
//         </div>
//       </main>

//       <Footer />
//     </section>
//   );
// };

// export default Work;
