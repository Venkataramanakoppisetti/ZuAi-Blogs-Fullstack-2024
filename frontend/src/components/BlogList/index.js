import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer';
import './index.css';
import Cookies from 'js-cookie'; // Ensure you have js-cookie installed

class BlogList extends React.Component {
  state = {
    posts: [],
    loading: true,
    error: '',
  };

  async componentDidMount() {
    try {
      const token = Cookies.get('jwtToken'); // Retrieve token from cookies
      const response = await fetch('https://zuai-blogs-fullstack-2024-backend.onrender.com/posts', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include' 
      });

      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }

      const data = await response.json();
      this.setState({ posts: data.posts, loading: false });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  }

  render() {
    const { posts, loading, error } = this.state;

    if (loading) {
      return <div className="loading">Loading...</div>;
    }

    if (error) {
      return <div className="error">Failed to fetch posts: {error}</div>;
    }

    if (posts.length === 0) {
      return (
        <div className="no-posts">
          <img src="https://res.cloudinary.com/dyoatejew/image/upload/v1724487033/no-data-image_iori8i.jpg" alt="No posts found" />
          <p>No posts available at the moment.</p>
        </div>
      );
    }

    return (
      <>
        <div className="blog-list">
          <h2>Blog Posts</h2>
          <Link to="/posts/new" className="btn btn-primary">Add New Post</Link>
          <ul className="list-group">
            {posts.map(post => (
              <li key={post.post_id} className="list-group-item">
                <Link to={`/posts/${post.post_id}`} className="post-link">
                  {post.post_title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Footer />
      </>
    );
  }
}

export default BlogList;
