import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLMS } from '../context/LMSContext';
import './Header.css';

const NAV = [
  {
    label: 'About Us',
    path: '/about',
    items: [
      { label: 'Our Team', path: '/about#team' },
      { label: 'Our Space', path: '/about#space' },
      { label: 'Gallery', path: '/gallery' },
      { label: 'Awards & Certificates', path: '/awards' },
    ],
  },
  {
    label: 'Courses',
    path: '/courses',
    items: [
      { label: 'Online Courses', path: '/courses?mode=online' },
      { label: 'Offline Courses', path: '/courses?mode=offline' },
    ],
  },
  {
    label: 'Resources',
    path: '/blogs',
    items: [
      { label: 'Blogs', path: '/blogs' },
      { label: 'Books', path: '/books' },
      { label: 'Psychology of Self Talk', path: '/self-talk' },
    ],
  },
  {
    label: 'Testimonials',
    path: '/testimonials',
    items: [
      { label: 'Client Testimonials', path: '/testimonials#client' },
      { label: 'Trainee Testimonials', path: '/testimonials#trainee' },
      { label: 'Reviews & Appreciation', path: '/testimonials#reviews' },
    ],
  },
  {
    label: 'Contact Us',
    path: '/contact',
    items: [
      { label: 'WhatsApp', path: 'https://wa.me/917607588184', external: true },
      { label: 'Location', path: '/contact#location' },
    ],
  },
];

const ChevronDown = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { user, wishlist } = useLMS();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenMobileDropdown(null);
    setSearchOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isSectionActive = (section) => {
    return section.path === location.pathname ||
      location.pathname.startsWith(section.path + '/') ||
      section.items.some(i => !i.external && location.pathname === i.path.split('#')[0].split('?')[0]);
  };

  const renderMenuLink = (item) => {
    if (item.external) {
      return (
        <a
          key={item.label}
          href={item.path}
          target="_blank"
          rel="noopener noreferrer"
          className="header__dropdown-item"
        >
          {item.label}
        </a>
      );
    }
    if (item.path.includes('#') || item.path.includes('?')) {
      return (
        <a key={item.label} href={item.path} className="header__dropdown-item">
          {item.label}
        </a>
      );
    }
    return (
      <Link key={item.label} to={item.path} className="header__dropdown-item">
        {item.label}
      </Link>
    );
  };

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="header__inner">
        <Link to="/" className="header__logo">
          <img
            src="/client-pic/logo.png"
            alt="Mind Spa"
            className="header__logo-img"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="header__logo-text" style={{ display: 'flex' }}>
            <div>
              <span className="header__logo-brand">Mind Spa</span>
            </div>
          </div>
        </Link>

        <nav className={`header__nav ${isMobileMenuOpen ? 'header__nav--open' : ''}`}>
          <Link to="/" className={`header__nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            Home
          </Link>

          {NAV.map((section) => (
            <div key={section.label} className="header__nav-dropdown">
              <button
                type="button"
                className={`header__nav-link header__nav-link--dropdown ${isSectionActive(section) ? 'active' : ''}`}
                onClick={() => {
                  if (window.innerWidth <= 900) {
                    setOpenMobileDropdown(
                      openMobileDropdown === section.label ? null : section.label
                    );
                  } else {
                    navigate(section.path);
                  }
                }}
              >
                {section.label}
                <ChevronDown />
              </button>
              <div
                className={`header__dropdown-menu ${
                  openMobileDropdown === section.label ? 'header__dropdown-menu--open' : ''
                }`}
              >
                {section.items.map(renderMenuLink)}
              </div>
            </div>
          ))}

          <Link
            to="/dashboard"
            className={`header__nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
          >
            My Learning
          </Link>
        </nav>

        <div className="header__lms-actions">
          <button
            className="header__icon-btn"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search"
            title="Search courses"
          >
            🔍
          </button>
          <Link to="/wishlist" className="header__icon-btn" aria-label="Wishlist" title="Wishlist">
            ♥
            {wishlist.length > 0 && <span className="header__badge">{wishlist.length}</span>}
          </Link>
          {user ? (
            <Link to="/profile" className="header__user-avatar" title={user.name}>
              {user.name.charAt(0).toUpperCase()}
            </Link>
          ) : (
            <Link to="/login" className="header__lms-login">
              Sign In
            </Link>
          )}
        </div>

        {searchOpen && (
          <form onSubmit={handleSearch} className="header__search-overlay">
            <input
              type="text"
              placeholder="Search courses, instructors, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <button type="button" onClick={() => setSearchOpen(false)} aria-label="Close">
              ✕
            </button>
          </form>
        )}

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
