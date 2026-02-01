// Admin API service
const API_BASE = process.env.REACT_APP_BACKEND_URL;

// Get auth token from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem('adminToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Admin Login
export const adminLogin = async (email, password) => {
  const response = await fetch(`${API_BASE}/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Login failed');
  }

  const data = await response.json();
  localStorage.setItem('adminToken', data.token);
  localStorage.setItem('adminEmail', data.email);
  return data;
};

// Verify token
export const verifyToken = async () => {
  const token = localStorage.getItem('adminToken');
  if (!token) return false;

  try {
    const response = await fetch(`${API_BASE}/api/admin/verify`, {
      headers: { ...getAuthHeader() },
    });
    return response.ok;
  } catch {
    return false;
  }
};

// Logout
export const adminLogout = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminEmail');
};

// Get dashboard stats
export const getAdminStats = async () => {
  const response = await fetch(`${API_BASE}/api/admin/stats`, {
    headers: { ...getAuthHeader() },
  });

  if (!response.ok) throw new Error('Failed to fetch stats');
  return response.json();
};

// Contacts
export const getContacts = async () => {
  const response = await fetch(`${API_BASE}/api/admin/contacts`, {
    headers: { ...getAuthHeader() },
  });

  if (!response.ok) throw new Error('Failed to fetch contacts');
  return response.json();
};

export const updateContact = async (id, data) => {
  const response = await fetch(`${API_BASE}/api/admin/contacts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error('Failed to update contact');
  return response.json();
};

export const deleteContact = async (id) => {
  const response = await fetch(`${API_BASE}/api/admin/contacts/${id}`, {
    method: 'DELETE',
    headers: { ...getAuthHeader() },
  });

  if (!response.ok) throw new Error('Failed to delete contact');
  return response.json();
};

// Applications
export const getApplications = async () => {
  const response = await fetch(`${API_BASE}/api/admin/applications`, {
    headers: { ...getAuthHeader() },
  });

  if (!response.ok) throw new Error('Failed to fetch applications');
  return response.json();
};

export const updateApplication = async (id, data) => {
  const response = await fetch(`${API_BASE}/api/admin/applications/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error('Failed to update application');
  return response.json();
};

export const deleteApplication = async (id) => {
  const response = await fetch(`${API_BASE}/api/admin/applications/${id}`, {
    method: 'DELETE',
    headers: { ...getAuthHeader() },
  });

  if (!response.ok) throw new Error('Failed to delete application');
  return response.json();
};

// Blog
export const getAdminBlogPosts = async () => {
  const response = await fetch(`${API_BASE}/api/admin/blog`, {
    headers: { ...getAuthHeader() },
  });

  if (!response.ok) throw new Error('Failed to fetch blog posts');
  return response.json();
};

export const createBlogPost = async (postData) => {
  const response = await fetch(`${API_BASE}/api/admin/blog`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to create blog post');
  }
  return response.json();
};

export const updateBlogPost = async (slug, postData) => {
  const response = await fetch(`${API_BASE}/api/admin/blog/${slug}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to update blog post');
  }
  return response.json();
};

export const deleteBlogPost = async (slug) => {
  const response = await fetch(`${API_BASE}/api/admin/blog/${slug}`, {
    method: 'DELETE',
    headers: { ...getAuthHeader() },
  });

  if (!response.ok) throw new Error('Failed to delete blog post');
  return response.json();
};

// Files
export const getFiles = async () => {
  const response = await fetch(`${API_BASE}/api/admin/files`, {
    headers: { ...getAuthHeader() },
  });

  if (!response.ok) throw new Error('Failed to fetch files');
  return response.json();
};

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE}/api/admin/files/upload`, {
    method: 'POST',
    headers: { ...getAuthHeader() },
    body: formData,
  });

  if (!response.ok) throw new Error('Failed to upload file');
  return response.json();
};

export const deleteFile = async (filename) => {
  const response = await fetch(`${API_BASE}/api/admin/files/${filename}`, {
    method: 'DELETE',
    headers: { ...getAuthHeader() },
  });

  if (!response.ok) throw new Error('Failed to delete file');
  return response.json();
};

export const getFileUrl = (filename) => {
  return `${API_BASE}/api/files/${filename}`;
};
