import React, { useState, useEffect, useRef } from 'react';
import './Hero.css';
import VideoModal from './VideoModal';
import { founderImage, heroBgImage } from '../utils/clientPic';

const HERO_IMG = heroBgImage;
const FLOAT_1 = 'https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&cs=tinysrgb&w=400';
const FLOAT_2 = 'https://images.pexels.com/photos/3094230/pexels-photo-3094230.jpeg?auto=compress&cs=tinysrgb&w=400';
const HERO_FALLBACK_MAIN = 'https://images.pexels.com/photos/3759659/pexels-photo-3759659.jpeg?auto=compress&cs=tinysrgb&w=600';
const HERO_FALLBACK_SMALL = 'https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg?auto=compress&cs=tinysrgb&w=400';

const TYPED_LINES = [
  'Fulfill Your Aspirations & Dreams!',
  'Get Rid Of Stress & Anxiety!',
  'Rejuvenate Your Relationships!',
  'Attain Peace Of Mind!',
];

const Hero = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [heroMainFallback, setHeroMainFallback] = useState(false);
  const [heroSmallFallback, setHeroSmallFallback] = useState(false);
  const heroRef = useRef(null);

  // Typing animation
  useEffect(() => {
    const current = TYPED_LINES[lineIdx];
    const speed = deleting ? 30 : 60;

    if (!deleting && charIdx === current.length) {
      const t = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx === 0) {
      setDeleting(false);
      setLineIdx((p) => (p + 1) % TYPED_LINES.length);
      return;
    }

    const t = setTimeout(() => {
      setCharIdx((p) => p + (deleting ? -1 : 1));
    }, speed);
    return () => clearTimeout(t);
  }, [charIdx, deleting, lineIdx]);

  // Mouse parallax
  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  };

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
    >
      {/* Background image with parallax */}
      <div className="hero-bg-image" style={{
        transform: `translate(${mousePos.x * -8}px, ${mousePos.y * -8}px) scale(1.05)`,
      }}>
        <img src={HERO_IMG} alt="" aria-hidden="true" />
      </div>
      <div className="hero-overlay" />

      {/* Floating decorative images — founder 3 & 4 when available */}
      <div className="hero-float hero-float-1" style={{
        transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)`,
      }}>
        <img src={founderImage(9)} alt="" onError={(e) => { e.target.onerror = null; e.target.src = FLOAT_1; }} />
      </div>
      <div className="hero-float hero-float-2" style={{
        transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)`,
      }}>
        <img src={founderImage(10)} alt="" onError={(e) => { e.target.onerror = null; e.target.src = FLOAT_2; }} />
      </div>

      {/* Animated particles */}
      <div className="hero-particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${4 + Math.random() * 6}s`,
          }} />
        ))}
      </div>

      {/* Content */}
      <div className="hero-content">
        <div className="container">
          <div className="hero-inner">
            <div className="hero-text">
              <div className="hero-badge">
                <span className="hero-badge-dot" />
                <span>Trusted Mental Health Experts</span>
              </div>

              <h1 className="hero-main-title">
                Attain
                <span className="hero-accent">Peace Of Mind!</span>
              </h1>

              <div className="hero-typed-wrap">
                <span className="hero-typed">
                  {TYPED_LINES[lineIdx].substring(0, charIdx)}
                </span>
                <span className="hero-cursor">|</span>
              </div>

              <div className="hero-taglines">
                <p className="hero-tagline">Personal Psychologist For Your Family's Health &amp; Happiness.</p>
                <p className="hero-tagline">Understand Your Partner &amp; Get Psycho-Kundali Made.</p>
              </div>

              <div className="hero-cta-row">
                <button className="btn btn-primary hero-cta-primary" onClick={() => scrollTo('#contact')}>
                  Book Appointment
                </button>
                <button className="hero-cta-secondary" onClick={() => setIsVideoOpen(true)}>
                  <span className="hero-play-ring">
                    <span className="hero-play-icon">▶</span>
                  </span>
                  Watch Video
                </button>
              </div>

              {/* Quick stats */}
              <div className="hero-mini-stats">
                <div className="hero-mini-stat">
                  <strong>1000+</strong><span>Happy Clients</span>
                </div>
                <div className="hero-mini-stat">
                  <strong>15+</strong><span>Years Exp.</span>
                </div>
                <div className="hero-mini-stat">
                  <strong>50+</strong><span>Therapists</span>
                </div>
              </div>
            </div>

            {/* Right visual panel — founder 1 & 2 */}
            <div className="hero-visual">
              <div className="hero-img-card" style={{
                transform: `translate(${mousePos.x * 6}px, ${mousePos.y * 6}px)`,
              }}>
                <img
                  src={heroMainFallback ? HERO_FALLBACK_MAIN : founderImage(8)}
                  alt="Dr. Manju Agrawal – Founder"
                  className="hero-img-main"
                  onError={() => setHeroMainFallback(true)}
                />
                <div className="hero-img-badge">
                  <span>✨</span> Meet Our Founder
                </div>
              </div>
              <div className="hero-img-card hero-img-small" style={{
                transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)`,
              }}>
                <img
                  src={heroSmallFallback ? HERO_FALLBACK_SMALL : founderImage(11)}
                  alt="Dr. Manju Agrawal"
                  className="hero-img-secondary"
                  onError={() => setHeroSmallFallback(true)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom features */}
      <div className="hero-features">
        <div className="container">
          <div className="features-grid">
            {[
              { icon: '🧘', title: 'Hypnotherapy', img: 'https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg?auto=compress&cs=tinysrgb&w=300', desc: 'Transform your subconscious mind with professional sessions.' },
              { icon: '🔮', title: 'Psycho-Kundali', img: 'https://images.pexels.com/photos/6957667/pexels-photo-6957667.jpeg?auto=compress&cs=tinysrgb&w=300', desc: 'Understand your partner through psychological compatibility.' },
              { icon: '✨', title: 'Chakra Healing', img: 'https://images.pexels.com/photos/3560044/pexels-photo-3560044.jpeg?auto=compress&cs=tinysrgb&w=300', desc: 'Balance your energy centers for holistic well-being.' },
            ].map((f, i) => (
              <div key={i} className={`feature-card ${i === 1 ? 'feature-card-center' : ''}`}>
                <img src={f.img} alt={f.title} className="feature-card-img" />
                <div className="feature-card-body">
                  <span className="feature-icon">{f.icon}</span>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
    </section>
  );
};

export default Hero;
