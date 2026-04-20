"use client";

import { useState } from "react";
import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    category: "Market Analysis",
    title: "How AI is Revolutionizing Forex Trading in 2026",
    excerpt:
      "Discover how machine learning algorithms are now predicting currency movements with unprecedented accuracy, and how traders are leveraging these tools for consistent returns.",
    author: "Uptrender Research",
    date: "April 10, 2026",
    readTime: "8 min read",
    featured: true,
    image: "https://img-cdn.inc.com/image/upload/f_webp,q_auto,c_fit/vip/2024/10/inc-stocks-image.jpg",
  },
  {
    id: 2,
    category: "Trading Strategies",
    title: "5 Proven Algo Strategies for Volatile Crypto Markets",
    excerpt:
      "Master the art of algorithmic trading in high-volatility environments. These battle-tested strategies help you capitalize on rapid price swings.",
    author: "Uptrender Team",
    date: "April 7, 2026",
    readTime: "6 min read",
    featured: false,
    image: "https://storage.ghost.io/c/62/b4/62b4c760-ea29-4ca1-bfee-6ed6d992c5d0/content/images/2025/08/image-3-1.png",
  },
  {
    id: 3,
    category: "Product Update",
    title: "Understanding Leverage: A Complete Guide for Indian Traders",
    excerpt:
      "Leverage can amplify both gains and losses. Learn the fundamentals, risk management techniques, and how to use leverage responsibly in CFD trading.",
    author: "Uptrender Academy",
    date: "April 3, 2026",
    readTime: "10 min read",
    featured: false,
    image: "https://www.dominionmarkets.com/blog/images/how-to-choose-the-best-forex-leverage.jpg",
  },
  {
    id: 4,
    category: "Education",
    title: "Introducing Smart Copy Trading — Follow Top Performers Instantly",
    excerpt:
      "Our new copy trading feature lets you mirror the strategies of top-performing traders in real time with one tap. Here's how it works.",
    author: "Uptrender Product",
    date: "March 28, 2026",
    readTime: "5 min read",
    featured: false,
    image: "https://strategicbroking.com/wp-content/uploads/2025/06/copy-trading.jpg",
  },
  {
    id: 5,
    category: "Market Analysis",
    title: "Gold vs Bitcoin: Where Smart Money Is Heading in Q2 2026",
    excerpt:
      "A deep dive into institutional flow data reveals shifting allocations between traditional safe havens and digital assets. What does it mean for retail traders?",
    author: "Uptrender Research",
    date: "March 22, 2026",
    readTime: "7 min read",
    featured: false,
    image: "https://www.puprime.com/wp-content/uploads/2023/11/copy-trader-looking-at-trading-charts-on-mobile-copy-trading-platform-in-front-of-computer-760x420.webp",
  },
  {
    id: 6,
    category: "Educ",
    title: "Risk Management 101: Protecting Your Capital Like a Pro",
    excerpt:
      "The most successful traders aren't the ones who win the most — they're the ones who manage risk best. Learn the frameworks used by institutional desks.",
    author: "Uptrender Academy",
    date: "March 15, 2026",
    readTime: "9 min read",
    featured: false,
    image: "https://cdn.prod.website-files.com/692d3a3e37a293dd19f3b463/699f1c7112ac9b521c2f74ab_69678e791c5c8219eb6ca013_JSPNMmojKpni2gPvx81MdeA.png",
  },
];

