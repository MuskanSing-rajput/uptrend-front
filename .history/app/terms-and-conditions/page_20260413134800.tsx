export default function TermsAndConditions() {
  const terms = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing or using Uptrender, you agree to abide by these terms and conditions. If you do not agree, please refrain from using the platform."
    },
    {
      title: "2. Eligibility",
      content: "You must be of legal age and have the legal capacity to enter into this agreement. If you are accessing Uptrender on behalf of a legal entity, you represent that you have the authority to bind that entity."
    },
    {
      title: "3. Risk Disclosure",
      content: "Algorithmic trading involves financial risk. Past performance is not indicative of future results. Users acknowledge that trading decisions based on algorithms may lead to financial losses, and they are solely responsible for such risks."
    },
    {
      title: "4. Account Registration",
      content: "To use Uptrender, you must register an account. Provide accurate and current information. Maintain the confidentiality of your account credentials and notify us of any unauthorized access."
    },
    {
      title: "5. Trading Strategies",
      content: "Uptrender provides algorithmic trading tools for informational purposes. Users are responsible for designing, testing, and implementing their own trading strategies. Uptrender is not liable for the performance or outcomes of user-generated algorithms."
    },
    {
      title: "6. Financial Advice",
      content: "Uptrender does not provide financial advice. Users are encouraged to conduct independent research and, if necessary, seek professional advice before making trading decisions."
    },
    {
      title: "7. Market Risks",
      content: "Market conditions may change rapidly. Uptrender is not responsible for losses incurred due to market volatility, technical glitches, or unforeseen events affecting trading."
    },
    {
      title: "8. Platform Availability",
      content: "Uptrender strives to maintain uninterrupted platform access but does not guarantee continuous availability. Maintenance, updates, and unforeseen technical issues may temporarily disrupt service."
    },
    {
      title: "9. Data Accuracy",
      content: "While Uptrender aims to provide accurate and timely data, it does not guarantee the accuracy, completeness, or reliability of any information displayed on the platform. Users should verify information independently."
    },
    {
      title: "10. Intellectual Property",
      content: "Uptrender and its content, including algorithms, logos, and trademarks, are protected by intellectual property laws. Users may not reproduce, distribute, or modify the platform's content without explicit permission from Uptrender."
    }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Header */}
      <header style={{ 
        background: '#0f172a', 
        padding: '20px 60px',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="/" style={{ fontSize: '28px', fontWeight: 700, color: '#00f0ff', textDecoration: 'none' }}>
            uptrender
          </a>
          <a href="/" style={{ 
            color: '#fff', 
            textDecoration: 'none', 
            fontSize: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
            Back to Home
          </a>
        </div>
      </header>

      {/* Content */}
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '80px 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ 
            fontSize: '42px', 
            fontWeight: 700, 
            color: '#0f172a',
            marginBottom: '16px'
          }}>
            Terms and Conditions
          </h1>
          <p style={{ 
            fontSize: '18px', 
            color: '#64748b'
          }}>
            for Uptrender Algorithmic Trading Platform
          </p>
        </div>

        <div style={{ 
          background: '#ffffff', 
          borderRadius: '16px', 
          padding: '48px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
        }}>
          <p style={{ fontSize: '16px', lineHeight: 1.8, color: '#374151', marginBottom: '32px' }}>
            Welcome to Uptrender! Before you proceed, please carefully read and understand the following terms and conditions that govern your use of our algorithmic trading platform.
          </p>

          {terms.map((term, index) => (
            <div key={index} style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
                {term.title}
              </h2>
              <p style={{ fontSize: '16px', lineHeight: 1.8, color: '#374151' }}>
                {term.content}
              </p>
            </div>
          ))}

          <div style={{ 
            borderTop: '1px solid #e5e7eb', 
            paddingTop: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <a href="/privacy-policy" style={{ 
              color: '#0f172a', 
              textDecoration: 'none', 
              fontSize: '16px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="19" y1="12" x2="5" y2="12"/>
                <polyline points="12 19 5 12 12 5"/>
              </svg>
              Privacy Policy
            </a>
            <a href="/refund-policy" style={{ 
              color: '#0f172a', 
              textDecoration: 'none', 
              fontSize: '16px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              Refund Policy 
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          </div>
        </div>

        <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '14px', marginTop: '40px' }}>
          © 2026 Uptrender. All rights reserved.
        </p>
      </main>
    </div>
  );
}
