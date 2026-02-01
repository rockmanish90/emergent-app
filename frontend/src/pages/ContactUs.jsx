import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { submitContact } from '../utils/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ContactUs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    annualTurnover: '',
    mobileNumber: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.companyName || !formData.mobileNumber) {
      toast.error('Please fill in all required fields (Name, Company Name, Mobile Number)');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await submitContact(formData);
      toast.success('Thank you! We will get back to you within 24 hours.');
      setFormData({ name: '', companyName: '', annualTurnover: '', mobileNumber: '', email: '', message: '' });
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <Header />

      {/* Contact Section */}
      <section style={{
        background: 'linear-gradient(135deg, #D4AF37 0%, #C5A028 100%)',
        minHeight: '100vh',
        padding: '180px 80px 100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ maxWidth: '1200px', width: '100%', display: 'flex', gap: '80px', flexWrap: 'wrap' }}>
          {/* Contact Info */}
          <div style={{ flex: '1', minWidth: '350px' }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(36px, 4.8vw, 56px)',
              fontWeight: '700',
              color: '#000000',
              marginBottom: '30px',
              lineHeight: '1.1',
              letterSpacing: '-0.8px'
            }}>
              Get In Touch
            </h2>
            
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '17px',
              color: 'rgba(0, 0, 0, 0.8)',
              lineHeight: '1.7',
              marginBottom: '60px',
              fontWeight: '400',
              letterSpacing: '0.3px'
            }}>
              Ready to unlock your company's true potential?<br />
              Let's start the conversation.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'start', gap: '20px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: '#000000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Mail size={24} color="#D4AF37" />
                </div>
                <div>
                  <h4 style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    fontWeight: '700',
                    color: '#000000',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px'
                  }}>
                    Email
                  </h4>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '16px',
                    color: 'rgba(0, 0, 0, 0.8)',
                    fontWeight: '400'
                  }}>
                    contact@rushabhventures.com
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'start', gap: '20px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: '#000000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Phone size={24} color="#D4AF37" />
                </div>
                <div>
                  <h4 style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    fontWeight: '700',
                    color: '#000000',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px'
                  }}>
                    Phone
                  </h4>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '16px',
                    color: 'rgba(0, 0, 0, 0.8)',
                    fontWeight: '400'
                  }}>
                    +91 (022) 1234 5678
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'start', gap: '20px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: '#000000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <MapPin size={24} color="#D4AF37" />
                </div>
                <div>
                  <h4 style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    fontWeight: '700',
                    color: '#000000',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px'
                  }}>
                    Office
                  </h4>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '16px',
                    color: 'rgba(0, 0, 0, 0.8)',
                    fontWeight: '400',
                    lineHeight: '1.6'
                  }}>
                    Nariman Point<br />
                    Mumbai, Maharashtra 400021
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div style={{ flex: '1', minWidth: '350px' }}>
            <form onSubmit={handleSubmit} style={{
              background: 'rgba(255, 255, 255, 0.95)',
              padding: '50px',
              display: 'flex',
              flexDirection: 'column',
              gap: '28px'
            }}>
              <div>
                <label style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '11px',
                  fontWeight: '700',
                  color: '#000000',
                  display: 'block',
                  marginBottom: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px'
                }}>
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    fontSize: '15px',
                    fontFamily: "'Inter', sans-serif",
                    border: '2px solid rgba(0, 0, 0, 0.15)',
                    background: '#FFFFFF',
                    color: '#000000',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#000000'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(0, 0, 0, 0.15)'}
                />
              </div>

              <div>
                <label style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '11px',
                  fontWeight: '700',
                  color: '#000000',
                  display: 'block',
                  marginBottom: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px'
                }}>
                  Company Name *
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    fontSize: '15px',
                    fontFamily: "'Inter', sans-serif",
                    border: '2px solid rgba(0, 0, 0, 0.15)',
                    background: '#FFFFFF',
                    color: '#000000',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#000000'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(0, 0, 0, 0.15)'}
                />
              </div>

              <div>
                <label style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '11px',
                  fontWeight: '700',
                  color: '#000000',
                  display: 'block',
                  marginBottom: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px'
                }}>
                  Annual Turnover (in Crores ₹)
                </label>
                <input
                  type="text"
                  name="annualTurnover"
                  value={formData.annualTurnover}
                  onChange={handleInputChange}
                  placeholder="e.g., 75"
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    fontSize: '15px',
                    fontFamily: "'Inter', sans-serif",
                    border: '2px solid rgba(0, 0, 0, 0.15)',
                    background: '#FFFFFF',
                    color: '#000000',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#000000'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(0, 0, 0, 0.15)'}
                />
              </div>

              <div>
                <label style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '11px',
                  fontWeight: '700',
                  color: '#000000',
                  display: 'block',
                  marginBottom: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px'
                }}>
                  Mobile Number *
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
                    padding: '14px 18px',
                    fontSize: '15px',
                    fontFamily: "'Inter', sans-serif",
                    border: '2px solid rgba(0, 0, 0, 0.15)',
                    background: '#FFFFFF',
                    color: '#000000',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#000000'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(0, 0, 0, 0.15)'}
                />
              </div>

              <div>
                <label style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '11px',
                  fontWeight: '700',
                  color: '#000000',
                  display: 'block',
                  marginBottom: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px'
                }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    fontSize: '15px',
                    fontFamily: "'Inter', sans-serif",
                    border: '2px solid rgba(0, 0, 0, 0.15)',
                    background: '#FFFFFF',
                    color: '#000000',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#000000'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(0, 0, 0, 0.15)'}
                />
              </div>

              <div>
                <label style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '11px',
                  fontWeight: '700',
                  color: '#000000',
                  display: 'block',
                  marginBottom: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px'
                }}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="5"
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    fontSize: '15px',
                    fontFamily: "'Inter', sans-serif",
                    border: '2px solid rgba(0, 0, 0, 0.15)',
                    background: '#FFFFFF',
                    color: '#000000',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box',
                    resize: 'vertical'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#000000'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(0, 0, 0, 0.15)'}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  background: '#000000',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '18px 40px',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  fontFamily: "'Inter', sans-serif",
                  opacity: isSubmitting ? 0.7 : 1
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) e.target.style.background = '#1a1a1a';
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) e.target.style.background = '#000000';
                }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactUs;
