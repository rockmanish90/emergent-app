import React from 'react';
import { useNavigate } from 'react-router-dom';

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section style={{
      background: 'linear-gradient(135deg, #D4AF37 0%, #C5A028 100%)',
      padding: '80px 80px',
      textAlign: 'center'
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(32px, 4vw, 48px)',
          fontWeight: '700',
          color: '#000000',
          marginBottom: '24px',
          letterSpacing: '-0.8px',
          lineHeight: '1.2'
        }}>
          Ready to Take Your Company Public?
        </h3>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '18px',
          color: 'rgba(0, 0, 0, 0.8)',
          marginBottom: '40px',
          lineHeight: '1.7',
          maxWidth: '700px',
          margin: '0 auto 40px'
        }}>
          Schedule a consultation with our IPO experts to discuss your company's journey to the public markets.
        </p>
        <button
          onClick={() => navigate('/contact')}
          style={{
            background: '#000000',
            color: '#FFFFFF',
            border: 'none',
            padding: '20px 48px',
            fontSize: '14px',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            fontFamily: "'Inter', sans-serif",
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#1a1a1a';
            e.target.style.transform = 'translateY(-3px)';
            e.target.style.boxShadow = '0 8px 28px rgba(0, 0, 0, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = '#000000';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
          }}
        >
          Get In Touch
        </button>
      </div>
    </section>
  );
};

export default CTASection;
