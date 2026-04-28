import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Franchise Partnership Program",
  description:
    "Become an Uptrender Franchise Partner. Launch your own branded trading business, earn recurring commissions from subscriptions and trades, and grow with India's leading AI algo trading platform.",
  keywords: [
    "trading franchise India",
    "forex franchise partner",
    "algo trading partnership",
    "earn from trading platform",
    "Uptrender partner program",
    "trading business India",
  ],
  alternates: {
    canonical: "https://uptrender.in/partnership",
  },
  openGraph: {
    title: "Franchise Partnership Program | Uptrender",
    description:
      "Become an Uptrender Franchise Partner. Launch your own branded trading business and earn recurring commissions.",
    url: "https://uptrender.in/partnership",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
