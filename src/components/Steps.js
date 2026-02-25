import React from 'react';
import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal';
import './Steps.css';

const stepsData = [
  {
    number: '01',
    title: 'Browse Through Our Service',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="22" cy="22" r="14" stroke="#00c9db" strokeWidth="2.5" fill="none" />
        <line x1="32" y1="32" x2="42" y2="42" stroke="#00c9db" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="16" y1="22" x2="28" y2="22" stroke="#00c9db" strokeWidth="2" strokeLinecap="round" />
        <line x1="22" y1="16" x2="22" y2="28" stroke="#00c9db" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Book Appointment',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="10" width="36" height="32" rx="4" stroke="#00c9db" strokeWidth="2.5" fill="none" />
        <line x1="6" y1="20" x2="42" y2="20" stroke="#00c9db" strokeWidth="2.5" />
        <line x1="16" y1="6" x2="16" y2="14" stroke="#00c9db" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="32" y1="6" x2="32" y2="14" stroke="#00c9db" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="14" y="26" width="6" height="6" rx="1" fill="#00c9db" />
        <rect x="28" y="26" width="6" height="6" rx="1" fill="#00c9db" />
        <rect x="14" y="34" width="6" height="4" rx="1" fill="#00c9db" opacity="0.5" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Begin Session',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="20" stroke="#00c9db" strokeWidth="2.5" fill="none" />
        <polygon points="20,14 36,24 20,34" fill="#00c9db" />
      </svg>
    ),
  },
];

const Steps = () => {
  const [titleRef, titleVis] = useScrollReveal();
  const gridRef = useStaggerReveal({ staggerDelay: 200 });

  return (
    <section className="steps-section">
      <div className="container">
        <div className="steps-divider-line"></div>

        <div ref={titleRef} className={`steps-header reveal reveal-up ${titleVis ? 'visible' : ''}`}>
          <h2 className="section-title">Steps</h2>
          <div className="section-divider">
            <span className="dot"></span>
            <span className="line"></span>
            <span className="dot"></span>
          </div>
        </div>

        <div className="steps-grid" ref={gridRef}>
          {stepsData.map((step, index) => (
            <div className="step-card stagger-item hover-lift" key={index}>
              <div className="step-card-accent"></div>
              <div className="step-number">{step.number}</div>
              <div className="step-icon">{step.icon}</div>
              <h3 className="step-title">{step.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Steps;
