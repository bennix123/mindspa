import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsResourcesOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const resourcesItems = [
    { name: 'Blogs', path: '/blogs' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Psychological Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
  ];

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="header__inner">
        <Link to="/" className="header__logo">
          <img src="/client-pic/logo.png" alt="Mind Spa" className="header__logo-img" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
          <div className="header__logo-text" style={{ display: 'flex' }}>
            <span className="logo-icon">🌿</span>
            <div>
              <span className="logo-mind">Mind</span>{' '}
              <span className="logo-spa">Spa</span>
            </div>
          </div>
        </Link>

        <nav className={`header__nav ${isMobileMenuOpen ? 'header__nav--open' : ''}`}>
          <Link to="/" className={`header__nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            Home
          </Link>

          <div
            className="header__nav-dropdown"
            onMouseEnter={() => setIsResourcesOpen(true)}
            onMouseLeave={() => setIsResourcesOpen(false)}
          >
            <button className="header__nav-link header__nav-link--dropdown">
              Resources
              <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor">
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </button>
            {isResourcesOpen && (
              <div className="header__dropdown-menu">
                {resourcesItems.map((item) => (
                  <Link key={item.path} to={item.path} className="header__dropdown-item">
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/about" className={`header__nav-link ${location.pathname === '/about' ? 'active' : ''}`}>
            About Us
          </Link>

          <Link to="/contact" className={`header__nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>
            Contact Us
          </Link>

          <Link to="/courses" className={`header__nav-link ${location.pathname === '/courses' ? 'active' : ''}`}>
            All Courses
          </Link>

          <span className="header__nav-link header__nav-link--announcement">
            Psychology of Self-Talk – Book Released!
          </span>
        </nav>

        <button
          className={`header__hamburger ${isMobileMenuOpen ? 'header__hamburger--active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
