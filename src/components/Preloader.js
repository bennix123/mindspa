import React, { useState, useEffect } from 'react';
import './Preloader.css';

function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Simulate loading progress with easing — starts fast, slows near end
    let current = 0;
    const interval = setInterval(() => {
      const remaining = 100 - current;
      // Fast initially, slower as it approaches 100
      const increment = Math.max(0.5, remaining * 0.06);
      current = Math.min(100, current + increment);
      setProgress(Math.round(current));

      if (current >= 100) {
        clearInterval(interval);
        // Brief pause at 100% then fade out
        setTimeout(() => {
          setHidden(true);
          // Remove from DOM after fade transition
          setTimeout(() => {
            setDone(true);
            if (onComplete) onComplete();
          }, 600);
        }, 300);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (done) return null;

  // SVG circle math: radius=70, circumference=2*π*70 ≈ 440
  const circumference = 440;
  const dashOffset = circumference - (circumference * progress) / 100;

  return (
    <div className={`preloader ${hidden ? 'preloader--hidden' : ''}`}>
      {/* Floating background orbs */}
      <div className="preloader__orb preloader__orb--1" />
      <div className="preloader__orb preloader__orb--2" />
      <div className="preloader__orb preloader__orb--3" />

      {/* Breathing glow */}
      <div className="preloader__glow" />

      {/* Main content */}
      <div className="preloader__content">
        {/* Circular progress ring */}
        <div className="preloader__ring">
          <svg viewBox="0 0 160 160">
            <defs>
              <linearGradient id="preloaderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3A8D9F" />
                <stop offset="50%" stopColor="#7BA68D" />
                <stop offset="100%" stopColor="#9B8EC4" />
              </linearGradient>
            </defs>
            <circle className="preloader__ring-bg" cx="80" cy="80" r="70" />
            <circle
              className="preloader__ring-progress"
              cx="80"
              cy="80"
              r="70"
              style={{ strokeDashoffset: dashOffset }}
            />
          </svg>
          <div className="preloader__percentage">
            {progress}<span>%</span>
          </div>
        </div>

        {/* Brand */}
        <div className="preloader__brand">
          <div className="preloader__title">Mind Spa</div>
          <div className="preloader__subtitle">your path to inner peace</div>
        </div>
      </div>

      {/* Bottom progress bar */}
      <div className="preloader__bar-wrapper">
        <div className="preloader__bar-track">
          <div
            className="preloader__bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default Preloader;
