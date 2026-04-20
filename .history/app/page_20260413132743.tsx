"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type TickerItem = {
  symbol: string;
  name: string;
  price: string;
  change: string;
};

const assetCategories = [
  "Forex",
  "Indices",
  "Energies",
  "Precious Metals",
  "Soft Commodities",
  "ETFs",
  "CFD Shares",
  "CFD Bonds",
];

const tickerPrimary: TickerItem[] = [
  { symbol: "EURJPY", name: "Euro vs Japanese Yen", price: "$186.484", change: "0.320%" },
  { symbol: "AUDCAD", name: "Australian Dollar vs Canadian Dollar", price: "$0.978", change: "0.058%" },
  { symbol: "BTCUSD", name: "US Dollar", price: "$72224.270", change: "-0.227%" },
  { symbol: "CHFJPY", name: "Swiss Franc vs Japanese Yen", price: "$201.770", change: "0.427%" },
  { symbol: "USDCNH", name: "US Dollar vs Chinese Yuan", price: "$6.828", change: "0.023%" },
  { symbol: "XAUUSD", name: "Gold US Dollar", price: "$4761.450", change: "-0.132%" },
  { symbol: "EURUSD", name: "Euro vs US Dollar", price: "$1.171", change: "0.123%" },
  { symbol: "GBPUSD", name: "Great Britain Pound vs US Dollar", price: "$1.344", change: "0.063%" },
  { symbol: "DJ30.", name: "Dow Jones Index Cash CFD (USD)", price: "$48215.150", change: "0.047%" },
  { symbol: "NAS100.", name: "NAS100 Cash", price: "$25140.100", change: "0.253%" },
  { symbol: "CL-OIL", name: "Crude Oil Future CFD (USD)", price: "$97.803", change: "-0.348%" },
  { symbol: "USDJPY", name: "US Dollar vs Japanese Yen", price: "$159.234", change: "0.213%" },
  { symbol: "GBPJPY", name: "Great Britain Pound vs Japanese Yen", price: "$214.001", change: "0.274%" },
  { symbol: "GER40.", name: "GER40 Cash", price: "$23996.800", change: "0.550%" },
  { symbol: "GBPAUD", name: "Great Britain Pound vs Australian Dollar", price: "$1.901", change: "0.331%" },
  { symbol: "EURAUD", name: "Euro vs Australian Dollar", price: "$1.657", change: "0.329%" },
  { symbol: "USDCAD", name: "US Dollar vs Canadian Dollar", price: "$1.384", change: "0.182%" },
  { symbol: "GBPCAD", name: "Great Britain Pound vs Canadian Dollar", price: "$1.859", change: "0.228%" },
  { symbol: "AUDUSD", name: "Australian Dollar vs US Dollar", price: "$0.707", change: "-0.157%" },
];

const tickerSecondary: TickerItem[] = [
  { symbol: "EURJPY", name: "Euro vs Japanese Yen", price: "$186.477", change: "0.316%" },
  { symbol: "AUDCAD", name: "Australian Dollar vs Canadian Dollar", price: "$0.978", change: "0.045%" },
  { symbol: "BTCUSD", name: "US Dollar", price: "$72226.710", change: "-0.224%" },
  { symbol: "CHFJPY", name: "Swiss Franc vs Japanese Yen", price: "$201.770", change: "0.428%" },
  { symbol: "USDCNH", name: "US Dollar vs Chinese Yuan", price: "$6.828", change: "0.024%" },
  { symbol: "XAUUSD", name: "Gold US Dollar", price: "$4760.430", change: "-0.153%" },
  { symbol: "EURUSD", name: "Euro vs US Dollar", price: "$1.171", change: "0.121%" },
  { symbol: "GBPUSD", name: "Great Britain Pound vs US Dollar", price: "$1.344", change: "0.063%" },
  { symbol: "DJ30.", name: "Dow Jones Index Cash CFD (USD)", price: "$48213.950", change: "0.044%" },
  { symbol: "NAS100.", name: "NAS100 Cash", price: "$25138.600", change: "0.247%" },
  { symbol: "CL-OIL", name: "Crude Oil Future CFD (USD)", price: "$97.868", change: "-0.282%" },
  { symbol: "USDJPY", name: "US Dollar vs Japanese Yen", price: "$159.232", change: "0.213%" },
  { symbol: "GBPJPY", name: "Great Britain Pound vs Japanese Yen", price: "$213.997", change: "0.274%" },
];

const tickerItems = [...tickerPrimary, ...tickerSecondary];
const tickerLoop = [...tickerItems, ...tickerItems];

