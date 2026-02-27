import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Testimonials.css';

const Testimonials = () => {
  const [headerRef, headerVis] = useScrollReveal();
  const [imgRef, imgVis] = useScrollReveal({ threshold: 0.1 });
  const [vidRef, vidVis] = useScrollReveal({ threshold: 0.1 });

  return (
    <section className="testimonials-section">
      <div className="testimonials-bg-pattern" aria-hidden="true"></div>
      <div className="container testimonials-container">
        <div ref={headerRef} className={`testimonials-header reveal reveal-up ${headerVis ? 'visible' : ''}`}>
          <span className="testimonials-label">WHAT MY CLIENTS SAY</span>
          <h2 className="testimonials-title">Testimonials</h2>
        </div>

        <div className="testimonials-grid">
          <div ref={imgRef} className={`testimonials-video-col reveal reveal-left ${imgVis ? 'visible' : ''}`}>
            <div className="testimonials-iframe-wrapper">
              <iframe
                src="https://www.youtube.com/embed/ifnQG672SX8?start=1"
                title="Client Testimonial"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div ref={vidRef} className={`testimonials-video-col reveal reveal-right ${vidVis ? 'visible' : ''}`}>
            <div className="testimonials-iframe-wrapper">
              <iframe
                src="https://www.youtube.com/embed/Umiiud-P4hc"
                title="Client Testimonial"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
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
