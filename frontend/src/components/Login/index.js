// components/Login.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css';

class Login extends React.Component {
  state = {
    username: '',
    password: '',
    error: '',
    isLoggedIn: false
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    
    if (!username || !password) {
      this.setState({ error: 'Username and password are required' });
      return;
    }

    try {
      const response = await fetch('https://zuai-blogs-fullstack-2024-backend.onrender.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        const data = await response.json();
        this.setState({ error: data.error });
        return;
      }

      const { token } = await response.json();
      Cookies.set('jwtToken', token, { expires: 60 }); // Cookie expires in 60 days
      this.setState({ isLoggedIn: true });
    } catch (error) {
      this.setState({ error: 'An error occurred. Please try again.' });
    }
  };

  render() {
    const { isLoggedIn, error } = this.state;
    
    if (isLoggedIn) {
      return <Navigate to="/posts" />;
    }

    return (
      <div className="login-container">
        <h2>Login</h2>
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
          <button type="submit" className="btn btn-primary">Login</button>
          <p className="mt-3">
            Not registered? <a href="/register">Register here</a>
          </p>
        </form>
      </div>
    );
  }
}

export default Login;
