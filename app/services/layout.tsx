import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trading Services & Features",
  description:
    "Explore Uptrender's full suite of AI-powered trading tools: AI Strategy Builder, Copy Trading, Multi-Market Dashboard, Backtesting Engine, Risk Manager, and more.",
  keywords: [
    "AI strategy builder",
    "copy trading",
    "backtesting engine",
    "multi-market dashboard",
    "algo trading features",
    "forex crypto trading tools",
  ],
  alternates: {
    canonical: "https://uptrender.in/services",
  },
  openGraph: {
    title: "Trading Services & Features | Uptrender",
    description:
      "Explore Uptrender's full suite: AI Strategy Builder, Copy Trading, Multi-Market Dashboard, Backtesting Engine, and more.",
    url: "https://uptrender.in/services",
  },
};

const serviceListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Uptrender Trading Services",
  url: "https://uptrender.in/services",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "AI Strategy Builder",
      url: "https://uptrender.in/services#ai-strategy-builder",
      description:
        "Build automated trading strategies using plain-English prompts. No coding required.",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Copy Trading",
      url: "https://uptrender.in/services#copy-trading",
      description:
        "Automatically mirror top-performing traders' strategies in real time.",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Multi-Market Dashboard",
      url: "https://uptrender.in/services#multi-market-dashboard",
      description:
        "Monitor Forex pairs and Crypto assets side-by-side with live prices in one unified dashboard.",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Advanced Backtesting Engine",
      url: "https://uptrender.in/services#backtesting-engine",
      description:
        "Test trading strategies against historical market data before going live.",
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "Strategy Marketplace",
      url: "https://uptrender.in/services#strategy-marketplace",
      description:
        "Buy, sell, or subscribe to proven trading strategies from expert traders.",
    },
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceListSchema) }}
      />
      {children}
    </>
  );
}
