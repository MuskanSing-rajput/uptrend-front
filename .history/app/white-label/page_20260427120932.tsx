"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Zap, Copy, Palette, BarChart3, Lock, DollarSign, Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function WhiteLabel() {
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

  // Refresh ScrollTrigger on client-side navigations and force visibility
  // for key selectors if GSAP fails to run after SPA navigation.
  const pathname = usePathname();
  useEffect(() => {
    const refreshId = setTimeout(() => {
      try { ScrollTrigger.refresh(true); } catch (e) { /* ignore */ }
    }, 80);

    const selectors = [
      ".whitelabel-title",
      ".whitelabel-subtitle",
      ".whitelabel-content",
      ".feature-card",
      ".benefit-item",
      ".revenue-item",
      ".cta-button",
    ];

    const makeVisible = () => {
      selectors.forEach((sel) => {
        document.querySelectorAll(sel).forEach((el) => {
          const e = el as HTMLElement;
          const comp = window.getComputedStyle(e);
          if (comp.opacity === "0" || comp.display === "none") {
            e.style.opacity = "1";
            e.style.transform = "none";
            e.style.display = e.style.display === "none" ? "block" : e.style.display;
          }
        });
      });
      try { ScrollTrigger.refresh(true); } catch (e) { /* ignore */ }
    };

    const t1 = setTimeout(makeVisible, 200);
    const t2 = setTimeout(makeVisible, 700);

    return () => {
      clearTimeout(refreshId);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname]);

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
      

      {/* Hero Section */}
      <section ref={heroRef} style={{ paddingTop: "140px", paddingBottom: "0px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-200px", left: "-200px", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(50, 194, 252, 0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 60px", position: "relative", zIndex: 1 }}>
          <h1 className="whitelabel-title" style={{ fontSize: "clamp(42px, 5vw, 72px)", fontWeight: 800, lineHeight: 1.05, marginBottom: "24px" }}>
            White Label <span style={{ background: "linear-gradient(135deg, #32c2fc, #32c2fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Solutions</span><span style={{ color: "#32c2fc" }}>.</span>
          </h1>

          <p className="whitelabel-subtitle" style={{ fontSize: "20px", color: "rgba(255, 255, 255, 0.65)", maxWidth: "800px", lineHeight: 1.7, marginBottom: "24px" }}>
            Launch Your Own Branded AI-Powered Forex & Crypto Trading Platform
          </p>

          <p className="whitelabel-subtitle" style={{ fontSize: "18px", color: "rgba(255, 255, 255, 0.6)", maxWidth: "800px", lineHeight: 1.8, marginBottom: "48px" }}>
            Build and scale your own trading business — with your logo, your domain, and your pricing.
          </p>

          <div className="whitelabel-content" style={{ background: "linear-gradient(135deg, rgba(50, 194, 252, 0.08), rgba(50, 194, 252, 0.08))", border: "1px solid rgba(50, 194, 252, 0.2)", borderRadius: "24px", padding: "48px", marginTop: "48px" }}>
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
      <section ref={revenueRef} style={{ paddingTop: "60px", paddingBottom: "60px", position: "relative", overflow: "hidden", background: "linear-gradient(180deg, rgba(50, 194, 252, 0.05) 0%, rgba(50, 194, 252, 0.05) 100%)" }}>
        <div style={{ position: "absolute", top: "0", right: "-200px", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(50, 194, 252, 0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 60px", position: "relative", zIndex: 1 }}>
          <h2 style={{ fontSize: "42px", fontWeight: 800, textAlign: "center", marginBottom: "16px", color: "#32c2fc" }}>
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
                background: "linear-gradient(135deg, rgba(50, 194, 252, 0.08), rgba(50, 194, 252, 0.08))",
                border: "1px solid rgba(50, 194, 252, 0.15)",
                borderRadius: "16px",
                padding: "32px",
                textAlign: "center",
                transition: "all 0.3s ease"
              }}>
                <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "12px", color: "#32c2fc" }}>{item.title}</h3>
                <p style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.6)", lineHeight: 1.6 }}>{item.description}</p>
              </div>
            ))}
          </div>

          <div style={{ background: "linear-gradient(135deg, rgba(50, 194, 252, 0.1), rgba(50, 194, 252, 0.1))", border: "1px solid rgba(50, 194, 252, 0.2)", borderRadius: "16px", padding: "32px", textAlign: "center" }}>
            <p style={{ fontSize: "16px", color: "rgba(255, 255, 255, 0.8)", fontWeight: 600 }}>
              Many partners recover their investment quickly through these streams.
            </p>
          </div>
        </div>
      </section>

      {/* Why Uptrender Section */}
      <section ref={whyRef} style={{ paddingTop: "60px", paddingBottom: "60px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-200px", right: "-200px", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(50, 194, 252, 0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 60px", position: "relative", zIndex: 1 }}>
          <h2 style={{ fontSize: "42px", fontWeight: 800, textAlign: "center", marginBottom: "50px", background: "linear-gradient(135deg, #32c2fc, #32c2fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
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
                background: "linear-gradient(135deg, rgba(50, 194, 252, 0.08), rgba(50, 194, 252, 0.08))",
                border: "1px solid rgba(50, 194, 252, 0.15)",
                borderRadius: "16px",
                padding: "28px",
                display: "flex",
                gap: "16px",
                transition: "all 0.3s ease"
              }}>
                <Check size={24} color="#32c2fc" strokeWidth={2} style={{ flexShrink: 0 }} />
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "8px", color: "#32c2fc" }}>{item.title}</h3>
                  <p style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.6)", lineHeight: 1.6 }}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "50px", background: "linear-gradient(135deg, rgba(50, 194, 252, 0.1), rgba(50, 194, 252, 0.1))", border: "1px solid rgba(50, 194, 252, 0.2)", borderRadius: "16px", padding: "40px", textAlign: "center" }}>
            <p style={{ fontSize: "18px", color: "rgba(255, 255, 255, 0.8)", marginBottom: "16px" }}>
              The trading industry is shifting fast toward AI automation and copy trading. This is your chance to own a piece of that growth.
            </p>
            <p style={{ fontSize: "20px", fontWeight: 700, color: "#32c2fc" }}>
              Don't just trade the markets. Build the platform others trade on.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} style={{ paddingTop: "60px", paddingBottom: "60px", position: "relative", overflow: "hidden", background: "linear-gradient(180deg, rgba(50, 194, 252, 0.05) 0%, rgba(50, 194, 252, 0.05) 100%)" }}>
        <div style={{ position: "absolute", top: "-200px", left: "50%", transform: "translateX(-50%)", width: "800px", height: "800px", background: "radial-gradient(circle, rgba(50, 194, 252, 0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 60px", position: "relative", zIndex: 1, textAlign: "center" }}>
          <h2 style={{ fontSize: "48px", fontWeight: 800, marginBottom: "24px", background: "linear-gradient(135deg, #32c2fc, #32c2fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
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
                background: "linear-gradient(135deg, #32c2fc, #1a9ad1)",
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
                gsap.to(e.currentTarget, { scale: 1.05, boxShadow: "0 20px 40px rgba(50, 194, 252, 0.3)", duration: 0.3, overwrite: "auto" });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, { scale: 1, boxShadow: "0 0px 0px rgba(50, 194, 252, 0)", duration: 0.3, overwrite: "auto" });
              }}
            >
              Schedule a Demo
            </button>
            <a href="/contact" className="cta-button" style={{
              opacity: 1,
              display: "inline-block",
              background: "transparent",
              color: "#32c2fc",
              padding: "16px 48px",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: 700,
              textDecoration: "none",
              border: "2px solid rgba(50, 194, 252, 0.4)",
              transition: "all 0.3s ease",
              cursor: "pointer"
            }} onMouseEnter={(e) => {
              gsap.to(e.currentTarget, { background: "rgba(50, 194, 252, 0.1)", borderColor: "rgba(50, 194, 252, 0.8)", scale: 1.05, duration: 0.3, overwrite: "auto" });
            }} onMouseLeave={(e) => {
              gsap.to(e.currentTarget, { background: "transparent", borderColor: "rgba(50, 194, 252, 0.4)", scale: 1, duration: 0.3, overwrite: "auto" });
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
          inset: 0,
          background: "rgba(10,12,14,0.65)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
          padding: "20px",
          backdropFilter: "blur(6px)"
        }} onClick={() => setIsDemoModalOpen(false)}>
          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "20px",
            padding: "36px",
            maxWidth: "560px",
            width: "100%",
            maxHeight: "90vh",
            overflowY: "auto",
            boxShadow: "0 10px 40px rgba(2,6,23,0.6)",
            position: "relative"
          }} onClick={(e) => e.stopPropagation()}>
            <button aria-label="Close modal" onClick={() => setIsDemoModalOpen(false)} style={{ position: "absolute", right: 12, top: 12, background: "transparent", border: "none", color: "rgba(255,255,255,0.6)", fontSize: 18, cursor: "pointer" }}>×</button>
            <h2 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "6px", color: "#fff" }}>
              Schedule a Demo
            </h2>
            <p style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.65)", marginBottom: "20px" }}>
              Let us show you how to launch your white label platform. Share a few details and we'll reach out.
            </p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "8px", color: "rgba(255,255,255,0.85)" }}>Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleFormChange} required placeholder="Your full name" style={{ width: "100%", padding: "12px 14px", background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", color: "#fff", fontSize: "14px", outline: "none", boxSizing: "border-box", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)" }} onFocus={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.12)"; e.target.style.background = "rgba(255,255,255,0.02)"; }} onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.06)"; e.target.style.background = "rgba(0,0,0,0.35)"; }} />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "8px", color: "rgba(255,255,255,0.85)" }}>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleFormChange} required placeholder="your@email.com" style={{ width: "100%", padding: "12px 14px", background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", color: "#fff", fontSize: "14px", outline: "none", boxSizing: "border-box" }} onFocus={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.12)"; e.target.style.background = "rgba(255,255,255,0.02)"; }} onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.06)"; e.target.style.background = "rgba(0,0,0,0.35)"; }} />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "8px", color: "rgba(255,255,255,0.85)" }}>Phone</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleFormChange} required placeholder="91XXXXXXXXXX" style={{ width: "100%", padding: "12px 14px", background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", color: "#fff", fontSize: "14px", outline: "none", boxSizing: "border-box" }} onFocus={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.12)"; e.target.style.background = "rgba(255,255,255,0.02)"; }} onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.06)"; e.target.style.background = "rgba(0,0,0,0.35)"; }} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "8px", color: "rgba(255,255,255,0.85)" }}>Preferred Date</label>
                  <input type="date" name="date" value={formData.date} onChange={handleFormChange} required style={{ width: "100%", padding: "12px 14px", background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", color: "#fff", fontSize: "14px", outline: "none", boxSizing: "border-box" }} onFocus={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.12)"; e.target.style.background = "rgba(255,255,255,0.02)"; }} onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.06)"; e.target.style.background = "rgba(0,0,0,0.35)"; }} />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "8px", color: "rgba(255,255,255,0.85)" }}>Preferred Time</label>
                  <input type="time" name="time" value={formData.time} onChange={handleFormChange} required style={{ width: "100%", padding: "12px 14px", background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", color: "#fff", fontSize: "14px", outline: "none", boxSizing: "border-box" }} onFocus={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.12)"; e.target.style.background = "rgba(255,255,255,0.02)"; }} onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.06)"; e.target.style.background = "rgba(0,0,0,0.35)"; }} />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "8px", color: "rgba(255,255,255,0.85)" }}>Description (Optional)</label>
                <textarea name="description" value={formData.description} onChange={handleFormChange} placeholder="Tell us about your white label platform interests..." rows={4} style={{ width: "100%", padding: "12px 14px", background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", color: "#fff", fontSize: "14px", outline: "none", boxSizing: "border-box", fontFamily: "inherit", resize: "vertical" }} onFocus={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.12)"; e.target.style.background = "rgba(255,255,255,0.02)"; }} onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.06)"; e.target.style.background = "rgba(0,0,0,0.35)"; }} />
              </div>

              <div style={{ display: "flex", gap: "12px", marginTop: "6px", justifyContent: "flex-end" }}>
                <button type="button" onClick={() => setIsDemoModalOpen(false)} style={{ background: "transparent", color: "rgba(255,255,255,0.85)", padding: "10px 18px", borderRadius: "10px", fontSize: "14px", fontWeight: 600, border: "1px solid rgba(255,255,255,0.06)", cursor: "pointer" }}>Cancel</button>
                <button type="submit" style={{ background: "linear-gradient(90deg,#32c2fc,#1a9ad1)", color: "#06111a", padding: "12px 22px", borderRadius: "10px", fontSize: "15px", fontWeight: 800, border: "none", cursor: "pointer", boxShadow: "0 10px 30px rgba(26,154,209,0.08)" }} onMouseEnter={(e) => { const btn = e.currentTarget as HTMLButtonElement; btn.style.transform = "translateY(-1px)"; btn.style.boxShadow = "0 18px 36px rgba(26,154,209,0.12)"; }} onMouseLeave={(e) => { const btn = e.currentTarget as HTMLButtonElement; btn.style.transform = "translateY(0)"; btn.style.boxShadow = "0 10px 30px rgba(26,154,209,0.08)"; }}>Schedule Demo</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      
    </div>
  );
}
