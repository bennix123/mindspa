import React, { useState } from 'react';
import './Hero.css';
import VideoModal from './VideoModal';

const Hero = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <div className="hero-overlay"></div>
      </div>
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-main-title">Attain Peace Of Mind!</h1>
          <div className="hero-taglines">
            <p className="hero-tagline">Personal Psychologist For Your Family's Health & Happiness.</p>
            <p className="hero-tagline">Understand Your Partner & Get Psycho-Kundali Made.</p>
          </div>
        </div>
      </div>
      <div className="hero-features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🧘</div>
              <h3>Hypnotherapy</h3>
              <p>Transform your subconscious mind with professional hypnotherapy sessions.</p>
            </div>
            <div className="feature-card feature-card-center">
              <div className="feature-icon">🔮</div>
              <h3>Psycho-Kundali</h3>
              <p>Understand your partner better with psychological astrology and compatibility insights.</p>
              <button
                className="hero-book-btn"
                onClick={() => {
                  const element = document.querySelector('#contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Book Appointment
              </button>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✨</div>
              <h3>Chakra Healing</h3>
              <p>Balance your energy centers for holistic mental and physical well-being.</p>
            </div>
          </div>
        </div>
      </div>
      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
    </section>
  );
};

export default Hero;

