// components/Register.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import './index.css';

class Register extends React.Component {
  state = {
    username: '',
    password: '',
    confirmPassword: '',
    error: '',
    isRegistered: false
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password, confirmPassword } = this.state;
    
    if (!username || !password || !confirmPassword) {
      this.setState({ error: 'All fields are required' });
      return;
    }

    if (password !== confirmPassword) {
      this.setState({ error: 'Passwords do not match' });
      return;
    }

    try {
      const response = await fetch('https://zuai-blogs-fullstack-2024-backend.onrender.com/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        const data = await response.json();
        this.setState({ error: data.error });
        return;
      }

      this.setState({ isRegistered: true });
    } catch (error) {
      this.setState({ error: 'An error occurred. Please try again.' });
    }
  };

  render() {
    const { isRegistered, error } = this.state;
    
    if (isRegistered) {
      return <Navigate to="/login" />;
    }

    return (
      <div className="register-container">
        <h2>Register</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-control"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="form-control"
              onChange={this.handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Register</button>
          <p className="mt-3">
            Already registered? <a href="/login">Login here</a>
          </p>
        </form>
      </div>
    );
  }
}

export default Register;
