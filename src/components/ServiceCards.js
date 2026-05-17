import React from 'react';
import { useStaggerReveal } from '../hooks/useScrollReveal';
import './ServiceCards.css';

const services = [
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" width="50" height="50">
        <path d="M32 8C22 8 14 16 14 26c0 6 3 11 7 15l11 15 11-15c4-4 7-9 7-15 0-10-8-18-18-18z" stroke="currentColor" strokeWidth="2.5" fill="none"/>
        <circle cx="32" cy="26" r="6" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      </svg>
    ),
    title: 'Psycho Therapy for emotional healing',
    description: 'Compassionate psychotherapy sessions to help you process stress, trauma, grief, and emotional pain while building healthier coping patterns and inner resilience.',
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" width="50" height="50">
        <path d="M20 32c-6-6-6-16 0-22s16-6 22 0" stroke="currentColor" strokeWidth="2.5" fill="none"/>
        <path d="M44 32c6 6 6 16 0 22s-16 6-22 0" stroke="currentColor" strokeWidth="2.5" fill="none"/>
        <circle cx="32" cy="32" r="4" fill="currentColor"/>
      </svg>
    ),
    title: 'Hypnotherapy for Subconscious Transformation',
    description: 'Target limiting beliefs and deep-rooted behavioral patterns through guided hypnotherapy to create positive mindset shifts and lasting personal transformation.',
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
    title: 'Coaching for Success, Happiness, and Life Mastery',
    description: 'Results-focused coaching to align your goals, habits, and mindset so you can improve clarity, confidence, performance, and fulfillment in everyday life.',
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" width="50" height="50">
        <rect x="14" y="12" width="36" height="40" rx="4" stroke="currentColor" strokeWidth="2.5" fill="none"/>
        <path d="M22 22h20M22 30h20M22 38h14" stroke="currentColor" strokeWidth="2.5" fill="none"/>
        <path d="M40 46l4 4 8-8" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      </svg>
    ),
    title: 'Hypnotherapy Training Programs(CHI USA Certified)',
    description: 'Professional certification-oriented training programs designed for aspiring practitioners to learn clinical hypnotherapy methods with CHI USA aligned standards.',
  },
];

const ServiceCards = () => {
  const gridRef = useStaggerReveal({ staggerDelay: 200, childSelector: '.service-card' });

  return (
    <section className="service-cards">
      <div className="container">
        <div className="service-cards__grid" ref={gridRef}>
          {services.map((service, index) => (
            <div key={index} className="service-card stagger-item">
              <div className="service-card__icon">{service.icon}</div>
              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__desc">{service.description}</p>
              <a href="/services" className="service-card__arrow">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
