import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Testimonials.css';

const testimonials = [
  {
    name: 'John Hamilton',
    role: 'Art Director',
    text: 'Mind Spa transformed my approach to stress management. The therapy sessions were incredibly insightful and helped me develop coping strategies that I use daily. The team is compassionate and truly cares about your well-being.',
    image: '/client-pic/8.jpeg',
  },
  {
    name: 'Priya Mehta',
    role: 'Corporate Professional',
    text: 'The couples therapy sessions helped us rebuild our communication. We are now stronger than ever thanks to the professional guidance we received from the amazing team.',
    image: '/client-pic/9.jpeg',
  },
  {
    name: 'Rahul Sharma',
    role: 'Business Owner',
    text: 'I was struggling with anxiety and the team at Mind Spa provided a safe and supportive environment. The techniques I learned have been truly life-changing for me and my family.',
    image: '/client-pic/10.jpeg',
  },
];

const avatars = [
  '/client-pic/8.jpeg',
  '/client-pic/9.jpeg',
  '/client-pic/10.jpeg',
  '/client-pic/1.jpeg',
  '/client-pic/2.jpeg',
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [ref, vis] = useScrollReveal();
  const current = testimonials[activeIndex];

  return (
    <section className="testimonials-section">
      <div className="container">
        <div ref={ref} className={`testimonials__layout ${vis ? 'visible' : ''}`}>
          <div className="testimonials__left">
            <p className="testimonials__label">Testimonials</p>
            <h2 className="testimonials__title">Our Happy Clients</h2>

            <div className="testimonials__avatars">
              {avatars.map((src, i) => (
                <button
                  key={i}
                  className={`testimonials__avatar ${i < testimonials.length && i === activeIndex ? 'active' : ''}`}
                  onClick={() => { if (i < testimonials.length) setActiveIndex(i); }}
                >
                  <img src={src} alt="Client" />
                </button>
              ))}
            </div>

            <p className="testimonials__text">{current.text}</p>

            <div className="testimonials__author">
              <div className="testimonials__author-img">
                <img src={current.image} alt={current.name} />
              </div>
              <div>
                <h4 className="testimonials__author-name">{current.name}</h4>
                <p className="testimonials__author-role">{current.role}</p>
              </div>
            </div>
          </div>

          <div className="testimonials__right">
            <img src="/client-pic/5.jpeg" alt="Happy clients" className="testimonials__feature-img" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
