import React from 'react';
import PageBanner from '../components/PageBanner';

const GALLERY_IMAGES = [
  { src: '/client-pic/1.jpg', alt: 'MindSpa Session 1' },
  { src: '/client-pic/2.jpg', alt: 'MindSpa Session 2' },
  { src: '/client-pic/3.jpg', alt: 'MindSpa Session 3' },
  { src: '/client-pic/4.jpg', alt: 'MindSpa Session 4' },
  { src: '/client-pic/5.jpg', alt: 'MindSpa Session 5' },
  { src: '/client-pic/6.jpg', alt: 'MindSpa Session 6' },
  { src: '/client-pic/7.jpg', alt: 'MindSpa Session 7' },
  { src: '/client-pic/8.jpg', alt: 'MindSpa Session 8' },
  { src: '/client-pic/9.jpg', alt: 'MindSpa Session 9' },
  { src: '/client-pic/10.jpg', alt: 'MindSpa Session 10' },
  { src: '/client-pic/11.jpg', alt: 'MindSpa Session 11' },
];

const galleryStyles = {
  section: {
    padding: '60px 0 80px',
    background: '#fff',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: '16px',
    color: 'var(--body-text)',
    maxWidth: '600px',
    margin: '0 auto 40px',
    lineHeight: 1.6,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
  },
  imageWrap: {
    borderRadius: 'var(--radius-md)',
    overflow: 'hidden',
    aspectRatio: '4/3',
    position: 'relative',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    border: '1px solid var(--border-light)',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    transition: 'transform 0.4s ease',
  },
};

function GalleryPage() {
  return (
    <>
      <PageBanner title="Gallery" />

      <section style={galleryStyles.section}>
        <div className="container">
          <h2 className="section-title">Our Moments</h2>
          <div className="section-divider">
            <span className="line"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="line"></span>
          </div>
          <p style={galleryStyles.subtitle}>
            A glimpse into our sessions, events, and community engagements.
          </p>

          <div style={galleryStyles.grid} className="gallery-page-grid">
            {GALLERY_IMAGES.map((img, index) => (
              <div
                key={index}
                style={galleryStyles.imageWrap}
                className="gallery-page-item"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  style={galleryStyles.image}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .gallery-page-item:hover {
          transform: scale(1.03);
          box-shadow: 0 8px 30px rgba(0,0,0,0.12);
        }
        .gallery-page-item:hover img {
          transform: scale(1.05);
        }
        @media (max-width: 900px) {
          .gallery-page-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 500px) {
          .gallery-page-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}

export default GalleryPage;
