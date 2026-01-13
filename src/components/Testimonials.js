import React, { useState, useEffect } from 'react';
import './Testimonials.css';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'John Hamilton',
      role: 'Art Director',
      text: 'Cras vestibulum arcu sit amet erat accumsan vehicula. Curabitur aliquam sapien in posuere volutpat. Sed vinar elit sapien, non accumsan enim malesuada eu.'
    },
    {
      name: 'Sarah Williams',
      role: 'Marketing Manager',
      text: 'The therapy sessions have been transformative. The team at Mindspa provided me with the tools and support I needed to overcome my challenges. Highly recommended!'
    },
    {
      name: 'David Martinez',
      role: 'Software Engineer',
      text: 'Professional, compassionate, and effective. The therapists here truly understand their clients and provide personalized care that makes a real difference.'
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section id="testimonials" className="testimonials section">
      <div className="container">
        <span className="section-label">WHAT MY CLIENTS SAY</span>
        <h2 className="section-title">Testimonials</h2>
        <p className="section-subtitle">
          "Begin your journey to a better life with peace, love, and happiness"
        </p>
        <div className="testimonials-slider">
          <button className="slider-btn prev" onClick={prevTestimonial}>‹</button>
          <div className="testimonial-card">
            <div className="quote-icon">"</div>
            <p className="testimonial-text">{testimonials[currentIndex].text}</p>
            <div className="testimonial-author">
              <strong>{testimonials[currentIndex].name}</strong>
              <span>{testimonials[currentIndex].role}</span>
            </div>
          </div>
          <button className="slider-btn next" onClick={nextTestimonial}>›</button>
        </div>
        <div className="testimonial-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

