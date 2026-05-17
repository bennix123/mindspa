import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import './Hero.css';

const quotes = [
  "Self care is how you take your power back.",
  "Your mental health is a long term investment, not an expense.",
  "It's ok to ask for help, you don't have to figure everything out alone.",
  "Every step you take towards your healing matters.",
  "A positive mind finds opportunity in every challenge.",
  "Focus on progress, not perfection.",
  "Each day is a fresh start - breathe, believe, begin again.",
  "There is strength in allowing yourself to feel.",
];

// Single static background photo (original).
const HERO_BG = '/client-pic/landing_page.jpeg';

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [slideDir, setSlideDir] = useState('in');
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const nextQuote = useCallback(() => {
    setSlideDir('out');
    setTimeout(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
      setSlideDir('in');
    }, 500);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const interval = setInterval(nextQuote, 5000);
    return () => clearInterval(interval);
  }, [loaded, nextQuote]);

  return (
    <>
    <section id="home" className={`hero ${loaded ? 'hero--loaded' : ''}`}>
      <div className="hero__bg">
        <div className="hero__slide hero__slide--active">
          <img src={HERO_BG} alt="" className="hero__bg-img" loading="eager" />
        </div>
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
        <div className="hero__quote-wrapper">
          <h1 className={`hero__title hero__title--${slideDir}`} key={currentQuote}>
            {quotes[currentQuote]}
          </h1>
        </div>

        {/* Quote indicators */}
        <div className="hero__quote-dots">
          {quotes.map((_, i) => (
            <button
              key={i}
              className={`hero__quote-dot ${i === currentQuote ? 'active' : ''}`}
              onClick={() => {
                if (i === currentQuote) return;
                setSlideDir('out');
                setTimeout(() => {
                  setCurrentQuote(i);
                  setSlideDir('in');
                }, 500);
              }}
              aria-label={`Go to quote ${i + 1}`}
            />
          ))}
        </div>

        <div className="hero__actions">
          <a href="/contact" className="btn-primary hero__btn">
            Book Online
          </a>
          <button
            type="button"
            onClick={() => {
              console.log('[Hero] Watch Video clicked → opening modal');
              setVideoModalOpen(true);
            }}
            className="hero__video-btn"
          >
            <span className="hero__video-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </span>
            <span className="hero__video-text">Watch Video</span>
          </button>
        </div>
      </div>
    </section>

    {videoModalOpen && ReactDOM.createPortal(
      <div
        className="hero__video-modal"
        onClick={(e) => { if (e.target === e.currentTarget) setVideoModalOpen(false); }}
      >
        <button
          className="hero__video-modal-close"
          onClick={() => setVideoModalOpen(false)}
          aria-label="Close"
        >
          ✕
        </button>
        <video
          src="/client-pic/hero-slides/hero-video.mp4"
          controls
          autoPlay
          playsInline
          className="hero__video-modal-player"
        />
      </div>,
      document.body
    )}
    </>
  );
};

export default Hero;
