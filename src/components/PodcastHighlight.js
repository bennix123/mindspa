import React from 'react';
import { useContent } from '../context/ContentContext';
import './PodcastHighlight.css';

const PODCAST_IMGS = [
  'https://images.pexels.com/photos/3759659/pexels-photo-3759659.jpeg?auto=compress&cs=tinysrgb&w=300',
  'https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg?auto=compress&cs=tinysrgb&w=300',
  'https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg?auto=compress&cs=tinysrgb&w=300',
];

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
          {podcasts.map((item, i) => (
            <a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="podcast-card fade-in"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="podcast-img-wrap">
                <img
                  src={PODCAST_IMGS[i % PODCAST_IMGS.length]}
                  alt={item.title}
                  className="podcast-img"
                />
                <div className="podcast-play">
                  <span>🎧</span>
                </div>
              </div>
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
