export const BlogCard = ({ blog, onEdit, onDelete }) => {
  return (
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
        <button className="btn btn-secondary" onClick={() => onEdit(blog)}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(blog)}>
          Delete
        </button>
      </div>
    </article>
  );
};
