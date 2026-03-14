import { useState } from 'react';
import { useBlog } from '../context/BlogContext';
import { BlogModal } from './BlogModal';
import { ConfirmationModal } from './ConfirmationModal';
import '../styles/BlogList.css';

export const BlogList = () => {
  const { blogs, loading, error, addBlog, updateBlog, deleteBlog } = useBlog();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleAddClick = () => {
    setEditingBlog(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (blog) => {
    setEditingBlog(blog);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingBlog(null);
  };

  const handleModalSubmit = async (formData) => {
    if (editingBlog) {
      await updateBlog(editingBlog._id, formData);
    } else {
      await addBlog(formData);
    }
  };

  const handleDeleteClick = (blog) => {
    setBlogToDelete(blog);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    setDeleteLoading(true);
    try {
      await deleteBlog(blogToDelete._id);
      setIsConfirmOpen(false);
      setBlogToDelete(null);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmOpen(false);
    setBlogToDelete(null);
  };

  return (
    <div className="blog-page">
      <div className="blog-list-header">
        <h1>Blog Posts</h1>
        <button className="btn btn-primary btn-add" onClick={handleAddClick}>
          + Add New Blog
        </button>
      </div>

      {loading ? (
        <p className="loading">Loading blogs...</p>
      ) : error ? (
        <p className="error">Error: {error}</p>
      ) : blogs.length === 0 ? (
        <div className="blog-list-empty">
          <p>No blog posts yet. Create your first one!</p>
        </div>
      ) : (
        <div className="blog-list-container">
          <div className="blog-list">
            {blogs.map((blog) => (
              <article key={blog._id} className="blog-card">
                {blog.imageUrl && (
                  <div className="blog-card-image">
                    <img src={blog.imageUrl} alt={blog.title} />
                  </div>
                )}
                <div className="blog-card-header">
                  <h2 className="blog-card-title">{blog.title}</h2>
                </div>
                <p className="blog-card-author">By {blog.author}</p>
                <p className="blog-card-content">{blog.content}</p>
                <div className="blog-card-actions">
                  <button className="btn btn-secondary" onClick={() => handleEditClick(blog)}>
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDeleteClick(blog)}>
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      <BlogModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        blog={editingBlog}
      />

      <ConfirmationModal
        isOpen={isConfirmOpen}
        title="Delete Blog Post"
        message={`Are you sure you want to delete "${blogToDelete?.title}"? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmText={deleteLoading ? 'Deleting...' : 'Delete'}
        cancelText="Cancel"
      />
    </div>
  );
};