import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import DockSection from "@/app/(sections)/DockSection";
import Header from "@/app/components/Header.jsx";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

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
  description: "A product designer designing for humans.",
  openGraph: {
    images: [
      {
        url: "https://roml3n.xyz/images/og-image.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-Y3VRTMW2YP"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-Y3VRTMW2YP');
            `,
          }}
        />
      </head>
      <body
        className={`${ppEditorial.variable} ${ppNeueMontreal.variable} antialiased w-[90%] md:w-[80%] mx-auto max-w-5xl scroll-smooth`}
      >
        <Analytics />
        <SpeedInsights />

        <div className="fixed top-0 inset-0 z-[8998] h-[100px] w-screen  bg-gradient-to-b from-fullwhite via-fullwhite/80 to-transparent" />

        <Header />

        {children}
        <DockSection className="flex hover-target self-center mx-auto justify-center w-fit !z-[9999]" />

        <div className="z-99999 fixed bottom-0 left-0 right-0 h-[150px] w-screen bg-gradient-to-t from-fullwhite to-transparent" />
      </body>
    </html>
  );
}