const categories = ["All", "Market Analysis", "Trading Strategies", "Education", "Product Update"];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const filteredPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  const featuredPost = blogPosts.find((p) => p.featured);
  const gridPosts = filteredPosts.filter((p) => !p.featured || activeCategory !== "All");

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setNavVisible(false);
      } else {
        setNavVisible(true);
      }
      setLastScrollY(currentScrollY);
    }, { passive: true });
  }

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
            <Link href="/blog" className="nav-link" style={{ color: "#00f0ff" }}>Blog</Link>
            <Link href="/contact" className="nav-link">Contact Us</Link>
          </nav>

          <div className="flex-1" />

          <div className="flex items-center gap-6">
            <a href="https://app.uptrender.in/auth/register" className="btn-primary">Trade Now</a>
            <a href="https://app.uptrender.in/auth/login" className="nav-link">Login</a>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section
        style={{
          paddingTop: "160px",
          paddingBottom: "80px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle glow */}
        <div
          style={{
            position: "absolute",
            top: "-50%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "800px",
            height: "800px",
            background: "radial-gradient(circle, rgba(0,240,255,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "800px", margin: "0 auto", padding: "0 24px" }}>
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
            Uptrender Blog
          </p>
          <h1
            style={{
              color: "#ffffff",
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: "20px",
            }}
          >
            Insights, Strategies &<br />
            Market Intelligence
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "18px", lineHeight: 1.6, maxWidth: "560px", margin: "0 auto" }}>
            Stay ahead of the markets with expert analysis, trading education, and product updates from the Uptrender team.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px 48px",
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: "10px 24px",
              borderRadius: "100px",
              border: activeCategory === cat ? "1px solid #00f0ff" : "1px solid rgba(255,255,255,0.15)",
              background: activeCategory === cat ? "rgba(0,240,255,0.1)" : "transparent",
              color: activeCategory === cat ? "#00f0ff" : "rgba(255,255,255,0.6)",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              if (activeCategory !== cat) {
                e.currentTarget.style.borderColor = "rgba(0,240,255,0.4)";
                e.currentTarget.style.color = "#ffffff";
              }
            }}
            onMouseLeave={(e) => {
              if (activeCategory !== cat) {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                e.currentTarget.style.color = "rgba(255,255,255,0.6)";
              }
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured Post */}
      {activeCategory === "All" && featuredPost && (
        <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px 64px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0",
              borderRadius: "20px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "#111122",
              cursor: "pointer",
              transition: "all 0.4s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(0,240,255,0.3)";
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,240,255,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {/* Image placeholder */}
            <div
              style={{
                ...(featuredPost.image.startsWith('http')
                  ? {
                      backgroundImage: `url(${featuredPost.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }
                  : { background: featuredPost.image }),
                minHeight: "380px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0,0,0,0.2)",
                }}
              />
              <svg
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="1"
                style={{ position: "relative", zIndex: 1 }}
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>

            {/* Content */}
            <div style={{ padding: "48px 40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <span
                style={{
                  display: "inline-block",
                  width: "fit-content",
                  padding: "6px 16px",
                  background: "rgba(0,240,255,0.1)",
                  border: "1px solid rgba(0,240,255,0.2)",
                  borderRadius: "100px",
                  color: "#00f0ff",
                  fontSize: "12px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: "20px",
                }}
              >
                {featuredPost.category}
              </span>
              <h2
                style={{
                  color: "#ffffff",
                  fontSize: "28px",
                  fontWeight: 700,
                  lineHeight: 1.25,
                  marginBottom: "16px",
                }}
              >
                {featuredPost.title}
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "16px",
                  lineHeight: 1.7,
                  marginBottom: "28px",
                }}
              >
                {featuredPost.excerpt}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "13px",
                  fontWeight: 500,
                }}
              >
                <span>{featuredPost.author}</span>
                <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(255,255,255,0.3)" }} />
                <span>{featuredPost.date}</span>
                <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(255,255,255,0.3)" }} />
                <span>{featuredPost.readTime}</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px 100px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
            gap: "32px",
          }}
        >
          {(activeCategory === "All" ? gridPosts.filter((p) => !p.featured) : gridPosts).map((post) => (
            <article
              key={post.id}
              style={{
                background: "#111122",
                borderRadius: "16px",
                border: "1px solid rgba(255,255,255,0.08)",
                overflow: "hidden",
                cursor: "pointer",
                transition: "all 0.4s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(0,240,255,0.3)";
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,240,255,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Card image */}
              <div
                style={{
                  ...(post.image.startsWith('http')
                    ? {
                        backgroundImage: `url(${post.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }
                    : { background: post.image }),
                  height: "200px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.15)" }} />
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="1"
                  style={{ position: "relative", zIndex: 1 }}
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </div>

              {/* Card content */}
              <div style={{ padding: "28px 24px" }}>
                <span
                  style={{
                    display: "inline-block",
                    padding: "4px 12px",
                    background: "rgba(0,240,255,0.08)",
                    border: "1px solid rgba(0,240,255,0.15)",
                    borderRadius: "100px",
                    color: "#00f0ff",
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    marginBottom: "16px",
                  }}
                >
                  {post.category}
                </span>
                <h3
                  style={{
                    color: "#ffffff",
                    fontSize: "20px",
                    fontWeight: 700,
                    lineHeight: 1.3,
                    marginBottom: "12px",
                  }}
                >
                  {post.title}
                </h3>
                <p
                  style={{
                    color: "rgba(255,255,255,0.55)",
                    fontSize: "14px",
                    lineHeight: 1.7,
                    marginBottom: "24px",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {post.excerpt}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px" }}>{post.date}</span>
                  <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px" }}>{post.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px 100px" }}>
        <div
          style={{
            background: "linear-gradient(135deg, rgba(0,240,255,0.08), rgba(0,128,255,0.08))",
            border: "1px solid rgba(0,240,255,0.2)",
            borderRadius: "20px",
            padding: "64px 48px",
            textAlign: "center",
          }}
        >
          <h2 style={{ color: "#ffffff", fontSize: "32px", fontWeight: 700, marginBottom: "12px" }}>
            Never Miss a Market Move
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "16px", marginBottom: "36px", maxWidth: "480px", margin: "0 auto 36px" }}>
            Subscribe to our newsletter for weekly insights, strategy breakdowns, and exclusive trading tips.
          </p>
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              maxWidth: "500px",
              margin: "0 auto",
              flexWrap: "wrap",
            }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                flex: 1,
                minWidth: "240px",
                padding: "16px 20px",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(255,255,255,0.05)",
                color: "#ffffff",
                fontSize: "15px",
                outline: "none",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "rgba(0,240,255,0.5)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              }}
            />
            <button
              style={{
                padding: "16px 32px",
                borderRadius: "10px",
                border: "none",
                background: "linear-gradient(135deg, #00f0ff, #0080ff)",
                color: "#0a0a14",
                fontSize: "15px",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.3s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,240,255,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Subscribe
            </button>
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
                href="/contact"
                style={{ color: "#9ca3af", textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#00f0ff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
              >
                Contact
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
