import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PageBanner from '../components/PageBanner';

const TESTIMONIAL_VIDEOS = [
  { id: 'ifnQG672SX8', title: 'Client Testimonial 1', start: 1 },
  { id: 'Umiiud-P4hc', title: 'Client Testimonial 2' },
  { id: '7F-eixoyYpM', title: 'Client Testimonial 3' },
  { id: 'DAd66UNC2pc', title: 'Client Testimonial 4' },
];

const CLIENT_VIDEOS = [
  { src: '/client-pic/testimonial-v11.mp4', title: 'Client Experience 1' },
  { src: '/client-pic/testimonial-v12.mp4', title: 'Client Experience 2' },
  { src: '/client-pic/testimonial-v13.mp4', title: 'Client Experience 3' },
];

const TRAINEE_VIDEOS = [
  { src: '/client-pic/trainee-testimonials/trainee-1.mp4', title: 'Trainee Testimonial 1' },
  { src: '/client-pic/trainee-testimonials/trainee-2.mp4', title: 'Trainee Feedback' },
  { src: '/client-pic/trainee-testimonials/trainee-3.mp4', title: 'Trainee Testimonial 2' },
  { src: '/client-pic/trainee-testimonials/trainee-4.mp4', title: 'Trainee Testimonial 3' },
];

const VideoCard = ({ src, title }) => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      video.pause();
    } else {
      video.play();
    }
    setPlaying(!playing);
  };

  return (
    <div className="client-video-card" onClick={handlePlay}>
      <video
        ref={videoRef}
        src={src}
        title={title}
        playsInline
        preload="metadata"
        onEnded={() => setPlaying(false)}
      />
      {!playing && (
        <div className="client-video-card__overlay">
          <div className="client-video-card__play">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
              <polygon points="6,3 20,12 6,21" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

function TestimonialsPage() {
  const location = useLocation();
  const [tab, setTab] = useState('client');

  // Sync tab to hash on mount + when hash changes (header dropdown deep-links)
  useEffect(() => {
    if (location.hash === '#trainee') setTab('trainee');
    else if (location.hash === '#client') setTab('client');
  }, [location.hash]);

  return (
    <>
      <PageBanner title="Testimonials" />

      {/* Tab nav */}
      <section className="testimonials-tabs-section">
        <div className="container">
          <div className="testimonials-tabs">
            <button
              className={`testimonials-tab ${tab === 'client' ? 'active' : ''}`}
              onClick={() => setTab('client')}
            >
              Client Testimonials
            </button>
            <button
              className={`testimonials-tab ${tab === 'trainee' ? 'active' : ''}`}
              onClick={() => setTab('trainee')}
            >
              Trainee Testimonials
            </button>
          </div>
        </div>
      </section>

      {tab === 'trainee' ? (
        <section className="client-videos-section">
          <div className="container">
            <h2 className="section-title">Hear From Our Trainees</h2>
            <div className="section-divider">
              <span className="line"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="line"></span>
            </div>
            <p className="testimonials-section__desc">
              Real feedback from trainees who completed our programs at MindSpa.
            </p>

            <div className="client-videos-grid">
              {TRAINEE_VIDEOS.map((video, i) => (
                <VideoCard key={i} src={video.src} title={video.title} />
              ))}
            </div>
          </div>
        </section>
      ) : (
      <>
      {/* YouTube Testimonials */}
      <section id="training-testimonials" className="testimonials-section">
        <div className="container">
          <h2 className="section-title">Our Clients Share Their Experience</h2>
          <div className="section-divider">
            <span className="line"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="line"></span>
          </div>
          <p className="testimonials-section__desc">
            Hear from people who have experienced positive transformation
            through our therapeutic services.
          </p>

          <div className="testimonials-page-grid">
            {TESTIMONIAL_VIDEOS.map((video) => (
              <div key={video.id} className="testimonial-video-card">
                <div className="testimonial-video-wrapper">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}${video.start ? `?start=${video.start}` : ''}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Video Testimonials */}
      <section className="client-videos-section">
        <div className="container">
          <h2 className="section-title">Video Testimonials</h2>
          <div className="section-divider">
            <span className="line"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="line"></span>
          </div>
          <p className="testimonials-section__desc">
            Real stories from our clients — watch their journey of healing and transformation.
          </p>

          <div className="client-videos-grid">
            {CLIENT_VIDEOS.map((video, i) => (
              <VideoCard key={i} src={video.src} title={video.title} />
            ))}
          </div>
        </div>
      </section>
      </>
      )}

      <style>{`
        /* === Tabs === */
        .testimonials-tabs-section {
          background: #fff;
          padding: 36px 0 0;
        }
        .testimonials-tabs {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .testimonials-tab {
          padding: 10px 28px;
          border: 2px solid var(--border-light, #e0e0e0);
          background: #fff;
          color: var(--body-text, #555);
          font-size: 15px;
          font-weight: 500;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .testimonials-tab:hover {
          border-color: var(--accent, #00d084);
          color: var(--accent, #00d084);
        }
        .testimonials-tab.active {
          background: var(--accent, #00d084);
          color: #fff;
          border-color: var(--accent, #00d084);
        }

        /* === YouTube Section === */
        .testimonials-section {
          padding: 60px 0 80px;
          background: #fff;
        }
        .testimonials-section__desc {
          text-align: center;
          font-size: 16px;
          color: var(--text-body);
          max-width: 600px;
          margin: 0 auto 50px;
          line-height: 1.6;
        }
        .testimonials-page-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
        }
        .testimonial-video-card {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          background: #000;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .testimonial-video-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.15);
        }
        .testimonial-video-wrapper {
          position: relative;
          padding-bottom: 56.25%;
          height: 0;
        }
        .testimonial-video-wrapper iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: none;
        }

        /* === Client Videos Section === */
        .client-videos-section {
          padding: 80px 0 100px;
          background: var(--bg-light);
        }
        .client-videos-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .client-video-card {
          position: relative;
          border-radius: 14px;
          overflow: hidden;
          background: #000;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          cursor: pointer;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
          aspect-ratio: 9 / 16;
        }
        .client-video-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 36px rgba(0,0,0,0.18);
        }
        .client-video-card video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .client-video-card__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.45) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s ease;
        }
        .client-video-card:hover .client-video-card__overlay {
          background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 100%);
        }
        .client-video-card__play {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 24px rgba(0, 208, 132, 0.4);
          transition: transform 0.3s ease;
        }
        .client-video-card__play svg {
          margin-left: 3px;
        }
        .client-video-card:hover .client-video-card__play {
          transform: scale(1.1);
        }

        @media (max-width: 900px) {
          .client-videos-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .testimonials-page-grid {
            grid-template-columns: 1fr;
          }
          .client-videos-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
          .client-video-card__play {
            width: 50px;
            height: 50px;
          }
          .client-video-card__play svg {
            width: 22px;
            height: 22px;
          }
        }
      `}</style>
    </>
  );
}

export default TestimonialsPage;
