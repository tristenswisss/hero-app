import type { Metadata } from "next";
import "./globals.css";
import Nav from "./Nav";

export const metadata: Metadata = {
  title: "Craig Togarepi | Full-stack Developer",
  description: "Future-ready portfolio showcasing web, dashboard, and mobile product work.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
