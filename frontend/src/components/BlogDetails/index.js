// components/BlogDetail.js
import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css';

class BlogDetail extends React.Component {
  state = {
    post: null,
    loading: true,
    error: ''
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    try {
      const response = await fetch(`https://zuai-blogs-fullstack-2024-backend.onrender.com/posts/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch post');
      }
      const data = await response.json();
      this.setState({ post: data, loading: false });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  }

  deletePost = async () => {
    const { id } = this.props.match.params;
    const token = Cookies.get('jwtToken');

    try {
      const response = await fetch(`https://zuai-blogs-fullstack-2024-backend.onrender.com/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      alert('Post deleted successfully');
      this.props.history.push('/posts');
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    const { post, loading, error } = this.state;

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
        <Link to="/posts" className="btn btn-secondary">Back to Posts</Link>
        {Cookies.get('jwtToken') && (
          <button onClick={this.deletePost} className="btn btn-danger mt-3">Delete Post</button>
        )}
      </div>
    );
  }
}

export default BlogDetail;
