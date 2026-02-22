import React, { useState } from 'react';
import './Hero.css';
import VideoModal from './VideoModal';

const Hero = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <div className="hero-overlay" />
      </div>

      {/* Main hero content */}
      <div className="hero-content">
        <div className="container">
          <div className="hero-inner">
            {/* Left — text */}
            <div className="hero-text">
              <div className="hero-badge">
                <span className="hero-badge-dot" />
                <span>Trusted Mental Health Experts</span>
              </div>

              <h1 className="hero-main-title">
                Attain
                <span className="hero-accent">Peace Of Mind!</span>
              </h1>

              <div className="hero-taglines">
                <p className="hero-tagline">Personal Psychologist For Your Family's Health &amp; Happiness.</p>
                <p className="hero-tagline">Understand Your Partner &amp; Get Psycho-Kundali Made.</p>
              </div>

              <div className="hero-cta-row">
                <button className="btn btn-primary" onClick={() => scrollTo('#contact')}>
                  Book Appointment
                </button>
                <button className="hero-cta-secondary" onClick={() => setIsVideoOpen(true)}>
                  <span className="hero-play-ring">
                    <span className="hero-play-icon">▶</span>
                  </span>
                  Watch Video
                </button>
              </div>
            </div>

            {/* Right — floating cards */}
            <div className="hero-visual">
              <div className="hero-visual-card">
                <div className="hero-visual-card-icon">🧘</div>
                <h4>Hypnotherapy Sessions</h4>
                <p>Transform your subconscious mind with professional hypnotherapy and deep-healing techniques.</p>
              </div>
              <div className="hero-visual-card hero-visual-card-alt">
                <div className="hero-visual-card-icon">🔮</div>
                <h4>Psycho-Kundali</h4>
                <p>Understand your partner better through psychological compatibility insights.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom feature strip */}
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
              <button className="hero-book-btn" onClick={() => scrollTo('#contact')}>
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
