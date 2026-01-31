import React, { useState } from 'react';
import { Check } from 'lucide-react';
import Spline from '@splinetool/react-spline';
import { submitApplication } from '../utils/mock';
import { toast } from 'sonner';

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
        {/* Logo */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2px'
        }}>
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
          onClick={scrollToForm}
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
      {/* Hero Section */}
      <section className="hero-section" style={{
        background: '#0A192F',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '1400px',
          width: '100%',
          padding: '0 60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '80px',
          flexWrap: 'wrap'
        }}>
          {/* Left Content */}
          <div style={{ flex: '1', minWidth: '400px', zIndex: 2 }}>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(42px, 5vw, 66px)',
              fontWeight: '700',
              color: '#D4AF37',
              lineHeight: '1.1',
              marginBottom: '30px',
              letterSpacing: '-0.62px'
            }}>
              You Are Successful. But You Are Still 'Invisible'.
            </h1>
            
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(18px, 2vw, 22px)',
              color: '#E5E7EB',
              lineHeight: '1.6',
              marginBottom: '40px',
              fontWeight: '300'
            }}>
              You've built a powerhouse. Your turnover is strong. Your profits are real. But to the big investors and the public markets, you don't exist yet. Your wealth is trapped inside your factory walls.
            </p>
            
            <button 
              onClick={scrollToForm}
              style={{
                background: '#D4AF37',
                color: '#000000',
                border: 'none',
                padding: '20px 48px',
                fontSize: '18px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                letterSpacing: '1px',
                fontFamily: "'Inter', sans-serif"
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#C5A028';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 24px rgba(212, 175, 55, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#D4AF37';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              UNLOCK MY ROADMAP
            </button>
          </div>
          
          {/* Right 3D Spline */}
          <div style={{
            flex: '1',
            minWidth: '400px',
            height: '700px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              maxWidth: '700px',
              overflow: 'visible'
            }}>
              <Spline scene="https://prod.spline.design/NbVmy6DPLhY-5Lvg/scene.splinecode" />
            </div>
          </div>
        </div>
      </section>

      {/* Reality Check Section */}
      <section style={{
        background: '#FFFFFF',
        padding: '120px 60px',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{ maxWidth: '1200px', width: '100%' }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: '700',
            color: '#111111',
            marginBottom: '40px',
            textAlign: 'center',
            lineHeight: '1.2'
          }}>
            The Great Divide: Why Some Prosper While Others Just 'Work'
          </h2>
          
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(18px, 2vw, 20px)',
            color: '#374151',
            lineHeight: '1.8',
            textAlign: 'center',
            maxWidth: '900px',
            margin: '0 auto',
            fontWeight: '400'
          }}>
            There are two types of business owners in India today: Those who stay 'private' and keep grinding for every single percent of growth, and those who go Public and watch their net worth explode overnight. Most promoters think the Public Market is a 'scary' place. That is exactly what your competitors want you to believe. They want you to stay small so they can stay ahead.
          </p>
        </div>
      </section>

      {/* Authority Section */}
      <section style={{
        background: '#F3F4F6',
        padding: '120px 60px',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{ maxWidth: '1200px', width: '100%' }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: '700',
            color: '#111111',
            marginBottom: '40px',
            textAlign: 'center',
            lineHeight: '1.2'
          }}>
            We Don't Consult. We Create Market Legends.
          </h2>
          
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(18px, 2vw, 20px)',
            color: '#374151',
            lineHeight: '1.8',
            textAlign: 'center',
            maxWidth: '900px',
            margin: '0 auto',
            fontWeight: '400'
          }}>
            Rushabh Ventures is not a firm of 'consultants' who give you a thick book of advice and leave. We are architects. We don't just 'apply' for an IPO. We prepare your business for a market frenzy. When we step into the room, the biggest investors and the most elite merchant bankers listen. Why? Because we only bring them winners.
          </p>
        </div>
      </section>

      {/* Wall of Proof Section */}
      <section style={{
        background: '#0A192F',
        padding: '120px 60px',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{ maxWidth: '1200px', width: '100%' }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: '700',
            color: '#FFFFFF',
            marginBottom: '20px',
            textAlign: 'center',
            lineHeight: '1.2'
          }}>
            Look At The Chaos We Create
          </h2>
          
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '18px',
            color: '#E5E7EB',
            lineHeight: '1.6',
            textAlign: 'center',
            marginBottom: '60px',
            fontWeight: '300'
          }}>
            We don't hope for success. We engineer it. When we take a company to the market, the response isn't just 'good'—it is historic.
          </p>
          
          {/* Data Display Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
            marginBottom: '60px'
          }}>
            {[
              { company: 'Indian Emulsifiers', times: '460' },
              { company: 'Meson Valves India', times: '173' },
              { company: 'Transteel Seating', times: '49' }
            ].map((item, index) => (
              <div key={index} style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                padding: '40px',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(212, 175, 55, 0.1)';
                e.currentTarget.style.borderColor = '#D4AF37';
                e.currentTarget.style.transform = 'translateY(-5px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              >
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '56px',
                  fontWeight: '700',
                  color: '#D4AF37',
                  marginBottom: '10px'
                }}>
                  {item.times}×
                </div>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  color: '#9CA3AF',
                  marginBottom: '5px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Over-Subscribed
                </div>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '18px',
                  color: '#FFFFFF',
                  fontWeight: '600'
                }}>
                  {item.company}
                </div>
              </div>
            ))}
          </div>
          
          {/* Quote */}
          <blockquote style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(20px, 2.5vw, 28px)',
            fontStyle: 'italic',
            color: '#D4AF37',
            textAlign: 'center',
            maxWidth: '900px',
            margin: '0 auto',
            lineHeight: '1.6',
            fontWeight: '400'
          }}>
            "460 Times Over-Subscribed means that for every 1 share available, 460 people were fighting to buy it. That isn't luck. That is a roadmap."
          </blockquote>
        </div>
      </section>

      {/* Gatekeeper Section */}
      <section style={{
        background: '#000000',
        padding: '120px 60px',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{ maxWidth: '1000px', width: '100%' }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: '700',
            color: '#FFFFFF',
            marginBottom: '40px',
            textAlign: 'center',
            lineHeight: '1.2'
          }}>
            Are You Our Next Success Story?
          </h2>
          
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(18px, 2vw, 20px)',
            color: '#E5E7EB',
            lineHeight: '1.8',
            textAlign: 'center',
            marginBottom: '60px',
            fontWeight: '300'
          }}>
            We are extremely selective. We do not work with everyone. We only work with companies that have the 'fuel' ready to burn.
          </p>
          
          {/* Checklist */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '30px',
            marginBottom: '50px'
          }}>
            {[
              'Annual Turnover between ₹50 Cr and ₹200 Cr.',
              'Net Profit Margins above 10%.',
              'Consistent Year-on-Year Growth.'
            ].map((item, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                padding: '20px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(212, 175, 55, 0.2)'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: '#D4AF37',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Check size={20} color="#000000" strokeWidth={3} />
                </div>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '18px',
                  color: '#FFFFFF',
                  fontWeight: '400'
                }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
          
          {/* Closing Statement */}
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(22px, 2.5vw, 28px)',
            color: '#D4AF37',
            textAlign: 'center',
            fontWeight: '600',
            lineHeight: '1.4'
          }}>
            You've spent decades building your business. Give us 3 months to build your legacy.
          </p>
        </div>
      </section>

      {/* Final CTA / Application Form */}
      <section id="application-form" style={{
        background: '#D4AF37',
        padding: '120px 60px',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{ maxWidth: '700px', width: '100%' }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: '700',
            color: '#000000',
            marginBottom: '20px',
            textAlign: 'center',
            lineHeight: '1.2'
          }}>
            Your Seat at the Table Is Waiting.
          </h2>
          
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '18px',
            color: '#000000',
            textAlign: 'center',
            marginBottom: '60px',
            fontWeight: '500'
          }}>
            Don't just contact us. Apply for an evaluation.
          </p>
          
          <form onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '30px'
          }}>
            <div>
              <label style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                fontWeight: '600',
                color: '#000000',
                display: 'block',
                marginBottom: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  fontSize: '16px',
                  fontFamily: "'Inter', sans-serif",
                  border: '2px solid #000000',
                  background: '#FFFFFF',
                  color: '#000000',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#0A192F';
                  e.target.style.boxShadow = '0 0 0 3px rgba(10, 25, 47, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#000000';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div>
              <label style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                fontWeight: '600',
                color: '#000000',
                display: 'block',
                marginBottom: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  fontSize: '16px',
                  fontFamily: "'Inter', sans-serif",
                  border: '2px solid #000000',
                  background: '#FFFFFF',
                  color: '#000000',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#0A192F';
                  e.target.style.boxShadow = '0 0 0 3px rgba(10, 25, 47, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#000000';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div>
              <label style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                fontWeight: '600',
                color: '#000000',
                display: 'block',
                marginBottom: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Annual Turnover (in Crores ₹)
              </label>
              <input
                type="text"
                name="annualTurnover"
                value={formData.annualTurnover}
                onChange={handleInputChange}
                required
                placeholder="e.g., 75"
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  fontSize: '16px',
                  fontFamily: "'Inter', sans-serif",
                  border: '2px solid #000000',
                  background: '#FFFFFF',
                  color: '#000000',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#0A192F';
                  e.target.style.boxShadow = '0 0 0 3px rgba(10, 25, 47, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#000000';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div>
              <label style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                fontWeight: '600',
                color: '#000000',
                display: 'block',
                marginBottom: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Mobile Number
              </label>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                required
                placeholder="+91 98765 43210"
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  fontSize: '16px',
                  fontFamily: "'Inter', sans-serif",
                  border: '2px solid #000000',
                  background: '#FFFFFF',
                  color: '#000000',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#0A192F';
                  e.target.style.boxShadow = '0 0 0 3px rgba(10, 25, 47, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#000000';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                background: '#000000',
                color: '#FFFFFF',
                border: 'none',
                padding: '20px 48px',
                fontSize: '18px',
                fontWeight: '700',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                letterSpacing: '1px',
                fontFamily: "'Inter', sans-serif",
                marginTop: '20px',
                opacity: isSubmitting ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.target.style.background = '#0A192F';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.target.style.background = '#000000';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }
              }}
            >
              {isSubmitting ? 'SUBMITTING...' : 'SUBMIT APPLICATION'}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: '#0A192F',
        padding: '40px 60px',
        textAlign: 'center',
        borderTop: '1px solid rgba(212, 175, 55, 0.3)'
      }}>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '14px',
          color: '#9CA3AF',
          fontWeight: '300'
        }}>
          © 2025 Rushabh Ventures. We Create Market Legends.
        </p>
      </footer>
    </div>
  );
};

export default Home;
