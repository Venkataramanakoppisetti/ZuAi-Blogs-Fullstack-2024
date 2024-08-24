// components/BlogDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css';

function BlogDetails() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();  // Access URL parameters
  const navigate = useNavigate();  // For navigation

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`https://zuai-blogs-fullstack-2024-backend.onrender.com/posts/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPost({
          title: data.post.post_title,
          content: data.post.post_content,
          author: data.post.post_author,
          created_at: data.post.post_created_at
        });
        setLoading(false);
      } catch (error) {
        console.error('Fetch error:', error); // Log the error to the console
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const deletePost = async () => {
    const token = Cookies.get('jwtToken');

    try {
      const response = await fetch(`https://zuai-blogs-fullstack-2024-backend.onrender.com/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert('Post deleted successfully');
      navigate('/posts');  // Navigate to posts page
    } catch (error) {
      console.error('Delete error:', error); // Log the error to the console
      alert(error.message);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="blog-detail">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p><strong>Author:</strong> {post.author}</p>
      <p><strong>Created At:</strong> {new Date(post.created_at).toLocaleDateString()}</p>
      <Link to="/posts" className="btn btn-secondary">Back to Posts</Link>
      {Cookies.get('jwtToken') && (
        <button onClick={deletePost} className="btn btn-danger mt-3">Delete Post</button>
      )}
    </div>
  );
}

export default BlogDetails;
