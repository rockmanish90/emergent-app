import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { blogPosts } from '../utils/blogData';

const BlogList = () => {
  const navigate = useNavigate();

  return (
    <div className="blog-list-page" style={{ fontFamily: "'Inter', sans-serif" }}>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', cursor: 'pointer' }} onClick={() => navigate('/')}>
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

        <button 
          onClick={() => navigate('/contact')}
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
          Contact Us
        </button>
      </nav>

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(180deg, #0A192F 0%, #050d1a 100%)',
        padding: '180px 80px 100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '900px', width: '100%' }}>
          <div style={{
            width: '60px',
            height: '2px',
            background: '#D4AF37',
            margin: '0 auto 40px'
          }} />
          
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(44px, 5.5vw, 64px)',
            fontWeight: '700',
            color: '#D4AF37',
            lineHeight: '1.1',
            marginBottom: '30px',
            letterSpacing: '-1px'
          }}>
            Insights & Perspectives
          </h1>
          
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(17px, 1.8vw, 20px)',
            color: 'rgba(229, 231, 235, 0.9)',
            lineHeight: '1.7',
            fontWeight: '300',
            letterSpacing: '0.3px'
          }}>
            Expert guidance on IPO strategy, valuation, and public market success
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section style={{
        background: '#FFFFFF',
        padding: '100px 80px',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{ maxWidth: '1200px', width: '100%' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '50px'
          }}>
            {blogPosts.map((post) => (
              <article
                key={post.id}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onClick={() => navigate(`/blog/${post.slug}`)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.borderColor = '#D4AF37';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                }}
              >
                {/* Image */}
                <div style={{
                  width: '100%',
                  height: '240px',
                  overflow: 'hidden',
                  background: '#F3F4F6'
                }}>
                  <img
                    src={post.image}
                    alt={post.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  />
                </div>

                {/* Content */}
                <div style={{ padding: '32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  {/* Category & Read Time */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    marginBottom: '16px'
                  }}>
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '11px',
                      fontWeight: '700',
                      color: '#D4AF37',
                      textTransform: 'uppercase',
                      letterSpacing: '1.5px'
                    }}>
                      {post.category}
                    </span>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: '#9CA3AF',
                      fontSize: '13px'
                    }}>
                      <Clock size={14} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '24px',
                    fontWeight: '600',
                    color: '#111111',
                    marginBottom: '16px',
                    lineHeight: '1.3',
                    letterSpacing: '-0.3px'
                  }}>
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '15px',
                    color: '#6B7280',
                    lineHeight: '1.7',
                    marginBottom: '24px',
                    flex: 1
                  }}>
                    {post.excerpt}
                  </p>

                  {/* Date & Read More */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '13px',
                      color: '#9CA3AF'
                    }}>
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#D4AF37',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '13px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}>
                      Read More
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: 'linear-gradient(180deg, #0A192F 0%, #050d1a 100%)',
        padding: '60px 80px',
        borderTop: '1px solid rgba(212, 175, 55, 0.15)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '30px'
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
          
          <div style={{ display: 'flex', gap: '40px' }}>
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
    </div>
  );
};

export default BlogList;
