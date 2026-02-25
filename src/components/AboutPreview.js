import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './AboutPreview.css';

const AboutPreview = () => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.2 });

  return (
    <section className="about-preview">
      <div className="about-preview-overlay">
        <div className="container">
          <div ref={ref} className={`about-preview-card reveal reveal-scale-up ${isVisible ? 'visible' : ''}`}>
            <h2 className="about-preview-heading">About Us</h2>
            <p className="about-preview-text">
              Hello and Welcome to MindSpa! We are a team of psychologists and our goal is to
              partner with you to enhance the quality of your life. Whether you are dealing with
              something specific or are seeking increased satisfaction and balance in life, we're
              here to help.
            </p>
            <div className="about-preview-buttons">
              <Link to="/about" className="btn-primary">Know More</Link>
              <Link to="/contact" className="btn-outline-blue">BOOK APPOINTMENT</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
