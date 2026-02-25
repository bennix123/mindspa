import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Testimonials.css';

const Testimonials = () => {
  const [headerRef, headerVis] = useScrollReveal();
  const [imgRef, imgVis] = useScrollReveal({ threshold: 0.2 });
  const [vidRef, vidVis] = useScrollReveal({ threshold: 0.2 });

  return (
    <section className="testimonials-section">
      <div className="testimonials-bg-pattern" aria-hidden="true"></div>
      <div className="container testimonials-container">
        <div ref={headerRef} className={`testimonials-header reveal reveal-up ${headerVis ? 'visible' : ''}`}>
          <span className="testimonials-label">WHAT MY CLIENTS SAY</span>
          <h2 className="testimonials-title">Testimonials</h2>
        </div>

        <div className="testimonials-grid">
          <div ref={imgRef} className={`testimonials-image-col reveal reveal-left ${imgVis ? 'visible' : ''}`}>
            <div className="testimonials-image-wrapper">
              <img
                src="https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Person pressing smiley face button"
                className="testimonials-image"
              />
            </div>
          </div>

          <div ref={vidRef} className={`testimonials-video-col reveal reveal-right ${vidVis ? 'visible' : ''}`}>
            <div className="testimonials-video-placeholder">
              <div className="testimonials-video-overlay">
                <div className="testimonials-play-btn">
                  <svg
                    width="50"
                    height="50"
                    viewBox="0 0 50 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="25" cy="25" r="25" fill="rgba(255,255,255,0.9)" />
                    <polygon points="20,15 38,25 20,35" fill="#1E293B" />
                  </svg>
                </div>
                <p className="testimonials-video-text">Watch Client Testimonial</p>
              </div>
              <img
                src="https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Video testimonial thumbnail"
                className="testimonials-video-thumb"
              />
            </div>
          </div>
        </div>

        <div className="testimonials-cta">
          <Link to="/testimonials" className="btn-primary testimonials-btn">
            More Testimonials
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
