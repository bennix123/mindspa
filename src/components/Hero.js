import React, { useState, useEffect } from 'react';
import { useParallax } from '../hooks/useParallax';
import './Hero.css';

const TYPED_PHRASES = [
  'Struggling with sleepless nights? Discover gentle, proven techniques to restore peaceful rest and deep relaxation.',
  'Feeling overwhelmed by stress, anxiety, or panic? You are not alone — let us guide you toward lasting calm and balance.',
  'Your mind and body deserve care. Explore our holistic approach to mental wellness, emotional healing, and inner peace.',
  'Take the first step toward a healthier, calmer you. Our compassionate experts are here to support your journey.',
];

const TYPING_SPEED = 45;
const DELETING_SPEED = 18;
const PAUSE_AFTER_TYPING = 3000;
const PAUSE_AFTER_DELETING = 800;

const Hero = () => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = TYPED_PHRASES[phraseIndex];

    if (!isDeleting && charIndex === currentPhrase.length) {
      const timeout = setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPING);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && charIndex === 0) {
      const timeout = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % TYPED_PHRASES.length);
      }, PAUSE_AFTER_DELETING);
      return () => clearTimeout(timeout);
    }

    const speed = isDeleting ? DELETING_SPEED : TYPING_SPEED;
    const timeout = setTimeout(() => {
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex]);

  const displayedText = TYPED_PHRASES[phraseIndex].substring(0, charIndex);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const parallaxRef = useParallax(0.3);

  return (
    <section id="home" className={`hero ${loaded ? 'hero--loaded' : ''}`}>
      <div className="hero__bg" ref={parallaxRef}>
        <img
          src="/client-pic/landing_page.jpeg"
          alt=""
          aria-hidden="true"
          className="hero__bg-img"
        />
      </div>
      <div className="hero__overlay" />

      {/* Floating particles */}
      <div className="hero__particle hero__particle--1" aria-hidden="true" />
      <div className="hero__particle hero__particle--2" aria-hidden="true" />
      <div className="hero__particle hero__particle--3" aria-hidden="true" />

      <div className="hero__content">
        <h1 className="hero__title">
          <span className="hero__title-fulfill">{loaded ? 'Find Your Inner' : ''}</span>
          <span className="hero__title-main">{loaded ? 'PEACE & WELL-BEING' : ''}</span>
        </h1>

        <div className="hero__typed-wrap">
          <span className="hero__typed-text">{displayedText}</span>
          <span className="hero__cursor">|</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
