"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
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

type PricingPlan = {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  walletBalance: number;
  maxStrategies: number | null;
  apiAccess: boolean;
  priority: string;
  duration: number;
  durationType: string;
  popular: boolean;
  cta: string;
  ctaLink: string;
};

export default function Home() {
      const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [tradersCount, setTradersCount] = useState(0);
  const [clientsCount, setClientsCount] = useState(0);
  const [isAnnual, setIsAnnual] = useState(false);
  const [showSocialMenu, setShowSocialMenu] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
  const [loadingPricing, setLoadingPricing] = useState(true);
  
  // Refs for all sections
  const videoRef = useRef<HTMLVideoElement>(null);
  const everythingSectionRef = useRef<HTMLDivElement>(null);
  const alwaysReadyRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const whyChooseRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const awardsRef = useRef<HTMLDivElement>(null);
  const ratingsRef = useRef<HTMLDivElement>(null);
  const partnershipsRef = useRef<HTMLDivElement>(null);
  const exploreRef = useRef<HTMLDivElement>(null);

  // Fetch pricing data
  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const response = await fetch('https://app.uptrender.in/api/public/pricing/plans');
        if (response.ok) {
          const apiData = await response.json();
          if (apiData.success && apiData.data) {
            // Transform API data to match expected format
            const transformedPlans = apiData.data.map((plan: any) => ({
              id: plan.planType,
              name: plan.name,
              description: plan.description,
              monthlyPrice: plan.price,
              walletBalance: plan.walletBalance || 0,
              maxStrategies: plan.maxStrategies,
              apiAccess: plan.apiAccess === 1,
              priority: plan.priority,
              duration: plan.duration,
              durationType: plan.durationType,
              popular: plan.isPopular === 1,
              cta: plan.price === 0 ? 'Get Started Free' : 'Get Started',
              ctaLink: 'https://app.uptrender.in/auth/register'
            }));
            setPricingPlans(transformedPlans);
          }
        }
      } catch (error) {
        console.error('Error fetching pricing:', error);
      } finally {
        setLoadingPricing(false);
      }
    };
    fetchPricing();
  }, []);

  // Refresh ScrollTrigger when pricing cards finish loading
  useEffect(() => {
    if (!loadingPricing) {
      // Give React time to render the cards, then refresh ScrollTrigger
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }
  }, [loadingPricing]);

  
  // Close social menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const socialMenu = target.closest('.floating-btn');
      if (!socialMenu && showSocialMenu) {
        setShowSocialMenu(false);
      }
    };

    if (showSocialMenu) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showSocialMenu]);

  // Auto-cycle through asset categories every 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCategoryIndex((prevIndex) => (prevIndex + 1) % assetCategories.length);
    }, 809);

    return () => clearInterval(interval);
  }, []);

  // GSAP animation for Everything You Need section - Optimized
  useEffect(() => {
    if (!everythingSectionRef.current) return;

    const ctx = gsap.context(() => {
      // Batch animations with shared ScrollTrigger for better performance
      gsap.fromTo(
        ".about-us-label",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: ".about-us-label",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".everything-title",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.1,
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: ".everything-title",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".everything-subtitle",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.15,
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: ".everything-subtitle",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".read-more-link",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          delay: 0.2,
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: ".read-more-link",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".qr-code",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.25,
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: ".qr-code",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".store-btn",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: ".store-buttons",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".phone-image",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          force3D: true,
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

  // GSAP animation for Always Ready section - Optimized
  useEffect(() => {
    if (!alwaysReadyRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".always-ready-title",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          force3D: true,
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
          duration: 0.9,
          delay: 0.15,
          ease: "power3.out",
          force3D: true,
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
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          force3D: true,
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

  // GSAP animation for Services section header - Optimized
  useEffect(() => {
    if (!servicesRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".services-label",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: ".services-label",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".services-title",
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          delay: 0.1,
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: ".services-title",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".services-subtitle",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.15,
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: ".services-subtitle",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".stacking-card",
        { opacity: 0, y: 80, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: ".stacking-cards-wrapper",
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }, servicesRef);

    return () => ctx.revert();
  }, []);

  // GSAP animation for Why Choose section - Optimized
  useEffect(() => {
    if (!whyChooseRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation with GPU acceleration
      gsap.fromTo(
        ".why-choose-title",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: ".why-choose-title",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Cards animation - reduced stagger for smoother performance
      gsap.fromTo(
        ".why-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          force3D: true,
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

  // GSAP animation for Pricing section
  useEffect(() => {
    if (!pricingRef.current) return;

    const ctx = gsap.context(() => {
      // Animate pricing section title
      gsap.fromTo(
        ".pricing-title",
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: ".pricing-title",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animate pricing subtitle
      gsap.fromTo(
        ".pricing-subtitle",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".pricing-subtitle",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animate toggle
      gsap.fromTo(
        ".pricing-toggle",
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: 0.2,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: ".pricing-toggle",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animate pricing cards with stagger
      gsap.fromTo(
        ".pricing-card",
        { opacity: 0, y: 60, rotateX: 15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".pricing-cards-grid",
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }, pricingRef);

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
        ".features-label",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".features-label",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".explore-title",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.1,
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
          duration: 0.5,
          delay: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".explore-cta",
            start: "top 90%",
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

  const toggleMute = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      
      if (isMuted) {
        // Unmute: set muted to false, ensure volume is up, and play
        video.muted = false;
        video.volume = 1.0;
        video.play().catch(() => {
          // Handle play error silently
        });
      } else {
        // Mute
        video.muted = true;
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative">
      {/* Performance optimizations */}
      <style>{`
        .about-us-label,
        .everything-title,
        .everything-subtitle,
        .read-more-link,
        .qr-code,
        .store-btn,
        .phone-image,
        .why-choose-title,
        .why-card {
          will-change: transform, opacity;
        }
      `}</style>

      {/* Hero Section with Video Background */}
      <section className="hero-section">
        {/* Background Video */}
        <video
          ref={videoRef}
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
      

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8">
        <div className="flex flex-col items-center text-center">
          {/* <div className="hero-heading">
            <h1 className="hero-title text-white hero-start">
              INDIA'S FIRST
            </h1>
            <h1 className="hero-title text-white hero-trading">
              AI-POWERED ALGO
            </h1>
          </div> */}
          {/* <p className="hero-subtitle hero-subtitle-spacing">
            Trading Dashboard for <span className="accent-text">Forex & Crypto</span>
          </p> */}
          {/* <a href="https://app.uptrender.in/auth/login" className="btn-secondary hero-cta">
            Get Started
          </a> */}
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
              <source src="/coin.mp4" type="video/mp4" />
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
        <div className="everything-inner" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 60px', display: 'flex', alignItems: 'stretch', justifyContent: 'space-between', gap: '80px' }}>
          <div className="everything-content" style={{ flex: 1, maxWidth: '600px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span className="about-us-label" style={{ display: 'inline-block', background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.15), rgba(0, 150, 255, 0.15))', border: '1px solid rgba(0, 240, 255, 0.3)', borderRadius: '50px', padding: '10px 28px', fontSize: '14px', fontWeight: 600, color: '#00f0ff', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '24px', opacity: 0, alignSelf: 'flex-start' }}>About Us</span>
            <h2 className="everything-title" style={{ color: '#ffffff', fontSize: '48px', fontWeight: 700, lineHeight: 1.1, marginBottom: '24px', opacity: 0 }}>
              Everything you need for profitable <span style={{ color: '#00f0ff' }}>Forex & Crypto trading</span><span className="everything-dot" style={{ color: '#dc2626' }}>.</span>
            </h2>
            <p className="everything-subtitle" style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '18px', lineHeight: 1.6, marginBottom: '4px', maxWidth: '500px', opacity: 0 }}>
              Now powered by India's smartest AI. Real-time market sentiment analysis. No-code strategy builder. <br/> Smart copy trading. All of it, right in your pocket. Trade smarter, faster, and 24/7 — whether you're at your desk or on the move.
            </p>
            <a href="/about" className="read-more-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#00f0ff', fontSize: '16px', fontWeight: 600, textDecoration: 'none', marginBottom: '16px', opacity: 0, transition: 'all 0.3s ease' }}>
              Read More About Us
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            
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
          
          <div className="everything-phone" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'stretch', maxWidth: '700px', position: 'relative', marginTop: '55px' }}>
            <img src="/about.jpg" alt="Uptrender Trading App" className="phone-image" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '24px', opacity: 0, minHeight: '100%' }} />
          </div>
        </div>
      </section>

      {/* Always Ready Section */}
      <section ref={alwaysReadyRef} className="always-ready-section" style={{ background: '#0a0a0a', padding: '100px 0 80px', position: 'relative', zIndex: 12 }}>
        <div className="always-ready-inner" style={{ maxWidth: '1920px', margin: '0 auto', padding: '0 80px', textAlign: 'center' }}>
          {/* Header Row */}
          <div className="always-ready-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '-80px', gap: '100px', position: 'relative', zIndex: 20, maxWidth: '1600px', margin: '0 auto -80px' }}>
            <h2 className="always-ready-title" style={{ color: '#ffffff', fontSize: '60px', fontWeight: 750, lineHeight: 1.2, textAlign: 'left', opacity: 0, flex: '0 0 auto' }}>
              Always one step<br />
              ahead<span style={{ color: '#dc2626' }}>.</span>
            </h2>
            <p className="always-ready-subtitle" style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '19px', lineHeight: 1.6, maxWidth: '550px', textAlign: 'left', opacity: 0, flex: '1 1 auto', paddingTop: '8px' }}>
              A powerful trading ecosystem built for every market phase.<br/>Trade Forex & Crypto with an AI-driven platform.
            </p>
          </div>

          {/* Laptop with Platform Labels */}
          <div className="always-ready-laptop" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '700px', zIndex: 1, padding: '0 20px', marginTop: '20px' }}>
            {/* Copy Trading Label */}
            <div className="platform-label-gradient" style={{ position: 'absolute', top: '15%', left: '8%', background: 'rgba(192, 192, 192, 0.15)', backdropFilter: 'blur(10px)', border: '2px solid rgba(192, 192, 192, 0.5)', borderRadius: '14px', padding: '20px 44px', color: '#e5e5e5', fontSize: '24px', fontWeight: 700, zIndex: 10, cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 0 25px rgba(192, 192, 192, 0.3), 0 0 50px rgba(192, 192, 192, 0.15), inset 0 0 20px rgba(192, 192, 192, 0.08)', opacity: 0 }}>
              Copy Trading
            </div>
            
            {/* AI Assistant Label */}
            <div className="platform-label-gradient" style={{ position: 'absolute', top: '15%', right: '8%', background: 'rgba(192, 192, 192, 0.15)', backdropFilter: 'blur(10px)', border: '2px solid rgba(192, 192, 192, 0.5)', borderRadius: '14px', padding: '20px 44px', color: '#e5e5e5', fontSize: '24px', fontWeight: 700, zIndex: 10, cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 0 25px rgba(192, 192, 192, 0.3), 0 0 50px rgba(192, 192, 192, 0.15), inset 0 0 20px rgba(192, 192, 192, 0.08)', opacity: 0 }}>
              AI Assistant
            </div>
            
            {/* AI Trade Label */}
            <div className="platform-label-gradient" style={{ position: 'absolute', top: '52%', left: 'calc(6% + 50px)', background: 'rgba(192, 192, 192, 0.15)', backdropFilter: 'blur(10px)', border: '2px solid rgba(192, 192, 192, 0.5)', borderRadius: '14px', padding: '20px 44px', color: '#e5e5e5', fontSize: '24px', fontWeight: 700, zIndex: 10, cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 0 25px rgba(192, 192, 192, 0.3), 0 0 50px rgba(192, 192, 192, 0.15), inset 0 0 20px rgba(192, 192, 192, 0.08)', opacity: 0 }}>
              AI Trade
            </div>
            
            {/* Trading View Label */}
            <div className="platform-label-gradient" style={{ position: 'absolute', top: '60%', right: '8%', background: 'rgba(192, 192, 192, 0.15)', backdropFilter: 'blur(10px)', border: '2px solid rgba(192, 192, 192, 0.5)', borderRadius: '14px', padding: '20px 44px', color: '#e5e5e5', fontSize: '24px', fontWeight: 700, zIndex: 10, cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 0 25px rgba(192, 192, 192, 0.3), 0 0 50px rgba(192, 192, 192, 0.15), inset 0 0 20px rgba(192, 192, 192, 0.08)', opacity: 0 }}>
              Trading View
            </div>

            <img src="/laptop.jpg" alt="Trading Platforms" style={{ width: '100%', maxWidth: '1700px', maxHeight: 'calc(100% - 30px)', height: 'auto', objectFit: 'contain' }} />
          </div>
        </div>
      </section>

      {/* Services Stacking Cards Section */}
      <section ref={servicesRef} className="services-stacking-section">
        <div className="services-stacking-container">
          <div className="services-header">
            <span className="services-label">What We Offer</span>
            <h2 className="services-title">
              Our Premium Services<span style={{ color: '#00f0ff' }}>.</span>
            </h2>
            <p className="services-subtitle">
              Discover our comprehensive suite of trading solutions designed to elevate your trading journey
            </p>
          </div>

          <div className="stacking-cards-wrapper">
            {/* Card 1 - Multi-Market Dashboard */}
            <div className="stacking-card" style={{ '--card-index': 0, '--card-color': '#00f0ff' } as React.CSSProperties}>
              <div className="stacking-card-inner">
                <div className="stacking-card-image">
                  <div style={{ position: "relative", width: "100%", height: "100%", minHeight: "300px" }}>
                    <Image 
                      src="/s1.png" 
                      alt="Multi-Market Dashboard"
                      fill
                      style={{ objectFit: "contain" }}
                      sizes="(max-width: 768px) 100vw, 500px"
                      priority
                    />
                  </div>
                </div>
                <div className="stacking-card-content">
                  <div className="card-content-gradient" style={{ background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.15) 0%, rgba(0, 100, 200, 0.25) 100%)' }}></div>
                  <div className="card-content-inner">
                    <div className="card-meta">
                      <span className="card-category" style={{ background: 'rgba(0, 240, 255, 0.2)', color: '#00f0ff' }}>UNIFIED</span>
                      <span className="card-counter">01 / 08</span>
                    </div>
                    <h3 className="stacking-card-title">Multi-Market Dashboard</h3>
                    <p className="stacking-card-description">
                      Monitor major Forex pairs and top Crypto assets side-by-side with live prices. Switch between markets instantly - no tabs, no switching platforms, just one powerful dashboard.
                    </p>
                    <div className="card-tags">
                      <span className="card-tag">Unified</span>
                      <span className="card-tag">Real-Time</span>
                      <span className="card-tag">Multi-Market</span>
                    </div>
                    <a href="/services#multi-market-dashboard" className="stacking-card-btn">
                      View Details
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 - AI Strategy Builder */}
            <div className="stacking-card" style={{ '--card-index': 1, '--card-color': '#a855f7' } as React.CSSProperties}>
              <div className="stacking-card-inner">
                <div className="stacking-card-image">
                  <div style={{ position: "relative", width: "100%", height: "100%", minHeight: "300px" }}>
                    <Image 
                      src="/s1.jpg" 
                      alt="AI Strategy Builder"
                      fill
                      style={{ objectFit: "contain" }}
                      sizes="(max-width: 768px) 100vw, 500px"
                    />
                  </div>
                </div>
                <div className="stacking-card-content">
                  <div className="card-content-gradient" style={{ background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(99, 102, 241, 0.25) 100%)' }}></div>
                  <div className="card-content-inner">
                    <div className="card-meta">
                      <span className="card-category" style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#a855f7' }}>AI BUILDER</span>
                      <span className="card-counter">02 / 08</span>
                    </div>
                    <h3 className="stacking-card-title">AI Strategy Builder</h3>
                    <p className="stacking-card-description">
                      Type what you want in plain English, and our AI instantly creates, backtests, and refines the complete strategy for you. Perfect for scalping XAUUSD or swing trading BTC.
                    </p>
                    <div className="card-tags">
                      <span className="card-tag">No-Code</span>
                      <span className="card-tag">AI-Powered</span>
                      <span className="card-tag">Instant</span>
                    </div>
                    <a href="/services#ai-strategy-builder" className="stacking-card-btn">
                      View Details
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 - AI Trade Assistant */}
            <div className="stacking-card" style={{ '--card-index': 2, '--card-color': '#10b981' } as React.CSSProperties}>
              <div className="stacking-card-inner">
                <div className="stacking-card-image">
                  <div style={{ position: "relative", width: "100%", height: "100%", minHeight: "300px" }}>
                    <Image 
                      src="/service1.jpg" 
                      alt="AI Trade Assistant"
                      fill
                      style={{ objectFit: "contain" }}
                      sizes="(max-width: 768px) 100vw, 500px"
                    />
                  </div>
                </div>
                <div className="stacking-card-content">
                  <div className="card-content-gradient" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.25) 100%)' }}></div>
                  <div className="card-content-inner">
                    <div className="card-meta">
                      <span className="card-category" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981' }}>ANALYSIS</span>
                      <span className="card-counter">03 / 08</span>
                    </div>
                    <h3 className="stacking-card-title">AI Trade Assistant</h3>
                    <p className="stacking-card-description">
                      Pick any Forex pair or Crypto coin and ask for market sentiment. Our AI scans thousands of global news sources, analyst reports, and on-chain data in seconds, then executes the trade at your chosen risk level.
                    </p>
                    <div className="card-tags">
                      <span className="card-tag">Analysis</span>
                      <span className="card-tag">Execution</span>
                      <span className="card-tag">Research</span>
                    </div>
                    <a href="/services#ai-trade-assistant" className="stacking-card-btn">
                      View Details
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4 - Advanced Backtesting Engine */}
            <div className="stacking-card" style={{ '--card-index': 3, '--card-color': '#f59e0b' } as React.CSSProperties}>
              <div className="stacking-card-inner">
                <div className="stacking-card-image">
                  <div style={{ position: "relative", width: "100%", height: "100%", minHeight: "300px" }}>
                    <Image 
                      src="/service1.jpg" 
                      alt="Advanced Backtesting Engine"
                      fill
                      style={{ objectFit: "contain" }}
                      sizes="(max-width: 768px) 100vw, 500px"
                    />
                  </div>
                </div>
                <div className="stacking-card-content">
                  <div className="card-content-gradient" style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.25) 100%)' }}></div>
                  <div className="card-content-inner">
                    <div className="card-meta">
                      <span className="card-category" style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b' }}>BACKTEST</span>
                      <span className="card-counter">04 / 08</span>
                    </div>
                    <h3 className="stacking-card-title">Advanced Backtesting Engine</h3>
                    <p className="stacking-card-description">
                      Run your strategies on years of real historical Forex and Crypto data. See exact win rate, drawdown, and profit potential before you put a single rupee on the line.
                    </p>
                    <div className="card-tags">
                      <span className="card-tag">Historical</span>
                      <span className="card-tag">Results</span>
                      <span className="card-tag">Data</span>
                    </div>
                    <a href="/services#backtesting-engine" className="stacking-card-btn">
                      View Details
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 5 - Smart Copy Trading */}
            <div className="stacking-card" style={{ '--card-index': 4, '--card-color': '#ec4899' } as React.CSSProperties}>
              <div className="stacking-card-inner">
                <div className="stacking-card-image">
                  <div style={{ position: "relative", width: "100%", height: "100%", minHeight: "300px" }}>
                    <Image 
                      src="/service1.jpg" 
                      alt="Smart Copy Trading"
                      fill
                      style={{ objectFit: "contain" }}
                      sizes="(max-width: 768px) 100vw, 500px"
                    />
                  </div>
                </div>
                <div className="stacking-card-content">
                  <div className="card-content-gradient" style={{ background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(190, 24, 93, 0.25) 100%)' }}></div>
                  <div className="card-content-inner">
                    <div className="card-meta">
                      <span className="card-category" style={{ background: 'rgba(236, 72, 153, 0.2)', color: '#ec4899' }}>COPY TRADING</span>
                      <span className="card-counter">05 / 08</span>
                    </div>
                    <h3 className="stacking-card-title">Smart Copy Trading</h3>
                    <p className="stacking-card-description">
                      Copy trades from verified master traders in Forex and Crypto in real time. Set up Master & Child accounts with full control over risk and allocation - earn while you sleep.
                    </p>
                    <div className="card-tags">
                      <span className="card-tag">Master</span>
                      <span className="card-tag">Child</span>
                      <span className="card-tag">Copy</span>
                    </div>
                    <a href="/services#smart-copy-trading" className="stacking-card-btn">
                      View Details
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 6 - Paper / Live Trading */}
            <div className="stacking-card" style={{ '--card-index': 5, '--card-color': '#06b6d4' } as React.CSSProperties}>
              <div className="stacking-card-inner">
                <div className="stacking-card-image">
                  <div style={{ position: "relative", width: "100%", height: "100%", minHeight: "300px" }}>
                    <Image 
                      src="/service1.jpg" 
                      alt="Paper / Live Trading"
                      fill
                      style={{ objectFit: "contain" }}
                      sizes="(max-width: 768px) 100vw, 500px"
                    />
                  </div>
                </div>
                <div className="stacking-card-content">
                  <div className="card-content-gradient" style={{ background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(14, 116, 144, 0.25) 100%)' }}></div>
                  <div className="card-content-inner">
                    <div className="card-meta">
                      <span className="card-category" style={{ background: 'rgba(6, 182, 212, 0.2)', color: '#06b6d4' }}>TRADING</span>
                      <span className="card-counter">06 / 08</span>
                    </div>
                    <h3 className="stacking-card-title">Paper / Live Trading</h3>
                    <p className="stacking-card-description">
                      Test every strategy in a full paper trading environment first. When you're confident, switch to live trading with one click — zero downtime.
                    </p>
                    <div className="card-tags">
                      <span className="card-tag">Paper</span>
                      <span className="card-tag">Live</span>
                      <span className="card-tag">Seamless</span>
                    </div>
                    <a href="/services#paper-live-trading" className="stacking-card-btn">
                      View Details
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 7 - Broker API Integration */}
            <div className="stacking-card" style={{ '--card-index': 6, '--card-color': '#8b5cf6' } as React.CSSProperties}>
              <div className="stacking-card-inner">
                <div className="stacking-card-image">
                  <div style={{ position: "relative", width: "100%", height: "100%", minHeight: "300px" }}>
                    <Image 
                      src="/service1.jpg" 
                      alt="Broker API Integration"
                      fill
                      style={{ objectFit: "contain" }}
                      sizes="(max-width: 768px) 100vw, 500px"
                    />
                  </div>
                </div>
                <div className="stacking-card-content">
                  <div className="card-content-gradient" style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(109, 40, 217, 0.25) 100%)' }}></div>
                  <div className="card-content-inner">
                    <div className="card-meta">
                      <span className="card-category" style={{ background: 'rgba(139, 92, 246, 0.2)', color: '#8b5cf6' }}>INTEGRATION</span>
                      <span className="card-counter">07 / 08</span>
                    </div>
                    <h3 className="stacking-card-title">Broker API Integration</h3>
                    <p className="stacking-card-description">
                      Secure, bank-level API connections to your favorite Forex brokers and leading Crypto exchanges. Your funds always stay safely in your own accounts.
                    </p>
                    <div className="card-tags">
                      <span className="card-tag">API</span>
                      <span className="card-tag">Secure</span>
                      <span className="card-tag">Brokers</span>
                    </div>
                    <a href="/services#broker-api-integration" className="stacking-card-btn">
                      View Details
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 8 - Strategy Marketplace */}
            <div className="stacking-card" style={{ '--card-index': 7, '--card-color': '#ef4444' } as React.CSSProperties}>
              <div className="stacking-card-inner">
                <div className="stacking-card-image">
                  <div style={{ position: "relative", width: "100%", height: "100%", minHeight: "300px" }}>
                    <Image 
                      src="/service1.jpg" 
                      alt="Strategy Marketplace"
                      fill
                      style={{ objectFit: "contain" }}
                      sizes="(max-width: 768px) 100vw, 500px"
                    />
                  </div>
                </div>
                <div className="stacking-card-content">
                  <div className="card-content-gradient" style={{ background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(185, 28, 28, 0.25) 100%)' }}></div>
                  <div className="card-content-inner">
                    <div className="card-meta">
                      <span className="card-category" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' }}>MARKETPLACE</span>
                      <span className="card-counter">08 / 08</span>
                    </div>
                    <h3 className="stacking-card-title">Strategy Marketplace</h3>
                    <p className="stacking-card-description">
                      Browse proven algo strategies from top Indian traders or publish your own. A complete marketplace built only for Forex and Crypto — save time and discover what actually works.
                    </p>
                    <div className="card-tags">
                      <span className="card-tag">Strategies</span>
                      <span className="card-tag">Community</span>
                      <span className="card-tag">Marketplace</span>
                    </div>
                    <a href="/services#strategy-marketplace" className="stacking-card-btn">
                      View Details
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Traders Choose Us Section */}
      <section ref={whyChooseRef} className="why-choose-section" style={{ background: '#0a0a0a', padding: '100px 0', position: 'relative', zIndex: 12 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 60px' }}>
          <h2 className="why-choose-title" style={{ color: '#ffffff', fontSize: '52px', fontWeight: 700, textAlign: 'center', marginBottom: '80px', opacity: 0 }}>
            Why Traders Are Switching to Uptrender<span style={{ color: '#00f0ff' }}>.</span>
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
              <div style={{ height: '220px', position: 'relative', marginBottom: '24px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.08)', background: '#10141f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ position: 'relative', width: '82%', height: '90%' }}>
                  <Image
                    src="/f1.png"
                    alt="Trading dashboard preview"
                    fill
                    style={{ objectFit: 'contain', objectPosition: 'center' }}
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>
              </div>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px', marginBottom: '8px' }}>Smarter Trading</p>
              <h3 style={{ color: '#00f0ff', fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>Your edge in Forex & Crypto</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '15px', lineHeight: 1.6 }}>
                Stop juggling platforms and missing trades. Trade both markets from one AI-powered dashboard designed for speed, clarity, and consistency.
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
              <div style={{ height: '220px', position: 'relative', marginBottom: '24px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.08)', background: '#10141f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ position: 'relative', width: '82%', height: '90%' }}>
                  <Image
                    src="/f2.png"
                    alt="AI-powered sustainable app preview"
                    fill
                    style={{ objectFit: 'contain', objectPosition: 'center' }}
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>
              </div>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px', marginBottom: '8px' }}>AI That Works for You</p>
              <h3 style={{ color: '#00f0ff', fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>Trade with intelligence, not guesswork</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '15px', lineHeight: 1.6 }}>
                Just give a simple prompt like: "Buy BTC on bullish momentum with moderate risk". Our AI analyzes global data, tracks sentiment, and executes trades automatically — 24/7.
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
              <div style={{ height: '220px', position: 'relative', marginBottom: '24px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.08)', background: '#10141f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ position: 'relative', width: '82%', height: '90%' }}>
                  <Image
                    src="/f3.png"
                    alt="Streaming platform interface preview"
                    fill
                    style={{ objectFit: 'contain', objectPosition: 'center' }}
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>
              </div>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px', marginBottom: '8px' }}>Automation You Can Rely On</p>
              <h3 style={{ color: '#00f0ff', fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>Your strategy, fully automated</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '15px', lineHeight: 1.6 }}>
                No coding. No manual monitoring. From strategy creation to execution, everything runs seamlessly — so you stay in control without being glued to the screen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" ref={pricingRef} style={{ 
        background: '#000000', 
        padding: '100px 0', 
        position: 'relative', 
        zIndex: 12 
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: '70px' }}>
            <h2 className="pricing-title" style={{ 
              color: '#ffffff', 
              fontSize: '56px', 
              fontWeight: 800, 
              textAlign: 'center',
              marginBottom: '16px',
              opacity: 0,
              letterSpacing: '-1px',
              lineHeight: '1.1'
            }}>
              Choose Your Plan<span style={{ color: '#13b1ac' }}>.</span>
            </h2>
            <p className="pricing-subtitle" style={{ 
              color: 'rgba(255, 255, 255, 0.6)', 
              fontSize: '20px', 
              textAlign: 'center',
              marginBottom: '0',
              opacity: 0,
              fontWeight: 400,
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Select the perfect plan for your trading journey
            </p>
          </div>

          {/* Pricing Cards */}
          {loadingPricing ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(255, 255, 255, 0.5)' }}>
              Loading pricing plans...
            </div>
          ) : (
            <div className="pricing-cards-grid" style={{ display: 'grid', gridTemplateColumns: `repeat(${pricingPlans.length || 3}, 1fr)`, gap: '40px', alignItems: 'stretch', maxWidth: '1400px', margin: '0 auto' }}>
              {(pricingPlans.length > 0 ? pricingPlans : [
                {
                  id: 'professional',
                  name: 'professional',
                  description: 'professional',
                  monthlyPrice: 30,
                  walletBalance: 10,
                  maxStrategies: 3,
                  apiAccess: true,
                  priority: 'high',
                  duration: 30,
                  durationType: 'days',
                  popular: true,
                  cta: 'Get Started',
                  ctaLink: 'https://app.uptrender.in/auth/register'
                },
                {
                  id: 'basic',
                  name: 'Free Forever',
                  description: 'Free Forever',
                  monthlyPrice: 0,
                  walletBalance: 0,
                  maxStrategies: 1,
                  apiAccess: false,
                  priority: 'standard',
                  duration: 30,
                  durationType: 'days',
                  popular: false,
                  cta: 'Get Started Free',
                  ctaLink: 'https://app.uptrender.in/auth/register'
                },
                {
                  id: 'enterprise',
                  name: 'Elite',
                  description: 'Elite',
                  monthlyPrice: 100,
                  walletBalance: 10,
                  maxStrategies: null,
                  apiAccess: true,
                  priority: 'high',
                  duration: 30,
                  durationType: 'days',
                  popular: false,
                  cta: 'Get Started',
                  ctaLink: 'https://app.uptrender.in/auth/register'
                }
              ]).map((plan) => {
                return (
                  <div key={plan.id} className="pricing-card" style={{ 
                    background: plan.popular ? 'linear-gradient(135deg, rgba(19, 177, 172, 0.05) 0%, rgba(0, 0, 0, 0.95) 100%)' : 'rgba(10, 10, 10, 0.6)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px', 
                    padding: '36px 32px',
                    boxShadow: plan.popular 
                      ? '0 20px 60px rgba(19, 177, 172, 0.2), 0 0 80px rgba(19, 177, 172, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
                      : '0 10px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                    border: plan.popular ? '2px solid rgba(19, 177, 172, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    minHeight: '480px',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: plan.popular ? 'scale(1.05)' : 'scale(1)',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = plan.popular ? 'scale(1.08) translateY(-8px)' : 'scale(1.03) translateY(-8px)';
                    e.currentTarget.style.boxShadow = plan.popular 
                      ? '0 30px 80px rgba(19, 177, 172, 0.3), 0 0 100px rgba(19, 177, 172, 0.15)'
                      : '0 20px 60px rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.borderColor = plan.popular ? 'rgba(19, 177, 172, 0.8)' : 'rgba(255, 255, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = plan.popular ? 'scale(1.05)' : 'scale(1)';
                    e.currentTarget.style.boxShadow = plan.popular 
                      ? '0 20px 60px rgba(19, 177, 172, 0.2), 0 0 80px rgba(19, 177, 172, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
                      : '0 10px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = plan.popular ? 'rgba(19, 177, 172, 0.5)' : 'rgba(255, 255, 255, 0.1)';
                  }}
                  >
                    {/* Gradient Overlay */}
                    {plan.popular && (
                      <div style={{
                        position: 'absolute',
                        top: '-50%',
                        right: '-30%',
                        width: '200%',
                        height: '200%',
                        background: 'radial-gradient(circle, rgba(19, 177, 172, 0.15) 0%, transparent 70%)',
                        pointerEvents: 'none',
                        zIndex: 0
                      }} />
                    )}

                    {plan.popular && (
                      <div style={{ 
                        position: 'absolute', 
                        top: '20px', 
                        right: '20px',
                        background: 'rgba(19, 177, 172, 0.15)', 
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(19, 177, 172, 0.4)',
                        color: '#13b1ac', 
                        padding: '6px 16px', 
                        borderRadius: '20px',
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase',
                        boxShadow: '0 2px 10px rgba(19, 177, 172, 0.2)',
                        zIndex: 1
                      }}>
                        ⚡ Popular
                      </div>
                    )}
                    
                    {/* Plan Name */}
                    <h3 style={{ 
                      fontSize: '26px', 
                      fontWeight: 700, 
                      color: '#ffffff', 
                      marginBottom: '6px',
                      marginTop: '0',
                      position: 'relative',
                      zIndex: 1
                    }}>{plan.name}</h3>
                    <p style={{ 
                      color: 'rgba(255, 255, 255, 0.5)', 
                      fontSize: '14px', 
                      marginBottom: '24px',
                      position: 'relative',
                      zIndex: 1
                    }}>{plan.description}</p>
                    
                    {/* Price */}
                    <div style={{ marginBottom: '24px', position: 'relative', zIndex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '6px' }}>
                        <span style={{ fontSize: '20px', color: 'rgba(255, 255, 255, 0.4)', fontWeight: 600 }}>$</span>
                        <span style={{ 
                          fontSize: '56px', 
                          fontWeight: 800, 
                          color: plan.popular ? 'transparent' : '#ffffff',
                          letterSpacing: '-2px',
                          ...(plan.popular ? {
                            background: 'linear-gradient(135deg, #ffffff 0%, #13b1ac 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                          } : {})
                        }}>{plan.monthlyPrice}</span>
                      </div>
                      <p style={{ 
                        fontSize: '14px', 
                        color: 'rgba(255, 255, 255, 0.5)', 
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        per {plan.duration} {plan.durationType}
                      </p>
                    </div>
                    
                    {/* Divider */}
                    <div style={{ 
                      height: '1px', 
                      background: plan.popular 
                        ? 'linear-gradient(90deg, transparent, rgba(19, 177, 172, 0.3), transparent)' 
                        : 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
                      marginBottom: '24px',
                      position: 'relative',
                      zIndex: 1
                    }} />

                    {/* Features List */}
                    <div style={{ flex: 1, marginBottom: '24px', position: 'relative', zIndex: 1 }}>
                      {/* Wallet Balance */}
                      {plan.walletBalance > 0 && (
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '10px',
                          marginBottom: '12px'
                        }}>
                          <div style={{ 
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            background: 'rgba(19, 177, 172, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}>
                            <span style={{ color: '#13b1ac', fontSize: '11px' }}>✓</span>
                          </div>
                          <p style={{ fontSize: '15px', color: '#ffffff', margin: 0 }}>
                            Wallet Balance: ${plan.walletBalance}
                          </p>
                        </div>
                      )}
                      
                      {/* Duration */}
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '10px',
                        marginBottom: '12px'
                      }}>
                        <div style={{ 
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          background: 'rgba(19, 177, 172, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <span style={{ color: '#13b1ac', fontSize: '11px' }}>✓</span>
                        </div>
                        <p style={{ fontSize: '15px', color: '#ffffff', margin: 0 }}>
                          Duration: {plan.duration} {plan.durationType}
                        </p>
                      </div>
                      
                      {/* Trading Limits Header */}
                      <p style={{ 
                        fontSize: '13px', 
                        color: 'rgba(255, 255, 255, 0.6)', 
                        marginBottom: '10px',
                        marginTop: '16px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}>
                        Trading Limits
                      </p>
                      
                      {/* Strategies */}
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '10px',
                        marginBottom: '12px'
                      }}>
                        <div style={{ 
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          background: 'rgba(19, 177, 172, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <span style={{ color: '#13b1ac', fontSize: '11px' }}>✓</span>
                        </div>
                        <p style={{ fontSize: '15px', color: '#ffffff', margin: 0 }}>
                          {plan.maxStrategies === null ? 'Unlimited' : plan.maxStrategies} Active {plan.maxStrategies === 1 ? 'Strategy' : 'Strategies'}
                        </p>
                      </div>
                      
                      {/* API Access */}
                      {plan.apiAccess && (
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '10px',
                          marginBottom: '12px'
                        }}>
                          <div style={{ 
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            background: 'rgba(19, 177, 172, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}>
                            <span style={{ color: '#13b1ac', fontSize: '11px' }}>✓</span>
                          </div>
                          <p style={{ fontSize: '15px', color: '#ffffff', margin: 0 }}>
                            Full API Access
                          </p>
                        </div>
                      )}
                      
                      {/* Priority Support */}
                      {plan.priority === 'high' && (
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '10px',
                          marginBottom: '12px'
                        }}>
                          <div style={{ 
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            background: 'rgba(19, 177, 172, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}>
                            <span style={{ color: '#13b1ac', fontSize: '11px' }}>✓</span>
                          </div>
                          <p style={{ fontSize: '15px', color: '#ffffff', margin: 0 }}>
                            High Priority Support
                          </p>
                        </div>
                      )}
                    </div>

                    {/* CTA Button */}
                    <a 
                      href={plan.ctaLink || 'https://app.uptrender.in/auth/register'}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '16px 32px',
                        background: plan.popular 
                          ? 'linear-gradient(135deg, #13b1ac 0%, #0d8f8a 100%)' 
                          : 'rgba(255, 255, 255, 0.05)',
                        border: plan.popular ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '12px',
                        color: '#ffffff',
                        fontSize: '16px',
                        fontWeight: 700,
                        textAlign: 'center',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        position: 'relative',
                        zIndex: 1,
                        overflow: 'hidden'
                      }}
                      onMouseEnter={(e) => {
                        if (plan.popular) {
                          e.currentTarget.style.background = 'linear-gradient(135deg, #15c9be 0%, #0f9d98 100%)';
                          e.currentTarget.style.boxShadow = '0 8px 25px rgba(19, 177, 172, 0.4)';
                        } else {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (plan.popular) {
                          e.currentTarget.style.background = 'linear-gradient(135deg, #13b1ac 0%, #0d8f8a 100%)';
                          e.currentTarget.style.boxShadow = 'none';
                        } else {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                        }
                      }}
                    >
                      {plan.cta || 'Get Started'}
                    </a>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>


      {/* Features Section */}
      <section id="features" ref={exploreRef} style={{ 
        background: '#0a0a0a', 
        padding: '120px 0', 
        position: 'relative', 
        zIndex: 12,
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 60px' }}>
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="features-label" style={{ display: 'inline-block', background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.15), rgba(0, 150, 255, 0.15))', border: '1px solid rgba(0, 240, 255, 0.3)', borderRadius: '50px', padding: '10px 28px', fontSize: '14px', fontWeight: 600, color: '#00f0ff', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '24px', opacity: 0 }}>Our Features</span>
            <h2 className="explore-title" style={{ 
              color: '#ffffff', 
              fontSize: '48px', 
              fontWeight: 700, 
              marginBottom: '20px',
              lineHeight: 1.2,
              opacity: 0
            }}>
              Everything you need to dominate Forex & Crypto<br />— built right in<span style={{ color: '#00f0ff' }}>.</span>
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '18px', maxWidth: '700px', margin: '0 auto' }}>
              A complete arsenal of professional tools designed for modern traders
            </p>
          </div>

          {/* Features Carousel Container */}
          <div style={{ 
            position: 'relative',
            marginBottom: '60px',
            maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)'
          }}>
            {/* Carousel Track */}
            <div 
              className="features-carousel-track"
              style={{
                display: 'flex',
                gap: '32px',
                animation: 'features-scroll 60s linear infinite',
                width: 'max-content'
              }}>
              {/* Duplicate features twice for seamless loop */}
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} style={{ display: 'flex', gap: '32px' }}>
                  {/* Feature 1 */}
                  <div className="explore-step feature-card" style={{ 
                    background: 'rgba(10, 15, 30, 0.6)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)', 
                    borderRadius: '16px', 
                    padding: '36px',
                    minWidth: '420px',
                    maxWidth: '420px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(0, 240, 255, 0.5)';
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 240, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                    <div style={{ marginBottom: '20px' }}>
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                        <line x1="9" y1="3" x2="9" y2="21"/>
                        <line x1="3" y1="9" x2="21" y2="9"/>
                      </svg>
                    </div>
                    <h3 style={{ color: '#ffffff', fontSize: '22px', fontWeight: 700, marginBottom: '12px' }}>
                      Unified Multi-Market Dashboard
                    </h3>
                    <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '15px', lineHeight: 1.6 }}>
                      Trade Forex & Crypto in one place. Monitor major pairs and assets side-by-side with real-time prices.
                    </p>
                  </div>

                  {/* Feature 2 */}
                  <div className="explore-step feature-card" style={{ 
                    background: 'rgba(10, 15, 30, 0.6)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)', 
                    borderRadius: '16px', 
                    padding: '36px',
                    minWidth: '420px',
                    maxWidth: '420px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(0, 240, 255, 0.5)';
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 240, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                    <div style={{ marginBottom: '20px' }}>
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                        <path d="M2 17l10 5 10-5"/>
                        <path d="M2 12l10 5 10-5"/>
                      </svg>
                    </div>
                    <h3 style={{ color: '#ffffff', fontSize: '22px', fontWeight: 700, marginBottom: '12px' }}>
                      No-Code AI Strategy Builder
                    </h3>
                    <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '15px', lineHeight: 1.6 }}>
                      Build winning strategies with simple prompts. Our AI creates, backtests, and refines instantly.
                    </p>
                  </div>

                  {/* Feature 3 */}
                  <div className="explore-step feature-card" style={{ 
                    background: 'rgba(10, 15, 30, 0.6)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)', 
                    borderRadius: '16px', 
                    padding: '36px',
                    minWidth: '420px',
                    maxWidth: '420px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(0, 240, 255, 0.5)';
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 240, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                    <div style={{ marginBottom: '20px' }}>
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                        <line x1="12" y1="17" x2="12.01" y2="17"/>
                      </svg>
                    </div>
                    <h3 style={{ color: '#ffffff', fontSize: '22px', fontWeight: 700, marginBottom: '12px' }}>
                      Smart AI Trade Assistant
                    </h3>
                    <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '15px', lineHeight: 1.6 }}>
                      AI scans global news, analyst reports, and on-chain data. Executes trades with your risk preference.
                    </p>
                  </div>

                  {/* Feature 4 */}
                  <div className="explore-step feature-card" style={{ 
                    background: 'rgba(10, 15, 30, 0.6)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)', 
                    borderRadius: '16px', 
                    padding: '36px',
                    minWidth: '420px',
                    maxWidth: '420px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(0, 240, 255, 0.5)';
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 240, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                    <div style={{ marginBottom: '20px' }}>
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2">
                        <line x1="18" y1="20" x2="18" y2="10"/>
                        <line x1="12" y1="20" x2="12" y2="4"/>
                        <line x1="6" y1="20" x2="6" y2="14"/>
                      </svg>
                    </div>
                    <h3 style={{ color: '#ffffff', fontSize: '22px', fontWeight: 700, marginBottom: '12px' }}>
                      Advanced Backtesting Engine
                    </h3>
                    <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '15px', lineHeight: 1.6 }}>
                      Test on years of historical data. See win rate, drawdown, and profit before risking capital.
                    </p>
                  </div>

                  {/* Feature 5 */}
                  <div className="explore-step feature-card" style={{ 
                    background: 'rgba(10, 15, 30, 0.6)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)', 
                    borderRadius: '16px', 
                    padding: '36px',
                    minWidth: '420px',
                    maxWidth: '420px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(0, 240, 255, 0.5)';
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 240, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                    <div style={{ marginBottom: '20px' }}>
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                      </svg>
                    </div>
                    <h3 style={{ color: '#ffffff', fontSize: '22px', fontWeight: 700, marginBottom: '12px' }}>
                      Smart Copy Trading
                    </h3>
                    <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '15px', lineHeight: 1.6 }}>
                      Mirror expert trades automatically. Master & Child accounts with full risk control.
                    </p>
                  </div>

                  {/* Feature 6 */}
                  <div className="explore-step feature-card" style={{ 
                    background: 'rgba(10, 15, 30, 0.6)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)', 
                    borderRadius: '16px', 
                    padding: '36px',
                    minWidth: '420px',
                    maxWidth: '420px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(0, 240, 255, 0.5)';
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 240, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                    <div style={{ marginBottom: '20px' }}>
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      </svg>
                    </div>
                    <h3 style={{ color: '#ffffff', fontSize: '22px', fontWeight: 700, marginBottom: '12px' }}>
                      Real-Time Risk Management
                    </h3>
                    <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '15px', lineHeight: 1.6 }}>
                      Smart stop-loss, dynamic position sizing, trailing stops running live across all positions.
                    </p>
                  </div>

                  {/* Feature 7 */}
                  <div className="explore-step feature-card" style={{ 
                    background: 'rgba(10, 15, 30, 0.6)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)', 
                    borderRadius: '16px', 
                    padding: '36px',
                    minWidth: '420px',
                    maxWidth: '420px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(0, 240, 255, 0.5)';
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 240, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                    <div style={{ marginBottom: '20px' }}>
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                        <polyline points="10 9 9 9 8 9"/>
                      </svg>
                    </div>
                    <h3 style={{ color: '#ffffff', fontSize: '22px', fontWeight: 700, marginBottom: '12px' }}>
                      Paper / Live Trading Suite
                    </h3>
                    <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '15px', lineHeight: 1.6 }}>
                      Practice risk-free, then go live in one click. Zero downtime between modes.
                    </p>
                  </div>

                  {/* Feature 8 */}
                  <div className="explore-step feature-card" style={{ 
                    background: 'rgba(10, 15, 30, 0.6)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)', 
                    borderRadius: '16px', 
                    padding: '36px',
                    minWidth: '420px',
                    maxWidth: '420px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(0, 240, 255, 0.5)';
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 240, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                    <div style={{ marginBottom: '20px' }}>
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2">
                        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                        <line x1="12" y1="18" x2="12.01" y2="18"/>
                      </svg>
                    </div>
                    <h3 style={{ color: '#ffffff', fontSize: '22px', fontWeight: 700, marginBottom: '12px' }}>
                      Secure Broker Integration
                    </h3>
                    <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '15px', lineHeight: 1.6 }}>
                      Bank-level secure API to Indian brokers, Forex platforms, and Crypto exchanges.
                    </p>
                  </div>

                  {/* Feature 9 */}
                  <div className="explore-step feature-card" style={{ 
                    background: 'rgba(10, 15, 30, 0.6)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)', 
                    borderRadius: '16px', 
                    padding: '36px',
                    minWidth: '420px',
                    maxWidth: '420px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(0, 240, 255, 0.5)';
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 240, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                    <div style={{ marginBottom: '20px' }}>
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2">
                        <circle cx="9" cy="21" r="1"/>
                        <circle cx="20" cy="21" r="1"/>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                      </svg>
                    </div>
                    <h3 style={{ color: '#ffffff', fontSize: '22px', fontWeight: 700, marginBottom: '12px' }}>
                      Strategy Marketplace
                    </h3>
                    <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '15px', lineHeight: 1.6 }}>
                      Buy, sell, or share proven strategies from top Indian traders. Save time.
                    </p>
                  </div>

                  {/* Feature 10 */}
                  <div className="explore-step feature-card" style={{ 
                    background: 'rgba(10, 15, 30, 0.6)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)', 
                    borderRadius: '16px', 
                    padding: '36px',
                    minWidth: '420px',
                    maxWidth: '420px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(0, 240, 255, 0.5)';
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 240, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                    <div style={{ marginBottom: '20px' }}>
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2">
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                        <line x1="1" y1="10" x2="23" y2="10"/>
                      </svg>
                    </div>
                    <h3 style={{ color: '#ffffff', fontSize: '22px', fontWeight: 700, marginBottom: '12px' }}>
                      Instant Funding
                    </h3>
                    <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '15px', lineHeight: 1.6 }}>
                      Add money instantly via UPI, Razorpay, or crypto. Fully secure and transparent.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="explore-cta" style={{ 
            textAlign: 'center', 
            marginTop: '40px', 
            padding: '60px 40px',
            background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.1), rgba(0, 150, 255, 0.1))',
            borderRadius: '16px',
            border: '1px solid rgba(0, 240, 255, 0.2)',
            opacity: 0
          }}>
            <h3 style={{ color: '#ffffff', fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>
              Ready to trade with tools this powerful?
            </h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '18px', marginBottom: '32px' }}>
              Every feature above is live and ready for you right now.
            </p>
            <a href="https://app.uptrender.in/auth/register" style={{
              background: 'linear-gradient(135deg, #00f0ff, #0080ff)',
              color: '#0a0a0a',
              padding: '18px 50px',
              borderRadius: '8px',
              fontSize: '20px',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 20px rgba(0, 240, 255, 0.4)',
              textDecoration: 'none',
              display: 'inline-block'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 30px rgba(0, 240, 255, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 240, 255, 0.4)';
            }}>
              Start Trading Now
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      

      {/* Floating Action Buttons */}
      <div className="fixed right-8 bottom-32 flex flex-col gap-4 z-20">
        {/* Share Button with Social Menu */}
        <div style={{ position: 'relative' }}>
          <button 
            className="floating-btn"
            onClick={() => setShowSocialMenu(!showSocialMenu)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2">
              <circle cx="18" cy="5" r="3"/>
              <circle cx="6" cy="12" r="3"/>
              <circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
          </button>
          
          {/* Social Icons Menu */}
          <div
            style={{
              position: 'absolute',
              bottom: '100%',
              right: '0',
              marginBottom: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              opacity: showSocialMenu ? 1 : 0,
              visibility: showSocialMenu ? 'visible' : 'hidden',
              transform: showSocialMenu ? 'translateY(0)' : 'translateY(10px)',
              transition: 'all 0.3s ease',
              pointerEvents: showSocialMenu ? 'auto' : 'none',
              zIndex: 100,
            }}
          >
            {/* Facebook */}
            <a
              href="https://www.facebook.com/uptrender"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: '#ffffff',
                border: '2px solid rgba(59,89,152,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#3b5998';
                e.currentTarget.style.transform = 'scale(1.15)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(59,89,152,0.4)';
                const svg = e.currentTarget.querySelector('svg');
                if (svg) svg.setAttribute('fill', '#ffffff');
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                const svg = e.currentTarget.querySelector('svg');
                if (svg) svg.setAttribute('fill', '#3b5998');
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#3b5998" style={{ transition: 'fill 0.3s ease' }}>
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/uptrender.in/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: '#ffffff',
                border: '2px solid rgba(225,48,108,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)';
                e.currentTarget.style.transform = 'scale(1.15)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(225,48,108,0.4)';
                const svg = e.currentTarget.querySelector('svg');
                if (svg) svg.setAttribute('stroke', '#ffffff');
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                const svg = e.currentTarget.querySelector('svg');
                if (svg) svg.setAttribute('stroke', '#e1306c');
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e1306c" strokeWidth="2" style={{ transition: 'stroke 0.3s ease' }}>
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>

            {/* Telegram */}
            <a
              href="https://t.me/uptrender1"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: '#ffffff',
                border: '2px solid rgba(0,136,204,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#0088cc';
                e.currentTarget.style.transform = 'scale(1.15)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,136,204,0.4)';
                const svg = e.currentTarget.querySelector('svg');
                if (svg) svg.setAttribute('fill', '#ffffff');
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                const svg = e.currentTarget.querySelector('svg');
                if (svg) svg.setAttribute('fill', '#0088cc');
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#0088cc" style={{ transition: 'fill 0.3s ease' }}>
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </a>
          </div>
        </div>
        
        <button 
          className="floating-btn"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <line x1="23" y1="9" x2="17" y2="15"></line>
              <line x1="17" y1="9" x2="23" y2="15"></line>
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
