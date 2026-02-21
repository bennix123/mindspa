import React from 'react';
import { useContent } from '../context/ContentContext';
import './ReelsAndBlogs.css';

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
          {reels.map((item) => (
            <a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="reel-card"
            >
              <div className="reel-thumbnail">{item.thumbnail || '🎬'}</div>
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
