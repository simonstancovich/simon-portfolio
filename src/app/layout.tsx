import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Navbar from "@/components/navbar/navbar";

const siteName = "Simon Stancovich – Fullstack Developer";
const description =
  "React/TypeScript/Next.js engineer. Clean architecture, strong UI, production-quality delivery.";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: siteName, template: "%s · Simon Stancovich" },
  description,
  metadataBase: new URL("https://portfolio2025-wine-chi.vercel.app"),
  openGraph: {
    title: siteName,
    description,
    url: "/",
    siteName: "Simon Stancovich",
    type: "website",
    images: [{ url: "/opengraph-image" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description,
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
