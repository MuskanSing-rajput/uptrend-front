"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center nav-menu">
            <Link href="/" className="nav-link" style={{ color: pathname === "/" ? "#00f0ff" : undefined }}>Home</Link>
            <Link href="/about" className="nav-link" style={{ color: pathname === "/about" ? "#00f0ff" : undefined }}>About Us</Link>
            <Link href="/services" className="nav-link" style={{ color: pathname === "/services" ? "#00f0ff" : undefined }}>Services</Link>
            <Link href="/#pricing" className="nav-link">Pricing</Link>
            <Link href="/#features" className="nav-link">Features</Link>
            <Link href="/blog" className="nav-link" style={{ color: pathname === "/blog" ? "#00f0ff" : undefined }}>Blog</Link>
            <Link href="/contact" className="nav-link" style={{ color: pathname === "/contact" ? "#00f0ff" : undefined }}>Contact Us</Link>
          </nav>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Right Actions - Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <a href="https://app.uptrender.in/auth/register" className="btn-primary">Trade Now</a>
            <a href="https://app.uptrender.in/auth/login" className="nav-link">Login</a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              zIndex: 1001
            }}
            aria-label="Toggle menu"
          >
            <span style={{
              width: '24px',
              height: '2px',
              background: '#ffffff',
              transition: 'all 0.3s ease',
              transform: mobileMenuOpen ? 'rotate(45deg) translateY(6px)' : 'none'
            }} />
            <span style={{
              width: '24px',
              height: '2px',
              background: '#ffffff',
              transition: 'all 0.3s ease',
              opacity: mobileMenuOpen ? 0 : 1
            }} />
            <span style={{
              width: '24px',
              height: '2px',
              background: '#ffffff',
              transition: 'all 0.3s ease',
              transform: mobileMenuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none'
            }} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.95)',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px 20px 20px',
            animation: 'fadeIn 0.3s ease'
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <nav style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            width: '100%',
            maxWidth: '400px'
          }}>
            <Link href="/" className="nav-link" style={{ 
              color: pathname === "/" ? "#13b1ac" : "#ffffff",
              fontSize: '20px',
              padding: '12px 0',
              textAlign: 'center',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}>Home</Link>
            <Link href="/about" className="nav-link" style={{ 
              color: pathname === "/about" ? "#13b1ac" : "#ffffff",
              fontSize: '20px',
              padding: '12px 0',
              textAlign: 'center',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}>About Us</Link>
            <Link href="/services" className="nav-link" style={{ 
              color: pathname === "/services" ? "#13b1ac" : "#ffffff",
              fontSize: '20px',
              padding: '12px 0',
              textAlign: 'center',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}>Services</Link>
            <Link href="/#pricing" className="nav-link" style={{ 
              color: "#ffffff",
              fontSize: '20px',
              padding: '12px 0',
              textAlign: 'center',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}>Pricing</Link>
            <Link href="/#features" className="nav-link" style={{ 
              color: "#ffffff",
              fontSize: '20px',
              padding: '12px 0',
              textAlign: 'center',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}>Features</Link>
            <Link href="/blog" className="nav-link" style={{ 
              color: pathname === "/blog" ? "#13b1ac" : "#ffffff",
              fontSize: '20px',
              padding: '12px 0',
              textAlign: 'center',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}>Blog</Link>
            <Link href="/contact" className="nav-link" style={{ 
              color: pathname === "/contact" ? "#13b1ac" : "#ffffff",
              fontSize: '20px',
              padding: '12px 0',
              textAlign: 'center',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}>Contact Us</Link>
            
            {/* Mobile Buttons */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '16px', 
              marginTop: '32px' 
            }}>
              <a href="https://app.uptrender.in/auth/register" className="btn-primary" style={{
                textAlign: 'center',
                padding: '16px 32px',
                fontSize: '18px'
              }}>Trade Now</a>
              <a href="https://app.uptrender.in/auth/login" className="nav-link" style={{
                textAlign: 'center',
                padding: '16px 32px',
                fontSize: '18px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px'
              }}>Login</a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
