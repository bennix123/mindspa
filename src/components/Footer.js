import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const usefulLinks = [
    'Home',
    'About Us',
    'Blogs',
    'Testimonials',
    'Psychological Services',
    'Gallery',
    'All Courses',
    'Contact Us'
  ];

  const popularServices = [
    'Hypnotherapy',
    'Psycho-Kundali',
    'Chakra Healing',
    'Handwriting Analysis',
    'Life & Executive Coaching',
    'Stress & Anxiety Management',
    'Relationship Counseling',
    'Self Enhancement'
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Useful Links</h3>
            <ul>
              {usefulLinks.map((link, index) => (
                <li key={index}>
                  <a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}>{link}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-section">
            <h3>Popular Services</h3>
            <ul>
              {popularServices.map((service, index) => (
                <li key={index}>
                  <a href={`#${service.toLowerCase().replace(/\s+/g, '-')}`}>{service}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact Us</h3>
            <ul className="contact-info">
              <li>
                <strong>Address</strong><br />
                📍 Lucknow, Uttar Pradesh
              </li>
              <li>
                <strong>Phone</strong><br />
                📞 +91 7607588184<br />
                📞 +91 8840676202
              </li>
              <li>
                <strong>Email Address</strong><br />
                ✉️ mindspalko@gmail.com
              </li>
              <li>
                <strong>Business Hours</strong><br />
                MON to FRI: 8AM to 6PM<br />
                SAT: 9AM to 12PM
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-links">
            <a href="#privacy">Privacy Policy</a>
            <span>|</span>
            <a href="#refund">Refund & Cancellation Policy</a>
            <span>|</span>
            <a href="#terms">Terms of Service</a>
            <span>|</span>
            <Link to="/admin">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

