"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
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
      const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  
  // Hero animations - Optimized for performance
  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      // Batch all hero animations into a single timeline for better performance
      gsap.fromTo(".about-hero-title", { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", force3D: true, delay: 0.2 });
      gsap.fromTo(".about-hero-desc", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", force3D: true, delay: 0.4 });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // Story section animations - Optimized with ScrollTrigger batching
  useEffect(() => {
    if (!storyRef.current) return;
    const ctx = gsap.context(() => {
      // Batch story animations
      gsap.fromTo(".story-badge", 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", force3D: true, scrollTrigger: { trigger: ".story-badge", start: "top 85%", toggleActions: "play none none none" } }
      );
      
      gsap.fromTo(".story-title", 
        { opacity: 0, y: 40 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", force3D: true, scrollTrigger: { trigger: ".story-title", start: "top 85%", toggleActions: "play none none none" } }
      );
      
      gsap.fromTo(".story-text", 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", force3D: true, scrollTrigger: { trigger: ".story-text", start: "top 85%", toggleActions: "play none none none" } }
      );
      
      gsap.fromTo(".story-line", 
        { scaleY: 0 }, 
        { scaleY: 1, duration: 1, ease: "power3.out", force3D: true, scrollTrigger: { trigger: ".story-line", start: "top 85%", toggleActions: "play none none none" } }
      );
      
      gsap.fromTo(".story-milestone", 
        { opacity: 0, x: -30 }, 
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.15, ease: "power3.out", force3D: true, scrollTrigger: { trigger: ".story-milestones", start: "top 80%", toggleActions: "play none none none" } }
      );
    }, storyRef);
    return () => ctx.revert();
  }, []);

  // Mission/Vision animations - Optimized with batching and GPU acceleration
  useEffect(() => {
    if (!missionRef.current) return;
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(".mv-title", 
        { opacity: 0, y: 50, scale: 0.9 }, 
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 1, 
          ease: "back.out(1.5)", 
          force3D: true,
          scrollTrigger: { 
            trigger: ".mv-title", 
            start: "top 80%", 
            toggleActions: "play none none none" 
          } 
        }
      );
      
      // Mission and Vision cards - staggered with GPU acceleration
      gsap.fromTo(".mv-card", 
        { opacity: 0, y: 80, scale: 0.85 }, 
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.8, 
          stagger: 0.15, 
          ease: "power4.out", 
          force3D: true,
          scrollTrigger: { 
            trigger: ".mv-cards", 
            start: "top 80%", 
            toggleActions: "play none none none" 
          } 
        }
      );
      
      // Floating icon animation - reduced intensity
      gsap.to(".mv-icon", { y: -6, duration: 2.5, ease: "sine.inOut", yoyo: true, repeat: -1, force3D: true, stagger: 0.2 });
      
      // Values section animations
      gsap.fromTo(".values-title", 
        { opacity: 0, y: 40 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: "power3.out", 
          force3D: true,
          scrollTrigger: { 
            trigger: ".values-title", 
            start: "top 85%", 
            toggleActions: "play none none none" 
          } 
        }
      );
      
      // Value cards - simpler animation
      gsap.fromTo(".value-card", 
        { opacity: 0, y: 50, scale: 0.9 }, 
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.7, 
          stagger: 0.1, 
          ease: "back.out(1)", 
          force3D: true,
          scrollTrigger: { 
            trigger: ".values-grid", 
            start: "top 80%", 
            toggleActions: "play none none none" 
          } 
        }
      );
    }, missionRef);
    return () => ctx.revert();
  }, []);

  // CTA animations - Optimized
  useEffect(() => {
    if (!ctaRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".cta-content", 
        { opacity: 0, y: 40 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.9, 
          ease: "power3.out", 
          force3D: true,
          scrollTrigger: { 
            trigger: ".cta-content", 
            start: "top 85%", 
            toggleActions: "play none none none" 
          } 
        }
      );
    }, ctaRef);
    return () => ctx.revert();
  }, []);

  // Refresh ScrollTrigger on mount to ensure animations trigger correctly
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Refresh ScrollTrigger on client-side route changes
  const pathname = usePathname();
  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(true), 80);
    return () => clearTimeout(t);
  }, [pathname]);

  // Fallback: ensure animated elements are visible if GSAP failed to run
  useEffect(() => {
    const selectors = [
      '.about-hero-title',
      '.about-hero-desc',
      '.story-badge',
      '.story-title',
      '.story-text',
      '.story-line',
      '.story-milestone',
      '.mv-title',
      '.mv-card',
      '.mv-icon',
      '.values-title',
      '.value-card',
      '.cta-content'
    ];

    const makeVisible = () => {
      selectors.forEach((sel) => {
        document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
          try {
            const comp = window.getComputedStyle(el);
            if (comp && comp.opacity === '0') {
              el.style.opacity = '1';
              el.style.transform = 'none';
            }
          } catch (e) {
            // ignore
          }
        });
      });
    };

    // Run only once on mount to ensure elements are visible as fallback
    const t1 = setTimeout(makeVisible, 800);

    return () => {
      clearTimeout(t1);
    };
  }, [pathname]);

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "#ffffff" }}>
      {/* Gradient Grid Keyframes - Optimized for performance */}
      <style>{`
        @keyframes gridPulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.02); opacity: 0.7; }
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
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes letterAppear {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.5);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes wordPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        .uptrender-letter {
          display: inline-block;
          opacity: 0;
          animation: letterAppear 0.6s ease-out forwards;
          will-change: transform, opacity;
        }
        .uptrender-word {
          animation: wordPulse 2s ease-in-out infinite;
          animation-delay: 5s;
          will-change: transform;
        }
        .grid-cell {
          will-change: transform, background;
          transition: transform 0.3s ease, background 0.3s ease;
        }
        .grid-cell:hover {
          background: rgba(0, 240, 255, 0.12) !important;
          border-color: rgba(0, 240, 255, 0.4) !important;
          box-shadow: 0 0 20px rgba(0, 240, 255, 0.15);
          transform: scale(1.05);
        }
        .animated-glow {
          will-change: transform, opacity;
        }
        .animated-icon {
          will-change: transform;
        }
      `}</style>

      {/* Hero Section - Fullscreen Video Background */}
      <section ref={heroRef} style={{ 
        position: "relative", 
        minHeight: "100vh", 
        overflow: "hidden",
        display: "flex",
        alignItems: "center"
      }}>
        {/* Fullscreen Background Video */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0
        }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block"
            }}
          >
            <source src="/sun.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Dark overlay for better text readability */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to right, rgba(10, 10, 20, 0.85) 0%, rgba(10, 10, 20, 0.6) 50%, rgba(10, 10, 20, 0.3) 100%)",
            pointerEvents: "none"
          }} />
        </div>

        {/* Content Container */}
        <div style={{ 
          maxWidth: "1300px", 
          margin: "0 auto", 
          padding: "140px 60px 80px", 
          position: "relative", 
          zIndex: 1,
          width: "100%"
        }}>
          {/* Left - Content */}
          <div style={{ maxWidth: "600px" }}>
            <h1 className="about-hero-title" style={{ 
              fontSize: "clamp(40px, 5vw, 72px)", 
              fontWeight: 800, 
              lineHeight: 1.05, 
              marginBottom: "28px", 
              textShadow: "0 4px 20px rgba(0, 0, 0, 0.5)"
            }}>
              Making <span style={{ 
                background: "linear-gradient(135deg, #00f0ff, #a855f7)", 
                WebkitBackgroundClip: "text", 
                WebkitTextFillColor: "transparent" 
              }}>Forex & Crypto</span><br />
              Trading Smarter<br />
              for Everyone<span style={{ color: "#00f0ff" }}>.</span>
            </h1>

            <p className="about-hero-desc" style={{ 
              fontSize: "19px", 
              color: "rgba(255, 255, 255, 0.85)", 
              maxWidth: "580px", 
              lineHeight: 1.7, 
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)"
            }}>
              Uptrender is India&apos;s first &amp; most advanced AI-powered algo trading platform built exclusively for Forex and Crypto. Designed by traders for traders, it turns complex markets into simple, intelligent, and profitable automation - no coding, no guesswork, just smarter trading.
            </p>
          </div>
        </div>
      </section>

      {/* Divider Line */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", height: "1px", background: "linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.3), transparent)" }} />

      {/* Our Story Section - 80% width, left aligned, attractive */}
      <section ref={storyRef} style={{ padding: "100px 0" }}>
        <div style={{ width: "80%", padding: "0 60px" }}>
          {/* Story header */}
          <span className="story-badge" style={{ display: "inline-block", background: "rgba(0, 240, 255, 0.1)", border: "1px solid rgba(0, 240, 255, 0.2)", borderRadius: "50px", padding: "8px 20px", fontSize: "12px", fontWeight: 600, color: "#00f0ff", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "20px" }}>Our Story</span>
          <h2 className="story-title" style={{ fontSize: "48px", fontWeight: 700, lineHeight: 1.15, marginBottom: "60px" }}>
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
              <div className="story-milestone" style={{ position: "relative", paddingLeft: "20px" }}>
                <div style={{ position: "absolute", left: "-42px", top: "6px", width: "12px", height: "12px", borderRadius: "50%", background: "#00f0ff", boxShadow: "0 0 15px rgba(0, 240, 255, 0.5)" }} />
                <span style={{ fontSize: "13px", fontWeight: 700, color: "#00f0ff", letterSpacing: "1px", textTransform: "uppercase" }}>The Beginning</span>
                <p className="story-text" style={{ fontSize: "17px", color: "rgba(255, 255, 255, 0.65)", lineHeight: 1.8, marginTop: "10px" }}>
                  Uptrender was born from a simple vision: to democratize trading by making advanced market intelligence accessible to every trader in India and around the world. We saw the gap between complex institutional tools and what retail traders had access to.
                </p>
              </div>

              <div className="story-milestone" style={{ position: "relative", paddingLeft: "20px" }}>
                <div style={{ position: "absolute", left: "-42px", top: "6px", width: "12px", height: "12px", borderRadius: "50%", background: "#a855f7", boxShadow: "0 0 15px rgba(168, 85, 247, 0.5)" }} />
                <span style={{ fontSize: "13px", fontWeight: 700, color: "#a855f7", letterSpacing: "1px", textTransform: "uppercase" }}>The Challenge</span>
                <p className="story-text" style={{ fontSize: "17px", color: "rgba(255, 255, 255, 0.65)", lineHeight: 1.8, marginTop: "10px" }}>
                  We recognized that traditional trading platforms were either too complex for beginners or lacked the sophisticated tools professional traders needed. So we built something different — a platform that serves everyone.
                </p>
              </div>

              <div className="story-milestone" style={{ position: "relative", paddingLeft: "20px" }}>
                <div style={{ position: "absolute", left: "-42px", top: "6px", width: "12px", height: "12px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 15px rgba(16, 185, 129, 0.5)" }} />
                <span style={{ fontSize: "13px", fontWeight: 700, color: "#10b981", letterSpacing: "1px", textTransform: "uppercase" }}>Today</span>
                <p className="story-text" style={{ fontSize: "17px", color: "rgba(255, 255, 255, 0.65)", lineHeight: 1.8, marginTop: "10px" }}>
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
            <div className="mv-card" style={{ background: "linear-gradient(135deg, rgba(0, 240, 255, 0.06) 0%, rgba(0, 100, 200, 0.08) 100%)", border: "1px solid rgba(0, 240, 255, 0.15)", borderRadius: "24px", padding: "48px", position: "relative", overflow: "hidden", transition: "transform 0.4s ease, box-shadow 0.4s ease" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-8px) scale(1.02)"; e.currentTarget.style.boxShadow = "0 20px 60px rgba(0, 240, 255, 0.15)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "200px", height: "200px", background: "radial-gradient(circle, rgba(0, 240, 255, 0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
              <div className="mv-icon" style={{ width: "56px", height: "56px", background: "linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(0, 150, 255, 0.3))", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>
              </div>
              <h3 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "16px" }}>Our Mission</h3>
              <p style={{ fontSize: "16px", color: "rgba(255, 255, 255, 0.65)", lineHeight: 1.8 }}>
                To simplify algo trading for every Forex and Crypto trader by removing complexity and enabling clarity, automation, and confidence - no coding or technical expertise required.
              </p>
            </div>

            {/* Vision */}
            <div className="mv-card" style={{ background: "linear-gradient(135deg, rgba(139, 92, 246, 0.06) 0%, rgba(109, 40, 217, 0.08) 100%)", border: "1px solid rgba(139, 92, 246, 0.15)", borderRadius: "24px", padding: "48px", position: "relative", overflow: "hidden", transition: "transform 0.4s ease, box-shadow 0.4s ease" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-8px) scale(1.02)"; e.currentTarget.style.boxShadow = "0 20px 60px rgba(139, 92, 246, 0.15)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "200px", height: "200px", background: "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
              <div className="mv-icon" style={{ width: "56px", height: "56px", background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(109, 40, 217, 0.3))", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
              </div>
              <h3 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "16px" }}>Our Vision</h3>
              <p style={{ fontSize: "16px", color: "rgba(255, 255, 255, 0.65)", lineHeight: 1.8 }}>
                To create a future where traders stay ahead using AI-driven automation, scaling across global Forex and Crypto markets without limits of time, tools, or skills.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 className="values-title" style={{ fontSize: "42px", fontWeight: 700 }}>
              What Makes Us <span style={{ 
                background: "linear-gradient(135deg, #00f0ff, #a855f7)", 
                WebkitBackgroundClip: "text", 
                WebkitTextFillColor: "transparent" 
              }}>Different</span><span style={{ color: "#00f0ff" }}>.</span>
            </h2>
          </div>

          <div className="values-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}>
            {[
              { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>, title: "AI that reads Markets", desc: "Not just automation — real-time sentiment-based decision support", color: "#00f0ff" },
              { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>, title: "No-Code Simplicity", desc: "Build strategies without technical knowledge", color: "#10b981" },
              { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>, title: "Forex + Crypto in One Platform", desc: "One dashboard. Multiple opportunities", color: "#a855f7" },
              { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>, title: "Built for Real Traders", desc: "Every feature is designed based on real trading problems", color: "#f59e0b" },
            ].map((v, i) => (
              <div key={i} className="value-card" style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "20px", padding: "32px", transition: "all 0.3s ease", cursor: "default" }}
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

        <div className="cta-content" style={{ maxWidth: "800px", margin: "0 auto", padding: "0 60px", textAlign: "center", position: "relative", zIndex: 1 }}>
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
      
    </div>
  );
}
