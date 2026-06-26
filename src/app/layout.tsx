import type { Metadata } from "next";
import "./globals.css";
import Nav from "./Nav";

export const metadata: Metadata = {
  title: "Craig Togarepi | Full-stack Developer",
  description: "Future-ready portfolio showcasing web, dashboard, and mobile product work.",
  openGraph: {
    title: "Craig Togarepi | Full-stack Developer",
    description: "Future-ready portfolio showcasing web, dashboard, and mobile product work.",
    url: "https://craigtogarepi.dev",
    siteName: "Craig Togarepi Portfolio",
    images: [
      {
        url: "/Hero section.png", // fallback image if available, or just keeping the standard structure
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Craig Togarepi | Full-stack Developer",
    description: "Future-ready portfolio showcasing web, dashboard, and mobile product work.",
    images: ["/Hero section.png"],
  },
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
