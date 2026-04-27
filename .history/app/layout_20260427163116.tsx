import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MetaMaskGuard from "./components/MetaMaskGuard";

export const metadata: Metadata = {
  title: "UpTrader - Start Trading",
  description: "Start trading with an award-winning broker",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a14]">
        <MetaMaskGuard />
        <Navbar />
        <main style={{ flex: "1 0 auto" }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
