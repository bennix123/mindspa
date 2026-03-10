import React, { useState, useEffect } from 'react';
import './Hero.css';

const Hero = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className={`hero ${loaded ? 'hero--loaded' : ''}`}>
      <div className="hero__bg">
        <img
          src="/client-pic/landing_page.jpeg"
          alt=""
          aria-hidden="true"
          className="hero__bg-img"
        />
      </div>
      <div className="hero__overlay" />

      {/* Decorative circle pattern */}
      <div className="hero__circle-pattern" aria-hidden="true">
        <svg width="300" height="300" viewBox="0 0 300 300" fill="none">
          {[...Array(5)].map((_, i) => (
            <circle
              key={i}
              cx="150"
              cy="150"
              r={40 + i * 30}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
              fill="none"
            />
          ))}
        </svg>
      </div>

      <div className="hero__content">
        <p className="hero__label">Welcome to Mind Spa</p>
        <h1 className="hero__title">
          We can regret less and be grateful for what is good in life
        </h1>
        <div className="hero__actions">
          <a href="/contact" className="btn-primary hero__btn">
            Book Online
          </a>
          <a href="#video" className="hero__video-btn">
            <span className="hero__video-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </span>
            <span className="hero__video-text">Watch Video</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
