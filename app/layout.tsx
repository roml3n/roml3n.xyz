
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import DockSection from "@/app/sections/home/DockSection";
import Header from "@/app/components/Header.jsx";
import { LinearBlur } from "progressive-blur";
import { SpeedInsights } from "@vercel/speed-insights/next";

const ppEditorial = localFont({
  src: [
    {
      path: "./fonts/PPEditorialNew-Ultralight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/PPEditorialNew-UltralightItalic.otf",
      weight: "200",
      style: "italic",
    },
  ],
  variable: "--font-pp-editorial",
  display: "swap",
});

const ppNeueMontreal = localFont({
  src: [
    {
      path: "./fonts/ppneuemontreal-book.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/ppneuemontreal-medium.otf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-pp-neue-montreal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Roman Lenjo",
  description: "oi oi ni",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ppEditorial.variable} ${ppNeueMontreal.variable} antialiased w-[80%] mx-auto max-w-5xl`}
      >
        <SpeedInsights/>
        <LinearBlur
          side="top"
          steps={10}
          strength={42}
          falloffPercentage={100}
          tint="#ffffff50"
          style={{
            position: "fixed",
            top: 0,
            inset: 0,
            zIndex: 8998,
            height: 200,
          }}
        />

        <Header />

        {children}
        <DockSection className="flex hover-target self-center mx-auto justify-center w-fit !z-[9999]" />

        <div className="z-99999 fixed bottom-0 left-0 right-0 h-[150px] w-screen bg-gradient-to-t from-fullwhite to-transparent"/>
          
      </body>
    </html>
  );
}
