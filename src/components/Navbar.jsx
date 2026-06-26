import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase/firebase';
import './Navbar.css';
import logo from '../assets/logo.png';

function Navbar() {
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };

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
        <button className="login-btn" onClick={handleLogin}>Login</button>
        <button className="primary-btn" onClick={() => scrollTo('how-it-works')}>Get Started</button>
      </div>
    </nav>
  );
}

export default Navbar;