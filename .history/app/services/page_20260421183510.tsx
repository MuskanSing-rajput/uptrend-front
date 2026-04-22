"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "multi-market-dashboard",
    title: "Multi-Market Dashboard",
    category: "UNIFIED",
    color: "#00f0ff",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
    ),
    shortDesc: "Monitor major Forex pairs and top Crypto assets side-by-side with live prices.",
    longDesc: "Monitor major Forex pairs and top Crypto assets side-by-side with live prices. Switch between markets instantly - no tabs, no switching platforms, just one powerful dashboard.",
    features: ["Live price updates", "Multi-market view", "Side-by-side comparison", "Instant switching", "No platform switching", "Unified interface"],
    tags: ["Unified", "Real-Time", "Multi-Market"],
  },
  {
    id: "ai-strategy-builder",
    title: "AI Strategy Builder",
    category: "AI BUILDER",
    color: "#a855f7",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2"><path d="M12 2v20M2 12h20" /><circle cx="12" cy="12" r="10" /></svg>
    ),
    shortDesc: "Type what you want in plain English, and our AI instantly creates strategies.",
    longDesc: "Type what you want in plain English, and our AI instantly creates, backtests, and refines the complete strategy for you. Perfect for scalping XAUUSD or swing trading BTC.",
    features: ["Plain English input", "AI creation", "Autobactesting", "Strategy refinement", "Multi-asset support", "Instant deployment"],
    tags: ["No-Code", "AI-Powered", "Instant"],
  },
  {
    id: "ai-trade-assistant",
    title: "AI Trade Assistant",
    category: "ANALYSIS",
    color: "#10b981",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" /><path d="M12 6v6l4.25 2.52" /></svg>
    ),
    shortDesc: "Ask for market sentiment on any Forex pair or Crypto coin instantly.",
    longDesc: "Pick any Forex pair or Crypto coin and ask for market sentiment. Our AI scans thousands of global news sources, analyst reports, and on-chain data in seconds, then executes the trade at your chosen risk level - low, moderate, or high.",
    features: ["News scanning", "Analyst reports", "On-chain data", "Risk levels", "Instant execution", "Sentiment analysis"],
    tags: ["Analysis", "Execution", "Research"],
  },
  {
    id: "backtesting-engine",
    title: "Advanced Backtesting Engine",
    category: "BACKTEST",
    color: "#f59e0b",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><polyline points="13 2 13 9 20 9" /></svg>
    ),
    shortDesc: "Run strategies on years of real historical Forex and Crypto data.",
    longDesc: "Run your strategies on years of real historical Forex and Crypto data. See exact win rate, drawdown, and profit potential before you put a single rupee on the line.",
    features: ["Historical data", "Win rate tracking", "Drawdown analysis", "Profit potential", "Risk assessment", "Multi-year backtests"],
    tags: ["Historical", "Results", "Data"],
  },
  {
    id: "smart-copy-trading",
    title: "Smart Copy Trading",
    category: "COPY TRADING",
    color: "#ec4899",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>
    ),
    shortDesc: "Copy trades from verified master traders in real time.",
    longDesc: "Copy trades from verified master traders in Forex and Crypto in real time. Set up Master & Child accounts with full control over risk and allocation - earn while you sleep.",
    features: ["Verified traders", "Real-time copying", "Master accounts", "Child accounts", "Risk control", "Allocation management"],
    tags: ["Master", "Child", "Copy"],
  },
  {
    id: "paper-live-trading",
    title: "Paper / Live Trading",
    category: "TRADING",
    color: "#06b6d4",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
    ),
    shortDesc: "Test every strategy in paper trading first, then switch to live with one click.",
    longDesc: "Test every strategy in a full paper trading environment first. When you're confident, switch to live trading with one click — zero downtime.",
    features: ["Paper trading", "Live trading", "One-click switching", "Zero downtime", "Strategy testing", "Confidence building"],
    tags: ["Paper", "Live", "Seamless"],
  },
  {
    id: "broker-api-integration",
    title: "Broker API Integration",
    category: "INTEGRATION",
    color: "#8b5cf6",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
    ),
    shortDesc: "Secure API connections to your favorite Forex brokers and Crypto exchanges.",
    longDesc: "Secure, bank-level API connections to your favorite Forex brokers and leading Crypto exchanges. Your funds always stay safely in your own accounts.",
    features: ["Bank-level security", "Forex brokers", "Crypto exchanges", "Secure connections", "Own accounts", "Full control"],
    tags: ["API", "Secure", "Brokers"],
  },
  {
    id: "strategy-marketplace",
    title: "Strategy Marketplace",
    category: "MARKETPLACE",
    color: "#ef4444",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
    ),
    shortDesc: "Browse proven algo strategies from top Indian traders.",
    longDesc: "Browse proven algo strategies from top Indian traders or publish your own. A complete marketplace built only for Forex and Crypto — save time and discover what actually works.",
    features: ["Proven strategies", "Top traders", "Publish own", "Forex focused", "Crypto support", "Community tested"],
    tags: ["Strategies", "Community", "Marketplace"],
  },
];

