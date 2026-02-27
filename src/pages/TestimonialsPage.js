import React from 'react';
import PageBanner from '../components/PageBanner';

const TESTIMONIAL_VIDEOS = [
  {
    id: 'ifnQG672SX8',
    title: 'Client Testimonial 1',
    start: 1,
  },
  {
    id: 'Umiiud-P4hc',
    title: 'Client Testimonial 2',
  },
  {
    id: '7F-eixoyYpM',
    title: 'Client Testimonial 3',
  },
  {
    id: 'DAd66UNC2pc',
    title: 'Client Testimonial 4',
  },
];

function TestimonialsPage() {
  return (
    <>
      <PageBanner title="Testimonials" />

      <section style={{ padding: '60px 0 80px', background: '#fff' }}>
        <div className="container">
          <h2 className="section-title">Our Clients Share Their Experience</h2>
          <div className="section-divider">
            <span className="line"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="line"></span>
          </div>
          <p style={{ textAlign: 'center', fontSize: '16px', color: 'var(--body-text)', maxWidth: '600px', margin: '0 auto 50px', lineHeight: 1.6 }}>
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

      <style>{`
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
        @media (max-width: 700px) {
          .testimonials-page-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}

export default TestimonialsPage;
