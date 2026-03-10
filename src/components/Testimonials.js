import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal';
import './Testimonials.css';

const testimonials = [
  {
    name: 'Priya Mehta',
    role: 'Corporate Professional',
    text: 'Mind Spa transformed my approach to stress management. The therapy sessions were incredibly insightful and helped me develop coping strategies that I use daily.',
    image: '/client-pic/8.jpeg',
  },
  {
    name: 'Rahul Sharma',
    role: 'Business Owner',
    text: 'The couples therapy sessions helped us rebuild our communication. We are now stronger than ever thanks to the professional guidance we received.',
    image: '/client-pic/9.jpeg',
  },
  {
    name: 'Ananya Singh',
    role: 'Student',
    text: 'I was struggling with anxiety and the team at Mind Spa provided a safe and supportive environment. The techniques I learned have been truly life-changing.',
    image: '/client-pic/10.jpeg',
  },
];

const Testimonials = () => {
  const [titleRef, titleVis] = useScrollReveal();
  const gridRef = useStaggerReveal({ staggerDelay: 200, childSelector: '.testimonial-card' });

  return (
    <section className="testimonials-section">
      <div className="container">
        <div ref={titleRef} className={`testimonials__header ${titleVis ? 'visible' : ''}`}>
          <p className="section-label">Testimonials</p>
          <h2 className="section-title">Our Happy Clients</h2>
          <p className="section-subtitle">
            Hear what our clients have to say about their transformative journey with us.
          </p>
          <div className="section-divider">
            <span className="line"></span>
            <span className="dot"></span>
            <span className="line"></span>
          </div>
        </div>

        <div className="testimonials__grid" ref={gridRef}>
          {testimonials.map((t, index) => (
            <div key={index} className="testimonial-card stagger-item">
              <div className="testimonial-card__quote">
                <svg width="30" height="24" viewBox="0 0 30 24" fill="var(--accent)" opacity="0.2">
                  <path d="M0 24V14.4C0 6.24 4.56 1.44 13.68 0l1.32 3.6C9.36 5.04 6.6 8.4 6.24 13.2H12v10.8H0zm16.8 0V14.4C16.8 6.24 21.36 1.44 30.48 0l1.32 3.6c-5.64 1.44-8.4 4.8-8.76 9.6h5.76v10.8H16.8z"/>
                </svg>
              </div>
              <p className="testimonial-card__text">{t.text}</p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar">
                  <img src={t.image} alt={t.name} />
                </div>
                <div>
                  <h4 className="testimonial-card__name">{t.name}</h4>
                  <p className="testimonial-card__role">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="testimonials__cta">
          <Link to="/testimonials" className="btn-primary">More Testimonials</Link>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
