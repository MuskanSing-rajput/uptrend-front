import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "White Label Trading Platform",
  description:
    "Launch your own AI-powered Forex and Crypto trading platform with Uptrender's white label solution. Custom branding, your domain, full admin control, and multiple revenue streams — go live in weeks.",
  keywords: [
    "white label trading platform",
    "white label forex platform",
    "white label crypto trading",
    "custom trading platform India",
    "branded trading app",
    "launch trading business",
  ],
  alternates: {
    canonical: "https://uptrender.in/white-label",
  },
  openGraph: {
    title: "White Label Trading Platform | Uptrender",
    description:
      "Launch your own AI-powered Forex and Crypto trading platform. Custom branding, full admin control, and multiple revenue streams.",
    url: "https://uptrender.in/white-label",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
