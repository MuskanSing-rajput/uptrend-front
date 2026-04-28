import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "Understand Uptrender's refund and cancellation policy for subscriptions and platform services.",
  alternates: {
    canonical: "https://uptrender.in/refund-policy",
  },
  robots: {
    index: true,
    follow: false,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
