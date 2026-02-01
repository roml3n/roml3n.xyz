import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/app/components/Header.jsx";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import Footer from "./components/Footer";

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
        className={`${ppEditorial.variable} ${ppNeueMontreal.variable} antialiased  scroll-smooth`}
      >
        <Analytics />
        <SpeedInsights />

        <Header />
        <main className="w-[90%] md:w-[80%] mx-auto max-w-7xl">
          {children}

          <Footer />
        </main>
      </body>
    </html>
  );
}
