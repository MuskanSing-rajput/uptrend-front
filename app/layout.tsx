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
import UnhandledRejectionGuard from "./components/UnhandledRejectionGuard";

export const metadata: Metadata = {
  metadataBase: new URL("https://uptrender.in"),
  title: {
    default: "Uptrender – AI-Powered Forex & Crypto Trading Platform",
    template: "%s | Uptrender",
  },
  description:
    "India's leading AI-powered algo trading platform for Forex and Crypto. Trade smarter with AI strategies, copy trading, and a unified multi-market dashboard.",
  keywords: [
    "algo trading India",
    "AI trading platform",
    "forex trading platform",
    "crypto trading India",
    "copy trading",
    "automated trading",
    "strategy builder",
    "uptrender",
    "franchise trading",
    "white label trading platform",
  ],
  authors: [{ name: "Uptrender", url: "https://uptrender.in" }],
  creator: "Uptrender",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://uptrender.in",
    siteName: "Uptrender",
    title: "Uptrender – AI-Powered Forex & Crypto Trading Platform",
    description:
      "India's leading AI-powered algo trading platform for Forex and Crypto. Trade smarter with AI strategies, copy trading, and a unified multi-market dashboard.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Uptrender – AI-Powered Trading Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Uptrender – AI-Powered Forex & Crypto Trading Platform",
    description:
      "India's leading AI-powered algo trading platform for Forex and Crypto.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://uptrender.in",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Uptrender",
  url: "https://uptrender.in",
  logo: "https://uptrender.in/logo.png",
  description:
    "India's leading AI-powered algo trading platform for Forex and Crypto markets.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "509, Babylon Capital, VIP Road",
    addressLocality: "Raipur",
    addressRegion: "Chhattisgarh",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "support@uptrender.in",
    contactType: "customer support",
  },
  sameAs: [],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Uptrender",
  url: "https://uptrender.in",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://uptrender.in/blog?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <UnhandledRejectionGuard />
        <Navbar />
        <main style={{ flex: "1 0 auto" }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
