import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Uptrender's mission to make Forex and Crypto trading smarter and accessible for everyone. Built by traders, for traders — in Raipur, India.",
  keywords: [
    "about Uptrender",
    "trading platform India",
    "algo trading company India",
    "Uptrender team",
    "Raipur fintech",
  ],
  alternates: {
    canonical: "https://uptrender.in/about",
  },
  openGraph: {
    title: "About Us | Uptrender",
    description:
      "Learn about Uptrender's mission to make Forex and Crypto trading smarter and accessible for everyone.",
    url: "https://uptrender.in/about",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
