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
            We Are The Bridge Between<br />"Rich" and "Wealthy."
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
            Most business owners spend their lives climbing a mountain,<br />only to realize there was a higher peak they couldn't see.
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section style={{
        background: '#FFFFFF',
        padding: '140px 80px',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1100px', width: '100%' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
            maxWidth: '850px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '20px',
              color: '#374151',
              lineHeight: '1.85',
              fontWeight: '400',
              letterSpacing: '0.2px'
            }}>
              You have mastered the art of making a product. You have mastered the art of selling to customers. You have built a company that makes money.
            </p>
            
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '20px',
              color: '#374151',
              lineHeight: '1.85',
              fontWeight: '400',
              letterSpacing: '0.2px'
            }}>
              But you haven't mastered the art of selling your company to the world.
            </p>

            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '28px',
              color: '#D4AF37',
              lineHeight: '1.5',
              fontWeight: '600',
              letterSpacing: '-0.3px',
              marginTop: '20px'
            }}>
              That is why we exist.
            </p>
          </div>
        </div>
      </section>

      {/* Two Decades Section */}
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
            marginBottom: '48px',
            textAlign: 'center',
            lineHeight: '1.15',
            letterSpacing: '-0.8px'
          }}>
            Two Decades in the Trenches
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
              We are not new to this game. For over 20 years, we have been in the financial trenches. We have seen how money moves in India. We have seen how capital is structured. We have seen businesses rise, and we have seen them stumble because they didn't have the right guidance.
            </p>
            
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '18px',
              color: '#374151',
              lineHeight: '1.85',
              fontWeight: '400',
              letterSpacing: '0.2px'
            }}>
              We didn't start Rushabh Ventures to write reports. We started it to fix a broken system.
            </p>

            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '18px',
              color: '#374151',
              lineHeight: '1.85',
              fontWeight: '400',
              letterSpacing: '0.2px'
            }}>
              We saw too many incredible Indian companies staying "small" simply because they didn't know how to open the door to the Public Markets. They were scared of the compliance. They were intimidated by the bankers.
            </p>

            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '24px',
              color: '#D4AF37',
              lineHeight: '1.5',
              fontWeight: '600',
              letterSpacing: '-0.3px',
              textAlign: 'center',
              marginTop: '20px'
            }}>
              We decided to be the ones who kick that door open for you.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUs;
