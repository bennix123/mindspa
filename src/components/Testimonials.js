import React, { useState, useEffect } from 'react';
import './Testimonials.css';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'John Hamilton',
      role: 'Art Director',
      initials: 'JH',
      stars: 5,
      text: 'MindSpa changed my perspective on mental health. The compassionate approach and personalised sessions helped me regain clarity and confidence in my daily life.'
    },
    {
      name: 'Sarah Williams',
      role: 'Marketing Manager',
      initials: 'SW',
      stars: 5,
      text: 'The therapy sessions have been truly transformative. The team at MindSpa provided me with the tools and support I needed to overcome my challenges. Highly recommended!'
    },
    {
      name: 'David Martinez',
      role: 'Software Engineer',
      initials: 'DM',
      stars: 5,
      text: 'Professional, compassionate, and effective. The therapists here truly understand their clients and provide personalised care that makes a real difference in your life.'
    }
  ];

  const next = () => setCurrentIndex((p) => (p + 1) % testimonials.length);
  const prev = () => setCurrentIndex((p) => (p - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const iv = setInterval(next, 5000);
    return () => clearInterval(iv);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const t = testimonials[currentIndex];

  return (
    <section id="testimonials" className="testimonials section">
      <div className="container">
        <span className="section-label">WHAT MY CLIENTS SAY</span>
        <h2 className="section-title">Testimonials</h2>
        <p className="section-subtitle">"Begin your journey to a better life with peace, love, and happiness"</p>

        <div className="testimonials-slider">
          <button className="slider-btn prev" onClick={prev}>‹</button>
          <div className="testimonial-card">
            <div className="quote-icon">"</div>
            <div className="testimonial-stars">
              {Array.from({ length: t.stars }).map((_, i) => <span key={i}>★</span>)}
            </div>
            <p className="testimonial-text">{t.text}</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">{t.initials}</div>
              <div className="testimonial-author-info">
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </div>
            </div>
          </div>
          <button className="slider-btn next" onClick={next}>›</button>
        </div>

        <div className="testimonial-dots">
          {testimonials.map((_, i) => (
            <button key={i} className={`dot ${i === currentIndex ? 'active' : ''}`} onClick={() => setCurrentIndex(i)} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
