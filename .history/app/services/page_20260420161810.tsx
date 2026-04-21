"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "ai-trading-signals",
    title: "AI Trading Signals",
    category: "TRADING",
    color: "#00f0ff",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
    ),
    shortDesc: "Get real-time, AI-powered trading signals with precision accuracy.",
    longDesc: "Our advanced algorithms analyze market patterns, sentiment, and technical indicators to deliver actionable insights. Receive buy/sell signals across Forex and Crypto markets with entry points, stop-loss levels, and take-profit targets — all powered by machine learning models trained on millions of data points.",
    features: ["Real-time signal delivery", "Multi-timeframe analysis", "Risk/reward ratios", "Win-rate tracking", "Push notifications", "Historical performance data"],
    tags: ["Real-time", "AI-Powered", "Accurate"],
  },
  {
    id: "automated-trading",
    title: "Automated Trading",
    category: "AUTOMATION",
    color: "#a855f7",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
    ),
    shortDesc: "Set your strategy and let our bots execute trades 24/7.",
    longDesc: "Configure risk parameters, profit targets, and stop-losses while our system monitors markets around the clock. Our automated trading bots use sophisticated algorithms to execute trades at lightning speed, eliminating emotional decision-making and ensuring you never miss a profitable opportunity.",
    features: ["24/7 automated execution", "Custom strategy builder", "Backtesting engine", "Risk management tools", "Multiple bot strategies", "Performance dashboard"],
    tags: ["24/7 Active", "Configurable", "Smart Bots"],
  },
  {
    id: "portfolio-management",
    title: "Portfolio Management",
    category: "PORTFOLIO",
    color: "#10b981",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" /><path d="M3 5v14a2 2 0 0 0 2 2h16v-5" /><path d="M18 12a2 2 0 0 0 0 4h4v-4h-4z" /></svg>
    ),
    shortDesc: "Track and optimize your entire portfolio with intelligent diversification tools.",
    longDesc: "Get detailed analytics, performance metrics, and AI-driven recommendations to balance your portfolio for maximum returns with minimized risk. Our intelligent diversification engine helps you spread across asset classes, currencies, and strategies — all from one unified dashboard.",
    features: ["Real-time portfolio tracking", "Asset allocation insights", "Profit/Loss analytics", "Diversification scoring", "Performance benchmarking", "Tax reporting tools"],
    tags: ["Analytics", "Optimization", "Insights"],
  },
  {
    id: "risk-analysis",
    title: "Risk Analysis",
    category: "SECURITY",
    color: "#f59e0b",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
    ),
    shortDesc: "Advanced risk assessment tools that analyze market volatility and exposure.",
    longDesc: "Protect your capital with comprehensive risk reports, real-time alerts, and position-sizing calculators. Our risk analysis engine monitors your entire portfolio for exposure, correlation risks, and market volatility — helping you make informed decisions before entering any trade.",
    features: ["Volatility monitoring", "Position sizing calculator", "Drawdown alerts", "Correlation matrix", "Exposure analysis", "Risk-reward optimizer"],
    tags: ["Protection", "Alerts", "Analysis"],
  },
  {
    id: "market-analytics",
    title: "Market Analytics",
    category: "ANALYTICS",
    color: "#ef4444",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
    ),
    shortDesc: "Deep dive into market trends with our comprehensive analytics dashboard.",
    longDesc: "Access historical data, predictive models, and sentiment analysis to understand market dynamics. Our analytics platform combines fundamental analysis, technical charting, and social sentiment data to give you a 360-degree view of any market — helping you spot opportunities before the crowd.",
    features: ["Sentiment analysis", "Technical indicators", "Fundamental data", "Predictive models", "Market heatmaps", "Economic calendar"],
    tags: ["Trends", "Predictions", "Sentiment"],
  },
  {
    id: "copy-trading",
    title: "Copy Trading",
    category: "SOCIAL",
    color: "#ec4899",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>
    ),
    shortDesc: "Follow and automatically replicate trades from top-performing traders.",
    longDesc: "Browse verified profiles, analyze performance history, and mirror strategies with customizable settings. Our smart copy trading feature lets you allocate funds to multiple lead traders, set risk limits, and automatically replicate their positions in real-time — perfect for beginners and busy professionals.",
    features: ["Verified trader profiles", "Performance leaderboard", "Customizable risk limits", "Real-time replication", "Multi-trader following", "Earnings analytics"],
    tags: ["Social", "Replicate", "Verified"],
  },
  {
    id: "educational-resources",
    title: "Educational Resources",
    category: "EDUCATION",
    color: "#8b5cf6",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
    ),
    shortDesc: "Access a comprehensive library of trading courses, webinars, and tutorials.",
    longDesc: "From beginner basics to advanced strategies, continuously improve your trading skills with our curated educational content. Includes video courses, interactive quizzes, live webinars with expert traders, downloadable guides, and a structured learning path that takes you from novice to professional.",
    features: ["Video courses", "Live webinars", "Interactive quizzes", "Expert mentorship", "Certification program", "Community forums"],
    tags: ["Courses", "Webinars", "Tutorials"],
  },
  {
    id: "expert-support",
    title: "24/7 Expert Support",
    category: "SUPPORT",
    color: "#06b6d4",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
    ),
    shortDesc: "Round-the-clock assistance from our dedicated team of trading experts.",
    longDesc: "Get technical help, trading advice, or account support whenever you need it. Our multilingual support team is available 24/7 via live chat, email, and phone — ensuring you're never left without guidance. Whether it's a platform question or a trading strategy discussion, our experts are here for you.",
    features: ["24/7 live chat", "Email support", "Phone assistance", "Multilingual team", "Priority for premium", "Knowledge base"],
    tags: ["24/7", "Expert Help", "Dedicated"],
  },
];

