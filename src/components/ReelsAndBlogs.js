import React from 'react';
import { useContent } from '../context/ContentContext';
import './ReelsAndBlogs.css';

const REEL_BG_IMAGES = [
  'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/3560044/pexels-photo-3560044.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/3094230/pexels-photo-3094230.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&cs=tinysrgb&w=400',
];

const ReelsAndBlogs = () => {
  const { reels } = useContent();

  if (!reels || reels.length === 0) return null;

  return (
    <section id="reels-blogs" className="reels-blogs section">
      <div className="container">
        <span className="section-label">REELS & BLOGS</span>
        <h2 className="section-title">Reels & Blog Links</h2>
        <p className="section-subtitle">
          Watch our short reels and read the latest blog posts on mental wellness and self-care.
        </p>
        <div className="reels-grid">
          {reels.map((item, i) => (
            <a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="reel-card fade-in"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="reel-thumbnail">
                <img
                  src={REEL_BG_IMAGES[i % REEL_BG_IMAGES.length]}
                  alt={item.title}
                  className="reel-bg-img"
                />
                <div className="reel-play-overlay">
                  <span className="reel-play-icon">▶</span>
                </div>
              </div>
              <div className="reel-content">
                <h3>{item.title}</h3>
                {item.description && <p>{item.description}</p>}
                <span className="reel-link-text">Watch / Read →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReelsAndBlogs;
