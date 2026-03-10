import React from 'react';
import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal';
import './ServiceCards.css';

const services = [
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" width="50" height="50">
        <path d="M32 8C22 8 14 16 14 26c0 6 3 11 7 15l11 15 11-15c4-4 7-9 7-15 0-10-8-18-18-18z" stroke="currentColor" strokeWidth="2.5" fill="none"/>
        <circle cx="32" cy="26" r="6" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      </svg>
    ),
    title: 'Psycho Therapy',
    description: 'Expert psychological therapy sessions tailored to your unique needs, helping you navigate challenges and achieve lasting mental wellness.',
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" width="50" height="50">
        <path d="M20 32c-6-6-6-16 0-22s16-6 22 0" stroke="currentColor" strokeWidth="2.5" fill="none"/>
        <path d="M44 32c6 6 6 16 0 22s-16 6-22 0" stroke="currentColor" strokeWidth="2.5" fill="none"/>
        <circle cx="32" cy="32" r="4" fill="currentColor"/>
      </svg>
    ),
    title: 'Couples Therapy',
    description: 'Strengthen your relationship through guided counseling that improves communication, builds trust, and deepens emotional connection.',
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" width="50" height="50">
        <circle cx="32" cy="16" r="8" stroke="currentColor" strokeWidth="2.5" fill="none"/>
        <circle cx="16" cy="40" r="6" stroke="currentColor" strokeWidth="2.5" fill="none"/>
        <circle cx="48" cy="40" r="6" stroke="currentColor" strokeWidth="2.5" fill="none"/>
        <path d="M24 20l-4 16M40 20l4 16" stroke="currentColor" strokeWidth="2" fill="none"/>
      </svg>
    ),
    title: 'Group Therapy',
    description: 'Connect with others in a supportive group setting, share experiences, and develop coping strategies together under expert guidance.',
  },
];

const ServiceCards = () => {
  const [titleRef, titleVis] = useScrollReveal();
  const gridRef = useStaggerReveal({ staggerDelay: 200, childSelector: '.service-card' });

  return (
    <section className="service-cards">
      <div className="container">
        <div ref={titleRef} className={`service-cards__header ${titleVis ? 'visible' : ''}`}>
          <p className="section-label">What We Offer</p>
          <h2 className="section-title">Our Core Services</h2>
          <div className="section-divider">
            <span className="line"></span>
            <span className="dot"></span>
            <span className="line"></span>
          </div>
        </div>

        <div className="service-cards__grid" ref={gridRef}>
          {services.map((service, index) => (
            <div key={index} className="service-card stagger-item">
              <div className="service-card__icon">{service.icon}</div>
              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__desc">{service.description}</p>
              <a href="/services" className="service-card__link">
                Learn More
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;
