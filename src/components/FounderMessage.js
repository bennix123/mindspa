import React from 'react';
import './FounderMessage.css';

const FounderMessage = () => {
  const credentials = [
    { icon: '🎓', text: 'Hypnotherapy Trainer & Practitioner' },
    { icon: '🧠', text: 'Subconscious Mind Coach' },
    { icon: '🏆', text: '10+ Years of Practice' },
    { icon: '🌍', text: 'Online & Offline Consultations' },
  ];

  return (
    <section id="founder" className="founder-message section">
      <div className="container">
        <div className="founder-layout">
          {/* Left — identity card */}
          <div className="founder-card fade-in">
            <div className="founder-avatar">
              <span>MA</span>
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

          {/* Right — message */}
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
