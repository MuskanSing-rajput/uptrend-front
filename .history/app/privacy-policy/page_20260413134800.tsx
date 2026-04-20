export default function PrivacyPolicy() {
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
            Privacy Policy
          </h1>
          <p style={{ 
            fontSize: '20px', 
            color: '#64748b',
            fontStyle: 'italic'
          }}>
            We are committed to your privacy
          </p>
        </div>

        <div style={{ 
          background: '#ffffff', 
          borderRadius: '16px', 
          padding: '48px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
        }}>
          <p style={{ fontSize: '16px', lineHeight: 1.8, color: '#374151', marginBottom: '32px' }}>
            The confidentiality and security of information we collect about consumers and customers is something The uptrender is committed to protecting. Non public information ("Information") about you will not be shared with third parties without your consent. The exceptions being the specific purposes below. This notice describes the information we may gather and the circumstances under which we may share it.
          </p>

          <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a', marginBottom: '16px', marginTop: '40px' }}>
            This is how our information is gathered
          </h2>
          <p style={{ fontSize: '16px', lineHeight: 1.8, color: '#374151', marginBottom: '32px' }}>
            We get most of our Information directly from you. This happens when you apply for, access and use financial (and related) products and services offered by The uptrender. This personal information we collect may include your name, address, telephone number, email address. We also use web tools on our website to help us monitor traffic patterns to see how our users navigate through our site.
          </p>

          <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a', marginBottom: '16px', marginTop: '40px' }}>
            This is how we protect your information
          </h2>
          <p style={{ fontSize: '16px', lineHeight: 1.8, color: '#374151', marginBottom: '32px' }}>
            We maintain physical, electronic and procedural safeguards which are designed to comply with industry rules and regulations. To protect the confidentiality of Information and to comply with our established policies is something our employees are required to do. Information may be accessed by them only when there is an appropriate reason to do so, such as to administer our products or services. We also maintain physical, electronic and procedural safeguards to protect Information which complies with all applicable laws. Employees who violate this Privacy Policy are subject to disciplinary process.
          </p>

          <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a', marginBottom: '16px', marginTop: '40px' }}>
            Password-protection on a secure server
          </h2>
          <p style={{ fontSize: '16px', lineHeight: 1.8, color: '#374151', marginBottom: '32px' }}>
            Secure Sockets Layer (SSL) encryption is used on a secure server to better protect your information. Any interception by a third party is prevented when SSL encodes and decodes the transmission of personal information. Firewalls and other security technology are also used to protect our network and systems from external attack. In addition to our efforts, it is imperative that you protect your identity. Here are a few suggestions. When using the Internet, keep your security software current and turned on; protect your password information, shred personal documents, and check your credit report regularly. Bear in mind that The uptrender will never request by email or similar electronic means your account number or login password, so if you ever receive such a request via the Internet, it is not from us and you should not entertain the same.
          </p>

          <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a', marginBottom: '16px', marginTop: '40px' }}>
            Information disclosure
          </h2>
          <p style={{ fontSize: '16px', lineHeight: 1.8, color: '#374151', marginBottom: '48px' }}>
            It is our policy to never disclose any nonpublic information about our customers or former customers to anyone. We do not sell customer lists and we will never sell your name to a catalogue company.
          </p>

          <div style={{ 
            borderTop: '1px solid #e5e7eb', 
            paddingTop: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <a href="/terms-and-conditions" style={{ 
              color: '#0f172a', 
              textDecoration: 'none', 
              fontSize: '16px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              Terms & Conditions 
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
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
