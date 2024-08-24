import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css';

class BlogForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      author: '', // Add author state
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, content, author } = this.state;

    // Retrieve the token from cookies
    const token = Cookies.get('jwtToken');

    fetch('https://zuai-blogs-fullstack-2024-backend.onrender.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Add the token here
      },
      body: JSON.stringify({ title, content, author }), // Include author in the request body
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) { 
          console.log('Success:', data);
          this.props.navigate('/'); // Navigate back to the home page after successful submission
        } else {
          console.error('Error:', data.error || 'Failed to create post');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="blog-form-container">
        <h2>Create a New Blog</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea
              name="content"
              value={this.state.content}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Author</label>
            <input
              type="text"
              name="author"
              value={this.state.author}
              onChange={this.handleChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

// Hook wrapper to replace withRouter functionality
export default function BlogFormWithHooks() {
  const navigate = useNavigate();
  return <BlogForm navigate={navigate} />;
}
