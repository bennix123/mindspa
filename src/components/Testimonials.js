import React, { useState, useEffect } from 'react';
import { testimonialAvatar } from '../utils/clientPic';
import './Testimonials.css';

const FALLBACK_AVATARS = [
  'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150',
  'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
  'https://images.pexels.com/photos/3771089/pexels-photo-3771089.jpeg?auto=compress&cs=tinysrgb&w=150',
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [avatarFallback, setAvatarFallback] = useState({});

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Entrepreneur',
      stars: 5,
      text: 'MindSpa changed my perspective on mental health. The compassionate approach and personalised sessions helped me regain clarity and confidence in my daily life.'
    },
    {
      name: 'Rahul Verma',
      role: 'Software Engineer',
      stars: 5,
      text: 'The therapy sessions have been truly transformative. The team at MindSpa provided me with the tools and support I needed to overcome my challenges. Highly recommended!'
    },
    {
      name: 'Anita Gupta',
      role: 'Teacher',
      stars: 5,
      text: 'Professional, compassionate, and effective. The therapists here truly understand their clients and provide personalised care that makes a real difference in your life.'
    }
  ];

  const getAvatar = (index) => {
    if (avatarFallback[index]) return FALLBACK_AVATARS[index];
    return testimonialAvatar(index);
  };

  const handleAvatarError = (index) => {
    setAvatarFallback((prev) => ({ ...prev, [index]: true }));
  };

  const goTo = (idx) => {
    if (animating) return;
    setAnimating(true);
    setCurrentIndex(idx);
    setTimeout(() => setAnimating(false), 500);
  };

  const next = () => goTo((currentIndex + 1) % testimonials.length);
  const prev = () => goTo((currentIndex - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const iv = setInterval(next, 5000);
    return () => clearInterval(iv);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const t = testimonials[currentIndex];

  return (
    <section id="testimonials" className="testimonials section">
      <div className="container">
        <span className="section-label">WHAT MY CLIENTS SAY</span>
        <h2 className="section-title">Testimonials</h2>
        <p className="section-subtitle">"Begin your journey to a better life with peace, love, and happiness"</p>

        <div className="testimonials-slider">
          <button className="slider-btn prev" onClick={prev}>‹</button>
          <div className={`testimonial-card ${animating ? 'card-anim' : ''}`}>
            <div className="quote-icon">"</div>
            <div className="testimonial-stars">
              {Array.from({ length: t.stars }).map((_, i) => <span key={i}>★</span>)}
            </div>
            <p className="testimonial-text">{t.text}</p>
            <div className="testimonial-author">
              <img
                src={getAvatar(currentIndex)}
                alt={t.name}
                className="testimonial-avatar-img"
                onError={() => handleAvatarError(currentIndex)}
              />
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
            <button key={i} className={`dot ${i === currentIndex ? 'active' : ''}`} onClick={() => goTo(i)} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
