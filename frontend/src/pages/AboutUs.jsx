import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CTASection from '../components/CTASection';

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
      <section className="section-padding" style={{
        background: '#FFFFFF',
        padding: '80px 24px',
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
      <section className="section-padding" style={{
        background: '#F9FAFB',
        padding: '80px 24px',
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

      {/* Inner Circle Advantage Section */}
      <section className="section-padding" style={{
        background: '#FFFFFF',
        padding: '80px 24px',
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
            The "Inner Circle" Advantage
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
              In the world of IPOs, who you know matters just as much as what you know.
            </p>
            
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '18px',
              color: '#374151',
              lineHeight: '1.85',
              fontWeight: '400',
              letterSpacing: '0.2px'
            }}>
              Over the last two decades, we have built deep, personal relationships with the people who actually control the market:
            </p>

            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: '20px 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              {[
                'The Merchant Bankers who structure the best deals.',
                'The Anchor Investors who write the biggest checks.',
                'The Market Makers who ensure your stock has liquidity.'
              ].map((item, index) => (
                <li key={index} style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '18px',
                  color: '#374151',
                  lineHeight: '1.85',
                  paddingLeft: '30px',
                  position: 'relative'
                }}>
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    color: '#D4AF37',
                    fontWeight: '700'
                  }}>•</span>
                  {item}
                </li>
              ))}
            </ul>

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
              When you work with Rushabh Ventures, you don't just get a consultant. You get immediate access to our network. We pick up the phone, and the market listens.
            </p>
          </div>
        </div>
      </section>

      {/* Engineer Results Section */}
      <section className="section-padding" style={{
        background: 'linear-gradient(180deg, #0A192F 0%, #050d1a 100%)',
        padding: '80px 24px',
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
            color: '#FFFFFF',
            marginBottom: '48px',
            textAlign: 'center',
            lineHeight: '1.15',
            letterSpacing: '-0.8px'
          }}>
            We Don't Guess. We Engineer Results.
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
              color: 'rgba(229, 231, 235, 0.9)',
              lineHeight: '1.85',
              fontWeight: '400',
              letterSpacing: '0.2px',
              textAlign: 'center'
            }}>
              We believe that hope is not a strategy. An IPO isn't a lottery ticket; it is a meticulously calculated engineering project.
            </p>
            
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '18px',
              color: 'rgba(229, 231, 235, 0.9)',
              lineHeight: '1.85',
              fontWeight: '400',
              letterSpacing: '0.2px',
              textAlign: 'center'
            }}>
              We don't promise "effort." We promise impact.
            </p>

            <div className="stats-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '24px',
              margin: '40px 0'
            }}>
              {[
                { company: 'Indian Emulsifiers', times: '460' },
                { company: 'Meson Valves', times: '173' },
                { company: 'Transteel', times: '49' }
              ].map((item, index) => (
                <div key={index} className="stat-card" style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  padding: '32px 24px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease'
                }}>
                  <div className="stat-number" style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(36px, 7vw, 56px)',
                    fontWeight: '700',
                    color: '#D4AF37',
                    marginBottom: '10px',
                    letterSpacing: '-2px'
                  }}>
                    {item.times}×
                  </div>
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '16px',
                    color: '#FFFFFF',
                    fontWeight: '500'
                  }}>
                    {item.company}
                  </div>
                </div>
              ))}
            </div>

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
              These numbers are not accidents. They are the result of a roadmap that we build, refine, and execute with military precision.
            </p>
          </div>
        </div>
      </section>

      {/* Partner Mindset Section */}
      <section className="section-padding" style={{
        background: '#F9FAFB',
        padding: '80px 24px',
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
            Our Philosophy: The "Partner" Mindset
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
              We are selective. We turn down more clients than we accept.
            </p>
            
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '18px',
              color: '#374151',
              lineHeight: '1.85',
              fontWeight: '400',
              letterSpacing: '0.2px'
            }}>
              Why? Because we don't operate like an agency. We operate like a partner. When we take on your business, we treat it as if it were our own. We fix the cracks in your foundation. We polish your story. We prepare you for the spotlight.
            </p>

            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '28px',
              color: '#D4AF37',
              lineHeight: '1.5',
              fontWeight: '600',
              letterSpacing: '-0.3px',
              textAlign: 'center',
              marginTop: '20px'
            }}>
              We are here to make you a Market Legend.
            </p>
          </div>
        </div>
      </section>

      {/* Personal Note from Founder */}
      <section className="section-padding" style={{
        background: '#FFFFFF',
        padding: '80px 24px',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{ maxWidth: '900px', width: '100%' }}>
          <div style={{
            width: '60px',
            height: '2px',
            background: '#D4AF37',
            margin: '0 auto 50px'
          }} />
          
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(34px, 4.5vw, 48px)',
            fontWeight: '700',
            color: '#111111',
            marginBottom: '60px',
            textAlign: 'center',
            lineHeight: '1.15',
            letterSpacing: '-0.8px'
          }}>
            A Personal Note From The Founder
          </h2>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '28px'
          }}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '18px',
              color: '#374151',
              lineHeight: '1.85',
              fontWeight: '400',
              letterSpacing: '0.2px'
            }}>
              Let's be honest for a moment.
            </p>

            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '18px',
              color: '#374151',
              lineHeight: '1.85',
              fontWeight: '400',
              letterSpacing: '0.2px'
            }}>
              You didn't come to this website because you want to hire a consultant. You came here because you are looking for growth.
            </p>
            
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '18px',
              color: '#374151',
              lineHeight: '1.85',
              fontWeight: '400',
              letterSpacing: '0.2px'
            }}>
              You are looking for that "next level" that seems to come so easily to others but feels like a hard fight for you. You see competitors with half your quality and half your integrity ringing the Opening Bell at the Stock Exchange, and you wonder, "What do they know that I don't?"
            </p>

            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '22px',
              color: '#D4AF37',
              lineHeight: '1.5',
              fontWeight: '600',
              letterSpacing: '-0.3px',
              textAlign: 'center',
              margin: '20px 0'
            }}>
              The answer is simple: They didn't try to climb the mountain alone.
            </p>

            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '18px',
              color: '#374151',
              lineHeight: '1.85',
              fontWeight: '400',
              letterSpacing: '0.2px'
            }}>
              I have spent the last 20 years in the financial world. I have seen brilliant businessmen stay small because they were too afraid to let go of control. And I have seen average businesses become market giants because they understood the power of Capital.
            </p>

            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '18px',
              color: '#374151',
              lineHeight: '1.85',
              fontWeight: '400',
              letterSpacing: '0.2px'
            }}>
              My philosophy is simple: I don't work with balance sheets. I work with people.
            </p>

            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '18px',
              color: '#374151',
              lineHeight: '1.85',
              fontWeight: '400',
              letterSpacing: '0.2px'
            }}>
              If you are just looking for someone to file your paperwork, there are a thousand other firms you can hire. They will be cheaper, and they will do exactly what you tell them.
            </p>

            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '18px',
              color: '#374151',
              lineHeight: '1.85',
              fontWeight: '400',
              letterSpacing: '0.2px'
            }}>
              But if you are looking for a partner who will challenge you, push you, and fight for your valuation in a room full of skeptical investors, then you are in the right place.
            </p>

            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '18px',
              color: '#374151',
              lineHeight: '1.85',
              fontWeight: '400',
              letterSpacing: '0.2px'
            }}>
              I am in this business to build legacies. I get my thrill when I see your company name flashing on the ticker tape and I know, "We built that."
            </p>

            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '22px',
              color: '#D4AF37',
              lineHeight: '1.5',
              fontWeight: '600',
              letterSpacing: '-0.3px',
              textAlign: 'center',
              margin: '40px 0'
            }}>
              The market is waiting for you. The capital is waiting for you.<br />
              The only variable left is you.
            </p>

            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '24px',
              color: '#111111',
              lineHeight: '1.5',
              fontWeight: '600',
              letterSpacing: '-0.3px',
              textAlign: 'center',
              margin: '30px 0 20px'
            }}>
              Are you ready to step out of the shadows?
            </p>

            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '20px',
              color: '#374151',
              lineHeight: '1.85',
              fontWeight: '500',
              letterSpacing: '0.2px',
              textAlign: 'center'
            }}>
              Let's get to work.
            </p>

            <div style={{
              marginTop: '60px',
              textAlign: 'center',
              borderTop: '1px solid rgba(0, 0, 0, 0.1)',
              paddingTop: '40px'
            }}>
              {/* Founder Image */}
              <div style={{
                width: '160px',
                height: '160px',
                margin: '0 auto 24px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '4px solid #D4AF37',
                boxShadow: '0 8px 32px rgba(212, 175, 55, 0.2)'
              }}>
                <img 
                  src="https://customer-assets.emergentagent.com/job_ca3b6450-e647-4e8a-bb45-f0fc3a0aa25a/artifacts/2uiputtn_Abhishek%20Rai.jpeg"
                  alt="Abhishek Rai - Founder, Rushabh Ventures"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '32px',
                color: '#D4AF37',
                fontWeight: '600',
                fontStyle: 'italic',
                marginBottom: '10px'
              }}>
                Abhishek Rai
              </p>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                color: '#6B7280',
                textTransform: 'uppercase',
                letterSpacing: '2px'
              }}>
                Founder, Rushabh Ventures
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUs;
