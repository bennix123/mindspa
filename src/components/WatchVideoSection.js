import React, { useRef, useState } from 'react';

const VIDEO_SRC = '/client-pic/hero-slides/hero-video.mp4';

function WatchVideoSection() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) {
      v.pause();
    } else {
      v.play().catch(() => {});
    }
  };

  return (
    <section id="video" className="watch-video-section">
      <div className="container">
        <p className="section-label" style={{ textAlign: 'center' }}>Watch Our Story</p>
        <h2 className="watch-video__title">A Glimpse Into Mind Spa</h2>
        <div className="section-divider">
          <span className="line"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="line"></span>
        </div>

        <div className="watch-video__player" onClick={togglePlay}>
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            playsInline
            preload="metadata"
            controls={playing}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
          />
          {!playing && (
            <div className="watch-video__overlay">
              <div className="watch-video__play-btn" aria-hidden="true">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                  <polygon points="6,3 20,12 6,21" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .watch-video-section {
          padding: 80px 0 90px;
          background: var(--bg-light, #f7f7f5);
        }
        .watch-video__title {
          font-family: 'Oswald', sans-serif;
          text-align: center;
          font-size: 38px;
          font-weight: 500;
          color: var(--text-heading, #222);
          margin: 6px 0 20px;
        }
        .watch-video__player {
          position: relative;
          max-width: 880px;
          margin: 36px auto 0;
          aspect-ratio: 16 / 9;
          border-radius: 14px;
          overflow: hidden;
          background: #000;
          box-shadow: 0 18px 50px rgba(0,0,0,0.18);
          cursor: pointer;
        }
        .watch-video__player video {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          background: #000;
        }
        .watch-video__overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.35) 100%);
          transition: background 0.3s ease;
        }
        .watch-video__player:hover .watch-video__overlay {
          background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 100%);
        }
        .watch-video__play-btn {
          width: 86px;
          height: 86px;
          border-radius: 50%;
          background: var(--accent, #00d084);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 32px rgba(0, 208, 132, 0.45);
          transition: transform 0.3s ease;
        }
        .watch-video__play-btn svg {
          margin-left: 4px;
        }
        .watch-video__player:hover .watch-video__play-btn {
          transform: scale(1.1);
        }
        @media (max-width: 600px) {
          .watch-video__title {
            font-size: 28px;
          }
          .watch-video__play-btn {
            width: 64px;
            height: 64px;
          }
          .watch-video__play-btn svg {
            width: 26px;
            height: 26px;
          }
        }
      `}</style>
    </section>
  );
}

export default WatchVideoSection;
