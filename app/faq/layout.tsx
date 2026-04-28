import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQs – Frequently Asked Questions",
  description:
    "Find answers to common questions about the Uptrender trading platform – account setup, wallet & payments, copy trading, AI strategies, broker connections, and more.",
  keywords: [
    "Uptrender FAQ",
    "trading platform questions",
    "copy trading FAQ",
    "algo trading help",
    "broker API questions",
  ],
  alternates: {
    canonical: "https://uptrender.in/faq",
  },
  openGraph: {
    title: "FAQs – Frequently Asked Questions | Uptrender",
    description:
      "Find answers to common questions about Uptrender – accounts, wallet, copy trading, AI strategies, and more.",
    url: "https://uptrender.in/faq",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Uptrender trading platform?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Uptrender is an advanced all-in-one online trading platform that allows users to trade in the Indian stock market, Forex market, and Crypto market using a single dashboard. Users can trade manually, use automated strategies, or copy expert traders.",
      },
    },
    {
      "@type": "Question",
      name: "Is Uptrender suitable for beginners?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Uptrender is specially designed to be beginner-friendly. Features like copy trading, automated strategies, and a strategy marketplace allow beginners to participate in trading by following experts without needing technical knowledge.",
      },
    },
    {
      "@type": "Question",
      name: "Is Uptrender a broker?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, Uptrender is not a broker. It is a trading automation and management platform. All trades are executed through your connected broker account using secure API connections. Uptrender does not hold your funds or execute trades independently.",
      },
    },
    {
      "@type": "Question",
      name: "Which markets are supported on Uptrender?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Uptrender supports multiple markets including the Indian stock market (equity and options), Forex trading, and Cryptocurrency trading, allowing users to diversify their trading activities from one platform.",
      },
    },
    {
      "@type": "Question",
      name: "How do I add money to my wallet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can add funds by clicking the Add Funds button in your wallet section. Uptrender supports multiple payment methods like UPI, Razorpay, and crypto wallets. Once payment is successful, the wallet balance is updated automatically.",
      },
    },
    {
      "@type": "Question",
      name: "Does Uptrender guarantee profit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, Uptrender does not guarantee profits. Trading in financial markets always involves risk. While Uptrender provides powerful tools, strategies, and automation, profits depend on market conditions and trading decisions.",
      },
    },
    {
      "@type": "Question",
      name: "Is my data safe on Uptrender?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, user data security is a top priority. All sensitive information such as login credentials and broker API details are encrypted. Uptrender follows industry-standard security practices to protect user data, trading information, and transactions.",
      },
    },
    {
      "@type": "Question",
      name: "Can I access Uptrender from mobile?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Uptrender is a web-based trading platform that works smoothly on mobile browsers as well as desktop systems. You do not need to install any application — just log in through your browser.",
      },
    },
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
