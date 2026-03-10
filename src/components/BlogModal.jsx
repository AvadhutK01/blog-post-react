import { useState, useEffect } from 'react';
import { Portal } from './Portal';
import '../styles/BlogModal.css';

export const BlogModal = ({ isOpen, onClose, onSubmit, blog = null }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (blog) {
      setTitle(blog.title || '');
      setContent(blog.content || '');
      setAuthor(blog.author || '');
    } else {
      setTitle('');
      setContent('');
      setAuthor('');
    }
    setError('');
  }, [blog, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim() || !author.trim()) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    try {
      await onSubmit({ title: title.trim(), content: content.trim(), author: author.trim() });
      setTitle('');
      setContent('');
      setAuthor('');
      setError('');
      onClose();
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const isEditing = !!blog;

  return (
    <Portal>
      <div className="blog-modal-overlay" onClick={onClose}>
        <div className="blog-modal" onClick={(e) => e.stopPropagation()}>
          <div className="blog-modal-header">
            <h2>{isEditing ? 'Edit Blog Post' : 'Add New Blog Post'}</h2>
            <button className="blog-modal-close" onClick={onClose}>
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="blog-modal-form">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter blog title"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input
                id="author"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter author name"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter blog content"
                rows="6"
                disabled={loading}
              />
            </div>

            {error && <div className="form-error">{error}</div>}

            <div className="blog-modal-actions">
              <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Loading...' : isEditing ? 'Update' : 'Post'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Portal>
  );
};
