import React from 'react';
import './Services.css';

const Services = () => {
  const steps = [
    { num: '01', title: 'Browse Our Services', desc: 'Explore our comprehensive range of psychological services and find what suits your needs.' },
    { num: '02', title: 'Book Appointment', desc: 'Schedule a consultation with our expert therapists at your convenience — online or offline.' },
    { num: '03', title: 'Begin Your Session', desc: 'Start your journey towards better mental health, well-being, and lasting transformation.' },
  ];

  return (
    <section id="services" className="services section">
      <div className="container">
        <span className="section-label">HOW IT WORKS</span>
        <h2 className="section-title">Your Journey in 3 Steps</h2>
        <div className="steps-container">
          {steps.map((s) => (
            <div key={s.num} className="step-item">
              <div className="step-number-wrap">
                <span className="step-number">{s.num}</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
        <p className="section-subtitle">"Begin your journey to a better life with peace, love, and happiness"</p>
        <button
          className="btn btn-primary center-btn"
          onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Book An Appointment
        </button>
      </div>
    </section>
  );
};

export default Services;
