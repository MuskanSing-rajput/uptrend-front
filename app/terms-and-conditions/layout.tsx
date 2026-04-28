import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Review the terms and conditions governing the use of the Uptrender trading platform, including account registration, trading risks, and user responsibilities.",
  alternates: {
    canonical: "https://uptrender.in/terms-and-conditions",
  },
  robots: {
    index: true,
    follow: false,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
