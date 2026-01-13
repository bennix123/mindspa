import React, { useState } from 'react';
import './PopularServices.css';

const ServiceCard = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="service-card fade-in"
      style={{ transitionDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <div className={`service-card-content ${isHovered ? 'hovered' : ''}`}>
        <div className="service-icon-large">{service.icon}</div>
        <h3 className="service-title">{service.title}</h3>
        <p>{service.description}</p>
        <button className="btn btn-outline service-btn">Learn More</button>
      </div>
    </div>
  );
};

const PopularServices = () => {
  const services = [
    {
      title: 'Hypnotherapy',
      description: 'Transform your subconscious mind with professional hypnotherapy sessions to overcome deep-seated issues.',
      icon: '🧘'
    },
    {
      title: 'Psycho-Kundali',
      description: 'Understand your partner better with psychological astrology analysis and compatibility assessment.',
      icon: '🔮'
    },
    {
      title: 'Chakra Healing',
      description: 'Balance your energy centers for holistic mental and physical well-being through chakra alignment.',
      icon: '✨'
    },
    {
      title: 'Handwriting Analysis',
      description: 'Discover personality traits and behavioral patterns through professional graphology analysis.',
      icon: '✍️'
    },
    {
      title: 'Life & Executive Coaching',
      description: 'Achieve personal and professional goals with expert coaching and guidance.',
      icon: '🎯'
    },
    {
      title: 'Identify Issues',
      description: 'Professional assessment to identify underlying psychological issues and create treatment plans.',
      icon: '🔍'
    },
    {
      title: 'Coping With Diseases',
      description: 'Support for coping with heart attack, diabetes and other chronic diseases through psychological intervention.',
      icon: '❤️'
    }
  ];

  return (
    <section id="pricing" className="popular-services section">
      <div className="container">
        <span className="section-label">SPECIAL SERVICES</span>
        <h2 className="section-title">Special Services By Experts</h2>
        <p className="section-subtitle">
          Our team of experts offers a range of specialized services to help individuals overcome challenges, 
          achieve personal and professional goals, and improve their overall well-being. Our team includes 
          licensed psychologists and counselors who can help clients identify and address a range of mental 
          health issues, from depression and anxiety to trauma and addiction.
        </p>
        <div className="services-grid">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
        <div className="text-center">
          <button 
            className="btn btn-primary"
            onClick={() => {
              const element = document.querySelector('#contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Book Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularServices;

