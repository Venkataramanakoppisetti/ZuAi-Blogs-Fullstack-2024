import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">Blog App</Link>
          <div className="collapse navbar-collapse justify-content-end">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/posts">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/new-post">New Post</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
