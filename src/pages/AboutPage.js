import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import Team from '../components/Team';

const SPACE_IMAGES = Array.from({ length: 15 }, (_, i) => {
  const num = String(i + 1).padStart(2, '0');
  return {
    src: `/client-pic/our-space/space-${num}.jpg`,
    alt: `MindSpa space photo ${i + 1}`,
  };
});

const aboutStyles = {
  section: {
    padding: '60px 0 80px',
    background: '#fff',
  },
  content: {
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center',
  },
  heading: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '32px',
    fontWeight: 400,
    color: 'var(--dark-navy)',
    marginBottom: '20px',
  },
  text: {
    fontSize: '16px',
    lineHeight: 1.8,
    color: 'var(--body-text)',
    marginBottom: '20px',
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    marginBottom: '40px',
  },
  dot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: 'var(--blue)',
  },
  line: {
    width: '30px',
    height: '3px',
    background: 'var(--blue)',
  },
  buttonWrap: {
    marginTop: '36px',
  },
  valuesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px',
    marginTop: '50px',
    textAlign: 'left',
  },
  valueCard: {
    background: 'var(--light-grey)',
    borderRadius: 'var(--radius-md)',
    padding: '30px 24px',
    border: '1px solid var(--border-light)',
  },
  valueIcon: {
    fontSize: '32px',
    marginBottom: '14px',
    display: 'block',
  },
  valueTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '20px',
    fontWeight: 400,
    color: 'var(--dark-navy)',
    marginBottom: '10px',
  },
  valueText: {
    fontSize: '14px',
    lineHeight: 1.7,
    color: 'var(--body-text)',
    margin: 0,
  },
};