export default function Home() {
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [tradersCount, setTradersCount] = useState(0);
  const [clientsCount, setClientsCount] = useState(0);
  
  // Refs for all sections
  const everythingSectionRef = useRef<HTMLDivElement>(null);
  const alwaysReadyRef = useRef<HTMLDivElement>(null);
  const whyChooseRef = useRef<HTMLDivElement>(null);
  const awardsRef = useRef<HTMLDivElement>(null);
  const ratingsRef = useRef<HTMLDivElement>(null);
  const partnershipsRef = useRef<HTMLDivElement>(null);
  const exploreRef = useRef<HTMLDivElement>(null);

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

  // Auto-cycle through asset categories every 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCategoryIndex((prevIndex) => (prevIndex + 1) % assetCategories.length);
    }, 809);

    return () => clearInterval(interval);
  }, []);

  // GSAP animation for Everything You Need section
  useEffect(() => {
    if (!everythingSectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate title
      gsap.fromTo(
        ".everything-title",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".everything-title",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animate subtitle
      gsap.fromTo(
        ".everything-subtitle",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".everything-subtitle",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animate QR code
      gsap.fromTo(
        ".qr-code",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".qr-code",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animate store buttons with stagger
      gsap.fromTo(
        ".store-btn",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".store-buttons",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animate phone image
      gsap.fromTo(
        ".phone-image",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".phone-image",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, everythingSectionRef);

    return () => ctx.revert();
  }, []);

  // GSAP animation for Always Ready section
  useEffect(() => {
    if (!alwaysReadyRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".always-ready-title",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".always-ready-title",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".always-ready-subtitle",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".always-ready-subtitle",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".platform-label-gradient",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".always-ready-laptop",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, alwaysReadyRef);

    return () => ctx.revert();
  }, []);

  // GSAP animation for Why Choose section
  useEffect(() => {
    if (!whyChooseRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".why-choose-title",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".why-choose-title",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".why-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".why-choose-section",
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );
    }, whyChooseRef);

    return () => ctx.revert();
  }, []);

  // GSAP animation for Awards section
  useEffect(() => {
    if (!awardsRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".awards-slider-track",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".awards-slider-section",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, awardsRef);

    return () => ctx.revert();
  }, []);

  // GSAP animation for Ratings section
  useEffect(() => {
    if (!ratingsRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".rating-column-up",
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".ratings-section",
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".rating-column-down",
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".ratings-section",
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".ratings-stats",
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".ratings-section",
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );
    }, ratingsRef);

    return () => ctx.revert();
  }, []);

  // GSAP animation for Partnerships section
  useEffect(() => {
    if (!partnershipsRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".partnerships-title",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".partnerships-title",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".partnerships-image",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".partnerships-image",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, partnershipsRef);

    return () => ctx.revert();
  }, []);

  // GSAP animation for Explore CFD section
  useEffect(() => {
    if (!exploreRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".explore-title",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".explore-title",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".explore-step",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".explore-steps",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".explore-cta",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".explore-cta",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, exploreRef);

    return () => ctx.revert();
  }, []);

  // Counter animation for stats
  useEffect(() => {
    if (!ratingsRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate traders count to 3M
            const tradersInterval = setInterval(() => {
              setTradersCount((prev) => {
                if (prev >= 3000000) {
                  clearInterval(tradersInterval);
                  return 3000000;
                }
                return prev + 50000;
              });
            }, 20);

            // Animate clients count to 600K
            const clientsInterval = setInterval(() => {
              setClientsCount((prev) => {
                if (prev >= 600000) {
                  clearInterval(clientsInterval);
                  return 600000;
                }
                return prev + 10000;
              });
            }, 20);

            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (ratingsRef.current) {
      observer.observe(ratingsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative">
      {/* Hero Section with Video Background */}
      <section className="hero-section">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="video-background"
        >
          <source src="/uptrender playstore video.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>

      {/* Header */}
      <header className={`navbar ${navVisible ? 'navbar-visible' : 'navbar-hidden'}`}>
        <div className="navbar-inner">
          {/* Logo */}
          <div className="logo-wrap">
            <span className="logo-mark" aria-label="uptrender">
              <span className="logo-v">up</span>
              <span className="logo-t">trender</span>
              <span className="logo-dot"></span>
            </span>
            <span className="logo-text"></span>
          </div>

          {/* Navigation - Left aligned with gap */}
          <nav className="hidden md:flex items-center nav-menu">
            <a href="#" className="nav-link">About Us</a>
            <a href="#" className="nav-link">Features</a>
            <a href="#" className="nav-link">Services</a>
            <a href="#" className="nav-link">Pricing</a>
            <a href="#" className="nav-link">Blog</a>
            <a href="#" className="nav-link">Contac</a>
          </nav>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Right Actions */}
          <div className="flex items-center gap-6">
            <a href="https://app.uptrender.in/auth/register" className="btn-primary">Trade Now</a>
            <a href="https://app.uptrender.in/auth/login" className="nav-link">Login</a>
            {/* <div className="nav-locale">
              <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              <span className="nav-lang">EN</span>
            </div> */}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8">
        <div className="flex flex-col items-center text-center">
          <div className="hero-heading">
            <h1 className="hero-title text-white hero-start">
              START
            </h1>
            <h1 className="hero-title text-white hero-trading">
              TRADING
            </h1>
          </div>
          <p className="hero-subtitle hero-subtitle-spacing">
            with an <span className="accent-text">Award-Winning</span> Broker.
          </p>
          <a href="https://app.uptrender.in/auth/login" className="btn-secondary hero-cta">
            Get Started
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 chevron-down">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5">
            <path d="M6 9l6 6 6-6"/>
          </svg>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" style={{ marginTop: '-20px' }}>
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </div>
      </main>
      </section>

      {/* Coin Section */}
      <section className="coin-section">
        <div className="coin-section-inner">
          <h2 className="coin-section-title">
            Every market shift brings
            <br />
            limitless possibilities.
          </h2>

          <div className="coin-categories" role="tablist" aria-label="Asset categories">
            {assetCategories.map((category, index) => (
              <button
                key={category}
                type="button"
                className={`coin-category ${index === activeCategoryIndex ? "is-active" : ""}`}
                style={{ animationDelay: `${index * 0.16}s` }}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="coin-stage">
            <video autoPlay muted loop playsInline className="coin-video">
              <source src="/coin.webm" type="video/webm" />
            </video>
          </div>

          <div className="coin-ticker-shell" aria-label="Continuously sliding market quotes">
            <div className="coin-ticker-track">
              {tickerLoop.map((item, index) => {
                const isNegative = item.change.trim().startsWith("-");

                return (
                  <article key={`${item.symbol}-${index}`} className="ticker-item" data-symbol={item.symbol}>
                    <span className={`ticker-direction ${isNegative ? "is-down" : "is-up"}`} aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path d="M12 6v12" />
                        <path d="M7 11l5-5 5 5" />
                      </svg>
                    </span>

                    <div className="ticker-copy">
                      <div className="ticker-top">
                        <span className="ticker-symbol">{item.symbol}</span>
                        <span className={`ticker-price ${isNegative ? "is-down" : "is-up"}`}>{item.price}</span>
                      </div>

                      <div className="ticker-bottom">
                        <span className="ticker-name">{item.name}</span>
                        <span className={`ticker-change ${isNegative ? "is-down" : "is-up"}`}>{item.change}</span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <p className="coin-updated">LIVE (INDICATIVE) UPDATED: 17:04:06 GMT+5.5</p>
        </div>
      </section>

      {/* Everything You Need Section */}
      <section ref={everythingSectionRef} className="everything-section" style={{ background: '#0a0a0a', padding: '100px 0' }}>
        <div className="everything-inner" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '80px' }}>
          <div className="everything-content" style={{ flex: 1, maxWidth: '600px' }}>
            <h2 className="everything-title" style={{ color: '#ffffff', fontSize: '48px', fontWeight: 700, lineHeight: 1.1, marginBottom: '24px', opacity: 0 }}>
              Everything you need<br />
              and more<span className="everything-dot" style={{ color: '#dc2626' }}>.</span>
            </h2>
            <p className="everything-subtitle" style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '18px', lineHeight: 1.6, marginBottom: '48px', maxWidth: '500px', opacity: 0 }}>
              Now delivering powerful trading tools, real-time insights, and a seamless experience for traders on the go.
            </p>
            
            <div className="everything-downloads" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div className="qr-code" style={{ display: 'flex', alignItems: 'center', gap: '16px', opacity: 0 }}>
                <div className="qr-placeholder" style={{ width: '100px', height: '100px', background: '#ffffff', borderRadius: '8px', backgroundImage: 'repeating-linear-gradient(0deg, #000 0px, #000 3px, #fff 3px, #fff 6px), repeating-linear-gradient(90deg, #000 0px, #000 3px, #fff 3px, #fff 6px)', backgroundSize: '6px 6px', padding: '10px', position: 'relative' }}></div>
                <div className="qr-text" style={{ display: 'flex', flexDirection: 'column', gap: '4px', color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px' }}>
                  <span>Scan to download</span>
                  <span>Uptrender app</span>
                </div>
              </div>
              
              <div className="store-buttons" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                <a href="#" className="store-btn" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 24px', background: '#1a1a1a', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '8px', textDecoration: 'none', opacity: 0 }}>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div className="store-btn-text" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span className="store-btn-small" style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '11px', fontWeight: 400 }}>Download on the</span>
                    <span className="store-btn-large" style={{ color: '#ffffff', fontSize: '18px', fontWeight: 600 }}>App Store</span>
                  </div>
                </a>
                
                <a href="#" className="store-btn" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 24px', background: '#1a1a1a', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '8px', textDecoration: 'none', opacity: 0 }}>
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" fill="#4CAF50"/>
                  </svg>
                  <div className="store-btn-text" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span className="store-btn-small" style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '11px', fontWeight: 400 }}>GET IT ON</span>
                    <span className="store-btn-large" style={{ color: '#ffffff', fontSize: '18px', fontWeight: 600 }}>Google Play</span>
                  </div>
                </a>
                
                <a href="#" className="store-btn apk-btn" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 24px', background: '#2a2a2a', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '8px', textDecoration: 'none', opacity: 0 }}>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
                    <path d="M5 20h14v-2H5v2zm0-10h4v6h6v-6h4l-7-7-7 7z"/>
                  </svg>
                  <div className="store-btn-text" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span className="store-btn-small" style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '11px', fontWeight: 400 }}>Download the</span>
                    <span className="store-btn-large" style={{ color: '#ffffff', fontSize: '18px', fontWeight: 600 }}>APK File</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
          
          <div className="everything-phone" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth: '500px' }}>
            <img src="/phone.png" alt="Uptrender Trading App" className="phone-image" style={{ width: '100%', height: 'auto', maxWidth: '450px', objectFit: 'contain', opacity: 0 }} />
          </div>
        </div>
      </section>

      {/* Always Ready Section */}
      <section ref={alwaysReadyRef} className="always-ready-section" style={{ background: '#0a0a0a', padding: '100px 0 80px', position: 'relative', zIndex: 12 }}>
        <div className="always-ready-inner" style={{ maxWidth: '1500px', margin: '0 auto', padding: '0 60px', textAlign: 'center' }}>
          {/* Header Row */}
          <div className="always-ready-header" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px', gap: '80px', flexWrap: 'wrap', position: 'relative', zIndex: 20 }}>
            <h2 className="always-ready-title" style={{ color: '#ffffff', fontSize: '48px', fontWeight: 700, lineHeight: 1.2, textAlign: 'left', opacity: 0 }}>
              Always ready for your<br />
              next move<span style={{ color: '#dc2626' }}>.</span>
            </h2>
            <p className="always-ready-subtitle" style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '18px', lineHeight: 1.5, maxWidth: '450px', textAlign: 'left', opacity: 0 }}>
              Wherever the market takes you, our suite of trading platform ensure your preparedness at every stage.
            </p>
          </div>

          {/* Laptop with Platform Labels */}
          <div className="always-ready-laptop" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '750px', zIndex: 1 }}>
            {/* MetaTrader 5 Label */}
            <div className="platform-label-gradient" style={{ position: 'absolute', top: '18%', left: '20%', background: 'rgba(192, 192, 192, 0.15)', backdropFilter: 'blur(10px)', border: '2px solid rgba(192, 192, 192, 0.5)', borderRadius: '14px', padding: '20px 44px', color: '#e5e5e5', fontSize: '24px', fontWeight: 700, zIndex: 10, cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 0 25px rgba(192, 192, 192, 0.3), 0 0 50px rgba(192, 192, 192, 0.15), inset 0 0 20px rgba(192, 192, 192, 0.08)', opacity: 0 }}>
              MetaTrader 5
            </div>
            
            {/* WebTrader Label */}
            <div className="platform-label-gradient" style={{ position: 'absolute', top: '18%', right: '12%', background: 'rgba(192, 192, 192, 0.15)', backdropFilter: 'blur(10px)', border: '2px solid rgba(192, 192, 192, 0.5)', borderRadius: '14px', padding: '20px 44px', color: '#e5e5e5', fontSize: '24px', fontWeight: 700, zIndex: 10, cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 0 25px rgba(192, 192, 192, 0.3), 0 0 50px rgba(192, 192, 192, 0.15), inset 0 0 20px rgba(192, 192, 192, 0.08)', opacity: 0 }}>
              WebTrader
            </div>
            
            {/* MetaTrader 4 Label */}
            <div className="platform-label-gradient" style={{ position: 'absolute', top: '50%', left: '12%', background: 'rgba(192, 192, 192, 0.15)', backdropFilter: 'blur(10px)', border: '2px solid rgba(192, 192, 192, 0.5)', borderRadius: '14px', padding: '20px 44px', color: '#e5e5e5', fontSize: '24px', fontWeight: 700, zIndex: 10, cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 0 25px rgba(192, 192, 192, 0.3), 0 0 50px rgba(192, 192, 192, 0.15), inset 0 0 20px rgba(192, 192, 192, 0.08)', opacity: 0 }}>
              MetaTrader 4
            </div>
            
            {/* TradingView Label */}
            <div className="platform-label-gradient" style={{ position: 'absolute', top: '58%', right: '12%', background: 'rgba(192, 192, 192, 0.15)', backdropFilter: 'blur(10px)', border: '2px solid rgba(192, 192, 192, 0.5)', borderRadius: '14px', padding: '20px 44px', color: '#e5e5e5', fontSize: '24px', fontWeight: 700, zIndex: 10, cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 0 25px rgba(192, 192, 192, 0.3), 0 0 50px rgba(192, 192, 192, 0.15), inset 0 0 20px rgba(192, 192, 192, 0.08)', opacity: 0 }}>
              TradingView
            </div>

            <img src="/window.webp" alt="Trading Platforms" style={{ width: '110%', maxWidth: '1500px', maxHeight: 'calc(100% - 30px)', height: 'auto', objectFit: 'contain' }} />
          </div>
        </div>
      </section>

      {/* Why Traders Choose Us Section */}
      <section ref={whyChooseRef} className="why-choose-section" style={{ background: '#0a0a0a', padding: '100px 0', position: 'relative', zIndex: 12 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 60px' }}>
          <h2 className="why-choose-title" style={{ color: '#ffffff', fontSize: '52px', fontWeight: 700, textAlign: 'center', marginBottom: '80px', opacity: 0 }}>
            Why traders choose us<span style={{ color: '#00f0ff' }}>.</span>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
            {/* Card 1 - Make informed trades */}
            <div className="why-card" style={{ background: 'rgba(0, 0, 0, 0.6)', border: '2px solid rgba(80, 80, 80, 0.6)', borderRadius: '24px', padding: '40px 32px', position: 'relative', boxShadow: '0 0 15px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(192, 192, 192, 0.05)', transition: 'all 0.3s ease', opacity: 0 }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = '2px solid rgba(0, 240, 255, 0.6)';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 240, 255, 0.4), 0 0 60px rgba(0, 240, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = '2px solid rgba(80, 80, 80, 0.6)';
                e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(192, 192, 192, 0.05)';
              }}>
              <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <div style={{ width: '140px', height: '140px', background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(0, 150, 255, 0.2))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                  </svg>
                </div>
              </div>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px', marginBottom: '8px' }}>Make informed trades</p>
              <h3 style={{ color: '#00f0ff', fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>Your key to staying ahead</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '15px', lineHeight: 1.6 }}>
                Whether you're analysing complex charts or expert insights, we provide the technology and knowledge you need to elevate your trading game.
              </p>
            </div>

            {/* Card 2 - Support whenever, wherever */}
            <div className="why-card" style={{ background: 'rgba(0, 0, 0, 0.6)', border: '2px solid rgba(80, 80, 80, 0.6)', borderRadius: '24px', padding: '40px 32px', position: 'relative', boxShadow: '0 0 15px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(192, 192, 192, 0.05)', transition: 'all 0.3s ease', opacity: 0 }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = '2px solid rgba(0, 240, 255, 0.6)';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 240, 255, 0.4), 0 0 60px rgba(0, 240, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = '2px solid rgba(80, 80, 80, 0.6)';
                e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(192, 192, 192, 0.05)';
              }}>
              <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <div style={{ width: '140px', height: '140px', background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(0, 150, 255, 0.2))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
              </div>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px', marginBottom: '8px' }}>We're here to help</p>
              <h3 style={{ color: '#00f0ff', fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>Support whenever, wherever</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '15px', lineHeight: 1.6 }}>
                With multilingual assistance, our team is ready to address any questions or issues, helping you stay focused on your trades.
              </p>
            </div>

            {/* Card 3 - Your capital is protected */}
            <div className="why-card" style={{ background: 'rgba(0, 0, 0, 0.6)', border: '2px solid rgba(80, 80, 80, 0.6)', borderRadius: '24px', padding: '40px 32px', position: 'relative', boxShadow: '0 0 15px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(192, 192, 192, 0.05)', transition: 'all 0.3s ease', opacity: 0 }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = '2px solid rgba(0, 240, 255, 0.6)';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 240, 255, 0.4), 0 0 60px rgba(0, 240, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = '2px solid rgba(80, 80, 80, 0.6)';
                e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(192, 192, 192, 0.05)';
              }}>
              <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <div style={{ width: '140px', height: '140px', background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(0, 150, 255, 0.2))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
              </div>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px', marginBottom: '8px' }}>A peace of mind</p>
              <h3 style={{ color: '#00f0ff', fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>Your capital is protected</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '15px', lineHeight: 1.6 }}>
                All funds with Uptrender are protected up to $1M against in the event of insolvency at no cost.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Slider Section */}
      <section ref={awardsRef} className="awards-slider-section" style={{ background: '#0a0a0a', padding: '60px 0', position: 'relative', zIndex: 12, overflow: 'hidden' }}>
        <div className="awards-slider-container" style={{ width: '100%', overflow: 'hidden', maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)' }}>
          <div className="awards-slider-track" style={{ display: 'flex', alignItems: 'center', gap: '80px', width: 'max-content', animation: 'awards-scroll 30s linear infinite', opacity: 0 }}>
            {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((num, index) => (
              <div key={index} className="award-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '280px', opacity: 0.7, transition: 'opacity 0.3s ease' }}>
                <img src={`/c${num}.svg`} alt={`Award ${num}`} style={{ maxWidth: '100%', height: 'auto', maxHeight: '120px', objectFit: 'contain', filter: 'brightness(0.9)' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ratings Section */}
      <section ref={ratingsRef} className="ratings-section" style={{ 
        position: 'relative', 
        minHeight: '100vh', 
        background: '#050810', 
        overflow: 'hidden',
        zIndex: 12,
        paddingTop: '50px'
      }}>
        {/* Grid Background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(/grid.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.5,
          zIndex: 0
        }} />

        <div style={{ 
          position: 'relative', 
          zIndex: 2, 
          display: 'flex', 
          maxWidth: '1600px', 
          margin: '0 auto', 
          padding: '80px 60px', 
          gap: '60px' 
        }}>
          {/* Left Side - Two Columns of Scrolling Cards */}
          <div style={{ flex: '1', display: 'flex', gap: '30px', height: '800px', overflow: 'hidden', maskImage: 'linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)' }}>
            {/* Column 1 - Scrolling Up */}
            <div className="rating-column-up" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px', opacity: 0 }}>
              {/* Cards Set 1 */}
              {(() => {
                const cards = [
                  { platform: 'trustpilot', name: 'Leonardo Zibordi', review: "Amazing broker, been using for a year and a half and never had any problems, would recommend and I'll continue to use and refer my friends over!! Francisco very good chat assistant for me, been super helpful🫶🫶" },
                  { platform: 'google', name: 'Tarek Adline', review: "Uptrender are the best brokers, the customer service is always here to help you with all you need. I had a issue with a deposit but they've done everything to fix it. I was afraid to lose the money that I've send but they find a solution to help me with that. Thanks for Chrystal and the Uptrender family to take care of the customers." },
                  { platform: 'trustpilot', name: 'Marcus Chen', review: "Using Uptrender for 3-4 months now. Did multiple deposits with creditcard, which are on the balance within a minute or so. I also withdraw a percentage of my profits every month using Euro Instant Bank Transfer, and within the same working day it is on my bank account every time." },
                  { platform: 'google', name: 'Sarah Williams', review: "Excellent trading platform with amazing customer support. The spreads are competitive and execution is fast. Highly recommend for both beginners and experienced traders." },
                ];
                return [...cards, ...cards, ...cards, ...cards].map((card, index) => (
                <div key={index} className="rating-card" style={{
                  background: 'rgba(10, 20, 30, 0.85)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(0, 200, 220, 0.3)',
                  borderRadius: '16px',
                  padding: '28px',
                  minHeight: '200px',
                  width: '100%',
                  flexShrink: 0,
                  overflow: 'hidden',
                  wordWrap: 'break-word'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    {card.platform === 'google' ? (
                      <>
                        <span style={{ fontSize: '20px' }}>▶</span>
                        <span style={{ color: '#fff', fontSize: '18px', fontWeight: 600 }}>Google Play</span>
                      </>
                    ) : (
                      <>
                        <span style={{ color: '#00b67a', fontSize: '22px' }}>★</span>
                        <span style={{ color: '#fff', fontSize: '18px', fontWeight: 600 }}>Trustpilot</span>
                      </>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                    {[1,2,3,4,5].map(star => (
                      <span key={star} style={{ color: card.platform === 'google' ? '#fbbf24' : '#00b67a', fontSize: '20px' }}>★</span>
                    ))}
                  </div>
                  <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '14px', lineHeight: 1.6, marginBottom: '16px' }}>
                    {card.review}
                  </p>
                  <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '14px', fontStyle: 'italic' }}>
                    {card.name}
                  </p>
                </div>
              ));
              })()}
            </div>

            {/* Column 2 - Scrolling Down */}
            <div className="rating-column-down" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px', opacity: 0 }}>
              {/* Cards Set 2 */}
              {(() => {
                const cards = [
                  { platform: 'trustpilot', name: 'Lars', review: "Great broker. Quick deposit and withdraws, highly recommended.\n\nBeen trading with uptrender now for 2 years and I love it. Thank you." },
                  { platform: 'trustpilot', name: 'Dario Dolcetti', review: "my experience with Uptrender is just perfect, the payouts are instant (within hours) that means that they have an automated system behind it, it works perfectly both with crypto or credit card. Also you can withdraw as many times as you want in a day with no fees.\n\nAlso the spreads are fine :)" },
                  { platform: 'trustpilot', name: 'Kiril Korcevoj', review: "Saw few feedbacks about withdrawal and its really scary. Few minutes ago made a request of withdrawal and less than 2 minutes after clicking submit and email my wallet got the withdrawal, its was crypto withdrawal by the way." },
                  { platform: 'google', name: 'Alex Thompson', review: "Best forex broker I've used. Lightning fast execution and the mobile app is fantastic. Customer support is available 24/7 and always helpful." },
                ];
                return [...cards, ...cards, ...cards, ...cards].map((card, index) => (
                <div key={index} className="rating-card" style={{
                  background: 'rgba(10, 20, 30, 0.85)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(0, 200, 220, 0.3)',
                  borderRadius: '16px',
                  padding: '28px',
                  minHeight: '200px',
                  width: '100%',
                  flexShrink: 0,
                  overflow: 'hidden',
                  wordWrap: 'break-word'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    {card.platform === 'google' ? (
                      <>
                        <span style={{ fontSize: '20px' }}>▶</span>
                        <span style={{ color: '#fff', fontSize: '18px', fontWeight: 600 }}>Google Play</span>
                      </>
                    ) : (
                      <>
                        <span style={{ color: '#00b67a', fontSize: '22px' }}>★</span>
                        <span style={{ color: '#fff', fontSize: '18px', fontWeight: 600 }}>Trustpilot</span>
                      </>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                    {[1,2,3,4,5].map(star => (
                      <span key={star} style={{ color: card.platform === 'google' ? '#fbbf24' : '#00b67a', fontSize: '20px' }}>★</span>
                    ))}
                  </div>
                  <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '14px', lineHeight: 1.6, marginBottom: '16px', whiteSpace: 'pre-line' }}>
                    {card.review}
                  </p>
                  <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '14px', fontStyle: 'italic' }}>
                    {card.name}
                  </p>
                </div>
              ));
              })()}
            </div>
          </div>

          {/* Right Side - Stats */}
          <div className="ratings-stats" style={{ 
            width: '350px', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            gap: '60px',
            paddingRight: '40px',
            opacity: 0
          }}>
            <div>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '16px', marginBottom: '8px' }}>Trusted by</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ color: '#00f0ff', fontSize: '80px', fontWeight: 800, lineHeight: 1 }}>
                  {tradersCount >= 1000000 ? `${(tradersCount / 1000000).toFixed(1)}M+` : `${Math.round(tradersCount / 1000)}K+`}
                </span>
                <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '18px' }}>traders</span>
              </div>
            </div>
            <div>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '16px', marginBottom: '8px' }}>Active clients</p>
              <span style={{ color: '#fbbf24', fontSize: '80px', fontWeight: 800, lineHeight: 1 }}>
                {clientsCount >= 1000000 ? `${(clientsCount / 1000000).toFixed(1)}M+` : `${Math.round(clientsCount / 1000)}K+`}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Our Partnerships Section */}
      <section ref={partnershipsRef} style={{ 
        background: '#f5f5f5', 
        padding: '100px 0', 
        position: 'relative', 
        zIndex: 12 
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 60px' }}>
          <h2 className="partnerships-title" style={{ 
            color: '#0a0a14', 
            fontSize: '56px', 
            fontWeight: 700, 
            marginBottom: '60px',
            lineHeight: 1.2,
            opacity: 0
          }}>
            Our partnerships<span style={{ color: '#00f0ff' }}>.</span>
          </h2>

          <div className="partnerships-image" style={{ 
            width: '100%', 
            borderRadius: '24px', 
            overflow: 'hidden',
            position: 'relative',
            height: '400px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            opacity: 0
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.15)';
          }}>
            <img 
              src="/partner.webp" 
              alt="Newcastle United Partnership - Brave the Odds" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                objectPosition: 'center'
              }} 
            />
          </div>
        </div>
      </section>

      {/* Explore CFD Markets Section */}
      <section ref={exploreRef} style={{ 
        background: 'linear-gradient(135deg, #0a1540 0%, #1a2560 50%, #0a1540 100%)', 
        padding: '120px 0', 
        position: 'relative', 
        zIndex: 12,
        overflow: 'hidden'
      }}>
        {/* Decorative Background Elements */}
        <div style={{
          position: 'absolute',
          top: '50%',
          right: '5%',
          transform: 'translateY(-50%)',
          width: '600px',
          height: '600px',
          opacity: 0.4,
          pointerEvents: 'none'
        }}>
          {/* Wavy gradient background */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, rgba(100, 80, 200, 0.3), rgba(80, 120, 200, 0.3))',
            borderRadius: '50%',
            filter: 'blur(60px)'
          }} />
          
          {/* Coin 1 */}
          <div style={{
            position: 'absolute',
            top: '20%',
            right: '10%',
            width: '140px',
            height: '140px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '50%',
            border: '8px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'float-coin 6s ease-in-out infinite'
          }}>
            <svg width="60" height="60" viewBox="0 0 24 24" fill="white">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>

          {/* Coin 2 */}
          <div style={{
            position: 'absolute',
            top: '50%',
            right: '25%',
            width: '160px',
            height: '160px',
            background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)',
            borderRadius: '50%',
            border: '8px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'float-coin 7s ease-in-out infinite',
            animationDelay: '1s'
          }}>
            <svg width="70" height="70" viewBox="0 0 24 24" fill="white">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v12M8 10h8"/>
            </svg>
          </div>
        </div>

        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 60px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '80px' }}>
            {/* Left Content */}
            <div style={{ flex: 1 }}>
              <h2 className="explore-title" style={{ 
                color: '#ffffff', 
                fontSize: '48px', 
                fontWeight: 700, 
                marginBottom: '60px',
                lineHeight: 1.2,
                textAlign: 'center',
                opacity: 0
              }}>
                Explore CFD markets<br />with us<span style={{ color: '#00f0ff' }}>.</span>
              </h2>

              {/* Steps */}
              <div className="explore-steps" style={{ display: 'flex', gap: '40px', marginBottom: '50px', justifyContent: 'center' }}>
                {/* Step 1 */}
                <div className="explore-step" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', opacity: 0 }}>
                  <div style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    background: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '32px',
                    fontWeight: 700,
                    color: '#0a1540',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
                  }}>
                    1
                  </div>
                  <p style={{ color: '#ffffff', fontSize: '18px', fontWeight: 600 }}>Register</p>
                </div>

                {/* Step 2 */}
                <div className="explore-step" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', opacity: 0 }}>
                  <div style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    background: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '32px',
                    fontWeight: 700,
                    color: '#0a1540',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
                  }}>
                    2
                  </div>
                  <p style={{ color: '#ffffff', fontSize: '18px', fontWeight: 600 }}>Deposit</p>
                </div>

                {/* Step 3 */}
                <div className="explore-step" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', opacity: 0 }}>
                  <div style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    background: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '32px',
                    fontWeight: 700,
                    color: '#0a1540',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
                  }}>
                    3
                  </div>
                  <p style={{ color: '#ffffff', fontSize: '18px', fontWeight: 600 }}>Trade</p>
                </div>
              </div>

              {/* CTA Button */}
              <div className="explore-cta" style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', opacity: 0 }}>
                <a href="https://app.uptrender.in/auth/register" style={{
                  background: '#2456e7',
                  color: '#ffffff',
                  padding: '18px 50px',
                  borderRadius: '8px',
                  fontSize: '20px',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 20px rgba(36, 86, 231, 0.4)',
                  width: 'fit-content',
                  textDecoration: 'none',
                  display: 'inline-block'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#1a45d5';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 30px rgba(36, 86, 231, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#2456e7';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(36, 86, 231, 0.4)';
                }}>
                  Trade Now
                </a>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '16px', textAlign: 'center' }}>
                  try <span style={{ color: '#00f0ff', textDecoration: 'underline', cursor: 'pointer' }}>demo</span>
                </p>
              </div>
            </div>

            {/* Right Side - Placeholder for visual */}
            <div style={{ flex: 1, minHeight: '400px' }}>
              {/* The decorative elements are in the background */}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#000000', color: '#ffffff', position: 'relative', zIndex: 12 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '80px 60px 40px' }}>
          {/* Uptrender Logo */}
          <div style={{ marginBottom: '60px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ fontSize: '48px', fontWeight: 700, color: '#ffffff', letterSpacing: '-2px' }}>
                <span style={{ color: '#00f0ff' }}>uptrender</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1.2fr', gap: '60px', marginBottom: '60px' }}>
            {/* Column 1 - Markets */}
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '24px', color: '#ffffff' }}>Markets</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['Forex', 'Indices', 'Energies', 'Precious Metals', 'Soft Commodities', 'ETFs', 'CFD Shares', 'CFD Bonds'].map((item, i) => (
                  <li key={i} style={{ marginBottom: '16px' }}>
                    <a href="#" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '15px', transition: 'color 0.2s' }}
                       onMouseEnter={(e) => e.currentTarget.style.color = '#00f0ff'}
                       onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2 - Platform */}
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '24px', color: '#ffffff' }}>Platform</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['Uptrender App', 'MetaTrader 5', 'MetaTrader 4', 'TradingView', 'WebTrader', 'Copy Trading', 'Economic Calendar', 'Market Buzz'].map((item, i) => (
                  <li key={i} style={{ marginBottom: '16px' }}>
                    <a href="#" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '15px', transition: 'color 0.2s' }}
                       onMouseEnter={(e) => e.currentTarget.style.color = '#00f0ff'}
                       onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 - Accounts */}
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '24px', color: '#ffffff' }}>Accounts</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['Standard STP', 'RAW ECN', 'PRO ECN', 'Swap Free', 'Cent Account', 'Demo Account'].map((item, i) => (
                  <li key={i} style={{ marginBottom: '16px' }}>
                    <a href="#" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '15px', transition: 'color 0.2s' }}
                       onMouseEnter={(e) => e.currentTarget.style.color = '#00f0ff'}
                       onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 - Company */}
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '24px', color: '#ffffff' }}>Company</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['About Us', 'Sponsorship', 'Our Partners', 'Our Awards', 'Press Release', 'Trading Notifications', 'Legal Hub', 'Careers', 'Help Centre'].map((item, i) => (
                  <li key={i} style={{ marginBottom: '16px' }}>
                    <a href="#" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '15px', transition: 'color 0.2s' }}
                       onMouseEnter={(e) => e.currentTarget.style.color = '#00f0ff'}
                       onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 5 - Official Partners & Social */}
            <div>
              <div style={{ marginBottom: '32px' }}>
                <p style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px', color: 'rgba(255, 255, 255, 0.8)' }}>Official partners:</p>
                <div style={{ width: '60px', height: '60px', opacity: 0.8 }}>
                  <svg viewBox="0 0 100 100" fill="white">
                    <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="2" fill="none"/>
                    <text x="50" y="55" fontSize="20" fill="white" textAnchor="middle">NU</text>
                  </svg>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
                <div style={{ 
                  background: 'linear-gradient(135deg, #1a6b5f, #00a896)', 
                  padding: '12px 20px', 
                  borderRadius: '8px',
                  textAlign: 'center',
                  minWidth: '100px'
                }}>
                  <div style={{ fontSize: '12px', marginBottom: '4px', opacity: 0.9 }}>💶</div>
                  <div style={{ fontSize: '16px', fontWeight: 700 }}>€20,000</div>
                </div>
                <div style={{ 
                  background: 'linear-gradient(135deg, #2463eb, #0099ff)', 
                  padding: '12px 20px', 
                  borderRadius: '8px',
                  textAlign: 'center',
                  minWidth: '120px'
                }}>
                  <div style={{ fontSize: '12px', marginBottom: '4px', opacity: 0.9 }}>UP</div>
                  <div style={{ fontSize: '16px', fontWeight: 700 }}>$1,000,000</div>
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <p style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>Follow us on:</p>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {['in', 'yt', 'x', 'fb', 'ig'].map((platform, i) => (
                    <a key={i} href="#" style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#000',
                      textDecoration: 'none',
                      fontSize: '18px',
                      fontWeight: 700,
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#00f0ff';
                      e.currentTarget.style.transform = 'translateY(-3px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#ffffff';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}>
                      {platform}
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <p style={{ fontSize: '14px', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 600 }}>Customer Service:</span>
                </p>
                <a href="mailto:info@uptrender.com" style={{ color: '#00f0ff', textDecoration: 'none', fontSize: '14px' }}>
                  info@uptrender.com
                </a>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div style={{ 
            borderTop: '1px solid rgba(255, 255, 255, 0.1)', 
            paddingTop: '40px',
            display: 'flex',
            gap: '32px',
            alignItems: 'center',
            flexWrap: 'wrap',
            opacity: 0.6
          }}>
            {['Mastercard', 'VISA', 'Bank Transfer', 'NETELLER', 'Skrill', 'UnionPay', 'Fastpay'].map((payment, i) => (
              <div key={i} style={{ 
                padding: '8px 16px', 
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 600,
                color: 'rgba(255, 255, 255, 0.8)'
              }}>
                {payment}
              </div>
            ))}
          </div>

          {/* Risk Warning */}
          <div style={{ 
            borderTop: '1px solid rgba(255, 255, 255, 0.1)', 
            marginTop: '60px',
            paddingTop: '40px'
          }}>
            <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '24px' }}>Risk Warning</h3>
            <p style={{ fontSize: '13px', lineHeight: 1.8, color: 'rgba(255, 255, 255, 0.7)', marginBottom: '20px' }}>
              Trading Contracts for Difference (CFDs) carries a high level of risk and may not be suitable for all investors. The use of leverage can significantly magnify gains and losses and may result in losses exceeding your initial investment. Prior to engaging in CFD trading, you should ensure that you fully understand the risks involved, carefully consider your investment objectives, financial situation, and level of experience, and seek independent advice where necessary. Past performance is not indicative of future results. Please refer to our legal documents for a comprehensive overview of the risks associated with CFD trading.
            </p>

            <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px', marginTop: '32px' }}>General Disclaimer</h4>
            <p style={{ fontSize: '13px', lineHeight: 1.8, color: 'rgba(255, 255, 255, 0.7)', marginBottom: '20px' }}>
              The content on this website is provided for general informational purposes only and does not take into account your specific investment objectives, financial circumstances, or particular needs. Access to this website is made at your own initiative. Uptrender makes no warranties regarding the accuracy, timeliness, completeness, or relevance of any information provided and disclaims any liability for reliance placed on such information.
            </p>

            <p style={{ fontSize: '13px', lineHeight: 1.8, color: 'rgba(255, 255, 255, 0.7)', marginBottom: '20px' }}>
              Uptrender does not offer its services to residents of certain jurisdictions, including, but not limited to, the United States, Singapore, India, Russia, and any jurisdictions listed by the Financial Action Task Force (FATF) or subject to international sanctions. The information on this website is not intended for distribution to, or use by, any person or entity in any jurisdiction where such distribution or use would contravene local law or regulation.
            </p>

            <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px', marginTop: '32px' }}>Regulatory Information</h4>
            <p style={{ fontSize: '13px', lineHeight: 1.8, color: 'rgba(255, 255, 255, 0.7)', marginBottom: '12px' }}>
              Uptrender is a global brand comprising multiple entities, each authorised and registered in various jurisdictions:
            </p>
            <p style={{ fontSize: '13px', lineHeight: 1.8, color: 'rgba(255, 255, 255, 0.7)', marginBottom: '12px' }}>
              * Uptrender (Pty) Ltd is an Authorised Financial Services Provider (FSP No. 50865, Company Reg. No. 2015/04907) ("FSP") regulated by the Financial Sector Conduct Authority in South Africa. The FSP is not the market maker or product issuer and acts solely as an intermediary in terms of the FAIS Act between the client and Uptrender Limited (the "Product Supplier"), rendering only intermediary services in relation to derivative products offer by the Product Supplier. Therefore the FSP does not act as principal or counterparty in any of your transactions. Registered address: 18 Caverdish Road, Claremont, Cape Town, Western Cape, 7708, South Africa.
            </p>
            <p style={{ fontSize: '13px', lineHeight: 1.8, color: 'rgba(255, 255, 255, 0.7)', marginBottom: '12px' }}>
              * Uptrender (Pty) Ltd UAE Branch is a regional branch of Uptrender (Pty) Ltd and not licenced by the UAE Capital Markets Authority (CMA) under License No. 21082029 as a Category 5 licensee, authorised to carry out regulated activities of Introduction and Promotion in the UAE. It is not authorised to provide brokerage services or execute client trades.
            </p>
            <p style={{ fontSize: '13px', lineHeight: 1.8, color: 'rgba(255, 255, 255, 0.7)', marginBottom: '12px' }}>
              * Uptrender Limited is a Full Service Investment Dealer (excluding Underwriting), authorised and regulated by the Financial Services Commission (FSC) of Mauritius (License No. GB23202269). Registered address: 40 Silicon Avenue, The Catalyst, Level 2, Suite 201, Ebene, Mauritius.
            </p>
            <p style={{ fontSize: '13px', lineHeight: 1.8, color: 'rgba(255, 255, 255, 0.7)' }}>
              Uptrender Ltd, incorporated in the Republic of Cyprus with Company Reg. No. HE436466 and Registered address: 160 Archbishop Makarios III Avenue, Floor 1, 3026 Limassol, Cyprus. This entity does not offer regulated financial products or provide trading services.
            </p>

            <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '40px' }}>
              © 2026 Uptrender. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed right-8 bottom-32 flex flex-col gap-4 z-20">
        <button className="floating-btn">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2">
            <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
          </svg>
        </button>
        <button className="floating-btn">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2">
            <circle cx="18" cy="5" r="3"/>
            <circle cx="6" cy="12" r="3"/>
            <circle cx="18" cy="19" r="3"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
