import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, FileText, FolderOpen, LogOut, 
  Mail, Briefcase, Clock, ChevronRight, Menu, X
} from 'lucide-react';
import { toast } from 'sonner';
import { verifyToken, adminLogout, getAdminStats } from '../../utils/adminApi';

// Import tab components
import ContactsTab from './tabs/ContactsTab';
import ApplicationsTab from './tabs/ApplicationsTab';
import BlogTab from './tabs/BlogTab';
import FilesTab from './tabs/FilesTab';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await verifyToken();
      if (!isValid) {
        navigate('/admin');
        return;
      }
      fetchStats();
    };
    checkAuth();
  }, [navigate]);

  const fetchStats = async () => {
    try {
      const data = await getAdminStats();
      setStats(data);
    } catch (error) {
      toast.error('Failed to load dashboard stats');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    adminLogout();
    toast.success('Logged out successfully');
    navigate('/admin');
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'applications', label: 'Applications', icon: Briefcase },
    { id: 'contacts', label: 'Contacts', icon: Users },
    { id: 'blog', label: 'Blog CMS', icon: FileText },
    { id: 'files', label: 'File Manager', icon: FolderOpen },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab stats={stats} loading={loading} setActiveTab={setActiveTab} />;
      case 'contacts':
        return <ContactsTab />;
      case 'applications':
        return <ApplicationsTab />;
      case 'blog':
        return <BlogTab />;
      case 'files':
        return <FilesTab />;
      default:
        return <OverviewTab stats={stats} loading={loading} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f1419',
      fontFamily: "'Inter', sans-serif",
      display: 'flex'
    }}>
      {/* Mobile Header */}
      <div className="mobile-admin-header" style={{
        display: 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '60px',
        background: '#0A192F',
        borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
        zIndex: 100,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px'
      }}>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '20px',
          color: '#D4AF37',
          margin: 0
        }}>
          RUSHABH
        </h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: '#D4AF37',
            cursor: 'pointer'
          }}
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`} style={{
        width: '260px',
        background: '#0A192F',
        borderRight: '1px solid rgba(212, 175, 55, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        height: '100vh',
        zIndex: 99
      }}>
        {/* Logo */}
        <div style={{
          padding: '30px 24px',
          borderBottom: '1px solid rgba(212, 175, 55, 0.15)'
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
            fontSize: '11px',
            color: '#6B7280',
            letterSpacing: '2px',
            textTransform: 'uppercase'
          }}>
            Admin Panel
          </span>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '20px 12px' }}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSidebarOpen(false);
                }}
                data-testid={`admin-tab-${tab.id}`}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 16px',
                  background: isActive ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                  border: 'none',
                  borderLeft: isActive ? '3px solid #D4AF37' : '3px solid transparent',
                  color: isActive ? '#D4AF37' : '#9CA3AF',
                  fontSize: '14px',
                  fontWeight: isActive ? '600' : '400',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'left',
                  marginBottom: '4px'
                }}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div style={{
          padding: '20px 12px',
          borderTop: '1px solid rgba(212, 175, 55, 0.15)'
        }}>
          <button
            onClick={handleLogout}
            data-testid="admin-logout-btn"
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px 16px',
              background: 'transparent',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#EF4444',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{
        flex: 1,
        marginLeft: '260px',
        padding: '30px',
        minHeight: '100vh'
      }} className="admin-main-content">
        {renderTabContent()}
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 98,
            display: 'none'
          }}
          className="mobile-overlay"
        />
      )}

      {/* Responsive Styles */}
      <style>
        {`
          @media (max-width: 900px) {
            .mobile-admin-header {
              display: flex !important;
            }
            .admin-sidebar {
              transform: translateX(-100%);
              transition: transform 0.3s ease;
            }
            .admin-sidebar.open {
              transform: translateX(0);
            }
            .admin-main-content {
              margin-left: 0 !important;
              padding-top: 80px !important;
            }
            .mobile-overlay {
              display: block !important;
            }
          }
        `}
      </style>
    </div>
  );
};

// Overview Tab Component
const OverviewTab = ({ stats, loading, setActiveTab }) => {
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
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const statCards = [
    { 
      label: 'Total Applications', 
      value: stats?.applications?.total || 0,
      pending: stats?.applications?.pending || 0,
      icon: Briefcase,
      color: '#D4AF37',
      tab: 'applications'
    },
    { 
      label: 'Total Contacts', 
      value: stats?.contacts?.total || 0,
      pending: stats?.contacts?.pending || 0,
      icon: Mail,
      color: '#10B981',
      tab: 'contacts'
    },
    { 
      label: 'Blog Posts', 
      value: stats?.blog_posts || 0,
      icon: FileText,
      color: '#3B82F6',
      tab: 'blog'
    },
    { 
      label: 'Uploaded Files', 
      value: stats?.files || 0,
      icon: FolderOpen,
      color: '#8B5CF6',
      tab: 'files'
    },
  ];

  return (
    <div>
      <h1 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '32px',
        color: '#FFFFFF',
        marginBottom: '8px'
      }}>
        Dashboard Overview
      </h1>
      <p style={{ color: '#6B7280', marginBottom: '40px' }}>
        Welcome back! Here's what's happening with your website.
      </p>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '24px',
        marginBottom: '40px'
      }}>
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              onClick={() => setActiveTab(card.tab)}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '24px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = card.color;
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: `${card.color}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '8px'
                }}>
                  <Icon size={24} color={card.color} />
                </div>
                <ChevronRight size={20} color="#6B7280" />
              </div>
              <div style={{
                fontSize: '36px',
                fontWeight: '700',
                color: '#FFFFFF',
                marginBottom: '4px'
              }}>
                {card.value}
              </div>
              <div style={{
                fontSize: '14px',
                color: '#9CA3AF'
              }}>
                {card.label}
              </div>
              {card.pending !== undefined && card.pending > 0 && (
                <div style={{
                  marginTop: '8px',
                  fontSize: '12px',
                  color: '#F59E0B',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <Clock size={14} />
                  {card.pending} pending
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '24px'
      }}>
        {/* Recent Applications */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '24px'
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#FFFFFF',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Briefcase size={18} color="#D4AF37" />
            Recent Applications
          </h3>
          {stats?.recent_applications?.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {stats.recent_applications.map((app, i) => (
                <div key={i} style={{
                  padding: '12px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderLeft: '3px solid #D4AF37'
                }}>
                  <div style={{ color: '#FFFFFF', fontWeight: '500', marginBottom: '4px' }}>
                    {app.company_name}
                  </div>
                  <div style={{ color: '#6B7280', fontSize: '13px' }}>
                    {app.name} • ₹{app.annual_turnover} Cr
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: '#6B7280', fontSize: '14px' }}>No recent applications</p>
          )}
        </div>

        {/* Recent Contacts */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '24px'
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#FFFFFF',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Mail size={18} color="#10B981" />
            Recent Contacts
          </h3>
          {stats?.recent_contacts?.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {stats.recent_contacts.map((contact, i) => (
                <div key={i} style={{
                  padding: '12px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderLeft: '3px solid #10B981'
                }}>
                  <div style={{ color: '#FFFFFF', fontWeight: '500', marginBottom: '4px' }}>
                    {contact.name}
                  </div>
                  <div style={{ color: '#6B7280', fontSize: '13px' }}>
                    {contact.company_name} • {contact.email || contact.mobile_number}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: '#6B7280', fontSize: '14px' }}>No recent contacts</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
