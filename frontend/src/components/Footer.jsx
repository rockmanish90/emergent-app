import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="site-footer" style={{
      background: 'linear-gradient(180deg, #0A192F 0%, #050d1a 100%)',
      padding: '40px 24px',
      borderTop: '1px solid rgba(212, 175, 55, 0.15)',
      position: 'relative',
      zIndex: 2
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '24px'
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
        
        <div className="footer-links" style={{
          display: 'flex',
          gap: '24px',
          flexWrap: 'wrap'
        }}>
          {[
            { text: 'Home', path: '/' },
            { text: 'About Us', path: '/about' },
            { text: 'Blog', path: '/blog' },
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
  );
};

export default Footer;
