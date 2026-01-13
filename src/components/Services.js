import React from 'react';
import './Services.css';

const Services = () => {
  return (
    <section id="services" className="services section">
      <div className="container">
        <span className="section-label">STEPS</span>
        <h2 className="section-title">Steps</h2>
        <div className="steps-container">
          <div className="step-item">
            <div className="step-number">Step 1</div>
            <h3>Browse Through Our Service</h3>
            <p>Explore our comprehensive range of psychological services and find what suits your needs.</p>
          </div>
          <div className="step-item">
            <div className="step-number">Step 2</div>
            <h3>Book Appointment</h3>
            <p>Schedule a consultation with our expert therapists at your convenience.</p>
          </div>
          <div className="step-item">
            <div className="step-number">Step 3</div>
            <h3>Begin Session</h3>
            <p>Start your journey towards better mental health and well-being.</p>
          </div>
        </div>
        <p className="section-subtitle">
          "Begin your journey to a better life with peace, love, and happiness"
        </p>
        <button 
          className="btn btn-primary center-btn"
          onClick={() => {
            const element = document.querySelector('#contact');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          Book An Appointment
        </button>
      </div>
    </section>
  );
};

export default Services;

