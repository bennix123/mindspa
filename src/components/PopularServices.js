import React from 'react';
import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal';
import { ShapeLines, DotGrid } from './DecorativePatterns';
import './PopularServices.css';

const services = [
  {
    image: '/client-pic/service-hypnotherapy.jpeg',
    title: 'Hypnotherapy and NLP',
    points: [
      'Panic Attacks & Anxiety',
      'Allergies & Psychosomatic Disorders',
      'Addictions & Stress',
      'Overthinking & Depression',
      'Emotional & Physical Issues',
    ],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
        <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
        <circle cx="9" cy="10" r="1" fill="currentColor"/>
        <circle cx="15" cy="10" r="1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    image: '/client-pic/service-counselling.jpeg',
    title: 'Counselling, DBT, CBT & More',
    points: [
      'Building Confidence',
      'Personal Growth',
      'Achieving Peak Potential',
      'Finding Happiness',
    ],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
  {
    image: '/client-pic/service-coaching.jpeg',
    title: 'Mind Coaching',
    points: [
      'Academic Growth',
      'Career Advancement',
      'Mental Performance',
    ],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
  },
  {
    image: '/client-pic/service-regression.jpeg',
    title: 'Past Life Regression',
    points: [
      'Deep Subconscious Exploration',
      'Karmic Pattern Resolution',
      'Spiritual Healing',
    ],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    image: '/client-pic/service-executive.jpeg',
    title: 'Executive Coaching',
    points: [
      'Leadership Development',
      'Strategic Thinking',
      'Work-Life Balance',
    ],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    ),
  },
  {
    image: '/client-pic/service-chakra.jpeg',
    title: 'Chakra Healing & Energy Balancing',
    points: [
      'Seven Chakra Alignment',
      'Energy Flow Restoration',
      'Aura Cleansing',
    ],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
  },
  {
    image: '/client-pic/service-womb.jpeg',
    title: 'Womb Healing',
    points: [
      'Feminine Energy Restoration',
      'Emotional Release',
      'Deep Inner Healing',
    ],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="M12 8a4 4 0 0 0-4 4c0 2 2 4 4 6 2-2 4-4 4-6a4 4 0 0 0-4-4z"/>
      </svg>
    ),
  },
  {
    image: '/client-pic/service-psychic.jpeg',
    title: 'Psychic Surgery',
    points: [
      'Non-invasive Energy Healing',
      'Deep Trauma Release',
      'Spiritual Blockage Removal',
    ],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
        <path d="M6 8H5a4 4 0 0 0 0 8h1"/>
        <line x1="6" y1="12" x2="18" y2="12"/>
        <path d="M12 2v4M12 18v4"/>
      </svg>
    ),
  },
  {
    image: '/client-pic/service-career.jpeg',
    title: 'Career Counselling',
    points: [
      'Career Path Discovery',
      'Professional Goal Setting',
      'Aptitude Assessment',
    ],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
  {
    image: '/client-pic/service-sexuality.jpeg',
    title: 'Sexuality, Marital & Age Related Issues',
    points: [
      'Relationship Counselling',
      'Intimacy & Trust Building',
      'Life Transition Support',
    ],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    image: '/client-pic/service-psychometric.jpeg',
    title: 'Psychometric Testing',
    points: [
      'Personality Assessment',
      'Aptitude & Intelligence Testing',
      'Behavioral Analysis',
    ],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
  },
];

const PopularServices = () => {
  const [titleRef, titleVis] = useScrollReveal();
  const gridRef = useStaggerReveal({ staggerDelay: 120, childSelector: '.popular-service' });

  return (
    <section className="popular-services">
      <ShapeLines style={{ top: '40px', right: '30px' }} />
      <DotGrid style={{ bottom: '50px', left: '20px' }} rows={4} cols={4} />
      <div className="container">
        <div ref={titleRef} className={`popular-services__header ${titleVis ? 'visible' : ''}`}>
          <div className="popular-services__header-left">
            <p className="section-label" style={{ textAlign: 'left' }}>What We Offer</p>
            <h2 className="section-title" style={{ textAlign: 'left' }}>Our Services</h2>
            <p className="popular-services__subtitle">
              Comprehensive healing and wellness solutions tailored to your unique journey towards mental, emotional, and spiritual well-being.
            </p>
          </div>
          <a href="/services" className="btn-primary popular-services__explore">Explore All Services</a>
        </div>

        <div className="popular-services__grid" ref={gridRef}>
          {services.map((service, index) => (
            <div key={index} className="popular-service stagger-item">
              <div className="popular-service__image">
                <img src={service.image} alt={service.title} />
                <div className="popular-service__icon">
                  {service.icon}
                </div>
              </div>
              <div className="popular-service__content">
                <h3>{service.title}</h3>
                {service.points?.length ? (
                  <ul className="popular-service__points" aria-label={`${service.title} details`}>
                    {service.points.map((point, pointIndex) => (
                      <li key={pointIndex}>{point}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularServices;
