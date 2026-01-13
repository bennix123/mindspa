import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', href: '#home', stacked: false },
    { name: 'About Us', href: '#about', stacked: true, line1: 'About', line2: 'Us' },
    { name: 'Resources', href: '#resources', stacked: false },
    { name: 'Blogs', href: '#blog', stacked: false },
    { name: 'Testimonials', href: '#testimonials', stacked: false },
    { name: 'Psychological Services', href: '#services', stacked: true, line1: 'Psychological', line2: 'Services' },
    { name: 'Gallery', href: '#gallery', stacked: false },
    { name: 'Contact Us', href: '#contact', stacked: true, line1: 'Contact', line2: 'Us' },
  ];

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <h2>
              <span className="logo-mind">Mind</span>
              <span className="logo-spa">spa</span>
            </h2>
          </div>
          
          <nav className={`nav ${isMobileMenuOpen ? 'open' : ''}`}>
            <ul className="nav-list">
              {menuItems.slice(0, -1).map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href} 
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMobileMenuOpen(false);
                      const element = document.querySelector(item.href);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className={item.stacked ? 'stacked-link' : ''}
                  >
                    {item.stacked ? (
                      <>
                        <span className="nav-line-1">{item.line1}</span>
                        <span className="nav-line-2">{item.line2}</span>
                      </>
                    ) : (
                      item.name
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header-actions">
            <div className="contact-info">
              <a 
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.querySelector('#contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="contact-link stacked-link"
              >
                <span className="nav-line-1">Contact</span>
                <span className="nav-line-2">Us</span>
              </a>
              <div className="phone">
                <span>+91 7607588184</span>
              </div>
            </div>
            <button 
              className="btn btn-primary header-quote-btn"
              onClick={() => {
                const element = document.querySelector('#contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <span className="quote-line-1">GET A</span>
              <span className="quote-line-2">QUOTE</span>
            </button>
            <button 
              className="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

