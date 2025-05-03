import React from "react";
import "./Footer.css";

const Footer = () => {
    return (
<footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: sanug2020@gmail.com</p>
          <p>Phone: +94 (763) 456-759</p>
          <p>Address: 1/25, Colombo RD, Kollupitiya</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Emergency</a></li>
          </ul>
        </div>

        {/* Support Form Link */}
        <div className="footer-section">
          <h3>Support</h3>
          <p>Need help? <a href="/support">Visit our Support Center</a></p>
        </div>

        {/* Social Media Links */}
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>© 2025 VetPlatform. All Rights Reserved.</p>
      </div>
    </footer>
    );
};

export default Footer;
