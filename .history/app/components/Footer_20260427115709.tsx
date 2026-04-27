"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: '#0a0a0a', color: '#9ca3af', position: 'relative', zIndex: 12, borderTop: '2px solid rgba(0, 240, 255, 0.3)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 60px 60px' }}>
        {/* Risk Disclaimer */}
        <div style={{ marginBottom: '48px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', color: '#ffffff' }}>Risk Disclaimer</h3>
          <p style={{ fontSize: '14px', lineHeight: 1.8, color: '#9ca3af' }}>
            Trading in financial markets involves substantial risk and may not be suitable for all investors. Past performance is not indicative of future results. Algorithmic trading carries additional risks including system failures, connectivity issues, and unexpected market conditions. The use of AI and automated trading systems does not guarantee profits. You should carefully consider your financial situation and risk tolerance before engaging in trading activities. Uptrender provides technology solutions only and does not provide investment advice. Please consult with a qualified financial advisor before making any investment decisions.
          </p>
        </div>

        {/* Quick Links Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '60px', marginBottom: '48px', paddingTop: '48px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          {/* Column 1 - Company */}
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px', color: '#ffffff' }}>Company</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { name: 'About', href: '/about' },
                { name: 'Services', href: '/services' },
                { name: 'Blog', href: '/blog' },
                { name: 'Contact', href: '/contact' }
              ].map((item, i) => (
                <li key={i} style={{ marginBottom: '12px' }}>
                  <Link href={item.href} style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s', display: 'inline-block' }}
                     onMouseEnter={(e) => e.currentTarget.style.color = '#00f0ff'}
                     onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 - Social Media */}
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px', color: '#ffffff' }}>Social Media</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '12px' }}>
                <a href="https://www.facebook.com/uptrender" target="_blank" rel="noopener noreferrer" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px', transition: 'color 0.2s' }}
                   onMouseEnter={(e) => e.currentTarget.style.color = '#00f0ff'}
                   onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </a>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <a href="https://www.instagram.com/uptrender.in/" target="_blank" rel="noopener noreferrer" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px', transition: 'color 0.2s' }}
                   onMouseEnter={(e) => e.currentTarget.style.color = '#00f0ff'}
                   onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                  Instagram
                </a>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <a href="https://t.me/uptrender1" target="_blank" rel="noopener noreferrer" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px', transition: 'color 0.2s' }}
                   onMouseEnter={(e) => e.currentTarget.style.color = '#00f0ff'}
                   onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                  Telegram
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Legal & Press */}
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px', color: '#ffffff' }}>Legal & Press</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { name: 'Privacy Policy', href: '/privacy-policy' },
                { name: 'Terms & Conditions', href: '/terms-and-conditions' },
                { name: 'Refund Policy', href: '/refund-policy' }
              ].map((item, i) => (
                <li key={i} style={{ marginBottom: '12px' }}>
                  <Link href={item.href} style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s', display: 'inline-block' }}
                     onMouseEnter={(e) => e.currentTarget.style.color = '#00f0ff'}
                     onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Resources */}
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px', color: '#ffffff' }}>Resources</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { name: 'Partners', href: '/partnership' },
                { name: 'White Label', href: '/white-label' },
                { name: 'FAQ', href: '/faq' }
              ].map((item, i) => (
                <li key={i} style={{ marginBottom: '12px' }}>
                  <Link href={item.href} style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s', display: 'inline-block' }}
                     onMouseEnter={(e) => e.currentTarget.style.color = '#00f0ff'}
                     onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '30px', textAlign: 'center' }}>
          <p style={{ fontSize: '13px', color: '#6b7280' }}>
            © 2026 Quantech Trends. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