export default function ServicesPage() {
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setNavVisible(false);
      } else {
        setNavVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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
      <header className={`navbar ${navVisible ? "navbar-visible" : "navbar-hidden"}`}>
        <div className="navbar-inner">
          <Link href="/" className="logo-wrap" style={{ textDecoration: "none" }}>
            <span className="logo-mark" aria-label="uptrender">
              <span className="logo-v">up</span>
              <span className="logo-t">trender</span>
              <span className="logo-dot"></span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center nav-menu">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/about" className="nav-link">About Us</Link>
            <Link href="/#features" className="nav-link">Features</Link>
            <Link href="/services" className="nav-link" style={{ color: "#00f0ff" }}>Services</Link>
            <Link href="/blog" className="nav-link">Blog</Link>
            <Link href="/contact" className="nav-link">Contact Us</Link>
          </nav>
          <div className="flex-1" />
          <div className="flex items-center gap-6">
            <a href="https://app.uptrender.in/auth/register" className="btn-primary">Trade Now</a>
            <a href="https://app.uptrender.in/auth/login" className="nav-link">Login</a>
          </div>
        </div>
      </header>

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
              <div key={service.id} id={service.id} className="service-detail-card" style={{ display: "grid", gridTemplateColumns: index % 2 === 0 ? "1fr 1.2fr" : "1.2fr 1fr", gap: "0", background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "24px", overflow: "hidden", transition: "all 0.4s ease", opacity: 0 }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${service.color}40`; e.currentTarget.style.boxShadow = `0 20px 60px ${service.color}10`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)"; e.currentTarget.style.boxShadow = "none"; }}>

                {/* Image/Visual Side */}
                <div style={{ order: index % 2 === 0 ? 0 : 1, background: `linear-gradient(135deg, ${service.color}08 0%, ${service.color}15 100%)`, padding: "60px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", position: "relative", minHeight: "400px" }}>
                  <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "200px", height: "200px", background: `radial-gradient(circle, ${service.color}15 0%, transparent 70%)`, pointerEvents: "none" }} />
                  <div style={{ width: "100px", height: "100px", background: `${service.color}15`, borderRadius: "24px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "32px", border: `1px solid ${service.color}30` }}>
                    {service.icon}
                  </div>
                  <span style={{ background: `${service.color}20`, color: service.color, padding: "6px 16px", borderRadius: "50px", fontSize: "12px", fontWeight: 700, letterSpacing: "1.5px", marginBottom: "16px" }}>{service.category}</span>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center" }}>
                    {service.tags.map((tag, ti) => (
                      <span key={ti} style={{ background: "rgba(255, 255, 255, 0.06)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "50px", padding: "6px 14px", fontSize: "12px", color: "rgba(255, 255, 255, 0.6)" }}>{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Content Side */}
                <div style={{ order: index % 2 === 0 ? 1 : 0, padding: "60px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
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
      <footer style={{ background: "#05070f", padding: "40px 0", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 60px", textAlign: "center" }}>
          <p style={{ color: "rgba(255, 255, 255, 0.4)", fontSize: "14px" }}>
            © 2026 Uptrender. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
