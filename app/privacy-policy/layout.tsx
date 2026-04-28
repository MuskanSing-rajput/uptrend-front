import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read Uptrender's privacy policy to understand how we collect, use, store, and protect your personal data and trading information.",
  alternates: {
    canonical: "https://uptrender.in/privacy-policy",
  },
  robots: {
    index: true,
    follow: false,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
