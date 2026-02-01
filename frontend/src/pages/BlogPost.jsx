import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, ArrowLeft, Calendar, User } from 'lucide-react';
import { getBlogBySlug, blogPosts } from '../utils/blogData';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = getBlogBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#FFFFFF'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '48px',
            color: '#111111',
            marginBottom: '20px'
          }}>
            Post Not Found
          </h1>
          <button
            onClick={() => navigate('/blog')}
            style={{
              background: '#D4AF37',
              color: '#000000',
              border: 'none',
              padding: '14px 32px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: "'Inter', sans-serif",
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  // Get related posts (exclude current post)
  const relatedPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 3);

  return (
    <div className="blog-post-page" style={{ fontFamily: "'Inter', sans-serif" }}>
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
          onClick={() => navigate('/blog')}
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
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
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
          <ArrowLeft size={16} />
          All Articles
        </button>
      </nav>

      {/* Hero Image */}
      <section style={{
        width: '100%',
        height: '500px',
        overflow: 'hidden',
        marginTop: '88px',
        position: 'relative'
      }}>
        <img
          src={post.image}
          alt={post.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)'
        }} />
      </section>

      {/* Article Content */}
      <article style={{
        background: '#FFFFFF',
        padding: '80px 80px 60px',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{ maxWidth: '800px', width: '100%' }}>
          {/* Category Badge */}
          <div style={{
            display: 'inline-block',
            padding: '8px 16px',
            background: 'rgba(212, 175, 55, 0.1)',
            marginBottom: '24px'
          }}>
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
              fontWeight: '700',
              color: '#D4AF37',
              textTransform: 'uppercase',
              letterSpacing: '1.5px'
            }}>
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: '700',
            color: '#111111',
            lineHeight: '1.1',
            marginBottom: '32px',
            letterSpacing: '-1px'
          }}>
            {post.title}
          </h1>

          {/* Meta Info */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
            paddingBottom: '32px',
            marginBottom: '40px',
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
            flexWrap: 'wrap'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              color: '#6B7280'
            }}>
              <User size={18} />
              <span>{post.author}</span>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              color: '#6B7280'
            }}>
              <Calendar size={18} />
              <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              color: '#6B7280'
            }}>
              <Clock size={18} />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Content */}
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '18px',
              color: '#374151',
              lineHeight: '1.8',
              letterSpacing: '0.2px'
            }}
            dangerouslySetInnerHTML={{ __html: post.content }}
            className="blog-content"
          />

          {/* CTA Section */}
          <div style={{
            marginTop: '60px',
            padding: '48px',
            background: 'linear-gradient(135deg, #D4AF37 0%, #C5A028 100%)',
            textAlign: 'center'
          }}>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '32px',
              fontWeight: '700',
              color: '#000000',
              marginBottom: '20px',
              letterSpacing: '-0.5px'
            }}>
              Ready to Take Your Company Public?
            </h3>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '16px',
              color: 'rgba(0, 0, 0, 0.8)',
              marginBottom: '32px',
              lineHeight: '1.6'
            }}>
              Schedule a consultation with our IPO experts to discuss your company's journey to the public markets.
            </p>
            <button
              onClick={() => navigate('/contact')}
              style={{
                background: '#000000',
                color: '#FFFFFF',
                border: 'none',
                padding: '18px 40px',
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                fontFamily: "'Inter', sans-serif"
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#1a1a1a';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#000000';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Get In Touch
            </button>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section style={{
          background: '#F9FAFB',
          padding: '80px 80px',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <div style={{ maxWidth: '1200px', width: '100%' }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '42px',
              fontWeight: '700',
              color: '#111111',
              marginBottom: '50px',
              textAlign: 'center',
              letterSpacing: '-0.8px'
            }}>
              Related Articles
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '40px'
            }}>
              {relatedPosts.map((relatedPost) => (
                <div
                  key={relatedPost.id}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => navigate(`/blog/${relatedPost.slug}`)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.borderColor = '#D4AF37';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <img
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{ padding: '24px' }}>
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '11px',
                      fontWeight: '700',
                      color: '#D4AF37',
                      textTransform: 'uppercase',
                      letterSpacing: '1.5px'
                    }}>
                      {relatedPost.category}
                    </span>
                    <h4 style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '20px',
                      fontWeight: '600',
                      color: '#111111',
                      marginTop: '12px',
                      lineHeight: '1.3'
                    }}>
                      {relatedPost.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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

      {/* Blog Content Styles */}
      <style>
        {`
          .blog-content h2 {
            font-family: 'Playfair Display', serif;
            font-size: 32px;
            font-weight: 600;
            color: #D4AF37;
            margin: 48px 0 24px 0;
            line-height: 1.2;
            letter-spacing: -0.5px;
          }

          .blog-content p {
            margin-bottom: 24px;
          }

          .blog-content ul {
            margin: 24px 0;
            padding-left: 30px;
          }

          .blog-content li {
            margin-bottom: 12px;
            line-height: 1.8;
          }

          .blog-content li::marker {
            color: #D4AF37;
          }
        `}
      </style>
    </div>
  );
};

export default BlogPost;
