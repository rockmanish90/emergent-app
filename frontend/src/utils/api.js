// API service for Rushabh Ventures
const API_BASE = process.env.REACT_APP_BACKEND_URL;

// Contact form submission
export const submitContact = async (formData) => {
  const response = await fetch(`${API_BASE}/api/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: formData.name,
      company_name: formData.companyName,
      annual_turnover: formData.annualTurnover || null,
      mobile_number: formData.mobileNumber,
      email: formData.email || null,
      message: formData.message || null,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to submit contact form');
  }

  return response.json();
};

// Application form submission (homepage IPO form)
export const submitApplication = async (formData) => {
  const response = await fetch(`${API_BASE}/api/application`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: formData.name,
      company_name: formData.companyName,
      annual_turnover: formData.annualTurnover,
      mobile_number: formData.mobileNumber,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to submit application');
  }

  const data = await response.json();
  return {
    success: true,
    message: 'Your application has been received. Our team will contact you within 48 hours.',
    data: data,
  };
};

// Blog API functions
export const getBlogPosts = async () => {
  const response = await fetch(`${API_BASE}/api/blog`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch blog posts');
  }

  const posts = await response.json();
  
  // Transform to match frontend expected format
  return posts.map(post => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    author: post.author,
    date: post.date,
    readTime: post.read_time,
    category: post.category,
    image: post.image,
  }));
};

export const getBlogBySlug = async (slug) => {
  const response = await fetch(`${API_BASE}/api/blog/${slug}`);
  
  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch blog post');
  }

  const post = await response.json();
  
  // Transform to match frontend expected format
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    author: post.author,
    date: post.date,
    readTime: post.read_time,
    category: post.category,
    image: post.image,
  };
};
