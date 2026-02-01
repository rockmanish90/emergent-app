import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleApplyNow = () => {
    // Navigate to home page
    navigate('/');
    // Wait for navigation to complete, then scroll to form
    setTimeout(() => {
      const formElement = document.getElementById('application-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
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
      {/* Logo */}
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
          cursor: 'pointer'
        }}
        onClick={() => navigate('/')}
      >
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

      {/* CTA Button */}
      <button 
        onClick={handleApplyNow}
        style={{
          background: 'transparent',
          color: '#D4AF37',
          border: '1px solid #D4AF37',
          padding: '12px 32px',
          fontSize: '13px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          fontFamily: "'Inter', sans-serif"
        }}
        onMouseEnter={(e) => {
          e.target.style.background = '#D4AF37';
          e.target.style.color = '#000000';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'transparent';
          e.target.style.color = '#D4AF37';
        }}
      >
        Apply Now
      </button>
    </nav>
  );
};

export default Header;