function AboutPage() {
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    if (lightbox === null) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') setLightbox((i) => (i + 1) % SPACE_IMAGES.length);
      if (e.key === 'ArrowLeft') setLightbox((i) => (i - 1 + SPACE_IMAGES.length) % SPACE_IMAGES.length);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener('keydown', onKey);
    };
  }, [lightbox]);

  return (
    <>
      <PageBanner title="About Us" />

      <section style={aboutStyles.section}>
        <div className="container">
          <div style={aboutStyles.content}>
            <h2 style={aboutStyles.heading}>Hello and Welcome to MindSpa!</h2>
            <div style={aboutStyles.divider}>
              <span style={aboutStyles.line}></span>
              <span style={aboutStyles.dot}></span>
              <span style={aboutStyles.dot}></span>
              <span style={aboutStyles.dot}></span>
              <span style={aboutStyles.line}></span>
            </div>
            <p style={aboutStyles.text}>
              We are psychologists who are passionate about partnering with you
              to enhance your quality of life. Our aim is to provide a safe,
              supportive, and confidential environment where you can explore your
              thoughts, feelings, and behaviors. We believe in empowering
              individuals to achieve their full potential through evidence-based
              therapeutic approaches.
            </p>
            <p style={aboutStyles.text}>
              At MindSpa, we specialize in a wide range of psychological
              services including hypnotherapy, psycho-kundali, chakra healing,
              handwriting analysis, life coaching, and executive coaching. Our
              holistic approach ensures that each client receives personalized
              care tailored to their unique needs.
            </p>
            <p style={aboutStyles.text}>
              Whether you are dealing with stress, anxiety, relationship
              challenges, or simply seeking personal growth, our team of
              experienced professionals is here to guide you every step of the
              way. We combine traditional therapeutic wisdom with modern
              psychological techniques for the most effective outcomes.
            </p>

            <div style={aboutStyles.buttonWrap}>
              <Link to="/contact" className="btn-primary">
                Book Appointment
              </Link>
            </div>
          </div>

          {/* Values Section */}
          <div style={aboutStyles.valuesGrid}>
            <div style={aboutStyles.valueCard}>
              <span style={aboutStyles.valueIcon}>🧠</span>
              <h3 style={aboutStyles.valueTitle}>Expert Team</h3>
              <p style={aboutStyles.valueText}>
                Our team of certified psychologists and therapists bring years of
                experience and specialized training to support your well-being.
              </p>
            </div>
            <div style={aboutStyles.valueCard}>
              <span style={aboutStyles.valueIcon}>💙</span>
              <h3 style={aboutStyles.valueTitle}>Compassionate Care</h3>
              <p style={aboutStyles.valueText}>
                We create a safe and non-judgmental space where you can openly
                explore your challenges and work toward meaningful solutions.
              </p>
            </div>
            <div style={aboutStyles.valueCard}>
              <span style={aboutStyles.valueIcon}>🌿</span>
              <h3 style={aboutStyles.valueTitle}>Holistic Approach</h3>
              <p style={aboutStyles.valueText}>
                We blend evidence-based therapy with holistic wellness practices,
                addressing mind, body, and spirit for lasting transformation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team — same component used on homepage; <Team /> already has id="team" */}
      <Team />

      {/* Our Space — anchor for /about#space header link */}
      <section id="space" className="our-space-section">
        <div className="container">
          <p className="section-label" style={{ textAlign: 'center' }}>The Studio</p>
          <h2 className="our-space__title">Our Space</h2>
          <div className="section-divider">
            <span className="line"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="line"></span>
          </div>
          <p className="our-space__subtitle">
            A calming, confidential, and warmly designed space — the home of every
            MindSpa session, workshop, and training program.
          </p>

          <div className="our-space__grid">
            {SPACE_IMAGES.map((img, i) => (
              <button
                key={i}
                type="button"
                className="our-space__tile"
                onClick={() => setLightbox(i)}
                aria-label={`View ${img.alt}`}
              >
                <img src={img.src} alt={img.alt} loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightbox !== null && ReactDOM.createPortal(
        <div className="our-space-lightbox" onClick={(e) => { if (e.target === e.currentTarget) setLightbox(null); }}>
          <button className="our-space-lightbox__close" onClick={() => setLightbox(null)} aria-label="Close">✕</button>
          <button
            className="our-space-lightbox__nav our-space-lightbox__nav--prev"
            onClick={() => setLightbox((i) => (i - 1 + SPACE_IMAGES.length) % SPACE_IMAGES.length)}
            aria-label="Previous"
          >‹</button>
          <img
            src={SPACE_IMAGES[lightbox].src}
            alt={SPACE_IMAGES[lightbox].alt}
            className="our-space-lightbox__img"
          />
          <button
            className="our-space-lightbox__nav our-space-lightbox__nav--next"
            onClick={() => setLightbox((i) => (i + 1) % SPACE_IMAGES.length)}
            aria-label="Next"
          >›</button>
          <div className="our-space-lightbox__counter">{lightbox + 1} / {SPACE_IMAGES.length}</div>
        </div>,
        document.body
      )}

      <style>{`
        .our-space-section {
          padding: 70px 0 90px;
          background: var(--bg-light, #f7f7f5);
          scroll-margin-top: 80px;
        }
        .our-space__title {
          text-align: center;
          font-family: 'Oswald', sans-serif;
          font-size: clamp(28px, 4vw + 6px, 40px);
          font-weight: 500;
          color: var(--text-heading, #222);
          margin: 6px 0 14px;
        }
        .our-space__subtitle {
          text-align: center;
          max-width: 640px;
          margin: 16px auto 50px;
          color: var(--body-text, #555);
          font-size: 15px;
          line-height: 1.7;
        }
        .our-space__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 18px;
        }
        .our-space__tile {
          aspect-ratio: 4 / 3;
          border: 1px solid var(--border-light, #e0e0e0);
          border-radius: 10px;
          overflow: hidden;
          cursor: pointer;
          padding: 0;
          background: #fff;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .our-space__tile:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 36px rgba(0,0,0,0.15);
          border-color: var(--accent, #00d084);
        }
        .our-space__tile img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }
        .our-space__tile:hover img {
          transform: scale(1.05);
        }
        .our-space-lightbox {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.92);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: spaceFade 0.25s ease;
        }
        @keyframes spaceFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .our-space-lightbox__img {
          max-width: 92%;
          max-height: 88vh;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
          background: #000;
        }
        .our-space-lightbox__close,
        .our-space-lightbox__nav {
          position: absolute;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.3);
          color: #fff;
          font-size: 24px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s ease;
          line-height: 1;
        }
        .our-space-lightbox__close:hover,
        .our-space-lightbox__nav:hover {
          background: rgba(255,255,255,0.25);
        }
        .our-space-lightbox__close { top: 24px; right: 24px; }
        .our-space-lightbox__nav--prev { left: 24px; top: 50%; transform: translateY(-50%); }
        .our-space-lightbox__nav--next { right: 24px; top: 50%; transform: translateY(-50%); }
        .our-space-lightbox__counter {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          color: rgba(255,255,255,0.85);
          font-size: 14px;
          font-weight: 500;
          padding: 6px 14px;
          background: rgba(0,0,0,0.4);
          border-radius: 999px;
        }
        @media (max-width: 600px) {
          .our-space__grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 12px;
          }
          .our-space-lightbox__close,
          .our-space-lightbox__nav {
            width: 40px;
            height: 40px;
            font-size: 20px;
          }
          .our-space-lightbox__close { top: 14px; right: 14px; }
          .our-space-lightbox__nav--prev { left: 8px; }
          .our-space-lightbox__nav--next { right: 8px; }
        }
      `}</style>
    </>
  );
}

export default AboutPage;
