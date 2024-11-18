import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
        className={`${ppEditorial.variable} ${ppNeueMontreal.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
};