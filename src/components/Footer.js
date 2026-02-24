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
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-social-icon" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="footer-social-icon" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="footer-social-icon" aria-label="YouTube">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor"/></svg>
                </a>
                <a href="https://wa.me/917607588184" target="_blank" rel="noreferrer" className="footer-social-icon" aria-label="WhatsApp">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                </a>
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
