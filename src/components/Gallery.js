import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal';
import './Gallery.css';

const GALLERY_IMAGES = [
  { src: '/client-pic/1.jpg', alt: 'MindSpa gallery image 1' },
  { src: '/client-pic/2.jpg', alt: 'MindSpa gallery image 2' },
  { src: '/client-pic/3.jpg', alt: 'MindSpa gallery image 3' },
  { src: '/client-pic/4.jpg', alt: 'MindSpa gallery image 4' },
  { src: '/client-pic/5.jpg', alt: 'MindSpa gallery image 5' },
  { src: '/client-pic/6.jpg', alt: 'MindSpa gallery image 6' },
];

const Gallery = () => {
  const [titleRef, titleVis] = useScrollReveal();
  const gridRef = useStaggerReveal({ staggerDelay: 100, childSelector: '.gallery__img-wrap' });

  return (
    <section className="gallery">
      <div className="gallery__container">
        <div ref={titleRef} className={`reveal reveal-up ${titleVis ? 'visible' : ''}`}>
          <h2 className="gallery__title">Watch My Gallery</h2>
          <div className="gallery__divider">
            <span className="dot" />
            <span className="line" />
            <span className="dot" />
          </div>
        </div>

        <div className="gallery__grid" ref={gridRef}>
          {GALLERY_IMAGES.map((image, index) => (
            <div className="gallery__img-wrap stagger-item hover-zoom" key={index}>
              <img src={image.src} alt={image.alt} loading="lazy" />
            </div>
          ))}
        </div>

        <div className="gallery__see-more">
          <Link to="/gallery" className="gallery__see-more-link">
            See More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
