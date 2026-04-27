"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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

  // Reset mobile menu when page is restored from bfcache (back/forward navigation)
  useEffect(() => {
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        setMobileMenuOpen(false);
        document.body.classList.remove('mobile-menu-open');
      }
    };
    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }
    
    return () => {
      document.body.classList.remove('mobile-menu-open');
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className={`navbar ${navVisible ? 'navbar-visible' : 'navbar-hidden'}`}>
        <div className="navbar-inner" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          width: '100%',
          position: 'relative'
        }}>
          {/* Logo */}
          <Link href="/" className="logo-wrap" style={{ textDecoration: "none", zIndex: 1002 }}>
            <Image
              src="/Uptrender-white."
              alt="Uptrender"
              width={320}
              height={44}
              priority
              style={{ width: "clamp(170px,15vw,390px)", height: "80px", objectFit: "contain", display: "block" }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav style={{ 
            display: isMobile ? 'none' : 'flex', 
            alignItems: 'center',
            gap: '32px'
          }} className="nav-menu">
            <Link href="/" className="nav-link" style={{ color: pathname === "/" ? "#13b1ac" : undefined }}>Home</Link>
            <Link href="/about" className="nav-link" style={{ color: pathname === "/about" ? "#13b1ac" : undefined }}>About Us</Link>
            <Link href="/services" className="nav-link" style={{ color: pathname === "/services" ? "#13b1ac" : undefined }}>Services</Link>
            <Link href="/#pricing" className="nav-link">Pricing</Link>
            <Link href="/blog" className="nav-link" style={{ color: pathname === "/blog" ? "#13b1ac" : undefined }}>Blog</Link>
            <Link href="/contact" className="nav-link" style={{ color: pathname === "/contact" ? "#13b1ac" : undefined }}>Contact Us</Link>
          </nav>

          {/* Right Actions - Desktop */}
          <div style={{ 
            display: isMobile ? 'none' : 'flex', 
            alignItems: 'center', 
            gap: '24px' 
          }}>
            <a href="https://app.uptrender.in/auth/register" className="btn-primary">Trade Now</a>
            <a href="https://app.uptrender.in/auth/login" className="nav-link">Login</a>
          </div>

          {/* Mobile Menu Button */}
          {isMobile && (
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
                zIndex: 1001,
                position: 'relative'
              }}
              aria-label="Toggle menu"
            >
              <span style={{
                width: '28px',
                height: '3px',
                background: '#ffffff',
                borderRadius: '2px',
                transition: 'all 0.3s ease',
                transform: mobileMenuOpen ? 'rotate(45deg) translateY(8px)' : 'none'
              }} />
              <span style={{
                width: '28px',
                height: '3px',
                background: '#ffffff',
                borderRadius: '2px',
                transition: 'all 0.3s ease',
                opacity: mobileMenuOpen ? 0 : 1
              }} />
              <span style={{
                width: '28px',
                height: '3px',
                background: '#ffffff',
                borderRadius: '2px',
                transition: 'all 0.3s ease',
                transform: mobileMenuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none'
              }} />
            </button>
          )}
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && isMobile && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.98)',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px 20px 20px',
            animation: 'fadeIn 0.3s ease',
            overflowY: 'auto'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setMobileMenuOpen(false);
            }
          }}
        >
          <nav style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            width: '100%',
            maxWidth: '400px'
          }}>
            <Link 
              href="/" 
              onClick={() => setMobileMenuOpen(false)}
              style={{ 
                color: pathname === "/" ? "#13b1ac" : "#ffffff",
                fontSize: '20px',
                padding: '16px 0',
                textAlign: 'center',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                textDecoration: 'none',
                fontWeight: pathname === "/" ? '600' : '400',
                transition: 'all 0.2s ease'
              }}
            >Home</Link>
            
            <Link 
              href="/about" 
              onClick={() => setMobileMenuOpen(false)}
              style={{ 
                color: pathname === "/about" ? "#13b1ac" : "#ffffff",
                fontSize: '20px',
                padding: '16px 0',
                textAlign: 'center',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                textDecoration: 'none',
                fontWeight: pathname === "/about" ? '600' : '400',
                transition: 'all 0.2s ease'
              }}
            >About Us</Link>
            
            <Link 
              href="/services" 
              onClick={() => setMobileMenuOpen(false)}
              style={{ 
                color: pathname === "/services" ? "#13b1ac" : "#ffffff",
                fontSize: '20px',
                padding: '16px 0',
                textAlign: 'center',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                textDecoration: 'none',
                fontWeight: pathname === "/services" ? '600' : '400',
                transition: 'all 0.2s ease'
              }}
            >Services</Link>
            
            <Link 
              href="/#pricing" 
              onClick={() => setMobileMenuOpen(false)}
              style={{ 
                color: "#ffffff",
                fontSize: '20px',
                padding: '16px 0',
                textAlign: 'center',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
            >Pricing</Link>
            
            <Link 
              href="/blog" 
              onClick={() => setMobileMenuOpen(false)}
              style={{ 
                color: pathname === "/blog" ? "#13b1ac" : "#ffffff",
                fontSize: '20px',
                padding: '16px 0',
                textAlign: 'center',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                textDecoration: 'none',
                fontWeight: pathname === "/blog" ? '600' : '400',
                transition: 'all 0.2s ease'
              }}
            >Blog</Link>
            
            <Link 
              href="/contact" 
              onClick={() => setMobileMenuOpen(false)}
              style={{ 
                color: pathname === "/contact" ? "#13b1ac" : "#ffffff",
                fontSize: '20px',
                padding: '16px 0',
                textAlign: 'center',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                textDecoration: 'none',
                fontWeight: pathname === "/contact" ? '600' : '400',
                transition: 'all 0.2s ease'
              }}
            >Contact Us</Link>
            
            {/* Mobile Buttons */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '16px', 
              marginTop: '32px' 
            }}>
              <a 
                href="https://app.uptrender.in/auth/register" 
                className="btn-primary" 
                style={{
                  textAlign: 'center',
                  padding: '16px 32px',
                  fontSize: '18px',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #13b1ac, #0d8a86)',
                  color: '#ffffff',
                  fontWeight: '600'
                }}
              >Trade Now</a>
              
              <a 
                href="https://app.uptrender.in/auth/login" 
                style={{
                  textAlign: 'center',
                  padding: '16px 32px',
                  fontSize: '18px',
                  border: '2px solid #13b1ac',
                  borderRadius: '8px',
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontWeight: '600',
                  transition: 'all 0.2s ease'
                }}
              >Login</a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
