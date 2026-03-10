import React from 'react';
import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal';
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
      <div className="container">
        <div ref={titleRef} className={`popular-services__header ${titleVis ? 'visible' : ''}`}>
          <p className="section-label">What We Do</p>
          <h2 className="section-title">Popular Psychological Services</h2>
          <div className="section-divider">
            <span className="line"></span>
            <span className="dot"></span>
            <span className="line"></span>
          </div>
        </div>

        <div className="popular-services__grid" ref={gridRef}>
          {services.map((service, index) => (
            <div key={index} className="popular-service stagger-item">
              <div className="popular-service__image">
                <img src={service.image} alt={service.title} />
                <div className="popular-service__overlay">
                  <a href="/services" className="popular-service__link">View Details</a>
                </div>
              </div>
              <div className="popular-service__content">
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularServices;
