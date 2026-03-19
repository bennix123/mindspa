import React from 'react';
import './MarqueeBanner.css';

const MarqueeBanner = ({ items, variant = 'dark' }) => {
  const defaults = [
    'Hypnotherapy',
    'Mindfulness',
    'Couples Therapy',
    'Anxiety Relief',
    'Stress Management',
    'Self Discovery',
    'Emotional Healing',
    'Inner Peace',
  ];

  const displayItems = items || defaults;

  // Duplicate for seamless loop
  const repeated = [...displayItems, ...displayItems, ...displayItems];

  return (
    <div className={`marquee-banner marquee-banner--${variant}`} aria-hidden="true">
      <div className="marquee-banner__track">
        {repeated.map((item, i) => (
          <span key={i} className="marquee-banner__item">
            <span className="marquee-banner__text">{item}</span>
            <span className="marquee-banner__sep">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <circle cx="6" cy="6" r="3" />
              </svg>
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeBanner;
