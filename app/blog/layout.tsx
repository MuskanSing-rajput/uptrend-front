import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trading Blog & Insights",
  description:
    "Read the latest Forex, Crypto, and algo trading insights, tips, strategy guides, and market analysis from the Uptrender team.",
  keywords: [
    "forex trading blog",
    "crypto trading tips",
    "algo trading guide",
    "trading strategies India",
    "market analysis",
  ],
  alternates: {
    canonical: "https://uptrender.in/blog",
  },
  openGraph: {
    title: "Trading Blog & Insights | Uptrender",
    description:
      "Read the latest Forex, Crypto, and algo trading insights, tips, and market analysis from the Uptrender team.",
    url: "https://uptrender.in/blog",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
