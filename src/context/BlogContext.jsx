import { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get();
      setBlogs(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const addBlog = async (blogData) => {
    try {
      const response = await axiosInstance.post('', blogData);
      setBlogs([...blogs, response.data]);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const updateBlog = async (id, blogData) => {
    try {
      const response = await axiosInstance.put(`/${id}`, blogData);
      setBlogs(blogs.map(blog => blog._id === id ? response.data : blog));
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const deleteBlog = async (id) => {
    try {
      await axiosInstance.delete(`/${id}`);
      setBlogs(blogs.filter(blog => blog._id !== id));
    } catch (err) {
      throw err;
    }
  };

  return (
    <BlogContext.Provider
      value={{
        blogs,
        loading,
        error,
        fetchBlogs,
        addBlog,
        updateBlog,
        deleteBlog,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within BlogProvider');
  }
  return context;
};
