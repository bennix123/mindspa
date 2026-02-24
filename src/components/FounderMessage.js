import React, { useState, useEffect } from 'react';
import { founderImage, founderImageCount } from '../utils/clientPic';
import './FounderMessage.css';

const FALLBACK_IMG = 'https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=400';

const FounderMessage = () => {
  const [currentPhoto, setCurrentPhoto] = useState(1);
  const [fallbackUsed, setFallbackUsed] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setCurrentPhoto((p) => (p >= founderImageCount ? 1 : p + 1));
    }, 3500);
    return () => clearInterval(t);
  }, []);

  const credentials = [
    { icon: '🎓', text: 'Hypnotherapy Trainer & Practitioner' },
    { icon: '🧠', text: 'Subconscious Mind Coach' },
    { icon: '🏆', text: '10+ Years of Practice' },
    { icon: '🌍', text: 'Online & Offline Consultations' },
  ];

  const founderPhotos = Array.from({ length: founderImageCount }, (_, i) => i + 1);

  return (
    <section id="founder" className="founder-message section">
      <div className="container">
        <div className="founder-layout">
          <div className="founder-card fade-in">
            <div className="founder-avatar-img">
              <img
                src={fallbackUsed ? FALLBACK_IMG : founderImage(currentPhoto)}
                alt="Dr. Manju Agrawal"
                onError={() => setFallbackUsed(true)}
              />
            </div>
            <div className="founder-photo-strip">
              {founderPhotos.map((n) => (
                <button
                  key={n}
                  type="button"
                  className={`founder-thumb ${currentPhoto === n ? 'active' : ''}`}
                  onClick={() => setCurrentPhoto(n)}
                  aria-label={`View photo ${n}`}
                >
                  <img
                    src={founderImage(n)}
                    alt=""
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </button>
              ))}
            </div>
            <h3 className="founder-name">Dr. Manju Agrawal</h3>
            <div className="founder-credentials">
              {credentials.map((c, i) => (
                <div key={i} className="founder-credential">
                  <span>{c.icon}</span>
                  <span>{c.text}</span>
                </div>
              ))}
            </div>
            <div className="founder-social">
              <a href="#contact" className="founder-social-btn" aria-label="Contact">✉️</a>
              <a href="tel:+917607588184" className="founder-social-btn" aria-label="Call">📞</a>
            </div>
          </div>

          <div className="founder-message-wrap fade-in animate-delay-1">
            <span className="section-label">FOUNDER'S MESSAGE</span>
            <h2 className="section-title">A Word From Our Founder</h2>
            <p className="greeting">Dear valued visitors,</p>
            <p>
              Welcome to Mind Spa, dedicated to creating holistic mental, physical, social and emotional well-being.
              Our mission is to provide a safe and supportive space for individuals to explore their mental health
              and emotional wellbeing, without stigma or judgment.
            </p>
            <p>We are a team of mental health professionals, dedicated to:</p>
            <ul className="founder-list">
              <li>Help you manifest your best potential</li>
              <li>Coach you to achieve success and happiness in your personal and professional lives</li>
              <li>Helping you navigate the ups and downs of life, empowering you to live your best life</li>
              <li>Offering online and offline therapy sessions</li>
              <li>Providing self-help resources for long-term healing and rehabilitation</li>
            </ul>
            <p className="signature">— From the desk of the Founder President.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderMessage;
