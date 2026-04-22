"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Zap, Copy, Palette, BarChart3, Lock, DollarSign, Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function WhiteLabel() {
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    description: ""
  });
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const revenueRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".whitelabel-title", { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", force3D: true, delay: 0.2 });
      gsap.fromTo(".whitelabel-subtitle", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", force3D: true, delay: 0.4 });
      gsap.fromTo(".whitelabel-content", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", force3D: true, delay: 0.6 });
    }, heroRef);
    
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!featuresRef.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".feature-card").forEach((card, i) => {
        gsap.fromTo(card, 
          { opacity: 0, rotationX: -80, y: 60 }, 
          { opacity: 1, rotationX: 0, y: 0, duration: 1, ease: "back.out", force3D: true, scrollTrigger: { trigger: card, start: "top 80%", end: "top 50%", toggleActions: "play none none reverse" }, delay: i * 0.1 }
        );
      });
    }, featuresRef);
    
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!benefitsRef.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".benefit-item").forEach((item, i) => {
        gsap.fromTo(item, 
          { opacity: 0, x: -30, y: 20 }, 
          { opacity: 1, x: 0, y: 0, duration: 0.8, ease: "power3.out", force3D: true, scrollTrigger: { trigger: item, start: "top 80%", end: "top 50%", toggleActions: "play none none reverse" }, delay: i * 0.1 }
        );
      });
    }, benefitsRef);
    
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!revenueRef.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".revenue-item").forEach((item, i) => {
        gsap.fromTo(item, 
          { opacity: 0, rotationY: 90, z: -200 }, 
          { opacity: 1, rotationY: 0, z: 0, duration: 1, ease: "back.out", force3D: true, scrollTrigger: { trigger: item, start: "top 80%", end: "top 50%", toggleActions: "play none none reverse" }, delay: i * 0.1 }
        );
      });
    }, revenueRef);
    
    return () => ctx.revert();
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const numericValue = value.replace(/[^0-9]/g, "");
      setFormData(prev => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Demo request submitted! We'll contact you soon.");
    setFormData({ name: "", email: "", phone: "", date: "", time: "", description: "" });
    setIsDemoModalOpen(false);
  };

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "#ffffff" }}>
      <style>{`
        .whitelabel-title, .whitelabel-subtitle, .whitelabel-content,
        .feature-card, .benefit-item, .revenue-item, .cta-button, .what-you-get-title {
          will-change: opacity, transform;
        }
        
        .feature-card:hover, .benefit-item:hover, .revenue-item:hover {
          transform: translateY(-8px);
          border-color: rgba(50, 194, 252, 0.4);
        }
      `}</style>

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
            <Link href="/services" className="nav-link">Services</Link>
            <Link href="/#pricing" className="nav-link">Pricing</Link>
            <Link href="/#features" className="nav-link">Features</Link>
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
      <section ref={heroRef} style={{ paddingTop: "140px", paddingBottom: "0px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-200px", left: "-200px", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(50, 194, 252, 0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 60px", position: "relative", zIndex: 1 }}>
          <h1 className="whitelabel-title" style={{ fontSize: "clamp(42px, 5vw, 72px)", fontWeight: 800, lineHeight: 1.05, marginBottom: "24px", opacity: 0 }}>
            White Label <span style={{ background: "linear-gradient(135deg, #32c2fc, #32c2fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Solutions</span><span style={{ color: "#32c2fc" }}>.</span>
          </h1>

          <p className="whitelabel-subtitle" style={{ fontSize: "20px", color: "rgba(255, 255, 255, 0.65)", maxWidth: "800px", lineHeight: 1.7, opacity: 0, marginBottom: "24px" }}>
            Launch Your Own Branded AI-Powered Forex & Crypto Trading Platform
          </p>

          <p className="whitelabel-subtitle" style={{ fontSize: "18px", color: "rgba(255, 255, 255, 0.6)", maxWidth: "800px", lineHeight: 1.8, opacity: 0, marginBottom: "48px" }}>
            Build and scale your own trading business — with your logo, your domain, and your pricing.
          </p>

          <div className="whitelabel-content" style={{ opacity: 0, background: "linear-gradient(135deg, rgba(50, 194, 252, 0.08), rgba(50, 194, 252, 0.08))", border: "1px solid rgba(50, 194, 252, 0.2)", borderRadius: "24px", padding: "48px", marginTop: "48px" }}>
            <h2 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "24px", color: "#32c2fc" }}>Why Choose Uptrender White Label?</h2>
            <p style={{ fontSize: "16px", color: "rgba(255, 255, 255, 0.7)", lineHeight: 1.8, marginBottom: "32px" }}>
              Launch a complete AI trading platform in weeks, not months. Give your users powerful no-code tools while you earn recurring revenue.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section ref={featuresRef} style={{ paddingTop: "60px", paddingBottom: "60px", position: "relative", overflow: "hidden", background: "linear-gradient(180deg, rgba(50, 194, 252, 0.02) 0%, rgba(50, 194, 252, 0.02) 100%)" }}>
        <div style={{ position: "absolute", top: "-200px", right: "-200px", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(50, 194, 252, 0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 60px", position: "relative", zIndex: 1 }}>
          <h2 style={{ fontSize: "42px", fontWeight: 800, textAlign: "center", marginBottom: "50px", background: "linear-gradient(135deg, #32c2fc, #32c2fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            What You Get
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "28px" }}>
            {[
              { icon: Palette, title: "Fully Custom-Branded Dashboard", description: "Web + mobile apps with your logo, colors, and domain" },
              { icon: Zap, title: "AI Strategy Engine", description: "Prompt-based automation with backtesting built-in" },
              { icon: Copy, title: "Copy Trading Infrastructure", description: "Master traders to subscribers real-time replication" },
              { icon: BarChart3, title: "Advanced Admin Panel", description: "Complete control over users, commissions, and payouts" },
              { icon: Lock, title: "Secure Wallet & Billing", description: "Automated subscriptions, commissions, and settlements" },
              { icon: DollarSign, title: "Multi-Market Support", description: "Forex, Crypto, Indices, and Commodities in one platform" }
            ].map((item, i) => {
              const IconComponent = item.icon;
              return (
              <div key={i} className="feature-card" style={{
                opacity: 0,
                background: "linear-gradient(135deg, rgba(50, 194, 252, 0.08), rgba(50, 194, 252, 0.08))",
                border: "1px solid rgba(50, 194, 252, 0.2)",
                borderRadius: "20px",
                padding: "36px",
                transition: "all 0.3s ease",
                perspective: "1000px"
              }}>
                <div style={{ marginBottom: "16px", display: "flex", justifyContent: "flex-start" }}><IconComponent size={40} color="#32c2fc" strokeWidth={1.5} /></div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "12px", color: "#32c2fc" }}>{item.title}</h3>
                <p style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.6)", lineHeight: 1.6 }}>{item.description}</p>
              </div>
            );
            })}
          </div>
        </div>
      </section>

      {/* Key Features (Text) Section */}
      <section ref={benefitsRef} style={{ paddingTop: "60px", paddingBottom: "60px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-200px", left: "-200px", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(50, 194, 252, 0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 60px", position: "relative", zIndex: 1 }}>
          <h2 style={{ fontSize: "42px", fontWeight: 800, marginBottom: "50px", background: "linear-gradient(135deg, #32c2fc, #32c2fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Powerful Features
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px" }}>
            {[
              { title: "Prompt-Based AI Strategy Builder", description: "Users type simple commands like 'Buy EURUSD on breakout with 1:2 risk reward' and the AI builds, backtests, and executes automatically." },
              { title: "Smart Copy Trading System", description: "Master traders create strategies. Subscribers mirror them in real time. You earn commissions on every copied trade." },
              { title: "Fully Branded Experience", description: "Your logo, colours, domain, and design across web and mobile." },
              { title: "Advanced Risk Management", description: "Real-time risk management tools with Portfolio tracking and automated position sizing." },
              { title: "Strategy Marketplace", description: "Generate extra revenue by hosting a marketplace where traders can buy and sell strategies." },
              { title: "Secure API Integrations", description: "Direct integrations with major brokers and exchanges globally." }
            ].map((item, i) => (
              <div key={i} className="benefit-item" style={{
                opacity: 0,
                background: "linear-gradient(135deg, rgba(50, 194, 252, 0.08), rgba(50, 194, 252, 0.08))",
                border: "1px solid rgba(50, 194, 252, 0.15)",
                borderRadius: "16px",
                padding: "28px",
                display: "flex",
                gap: "16px",
                transition: "all 0.3s ease"
              }}>
                <Check size={24} color="#32c2fc" strokeWidth={2} style={{ flexShrink: 0, marginTop: "4px" }} />
                <div>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px", color: "#32c2fc" }}>{item.title}</h3>
                  <p style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.6)", lineHeight: 1.6 }}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Built for Revenue Section */}
      <section ref={revenueRef} style={{ paddingTop: "60px", paddingBottom: "60px", position: "relative", overflow: "hidden", background: "linear-gradient(180deg, rgba(0, 102, 255, 0.05) 0%, rgba(0, 204, 255, 0.05) 100%)" }}>
        <div style={{ position: "absolute", top: "0", right: "-200px", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(0, 102, 255, 0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 60px", position: "relative", zIndex: 1 }}>
          <h2 style={{ fontSize: "42px", fontWeight: 800, textAlign: "center", marginBottom: "16px", color: "#0066ff" }}>
            Built for Revenue
          </h2>
          <p style={{ fontSize: "18px", color: "rgba(255, 255, 255, 0.6)", textAlign: "center", marginBottom: "50px" }}>
            Turn users into paying customers from day one
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "28px", marginBottom: "40px" }}>
            {[
              { title: "Monthly Subscriptions", description: "Recurring revenue from platform access and premium features" },
              { title: "Copy Trading Commissions", description: "Per-trade fees on every copied trade executed" },
              { title: "Strategy Access Fees", description: "Revenue sharing from exclusive strategy access" }
            ].map((item, i) => (
              <div key={i} className="revenue-item" style={{
                opacity: 1,
                background: "linear-gradient(135deg, rgba(0, 102, 255, 0.08), rgba(0, 204, 255, 0.08))",
                border: "1px solid rgba(0, 102, 255, 0.15)",
                borderRadius: "16px",
                padding: "32px",
                textAlign: "center",
                transition: "all 0.3s ease"
              }}>
                <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "12px", color: "#0066ff" }}>{item.title}</h3>
                <p style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.6)", lineHeight: 1.6 }}>{item.description}</p>
              </div>
            ))}
          </div>

          <div style={{ background: "linear-gradient(135deg, rgba(0, 102, 255, 0.1), rgba(0, 204, 255, 0.1))", border: "1px solid rgba(0, 102, 255, 0.2)", borderRadius: "16px", padding: "32px", textAlign: "center" }}>
            <p style={{ fontSize: "16px", color: "rgba(255, 255, 255, 0.8)", fontWeight: 600 }}>
              Many partners recover their investment quickly through these streams.
            </p>
          </div>
        </div>
      </section>

      {/* Why Uptrender Section */}
      <section ref={whyRef} style={{ paddingTop: "60px", paddingBottom: "60px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-200px", right: "-200px", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(0, 102, 255, 0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 60px", position: "relative", zIndex: 1 }}>
          <h2 style={{ fontSize: "42px", fontWeight: 800, textAlign: "center", marginBottom: "50px", background: "linear-gradient(135deg, #0066ff, #00ccff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Why Uptrender?
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "28px" }}>
            {[
              { title: "True AI-First Platform", description: "Not just another tool — built from the ground up with AI automation" },
              { title: "Ready-to-Launch", description: "Skip months of development and launch within weeks" },
              { title: "No Coding Required", description: "Everything is plug-and-play with our easy admin panel" },
              { title: "Market-Built", description: "Specifically designed and tested for the Indian market" },
              { title: "Full Brand Control", description: "You own the brand relationship directly with your users" },
              { title: "24/7 Support", description: "Dedicated technical and business support for your platform" }
            ].map((item, i) => (
              <div key={i} style={{
                background: "linear-gradient(135deg, rgba(0, 102, 255, 0.08), rgba(0, 204, 255, 0.08))",
                border: "1px solid rgba(0, 102, 255, 0.15)",
                borderRadius: "16px",
                padding: "28px",
                display: "flex",
                gap: "16px",
                transition: "all 0.3s ease"
              }}>
                <Check size={24} color="#0066ff" strokeWidth={2} style={{ flexShrink: 0 }} />
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "8px", color: "#0066ff" }}>{item.title}</h3>
                  <p style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.6)", lineHeight: 1.6 }}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "50px", background: "linear-gradient(135deg, rgba(0, 102, 255, 0.1), rgba(0, 204, 255, 0.1))", border: "1px solid rgba(0, 102, 255, 0.2)", borderRadius: "16px", padding: "40px", textAlign: "center" }}>
            <p style={{ fontSize: "18px", color: "rgba(255, 255, 255, 0.8)", marginBottom: "16px" }}>
              The trading industry is shifting fast toward AI automation and copy trading. This is your chance to own a piece of that growth.
            </p>
            <p style={{ fontSize: "20px", fontWeight: 700, color: "#0066ff" }}>
              Don't just trade the markets. Build the platform others trade on.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} style={{ paddingTop: "60px", paddingBottom: "60px", position: "relative", overflow: "hidden", background: "linear-gradient(180deg, rgba(0, 102, 255, 0.05) 0%, rgba(0, 204, 255, 0.05) 100%)" }}>
        <div style={{ position: "absolute", top: "-200px", left: "50%", transform: "translateX(-50%)", width: "800px", height: "800px", background: "radial-gradient(circle, rgba(0, 102, 255, 0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 60px", position: "relative", zIndex: 1, textAlign: "center" }}>
          <h2 style={{ fontSize: "48px", fontWeight: 800, marginBottom: "24px", background: "linear-gradient(135deg, #0066ff, #00ccff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Ready to launch your own AI Forex & Crypto platform?
          </h2>
          <p style={{ fontSize: "18px", color: "rgba(255, 255, 255, 0.6)", maxWidth: "700px", margin: "0 auto 48px", lineHeight: 1.8 }}>
            Join the revolution in AI-powered trading. Launch in weeks with full technical and business support.
          </p>
          
          <div style={{ display: "flex", gap: "24px", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="cta-button"
              style={{
                opacity: 1,
                display: "inline-block",
                background: "linear-gradient(135deg, #0066ff, #0052cc)",
                color: "#ffffff",
                padding: "16px 48px",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: 700,
                border: "none",
                textDecoration: "none",
                transition: "all 0.3s ease",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, { scale: 1.05, boxShadow: "0 20px 40px rgba(0, 102, 255, 0.3)", duration: 0.3, overwrite: "auto" });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, { scale: 1, boxShadow: "0 0px 0px rgba(0, 102, 255, 0)", duration: 0.3, overwrite: "auto" });
              }}
            >
              Schedule a Demo
            </button>
            <a href="/contact" className="cta-button" style={{
              opacity: 1,
              display: "inline-block",
              background: "transparent",
              color: "#0066ff",
              padding: "16px 48px",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: 700,
              textDecoration: "none",
              border: "2px solid rgba(0, 102, 255, 0.4)",
              transition: "all 0.3s ease",
              cursor: "pointer"
            }} onMouseEnter={(e) => {
              gsap.to(e.currentTarget, { background: "rgba(0, 102, 255, 0.1)", borderColor: "rgba(0, 102, 255, 0.8)", scale: 1.05, duration: 0.3, overwrite: "auto" });
            }} onMouseLeave={(e) => {
              gsap.to(e.currentTarget, { background: "transparent", borderColor: "rgba(0, 102, 255, 0.4)", scale: 1, duration: 0.3, overwrite: "auto" });
            }}>
              Get Pricing Details
            </a>
          </div>
        </div>
      </section>

      {/* Demo Modal */}
      {isDemoModalOpen && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.7)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
          padding: "20px"
        }} onClick={() => setIsDemoModalOpen(false)}>
          <div style={{
            background: "linear-gradient(135deg, rgba(10, 10, 10, 0.95), rgba(15, 10, 30, 0.95))",
            border: "1px solid rgba(0, 102, 255, 0.3)",
            borderRadius: "24px",
            padding: "48px",
            maxWidth: "500px",
            width: "100%",
            maxHeight: "90vh",
            overflowY: "auto",
            boxShadow: "0 20px 60px rgba(0, 102, 255, 0.1)"
          }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontSize: "32px", fontWeight: 800, marginBottom: "12px", background: "linear-gradient(135deg, #0066ff, #00ccff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Schedule a Demo
            </h2>
            <p style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.6)", marginBottom: "32px" }}>
              Let us show you how to launch your white label platform
            </p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "8px", color: "#0066ff" }}>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  placeholder="Your full name"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(0, 102, 255, 0.2)",
                    borderRadius: "12px",
                    color: "#ffffff",
                    fontSize: "14px",
                    outline: "none",
                    transition: "all 0.3s ease",
                    boxSizing: "border-box"
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(0, 102, 255, 0.6)";
                    e.target.style.background = "rgba(0, 102, 255, 0.05)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(0, 102, 255, 0.2)";
                    e.target.style.background = "rgba(255, 255, 255, 0.05)";
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "8px", color: "#0066ff" }}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                  placeholder="your@email.com"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(0, 102, 255, 0.2)",
                    borderRadius: "12px",
                    color: "#ffffff",
                    fontSize: "14px",
                    outline: "none",
                    transition: "all 0.3s ease",
                    boxSizing: "border-box"
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(0, 102, 255, 0.6)";
                    e.target.style.background = "rgba(0, 102, 255, 0.05)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(0, 102, 255, 0.2)";
                    e.target.style.background = "rgba(255, 255, 255, 0.05)";
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "8px", color: "#0066ff" }}>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  required
                  placeholder="91XXXXXXXXXX"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(0, 102, 255, 0.2)",
                    borderRadius: "12px",
                    color: "#ffffff",
                    fontSize: "14px",
                    outline: "none",
                    transition: "all 0.3s ease",
                    boxSizing: "border-box"
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(0, 102, 255, 0.6)";
                    e.target.style.background = "rgba(0, 102, 255, 0.05)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(0, 102, 255, 0.2)";
                    e.target.style.background = "rgba(255, 255, 255, 0.05)";
                  }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "8px", color: "#0066ff" }}>Preferred Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleFormChange}
                    required
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(0, 102, 255, 0.2)",
                      borderRadius: "12px",
                      color: "#ffffff",
                      fontSize: "14px",
                      outline: "none",
                      transition: "all 0.3s ease",
                      boxSizing: "border-box",
                      colorScheme: "dark"
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(0, 102, 255, 0.6)";
                      e.target.style.background = "rgba(0, 102, 255, 0.05)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(0, 102, 255, 0.2)";
                      e.target.style.background = "rgba(255, 255, 255, 0.05)";
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "8px", color: "#0066ff" }}>Preferred Time</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleFormChange}
                    required
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(0, 102, 255, 0.2)",
                      borderRadius: "12px",
                      color: "#ffffff",
                      fontSize: "14px",
                      outline: "none",
                      transition: "all 0.3s ease",
                      boxSizing: "border-box",
                      colorScheme: "dark"
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(0, 102, 255, 0.6)";
                      e.target.style.background = "rgba(0, 102, 255, 0.05)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(0, 102, 255, 0.2)";
                      e.target.style.background = "rgba(255, 255, 255, 0.05)";
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "8px", color: "#0066ff" }}>Description (Optional)</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  placeholder="Tell us about your white label platform interests..."
                  rows={4}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(0, 102, 255, 0.2)",
                    borderRadius: "12px",
                    color: "#ffffff",
                    fontSize: "14px",
                    outline: "none",
                    transition: "all 0.3s ease",
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                    resize: "vertical"
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(0, 102, 255, 0.6)";
                    e.target.style.background = "rgba(0, 102, 255, 0.05)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(0, 102, 255, 0.2)";
                    e.target.style.background = "rgba(255, 255, 255, 0.05)";
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  background: "linear-gradient(135deg, #0066ff, #0052cc)",
                  color: "#ffffff",
                  padding: "14px 32px",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  marginTop: "16px"
                }}
                onMouseEnter={(e) => {
                  const btn = e.currentTarget as HTMLButtonElement;
                  btn.style.transform = "scale(1.05)";
                  btn.style.boxShadow = "0 20px 40px rgba(0, 102, 255, 0.3)";
                }}
                onMouseLeave={(e) => {
                  const btn = e.currentTarget as HTMLButtonElement;
                  btn.style.transform = "scale(1)";
                  btn.style.boxShadow = "none";
                }}
              >
                Schedule Demo
              </button>

              <button
                type="button"
                onClick={() => setIsDemoModalOpen(false)}
                style={{
                  background: "transparent",
                  color: "#0066ff",
                  padding: "12px 32px",
                  borderRadius: "12px",
                  fontSize: "14px",
                  fontWeight: 600,
                  border: "1px solid rgba(0, 102, 255, 0.4)",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  const btn = e.currentTarget as HTMLButtonElement;
                  btn.style.background = "rgba(0, 102, 255, 0.1)";
                  btn.style.borderColor = "rgba(0, 102, 255, 0.8)";
                }}
                onMouseLeave={(e) => {
                  const btn = e.currentTarget as HTMLButtonElement;
                  btn.style.background = "transparent";
                  btn.style.borderColor = "rgba(0, 102, 255, 0.4)";
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ background: "#05070f", padding: "80px 60px 60px", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "60px", marginBottom: "48px", paddingBottom: "48px", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
            <div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "20px", color: "#ffffff" }}>Company</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  { name: "About", href: "/about" },
                  { name: "Services", href: "/services" },
                  { name: "Blog", href: "/blog" },
                  { name: "Contact", href: "/contact" }
                ].map((item, i) => (
                  <li key={i} style={{ marginBottom: "12px" }}>
                    <Link href={item.href} style={{ color: "rgba(255, 255, 255, 0.5)", textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "20px", color: "#ffffff" }}>Legal</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  { name: "Privacy Policy", href: "/privacy-policy" },
                  { name: "Terms & Conditions", href: "/terms-and-conditions" },
                  { name: "Refund Policy", href: "/refund-policy" }
                ].map((item, i) => (
                  <li key={i} style={{ marginBottom: "12px" }}>
                    <Link href={item.href} style={{ color: "rgba(255, 255, 255, 0.5)", textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "20px", color: "#ffffff" }}>Resources</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  { name: "Partnership", href: "/partnership" },
                  { name: "White Label", href: "/white-label" },
                  { name: "FAQ", href: "/faq" }
                ].map((item, i) => (
                  <li key={i} style={{ marginBottom: "12px" }}>
                    <Link href={item.href} style={{ color: "rgba(255, 255, 255, 0.5)", textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "20px", color: "#ffffff" }}>Social</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                <li style={{ marginBottom: "12px" }}>
                  <a href="https://www.facebook.com/uptrender" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255, 255, 255, 0.5)", textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }}>Facebook</a>
                </li>
                <li style={{ marginBottom: "12px" }}>
                  <a href="https://www.instagram.com/uptrender.in/" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255, 255, 255, 0.5)", textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }}>Instagram</a>
                </li>
                <li style={{ marginBottom: "12px" }}>
                  <a href="https://t.me/uptrender1" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255, 255, 255, 0.5)", textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }}>Telegram</a>
                </li>
              </ul>
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "rgba(255, 255, 255, 0.4)", fontSize: "14px" }}>
              © 2026 Uptrender. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
