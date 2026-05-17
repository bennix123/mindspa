import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal';
import './Gallery.css';

const GALLERY_IMAGES = [
  { src: '/client-pic/gallery-1.jpeg', alt: 'MindSpa gallery image 1' },
  { src: '/client-pic/gallery-2.jpeg', alt: 'MindSpa gallery image 2' },
  { src: '/client-pic/gallery-3.jpeg', alt: 'MindSpa gallery image 3' },
  { src: '/client-pic/gallery-4.jpeg', alt: 'MindSpa gallery image 4' },
  { src: '/client-pic/gallery-5.jpeg', alt: 'MindSpa gallery image 5' },
  { src: '/client-pic/gallery-6.jpeg', alt: 'MindSpa gallery image 6' },
  { src: '/client-pic/gallery-7.jpeg', alt: 'MindSpa gallery image 7' },
  { src: '/client-pic/gallery-8.jpeg', alt: 'MindSpa gallery image 8' },
  { src: '/client-pic/gallery-9.jpeg', alt: 'MindSpa gallery image 9' },
  { src: '/client-pic/gallery-10.jpeg', alt: 'MindSpa gallery image 10' },
  { src: '/client-pic/gallery-11.jpeg', alt: 'MindSpa gallery image 11' },
  { src: '/client-pic/gallery-12.jpeg', alt: 'MindSpa gallery image 12' },
  { src: '/client-pic/gallery-13.jpeg', alt: 'MindSpa gallery image 13' },
  { src: '/client-pic/gallery-14.jpeg', alt: 'MindSpa gallery image 14' },
  { src: '/client-pic/gallery-15.jpeg', alt: 'MindSpa gallery image 15' },
  { src: '/client-pic/gallery-16.jpeg', alt: 'MindSpa gallery image 16' },
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
