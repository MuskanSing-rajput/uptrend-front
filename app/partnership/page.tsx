"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, Sliders, CheckCircle, BarChart3, Target, Settings } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Partnership() {
  const pathname = usePathname();
      const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    description: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const franchiseRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const commissionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      // Hero: text and image animate together for smooth entrance
      const tl = gsap.timeline({ defaults: { ease: "power3.out", force3D: true } });
      tl.fromTo(".partnership-title", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }, 0.1)
        .fromTo(".partnership-content", { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 1 }, 0.1)
        .fromTo(".partnership-subtitle", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9 }, 0.2);
    }, heroRef);
    
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!franchiseRef.current) return;
    const ctx = gsap.context(() => {
      // Franchise intro box animation only
      gsap.fromTo(".franchise-intro-box", 
        { opacity: 0, rotationY: -30, y: 40 }, 
        { opacity: 1, rotationY: 0, y: 0, duration: 1, ease: "power3.out", force3D: true, scrollTrigger: { trigger: ".franchise-intro-box", start: "top 80%", end: "top 50%", toggleActions: "play none none reverse" } }
      );
    }, franchiseRef);
    
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!dashboardRef.current) return;
    const ctx = gsap.context(() => {
      // Dashboard section 3D animations with ScrollTrigger
      gsap.utils.toArray<HTMLElement>(".dashboard-card").forEach((card, i) => {
        gsap.fromTo(card, 
          { opacity: 0, rotationX: -80, y: 60 }, 
          { opacity: 1, rotationX: 0, y: 0, duration: 1, ease: "back.out", force3D: true, scrollTrigger: { trigger: card, start: "top 80%", end: "top 50%", toggleActions: "play none none reverse" }, delay: i * 0.1 }
        );
      });
    }, dashboardRef);
    
    return () => ctx.revert();
  }, []);

  // Commission section animations removed - content displays immediately

  useEffect(() => {
    if (!ctaRef.current) return;
    const ctx = gsap.context(() => {
      // CTA buttons 3D flip with ScrollTrigger  
      gsap.utils.toArray<HTMLElement>(".cta-button").forEach((btn, i) => {
        gsap.fromTo(btn, 
          { opacity: 0, rotationZ: -10, scale: 0.8 }, 
          { opacity: 1, rotationZ: 0, scale: 1, duration: 0.8, ease: "back.out", force3D: true, scrollTrigger: { trigger: btn, start: "top 85%", end: "top 55%", toggleActions: "play none none reverse" }, delay: i * 0.1 }
        );
      });
    }, ctaRef);
    
    return () => ctx.revert();
  }, []);

  // Refresh ScrollTrigger on client-side navigations and provide a small
  // fallback to force elements visible if GSAP fails to run after route change.
  useEffect(() => {
    const refreshId = setTimeout(() => {
      try { ScrollTrigger.refresh(true); } catch (e) { /* ignore */ }
    }, 80);

    const selectors = [
      ".partnership-title",
      ".partnership-subtitle",
      ".partnership-content",
      ".franchise-intro-box",
      ".dashboard-card",
      ".cta-button"
    ];

    const makeVisible = () => {
      selectors.forEach((sel) => {
        document.querySelectorAll(sel).forEach((el) => {
          const e = el as HTMLElement;
          const comp = window.getComputedStyle(e);
          if (comp.opacity === "0") {
            e.style.opacity = "1";
            e.style.transform = "none";
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
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, source: "partnership" }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitSuccess(true);
        setFormData({ name: "", email: "", phone: "", date: "", time: "", description: "" });
        setTimeout(() => { setSubmitSuccess(false); setIsModalOpen(false); }, 3000);
      } else {
        setSubmitError("Something went wrong. Please try again.");
      }
    } catch {
      setSubmitError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "#ffffff" }}>
      <style>{`
        .partnership-title, .partnership-subtitle, .partnership-content,
        .franchise-title, .franchise-subtitle, .franchise-intro-box,
        .dashboard-card, .commission-item, .cta-button {
          will-change: opacity, transform;
        }
        .dashboard-card:hover, .commission-item:hover {
          transform: translateY(-8px);
          border-color: rgba(0, 240, 255, 0.4);
        }
        .cta-button { will-change: transform, box-shadow; }
        .partner-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        @media (max-width: 900px) {
          .partner-hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        .who-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
        @media (max-width: 900px) {
          .who-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
      {/* Header */}

      {/* ── Hero ── */}
      <section ref={heroRef} style={{ paddingTop: "140px", paddingBottom: "80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-200px", left: "-200px", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(0,240,255,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "0", right: "-100px", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(20px,5vw,60px)", position: "relative", zIndex: 1 }}>
          <div className="partner-hero-grid">
            {/* Left: Text */}
            <div>
              <h1 className="partnership-title" style={{ fontSize: "clamp(32px,4vw,60px)", fontWeight: 800, lineHeight: 1.08, marginBottom: "20px" }}>
                Build Your Own<br />
                <span style={{ background: "linear-gradient(135deg,#00f0ff,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Trading Business</span><br />
                with Uptrender<span style={{ color: "#00f0ff" }}>.</span>
              </h1>
              <p className="partnership-subtitle" style={{ fontSize: "18px", color: "rgba(255,255,255,0.65)", lineHeight: 1.8, marginBottom: "12px" }}>
                Earn recurring revenue by becoming an official Uptrender Franchise Partner in Forex & Crypto.
              </p>
              <p className="partnership-subtitle" style={{ fontSize: "16px", color: "rgba(255,255,255,0.5)", lineHeight: 1.8, marginBottom: "40px" }}>
                Get your own branded franchise dashboard, manage users, set commissions, and grow with India's leading AI-powered algo trading platform.
              </p>
              <a href="/contact" className="cta-button" style={{ display: "inline-block", background: "linear-gradient(135deg,#00f0ff,#00b8d4)", color: "#0a0a0a", padding: "16px 40px", borderRadius: "12px", fontSize: "15px", fontWeight: 700, textDecoration: "none", transition: "all 0.3s ease" }}
                onMouseEnter={(e) => { gsap.to(e.currentTarget, { scale: 1.05, boxShadow: "0 20px 40px rgba(0,240,255,0.3)", duration: 0.3 }); }}
                onMouseLeave={(e) => { gsap.to(e.currentTarget, { scale: 1, boxShadow: "none", duration: 0.3 }); }}>
                Become a Franchise Partner Now
              </a>
            </div>
              {/* Right: Image */}
              <Image className="partnership-content" src="/partner.png" alt="Franchise Partner Dashboard" width={620} height={680} style={{ width: "100%", height: "auto", display: "block", borderRadius: "16px" }} priority />
          </div>
        </div>
      </section>

      {/* ── Why Partner With Us ── */}
      <section ref={franchiseRef} style={{ paddingTop: "80px", paddingBottom: "80px", position: "relative", overflow: "hidden", background: "linear-gradient(180deg,rgba(0,240,255,0.02) 0%,rgba(139,92,246,0.02) 100%)" }}>
        <div style={{ position: "absolute", top: "-200px", right: "-200px", width: "600px", height: "600px", background: "radial-gradient(circle,rgba(168,85,247,0.06) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(20px,5vw,60px)", position: "relative", zIndex: 1 }}>
          <h2 className="franchise-title" style={{ fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 800, textAlign: "center", marginBottom: "12px" }}>
            Why Partner <span style={{ background: "linear-gradient(135deg,#00f0ff,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>With Us?</span>
          </h2>
          <p className="franchise-subtitle" style={{ fontSize: "17px", color: "rgba(255,255,255,0.55)", textAlign: "center", marginBottom: "56px" }}>
            Run your own franchise with complete control and industry-leading support
          </p>
          <div className="franchise-intro-box" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {[
              { title: "Run your own franchise", desc: "Complete business autonomy with Uptrender's technology behind you." },
              { title: "Earn attractive commissions", desc: "Earn on subscriptions, strategies & trades — multiple revenue channels from day one." },
              { title: "Access AI Strategy Builder & Copy Trading", desc: "Your clients get India's most powerful no-code trading tools." },
              { title: "Simple Franchise Management dashboard", desc: "Complete control over users, commissions, and payouts in one clean panel." },
              { title: "Low effort — we handle the tech", desc: "We provide the technology, infrastructure — you focus on growth." },
            ].map((item, i) => (
              <div key={i} style={{ background: "linear-gradient(135deg,rgba(0,240,255,0.07),rgba(139,92,246,0.07))", border: "1px solid rgba(0,240,255,0.18)", borderRadius: "16px", padding: "24px 28px", display: "flex", gap: "14px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#00f0ff", flexShrink: 0, marginTop: "8px" }} />
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "8px", color: "#00f0ff" }}>{item.title}</h3>
                  <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What You Actually Get ── */}
      <section style={{ paddingTop: "80px", paddingBottom: "80px", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(20px,5vw,60px)", position: "relative", zIndex: 1 }}>
          <h2 style={{ fontSize: "clamp(26px,3vw,46px)", fontWeight: 800, textAlign: "center", marginBottom: "12px" }}>
            What You <span style={{ background: "linear-gradient(135deg,#00f0ff,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Actually Get</span>
          </h2>
          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.5)", textAlign: "center", marginBottom: "56px" }}>
            We don't just give you access — we give you a complete business toolkit.
          </p>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.4)", textAlign: "center", marginBottom: "48px", marginTop: "-36px" }}>
            Everything is designed to help you operate like a professional trading platform — without building one from scratch.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: "24px" }}>
            {[
              { icon: Users, color: "#00f0ff", title: "User Management System", desc: "Add, manage, and support your clients from a single centralized dashboard." },
              { icon: Sliders, color: "#a855f7", title: "Commission Engine", desc: "Full control over your earnings — set your own rates for every revenue channel." },
              { icon: Target, color: "#10b981", title: "AI Strategy Builder", desc: "Create, test, and deploy trading strategies using plain-English prompts. No coding needed." },
              { icon: CheckCircle, color: "#f59e0b", title: "Copy Trading System", desc: "Let users automatically follow top-performing strategies in real time." },
              { icon: BarChart3, color: "#ec4899", title: "Real-Time Analytics", desc: "Track performance, trades, and revenue across your entire user base." },
            ].map((item, i) => {
              const IconComp = item.icon;
              return (
                <div key={i} className="dashboard-card" style={{ background: "linear-gradient(135deg,rgba(0,240,255,0.06),rgba(139,92,246,0.06))", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "32px", transition: "all 0.3s ease" }}>
                  <div style={{ marginBottom: "16px" }}><IconComp size={38} color={item.color} strokeWidth={1.5} /></div>
                  <h3 style={{ fontSize: "17px", fontWeight: 700, marginBottom: "10px", color: item.color }}>{item.title}</h3>
                  <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Franchise Management Made Simple ── */}
      <section ref={dashboardRef} style={{ paddingTop: "80px", paddingBottom: "80px", background: "linear-gradient(180deg,rgba(0,240,255,0.03) 0%,rgba(139,92,246,0.03) 100%)", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(20px,5vw,60px)", position: "relative", zIndex: 1 }}>
          <h2 style={{ fontSize: "clamp(26px,3vw,46px)", fontWeight: 800, textAlign: "center", marginBottom: "12px", background: "linear-gradient(135deg,#00f0ff,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Franchise Management Made Simple
          </h2>
          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.5)", textAlign: "center", marginBottom: "56px" }}>Our clean dashboard lets you:</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: "24px" }}>
            {[
              { icon: Settings, title: "Create & manage franchise accounts", desc: "Onboard new users with a few clicks and manage their entire lifecycle." },
              { icon: Sliders, title: "Set and adjust commission rates", desc: "Full control over Strategy Subscription, Plan Subscription, Per-Trade Charge — adjust anytime." },
              { icon: CheckCircle, title: "Approve settlements & payout requests", desc: "Review and approve withdrawal requests for your partners and users." },
              { icon: BarChart3, title: "Track users, trades, volume & revenue", desc: "Real-time analytics dashboard with all the metrics that matter for your business." },
              { icon: Target, title: "Monitor everything from one panel", desc: "No switching tabs — all operations, all data, all controls in one intuitive interface." },
            ].map((item, i) => {
              const IconComp = item.icon;
              return (
                <div key={i} className="dashboard-card" style={{ background: "linear-gradient(135deg,rgba(0,240,255,0.08),rgba(139,92,246,0.08))", border: "1px solid rgba(0,240,255,0.2)", borderRadius: "20px", padding: "32px", textAlign: "center", transition: "all 0.3s ease" }}>
                  <div style={{ marginBottom: "16px", display: "flex", justifyContent: "center" }}><IconComp size={40} color="#00f0ff" strokeWidth={1.5} /></div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "10px", color: "#00f0ff" }}>{item.title}</h3>
                  <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Multiple Revenue Streams ── */}
      <section ref={commissionRef} style={{ paddingTop: "80px", paddingBottom: "80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "0", right: "-200px", width: "600px", height: "600px", background: "radial-gradient(circle,rgba(168,85,247,0.06) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(20px,5vw,60px)", position: "relative", zIndex: 1 }}>
          <h2 style={{ fontSize: "clamp(26px,3vw,46px)", fontWeight: 800, textAlign: "center", marginBottom: "12px", background: "linear-gradient(135deg,#a855f7,#00f0ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Multiple Revenue Streams
          </h2>
          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.5)", textAlign: "center", marginBottom: "8px" }}>Why depend on just one source of income?</p>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.4)", textAlign: "center", marginBottom: "52px" }}>With Uptrender, you earn from multiple channels simultaneously:</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "36px" }}>
            {[
              { label: "Strategy subscription fees", color: "#00f0ff" },
              { label: "Platform plan subscriptions", color: "#a855f7" },
              { label: "Per-trade commissions", color: "#10b981" },
              { label: "Volume-based earnings as your users grow", color: "#f59e0b" },
            ].map((item, i) => (
              <div key={i} className="commission-item" style={{ background: "linear-gradient(135deg,rgba(0,240,255,0.07),rgba(139,92,246,0.07))", border: `1px solid ${item.color}33`, borderRadius: "16px", padding: "28px 20px", textAlign: "center", transition: "all 0.3s ease", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "60px", height: "60px", background: `radial-gradient(circle,${item.color}20 0%,transparent 70%)`, borderRadius: "50%" }} />
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: item.color, margin: "0 auto 16px" }} />
                <p style={{ fontSize: "15px", fontWeight: 700, color: item.color, lineHeight: 1.5 }}>{item.label}</p>
              </div>
            ))}
          </div>
          <div style={{ background: "linear-gradient(135deg,rgba(0,240,255,0.06),rgba(139,92,246,0.06))", border: "1px solid rgba(0,240,255,0.15)", borderRadius: "14px", padding: "24px", textAlign: "center" }}>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.75)", lineHeight: 1.8 }}>
              This ensures <strong style={{ color: "#00f0ff" }}>consistent and recurring income</strong> — not just one-time earnings.
            </p>
          </div>
        </div>
      </section>

      {/* ── Earn While You Scale ── */}
      <section style={{ paddingTop: "80px", paddingBottom: "80px", background: "linear-gradient(180deg,rgba(0,240,255,0.02) 0%,rgba(139,92,246,0.02) 100%)", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(20px,5vw,60px)", position: "relative", zIndex: 1 }}>
          <h2 style={{ fontSize: "clamp(26px,3vw,46px)", fontWeight: 800, textAlign: "center", marginBottom: "12px" }}>
            Earn While You <span style={{ background: "linear-gradient(135deg,#00f0ff,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Scale</span>
          </h2>
          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.5)", textAlign: "center", marginBottom: "8px" }}>Your income grows as your network grows.</p>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.4)", textAlign: "center", marginBottom: "52px" }}>You have full flexibility to define how you earn:</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginBottom: "36px" }}>
            {[
              { n: "01", title: "Set your own commission rates", desc: "Define exactly how much you earn from every activity on your platform." },
              { n: "02", title: "Adjust pricing anytime", desc: "Respond to market demand — change rates whenever it makes business sense." },
              { n: "03", title: "Customize plans per user type", desc: "Create tiered plans for beginners, intermediate, and professional traders." },
              { n: "04", title: "Run offers or discounts", desc: "Attract more traders with promotional pricing to grow your user base faster." },
            ].map((item, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,240,255,0.15)", borderRadius: "16px", padding: "28px" }}>
                <div style={{ fontSize: "26px", fontWeight: 800, color: "rgba(0,240,255,0.25)", marginBottom: "12px", fontVariantNumeric: "tabular-nums" }}>{item.n}</div>
                <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "10px", color: "#ffffff" }}>{item.title}</h3>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ background: "linear-gradient(135deg,rgba(0,240,255,0.06),rgba(139,92,246,0.06))", border: "1px solid rgba(0,240,255,0.15)", borderRadius: "14px", padding: "24px", textAlign: "center" }}>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.75)", lineHeight: 1.8 }}>
              As your user base expands, your revenue compounds — making this a <strong style={{ color: "#00f0ff" }}>long-term scalable business model</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* ── Who Is This For + Built for Growth ── */}
      <section style={{ paddingTop: "80px", paddingBottom: "80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-100px", left: "-200px", width: "600px", height: "600px", background: "radial-gradient(circle,rgba(0,240,255,0.05) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(20px,5vw,60px)", position: "relative", zIndex: 1 }}>
          <div className="who-grid">
            {/* Who Is This For */}
            <div>
              <h2 style={{ fontSize: "clamp(24px,2.8vw,42px)", fontWeight: 800, marginBottom: "16px" }}>
                Who Is This <span style={{ background: "linear-gradient(135deg,#00f0ff,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>For?</span>
              </h2>
              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: "28px" }}>This opportunity is ideal if you are:</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "28px" }}>
                {[
                  "A trader looking to monetize your experience",
                  "A finance influencer or content creator",
                  "A Telegram/WhatsApp signal provider",
                  "A trading educator or mentor",
                  "An entrepreneur exploring fintech opportunities",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "linear-gradient(135deg,#00f0ff,#a855f7)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                    <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>{item}</p>
                  </div>
                ))}
              </div>
              <div style={{ padding: "20px 24px", background: "linear-gradient(135deg,rgba(0,240,255,0.08),rgba(139,92,246,0.08))", border: "1px solid rgba(0,240,255,0.2)", borderRadius: "12px" }}>
                <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.75)", lineHeight: 1.7, fontStyle: "italic" }}>
                  "If you already have an audience — even small — you can start building recurring income from day one."
                </p>
              </div>
            </div>
            {/* Built for Growth */}
            <div>
              <h2 style={{ fontSize: "clamp(22px,2.5vw,38px)", fontWeight: 800, marginBottom: "16px" }}>
                Built for Growth,<br /><span style={{ background: "linear-gradient(135deg,#00f0ff,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Backed by Technology</span>
              </h2>
              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: "24px" }}>We handle the hardest part — technology.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "24px" }}>
                {[
                  "No need to build or maintain trading software",
                  "No coding or technical setup required",
                  "Secure and scalable infrastructure",
                  "Continuous updates and feature upgrades",
                  "Dedicated support from our team",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "rgba(0,240,255,0.12)", border: "1px solid rgba(0,240,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                    <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>{item}</p>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: "15px", color: "rgba(0,240,255,0.7)", lineHeight: 1.8, fontWeight: 600 }}>
                You focus on acquiring users — we take care of the rest.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section ref={ctaRef} style={{ paddingTop: "80px", paddingBottom: "80px", position: "relative", overflow: "hidden", background: "linear-gradient(180deg,rgba(139,92,246,0.05) 0%,rgba(0,240,255,0.05) 100%)" }}>
        <div style={{ position: "absolute", top: "-200px", left: "50%", transform: "translateX(-50%)", width: "800px", height: "800px", background: "radial-gradient(circle,rgba(0,240,255,0.08) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(20px,5vw,60px)", position: "relative", zIndex: 1, textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(26px,3.5vw,50px)", fontWeight: 800, marginBottom: "20px", background: "linear-gradient(135deg,#00f0ff,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Start Your Franchise Journey Today
          </h2>
          <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.6)", maxWidth: "680px", margin: "0 auto 14px", lineHeight: 1.8 }}>
            Many of our partners are already earning steady income by onboarding traders to the Uptrender platform.
          </p>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.45)", maxWidth: "560px", margin: "0 auto 14px", lineHeight: 1.8 }}>
            Low setup effort. High growth potential. Full technology support from us.
          </p>
          <p style={{ fontSize: "17px", color: "rgba(0,240,255,0.85)", marginBottom: "48px", fontWeight: 600 }}>
            Ready to build your own trading business?
          </p>
          <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/contact" className="cta-button" style={{ display: "inline-block", background: "linear-gradient(135deg,#00f0ff,#00b8d4)", color: "#0a0a0a", padding: "16px 48px", borderRadius: "12px", fontSize: "16px", fontWeight: 700, textDecoration: "none", transition: "all 0.3s ease", cursor: "pointer" }}
              onMouseEnter={(e) => { gsap.to(e.currentTarget, { scale: 1.05, boxShadow: "0 20px 40px rgba(0,240,255,0.3)", duration: 0.3, overwrite: "auto" }); }}
              onMouseLeave={(e) => { gsap.to(e.currentTarget, { scale: 1, boxShadow: "none", duration: 0.3, overwrite: "auto" }); }}>
              Apply for Franchise
            </a>
            <button className="cta-button" style={{ background: "transparent", color: "#00f0ff", padding: "16px 48px", borderRadius: "12px", fontSize: "16px", fontWeight: 700, border: "2px solid rgba(0,240,255,0.4)", transition: "all 0.3s ease", cursor: "pointer" }}
              onClick={() => setIsModalOpen(true)}
              onMouseEnter={(e) => { gsap.to(e.currentTarget, { background: "rgba(0,240,255,0.1)", borderColor: "rgba(0,240,255,0.8)", scale: 1.05, duration: 0.3, overwrite: "auto" }); }}
              onMouseLeave={(e) => { gsap.to(e.currentTarget, { background: "transparent", borderColor: "rgba(0,240,255,0.4)", scale: 1, duration: 0.3, overwrite: "auto" }); }}>
              Schedule a Demo Call
            </button>
          </div>
        </div>
      </section>

      {/* Demo Call Modal */}
      {isModalOpen && (
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
        }} onClick={() => setIsModalOpen(false)}>
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
            <button aria-label="Close modal" onClick={() => setIsModalOpen(false)} style={{ position: "absolute", right: 12, top: 12, background: "transparent", border: "none", color: "rgba(255,255,255,0.6)", fontSize: 18, cursor: "pointer" }}>×</button>
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
                <textarea name="description" value={formData.description} onChange={handleFormChange} placeholder="Tell us about your franchise interests..." rows={4} style={{ width: "100%", padding: "12px 14px", background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", color: "#fff", fontSize: "14px", outline: "none", boxSizing: "border-box", fontFamily: "inherit", resize: "vertical" }} onFocus={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.12)"; e.target.style.background = "rgba(255,255,255,0.02)"; }} onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.06)"; e.target.style.background = "rgba(0,0,0,0.35)"; }} />
              </div>

              <div style={{ display: "flex", gap: "12px", marginTop: "6px", justifyContent: "flex-end", flexDirection: "column" }}>
                {submitSuccess && (
                  <p style={{ color: "#00f0ff", fontSize: "14px", textAlign: "center", margin: 0 }}>
                    ✓ Request sent! We'll contact you soon.
                  </p>
                )}
                {submitError && (
                  <p style={{ color: "#ff6b6b", fontSize: "14px", textAlign: "center", margin: 0 }}>{submitError}</p>
                )}
                <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                  <button type="button" onClick={() => setIsModalOpen(false)} style={{ background: "transparent", color: "rgba(255,255,255,0.85)", padding: "10px 18px", borderRadius: "10px", fontSize: "14px", fontWeight: 600, border: "1px solid rgba(255,255,255,0.06)", cursor: "pointer" }}>Cancel</button>
                  <button type="submit" disabled={isSubmitting} style={{ background: isSubmitting ? "rgba(4,225,244,0.3)" : "#04e1f4", color: "#06111a", padding: "12px 22px", borderRadius: "10px", fontSize: "15px", fontWeight: 800, border: "none", cursor: isSubmitting ? "not-allowed" : "pointer", boxShadow: "0 10px 30px rgba(4,225,244,0.25)", transition: "transform 0.2s ease, box-shadow 0.2s ease" }} onMouseEnter={(e) => { if (!isSubmitting) { const btn = e.currentTarget as HTMLButtonElement; btn.style.transform = "translateY(-1px)"; btn.style.boxShadow = "0 18px 36px rgba(4,225,244,0.35)"; } }} onMouseLeave={(e) => { const btn = e.currentTarget as HTMLButtonElement; btn.style.transform = "translateY(0)"; btn.style.boxShadow = "0 10px 30px rgba(4,225,244,0.25)"; }}>{isSubmitting ? "Sending..." : "Schedule Demo Call"}</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      
    </div>
  );
}
