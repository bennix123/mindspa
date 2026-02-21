import React from 'react';
import { useContent } from '../context/ContentContext';
import './PodcastHighlight.css';

const PodcastHighlight = () => {
  const { podcasts } = useContent();

  if (!podcasts || podcasts.length === 0) return null;

  return (
    <section id="podcasts" className="podcast-highlight section">
      <div className="container">
        <span className="section-label">PODCAST</span>
        <h2 className="section-title">Podcast Highlights</h2>
        <p className="section-subtitle">
          Listen to our podcasts on mental health, wellness, and personal growth.
        </p>
        <div className="podcast-grid">
          {podcasts.map((item) => (
            <a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="podcast-card"
            >
              <div className="podcast-icon">{item.thumbnail || '🎙️'}</div>
              <div className="podcast-content">
                <span className="podcast-episode">{item.episode || 'Episode'}</span>
                <h3>{item.title}</h3>
                {item.description && <p>{item.description}</p>}
                <span className="podcast-cta">Listen now →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PodcastHighlight;
