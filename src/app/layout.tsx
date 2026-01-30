import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto, Open_Sans, DynaPuff, Varela_Round } from "next/font/google";
import "./globals.css";
import Nav from "./Nav";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const roboto = Roboto({ variable: "--font-roboto", subsets: ["latin"], weight: ["300","400","500","700"] });
const openSans = Open_Sans({ variable: "--font-open-sans", subsets: ["latin"], weight: ["300","400","600","700"] });
const dynaPuff = DynaPuff({ variable: "--font-dyna-puff", subsets: ["latin"], weight: "400" });
const varelaRound = Varela_Round({ variable: "--font-varela-round", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Craig | Developer Portfolio",
  description: "Portfolio website showcasing projects, skills and contact information.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} ${openSans.variable} ${dynaPuff.variable} ${varelaRound.variable} antialiased`}
        style={{ background: "#000" }}
      >
        {/* Fixed, translucent navbar rendered on all pages */}
        {/* Nav is a client component and remains visible while scrolling */}
        <Nav />

        {/* Offset content so it doesn't sit underneath the fixed header */}
        <main id="top" style={{ paddingTop: 88 }}>{children}</main>
      </body>
    </html>
  );
}
