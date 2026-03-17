import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import axiosInstance from '../api/axiosInstance';

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogs = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const addBlog = useCallback(async (blogData) => {
    try {
      const response = await axiosInstance.post('', blogData);
      setBlogs((prev) => [...prev, response.data]);
      return response.data;
    } catch (err) {
      throw err;
    }
  }, []);

  const updateBlog = useCallback(async (id, blogData) => {
    try {
      const response = await axiosInstance.put(`/${id}`, blogData);
      setBlogs((prev) =>
        prev.map((blog) =>
          blog._id === id ? { ...blog, ...blogData, ...response.data } : blog
        )
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }, []);

  const deleteBlog = useCallback(async (id) => {
    try {
      await axiosInstance.delete(`/${id}`);
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
    } catch (err) {
      throw err;
    }
  }, []);

  const contextValue = useMemo(
    () => ({ blogs, loading, error, fetchBlogs, addBlog, updateBlog, deleteBlog }),
    [blogs, loading, error, fetchBlogs, addBlog, updateBlog, deleteBlog]
  );

  return (
    <BlogContext.Provider value={contextValue}>
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
