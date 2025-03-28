import { ReduxProvider } from "@/store/provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import MetaPixel from "./components/MetaPixel";
import Navigation from "./components/Navigation";
import ToastProvider from "./components/ToastProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js E-commerce",
  description: "A modern e-commerce platform built with Next.js",
  keywords: "e-commerce, online shopping, next.js, react",
  openGraph: {
    title: "Next.js E-commerce",
    description: "A modern e-commerce platform built with Next.js",
    type: "website",
    locale: "en_US",
    siteName: "Next.js E-commerce",
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
        <ReduxProvider>
          <Navigation />
          {children}
          <MetaPixel />
          <ToastProvider />
        </ReduxProvider>
      </body>
    </html>
  );
}
