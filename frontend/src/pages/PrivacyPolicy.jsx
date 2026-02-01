import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="privacy-page" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'rgba(10, 25, 47, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(212, 175, 55, 0.15)',
        zIndex: 100,
        padding: '24px 80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '24px',
            fontWeight: '700',
            color: '#D4AF37',
            margin: 0,
            letterSpacing: '1px'
          }}>
            RUSHABH
          </h1>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '11px',
            fontWeight: '400',
            color: '#9CA3AF',
            letterSpacing: '2px',
            textTransform: 'uppercase'
          }}>
            Ventures
          </span>
        </div>
      </nav>

      {/* Content */}
      <section style={{
        background: '#FFFFFF',
        minHeight: '100vh',
        padding: '180px 80px 100px',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{ maxWidth: '900px', width: '100%' }}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(36px, 4.5vw, 52px)',
            fontWeight: '700',
            color: '#111111',
            marginBottom: '20px',
            lineHeight: '1.15',
            letterSpacing: '-0.8px'
          }}>
            Privacy Policy
          </h1>
          
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '14px',
            color: '#9CA3AF',
            marginBottom: '60px',
            fontWeight: '400'
          }}>
            Last Updated: January 31, 2025
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '28px',
                fontWeight: '600',
                color: '#D4AF37',
                marginBottom: '20px',
                letterSpacing: '-0.3px'
              }}>
                1. Information We Collect
              </h2>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '16px',
                color: '#374151',
                lineHeight: '1.8',
                fontWeight: '400',
                letterSpacing: '0.2px'
              }}>
                We collect information that you provide directly to us when you apply for our IPO advisory services, including but not limited to: your name, company name, contact information, financial data, and business performance metrics. We also automatically collect certain information about your device when you visit our website, including IP address, browser type, and pages visited.
              </p>
            </div>

            <div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '28px',
                fontWeight: '600',
                color: '#D4AF37',
                marginBottom: '20px',
                letterSpacing: '-0.3px'
              }}>
                2. How We Use Your Information
              </h2>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '16px',
                color: '#374151',
                lineHeight: '1.8',
                fontWeight: '400',
                letterSpacing: '0.2px',
                marginBottom: '15px'
              }}>
                We use the information we collect to:
              </p>
              <ul style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '16px',
                color: '#374151',
                lineHeight: '1.8',
                fontWeight: '400',
                letterSpacing: '0.2px',
                paddingLeft: '25px'
              }}>
                <li style={{ marginBottom: '10px' }}>Evaluate your eligibility for our IPO advisory services</li>
                <li style={{ marginBottom: '10px' }}>Communicate with you about our services</li>
                <li style={{ marginBottom: '10px' }}>Improve our website and services</li>
                <li style={{ marginBottom: '10px' }}>Comply with legal obligations and regulatory requirements</li>
              </ul>
            </div>

            <div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '28px',
                fontWeight: '600',
                color: '#D4AF37',
                marginBottom: '20px',
                letterSpacing: '-0.3px'
              }}>
                3. Information Sharing and Disclosure
              </h2>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '16px',
                color: '#374151',
                lineHeight: '1.8',
                fontWeight: '400',
                letterSpacing: '0.2px'
              }}>
                We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted partners who assist us in operating our business, provided they agree to keep this information confidential. We may also disclose your information when required by law or to protect our rights and safety.
              </p>
            </div>

            <div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '28px',
                fontWeight: '600',
                color: '#D4AF37',
                marginBottom: '20px',
                letterSpacing: '-0.3px'
              }}>
                4. Data Security
              </h2>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '16px',
                color: '#374151',
                lineHeight: '1.8',
                fontWeight: '400',
                letterSpacing: '0.2px'
              }}>
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '28px',
                fontWeight: '600',
                color: '#D4AF37',
                marginBottom: '20px',
                letterSpacing: '-0.3px'
              }}>
                5. Your Rights
              </h2>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '16px',
                color: '#374151',
                lineHeight: '1.8',
                fontWeight: '400',
                letterSpacing: '0.2px'
              }}>
                You have the right to access, correct, or delete your personal information. You may also object to or restrict certain processing of your data. To exercise these rights, please contact us at privacy@rushabhventures.com.
              </p>
            </div>

            <div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '28px',
                fontWeight: '600',
                color: '#D4AF37',
                marginBottom: '20px',
                letterSpacing: '-0.3px'
              }}>
                6. Cookies and Tracking Technologies
              </h2>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '16px',
                color: '#374151',
                lineHeight: '1.8',
                fontWeight: '400',
                letterSpacing: '0.2px'
              }}>
                We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookies through your browser settings, but disabling them may affect your ability to use certain features of our site.
              </p>
            </div>

            <div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '28px',
                fontWeight: '600',
                color: '#D4AF37',
                marginBottom: '20px',
                letterSpacing: '-0.3px'
              }}>
                7. Changes to This Privacy Policy
              </h2>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '16px',
                color: '#374151',
                lineHeight: '1.8',
                fontWeight: '400',
                letterSpacing: '0.2px'
              }}>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
              </p>
            </div>

            <div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '28px',
                fontWeight: '600',
                color: '#D4AF37',
                marginBottom: '20px',
                letterSpacing: '-0.3px'
              }}>
                8. Contact Us
              </h2>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '16px',
                color: '#374151',
                lineHeight: '1.8',
                fontWeight: '400',
                letterSpacing: '0.2px'
              }}>
                If you have any questions about this Privacy Policy, please contact us at:<br /><br />
                Email: privacy@rushabhventures.com<br />
                Phone: +91 (022) 1234 5678<br />
                Address: Nariman Point, Mumbai, Maharashtra 400021
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: 'linear-gradient(180deg, #0A192F 0%, #050d1a 100%)',
        padding: '60px 80px',
        borderTop: '1px solid rgba(212, 175, 55, 0.15)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '30px'
        }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            color: '#9CA3AF',
            fontWeight: '300',
            letterSpacing: '0.5px'
          }}>
            © 2025 Rushabh Ventures. We Create Market Legends.
          </p>
          
          <div style={{ display: 'flex', gap: '40px' }}>
            {[
              { text: 'Home', path: '/' },
              { text: 'About Us', path: '/about' },
              { text: 'Contact Us', path: '/contact' },
              { text: 'Privacy Policy', path: '/privacy' },
              { text: 'Terms & Conditions', path: '/terms' }
            ].map((link, index) => (
              <a
                key={index}
                onClick={() => navigate(link.path)}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '12px',
                  color: '#9CA3AF',
                  textDecoration: 'none',
                  fontWeight: '400',
                  letterSpacing: '0.5px',
                  transition: 'color 0.3s ease',
                  textTransform: 'uppercase',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.target.style.color = '#D4AF37'}
                onMouseLeave={(e) => e.target.style.color = '#9CA3AF'}
              >
                {link.text}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
