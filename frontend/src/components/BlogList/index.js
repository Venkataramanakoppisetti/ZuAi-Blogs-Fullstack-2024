import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

class BlogList extends React.Component {
  state = {
    posts: [],
    loading: true,
    error: '',
  };

  async componentDidMount() {
    try {
      const response = await fetch('https://zuai-blogs-fullstack-2024-backend.onrender.com/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      this.setState({ posts: data, loading: false });
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
      <div className="blog-list">
        <h2>Blog Posts</h2>
        <Link to="/posts/new" className="btn btn-primary">Add New Post</Link>
        <ul className="list-group">
          {posts.map(post => (
            <li key={post.id} className="list-group-item">
              <Link to={`/posts/${post.id}`} className="post-link">
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default BlogList;
