import React from 'react';
import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal';
import { ShapeLines, DotGrid } from './DecorativePatterns';
import './PopularServices.css';

const services = [
  {
    image: '/client-pic/5.jpeg',
    title: 'Child Psychotherapy',
    desc: 'Specialized therapeutic approaches designed to help children navigate emotional and behavioral challenges in a safe, nurturing environment.',
  },
  {
    image: '/client-pic/6.jpeg',
    title: 'Couples Psychotherapy',
    desc: 'Rebuild trust, improve communication, and rediscover the connection that brought you together through expert-guided couples sessions.',
  },
  {
    image: '/client-pic/7.jpeg',
    title: 'Family Psychotherapy',
    desc: 'Strengthen family bonds and resolve conflicts through collaborative therapy that addresses the unique dynamics of your family unit.',
  },
];

const PopularServices = () => {
  const [titleRef, titleVis] = useScrollReveal();
  const gridRef = useStaggerReveal({ staggerDelay: 200, childSelector: '.popular-service' });

  return (
    <section className="popular-services">
      <ShapeLines style={{ top: '40px', right: '30px' }} />
      <DotGrid style={{ bottom: '50px', left: '20px' }} rows={4} cols={4} />
      <div className="container">
        <div ref={titleRef} className={`popular-services__header ${titleVis ? 'visible' : ''}`}>
          <div className="popular-services__header-left">
            <p className="section-label" style={{ textAlign: 'left' }}>Who We Are</p>
            <h2 className="section-title" style={{ textAlign: 'left' }}>Popular Psychological Services</h2>
          </div>
          <a href="/services" className="btn-primary popular-services__explore">Explore More Services</a>
        </div>

        <div className="popular-services__grid" ref={gridRef}>
          {services.map((service, index) => (
            <div key={index} className="popular-service stagger-item">
              <div className="popular-service__image">
                <img src={service.image} alt={service.title} />
                <div className="popular-service__icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                    <circle cx="9" cy="10" r="1" fill="currentColor"/>
                    <circle cx="15" cy="10" r="1" fill="currentColor"/>
                  </svg>
                </div>
              </div>
              <div className="popular-service__content">
                <h3>{service.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularServices;
