import React from 'react';
import './Footer.css';
import logo from '../assets/logo.png';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <img src={logo} alt="MYOS Logo" className="footer-logo" />
          <p>MYOS (Make Your Own School) empowers parents to design personalized educational experiences while we manage operations and infrastructure.</p>
        </div>
        <div className="footer-column">
          <h3>Company</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Our Vision</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Resources</h3>
          <ul>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Parent Guide</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Support</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Connect</h3>
          <ul>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">LinkedIn</a></li>
            <li><a href="#">YouTube</a></li>
            <li><a href="#">Email Us</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 MYOS — Make Your Own School. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
export default Footer;