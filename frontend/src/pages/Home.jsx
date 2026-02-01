import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { submitApplication } from '../utils/api';
import { toast } from 'sonner';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    annualTurnover: '',
    mobileNumber: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.companyName || !formData.annualTurnover || !formData.mobileNumber) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await submitApplication(formData);
      if (response.success) {
        toast.success(response.message);
        setFormData({
          name: '',
          companyName: '',
          annualTurnover: '',
          mobileNumber: ''
        });
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById('application-form').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="landing-page" style={{ fontFamily: "'Inter', sans-serif", position: 'relative' }}>
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
        padding: '100px 24px 60px'
      }}>
        <div style={{
          maxWidth: '1100px',
          width: '100%',
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
            You Are Successful.<br />But You Are Still 'Invisible'.
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
            margin: '0 auto 48px'
          }}>
            You've built a powerhouse. Your turnover is strong. Your profits are real.<br />
            But to the big investors and the public markets, you don't exist yet.<br />
            Your wealth is trapped inside your factory walls.
          </p>
          
          <button 
            onClick={scrollToForm}
            style={{
              background: '#D4AF37',
              color: '#000000',
              border: 'none',
              padding: '22px 56px',
              fontSize: '14px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              fontFamily: "'Inter', sans-serif",
              boxShadow: '0 4px 20px rgba(212, 175, 55, 0.25)'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#C5A028';
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 12px 32px rgba(212, 175, 55, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#D4AF37';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 20px rgba(212, 175, 55, 0.25)';
            }}
          >
            [ Unlock My Roadmap ]
          </button>
        </div>
      </section>

      {/* Reality Check Section */}
      <section className="section-padding" style={{
        background: '#FFFFFF',
        padding: '100px 24px',
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
            The Great Divide: Why Some Prosper<br />While Others Just 'Work'
          </h2>
          
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(17px, 1.8vw, 19px)',
            color: '#374151',
            lineHeight: '1.85',
            textAlign: 'center',
            maxWidth: '850px',
            margin: '0 auto',
            fontWeight: '400',
            letterSpacing: '0.2px'
          }}>
            There are two types of business owners in India today: Those who stay 'private' and keep grinding for every single percent of growth, and those who go Public and watch their net worth explode overnight. Most promoters think the Public Market is a 'scary' place. That is exactly what your competitors want you to believe. They want you to stay small so they can stay ahead.
          </p>
        </div>
      </section>

      {/* Authority Section */}
      <section className="section-padding" style={{
        background: '#F9FAFB',
        padding: '100px 24px',
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
            We Don't Consult.<br />We Create Market Legends.
          </h2>
          
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(17px, 1.8vw, 19px)',
            color: '#374151',
            lineHeight: '1.85',
            textAlign: 'center',
            maxWidth: '850px',
            margin: '0 auto',
            fontWeight: '400',
            letterSpacing: '0.2px'
          }}>
            Rushabh Ventures is not a firm of 'consultants' who give you a thick book of advice and leave. We are architects. We don't just 'apply' for an IPO. We prepare your business for a market frenzy. When we step into the room, the biggest investors and the most elite merchant bankers listen. Why? Because we only bring them winners.
          </p>
        </div>
      </section>

      {/* Wall of Proof Section */}
      <section className="section-padding" style={{
        background: 'linear-gradient(180deg, #0A192F 0%, #050d1a 100%)',
        padding: '100px 24px',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1200px', width: '100%' }}>
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
            color: '#FFFFFF',
            marginBottom: '24px',
            textAlign: 'center',
            lineHeight: '1.15',
            letterSpacing: '-0.8px'
          }}>
            Look At The Chaos We Create
          </h2>
          
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '17px',
            color: 'rgba(229, 231, 235, 0.8)',
            lineHeight: '1.6',
            textAlign: 'center',
            marginBottom: '80px',
            fontWeight: '300',
            letterSpacing: '0.3px'
          }}>
            We don't hope for success. We engineer it. When we take a company to the market,<br />the response isn't just 'good'—it is historic.
          </p>
          
          {/* Data Display Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            marginBottom: '80px'
          }}>
            {[
              { company: 'Indian Emulsifiers', times: '460' },
              { company: 'Meson Valves India', times: '173' },
              { company: 'Transteel Seating', times: '49' }
            ].map((item, index) => (
              <div key={index} style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(212, 175, 55, 0.2)',
                padding: '56px 40px',
                textAlign: 'center',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(212, 175, 55, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.5)';
                e.currentTarget.style.transform = 'translateY(-8px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.2)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              >
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '68px',
                  fontWeight: '700',
                  color: '#D4AF37',
                  marginBottom: '16px',
                  letterSpacing: '-2px'
                }}>
                  {item.times}×
                </div>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '11px',
                  color: '#9CA3AF',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  fontWeight: '500'
                }}>
                  Over-Subscribed
                </div>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '19px',
                  color: '#FFFFFF',
                  fontWeight: '500',
                  letterSpacing: '0.2px'
                }}>
                  {item.company}
                </div>
              </div>
            ))}
          </div>
          
          {/* Quote */}
          <blockquote style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(22px, 2.8vw, 32px)',
            fontStyle: 'italic',
            color: '#D4AF37',
            textAlign: 'center',
            maxWidth: '950px',
            margin: '0 auto',
            lineHeight: '1.5',
            fontWeight: '400',
            letterSpacing: '-0.3px'
          }}>
            "460 Times Over-Subscribed means that for every 1 share available,<br />460 people were fighting to buy it. That isn't luck. That is a roadmap."
          </blockquote>
        </div>
      </section>

      {/* Gatekeeper Section */}
      <section className="section-padding" style={{
        background: '#000000',
        padding: '100px 24px',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1000px', width: '100%' }}>
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
            color: '#FFFFFF',
            marginBottom: '48px',
            textAlign: 'center',
            lineHeight: '1.15',
            letterSpacing: '-0.8px'
          }}>
            Are You Our Next Success Story?
          </h2>
          
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(17px, 1.8vw, 19px)',
            color: 'rgba(229, 231, 235, 0.9)',
            lineHeight: '1.85',
            textAlign: 'center',
            marginBottom: '80px',
            fontWeight: '300',
            letterSpacing: '0.3px'
          }}>
            We are extremely selective. We do not work with everyone.<br />We only work with companies that have the 'fuel' ready to burn.
          </p>
          
          {/* Checklist */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            marginBottom: '70px',
            maxWidth: '700px',
            margin: '0 auto 70px'
          }}>
            {[
              'Strong financial track record and growth trajectory.',
              'Net Profit Margins above 10%.',
              'Consistent Year-on-Year Growth.'
            ].map((item, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                padding: '28px 32px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(212, 175, 55, 0.15)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.15)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
              }}
              >
                <div style={{
                  width: '28px',
                  height: '28px',
                  background: '#D4AF37',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Check size={18} color="#000000" strokeWidth={3} />
                </div>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '17px',
                  color: '#FFFFFF',
                  fontWeight: '400',
                  letterSpacing: '0.2px'
                }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
          
          {/* Closing Statement */}
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(24px, 2.8vw, 32px)',
            color: '#D4AF37',
            textAlign: 'center',
            fontWeight: '600',
            lineHeight: '1.4',
            letterSpacing: '-0.3px'
          }}>
            You've spent decades building your business.<br />Give us 3 months to build your legacy.
          </p>
        </div>
      </section>

      {/* Final CTA / Application Form */}
      <section id="application-form" className="section-padding" style={{
        background: 'linear-gradient(135deg, #D4AF37 0%, #C5A028 100%)',
        padding: '80px 24px',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '650px', width: '100%' }}>
          <div style={{
            width: '60px',
            height: '2px',
            background: '#000000',
            margin: '0 auto 50px'
          }} />
          
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(36px, 4.8vw, 56px)',
            fontWeight: '700',
            color: '#000000',
            marginBottom: '20px',
            textAlign: 'center',
            lineHeight: '1.1',
            letterSpacing: '-0.8px'
          }}>
            Your Seat at the Table<br />Is Waiting.
          </h2>
          
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '16px',
            color: 'rgba(0, 0, 0, 0.8)',
            textAlign: 'center',
            marginBottom: '70px',
            fontWeight: '500',
            letterSpacing: '0.5px',
            textTransform: 'uppercase'
          }}>
            Don't just contact us. Apply for an evaluation.
          </p>
          
          <form onSubmit={handleSubmit} data-testid="application-form" className="application-form" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            <div>
              <label style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '11px',
                fontWeight: '700',
                color: '#000000',
                display: 'block',
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '1.5px'
              }}>
                Name
              </label>
              <input
                type="text"
                name="name"
                data-testid="application-name-input"
                value={formData.name}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '18px 24px',
                  fontSize: '16px',
                  fontFamily: "'Inter', sans-serif",
                  border: '2px solid rgba(0, 0, 0, 0.2)',
                  background: 'rgba(255, 255, 255, 0.95)',
                  color: '#000000',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box',
                  fontWeight: '400'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#000000';
                  e.target.style.background = '#FFFFFF';
                  e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(0, 0, 0, 0.2)';
                  e.target.style.background = 'rgba(255, 255, 255, 0.95)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div>
              <label style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '11px',
                fontWeight: '700',
                color: '#000000',
                display: 'block',
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '1.5px'
              }}>
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                data-testid="application-company-input"
                value={formData.companyName}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '18px 24px',
                  fontSize: '16px',
                  fontFamily: "'Inter', sans-serif",
                  border: '2px solid rgba(0, 0, 0, 0.2)',
                  background: 'rgba(255, 255, 255, 0.95)',
                  color: '#000000',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box',
                  fontWeight: '400'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#000000';
                  e.target.style.background = '#FFFFFF';
                  e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(0, 0, 0, 0.2)';
                  e.target.style.background = 'rgba(255, 255, 255, 0.95)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div>
              <label style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '11px',
                fontWeight: '700',
                color: '#000000',
                display: 'block',
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '1.5px'
              }}>
                Annual Turnover (in Crores ₹)
              </label>
              <input
                type="text"
                name="annualTurnover"
                data-testid="application-turnover-input"
                value={formData.annualTurnover}
                onChange={handleInputChange}
                required
                placeholder="e.g., 75"
                style={{
                  width: '100%',
                  padding: '18px 24px',
                  fontSize: '16px',
                  fontFamily: "'Inter', sans-serif",
                  border: '2px solid rgba(0, 0, 0, 0.2)',
                  background: 'rgba(255, 255, 255, 0.95)',
                  color: '#000000',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box',
                  fontWeight: '400'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#000000';
                  e.target.style.background = '#FFFFFF';
                  e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(0, 0, 0, 0.2)';
                  e.target.style.background = 'rgba(255, 255, 255, 0.95)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div>
              <label style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '11px',
                fontWeight: '700',
                color: '#000000',
                display: 'block',
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '1.5px'
              }}>
                Mobile Number
              </label>
              <input
                type="tel"
                name="mobileNumber"
                data-testid="application-mobile-input"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                required
                placeholder="+91 98765 43210"
                style={{
                  width: '100%',
                  padding: '18px 24px',
                  fontSize: '16px',
                  fontFamily: "'Inter', sans-serif",
                  border: '2px solid rgba(0, 0, 0, 0.2)',
                  background: 'rgba(255, 255, 255, 0.95)',
                  color: '#000000',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box',
                  fontWeight: '400'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#000000';
                  e.target.style.background = '#FFFFFF';
                  e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(0, 0, 0, 0.2)';
                  e.target.style.background = 'rgba(255, 255, 255, 0.95)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              data-testid="application-submit-btn"
              style={{
                background: '#000000',
                color: '#FFFFFF',
                border: 'none',
                padding: '22px 56px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                fontFamily: "'Inter', sans-serif",
                marginTop: '24px',
                opacity: isSubmitting ? 0.7 : 1,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.target.style.background = '#1a1a1a';
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 8px 28px rgba(0, 0, 0, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.target.style.background = '#000000';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
                }
              }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
