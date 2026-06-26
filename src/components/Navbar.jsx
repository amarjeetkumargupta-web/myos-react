import React from 'react';
import './Navbar.css';
import logo from '../assets/logo.png';

function Navbar() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="MYOS Logo" />
      </div>
      <ul className="nav-links">
        <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollTo('home'); }}>Home</a></li>
        <li><a href="#how-it-works" onClick={(e) => { e.preventDefault(); scrollTo('how-it-works'); }}>How It Works</a></li>
        <li><a href="#benefits" onClick={(e) => { e.preventDefault(); scrollTo('benefits'); }}>Benefits</a></li>
        <li><a href="#faq" onClick={(e) => { e.preventDefault(); scrollTo('faq'); }}>FAQ</a></li>
      </ul>
      <div className="nav-buttons">
        <button className="login-btn" onClick={() => alert('Login page coming soon!')}>Login</button>
        <button className="primary-btn" onClick={() => scrollTo('pricing')}>Get Started</button>
      </div>
    </nav>
  );
}

export default Navbar;