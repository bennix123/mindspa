import React from 'react';
import './About.css';

const About = () => {
  const highlights = [
    { icon: '🧠', text: 'Evidence-based psychological therapies' },
    { icon: '🤝', text: 'Personalised one-on-one sessions' },
    { icon: '🌿', text: 'Holistic mental & emotional well-being' },
    { icon: '🔒', text: 'Confidential, judgment-free environment' },
  ];

  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="about-layout">
          {/* Left — visual panel */}
          <div className="about-visual fade-in">
            <div className="about-visual-main">
              <div className="about-visual-icon">🧠</div>
              <div className="about-visual-ring about-ring-1" />
              <div className="about-visual-ring about-ring-2" />
            </div>
            <div className="about-badge-pill">
              <span className="about-badge-num">10+</span>
              <span className="about-badge-label">Years of Expertise</span>
            </div>
          </div>

          {/* Right — text */}
          <div className="about-text fade-in animate-delay-1">
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
                <div key={i} className="about-highlight-item">
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
