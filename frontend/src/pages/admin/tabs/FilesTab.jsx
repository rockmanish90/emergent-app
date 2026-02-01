import React, { useState, useEffect, useRef } from 'react';
import { Upload, Trash2, Download, Copy, File, Image, FileText, Search, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { getFiles, uploadFile, deleteFile, getFileUrl } from '../../../utils/adminApi';

const FilesTab = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const data = await getFiles();
      setFiles(data);
    } catch (error) {
      toast.error('Failed to load files');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length === 0) return;

    setUploading(true);
    
    for (const file of selectedFiles) {
      try {
        await uploadFile(file);
        toast.success(`Uploaded: ${file.name}`);
      } catch (error) {
        toast.error(`Failed to upload: ${file.name}`);
      }
    }

    setUploading(false);
    fetchFiles();
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDelete = async (filename) => {
    if (!window.confirm('Are you sure you want to delete this file?')) return;
    
    try {
      await deleteFile(filename);
      toast.success('File deleted');
      fetchFiles();
    } catch (error) {
      toast.error('Failed to delete file');
    }
  };

  const copyUrl = (filename) => {
    const url = getFileUrl(filename);
    navigator.clipboard.writeText(url);
    toast.success('URL copied to clipboard');
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'image': return <Image size={24} color="#10B981" />;
      case 'document': return <FileText size={24} color="#3B82F6" />;
      default: return <File size={24} color="#6B7280" />;
    }
  };

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || file.type === typeFilter;
    return matchesSearch && matchesType;
  });

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
            File Manager
          </h1>
          <p style={{ color: '#6B7280', fontSize: '14px' }}>
            {filteredFiles.length} files
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={fetchFiles}
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
            <RefreshCw size={16} />
            Refresh
          </button>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            multiple
            style={{ display: 'none' }}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            data-testid="upload-file-btn"
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
              cursor: uploading ? 'not-allowed' : 'pointer',
              opacity: uploading ? 0.7 : 1
            }}
          >
            <Upload size={18} />
            {uploading ? 'Uploading...' : 'Upload Files'}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '24px',
        flexWrap: 'wrap'
      }}>
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
            placeholder="Search files..."
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

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
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
          <option value="all">All Types</option>
          <option value="image">Images</option>
          <option value="document">Documents</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Files Grid */}
      {filteredFiles.length === 0 ? (
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '60px',
          textAlign: 'center'
        }}>
          <Upload size={48} color="#6B7280" style={{ marginBottom: '16px' }} />
          <p style={{ color: '#6B7280', fontSize: '16px', marginBottom: '8px' }}>
            No files uploaded yet
          </p>
          <p style={{ color: '#4B5563', fontSize: '14px' }}>
            Click "Upload Files" to get started
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          {filteredFiles.map((file) => (
            <div
              key={file.name}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                overflow: 'hidden'
              }}
            >
              {/* Preview */}
              <div style={{
                height: '140px',
                background: '#0A192F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}>
                {file.type === 'image' ? (
                  <img
                    src={getFileUrl(file.name)}
                    alt={file.name}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain'
                    }}
                  />
                ) : (
                  getFileIcon(file.type)
                )}
              </div>

              {/* Info */}
              <div style={{ padding: '16px' }}>
                <h4 style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#FFFFFF',
                  marginBottom: '8px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {file.name}
                </h4>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  color: '#6B7280',
                  fontSize: '12px',
                  marginBottom: '12px'
                }}>
                  <span>{formatFileSize(file.size)}</span>
                  <span>{new Date(file.created_at).toLocaleDateString()}</span>
                </div>

                {/* Actions */}
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  paddingTop: '12px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <button
                    onClick={() => copyUrl(file.name)}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      padding: '8px',
                      background: 'rgba(59, 130, 246, 0.1)',
                      border: 'none',
                      color: '#3B82F6',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                    title="Copy URL"
                  >
                    <Copy size={14} />
                    Copy URL
                  </button>
                  <a
                    href={getFileUrl(file.name)}
                    download
                    style={{
                      padding: '8px 12px',
                      background: 'rgba(16, 185, 129, 0.1)',
                      color: '#10B981',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    title="Download"
                  >
                    <Download size={14} />
                  </a>
                  <button
                    onClick={() => handleDelete(file.name)}
                    style={{
                      padding: '8px 12px',
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: 'none',
                      color: '#EF4444',
                      cursor: 'pointer'
                    }}
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilesTab;
