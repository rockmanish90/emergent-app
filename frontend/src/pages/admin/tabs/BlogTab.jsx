import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Trash2, Edit2, Eye, X, Save, Code, Type, Bold, Italic, Underline, 
  List, ListOrdered, Quote, Heading1, Heading2, Link, Image, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { toast } from 'sonner';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import LinkExtension from '@tiptap/extension-link';
import ImageExtension from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import UnderlineExtension from '@tiptap/extension-underline';
import { getAdminBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost } from '../../../utils/adminApi';

// Toolbar Button Component
const ToolbarButton = ({ onClick, isActive, children, title }) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    style={{
      padding: '8px',
      background: isActive ? 'rgba(212, 175, 55, 0.2)' : 'transparent',
      border: 'none',
      color: isActive ? '#D4AF37' : '#333',
      cursor: 'pointer',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s ease'
    }}
  >
    {children}
  </button>
);

// TipTap Editor with Toolbar
const RichTextEditor = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      LinkExtension.configure({
        openOnClick: false,
      }),
      ImageExtension,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      UnderlineExtension,
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    if (!editor) return;
    const url = window.prompt('Image URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!editor) return null;

  return (
    <div style={{ border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: '4px', overflow: 'hidden' }}>
      {/* Toolbar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2px',
        padding: '8px',
        background: '#f8f9fa',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
      }}>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive('heading', { level: 1 })}
          title="Heading 1"
        >
          <Heading1 size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
          title="Heading 2"
        >
          <Heading2 size={18} />
        </ToolbarButton>

        <div style={{ width: '1px', background: '#ddd', margin: '0 4px' }} />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          title="Bold"
        >
          <Bold size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          title="Italic"
        >
          <Italic size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive('underline')}
          title="Underline"
        >
          <Underline size={18} />
        </ToolbarButton>

        <div style={{ width: '1px', background: '#ddd', margin: '0 4px' }} />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          title="Bullet List"
        >
          <List size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          title="Numbered List"
        >
          <ListOrdered size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
          title="Quote"
        >
          <Quote size={18} />
        </ToolbarButton>

        <div style={{ width: '1px', background: '#ddd', margin: '0 4px' }} />

        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          isActive={editor.isActive({ textAlign: 'left' })}
          title="Align Left"
        >
          <AlignLeft size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          isActive={editor.isActive({ textAlign: 'center' })}
          title="Align Center"
        >
          <AlignCenter size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          isActive={editor.isActive({ textAlign: 'right' })}
          title="Align Right"
        >
          <AlignRight size={18} />
        </ToolbarButton>

        <div style={{ width: '1px', background: '#ddd', margin: '0 4px' }} />

        <ToolbarButton
          onClick={setLink}
          isActive={editor.isActive('link')}
          title="Add Link"
        >
          <Link size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={addImage}
          isActive={false}
          title="Add Image"
        >
          <Image size={18} />
        </ToolbarButton>
      </div>

      {/* Editor Content */}
      <EditorContent 
        editor={editor} 
        style={{
          minHeight: '350px',
          background: '#fff'
        }}
      />

      {/* Editor Styles */}
      <style>
        {`
          .tiptap {
            padding: 20px;
            min-height: 350px;
            outline: none;
            font-family: 'Inter', sans-serif;
            font-size: 16px;
            line-height: 1.8;
            color: #333;
          }
          .tiptap h1 {
            font-size: 2em;
            font-weight: 700;
            margin-bottom: 0.5em;
            color: #111;
          }
          .tiptap h2 {
            font-size: 1.5em;
            font-weight: 600;
            margin-bottom: 0.5em;
            color: #D4AF37;
          }
          .tiptap h3 {
            font-size: 1.25em;
            font-weight: 600;
            margin-bottom: 0.5em;
            color: #333;
          }
          .tiptap p {
            margin-bottom: 1em;
          }
          .tiptap ul, .tiptap ol {
            margin-bottom: 1em;
            padding-left: 1.5em;
          }
          .tiptap li {
            margin-bottom: 0.5em;
          }
          .tiptap li::marker {
            color: #D4AF37;
          }
          .tiptap blockquote {
            border-left: 4px solid #D4AF37;
            padding-left: 16px;
            margin: 1em 0;
            font-style: italic;
            color: #555;
          }
          .tiptap a {
            color: #D4AF37;
            text-decoration: underline;
          }
          .tiptap img {
            max-width: 100%;
            height: auto;
            margin: 1em 0;
          }
          .tiptap p.is-editor-empty:first-child::before {
            content: attr(data-placeholder);
            float: left;
            color: #adb5bd;
            pointer-events: none;
            height: 0;
          }
        `}
      </style>
    </div>
  );
};

const BlogTab = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [isHtmlMode, setIsHtmlMode] = useState(false);
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

  const handleContentChange = (value) => {
    setFormData(prev => ({ ...prev, content: value }));
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
      setIsHtmlMode(false);
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
    setIsHtmlMode(false);
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
    setIsHtmlMode(false);
    setShowEditor(true);
  };

  const toggleEditorMode = () => {
    setIsHtmlMode(!isHtmlMode);
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
                setIsHtmlMode(false);
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
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px'
              }}>
                <label style={{ ...labelStyle, marginBottom: 0 }}>Content *</label>
                <button
                  type="button"
                  onClick={toggleEditorMode}
                  data-testid="toggle-editor-mode"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    background: isHtmlMode ? 'rgba(212, 175, 55, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                    border: isHtmlMode ? '1px solid #D4AF37' : '1px solid rgba(255, 255, 255, 0.2)',
                    color: isHtmlMode ? '#D4AF37' : '#9CA3AF',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {isHtmlMode ? (
                    <>
                      <Type size={14} />
                      Switch to Rich Text
                    </>
                  ) : (
                    <>
                      <Code size={14} />
                      Switch to HTML
                    </>
                  )}
                </button>
              </div>

              {isHtmlMode ? (
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                  rows={20}
                  style={{ 
                    ...inputStyle, 
                    resize: 'vertical', 
                    fontFamily: "'Fira Code', 'Courier New', monospace",
                    fontSize: '13px',
                    lineHeight: '1.6'
                  }}
                  placeholder="<p>Your blog content here...</p>"
                />
              ) : (
                <RichTextEditor 
                  content={formData.content} 
                  onChange={handleContentChange}
                />
              )}
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
