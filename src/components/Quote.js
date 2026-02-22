import React from 'react';
import './Quote.css';

const Quote = () => {
  return (
    <section className="quote section">
      <div className="container">
        <div className="quote-content">
          <span className="quote-icon-big">🕊️</span>
          <h2 className="quote-text">
            Be equal minded in both{' '}
            <span className="quote-highlight">success and failure.</span>
          </h2>
          <p className="quote-subtitle">Connect with us and begin your journey to lasting peace of mind</p>
          <div className="quote-actions">
            <button className="btn btn-primary" onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Book a Session
            </button>
            <button className="quote-btn-outline" onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}>
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quote;
