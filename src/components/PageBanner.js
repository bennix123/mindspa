import React from 'react';
import { Link } from 'react-router-dom';
import './PageBanner.css';

const subtitles = {
  'About Us': 'Discover our journey, mission, and the passionate team behind Mind Spa.',
  'Contact Us': 'We\'d love to hear from you. Reach out and let\'s begin your healing journey.',
  'Gallery': 'A glimpse into our sessions, events, and community moments.',
  'Our Psychological Services': 'Comprehensive healing solutions tailored to your unique needs.',
  'Blogs': 'Insights, tips, and stories to inspire your mental wellness journey.',
  'Testimonials': 'Real stories from real people whose lives have been transformed.',
  'All Courses': 'Explore our certified training programs and elevate your expertise.',
};

function PageBanner({ title }) {
  return (
    <section className="page-banner">
      <div className="page-banner__bg">
        <img src="/client-pic/landing_page.jpeg" alt="" aria-hidden="true" className="page-banner__bg-img" />
      </div>
      <div className="page-banner__overlay" />
      <div className="page-banner__particles" aria-hidden="true">
        <span /><span /><span /><span /><span />
      </div>
      <div className="container page-banner-inner">
        <nav className="page-banner-breadcrumb">
          <Link to="/">Home</Link>
          <span className="breadcrumb-separator">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
          </span>
          <span className="breadcrumb-current">{title}</span>
        </nav>
        <h1 className="page-banner-title">{title}</h1>
        <div className="page-banner-divider">
          <span className="line" />
          <span className="diamond" />
          <span className="line" />
        </div>
        {subtitles[title] && (
          <p className="page-banner-subtitle">{subtitles[title]}</p>
        )}
      </div>
    </section>
  );
}

export default PageBanner;
