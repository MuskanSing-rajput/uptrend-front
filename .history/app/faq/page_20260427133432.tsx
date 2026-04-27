"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FAQ() {
      const [expandedFAQ, setExpandedFAQ] = useState<number | null>(0);
  const heroRef = useRef<HTMLDivElement>(null);

  const faqItems = [
    {
      question: "What is Uptrender?",
      answer: "Uptrender is an AI-powered trading platform that provides advanced tools, real-time market sentiment analysis, and automated trading strategies for Forex, Crypto, and other asset classes."
    },
    {
      question: "Is Uptrender regulated?",
      answer: "Yes, Uptrender operates through multiple regulated entities across different jurisdictions, including South Africa (FSP), Mauritius (FSC), and the UAE (CMA)."
    },
    {
      question: "What is the minimum deposit?",
      answer: "The minimum deposit varies depending on the platform and account type. Please contact our support team for specific details about the account you're interested in."
    },
    {
      question: "Does Uptrender offer a demo account?",
      answer: "Yes, we offer demo accounts for new users to practice trading without real money. This allows you to familiarize yourself with the platform before trading with real funds."
    },
    {
      question: "How do I withdraw my funds?",
      answer: "You can withdraw funds through multiple methods including bank transfers, e-wallets, and cryptocurrencies. The withdrawal process is secure and typically takes 1-3 business days."
    },
    {
      question: "What are the trading fees?",
      answer: "Trading fees vary by account type and trading volume. Please visit our pricing page or contact our support team for details on fees and spreads."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we use bank-level security with SSL encryption and comply with international data protection regulations. Your personal and financial information is always protected."
    },
    {
      question: "How can I become a partner?",
      answer: "We offer partnership and white label solutions. Visit our Partnership page or contact us for more information about business opportunities."
    }
  ];

  
  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".faq-title", { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", force3D: true, delay: 0.2 });
      gsap.fromTo(".faq-subtitle", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", force3D: true, delay: 0.4 });
      gsap.fromTo(".faq-item", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out", force3D: true, delay: 0.6, scrollTrigger: { trigger: ".faq-items", start: "top 80%", toggleActions: "play none none none" } });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "#ffffff" }}>
      {/* Header */}
      

      {/* Hero Section */}
      <section ref={heroRef} style={{ paddingTop: "140px", paddingBottom: "100px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-200px", left: "-200px", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(0, 240, 255, 0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div className="faq-container" style={{ maxWidth: "900px", margin: "0 auto", padding: "0 60px", position: "relative", zIndex: 1 }}>
          <h1 className="faq-title" style={{ fontSize: "clamp(42px, 5vw, 64px)", fontWeight: 800, lineHeight: 1.05, marginBottom: "24px", opacity: 0, textAlign: "center" }}>
            Frequently Asked <span style={{ background: "linear-gradient(135deg, #00f0ff, #a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Questions</span><span style={{ color: "#00f0ff" }}>.</span>
          </h1>

          <p className="faq-subtitle" style={{ fontSize: "18px", color: "rgba(255, 255, 255, 0.65)", maxWidth: "600px", lineHeight: 1.7, opacity: 0, marginBottom: "64px", textAlign: "center", margin: "0 auto 64px" }}>
            Find answers to common questions about Uptrender, trading, accounts, and more.
          </p>

          <div className="faq-items" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {faqItems.map((item, i) => (
              <div
                key={i}
                className="faq-item"
                style={{
                  opacity: 0,
                  background: "linear-gradient(135deg, rgba(0, 240, 255, 0.06), rgba(139, 92, 246, 0.06))",
                  border: `1px solid ${expandedFAQ === i ? "rgba(0, 240, 255, 0.4)" : "rgba(0, 240, 255, 0.15)"}`,
                  borderRadius: "16px",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  cursor: "pointer"
                }}
                onClick={() => setExpandedFAQ(expandedFAQ === i ? null : i)}
              >
                <div style={{ padding: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#00f0ff", margin: 0 }}>
                    {item.question}
                  </h3>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#00f0ff"
                    strokeWidth="2"
                    style={{
                      transform: expandedFAQ === i ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                      flexShrink: 0,
                      marginLeft: "16px"
                    }}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>

                {expandedFAQ === i && (
                  <div style={{ padding: "0 24px 24px 24px", borderTop: "1px solid rgba(0, 240, 255, 0.2)" }}>
                    <p style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.65)", lineHeight: 1.8, margin: 0 }}>
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ marginTop: "64px", textAlign: "center" }}>
            <p style={{ fontSize: "16px", color: "rgba(255, 255, 255, 0.65)", marginBottom: "24px" }}>
              Didn't find your answer?
            </p>
            <Link href="/contact" style={{ display: "inline-block", background: "linear-gradient(135deg, #00f0ff, #00b8d4)", color: "#0a0a0a", padding: "16px 40px", borderRadius: "12px", fontSize: "16px", fontWeight: 700, textDecoration: "none", transition: "all 0.3s ease" }}>
              Contact Support
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      
    </div>
  );
}
