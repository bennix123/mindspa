import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const usefulLinks = [
    { label: 'Home',         href: '#home' },
    { label: 'About Us',     href: '#about' },
    { label: 'Blogs',        href: '#blog' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Gallery',      href: '#gallery' },
    { label: 'Contact Us',   href: '#contact' },
  ];

  const popularServices = [
    'Hypnotherapy',
    'Psycho-Kundali',
    'Chakra Healing',
    'Handwriting Analysis',
    'Life & Executive Coaching',
    'Stress & Anxiety Management',
    'Relationship Counseling',
    'Self Enhancement',
  ];

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      {/* CTA Top band */}
      <div className="footer-top">
        <div className="container">
          <div className="footer-top-inner">
            <div>
              <h3 className="footer-cta-title">Ready to Transform Your Life?</h3>
              <p className="footer-cta-sub">Start your journey with a free consultation today.</p>
            </div>
            <button
              className="btn btn-primary footer-cta-btn"
              onClick={() => scrollTo('#contact')}
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>

      {/* Main columns */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-content">

            {/* Brand */}
            <div className="footer-section footer-brand">
              <div className="footer-logo">
                <span className="footer-logo-mind">Mind</span>
                <span className="footer-logo-spa">spa</span>
              </div>
              <p className="footer-brand-desc">
                A team of certified psychologists dedicated to your mental and emotional
                well-being — without stigma or judgment.
              </p>
              <div className="footer-socials">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-social-icon" aria-label="Instagram">📸</a>
                <a href="https://facebook.com"  target="_blank" rel="noreferrer" className="footer-social-icon" aria-label="Facebook">👥</a>
                <a href="https://youtube.com"   target="_blank" rel="noreferrer" className="footer-social-icon" aria-label="YouTube">▶️</a>
                <a href="https://wa.me/917607588184" target="_blank" rel="noreferrer" className="footer-social-icon" aria-label="WhatsApp">💬</a>
              </div>
            </div>

            {/* Useful Links */}
            <div className="footer-section">
              <h4 className="footer-heading">Useful Links</h4>
              <ul className="footer-links-list">
                {usefulLinks.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    >
                      <span className="footer-link-arrow">›</span> {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="footer-section">
              <h4 className="footer-heading">Our Services</h4>
              <ul className="footer-links-list">
                {popularServices.map((s, i) => (
                  <li key={i}>
                    <a
                      href="#services"
                      onClick={(e) => { e.preventDefault(); scrollTo('#services'); }}
                    >
                      <span className="footer-link-arrow">›</span> {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-section">
              <h4 className="footer-heading">Contact Info</h4>
              <ul className="footer-contact-list">
                <li>
                  <span className="footer-contact-icon">📍</span>
                  <span>Lucknow, Uttar Pradesh</span>
                </li>
                <li>
                  <span className="footer-contact-icon">📞</span>
                  <span>+91 7607588184<br />+91 8840676202</span>
                </li>
                <li>
                  <span className="footer-contact-icon">✉️</span>
                  <span>mindspalko@gmail.com</span>
                </li>
                <li>
                  <span className="footer-contact-icon">⏰</span>
                  <span>Mon–Fri: 8AM–6PM<br />Sat: 9AM–12PM</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-inner">
            <p className="footer-copy">© {new Date().getFullYear()} MindSpa. All rights reserved.</p>
            <div className="footer-legal-links">
              <a href="#privacy">Privacy Policy</a>
              <span>|</span>
              <a href="#refund">Refund Policy</a>
              <span>|</span>
              <a href="#terms">Terms of Service</a>
              <span>|</span>
              <Link to="/admin">Admin</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
