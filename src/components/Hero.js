import React, { useState, useEffect } from 'react';
import { useParallax } from '../hooks/useParallax';
import './Hero.css';

const TYPED_PHRASES = [
  'Do you struggle with insomnia or poor sleep? Learn how our mind spa can help you get better rest and relaxation.',
  'Do you want to lose weight, deal with acidity, panic attacks, BP and Diabetes, get help now.',
  'Are you looking for natural ways to boost your mental health as well as physical health and wellbeing? Explore our services.',
];

const TYPING_SPEED = 40;
const DELETING_SPEED = 20;
const PAUSE_AFTER_TYPING = 2000;
const PAUSE_AFTER_DELETING = 500;

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
          src="/client-pic/hero-bg.jpg"
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
          <span className="hero__title-fulfill">{loaded ? 'Fulfill' : ''}</span>
          <span className="hero__title-main">{loaded ? 'YOUR ASPIRATIONS & DREAMS!' : ''}</span>
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
