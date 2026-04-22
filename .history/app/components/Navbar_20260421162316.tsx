"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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

  return (
    <header className={`navbar ${navVisible ? 'navbar-visible' : 'navbar-hidden'}`}>
      <div className="navbar-inner">
        {/* Logo */}
        <Link href="/" className="logo-wrap" style={{ textDecoration: "none" }}>
          <span className="logo-mark" aria-label="uptrender">
            <span className="logo-v">up</span>
            <span className="logo-t">trender</span>
            <span className="logo-dot"></span>
          </span>
          <span className="logo-text"></span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center nav-menu">
          <Link href="/" className="nav-link" style={{ color: "#00f0ff" }}>Home</Link>
          <Link href="/about" className="nav-link">About Us</Link>
          <Link href="/services" className="nav-link">Services</Link>
          <Link href="/#pricing" className="nav-link">Pricing</Link>
          <Link href="/#features" className="nav-link">Features</Link>
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
  );
}
