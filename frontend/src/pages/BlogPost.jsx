import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, ArrowLeft, Calendar, User } from 'lucide-react';
import { getBlogBySlug, getBlogPosts } from '../utils/api';
import { getBlogBySlug as getFallbackPost, blogPosts as fallbackPosts } from '../utils/blogData';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  // Initialize with fallback data immediately - no loading spinner
  const fallbackPost = getFallbackPost(slug);
  const [post, setPost] = useState(fallbackPost);
  const [relatedPosts, setRelatedPosts] = useState(
    fallbackPost ? fallbackPosts.filter(p => p.id !== fallbackPost.id).slice(0, 3) : []
  );
  const [notFound, setNotFound] = useState(!fallbackPost);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Fetch fresh data in background
    const fetchPost = async () => {
      try {
        const fetchedPost = await getBlogBySlug(slug);
        if (fetchedPost) {
          setPost(fetchedPost);
          setNotFound(false);
          // Fetch related posts
          const allPosts = await getBlogPosts();
          setRelatedPosts(allPosts.filter(p => p.id !== fetchedPost.id).slice(0, 3));
        } else if (!fallbackPost) {
          setNotFound(true);
        }
      } catch (err) {
        console.error('Failed to fetch blog post:', err);
        // Keep using fallback data silently if available
        if (!fallbackPost) {
          setNotFound(true);
        }
      }
    };

    fetchPost();
  }, [slug, fallbackPost]);

  if (notFound || !post) {
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
            data-testid="back-to-blog-btn"
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

  return (
    <div className="blog-post-page" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <Header />

      {/* Article Content */}
      <article style={{
        background: '#FFFFFF',
        padding: '120px 24px 60px',
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

          {/* FAQs Section */}
          {post.faqs && post.faqs.length > 0 && (
            <div style={{
              marginTop: '60px',
              padding: '40px',
              background: '#F9FAFB',
              border: '1px solid rgba(0, 0, 0, 0.1)'
            }}>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '28px',
                fontWeight: '700',
                color: '#111111',
                marginBottom: '32px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <span style={{
                  width: '40px',
                  height: '40px',
                  background: 'rgba(212, 175, 55, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  color: '#D4AF37',
                  fontSize: '20px'
                }}>?</span>
                Frequently Asked Questions
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {post.faqs.map((faq, index) => (
                  <details
                    key={index}
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      padding: '0',
                      cursor: 'pointer'
                    }}
                    className="faq-item"
                  >
                    <summary style={{
                      padding: '20px 24px',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#111111',
                      listStyle: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '16px'
                    }}>
                      <span>{faq.question}</span>
                      <span className="faq-icon" style={{
                        color: '#D4AF37',
                        fontWeight: '700',
                        fontSize: '20px',
                        transition: 'transform 0.3s ease'
                      }}>+</span>
                    </summary>
                    <div style={{
                      padding: '0 24px 20px 24px',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '15px',
                      color: '#6B7280',
                      lineHeight: '1.7',
                      borderTop: '1px solid rgba(0, 0, 0, 0.05)'
                    }}>
                      <p style={{ marginTop: '16px' }}>{faq.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          )}

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
              data-testid="blog-cta-contact-btn"
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
        <section className="section-padding" style={{
          background: '#F9FAFB',
          padding: '60px 24px',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <div style={{ maxWidth: '1200px', width: '100%' }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(28px, 5vw, 42px)',
              fontWeight: '700',
              color: '#111111',
              marginBottom: '40px',
              textAlign: 'center',
              letterSpacing: '-0.8px'
            }}>
              Related Articles
            </h2>

            <div className="related-posts-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px'
            }}>
              {relatedPosts.map((relatedPost) => (
                <div
                  key={relatedPost.id}
                  data-testid={`related-post-${relatedPost.slug}`}
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
      <Footer />

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

          /* FAQ Styles */
          .faq-item summary::-webkit-details-marker {
            display: none;
          }
          
          .faq-item[open] summary .faq-icon {
            transform: rotate(45deg);
          }
          
          .faq-item summary:hover {
            background: rgba(212, 175, 55, 0.03);
          }
        `}
      </style>
    </div>
  );
};

export default BlogPost;
