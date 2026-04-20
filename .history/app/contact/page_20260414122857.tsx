"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  if (typeof window !== "undefined") {
    window.addEventListener(
      "scroll",
      () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setNavVisible(false);
        } else {
          setNavVisible(true);
        }
        setLastScrollY(currentScrollY);
      },
      { passive: true }
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "16px 20px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.04)",
    color: "#ffffff",
    fontSize: "15px",
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
  };

  const contactCards = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="1.5">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      title: "Email Us",
      detail: "support@uptrender.in",
      subtitle: "We reply within 24 hours",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="1.5">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      title: "Office",
      detail: "Ebene, Mauritius",
      subtitle: "40 Silicon Avenue, The Catalyst",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      title: "Working Hours",
      detail: "Mon – Fri, 9AM – 6PM",
      subtitle: "IST (UTC+5:30)",
    },
  ];

  return (
    <div className="relative" style={{ background: "#0a0a14", minHeight: "100vh" }}>
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
            <Link href="/#about" className="nav-link">About Us</Link>
            <Link href="/#features" className="nav-link">Features</Link>
            <Link href="/#services" className="nav-link">Services</Link>
            <Link href="/#pricing" className="nav-link">Pricing</Link>
            <Link href="/blog" className="nav-link">Blog</Link>
            <Link href="/contact" className="nav-link" style={{ color: "#00f0ff" }}>Contact Us</Link>
          </nav>

          <div className="flex-1" />

          <div className="flex items-center gap-6">
            <a href="https://app.uptrender.in/auth/register" className="btn-primary">Trade Now</a>
            <a href="https://app.uptrender.in/auth/login" className="nav-link">Login</a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section
        style={{
          paddingTop: "160px",
          paddingBottom: "60px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-40%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "900px",
            height: "900px",
            background: "radial-gradient(circle, rgba(0,240,255,0.05) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "700px", margin: "0 auto", padding: "0 24px" }}>
          <p
            style={{
              color: "#00f0ff",
              fontSize: "14px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "3px",
              marginBottom: "16px",
            }}
          >
            Get in Touch
          </p>
          <h1
            style={{
              color: "#ffffff",
              fontSize: "clamp(36px, 5vw, 52px)",
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: "20px",
            }}
          >
            We'd Love to<br />Hear From You
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "18px", lineHeight: 1.6 }}>
            Have questions about our platform, need support, or want to explore partnership opportunities? Reach out and we'll get back to you promptly.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 24px 64px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
          {contactCards.map((card, i) => (
            <div
              key={i}
              style={{
                background: "#111122",
                borderRadius: "16px",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "32px 28px",
                textAlign: "center",
                transition: "all 0.4s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(0,240,255,0.3)";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,240,255,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "14px",
                  background: "rgba(0,240,255,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                }}
              >
                {card.icon}
              </div>
              <h3 style={{ color: "#ffffff", fontSize: "18px", fontWeight: 700, marginBottom: "8px" }}>
                {card.title}
              </h3>
              <p style={{ color: "#00f0ff", fontSize: "15px", fontWeight: 600, marginBottom: "4px" }}>
                {card.detail}
              </p>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px" }}>{card.subtitle}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 24px 100px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "64px",
            alignItems: "start",
          }}
        >
          {/* Left - Form */}
          <div>
            <h2 style={{ color: "#ffffff", fontSize: "28px", fontWeight: 700, marginBottom: "8px" }}>
              Send Us a Message
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "15px", marginBottom: "36px" }}>
              Fill out the form below and our team will respond within 24 hours.
            </p>

            {submitted && (
              <div
                style={{
                  padding: "16px 20px",
                  borderRadius: "12px",
                  border: "1px solid rgba(0,240,255,0.3)",
                  background: "rgba(0,240,255,0.06)",
                  color: "#00f0ff",
                  fontSize: "14px",
                  fontWeight: 600,
                  marginBottom: "24px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                Message sent! We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: "13px", fontWeight: 600, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px" }}>
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  style={inputStyle}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "rgba(0,240,255,0.5)";
                    e.currentTarget.style.boxShadow = "0 0 20px rgba(0,240,255,0.08)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: "13px", fontWeight: 600, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px" }}>
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  style={inputStyle}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "rgba(0,240,255,0.5)";
                    e.currentTarget.style.boxShadow = "0 0 20px rgba(0,240,255,0.08)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: "13px", fontWeight: 600, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px" }}>
                  Subject
                </label>
                <select
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  style={{
                    ...inputStyle,
                    appearance: "none",
                    cursor: "pointer",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='rgba(255,255,255,0.4)' stroke-width='1.5'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 20px center",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "rgba(0,240,255,0.5)";
                    e.currentTarget.style.boxShadow = "0 0 20px rgba(0,240,255,0.08)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <option value="" disabled style={{ background: "#0a0a14" }}>Select a topic</option>
                  <option value="general" style={{ background: "#0a0a14" }}>General Inquiry</option>
                  <option value="support" style={{ background: "#0a0a14" }}>Technical Support</option>
                  <option value="partnership" style={{ background: "#0a0a14" }}>Partnership</option>
                  <option value="feedback" style={{ background: "#0a0a14" }}>Feedback</option>
                  <option value="other" style={{ background: "#0a0a14" }}>Other</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: "13px", fontWeight: 600, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px" }}>
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us how we can help..."
                  style={{ ...inputStyle, resize: "vertical", minHeight: "130px" }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "rgba(0,240,255,0.5)";
                    e.currentTarget.style.boxShadow = "0 0 20px rgba(0,240,255,0.08)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  padding: "18px 40px",
                  borderRadius: "12px",
                  border: "none",
                  background: "linear-gradient(135deg, #00f0ff, #0080ff)",
                  color: "#0a0a14",
                  fontSize: "16px",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  marginTop: "8px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,240,255,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Right - Info Panel */}
          <div
            style={{
              background: "#111122",
              borderRadius: "20px",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "40px 36px",
              position: "sticky",
              top: "120px",
            }}
          >
            <h3 style={{ color: "#ffffff", fontSize: "22px", fontWeight: 700, marginBottom: "24px" }}>
              Why Trade with Uptrender?
            </h3>

            {[
              {
                title: "AI-Powered Insights",
                desc: "Real-time market sentiment analysis powered by cutting-edge machine learning algorithms.",
              },
              {
                title: "Lightning Fast Execution",
                desc: "Sub-millisecond order execution with zero requotes and minimal slippage.",
              },
              {
                title: "24/7 Expert Support",
                desc: "Our dedicated support team is available around the clock to help you succeed.",
              },
              {
                title: "Secure & Regulated",
                desc: "Multi-jurisdictional regulation with bank-grade encryption for your peace of mind.",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "16px",
                  marginBottom: i < 3 ? "28px" : 0,
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    background: "rgba(0,240,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: "2px",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <h4 style={{ color: "#ffffff", fontSize: "15px", fontWeight: 700, marginBottom: "4px" }}>
                    {item.title}
                  </h4>
                  <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}

            <div
              style={{
                marginTop: "36px",
                paddingTop: "28px",
                borderTop: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <a
                href="https://app.uptrender.in/auth/register"
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "16px 32px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #00f0ff, #0080ff)",
                  color: "#0a0a14",
                  fontSize: "15px",
                  fontWeight: 700,
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,240,255,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Start Trading Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          background: "#0a0a0a",
          color: "#9ca3af",
          borderTop: "2px solid rgba(0, 240, 255, 0.3)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 24px 40px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "24px",
            }}
          >
            <Link href="/" style={{ textDecoration: "none" }}>
              <span style={{ fontSize: "24px", fontWeight: 700 }}>
                <span style={{ color: "#ffffff" }}>up</span>
                <span style={{ color: "#00f0ff" }}>trender</span>
              </span>
            </Link>
            <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
              <Link
                href="/privacy-policy"
                style={{ color: "#9ca3af", textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#00f0ff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-and-conditions"
                style={{ color: "#9ca3af", textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#00f0ff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
              >
                Terms & Conditions
              </Link>
              <Link
                href="/blog"
                style={{ color: "#9ca3af", textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#00f0ff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
              >
                Blog
              </Link>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", marginTop: "32px", paddingTop: "24px", textAlign: "center" }}>
            <p style={{ fontSize: "13px", color: "#6b7280" }}>© 2026 Uptrender. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
