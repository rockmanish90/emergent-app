import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Eye, X, Save } from 'lucide-react';
import { toast } from 'sonner';
import { getAdminBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost } from '../../../utils/adminApi';

const BlogTab = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    excerpt: '',
    content: '',
    author: 'Rushabh Ventures Team',
    category: '',
    image: '',
    read_time: '5 min read'
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await getAdminBlogPosts();
      setPosts(data);
    } catch (error) {
      toast.error('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Auto-generate slug from title
    if (name === 'title') {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.slug || !formData.content || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      if (editingPost) {
        await updateBlogPost(editingPost.slug, formData);
        toast.success('Blog post updated');
      } else {
        await createBlogPost(formData);
        toast.success('Blog post created');
      }
      setShowEditor(false);
      setEditingPost(null);
      resetForm();
      fetchPosts();
    } catch (error) {
      toast.error(error.message || 'Failed to save blog post');
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setFormData({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      category: post.category,
      image: post.image,
      read_time: post.read_time
    });
    setShowEditor(true);
  };

  const handleDelete = async (slug) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    
    try {
      await deleteBlogPost(slug);
      toast.success('Blog post deleted');
      fetchPosts();
    } catch (error) {
      toast.error('Failed to delete blog post');
    }
  };

  const resetForm = () => {
    setFormData({
      slug: '',
      title: '',
      excerpt: '',
      content: '',
      author: 'Rushabh Ventures Team',
      category: '',
      image: '',
      read_time: '5 min read'
    });
  };

  const openNewPost = () => {
    setEditingPost(null);
    resetForm();
    setShowEditor(true);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid rgba(212, 175, 55, 0.3)',
          borderTop: '3px solid #D4AF37',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
      </div>
    );
  }

  return (
    <div>
      {!showEditor ? (
        <>
          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '30px',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '28px',
                color: '#FFFFFF',
                marginBottom: '4px'
              }}>
                Blog CMS
              </h1>
              <p style={{ color: '#6B7280', fontSize: '14px' }}>
                {posts.length} blog posts
              </p>
            </div>

            <button
              onClick={openNewPost}
              data-testid="create-blog-btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                background: '#D4AF37',
                color: '#000000',
                border: 'none',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              <Plus size={18} />
              New Post
            </button>
          </div>

          {/* Posts Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {posts.map((post) => (
              <div
                key={post.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  overflow: 'hidden'
                }}
              >
                {post.image && (
                  <div style={{
                    height: '160px',
                    background: `url(${post.image}) center/cover`,
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                  }} />
                )}
                <div style={{ padding: '20px' }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: '600',
                    color: '#D4AF37',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    {post.category}
                  </span>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#FFFFFF',
                    margin: '8px 0 12px',
                    lineHeight: '1.4'
                  }}>
                    {post.title}
                  </h3>
                  <p style={{
                    fontSize: '13px',
                    color: '#6B7280',
                    marginBottom: '16px',
                    lineHeight: '1.5',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {post.excerpt}
                  </p>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '12px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    <span style={{ fontSize: '12px', color: '#6B7280' }}>
                      {post.date}
                    </span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <a
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          padding: '6px',
                          color: '#6B7280',
                          cursor: 'pointer'
                        }}
                        title="View"
                      >
                        <Eye size={16} />
                      </a>
                      <button
                        onClick={() => handleEdit(post)}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: '6px',
                          color: '#3B82F6',
                          cursor: 'pointer'
                        }}
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(post.slug)}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: '6px',
                          color: '#EF4444',
                          cursor: 'pointer'
                        }}
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* Editor */
        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '30px'
          }}>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '28px',
              color: '#FFFFFF'
            }}>
              {editingPost ? 'Edit Post' : 'New Post'}
            </h1>
            <button
              onClick={() => {
                setShowEditor(false);
                setEditingPost(null);
                resetForm();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
              Cancel
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '30px'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={labelStyle}>Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  style={inputStyle}
                  placeholder="Enter post title"
                />
              </div>
              <div>
                <label style={labelStyle}>Slug *</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  required
                  style={inputStyle}
                  placeholder="post-url-slug"
                  disabled={!!editingPost}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={labelStyle}>Category *</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  style={inputStyle}
                  placeholder="e.g., IPO Strategy"
                />
              </div>
              <div>
                <label style={labelStyle}>Author</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Read Time</label>
                <input
                  type="text"
                  name="read_time"
                  value={formData.read_time}
                  onChange={handleInputChange}
                  style={inputStyle}
                  placeholder="5 min read"
                />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>Featured Image URL</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                style={inputStyle}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>Excerpt</label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                rows={3}
                style={{ ...inputStyle, resize: 'vertical' }}
                placeholder="Brief description of the post..."
              />
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label style={labelStyle}>Content * (HTML supported)</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
                rows={15}
                style={{ ...inputStyle, resize: 'vertical', fontFamily: 'monospace' }}
                placeholder="<p>Your blog content here...</p>"
              />
            </div>

            <button
              type="submit"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 28px',
                background: '#D4AF37',
                color: '#000000',
                border: 'none',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              <Save size={18} />
              {editingPost ? 'Update Post' : 'Publish Post'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

const labelStyle = {
  display: 'block',
  fontSize: '12px',
  fontWeight: '600',
  color: '#9CA3AF',
  marginBottom: '8px',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
};

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  color: '#FFFFFF',
  fontSize: '14px',
  outline: 'none',
  boxSizing: 'border-box'
};

export default BlogTab;
