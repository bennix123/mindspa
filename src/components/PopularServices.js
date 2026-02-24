import React, { useState } from 'react';
import './PopularServices.css';

const ServiceCard = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="service-card fade-in"
      style={{ transitionDelay: `${index * 0.08}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <div className="service-card-img-wrap">
        <img src={service.img} alt={service.title} className="service-card-bg" />
        <div className="service-card-img-overlay" />
      </div>
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
      description: 'Transform your subconscious mind with professional hypnotherapy sessions.',
      icon: '🧘',
      img: 'https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      title: 'Psycho-Kundali',
      description: 'Understand your partner with psychological astrology and compatibility insights.',
      icon: '🔮',
      img: 'https://images.pexels.com/photos/6957667/pexels-photo-6957667.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      title: 'Chakra Healing',
      description: 'Balance your energy centers for holistic mental and physical well-being.',
      icon: '✨',
      img: 'https://images.pexels.com/photos/3560044/pexels-photo-3560044.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      title: 'Handwriting Analysis',
      description: 'Discover personality traits through professional graphology analysis.',
      icon: '✍️',
      img: 'https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      title: 'Life & Executive Coaching',
      description: 'Achieve personal and professional goals with expert coaching.',
      icon: '🎯',
      img: 'https://images.pexels.com/photos/3759659/pexels-photo-3759659.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      title: 'Coping With Diseases',
      description: 'Support for coping with chronic diseases through psychological intervention.',
      icon: '❤️',
      img: 'https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  return (
    <section id="pricing" className="popular-services section">
      <div className="container">
        <span className="section-label">SPECIAL SERVICES</span>
        <h2 className="section-title">Special Services By Experts</h2>
        <p className="section-subtitle">
          Our team of experts offers specialized services to help individuals overcome challenges,
          achieve goals, and improve overall well-being.
        </p>
        <div className="services-grid">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
        <div className="text-center">
          <button
            className="btn btn-primary"
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Book Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularServices;
