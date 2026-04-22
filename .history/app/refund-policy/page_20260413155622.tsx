export default function RefundPolicy() {
  const policies = [
    {
      title: "No Refunds",
      content: "uptrender does not offer refunds for any of its services, including but not limited to subscription fees, access to premium features, or any other products offered on the platform."
    },
    {
      title: "Service Satisfaction",
      content: "Users are encouraged to carefully evaluate our platform and services before making any purchases. uptrender provides extensive information and resources to help users make informed decisions."
    },
    {
      title: "Subscription Cancellation",
      content: "Users have the option to cancel their subscription at any time, and the cancellation will take effect at the end of the current billing period. No refunds will be issued for the remaining days of the subscription period."
    },
    {
      title: "Platform Changes",
      content: "uptrender reserves the right to modify, suspend, or discontinue any aspect of the platform, including services and features, without notice. Such changes will not entitle users to a refund."
    },
    {
      title: "Technical Issues",
      content: "In the event of technical issues or interruptions in service, uptrender will make reasonable efforts to restore services promptly. However, no refunds will be provided for downtime or technical difficulties."
    },
    {
      title: "Contact and Support",
      content: "If users encounter issues or have questions about the platform, they are encouraged to contact our customer support team at support@uptrender.tech. Our team is dedicated to assisting users and addressing concerns promptly."
    },
    {
      title: "Policy Changes",
      content: "uptrender reserves the right to update or modify this refund policy at any time without prior notice. Users are responsible for regularly reviewing the policy for any changes."
    }
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #0a0a0a 0%, #0a1540 40%, #0a0a0a 100%)' }}>
      {/* Header */}
      <header style={{ 
        background: 'rgba(10, 10, 10, 0.9)', 
        backdropFilter: 'blur(12px)',
        padding: '20px 60px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="/" style={{ fontSize: '28px', fontWeight: 700, textDecoration: 'none' }}>
            <span style={{ color: '#ffffff' }}>up</span><span style={{ color: '#00f0ff' }}>trender</span>
          </a>
          <a href="/" style={{ 
            color: 'rgba(255, 255, 255, 0.7)', 
            textDecoration: 'none', 
            fontSize: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'color 0.3s'
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
      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ 
            fontSize: '38px', 
            fontWeight: 700, 
            color: '#ffffff',
            marginBottom: '16px'
          }}>
            Refund Policy<span style={{ color: '#00f0ff' }}>.</span>
          </h1>
          <p style={{ 
            fontSize: '18px', 
            color: 'rgba(255, 255, 255, 0.5)'
          }}>
            for Uptrender
          </p>
        </div>

        <div style={{ 
          background: 'rgba(10, 15, 30, 0.6)', 
          borderRadius: '16px', 
          padding: '56px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}>
          <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'rgba(255, 255, 255, 0.7)', marginBottom: '32px' }}>
            At uptrender, we operate with a commitment to providing valuable services to our users. As of January 2024, we would like to inform our users that uptrender does not have a refund policy in place.
          </p>

          {policies.map((policy, index) => (
            <div key={index} style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', marginBottom: '12px' }}>
                {policy.title}
              </h2>
              <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'rgba(255, 255, 255, 0.7)' }}>
                {policy.content}
              </p>
            </div>
          ))}

          <div style={{ 
            background: 'rgba(0, 240, 255, 0.05)', 
            borderRadius: '12px', 
            padding: '24px',
            marginTop: '32px',
            marginBottom: '32px',
            border: '1px solid rgba(0, 240, 255, 0.15)'
          }}>
            <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(255, 255, 255, 0.6)', margin: 0 }}>
              By using uptrender services, users acknowledge and agree to this refund policy. If you do not agree with this policy, we recommend refraining from using our platform and services. Your understanding and cooperation are appreciated.
            </p>
          </div>

          <div style={{ 
            borderTop: '1px solid rgba(255, 255, 255, 0.1)', 
            paddingTop: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <a href="/privacy-policy" style={{ 
              color: '#00f0ff', 
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
            <a href="/terms-and-conditions" style={{ 
              color: '#00f0ff', 
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
              Terms & Conditions
            </a>
          </div>
        </div>

        <p style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.3)', fontSize: '14px', marginTop: '40px' }}>
          © 2026 Uptrender. All rights reserved.
        </p>
      </main>
    </div>
  );
}
