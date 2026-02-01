import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TermsConditions = () => {
  const navigate = useNavigate();

  return (
    <div className="terms-page" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <Header />

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
            Terms & Conditions
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
                1. Acceptance of Terms
              </h2>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '16px',
                color: '#374151',
                lineHeight: '1.8',
                fontWeight: '400',
                letterSpacing: '0.2px'
              }}>
                By accessing and using the Rushabh Ventures website and services, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website or services.
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
                2. Services Description
              </h2>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '16px',
                color: '#374151',
                lineHeight: '1.8',
                fontWeight: '400',
                letterSpacing: '0.2px'
              }}>
                Rushabh Ventures provides IPO advisory and consultancy services to eligible SME companies. Our services include strategic planning, documentation assistance, investor relations, and regulatory compliance support. The specific scope of services will be detailed in a separate engagement agreement.
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
                3. Eligibility Criteria
              </h2>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '16px',
                color: '#374151',
                lineHeight: '1.8',
                fontWeight: '400',
                letterSpacing: '0.2px'
              }}>
                Our services are available to companies meeting specific criteria, including but not limited to: annual turnover between ₹50 Crores and ₹200 Crores, net profit margins above 10%, and consistent year-on-year growth. We reserve the right to accept or decline any application at our sole discretion.
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
                4. Client Obligations
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
                Clients agree to:
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
                <li style={{ marginBottom: '10px' }}>Provide accurate and complete information</li>
                <li style={{ marginBottom: '10px' }}>Cooperate fully with our advisory team</li>
                <li style={{ marginBottom: '10px' }}>Comply with all applicable securities laws and regulations</li>
                <li style={{ marginBottom: '10px' }}>Pay all fees as agreed in the engagement agreement</li>
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
                5. Fees and Payment
              </h2>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '16px',
                color: '#374151',
                lineHeight: '1.8',
                fontWeight: '400',
                letterSpacing: '0.2px'
              }}>
                Fee structure and payment terms will be detailed in a separate engagement agreement. All fees are exclusive of applicable taxes. Payment terms must be adhered to as specified in the agreement. Late payments may result in suspension of services.
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
                6. Confidentiality
              </h2>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '16px',
                color: '#374151',
                lineHeight: '1.8',
                fontWeight: '400',
                letterSpacing: '0.2px'
              }}>
                Both parties agree to maintain strict confidentiality regarding all proprietary and sensitive information shared during the engagement. This obligation survives the termination of the engagement agreement.
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
                7. Limitation of Liability
              </h2>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '16px',
                color: '#374151',
                lineHeight: '1.8',
                fontWeight: '400',
                letterSpacing: '0.2px'
              }}>
                While we strive to provide the highest quality advisory services, we cannot guarantee specific outcomes regarding IPO success or subscription rates. Our liability is limited to the fees paid for our services. We are not liable for any indirect, incidental, or consequential damages.
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
                8. Intellectual Property
              </h2>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '16px',
                color: '#374151',
                lineHeight: '1.8',
                fontWeight: '400',
                letterSpacing: '0.2px'
              }}>
                All content, materials, and intellectual property on this website and in our advisory materials remain the exclusive property of Rushabh Ventures. Unauthorized use, reproduction, or distribution is strictly prohibited.
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
                9. Termination
              </h2>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '16px',
                color: '#374151',
                lineHeight: '1.8',
                fontWeight: '400',
                letterSpacing: '0.2px'
              }}>
                Either party may terminate the engagement as specified in the engagement agreement. Upon termination, the client remains obligated to pay for services rendered up to the termination date.
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
                10. Governing Law
              </h2>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '16px',
                color: '#374151',
                lineHeight: '1.8',
                fontWeight: '400',
                letterSpacing: '0.2px'
              }}>
                These Terms and Conditions are governed by the laws of India. Any disputes arising from these terms or our services shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.
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
                11. Changes to Terms
              </h2>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '16px',
                color: '#374151',
                lineHeight: '1.8',
                fontWeight: '400',
                letterSpacing: '0.2px'
              }}>
                We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services constitutes acceptance of the modified terms.
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
                12. Contact Information
              </h2>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '16px',
                color: '#374151',
                lineHeight: '1.8',
                fontWeight: '400',
                letterSpacing: '0.2px'
              }}>
                For questions regarding these Terms and Conditions, please contact us at:<br /><br />
                Email: legal@rushabhventures.com<br />
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

export default TermsConditions;
