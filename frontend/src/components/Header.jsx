import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleApplyNow = () => {
    navigate('/');
    setTimeout(() => {
      const formElement = document.getElementById('application-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
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
      }} className="header-nav">
        {/* Logo */}
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            cursor: 'pointer'
          }}
          onClick={() => navigate('/')}
          data-testid="header-logo"
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

        {/* Desktop Navigation */}
        <div className="desktop-nav" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '48px'
        }}>
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              data-testid={`nav-link-${link.label.toLowerCase()}`}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: "'Inter', sans-serif",
                fontSize: '13px',
                fontWeight: isActive(link.path) ? '600' : '400',
                color: isActive(link.path) ? '#D4AF37' : 'rgba(229, 231, 235, 0.9)',
                cursor: 'pointer',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                transition: 'all 0.3s ease',
                position: 'relative',
                padding: '8px 0'
              }}
              onMouseEnter={(e) => {
                if (!isActive(link.path)) {
                  e.target.style.color = '#D4AF37';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(link.path)) {
                  e.target.style.color = 'rgba(229, 231, 235, 0.9)';
                }
              }}
            >
              {link.label}
              {isActive(link.path) && (
                <span style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: '#D4AF37'
                }} />
              )}
            </button>
          ))}
        </div>

        {/* Desktop CTA Button */}
        <button 
          onClick={handleApplyNow}
          className="desktop-cta-btn"
          data-testid="apply-now-btn"
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
            fontFamily: "'Inter', sans-serif",
            whiteSpace: 'nowrap'
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

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-testid="mobile-menu-btn"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: '#D4AF37',
            cursor: 'pointer',
            padding: '8px'
          }}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="mobile-menu-overlay"
          style={{
            position: 'fixed',
            top: '88px',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(10, 25, 47, 0.98)',
            zIndex: 99,
            display: 'flex',
            flexDirection: 'column',
            padding: '40px 30px',
            gap: '8px'
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => {
                navigate(link.path);
                setMobileMenuOpen(false);
              }}
              data-testid={`mobile-nav-${link.label.toLowerCase()}`}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: "'Inter', sans-serif",
                fontSize: '18px',
                fontWeight: isActive(link.path) ? '600' : '400',
                color: isActive(link.path) ? '#D4AF37' : 'rgba(229, 231, 235, 0.9)',
                cursor: 'pointer',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                textAlign: 'left',
                padding: '16px 0',
                borderBottom: '1px solid rgba(212, 175, 55, 0.15)'
              }}
            >
              {link.label}
            </button>
          ))}
          
          <button 
            onClick={handleApplyNow}
            data-testid="mobile-apply-now-btn"
            style={{
              background: '#D4AF37',
              color: '#000000',
              border: 'none',
              padding: '18px 32px',
              fontSize: '14px',
              fontWeight: '700',
              cursor: 'pointer',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              fontFamily: "'Inter', sans-serif",
              marginTop: '24px'
            }}
          >
            Apply Now
          </button>
        </div>
      )}

      {/* Responsive Styles */}
      <style>
        {`
          @media (max-width: 900px) {
            .header-nav {
              padding: 20px 30px !important;
            }
            .desktop-nav {
              display: none !important;
            }
            .desktop-cta-btn {
              display: none !important;
            }
            .mobile-menu-btn {
              display: block !important;
            }
          }
          
          @media (min-width: 901px) {
            .mobile-menu-overlay {
              display: none !important;
            }
          }
        `}
      </style>
    </>
  );
};

export default Header;
