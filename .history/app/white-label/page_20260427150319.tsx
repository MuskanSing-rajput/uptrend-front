"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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
          border-color: rgba(50,194,252,0.4);
        }
        .wl-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        @media (max-width: 900px) { .wl-hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }
        .wl-steps { display: grid; grid-template-columns: repeat(3,1fr); gap: 28px; }
        @media (max-width: 767px) { .wl-steps { grid-template-columns: 1fr !important; } }
        .wl-compare-table { width: 100%; border-collapse: collapse; }
        .wl-compare-table th, .wl-compare-table td { padding: 14px 18px; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.07); font-size: 14px; }
        .wl-compare-table th { font-size: 13px; font-weight: 700; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 0.8px; }
        .wl-compare-table td:first-child { color: rgba(255,255,255,0.5); }
        .wl-compare-table td:last-child { color: #32c2fc; font-weight: 600; }
        @media (max-width: 640px) {
          .wl-compare-table th, .wl-compare-table td { padding: 10px 12px; font-size: 12px; }
        }
      `}</style>

      {/* Header */}

      {/* ── Hero ── */}
      <section ref={heroRef} style={{ paddingTop: "140px", paddingBottom: "80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-200px", left: "-200px", width: "600px", height: "600px", background: "radial-gradient(circle,rgba(50,194,252,0.06) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "0", right: "-100px", width: "500px", height: "500px", background: "radial-gradient(circle,rgba(50,194,252,0.04) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(20px,5vw,60px)", position: "relative", zIndex: 1 }}>
          <div className="wl-hero-grid">
            {/* Left: Text */}
            <div>
              <div className="whitelabel-title" style={{ display: "inline-block", background: "linear-gradient(135deg,rgba(50,194,252,0.15),rgba(50,194,252,0.05))", border: "1px solid rgba(50,194,252,0.3)", borderRadius: "50px", padding: "8px 24px", fontSize: "13px", fontWeight: 700, color: "#32c2fc", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "24px" }}>
                White Label Solutions
              </div>
              <h1 className="whitelabel-title" style={{ fontSize: "clamp(30px,3.8vw,58px)", fontWeight: 800, lineHeight: 1.08, marginBottom: "20px" }}>
                Launch Your Own<br />
                <span style={{ background: "linear-gradient(135deg,#32c2fc,#1a9ad1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AI-Powered Trading</span><br />
                Platform<span style={{ color: "#32c2fc" }}>.</span>
              </h1>
              <p className="whitelabel-subtitle" style={{ fontSize: "18px", color: "rgba(255,255,255,0.65)", lineHeight: 1.8, marginBottom: "12px" }}>
                Build and scale your own trading business — with your logo, your domain, and your pricing.
              </p>
              <p className="whitelabel-subtitle" style={{ fontSize: "15px", color: "rgba(255,255,255,0.45)", lineHeight: 1.8, marginBottom: "40px" }}>
                The trading industry is shifting fast toward AI automation and copy trading. This is your chance to own a piece of that growth.
              </p>
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <button onClick={() => setIsDemoModalOpen(true)} className="cta-button" style={{ background: "linear-gradient(135deg,#32c2fc,#1a9ad1)", color: "#ffffff", padding: "16px 40px", borderRadius: "12px", fontSize: "15px", fontWeight: 700, border: "none", cursor: "pointer", transition: "all 0.3s ease" }}
                  onMouseEnter={(e) => { gsap.to(e.currentTarget, { scale: 1.05, boxShadow: "0 20px 40px rgba(50,194,252,0.3)", duration: 0.3 }); }}
                  onMouseLeave={(e) => { gsap.to(e.currentTarget, { scale: 1, boxShadow: "none", duration: 0.3 }); }}>
                  Schedule a Demo
                </button>
                <a href="/contact" style={{ display: "inline-block", background: "transparent", color: "#32c2fc", padding: "16px 40px", borderRadius: "12px", fontSize: "15px", fontWeight: 700, border: "2px solid rgba(50,194,252,0.4)", textDecoration: "none", transition: "all 0.3s ease" }}>
                  Get Pricing Details
                </a>
              </div>
            </div>
            {/* Right: Image */}
            <div className="whitelabel-content">
              <div style={{ position: "relative", borderRadius: "24px", overflow: "hidden", border: "1px solid rgba(50,194,252,0.2)", boxShadow: "0 30px 80px rgba(50,194,252,0.1)" }}>
                <Image src="/whitelable.png" alt="White Label Trading Platform" width={620} height={520} style={{ width: "100%", height: "auto", display: "block" }} priority />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(50,194,252,0.04),transparent)", pointerEvents: "none" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why This Matters ── */}
      <section style={{ paddingTop: "70px", paddingBottom: "70px", background: "linear-gradient(180deg,rgba(50,194,252,0.03) 0%,rgba(50,194,252,0.01) 100%)", position: "relative" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 clamp(20px,5vw,60px)", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(22px,2.8vw,38px)", fontWeight: 800, marginBottom: "20px", color: "#32c2fc" }}>Why This Matters</h2>
          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.65)", lineHeight: 1.9, marginBottom: "20px" }}>
            The trading industry is shifting fast toward AI automation and copy trading.
            This is your chance to own a piece of that growth.
          </p>
          <p style={{ fontSize: "18px", fontWeight: 700, color: "#ffffff", lineHeight: 1.7 }}>
            Don't just trade the markets.<br />
            <span style={{ color: "#32c2fc" }}>Build the platform others trade on.</span>
          </p>
        </div>
      </section>

      {/* ── Why Choose Uptrender White Label ── */}
      <section ref={featuresRef} style={{ paddingTop: "80px", paddingBottom: "80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-200px", right: "-200px", width: "600px", height: "600px", background: "radial-gradient(circle,rgba(50,194,252,0.06) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(20px,5vw,60px)", position: "relative", zIndex: 1 }}>
          <h2 style={{ fontSize: "clamp(26px,3vw,46px)", fontWeight: 800, textAlign: "center", marginBottom: "12px", color: "#32c2fc" }}>
            Why Choose Uptrender White Label?
          </h2>
          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.5)", textAlign: "center", marginBottom: "56px" }}>
            Launch a complete AI trading platform in weeks, not months.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px", marginBottom: "32px" }}>
            {[
              { icon: Zap, title: "Prompt-Based AI Strategy Builder", desc: "Users type simple commands like 'Buy EURUSD on breakout with 1:2 risk reward' and the AI builds, backtests, and executes automatically." },
              { icon: Copy, title: "Smart Copy Trading System", desc: "Master traders create strategies. Subscribers mirror them in real time. You earn commissions on every copied trade." },
              { icon: Palette, title: "Fully Branded Experience", desc: "Your logo, colours, domain, and design across web and mobile. Complete ownership of your brand and user relationship." },
            ].map((item, i) => {
              const IconComp = item.icon;
              return (
                <div key={i} className="feature-card" style={{ background: "linear-gradient(135deg,rgba(50,194,252,0.08),rgba(50,194,252,0.04))", border: "1px solid rgba(50,194,252,0.2)", borderRadius: "20px", padding: "36px", transition: "all 0.3s ease" }}>
                  <div style={{ marginBottom: "16px" }}><IconComp size={40} color="#32c2fc" strokeWidth={1.5} /></div>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "12px", color: "#32c2fc" }}>{item.title}</h3>
                  <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── What You Get ── */}
      <section style={{ paddingTop: "80px", paddingBottom: "80px", background: "linear-gradient(180deg,rgba(50,194,252,0.02) 0%,rgba(50,194,252,0.02) 100%)", position: "relative" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(20px,5vw,60px)" }}>
          <h2 style={{ fontSize: "clamp(26px,3vw,46px)", fontWeight: 800, textAlign: "center", marginBottom: "56px", color: "#32c2fc" }}>What You Get</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            {[
              { icon: Palette, title: "Fully custom-branded dashboard", desc: "Web + mobile apps with your logo, colors, domain" },
              { icon: Zap, title: "AI Strategy Engine", desc: "Prompt-based automation with backtesting built-in" },
              { icon: Copy, title: "Copy Trading infrastructure", desc: "Master-to-subscriber real-time strategy mirroring" },
              { icon: BarChart3, title: "Advanced Admin Control Panel", desc: "Full control over users, commissions, and payouts" },
              { icon: Lock, title: "Secure Wallet & Automated Billing", desc: "Subscriptions + commissions handled automatically" },
              { icon: DollarSign, title: "Multi-Market Support", desc: "Forex pairs and Crypto assets in one platform" },
              { icon: BarChart3, title: "Real-time Risk Management", desc: "Portfolio tracking and automated position tools" },
              { icon: DollarSign, title: "Strategy Marketplace", desc: "Extra revenue from buying/selling strategy access" },
              { icon: Lock, title: "Secure API integrations", desc: "Bank-level connections with brokers and exchanges" },
            ].map((item, i) => {
              const IconComp = item.icon;
              return (
                <div key={i} style={{ background: "linear-gradient(135deg,rgba(50,194,252,0.07),rgba(50,194,252,0.03))", border: "1px solid rgba(50,194,252,0.18)", borderRadius: "16px", padding: "24px", display: "flex", gap: "14px", alignItems: "flex-start" }}>
                  <div style={{ flexShrink: 0, marginTop: "2px" }}><IconComp size={22} color="#32c2fc" strokeWidth={1.8} /></div>
                  <div>
                    <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "6px", color: "#32c2fc" }}>{item.title}</h3>
                    <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section style={{ paddingTop: "80px", paddingBottom: "80px", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(20px,5vw,60px)" }}>
          <h2 style={{ fontSize: "clamp(26px,3vw,46px)", fontWeight: 800, textAlign: "center", marginBottom: "12px", color: "#32c2fc" }}>How It Works</h2>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.45)", textAlign: "center", marginBottom: "56px" }}>Simple 3-Step Model</p>
          <div className="wl-steps">
            {[
              { step: "01", title: "Launch Your Platform", desc: "We set up your fully branded trading platform with all features activated." },
              { step: "02", title: "Onboard Users", desc: "Invite your audience, traders, or community to join your platform." },
              { step: "03", title: "Start Earning", desc: "Users subscribe, trade, and copy strategies — you earn from every activity on your platform." },
            ].map((item, i) => (
              <div key={i} style={{ background: "linear-gradient(135deg,rgba(50,194,252,0.08),rgba(50,194,252,0.04))", border: "1px solid rgba(50,194,252,0.2)", borderRadius: "20px", padding: "40px 32px", textAlign: "center", position: "relative" }}>
                <div style={{ fontSize: "56px", fontWeight: 800, color: "rgba(50,194,252,0.15)", lineHeight: 1, marginBottom: "20px" }}>{item.step}</div>
                <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "14px", color: "#32c2fc" }}>{item.title}</h3>
                <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", fontSize: "16px", color: "rgba(50,194,252,0.7)", fontWeight: 600, marginTop: "32px" }}>Simple model. Scalable growth.</p>
        </div>
      </section>

      {/* ── Built for Revenue ── */}
      <section ref={revenueRef} style={{ paddingTop: "80px", paddingBottom: "80px", background: "linear-gradient(180deg,rgba(50,194,252,0.03) 0%,rgba(50,194,252,0.01) 100%)", position: "relative" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(20px,5vw,60px)" }}>
          <h2 style={{ fontSize: "clamp(26px,3vw,46px)", fontWeight: 800, textAlign: "center", marginBottom: "12px", color: "#32c2fc" }}>Built for Revenue</h2>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.45)", textAlign: "center", marginBottom: "52px" }}>Turn users into paying customers from day one:</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "32px" }}>
            {[
              { label: "Monthly subscriptions", color: "#32c2fc" },
              { label: "Copy trading commissions", color: "#a855f7" },
              { label: "Strategy access fees", color: "#10b981" },
              { label: "Trade execution charges", color: "#f59e0b" },
            ].map((item, i) => (
              <div key={i} className="revenue-item" style={{ background: "linear-gradient(135deg,rgba(50,194,252,0.07),rgba(50,194,252,0.03))", border: `1px solid ${item.color}33`, borderRadius: "14px", padding: "28px 20px", textAlign: "center", transition: "all 0.3s ease" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: item.color, margin: "0 auto 14px" }} />
                <p style={{ fontSize: "15px", fontWeight: 700, color: item.color }}>{item.label}</p>
              </div>
            ))}
          </div>
          <div style={{ background: "linear-gradient(135deg,rgba(50,194,252,0.08),rgba(50,194,252,0.04))", border: "1px solid rgba(50,194,252,0.2)", borderRadius: "14px", padding: "24px", textAlign: "center" }}>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.75)", lineHeight: 1.8 }}>
              Many partners recover their investment quickly through these streams.
            </p>
          </div>
        </div>
      </section>

      {/* ── Who Is This For ── */}
      <section style={{ paddingTop: "80px", paddingBottom: "80px", position: "relative" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(20px,5vw,60px)" }}>
          <h2 style={{ fontSize: "clamp(26px,3vw,46px)", fontWeight: 800, textAlign: "center", marginBottom: "12px", color: "#32c2fc" }}>Who Is This For?</h2>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.45)", textAlign: "center", marginBottom: "52px" }}>
            This solution is perfect for:
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "18px", marginBottom: "32px" }}>
            {[
              "Trading educators and mentors",
              "Telegram/Discord trading communities",
              "Finance influencers and content creators",
              "Brokers and fintech startups",
              "Entrepreneurs entering the trading space",
            ].map((item, i) => (
              <div key={i} style={{ background: "linear-gradient(135deg,rgba(50,194,252,0.07),rgba(50,194,252,0.03))", border: "1px solid rgba(50,194,252,0.18)", borderRadius: "14px", padding: "20px 24px", display: "flex", gap: "12px", alignItems: "center" }}>
                <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "rgba(50,194,252,0.15)", border: "1px solid rgba(50,194,252,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#32c2fc" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>{item}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", padding: "20px", background: "linear-gradient(135deg,rgba(50,194,252,0.07),rgba(50,194,252,0.02))", border: "1px solid rgba(50,194,252,0.15)", borderRadius: "14px" }}>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", fontStyle: "italic" }}>
              If you have an audience or growth mindset — you can build a serious business with this.
            </p>
          </div>
        </div>
      </section>

      {/* ── Go-To-Market + Security ── */}
      <section ref={benefitsRef} style={{ paddingTop: "80px", paddingBottom: "80px", background: "linear-gradient(180deg,rgba(50,194,252,0.03) 0%,rgba(50,194,252,0.01) 100%)", position: "relative" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(20px,5vw,60px)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(440px, 1fr))", gap: "48px" }}>
            {/* Go-To-Market */}
            <div>
              <h2 style={{ fontSize: "clamp(22px,2.5vw,36px)", fontWeight: 800, marginBottom: "12px", color: "#32c2fc" }}>Go-To-Market Support</h2>
              <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.5)", lineHeight: 1.8, marginBottom: "28px" }}>We don't just give you software — we help you launch and grow.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {[
                  "Guidance on pricing strategy",
                  "Onboarding flow suggestions",
                  "Best practices for user acquisition",
                  "Feature walkthroughs and training",
                  "Ongoing product updates and improvements",
                ].map((item, i) => (
                  <div key={i} className="benefit-item" style={{ display: "flex", gap: "12px", alignItems: "flex-start", background: "rgba(50,194,252,0.04)", border: "1px solid rgba(50,194,252,0.12)", borderRadius: "10px", padding: "14px 18px", transition: "all 0.3s ease" }}>
                    <Check size={18} color="#32c2fc" strokeWidth={2} style={{ flexShrink: 0, marginTop: "2px" }} />
                    <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>{item}</p>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", marginTop: "16px", lineHeight: 1.7 }}>
                This reduces your trial-and-error phase significantly.
              </p>
            </div>
            {/* Security */}
            <div>
              <h2 style={{ fontSize: "clamp(22px,2.5vw,36px)", fontWeight: 800, marginBottom: "12px", color: "#32c2fc" }}>Security & Reliability</h2>
              <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.5)", lineHeight: 1.8, marginBottom: "28px" }}>Trust is critical in trading — and we take it seriously.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {[
                  "Secure API connections with brokers and exchanges",
                  "Encrypted data handling and user protection",
                  "Reliable infrastructure with minimal downtime",
                  "Continuous monitoring and system upgrades",
                ].map((item, i) => (
                  <div key={i} className="benefit-item" style={{ display: "flex", gap: "12px", alignItems: "flex-start", background: "rgba(50,194,252,0.04)", border: "1px solid rgba(50,194,252,0.12)", borderRadius: "10px", padding: "14px 18px", transition: "all 0.3s ease" }}>
                    <Check size={18} color="#32c2fc" strokeWidth={2} style={{ flexShrink: 0, marginTop: "2px" }} />
                    <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>{item}</p>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", marginTop: "16px", lineHeight: 1.7 }}>
                Your users trade with confidence — and stay longer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Uptrender ── */}
      <section ref={whyRef} style={{ paddingTop: "80px", paddingBottom: "80px", position: "relative" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(20px,5vw,60px)" }}>
          <h2 style={{ fontSize: "clamp(26px,3vw,46px)", fontWeight: 800, textAlign: "center", marginBottom: "56px", color: "#32c2fc" }}>Why Uptrender?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginBottom: "48px" }}>
            {[
              { title: "True AI-first platform", desc: "Not just another tool — built from the ground up with AI automation at the core." },
              { title: "Ready-to-launch white label solution", desc: "Skip months of development and launch within weeks." },
              { title: "No coding or heavy development needed", desc: "Everything is plug-and-play with our easy admin panel." },
              { title: "Scalable, secure, and built for the Indian market", desc: "Specifically designed and stress-tested for Indian traders and businesses." },
              { title: "End-to-end control", desc: "You own the brand and the relationship directly with your users." },
            ].map((item, i) => (
              <div key={i} style={{ background: "linear-gradient(135deg,rgba(50,194,252,0.07),rgba(50,194,252,0.03))", border: "1px solid rgba(50,194,252,0.18)", borderRadius: "16px", padding: "28px", display: "flex", gap: "14px" }}>
                <Check size={22} color="#32c2fc" strokeWidth={2} style={{ flexShrink: 0, marginTop: "3px" }} />
                <div>
                  <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "8px", color: "#32c2fc" }}>{item.title}</h3>
                  <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: "linear-gradient(135deg,rgba(50,194,252,0.08),rgba(50,194,252,0.04))", border: "1px solid rgba(50,194,252,0.2)", borderRadius: "16px", padding: "36px", textAlign: "center" }}>
            <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.75)", marginBottom: "14px", lineHeight: 1.8 }}>
              The trading industry is shifting fast toward AI automation and copy trading.<br />This is your chance to own a piece of that growth.
            </p>
            <p style={{ fontSize: "19px", fontWeight: 700, color: "#32c2fc" }}>
              Don't just trade the markets. Build the platform others trade on.
            </p>
          </div>
        </div>
      </section>

      {/* ── Comparison Table ── */}
      <section style={{ paddingTop: "80px", paddingBottom: "80px", background: "linear-gradient(180deg,rgba(50,194,252,0.02) 0%,rgba(50,194,252,0.02) 100%)", position: "relative" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 clamp(20px,5vw,60px)" }}>
          <h2 style={{ fontSize: "clamp(24px,3vw,42px)", fontWeight: 800, textAlign: "center", marginBottom: "48px", color: "#32c2fc" }}>Why Uptrender Wins</h2>
          <div style={{ background: "linear-gradient(135deg,rgba(50,194,252,0.06),rgba(50,194,252,0.02))", border: "1px solid rgba(50,194,252,0.2)", borderRadius: "16px", overflow: "hidden" }}>
            <table className="wl-compare-table">
              <thead>
                <tr style={{ background: "rgba(50,194,252,0.08)" }}>
                  <th>Feature</th>
                  <th>Traditional Platforms</th>
                  <th>Uptrender White Label</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Strategy automation", "Basic or rule-based", "AI-powered (prompt-based)"],
                  ["Technical setup", "Requires coding", "100% no-code platform"],
                  ["Branding control", "Limited or none", "Fully white-labeled"],
                  ["Revenue options", "Limited earning options", "Multiple built-in streams"],
                  ["Tool integration", "Separate tools", "All-in-one ecosystem"],
                ].map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "transparent" : "rgba(50,194,252,0.03)" }}>
                    <td style={{ color: "rgba(255,255,255,0.75)", fontWeight: 600 }}>{row[0]}</td>
                    <td style={{ color: "rgba(255,255,255,0.4)" }}>{row[1]}</td>
                    <td>{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section ref={ctaRef} style={{ paddingTop: "80px", paddingBottom: "80px", position: "relative", overflow: "hidden", background: "linear-gradient(180deg,rgba(50,194,252,0.05) 0%,rgba(50,194,252,0.02) 100%)" }}>
        <div style={{ position: "absolute", top: "-200px", left: "50%", transform: "translateX(-50%)", width: "800px", height: "800px", background: "radial-gradient(circle,rgba(50,194,252,0.08) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(20px,5vw,60px)", position: "relative", zIndex: 1, textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(26px,3.5vw,50px)", fontWeight: 800, marginBottom: "20px", color: "#32c2fc" }}>
            Ready to launch your own AI Forex & Crypto platform?
          </h2>
          <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.55)", maxWidth: "680px", margin: "0 auto 48px", lineHeight: 1.8 }}>
            Join the revolution in AI-powered trading. Launch in weeks with full technical and business support.
          </p>
          <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setIsDemoModalOpen(true)} className="cta-button" style={{ background: "linear-gradient(135deg,#32c2fc,#1a9ad1)", color: "#ffffff", padding: "16px 48px", borderRadius: "12px", fontSize: "16px", fontWeight: 700, border: "none", cursor: "pointer", transition: "all 0.3s ease" }}
              onMouseEnter={(e) => { gsap.to(e.currentTarget, { scale: 1.05, boxShadow: "0 20px 40px rgba(50,194,252,0.3)", duration: 0.3, overwrite: "auto" }); }}
              onMouseLeave={(e) => { gsap.to(e.currentTarget, { scale: 1, boxShadow: "none", duration: 0.3, overwrite: "auto" }); }}>
              Schedule a Demo
            </button>
            <a href="/contact" className="cta-button" style={{ display: "inline-block", background: "transparent", color: "#32c2fc", padding: "16px 48px", borderRadius: "12px", fontSize: "16px", fontWeight: 700, border: "2px solid rgba(50,194,252,0.4)", textDecoration: "none", transition: "all 0.3s ease", cursor: "pointer" }}
              onMouseEnter={(e) => { gsap.to(e.currentTarget, { background: "rgba(50,194,252,0.1)", borderColor: "rgba(50,194,252,0.8)", scale: 1.05, duration: 0.3, overwrite: "auto" }); }}
              onMouseLeave={(e) => { gsap.to(e.currentTarget, { background: "transparent", borderColor: "rgba(50,194,252,0.4)", scale: 1, duration: 0.3, overwrite: "auto" }); }}>
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
          background: "rgba(10,12,14,0.92)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
          padding: "20px",
          backdropFilter: "blur(12px)"
        }} onClick={() => setIsDemoModalOpen(false)}>
          <div style={{
            background: "#111318",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "20px",
            padding: "36px",
            maxWidth: "560px",
            width: "100%",
            maxHeight: "90vh",
            overflowY: "auto",
            boxShadow: "0 24px 60px rgba(0,0,0,0.8)",
            position: "relative"
          }} onClick={(e) => e.stopPropagation()}>
            <button aria-label="Close modal" onClick={() => setIsDemoModalOpen(false)} style={{ position: "absolute", right: 12, top: 12, background: "transparent", border: "none", color: "rgba(255,255,255,0.6)", fontSize: 18, cursor: "pointer" }}>×</button>
            <h2 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "6px", color: "#fff" }}>
              Schedule a Demo
            </h2>
            <p style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.65)", marginBottom: "20px" }}>
              Share a few details and we'll reach out within 24 hours.
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
                <input type="tel" name="phone" value={formData.phone} onChange={(e) => { const value = e.target.value.replace(/[^0-9]/g, ""); setFormData(prev => ({ ...prev, phone: value })); }} required placeholder="91XXXXXXXXXX" pattern="[0-9]*" style={{ width: "100%", padding: "12px 14px", background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", color: "#fff", fontSize: "14px", outline: "none", boxSizing: "border-box" }} onFocus={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.12)"; e.target.style.background = "rgba(255,255,255,0.02)"; }} onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.06)"; e.target.style.background = "rgba(0,0,0,0.35)"; }} />
              </div>

              <div className="modal-date-time-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "8px", color: "rgba(255,255,255,0.85)" }}>Preferred Date</label>
                  <input type="date" name="date" value={formData.date} onChange={handleFormChange} required style={{ width: "100%", padding: "12px 14px", background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", color: "#fff", fontSize: "14px", outline: "none", boxSizing: "border-box", colorScheme: "dark" }} onFocus={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.12)"; e.target.style.background = "rgba(255,255,255,0.02)"; }} onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.06)"; e.target.style.background = "rgba(0,0,0,0.35)"; }} />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "8px", color: "rgba(255,255,255,0.85)" }}>Preferred Time</label>
                  <input type="time" name="time" value={formData.time} onChange={handleFormChange} required style={{ width: "100%", padding: "12px 14px", background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", color: "#fff", fontSize: "14px", outline: "none", boxSizing: "border-box", colorScheme: "dark" }} onFocus={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.12)"; e.target.style.background = "rgba(255,255,255,0.02)"; }} onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.06)"; e.target.style.background = "rgba(0,0,0,0.35)"; }} />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "8px", color: "rgba(255,255,255,0.85)" }}>Description (Optional)</label>
                <textarea name="description" value={formData.description} onChange={handleFormChange} placeholder="Tell us about your white label platform interests..." rows={4} style={{ width: "100%", padding: "12px 14px", background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", color: "#fff", fontSize: "14px", outline: "none", boxSizing: "border-box", fontFamily: "inherit", resize: "vertical" }} onFocus={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.12)"; e.target.style.background = "rgba(255,255,255,0.02)"; }} onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.06)"; e.target.style.background = "rgba(0,0,0,0.35)"; }} />
              </div>

              <div style={{ display: "flex", gap: "12px", marginTop: "6px", justifyContent: "flex-end" }}>
                <button type="button" onClick={() => setIsDemoModalOpen(false)} style={{ background: "transparent", color: "rgba(255,255,255,0.85)", padding: "10px 18px", borderRadius: "10px", fontSize: "14px", fontWeight: 600, border: "1px solid rgba(255,255,255,0.06)", cursor: "pointer" }}>Cancel</button>
                <button type="submit" style={{ background: "#04e1f4", color: "#06111a", padding: "12px 22px", borderRadius: "10px", fontSize: "15px", fontWeight: 800, border: "none", cursor: "pointer", boxShadow: "0 10px 30px rgba(4,225,244,0.25)", transition: "transform 0.2s ease, box-shadow 0.2s ease" }} onMouseEnter={(e) => { const btn = e.currentTarget as HTMLButtonElement; btn.style.transform = "translateY(-1px)"; btn.style.boxShadow = "0 18px 36px rgba(4,225,244,0.35)"; }} onMouseLeave={(e) => { const btn = e.currentTarget as HTMLButtonElement; btn.style.transform = "translateY(0)"; btn.style.boxShadow = "0 10px 30px rgba(4,225,244,0.25)"; }}>Schedule Demo Call</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      
    </div>
  );
}
