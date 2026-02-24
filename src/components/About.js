import React, { useRef, useEffect, useState } from 'react';
import './About.css';
import { founderImage } from '../utils/clientPic';

const ABOUT_FALLBACK_MAIN = 'https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&cs=tinysrgb&w=600';
const ABOUT_FALLBACK_SEC = 'https://images.pexels.com/photos/3094230/pexels-photo-3094230.jpeg?auto=compress&cs=tinysrgb&w=400';

const About = () => {
  const [visible, setVisible] = useState(false);
  const [mainFallback, setMainFallback] = useState(false);
  const [secFallback, setSecFallback] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.unobserve(el);
  }, []);

  const highlights = [
    { icon: '🧠', text: 'Evidence-based psychological therapies' },
    { icon: '🤝', text: 'Personalised one-on-one sessions' },
    { icon: '🌿', text: 'Holistic mental & emotional well-being' },
    { icon: '🔒', text: 'Confidential, judgment-free environment' },
  ];

  return (
    <section id="about" className="about section" ref={ref}>
      <div className="container">
        <div className="about-layout">
          <div className={`about-visual ${visible ? 'about-visible' : ''}`}>
            <div className="about-img-stack">
              <div className="about-img-main-wrap">
                <img
                  src={mainFallback ? ABOUT_FALLBACK_MAIN : founderImage(10)}
                  alt="Dr. Manju Agrawal – Founder, MindSpa"
                  className="about-img-main"
                  onError={() => setMainFallback(true)}
                />
                <div className="about-img-exp-badge">
                  <span className="about-badge-num">10+</span>
                  <span className="about-badge-label">Years of Expertise</span>
                </div>
              </div>
              <div className="about-img-secondary-wrap">
                <img
                  src={secFallback ? ABOUT_FALLBACK_SEC : founderImage(9)}
                  alt="Dr. Manju Agrawal"
                  className="about-img-secondary"
                  onError={() => setSecFallback(true)}
                />
              </div>
            </div>
            <div className="about-visual-ring about-ring-1" />
            <div className="about-visual-ring about-ring-2" />
          </div>

          <div className={`about-text ${visible ? 'about-visible' : ''}`}>
            <span className="section-label">ABOUT US</span>
            <h2 className="section-title about-title">
              Welcome to <span className="gradient-text">MindSpa</span>
            </h2>
            <p className="about-description">
              We are a team of psychologists and our goal is to partner with you to enhance the quality of your life.
              Whether you are dealing with something specific or are seeking increased satisfaction and balance in life,
              we're here to help — without stigma or judgment.
            </p>

            <div className="about-highlights">
              {highlights.map((h, i) => (
                <div
                  key={i}
                  className="about-highlight-item"
                  style={{ transitionDelay: `${0.3 + i * 0.1}s` }}
                >
                  <span className="about-highlight-icon">{h.icon}</span>
                  <span className="about-highlight-text">{h.text}</span>
                </div>
              ))}
            </div>

            <div className="about-actions">
              <button
                className="btn btn-outline"
                onClick={() => document.querySelector('#founder')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Know More
              </button>
              <button
                className="btn btn-primary"
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