export default function ServicesPage() {
      const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  
  // Hero animations
  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".services-hero-badge", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 });
      gsap.fromTo(".services-hero-title", { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.4 });
      gsap.fromTo(".services-hero-desc", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.6 });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // Grid animations
  useEffect(() => {
    if (!gridRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".service-detail-card", { opacity: 0, y: 60 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ".services-grid", start: "top 85%", toggleActions: "play none none none" },
      });
    }, gridRef);
    return () => ctx.revert();
  }, []);

  // CTA animation
  useEffect(() => {
    if (!ctaRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".services-cta-inner", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".services-cta-inner", start: "top 85%", toggleActions: "play none none none" } });
    }, ctaRef);
    return () => ctx.revert();
  }, []);

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "#ffffff" }}>
      {/* Header */}
      

      {/* Hero Section */}
      <section ref={heroRef} style={{ paddingTop: "140px", paddingBottom: "60px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-200px", right: "-200px", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(0, 240, 255, 0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-100px", left: "-200px", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(168, 85, 247, 0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 60px", textAlign: "center", position: "relative", zIndex: 1 }}>
          <span className="services-hero-badge" style={{ display: "inline-block", background: "linear-gradient(135deg, rgba(0, 240, 255, 0.15), rgba(168, 85, 247, 0.15))", border: "1px solid rgba(0, 240, 255, 0.3)", borderRadius: "50px", padding: "10px 28px", fontSize: "13px", fontWeight: 600, color: "#00f0ff", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "28px", opacity: 0 }}>Our Services</span>

          <h1 className="services-hero-title" style={{ fontSize: "clamp(40px, 5vw, 68px)", fontWeight: 800, lineHeight: 1.05, marginBottom: "24px", opacity: 0 }}>
            Premium Trading<br />
            <span style={{ background: "linear-gradient(135deg, #00f0ff, #a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Solutions</span> for Every Trader<span style={{ color: "#00f0ff" }}>.</span>
          </h1>

          <p className="services-hero-desc" style={{ fontSize: "19px", color: "rgba(255, 255, 255, 0.6)", maxWidth: "700px", margin: "0 auto", lineHeight: 1.7, opacity: 0 }}>
            Discover our comprehensive suite of AI-powered tools and services designed to elevate your trading journey from beginner to professional.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", height: "1px", background: "linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.25), transparent)" }} />

      {/* Services Detail Grid */}
      <section ref={gridRef} style={{ padding: "80px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 60px" }}>
          <div className="services-grid" style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {services.map((service, index) => (
              <div key={service.id} id={service.id} className="service-detail-card" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "0", background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "24px", overflow: "hidden", transition: "all 0.4s ease", opacity: 0 }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${service.color}40`; e.currentTarget.style.boxShadow = `0 20px 60px ${service.color}10`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)"; e.currentTarget.style.boxShadow = "none"; }}>

                {/* Image/Visual Side */}
                <div style={{ order: 0, background: `linear-gradient(135deg, ${service.color}08 0%, ${service.color}15 100%)`, padding: "20px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", position: "relative", minHeight: "400px" }}>
                  <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "200px", height: "200px", background: `radial-gradient(circle, ${service.color}15 0%, transparent 70%)`, pointerEvents: "none" }} />
                  <div style={{ width: "100%", height: "100%", borderRadius: "16px", overflow: "hidden", boxShadow: `0 10px 40px ${service.color}20`, border: `1px solid ${service.color}30` }}>
                    <img 
                      src="/service1.jpg" 
                      alt={service.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                    />
                  </div>
                </div>

                {/* Content Side */}
                <div style={{ order: 1, padding: "60px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                    <span style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.3)", fontWeight: 600 }}>0{index + 1} / 08</span>
                  </div>
                  <h2 style={{ fontSize: "36px", fontWeight: 700, marginBottom: "16px", lineHeight: 1.2 }}>{service.title}</h2>
                  <p style={{ fontSize: "16px", color: "rgba(255, 255, 255, 0.6)", lineHeight: 1.8, marginBottom: "28px" }}>{service.longDesc}</p>

                  {/* Features List */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "32px" }}>
                    {service.features.map((feature, fi) => (
                      <div key={fi} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={service.color} strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                        <span style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.7)" }}>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <a href="https://app.uptrender.in/auth/register" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: `${service.color}15`, color: service.color, padding: "12px 24px", borderRadius: "10px", fontSize: "15px", fontWeight: 600, textDecoration: "none", border: `1px solid ${service.color}30`, transition: "all 0.3s ease", alignSelf: "flex-start" }}>
                    Get Started
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} style={{ padding: "100px 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0, 240, 255, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(0, 240, 255, 0.06) 0%, transparent 60%)", pointerEvents: "none" }} />

        <div className="services-cta-inner" style={{ maxWidth: "800px", margin: "0 auto", padding: "0 60px", textAlign: "center", position: "relative", zIndex: 1, opacity: 0 }}>
          <h2 style={{ fontSize: "48px", fontWeight: 800, marginBottom: "20px", lineHeight: 1.15 }}>
            Ready to Experience<br />Premium Trading?<span style={{ color: "#00f0ff" }}>.</span>
          </h2>
          <p style={{ fontSize: "18px", color: "rgba(255, 255, 255, 0.6)", marginBottom: "40px", lineHeight: 1.7 }}>
            Start with a free account and unlock the full power of Uptrender&apos;s professional tools.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
            <a href="https://app.uptrender.in/auth/register" style={{ display: "inline-block", background: "linear-gradient(135deg, #00f0ff, #00b8d4)", color: "#0a0a0a", padding: "16px 40px", borderRadius: "12px", fontSize: "16px", fontWeight: 700, textDecoration: "none", transition: "all 0.3s ease", boxShadow: "0 8px 30px rgba(0, 240, 255, 0.25)" }}>
              Start Trading Free
            </a>
            <Link href="/contact" style={{ display: "inline-block", background: "transparent", color: "#00f0ff", padding: "16px 40px", borderRadius: "12px", fontSize: "16px", fontWeight: 700, textDecoration: "none", border: "1px solid rgba(0, 240, 255, 0.4)", transition: "all 0.3s ease" }}>
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      
    </div>
  );
}
