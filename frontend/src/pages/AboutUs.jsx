import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="about-page" style={{ fontFamily: "'Inter', sans-serif", position: 'relative' }}>
      {/* Subtle grain texture overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        opacity: 0.03,
        pointerEvents: 'none',
        zIndex: 1
      }} />

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="hero-section" style={{
        background: 'linear-gradient(180deg, #0A192F 0%, #050d1a 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '100px'
      }}>
        <div style={{
          maxWidth: '1100px',
          width: '100%',
          padding: '0 80px',
          position: 'relative',
          zIndex: 2,
          textAlign: 'center'
        }}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(44px, 5.5vw, 72px)',
            fontWeight: '700',
            color: '#D4AF37',
            lineHeight: '1.05',
            marginBottom: '36px',
            letterSpacing: '-1.2px'
          }}>
            We Don't Just Consult.<br />We Create Market Legends.
          </h1>
          
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(17px, 1.8vw, 20px)',
            color: 'rgba(229, 231, 235, 0.9)',
            lineHeight: '1.7',
            marginBottom: '48px',
            fontWeight: '300',
            letterSpacing: '0.3px',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            Rushabh Ventures is a boutique IPO advisory firm that transforms successful<br />
            private businesses into public market powerhouses.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section style={{
        background: '#FFFFFF',
        padding: '140px 80px',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1100px', width: '100%' }}>
          <div style={{
            width: '60px',
            height: '2px',
            background: '#D4AF37',
            margin: '0 auto 50px'
          }} />
          
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(34px, 4.5vw, 52px)',
            fontWeight: '700',
            color: '#111111',
            marginBottom: '48px',
            textAlign: 'center',
            lineHeight: '1.15',
            letterSpacing: '-0.8px'
          }}>
            Our Story
          </h2>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
            maxWidth: '850px',
            margin: '0 auto'
          }}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '18px',
              color: '#374151',
              lineHeight: '1.85',
              fontWeight: '400',
              letterSpacing: '0.2px'
            }}>
              Founded with a singular mission: to help India's most promising private companies unlock their true value through strategic public market entry. We are not a traditional consultancy that hands you a thick report and walks away.
            </p>
            
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '18px',
              color: '#374151',
              lineHeight: '1.85',
              fontWeight: '400',
              letterSpacing: '0.2px'
            }}>
              We are architects of market success. When we take on a client, we commit to engineering a market response that is historic. Our track record speaks for itself—companies we've guided have achieved subscription rates that industry veterans call "unprecedented."
            </p>

            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '18px',
              color: '#374151',
              lineHeight: '1.85',
              fontWeight: '400',
              letterSpacing: '0.2px'
            }}>
              We work exclusively with SME companies with annual turnovers between ₹50 Cr and ₹200 Cr—businesses that have proven their model, demonstrated consistent profitability, and are ready to scale through public capital.
            </p>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section style={{
        background: '#F9FAFB',
        padding: '140px 80px',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{ maxWidth: '1100px', width: '100%' }}>
          <div style={{
            width: '60px',
            height: '2px',
            background: '#D4AF37',
            margin: '0 auto 50px'
          }} />
          
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(34px, 4.5vw, 52px)',
            fontWeight: '700',
            color: '#111111',
            marginBottom: '70px',
            textAlign: 'center',
            lineHeight: '1.15',
            letterSpacing: '-0.8px'
          }}>
            Our Approach
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '50px'
          }}>
            {[
              {
                title: 'Deep Due Diligence',
                description: 'We don\'t take everyone. We conduct rigorous analysis to ensure your business has the fundamentals for public market success.'
              },
              {
                title: 'Strategic Positioning',
                description: 'We craft your narrative for institutional investors, highlighting unique value propositions that command premium valuations.'
              },
              {
                title: 'Flawless Execution',
                description: 'From documentation to roadshows, we manage every detail with precision, leaving nothing to chance.'
              }
            ].map((item, index) => (
              <div key={index} style={{
                padding: '40px',
                background: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(212, 175, 55, 0.2)',
                transition: 'all 0.3s ease'
              }}>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '28px',
                  fontWeight: '600',
                  color: '#D4AF37',
                  marginBottom: '20px',
                  letterSpacing: '-0.3px'
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '16px',
                  color: '#374151',
                  lineHeight: '1.7',
                  fontWeight: '400',
                  letterSpacing: '0.2px'
                }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUs;
