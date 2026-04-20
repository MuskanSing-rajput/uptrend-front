"use client";

import Link from 'next/link';

export default function About() {
  return (
    <div className="about-page" style={{ background: '#0a0a0a', minHeight: '100vh', color: '#ffffff' }}>
      {/* Header */}
      <header className="navbar navbar-visible" style={{ position: 'fixed', top: 0, left: 0, right: 0, width: '100%', zIndex: 100, padding: 0 }}>
        <div className="navbar-inner" style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '16px 24px', background: 'rgba(5, 7, 16, 0.6)', backdropFilter: 'blur(10px)', borderRadius: 0, marginTop: 0 }}>
          {/* Logo */}
          <Link href="/" className="logo-wrap" style={{ display: 'flex', alignItems: 'center', gap: '3px', marginRight: '72px', textDecoration: 'none' }}>
            <span className="logo-mark" aria-label="uptrender">
              <span className="logo-v" style={{ color: '#ffffff' }}>up</span>
              <span className="logo-t" style={{ color: '#ffffff' }}>trender</span>
              <span className="logo-dot" style={{ background: '#00f0ff' }}></span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center nav-menu">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/about" className="nav-link" style={{ color: '#00f0ff' }}>About Us</Link>
            <Link href="#" className="nav-link">Features</Link>
            <Link href="#" className="nav-link">Services</Link>
            <Link href="/blog" className="nav-link">Blog</Link>
            <Link href="/contact" className="nav-link">Contact Us</Link>
          </nav>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Right Actions */}
          <div className="flex items-center gap-6">
            <a href="https://app.uptrender.in/auth/register" className="btn-primary">Trade Now</a>
            <a href="https://app.uptrender.in/auth/login" className="nav-link">Login</a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ paddingTop: '120px', paddingBottom: '80px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 60px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{ display: 'inline-block', background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.15), rgba(0, 150, 255, 0.15))', border: '1px solid rgba(0, 240, 255, 0.3)', borderRadius: '50px', padding: '10px 28px', fontSize: '14px', fontWeight: 600, color: '#00f0ff', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '24px' }}>About Us</span>
            <h1 style={{ fontSize: '64px', fontWeight: 700, lineHeight: 1.1, marginBottom: '24px' }}>
              Empowering Traders in <span style={{ color: '#00f0ff' }}>India & Beyond</span><span style={{ color: '#dc2626' }}>.</span>
            </h1>
            <p style={{ fontSize: '20px', color: 'rgba(255, 255, 255, 0.7)', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
              India's most innovative trading platform powered by cutting-edge AI technology, designed to make Forex & Crypto trading accessible, intelligent, and profitable for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section style={{ background: '#0d0d0d', padding: '100px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 60px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '42px', fontWeight: 700, marginBottom: '24px' }}>
                Our Story<span style={{ color: '#00f0ff' }}>.</span>
              </h2>
              <p style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.8, marginBottom: '20px' }}>
                Uptrender was born from a simple vision: to democratize trading by making advanced market intelligence accessible to every trader in India and around the world.
              </p>
              <p style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.8, marginBottom: '20px' }}>
                We recognized that traditional trading platforms were either too complex for beginners or lacked the sophisticated tools professional traders needed. So we built something different.
              </p>
              <p style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.8 }}>
                Today, Uptrender combines India's smartest AI with real-time market sentiment analysis, no-code strategy builders, and smart copy trading—all in one seamless platform accessible from anywhere.
              </p>
            </div>
            <div style={{ background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.1), rgba(0, 150, 255, 0.1))', borderRadius: '24px', padding: '60px', border: '1px solid rgba(0, 240, 255, 0.2)' }}>
              <div style={{ marginBottom: '40px' }}>
                <h3 style={{ fontSize: '48px', fontWeight: 700, color: '#00f0ff', marginBottom: '8px' }}>100K+</h3>
                <p style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.6)' }}>Active Traders</p>
              </div>
              <div style={{ marginBottom: '40px' }}>
                <h3 style={{ fontSize: '48px', fontWeight: 700, color: '#00f0ff', marginBottom: '8px' }}>$50M+</h3>
                <p style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.6)' }}>Trading Volume</p>
              </div>
              <div>
                <h3 style={{ fontSize: '48px', fontWeight: 700, color: '#00f0ff', marginBottom: '8px' }}>24/7</h3>
                <p style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.6)' }}>Expert Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section style={{ padding: '100px 0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 60px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '48px', fontWeight: 700, marginBottom: '20px' }}>
              Our Core Values<span style={{ color: '#00f0ff' }}>.</span>
            </h2>
            <p style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.7)', maxWidth: '700px', margin: '0 auto' }}>
              These principles guide everything we do at Uptrender
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
            {/* Value 1 */}
            <div style={{ background: '#141419', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '20px', padding: '40px', transition: 'all 0.3s ease' }}>
              <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(0, 150, 255, 0.2))', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>Innovation First</h3>
              <p style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.7 }}>
                Constantly pushing boundaries with AI-powered insights and cutting-edge technology.
              </p>
            </div>

            {/* Value 2 */}
            <div style={{ background: '#141419', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '20px', padding: '40px', transition: 'all 0.3s ease' }}>
              <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.2))', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>Trust & Security</h3>
              <p style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.7 }}>
                Your funds and data are protected with bank-level security and transparency.
              </p>
            </div>

            {/* Value 3 */}
            <div style={{ background: '#141419', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '20px', padding: '40px', transition: 'all 0.3s ease' }}>
              <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(190, 24, 93, 0.2))', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>Community Driven</h3>
              <p style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.7 }}>
                Building a thriving community of traders who learn, grow, and succeed together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.1), rgba(0, 150, 255, 0.05))', padding: '80px 0', marginBottom: '60px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 60px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '48px', fontWeight: 700, marginBottom: '24px' }}>
            Ready to Start Trading?<span style={{ color: '#00f0ff' }}>.</span>
          </h2>
          <p style={{ fontSize: '20px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '40px', lineHeight: 1.6 }}>
            Join thousands of traders who trust Uptrender for smarter, faster trading
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <a href="https://app.uptrender.in/auth/register" style={{ display: 'inline-block', background: '#00f0ff', color: '#0a0a0a', padding: '16px 40px', borderRadius: '8px', fontSize: '16px', fontWeight: 700, textDecoration: 'none', transition: 'all 0.3s ease' }}>
              Get Started Free
            </a>
            <Link href="/contact" style={{ display: 'inline-block', background: 'transparent', color: '#00f0ff', padding: '16px 40px', borderRadius: '8px', fontSize: '16px', fontWeight: 700, textDecoration: 'none', border: '2px solid #00f0ff', transition: 'all 0.3s ease' }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#05070f', padding: '40px 0', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 60px', textAlign: 'center' }}>
          <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '14px' }}>
            © 2026 Uptrender. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
