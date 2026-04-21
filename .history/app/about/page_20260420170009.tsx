"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function CountUp({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  const startCounting = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
  }, [target]);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) startCounting(); },
      { threshold: 0.5 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [startCounting]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

export default function About() {
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
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
      gsap.fromTo(".about-hero-badge", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 });
      gsap.fromTo(".about-hero-title", { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.4 });
      gsap.fromTo(".about-hero-desc", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.6 });
      gsap.fromTo(".about-hero-stats", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.8 });
      gsap.fromTo(".hero-grid-effect", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out", delay: 0.3 });
      // Animate grid glow pulse
      gsap.to(".grid-glow-orb", { scale: 1.2, opacity: 0.6, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1 });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // Story section animations
  useEffect(() => {
    if (!storyRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".story-badge", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", scrollTrigger: { trigger: ".story-badge", start: "top 85%", toggleActions: "play none none none" } });
      gsap.fromTo(".story-title", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".story-title", start: "top 85%", toggleActions: "play none none none" } });
      gsap.fromTo(".story-text", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: ".story-text", start: "top 85%", toggleActions: "play none none none" } });
      gsap.fromTo(".story-line", { scaleY: 0 }, { scaleY: 1, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: ".story-line", start: "top 85%", toggleActions: "play none none none" } });
      gsap.fromTo(".story-milestone", { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.7, stagger: 0.2, ease: "power3.out", scrollTrigger: { trigger: ".story-milestones", start: "top 80%", toggleActions: "play none none none" } });
    }, storyRef);
    return () => ctx.revert();
  }, []);

  // Mission/Vision animations - enhanced
  useEffect(() => {
    if (!missionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".mv-title", { opacity: 0, y: 50, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 1, ease: "back.out(1.5)", scrollTrigger: { trigger: ".mv-title", start: "top 80%", toggleActions: "play none none none" } });
      // Mission and Vision cards with rotation + scale
      gsap.fromTo(".mv-card", { opacity: 0, y: 80, rotateX: 15, scale: 0.85 }, { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 1, stagger: 0.25, ease: "power4.out", scrollTrigger: { trigger: ".mv-cards", start: "top 80%", toggleActions: "play none none none" } });
      // Floating icon animation
      gsap.to(".mv-icon", { y: -8, duration: 2, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.3 });
      // Values title
      gsap.fromTo(".values-title-badge", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".values-title-badge", start: "top 85%", toggleActions: "play none none none" } });
      gsap.fromTo(".values-title", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".values-title", start: "top 85%", toggleActions: "play none none none" } });
      // Value cards stagger with scale and rotation
      gsap.fromTo(".value-card", { opacity: 0, y: 60, scale: 0.8, rotateY: -10 }, { opacity: 1, y: 0, scale: 1, rotateY: 0, duration: 0.8, stagger: 0.12, ease: "back.out(1.2)", scrollTrigger: { trigger: ".values-grid", start: "top 80%", toggleActions: "play none none none" } });
    }, missionRef);
    return () => ctx.revert();
  }, []);

  // CTA animations
  useEffect(() => {
    if (!ctaRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".cta-content", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".cta-content", start: "top 85%", toggleActions: "play none none none" } });
    }, ctaRef);
    return () => ctx.revert();
  }, []);

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "#ffffff" }}>
      {/* Gradient Grid Keyframes */}
      <style>{`
        @keyframes gridPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        @keyframes floatUp {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes glowLine {
          0% { opacity: 0.1; background-position: 0% 0%; }
          50% { opacity: 0.5; }
          100% { opacity: 0.1; background-position: 100% 100%; }
        }
        .grid-cell {
          transition: all 0.3s ease;
        }
        .grid-cell:hover {
          background: rgba(0, 240, 255, 0.12) !important;
          border-color: rgba(0, 240, 255, 0.4) !important;
          box-shadow: 0 0 20px rgba(0, 240, 255, 0.15);
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
            <Link href="/about" className="nav-link" style={{ color: "#00f0ff" }}>About Us</Link>
            <Link href="/#features" className="nav-link">Features</Link>
            <Link href="/services" className="nav-link">Services</Link>
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

      {/* Hero Section - Split Layout with Gradient Grid */}
      <section ref={heroRef} style={{ paddingTop: "140px", paddingBottom: "80px", position: "relative", overflow: "hidden" }}>
        {/* Background gradient orbs */}
        <div style={{ position: "absolute", top: "-200px", left: "-200px", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(0, 240, 255, 0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "0 60px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center", position: "relative", zIndex: 1 }}>
          {/* Left - Content */}
          <div>
            <span className="about-hero-badge" style={{ display: "inline-block", background: "linear-gradient(135deg, rgba(0, 240, 255, 0.15), rgba(139, 92, 246, 0.15))", border: "1px solid rgba(0, 240, 255, 0.3)", borderRadius: "50px", padding: "10px 28px", fontSize: "13px", fontWeight: 600, color: "#00f0ff", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "28px", opacity: 0 }}>About Uptrender</span>

            <h1 className="about-hero-title" style={{ fontSize: "clamp(36px, 4.5vw, 64px)", fontWeight: 800, lineHeight: 1.05, marginBottom: "28px", opacity: 0 }}>
              Empowering Traders<br />
              in <span style={{ background: "linear-gradient(135deg, #00f0ff, #a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>India & Beyond</span><span style={{ color: "#00f0ff" }}>.</span>
            </h1>

            <p className="about-hero-desc" style={{ fontSize: "18px", color: "rgba(255, 255, 255, 0.65)", maxWidth: "520px", lineHeight: 1.7, opacity: 0, marginBottom: "50px" }}>
              India&apos;s most innovative trading platform powered by cutting-edge AI technology, designed to make Forex &amp; Crypto trading accessible, intelligent, and profitable for everyone.
            </p>

            {/* Stats Row */}
            <div className="about-hero-stats" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", maxWidth: "520px", opacity: 0 }}>
              {[
                { target: 100, suffix: "K+", label: "Active Traders" },
                { target: 50, suffix: "+", label: "Countries" },
                { value: "24/7", label: "Expert Support" },
              ].map((stat, i) => (
                <div key={i} style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "14px", padding: "16px 20px" }}>
                  <h3 style={{ fontSize: "28px", fontWeight: 800, background: "linear-gradient(135deg, #00f0ff, #a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "4px" }}>
                    {stat.value ? stat.value : <CountUp target={stat.target!} prefix={stat.prefix || ""} suffix={stat.suffix || ""} />}
                  </h3>
                  <p style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.5)", textTransform: "uppercase", letterSpacing: "1px" }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Gradient Grid Effect */}
          <div className="hero-grid-effect" style={{ position: "relative", opacity: 0 }}>
            {/* Main glow orb behind grid */}
            <div className="grid-glow-orb" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(0, 240, 255, 0.12) 0%, rgba(139, 92, 246, 0.08) 40%, transparent 70%)", pointerEvents: "none", filter: "blur(40px)" }} />

            {/* Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "8px", padding: "20px", position: "relative" }}>
              {Array.from({ length: 25 }).map((_, i) => {
                const row = Math.floor(i / 5);
                const col = i % 5;
                const distFromCenter = Math.abs(row - 2) + Math.abs(col - 2);
                const isHighlight = distFromCenter <= 1;
                const isMedium = distFromCenter === 2;
                return (
                  <div key={i} className="grid-cell" style={{
                    width: "100%", aspectRatio: "1", borderRadius: "12px",
                    background: isHighlight ? "rgba(0, 240, 255, 0.08)" : isMedium ? "rgba(0, 240, 255, 0.03)" : "rgba(255, 255, 255, 0.02)",
                    border: `1px solid ${isHighlight ? "rgba(0, 240, 255, 0.25)" : isMedium ? "rgba(0, 240, 255, 0.12)" : "rgba(255, 255, 255, 0.06)"}`,
                    animation: isHighlight ? `gridPulse ${3 + (i % 3) * 0.5}s ease-in-out infinite` : "none",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    backdropFilter: "blur(10px)",
                  }}>
                    {i === 12 && (
                      <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "linear-gradient(135deg, rgba(0, 240, 255, 0.3), rgba(139, 92, 246, 0.3))", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 30px rgba(0, 240, 255, 0.2)" }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                      </div>
                    )}
                    {i === 7 && <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00f0ff", boxShadow: "0 0 10px #00f0ff", animation: "gridPulse 2s ease-in-out infinite" }} />}
                    {i === 17 && <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#a855f7", boxShadow: "0 0 10px #a855f7", animation: "gridPulse 2.5s ease-in-out infinite" }} />}
                    {i === 11 && <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981", animation: "gridPulse 3s ease-in-out infinite" }} />}
                    {i === 13 && <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#f59e0b", boxShadow: "0 0 8px #f59e0b", animation: "gridPulse 2.8s ease-in-out infinite" }} />}
                  </div>
                );
              })}
            </div>

            {/* Floating connection lines */}
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.3 }}>
              <line x1="30%" y1="30%" x2="50%" y2="50%" stroke="url(#gridGrad)" strokeWidth="1" />
              <line x1="70%" y1="30%" x2="50%" y2="50%" stroke="url(#gridGrad)" strokeWidth="1" />
              <line x1="30%" y1="70%" x2="50%" y2="50%" stroke="url(#gridGrad)" strokeWidth="1" />
              <line x1="70%" y1="70%" x2="50%" y2="50%" stroke="url(#gridGrad)" strokeWidth="1" />
              <defs>
                <linearGradient id="gridGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0.5" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </section>

      {/* Divider Line */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", height: "1px", background: "linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.3), transparent)" }} />

      {/* Our Story Section - 80% width, left aligned, attractive */}
      <section ref={storyRef} style={{ padding: "100px 0" }}>
        <div style={{ width: "80%", padding: "0 60px" }}>
          {/* Story header */}
          <span className="story-badge" style={{ display: "inline-block", background: "rgba(0, 240, 255, 0.1)", border: "1px solid rgba(0, 240, 255, 0.2)", borderRadius: "50px", padding: "8px 20px", fontSize: "12px", fontWeight: 600, color: "#00f0ff", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "20px", opacity: 0 }}>Our Story</span>
          <h2 className="story-title" style={{ fontSize: "48px", fontWeight: 700, lineHeight: 1.15, marginBottom: "60px", opacity: 0 }}>
            Built by Traders,<br />for Traders<span style={{ color: "#00f0ff" }}>.</span>
          </h2>

          {/* Timeline style content */}
          <div style={{ display: "flex", gap: "60px" }}>
            {/* Left - decorative line */}
            <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", minWidth: "3px" }}>
              <div className="story-line" style={{ width: "3px", flex: 1, background: "linear-gradient(180deg, #00f0ff, #a855f7, transparent)", borderRadius: "2px", transformOrigin: "top" }} />
            </div>

            {/* Right - content blocks */}
            <div className="story-milestones" style={{ display: "flex", flexDirection: "column", gap: "48px", flex: 1 }}>
              <div className="story-milestone" style={{ opacity: 0, position: "relative", paddingLeft: "20px" }}>
                <div style={{ position: "absolute", left: "-42px", top: "6px", width: "12px", height: "12px", borderRadius: "50%", background: "#00f0ff", boxShadow: "0 0 15px rgba(0, 240, 255, 0.5)" }} />
                <span style={{ fontSize: "13px", fontWeight: 700, color: "#00f0ff", letterSpacing: "1px", textTransform: "uppercase" }}>The Beginning</span>
                <p className="story-text" style={{ fontSize: "17px", color: "rgba(255, 255, 255, 0.65)", lineHeight: 1.8, marginTop: "10px", opacity: 0 }}>
                  Uptrender was born from a simple vision: to democratize trading by making advanced market intelligence accessible to every trader in India and around the world. We saw the gap between complex institutional tools and what retail traders had access to.
                </p>
              </div>

              <div className="story-milestone" style={{ opacity: 0, position: "relative", paddingLeft: "20px" }}>
                <div style={{ position: "absolute", left: "-42px", top: "6px", width: "12px", height: "12px", borderRadius: "50%", background: "#a855f7", boxShadow: "0 0 15px rgba(168, 85, 247, 0.5)" }} />
                <span style={{ fontSize: "13px", fontWeight: 700, color: "#a855f7", letterSpacing: "1px", textTransform: "uppercase" }}>The Challenge</span>
                <p className="story-text" style={{ fontSize: "17px", color: "rgba(255, 255, 255, 0.65)", lineHeight: 1.8, marginTop: "10px", opacity: 0 }}>
                  We recognized that traditional trading platforms were either too complex for beginners or lacked the sophisticated tools professional traders needed. So we built something different — a platform that serves everyone.
                </p>
              </div>

              <div className="story-milestone" style={{ opacity: 0, position: "relative", paddingLeft: "20px" }}>
                <div style={{ position: "absolute", left: "-42px", top: "6px", width: "12px", height: "12px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 15px rgba(16, 185, 129, 0.5)" }} />
                <span style={{ fontSize: "13px", fontWeight: 700, color: "#10b981", letterSpacing: "1px", textTransform: "uppercase" }}>Today</span>
                <p className="story-text" style={{ fontSize: "17px", color: "rgba(255, 255, 255, 0.65)", lineHeight: 1.8, marginTop: "10px", opacity: 0 }}>
                  Today, Uptrender combines India&apos;s smartest AI with real-time market sentiment analysis, no-code strategy builders, and smart copy trading — all in one seamless platform trusted by 100,000+ traders worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section ref={missionRef} style={{ padding: "100px 0", background: "linear-gradient(180deg, #0a0a0a 0%, #0d0f18 50%, #0a0a0a 100%)", position: "relative", perspective: "1000px" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "800px", height: "800px", background: "radial-gradient(circle, rgba(0, 240, 255, 0.04) 0%, transparent 60%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 60px", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 className="mv-title" style={{ fontSize: "48px", fontWeight: 700, marginBottom: "16px", opacity: 0 }}>
              What Drives Us<span style={{ color: "#00f0ff" }}>.</span>
            </h2>
          </div>

          {/* Mission & Vision Cards */}
          <div className="mv-cards" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", marginBottom: "80px" }}>
            {/* Mission */}
            <div className="mv-card" style={{ background: "linear-gradient(135deg, rgba(0, 240, 255, 0.06) 0%, rgba(0, 100, 200, 0.08) 100%)", border: "1px solid rgba(0, 240, 255, 0.15)", borderRadius: "24px", padding: "48px", position: "relative", overflow: "hidden", opacity: 0, transition: "transform 0.4s ease, box-shadow 0.4s ease" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-8px) scale(1.02)"; e.currentTarget.style.boxShadow = "0 20px 60px rgba(0, 240, 255, 0.15)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "200px", height: "200px", background: "radial-gradient(circle, rgba(0, 240, 255, 0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
              <div className="mv-icon" style={{ width: "56px", height: "56px", background: "linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(0, 150, 255, 0.3))", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>
              </div>
              <h3 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "16px" }}>Our Mission</h3>
              <p style={{ fontSize: "16px", color: "rgba(255, 255, 255, 0.65)", lineHeight: 1.8 }}>
                To empower every trader — from first-time investors to seasoned professionals — with AI-driven tools, institutional-grade analytics, and seamless execution, making world-class trading accessible to all.
              </p>
            </div>

            {/* Vision */}
            <div className="mv-card" style={{ background: "linear-gradient(135deg, rgba(139, 92, 246, 0.06) 0%, rgba(109, 40, 217, 0.08) 100%)", border: "1px solid rgba(139, 92, 246, 0.15)", borderRadius: "24px", padding: "48px", position: "relative", overflow: "hidden", opacity: 0, transition: "transform 0.4s ease, box-shadow 0.4s ease" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-8px) scale(1.02)"; e.currentTarget.style.boxShadow = "0 20px 60px rgba(139, 92, 246, 0.15)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "200px", height: "200px", background: "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
              <div className="mv-icon" style={{ width: "56px", height: "56px", background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(109, 40, 217, 0.3))", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
              </div>
              <h3 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "16px" }}>Our Vision</h3>
              <p style={{ fontSize: "16px", color: "rgba(255, 255, 255, 0.65)", lineHeight: 1.8 }}>
                To become the world&apos;s most trusted and innovative trading ecosystem — where technology and community converge to redefine how people trade, invest, and build wealth globally.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span className="values-title-badge" style={{ display: "inline-block", background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.2)", borderRadius: "50px", padding: "8px 20px", fontSize: "12px", fontWeight: 600, color: "#10b981", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "20px", opacity: 0 }}>Our Values</span>
            <h2 className="values-title" style={{ fontSize: "42px", fontWeight: 700, opacity: 0 }}>
              What We Stand For<span style={{ color: "#10b981" }}>.</span>
            </h2>
          </div>

          <div className="values-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}>
            {[
              { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>, title: "Innovation", desc: "Pushing boundaries with AI-powered insights and cutting-edge technology.", color: "#00f0ff" },
              { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>, title: "Trust & Security", desc: "Bank-level security protecting your funds and data at every step.", color: "#10b981" },
              { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>, title: "Community", desc: "A thriving ecosystem of traders who learn, grow, and succeed together.", color: "#a855f7" },
              { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>, title: "Accessibility", desc: "Making professional trading tools available to everyone, everywhere, 24/7.", color: "#f59e0b" },
            ].map((v, i) => (
              <div key={i} className="value-card" style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "20px", padding: "32px", transition: "all 0.3s ease", cursor: "default", opacity: 0 }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${v.color}40`; e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = `0 12px 40px ${v.color}15`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ width: "48px", height: "48px", background: `${v.color}15`, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>{v.icon}</div>
                <h4 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "10px" }}>{v.title}</h4>
                <p style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.55)", lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} style={{ padding: "100px 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0, 240, 255, 0.06) 0%, rgba(139, 92, 246, 0.06) 100%)" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(0, 240, 255, 0.08) 0%, transparent 60%)", pointerEvents: "none" }} />

        <div className="cta-content" style={{ maxWidth: "800px", margin: "0 auto", padding: "0 60px", textAlign: "center", position: "relative", zIndex: 1, opacity: 0 }}>
          <h2 style={{ fontSize: "48px", fontWeight: 800, marginBottom: "20px", lineHeight: 1.15 }}>
            Ready to Trade<br />Smarter?<span style={{ color: "#00f0ff" }}>.</span>
          </h2>
          <p style={{ fontSize: "18px", color: "rgba(255, 255, 255, 0.6)", marginBottom: "40px", lineHeight: 1.7 }}>
            Join 100,000+ traders who trust Uptrender for AI-powered, next-generation trading.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
            <a href="https://app.uptrender.in/auth/register" style={{ display: "inline-block", background: "linear-gradient(135deg, #00f0ff, #00b8d4)", color: "#0a0a0a", padding: "16px 40px", borderRadius: "12px", fontSize: "16px", fontWeight: 700, textDecoration: "none", transition: "all 0.3s ease", boxShadow: "0 8px 30px rgba(0, 240, 255, 0.3)" }}>
              Get Started Free
            </a>
            <Link href="/contact" style={{ display: "inline-block", background: "transparent", color: "#00f0ff", padding: "16px 40px", borderRadius: "12px", fontSize: "16px", fontWeight: 700, textDecoration: "none", border: "1px solid rgba(0, 240, 255, 0.4)", transition: "all 0.3s ease" }}>
              Contact Us
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
