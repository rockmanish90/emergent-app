import React, { useState, useEffect } from 'react';
import { Trash2, Edit2, Search, Filter, X, Check } from 'lucide-react';
import { toast } from 'sonner';
import { getContacts, updateContact, deleteContact } from '../../../utils/adminApi';

const ContactsTab = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editStatus, setEditStatus] = useState('');
  const [editNotes, setEditNotes] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const data = await getContacts();
      setContacts(data);
    } catch (error) {
      toast.error('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id) => {
    try {
      await updateContact(id, { status: editStatus, notes: editNotes });
      toast.success('Contact updated');
      setEditingId(null);
      fetchContacts();
    } catch (error) {
      toast.error('Failed to update contact');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) return;
    
    try {
      await deleteContact(id);
      toast.success('Contact deleted');
      fetchContacts();
    } catch (error) {
      toast.error('Failed to delete contact');
    }
  };

  const startEditing = (contact) => {
    setEditingId(contact.id);
    setEditStatus(contact.status || 'pending');
    setEditNotes(contact.notes || '');
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusOptions = ['pending', 'contacted', 'converted', 'rejected'];
  const statusColors = {
    pending: '#F59E0B',
    contacted: '#3B82F6',
    converted: '#10B981',
    rejected: '#EF4444'
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
            Contacts
          </h1>
          <p style={{ color: '#6B7280', fontSize: '14px' }}>
            {filteredContacts.length} total contacts
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {/* Search */}
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#6B7280'
            }} />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '10px 12px 10px 40px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
                fontSize: '14px',
                width: '220px',
                outline: 'none'
              }}
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '10px 12px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#FFFFFF',
              fontSize: '14px',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="all">All Status</option>
            {statusOptions.map(s => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Contacts Table */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        overflow: 'hidden'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <th style={{ ...thStyle }}>Name</th>
                <th style={{ ...thStyle }}>Company</th>
                <th style={{ ...thStyle }}>Contact</th>
                <th style={{ ...thStyle }}>Turnover</th>
                <th style={{ ...thStyle }}>Status</th>
                <th style={{ ...thStyle }}>Date</th>
                <th style={{ ...thStyle }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ ...tdStyle, textAlign: 'center', padding: '40px' }}>
                    No contacts found
                  </td>
                </tr>
              ) : (
                filteredContacts.map((contact) => (
                  <tr key={contact.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <td style={{ ...tdStyle, fontWeight: '500' }}>{contact.name}</td>
                    <td style={{ ...tdStyle }}>{contact.company_name}</td>
                    <td style={{ ...tdStyle }}>
                      <div>{contact.email || '-'}</div>
                      <div style={{ color: '#6B7280', fontSize: '12px' }}>{contact.mobile_number}</div>
                    </td>
                    <td style={{ ...tdStyle }}>{contact.annual_turnover ? `₹${contact.annual_turnover} Cr` : '-'}</td>
                    <td style={{ ...tdStyle }}>
                      {editingId === contact.id ? (
                        <select
                          value={editStatus}
                          onChange={(e) => setEditStatus(e.target.value)}
                          style={{
                            padding: '6px 10px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            color: '#FFFFFF',
                            fontSize: '13px',
                            outline: 'none'
                          }}
                        >
                          {statusOptions.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      ) : (
                        <span style={{
                          padding: '4px 12px',
                          background: `${statusColors[contact.status] || statusColors.pending}20`,
                          color: statusColors[contact.status] || statusColors.pending,
                          fontSize: '12px',
                          fontWeight: '600',
                          textTransform: 'uppercase'
                        }}>
                          {contact.status || 'pending'}
                        </span>
                      )}
                    </td>
                    <td style={{ ...tdStyle, color: '#6B7280', fontSize: '13px' }}>
                      {new Date(contact.created_at).toLocaleDateString()}
                    </td>
                    <td style={{ ...tdStyle }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {editingId === contact.id ? (
                          <>
                            <button
                              onClick={() => handleUpdateStatus(contact.id)}
                              style={{ ...actionBtnStyle, color: '#10B981' }}
                              title="Save"
                            >
                              <Check size={16} />
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              style={{ ...actionBtnStyle, color: '#EF4444' }}
                              title="Cancel"
                            >
                              <X size={16} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => startEditing(contact)}
                              style={{ ...actionBtnStyle, color: '#3B82F6' }}
                              title="Edit"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(contact.id)}
                              style={{ ...actionBtnStyle, color: '#EF4444' }}
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const thStyle = {
  padding: '16px',
  textAlign: 'left',
  color: '#9CA3AF',
  fontSize: '12px',
  fontWeight: '600',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
};

const tdStyle = {
  padding: '16px',
  color: '#FFFFFF',
  fontSize: '14px'
};

const actionBtnStyle = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '6px',
  opacity: 0.8,
  transition: 'opacity 0.2s'
};

export default ContactsTab;
