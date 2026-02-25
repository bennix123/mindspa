import React from 'react';
import { Link } from 'react-router-dom';
import './PageBanner.css';

function PageBanner({ title }) {
  return (
    <section className="page-banner">
      <div className="container page-banner-inner">
        <h1 className="page-banner-title">{title}</h1>
        <nav className="page-banner-breadcrumb">
          <Link to="/">Home</Link>
          <span className="breadcrumb-separator">&gt;</span>
          <span className="breadcrumb-current">{title}</span>
        </nav>
      </div>
    </section>
  );
}

export default PageBanner;
