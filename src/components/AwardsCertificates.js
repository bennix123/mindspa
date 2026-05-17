import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const AWARDS = Array.from({ length: 9 }, (_, i) => {
  const num = String(i + 1).padStart(2, '0');
  return {
    src: `/client-pic/awards/award-${num}.jpg`,
    alt: `MindSpa Award / Certificate ${i + 1}`,
  };
});

function AwardsCertificates() {
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    if (lightbox === null) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener('keydown', onKey);
    };
  }, [lightbox]);

  const next = () => setLightbox((i) => (i + 1) % AWARDS.length);
  const prev = () => setLightbox((i) => (i - 1 + AWARDS.length) % AWARDS.length);

  return (
    <section className="awards-section">
      <div className="container">
        <p className="section-label" style={{ textAlign: 'center' }}>Recognition</p>
        <h2 className="awards-title">Awards &amp; Certificates</h2>
        <div className="section-divider">
          <span className="line"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="line"></span>
        </div>
        <p className="awards-subtitle">
          Internationally accredited certifications and recognitions earned by
          Prof (Dr) Manju Agrawal and the MindSpa team over decades of clinical practice.
        </p>

        <div className="awards-grid">
          {AWARDS.map((a, i) => (
            <button
              key={i}
              type="button"
              className="award-tile"
              onClick={() => setLightbox(i)}
              aria-label={`View ${a.alt}`}
            >
              <img src={a.src} alt={a.alt} loading="lazy" />
              <span className="award-tile__hover" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2">
                  <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M11 8v6M8 11h6"/>
                </svg>
              </span>
            </button>
          ))}
        </div>
      </div>

      {lightbox !== null && ReactDOM.createPortal(
        <div className="awards-lightbox" onClick={(e) => { if (e.target === e.currentTarget) setLightbox(null); }}>
          <button className="awards-lightbox__close" onClick={() => setLightbox(null)} aria-label="Close">✕</button>
          <button className="awards-lightbox__nav awards-lightbox__nav--prev" onClick={prev} aria-label="Previous">‹</button>
          <img src={AWARDS[lightbox].src} alt={AWARDS[lightbox].alt} className="awards-lightbox__img" />
          <button className="awards-lightbox__nav awards-lightbox__nav--next" onClick={next} aria-label="Next">›</button>
          <div className="awards-lightbox__counter">{lightbox + 1} / {AWARDS.length}</div>
        </div>,
        document.body
      )}

      <style>{`
        .awards-section {
          padding: 80px 0 100px;
          background: #fff;
        }
        .awards-title {
          text-align: center;
          font-family: 'Oswald', sans-serif;
          font-size: clamp(28px, 4vw + 6px, 40px);
          font-weight: 500;
          color: var(--text-heading, #222);
          margin: 6px 0 14px;
        }
        .awards-subtitle {
          text-align: center;
          max-width: 640px;
          margin: 16px auto 50px;
          color: var(--body-text, #555);
          font-size: 15px;
          line-height: 1.7;
        }
        .awards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 22px;
        }
        .award-tile {
          position: relative;
          aspect-ratio: 4 / 3;
          background: var(--bg-light, #f7f7f5);
          border: 1px solid var(--border-light, #e0e0e0);
          border-radius: 10px;
          overflow: hidden;
          cursor: pointer;
          padding: 0;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .award-tile:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 36px rgba(0,0,0,0.12);
          border-color: var(--accent, #00d084);
        }
        .award-tile img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          background: #fff;
          padding: 8px;
          box-sizing: border-box;
        }
        .award-tile__hover {
          position: absolute;
          inset: 0;
          background: rgba(0, 208, 132, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.25s ease;
        }
        .award-tile:hover .award-tile__hover {
          opacity: 1;
        }
        .awards-lightbox {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.92);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: awardsFade 0.25s ease;
        }
        @keyframes awardsFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .awards-lightbox__img {
          max-width: 92%;
          max-height: 88vh;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
          background: #fff;
        }
        .awards-lightbox__close,
        .awards-lightbox__nav {
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
        .awards-lightbox__close:hover,
        .awards-lightbox__nav:hover {
          background: rgba(255,255,255,0.25);
        }
        .awards-lightbox__close { top: 24px; right: 24px; }
        .awards-lightbox__nav--prev { left: 24px; top: 50%; transform: translateY(-50%); }
        .awards-lightbox__nav--next { right: 24px; top: 50%; transform: translateY(-50%); }
        .awards-lightbox__counter {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          color: rgba(255,255,255,0.8);
          font-size: 14px;
          font-weight: 500;
          padding: 6px 14px;
          background: rgba(0,0,0,0.4);
          border-radius: 999px;
        }
        @media (max-width: 600px) {
          .awards-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 14px;
          }
          .awards-lightbox__close,
          .awards-lightbox__nav {
            width: 40px;
            height: 40px;
            font-size: 20px;
          }
          .awards-lightbox__close { top: 14px; right: 14px; }
          .awards-lightbox__nav--prev { left: 8px; }
          .awards-lightbox__nav--next { right: 8px; }
        }
      `}</style>
    </section>
  );
}

export default AwardsCertificates;
