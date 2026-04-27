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
  const heroRef = useRef<HTMLDivElement>(null);
  const franchiseRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const commissionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      // Hero section animations - immediate
      gsap.fromTo(".partnership-title", { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", force3D: true, delay: 0.2 });
      gsap.fromTo(".partnership-subtitle", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", force3D: true, delay: 0.4 });
      gsap.fromTo(".partnership-content", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", force3D: true, delay: 0.6 });
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you can add your API call to send the form data
    alert("Demo call request submitted! We'll contact you soon.");
    setFormData({ name: "", email: "", phone: "", date: "", time: "", description: "" });
    setIsModalOpen(false);
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
        
        .cta-button {
          will-change: transform, box-shadow, background-color, border-color;
        }
      `}</style>
      {/* Header */}
      

      {/* Hero Section */}
      <section ref={heroRef} style={{ paddingTop: "140px", paddingBottom: "0px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-200px", left: "-200px", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(0, 240, 255, 0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 60px", position: "relative", zIndex: 1 }}>
          <h1 className="partnership-title" style={{ fontSize: "clamp(42px, 5vw, 72px)", fontWeight: 800, lineHeight: 1.05, marginBottom: "24px" }}>
            Partnership <span style={{ background: "linear-gradient(135deg, #00f0ff, #a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Opportunities</span><span style={{ color: "#00f0ff" }}>.</span>
          </h1>

          <p className="partnership-subtitle" style={{ fontSize: "20px", color: "rgba(255, 255, 255, 0.65)", maxWidth: "700px", lineHeight: 1.7, marginBottom: "48px" }}>
            Join our growing network of partners and grow your business with Uptrender. We offer flexible partnership programs designed to drive mutual growth and success.
          </p>

          <div className="partnership-content" style={{ background: "linear-gradient(135deg, rgba(0, 240, 255, 0.06), rgba(139, 92, 246, 0.06))", border: "1px solid rgba(0, 240, 255, 0.2)", borderRadius: "24px", padding: "48px", marginTop: "48px" }}>
            <h2 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "24px", color: "#00f0ff" }}>Build Your Own Trading Business with Uptrender</h2>
            <p style={{ fontSize: "16px", color: "rgba(255, 255, 255, 0.7)", lineHeight: 1.8, marginBottom: "24px" }}>
              Earn recurring revenue by becoming an official Uptrender Franchise Partner in Forex & Crypto. Get your own branded franchise dashboard, manage users, set commissions, and grow with India's leading AI-powered algo trading platform.
            </p>
            <div style={{ display: "flex", gap: "24px", justifyContent: "center" }}>
              <a href="/contact" style={{ display: "inline-block", background: "linear-gradient(135deg, #00f0ff, #00b8d4)", color: "#0a0a0a", padding: "14px 40px", borderRadius: "12px", fontSize: "15px", fontWeight: 700, textDecoration: "none", transition: "all 0.3s ease" }}>
                Become a Franchise Partner Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Franchise Program Section */}
      <section ref={franchiseRef} style={{ paddingTop: "60px", paddingBottom: "60px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-200px", right: "-200px", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(168, 85, 247, 0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 60px", position: "relative", zIndex: 1 }}>
          <h2 className="franchise-title" style={{ fontSize: "48px", fontWeight: 800, textAlign: "center", marginBottom: "16px", opacity: 1, perspective: "1000px" }}>
            Why Partner <span style={{ background: "linear-gradient(135deg, #00f0ff, #a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>With Us?</span>
          </h2>
          <p className="franchise-subtitle" style={{ fontSize: "18px", color: "rgba(255, 255, 255, 0.6)", textAlign: "center", marginBottom: "60px", opacity: 1 }}>
            Run your own franchise with complete control and industry-leading support
          </p>

          <div className="franchise-intro-box" style={{ background: "linear-gradient(135deg, rgba(0, 240, 255, 0.08), rgba(139, 92, 246, 0.08))", border: "1px solid rgba(0, 240, 255, 0.2)", borderRadius: "24px", padding: "40px", marginBottom: "40px", perspective: "1000px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px" }}>
              {[
                { title: "Run Your Own Franchise", description: "Complete business autonomy with our technology foundation" },
                { title: "Attractive Commissions", description: "Earn on subscriptions, strategies & trades" },
                { title: "Full AI Strategy Access", description: "Leverage our AI Strategy Builder and Copy Trading system" },
                { title: "Simple Dashboard Control", description: "Manage everything from one intuitive panel" },
                { title: "Low Effort Growth", description: "We provide the tech, you focus on growth" },
                { title: "Full Technology Support", description: "Dedicated support team ensuring your success" }
              ].map((item, i) => (
                <div key={i} style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(0, 240, 255, 0.2)", borderRadius: "16px", padding: "28px", perspective: "1000px", transform: "preserve-3d" }}>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "12px", color: "#00f0ff" }}>{item.title}</h3>
                  <p style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.6)", lineHeight: 1.6 }}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Section */}
      <section ref={dashboardRef} style={{ paddingTop: "60px", paddingBottom: "60px", position: "relative", overflow: "hidden", background: "linear-gradient(180deg, rgba(0, 240, 255, 0.02) 0%, rgba(139, 92, 246, 0.02) 100%)" }}>
        <div style={{ position: "absolute", top: "-200px", left: "-200px", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(0, 240, 255, 0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 60px", position: "relative", zIndex: 1 }}>
          <h2 style={{ fontSize: "48px", fontWeight: 800, textAlign: "center", marginBottom: "16px", background: "linear-gradient(135deg, #00f0ff, #a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Franchise Management Made Simple
          </h2>
          <p style={{ fontSize: "18px", color: "rgba(255, 255, 255, 0.6)", textAlign: "center", marginBottom: "50px" }}>
            Our clean dashboard lets you manage your entire franchise operation with ease
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px" }}>
            {[
              { icon: Users, title: "Create & Manage Accounts", description: "Create and manage franchise accounts effortlessly" },
              { icon: Sliders, title: "Set Commission Rates", description: "Set and adjust commission rates for Strategy Subscription, Plan Subscription, Per-Trade Charge" },
              { icon: CheckCircle, title: "Approve Settlements", description: "Approve settlements and payout requests instantly" },
              { icon: BarChart3, title: "Real-time Analytics", description: "Track users, trades, volume, and revenue in real time" },
              { icon: Target, title: "Performance Tracking", description: "Monitor your franchise performance metrics" },
              { icon: Settings, title: "Intuitive Control Panel", description: "Monitor everything from one intuitive panel" }
            ].map((item, i) => {
              const IconComponent = item.icon;
              return (
              <div key={i} className="dashboard-card" style={{
                background: "linear-gradient(135deg, rgba(0, 240, 255, 0.08), rgba(139, 92, 246, 0.08))",
                border: "1px solid rgba(0, 240, 255, 0.2)",
                borderRadius: "20px",
                padding: "36px",
                textAlign: "center",
                transition: "all 0.3s ease",
                perspective: "1000px"
              }}>
                <div style={{ marginBottom: "16px", display: "flex", justifyContent: "center" }}><IconComponent size={40} color="#00f0ff" strokeWidth={1.5} /></div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "12px", color: "#00f0ff" }}>{item.title}</h3>
                <p style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.6)", lineHeight: 1.6 }}>{item.description}</p>
              </div>
            );
            })}
          </div>
        </div>
      </section>

      {/* Commission Section */}
      <section ref={commissionRef} style={{ paddingTop: "60px", paddingBottom: "60px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "0", right: "-200px", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(168, 85, 247, 0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 60px", position: "relative", zIndex: 1 }}>
          <h2 style={{ fontSize: "48px", fontWeight: 800, textAlign: "center", marginBottom: "16px", background: "linear-gradient(135deg, #a855f7, #00f0ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Earn While You Scale
          </h2>
          <p style={{ fontSize: "18px", color: "rgba(255, 255, 255, 0.6)", textAlign: "center", marginBottom: "50px" }}>
            Enjoy full flexibility with commissions — you decide the rates
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "32px" }}>
            {[
              { title: "Strategy Subscriptions", description: "Flexible commission rates on all strategy subscriptions. Adjust rates anytime from your Commission Settings panel." },
              { title: "Platform Plans", description: "Earn commissions on platform plan subscriptions. Full control over pricing structure and commission percentages." },
              { title: "Per-Trade Charges", description: "Generate revenue on per-trade charges. Dynamic rate adjustments based on trading volume and performance." }
            ].map((item, i) => (
              <div key={i} className="commission-item" style={{
                opacity: 1,
                background: "linear-gradient(135deg, rgba(0, 240, 255, 0.08), rgba(139, 92, 246, 0.08))",
                border: "1px solid rgba(0, 240, 255, 0.15)",
                borderRadius: "20px",
                padding: "40px",
                perspective: "1000px",
                position: "relative",
                overflow: "hidden"
              }}>
                <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "80px", height: "80px", background: "radial-gradient(circle, rgba(0, 240, 255, 0.15) 0%, transparent 70%)", borderRadius: "50%" }} />
                <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "16px", color: "#00f0ff", position: "relative", zIndex: 1 }}>{item.title}</h3>
                <p style={{ fontSize: "15px", color: "rgba(255, 255, 255, 0.6)", lineHeight: 1.8, position: "relative", zIndex: 1 }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} style={{ paddingTop: "60px", paddingBottom: "60px", position: "relative", overflow: "hidden", background: "linear-gradient(180deg, rgba(139, 92, 246, 0.05) 0%, rgba(0, 240, 255, 0.05) 100%)" }}>
        <div style={{ position: "absolute", top: "-200px", left: "50%", transform: "translateX(-50%)", width: "800px", height: "800px", background: "radial-gradient(circle, rgba(0, 240, 255, 0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 60px", position: "relative", zIndex: 1, textAlign: "center" }}>
          <h2 style={{ fontSize: "48px", fontWeight: 800, marginBottom: "24px", background: "linear-gradient(135deg, #00f0ff, #a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Start Your Franchise Journey Today
          </h2>
          <p style={{ fontSize: "18px", color: "rgba(255, 255, 255, 0.6)", maxWidth: "700px", margin: "0 auto 48px", lineHeight: 1.8 }}>
            Many of our partners are already earning steady income by onboarding traders to the Uptrender platform. Low setup effort. High growth potential. Full technology support from us.
          </p>
          <p style={{ fontSize: "16px", color: "rgba(0, 240, 255, 0.8)", marginBottom: "48px", fontWeight: 600 }}>
            Ready to build your own trading business?
          </p>
          
          <div style={{ display: "flex", gap: "24px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/contact" className="cta-button" style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #00f0ff, #00b8d4)",
              color: "#0a0a0a",
              padding: "16px 48px",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: 700,
              textDecoration: "none",
              transition: "all 0.3s ease",
              cursor: "pointer"
            }} onMouseEnter={(e) => {
              gsap.to(e.currentTarget, { scale: 1.05, boxShadow: "0 20px 40px rgba(0, 240, 255, 0.3)", duration: 0.3, overwrite: "auto" });
            }} onMouseLeave={(e) => {
              gsap.to(e.currentTarget, { scale: 1, boxShadow: "0 0px 0px rgba(0, 240, 255, 0)", duration: 0.3, overwrite: "auto" });
            }}>
              Apply for Franchise
            </a>
            <a href="/contact" className="cta-button" style={{
              display: "inline-block",
              background: "transparent",
              color: "#00f0ff",
              padding: "16px 48px",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: 700,
              textDecoration: "none",
              border: "2px solid rgba(0, 240, 255, 0.4)",
              transition: "all 0.3s ease",
              cursor: "pointer"
            }} onClick={(e) => {
              e.preventDefault();
              setIsModalOpen(true);
            }} onMouseEnter={(e) => {
              gsap.to(e.currentTarget, { background: "rgba(0, 240, 255, 0.1)", borderColor: "rgba(0, 240, 255, 0.8)", scale: 1.05, duration: 0.3, overwrite: "auto" });
            }} onMouseLeave={(e) => {
              gsap.to(e.currentTarget, { background: "transparent", borderColor: "rgba(0, 240, 255, 0.4)", scale: 1, duration: 0.3, overwrite: "auto" });
            }}>
              Schedule a Demo Call
            </a>
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

              <div style={{ display: "flex", gap: "12px", marginTop: "6px", justifyContent: "flex-end" }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ background: "transparent", color: "rgba(255,255,255,0.85)", padding: "10px 18px", borderRadius: "10px", fontSize: "14px", fontWeight: 600, border: "1px solid rgba(255,255,255,0.06)", cursor: "pointer" }}>Cancel</button>
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
