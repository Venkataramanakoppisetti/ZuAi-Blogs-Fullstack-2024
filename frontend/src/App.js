import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import BlogDetails from './components/BlogDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/new-post" element={<BlogForm />} />
          <Route path="/posts/:id" element={<BlogDetails />} />
          <Route path="/posts" element={<BlogList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
