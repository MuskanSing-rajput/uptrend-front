"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
    category: "Product Update",
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
  const [selectedPost, setSelectedPost] = useState(blogPosts[0]);
  const [showAllPosts, setShowAllPosts] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  const featuredPost = blogPosts.find((p) => p.featured);
  const gridPosts = filteredPosts.filter((p) => !p.featured || activeCategory !== "All");

  // Hero animations
  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".blog-title", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 });
      gsap.fromTo(".category-btn", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.5)", delay: 0.5 });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // Featured post animation
  useEffect(() => {
    if (!featuredRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".featured-post", { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".featured-post", start: "top 85%", toggleActions: "play none none none" } });
    }, featuredRef);
    return () => ctx.revert();
  }, [activeCategory]);

  // Grid posts animation
  useEffect(() => {
    if (!gridRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".blog-card", { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.6, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: ".blog-card", start: "top 90%", toggleActions: "play none none none" } });
    }, gridRef);
    return () => ctx.revert();
  }, [activeCategory]);

  // Featured post change animation
  useEffect(() => {
    if (!featuredRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".featured-post-image", { opacity: 0.7, scale: 0.98 }, { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" });
      gsap.fromTo(".featured-post-content", { opacity: 0.7, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
    }, featuredRef);
    return () => ctx.revert();
  }, [selectedPost]);

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
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/about" className="nav-link">About Us</Link>
            <Link href="/services" className="nav-link">Services</Link>
            <Link href="/#pricing" className="nav-link">Pricing</Link>
            <Link href="/#features" className="nav-link">Features</Link>
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
        ref={heroRef}
        style={{
          paddingTop: "140px",
          paddingBottom: "20px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated gradient orbs */}
        <div
          style={{
            position: "absolute",
            top: "-50%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "800px",
            height: "800px",
            background: "radial-gradient(circle, rgba(0,240,255,0.12) 0%, rgba(139,92,246,0.08) 40%, transparent 70%)",
            pointerEvents: "none",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "20%",
            right: "-10%",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 60%)",
            pointerEvents: "none",
            filter: "blur(40px)",
          }}
        />
        
        <div style={{ position: "relative", zIndex: 1, maxWidth: "900px", margin: "0 auto", padding: "0 24px" }}>
          <h1
            className="blog-title"
            style={{
              color: "#ffffff",
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: "16px",
              opacity: 0,
            }}
          >
            Insights, Strategies &<br />
            <span style={{ background: "linear-gradient(135deg, #00f0ff, #a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Market Intelligence</span>
          </h1>
        </div>
      </section>

      {/* Category Filter - Simplified */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 24px 24px",
          display: "flex",
          justifyContent: "flex-start",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        {categories.slice(0, 5).map((cat, index) => (
          <button
            key={cat}
            className="category-btn"
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: "10px 24px",
              borderRadius: "100px",
              border: activeCategory === cat ? "1px solid #00f0ff" : "1px solid rgba(255,255,255,0.12)",
              background: activeCategory === cat ? "linear-gradient(135deg, rgba(0,240,255,0.15), rgba(0,150,255,0.15))" : "rgba(255,255,255,0.03)",
              color: activeCategory === cat ? "#00f0ff" : "rgba(255,255,255,0.6)",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.3s ease",
              opacity: 0,
              backdropFilter: "blur(10px)",
            }}
            onMouseEnter={(e) => {
              if (activeCategory !== cat) {
                e.currentTarget.style.borderColor = "rgba(0,240,255,0.4)";
                e.currentTarget.style.color = "#ffffff";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
              }
            }}
            onMouseLeave={(e) => {
              if (activeCategory !== cat) {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
              }
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Content Section - Two Column Layout */}
      <section ref={featuredRef} style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px 100px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "40px", alignItems: "start" }}>
          
          {/* Left Side - Large Featured Post */}
          <div
            className="featured-post"
            style={{
              background: "linear-gradient(135deg, rgba(17,17,34,0.8) 0%, rgba(10,10,20,0.9) 100%)",
              borderRadius: "24px",
              border: "1px solid rgba(255,255,255,0.08)",
              overflow: "hidden",
              cursor: "pointer",
              transition: "all 0.4s ease",
              opacity: 0,
              position: "sticky",
              top: "120px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(0,240,255,0.4)";
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 24px 80px rgba(0,240,255,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {/* Featured badge */}
            <div style={{ position: "absolute", top: "24px", left: "24px", zIndex: 10, padding: "8px 20px", background: "linear-gradient(135deg, #00f0ff, #00b8d4)", borderRadius: "100px", fontSize: "12px", fontWeight: 800, color: "#0a0a14", letterSpacing: "1px", textTransform: "uppercase", boxShadow: "0 4px 20px rgba(0,240,255,0.3)" }}>
              Featured Post
            </div>
            
            {/* Large Image */}
            <div
              className="featured-post-image"
              style={{
                backgroundImage: `url(${selectedPost.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "360px",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)",
                }}
              />
            </div>

            {/* Content */}
            <div className="featured-post-content" style={{ padding: "32px" }}>
              <span
                style={{
                  display: "inline-block",
                  padding: "6px 18px",
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
                {selectedPost.category}
              </span>
              <h2
                style={{
                  color: "#ffffff",
                  fontSize: "28px",
                  fontWeight: 800,
                  lineHeight: 1.3,
                  marginBottom: "16px",
                }}
              >
                {selectedPost.title}
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,0.65)",
                  fontSize: "15px",
                  lineHeight: 1.7,
                  marginBottom: "24px",
                }}
              >
                {selectedPost.excerpt}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: "20px",
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div>
                  <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "14px", fontWeight: 600, marginBottom: "6px" }}>{selectedPost.author}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "rgba(255,255,255,0.4)", fontSize: "13px" }}>
                    <span>{selectedPost.date}</span>
                    <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(255,255,255,0.3)" }} />
                    <span>{selectedPost.readTime}</span>
                  </div>
                </div>
                <div style={{ padding: "14px 28px", background: "linear-gradient(135deg, #00f0ff, #00b8d4)", borderRadius: "100px", color: "#0a0a14", fontSize: "14px", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 4px 20px rgba(0,240,255,0.3)" }}>
                  Read Article
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - List of Blog Posts */}
          <div ref={gridRef} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <h3 style={{ fontSize: "24px", fontWeight: 700, color: "#ffffff", marginBottom: "12px", paddingLeft: "4px" }}>
              Recent Posts
            </h3>
            
            {blogPosts.slice(1, showAllPosts ? blogPosts.length : 4).map((post, index) => (
              <article
                key={post.id}
                className="blog-card"
                onClick={() => setSelectedPost(post)}
                style={{
                  background: selectedPost.id === post.id ? "linear-gradient(135deg, rgba(0,240,255,0.08) 0%, rgba(0,150,255,0.08) 100%)" : "linear-gradient(135deg, rgba(17,17,34,0.6) 0%, rgba(10,10,20,0.8) 100%)",
                  borderRadius: "16px",
                  border: selectedPost.id === post.id ? "1px solid rgba(0,240,255,0.4)" : "1px solid rgba(255,255,255,0.08)",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  opacity: 0,
                  display: "grid",
                  gridTemplateColumns: "180px 1fr",
                  gap: "20px",
                }}
                onMouseEnter={(e) => {
                  if (selectedPost.id !== post.id) {
                    e.currentTarget.style.borderColor = "rgba(0,240,255,0.3)";
                  }
                  e.currentTarget.style.transform = "translateX(8px)";
                  e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,240,255,0.1)";
                }}
                onMouseLeave={(e) => {
                  if (selectedPost.id !== post.id) {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  }
                  e.currentTarget.style.transform = "translateX(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Small Image */}
                <div
                  style={{
                    backgroundImage: `url(${post.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "100%",
                    minHeight: "160px",
                    position: "relative",
                  }}
                >
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,240,255,0.05) 0%, rgba(0,0,0,0.2) 100%)" }} />
                </div>

                {/* Content */}
                <div style={{ padding: "20px 20px 20px 0", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <span
                    style={{
                      display: "inline-block",
                      width: "fit-content",
                      padding: "4px 12px",
                      background: "rgba(0,240,255,0.08)",
                      border: "1px solid rgba(0,240,255,0.15)",
                      borderRadius: "100px",
                      color: "#00f0ff",
                      fontSize: "10px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      marginBottom: "12px",
                    }}
                  >
                    {post.category}
                  </span>
                  <h4
                    style={{
                      color: "#ffffff",
                      fontSize: "17px",
                      fontWeight: 700,
                      lineHeight: 1.4,
                      marginBottom: "10px",
                    }}
                  >
                    {post.title}
                  </h4>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      fontSize: "13px",
                      lineHeight: 1.6,
                      marginBottom: "14px",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {post.excerpt}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "rgba(255,255,255,0.35)", fontSize: "12px" }}>
                    <span>{post.date}</span>
                    <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "rgba(255,255,255,0.3)" }} />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
            
            {/* Show More / Show Less Button */}
            {blogPosts.length > 4 && (
              <button
                onClick={() => setShowAllPosts(!showAllPosts)}
                style={{
                  background: "linear-gradient(135deg, rgba(0,240,255,0.1) 0%, rgba(0,150,255,0.1) 100%)",
                  border: "1px solid rgba(0,240,255,0.3)",
                  borderRadius: "16px",
                  padding: "20px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  color: "#00f0ff",
                  fontSize: "15px",
                  fontWeight: 600,
                  marginTop: "8px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "linear-gradient(135deg, rgba(0,240,255,0.15) 0%, rgba(0,150,255,0.15) 100%)";
                  e.currentTarget.style.borderColor = "rgba(0,240,255,0.5)";
                  e.currentTarget.style.transform = "translateX(8px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "linear-gradient(135deg, rgba(0,240,255,0.1) 0%, rgba(0,150,255,0.1) 100%)";
                  e.currentTarget.style.borderColor = "rgba(0,240,255,0.3)";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                {showAllPosts ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                    Show Less
                  </>
                ) : (
                  <>
                    Show More ({blogPosts.length - 4} more posts)
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Explore All Articles Section */}
      <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h3 style={{ fontSize: "32px", fontWeight: 700, color: "#ffffff", marginBottom: "12px" }}>
            Explore All <span style={{ background: "linear-gradient(135deg, #00f0ff, #a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Articles</span>
          </h3>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "16px" }}>Dive deeper into trading insights and strategies</p>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px 100px" }}>
        <div
          style={{
            background: "linear-gradient(135deg, rgba(0,240,255,0.1), rgba(139,92,246,0.1))",
            border: "1px solid rgba(0,240,255,0.2)",
            borderRadius: "24px",
            padding: "64px 48px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Glow effect */}
          <div style={{ position: "absolute", top: "-50%", left: "50%", transform: "translateX(-50%)", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(0,240,255,0.15) 0%, transparent 70%)", pointerEvents: "none", filter: "blur(40px)" }} />
          
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{ color: "#ffffff", fontSize: "36px", fontWeight: 800, marginBottom: "16px" }}>
              Never Miss a <span style={{ background: "linear-gradient(135deg, #00f0ff, #a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Market Move</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "17px", marginBottom: "40px", maxWidth: "560px", margin: "0 auto 40px", lineHeight: 1.7 }}>
              Subscribe to our newsletter for weekly insights, strategy breakdowns, and exclusive trading tips delivered to your inbox.
            </p>
            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "center",
                maxWidth: "540px",
                margin: "0 auto",
                flexWrap: "wrap",
              }}
            >
              <input
                type="email"
                placeholder="Enter your email address"
                style={{
                  flex: 1,
                  minWidth: "280px",
                  padding: "16px 24px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(10px)",
                  color: "#ffffff",
                  fontSize: "15px",
                  outline: "none",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0,240,255,0.5)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                }}
              />
              <button
                style={{
                  padding: "16px 36px",
                  borderRadius: "12px",
                  border: "none",
                  background: "linear-gradient(135deg, #00f0ff, #00b8d4)",
                  color: "#0a0a14",
                  fontSize: "15px",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  whiteSpace: "nowrap",
                  boxShadow: "0 4px 20px rgba(0,240,255,0.2)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,240,255,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,240,255,0.2)";
                }}
              >
                Subscribe Now
              </button>
            </div>
            <p style={{ marginTop: "20px", color: "rgba(255,255,255,0.4)", fontSize: "13px" }}>
              Join 100,000+ traders getting market insights weekly. Unsubscribe anytime.
            </p>
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
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <Link href="/" style={{ textDecoration: "none" }}>
                <span style={{ fontSize: "24px", fontWeight: 700 }}>
                  <span style={{ color: "#ffffff" }}>up</span>
                  <span style={{ color: "#00f0ff" }}>trender</span>
                </span>
              </Link>
              {/* Social Media Links */}
              <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                <a
                  href="https://www.facebook.com/uptrender"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ transition: "all 0.2s" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#9ca3af" style={{ transition: "fill 0.2s" }}
                    onMouseEnter={(e) => e.currentTarget.setAttribute('fill', '#00f0ff')}
                    onMouseLeave={(e) => e.currentTarget.setAttribute('fill', '#9ca3af')}>
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/uptrender.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ transition: "all 0.2s" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" style={{ transition: "stroke 0.2s" }}
                    onMouseEnter={(e) => e.currentTarget.setAttribute('stroke', '#00f0ff')}
                    onMouseLeave={(e) => e.currentTarget.setAttribute('stroke', '#9ca3af')}>
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
                <a
                  href="https://t.me/uptrender1"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ transition: "all 0.2s" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#9ca3af" style={{ transition: "fill 0.2s" }}
                    onMouseEnter={(e) => e.currentTarget.setAttribute('fill', '#00f0ff')}
                    onMouseLeave={(e) => e.currentTarget.setAttribute('fill', '#9ca3af')}>
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </a>
              </div>
            </div>
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
