"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
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

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState(blogPosts[0]);
  const [showAllPosts, setShowAllPosts] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredPosts = blogPosts;

  const featuredPost = blogPosts.find((p) => p.featured);
  const gridPosts = filteredPosts.filter((p) => !p.featured);

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
  }, []);
  useEffect(() => {
    if (!gridRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".blog-card", { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.6, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: ".blog-card", start: "top 90%", toggleActions: "play none none none" } });
    }, gridRef);
    return () => ctx.revert();
  }, [showAllPosts]);

  // Featured post change animation
  useEffect(() => {
    if (!featuredRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".featured-post-image", { opacity: 0.7, scale: 0.98 }, { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" });
      gsap.fromTo(".featured-post-content", { opacity: 0.7, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
    }, featuredRef);
    return () => ctx.revert();
  }, [selectedPost]);

  // Refresh ScrollTrigger on client-side route changes and fallback to
  // force visible elements if animations didn't run (SPA navigation cases).
  const pathname = usePathname();
  useEffect(() => {
    const refreshId = setTimeout(() => {
      try { ScrollTrigger.refresh(true); } catch (e) { /* ignore */ }
    }, 80);

    const selectors = [
      ".blog-title",
      ".category-btn",
      ".featured-post",
      ".featured-post-image",
      ".featured-post-content",
      ".blog-card",
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


  return (
    <div className="relative" style={{ background: "#0a0a14", minHeight: "100vh" }}>
      {/* Header */}
      

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
            }}
          >
            Insights, Strategies &<br />
            <span style={{ background: "linear-gradient(135deg, #00f0ff, #a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Market Intelligence</span>
          </h1>
        </div>
      </section>



      {/* Main Content Section - Two Column Layout */}
      <section ref={featuredRef} style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px 100px" }}>
        <div className="blog-main-layout" style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "40px", alignItems: "start" }}>
          
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
            
            {/* Show More / Show Less Link */}
            {blogPosts.length > 4 && (
              <div
                onClick={() => setShowAllPosts(!showAllPosts)}
                style={{
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  color: "#00f0ff",
                  fontSize: "15px",
                  fontWeight: 600,
                  marginTop: showAllPosts ? "-12px" : "-8px",
                  paddingLeft: "4px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#00d4e6";
                  e.currentTarget.style.transform = "translateX(4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#00f0ff";
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
                    Show More
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      
    </div>
  );
}
