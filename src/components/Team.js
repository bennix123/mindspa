import React, { useState } from 'react';
import './Team.css';

const GALLERY_IMAGES = [
  { name: 'Hypnotherapy', img: 'https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Psycho-Kundali', img: 'https://images.pexels.com/photos/6957667/pexels-photo-6957667.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Chakra Healing', img: 'https://images.pexels.com/photos/3560044/pexels-photo-3560044.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Yoga & Meditation', img: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Counseling', img: 'https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Mindfulness', img: 'https://images.pexels.com/photos/3759659/pexels-photo-3759659.jpeg?auto=compress&cs=tinysrgb&w=600' },
];

const GalleryCard = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="team-card fade-in"
      style={{ transitionDelay: `${index * 0.08}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="team-image">
        <img src={service.img} alt={service.name} className="gallery-photo" />
        <div className={`team-overlay ${isHovered ? 'active' : ''}`}>
          <button className="team-view-btn">View Details</button>
        </div>
      </div>
      <div className="team-info">
        <h3>{service.name}</h3>
      </div>
    </div>
  );
};

const Team = () => {
  return (
    <section id="gallery" className="team section">
      <div className="container">
        <span className="section-label">WATCH MY GALLERY</span>
        <h2 className="section-title">Watch my gallery</h2>
        <p className="section-subtitle">
          Explore our range of specialized psychological services and holistic healing approaches.
        </p>
        <div className="team-grid">
          {GALLERY_IMAGES.map((service, index) => (
            <GalleryCard key={index} service={service} index={index} />
          ))}
        </div>
        <div className="text-center">
          <button className="btn btn-outline">See More</button>
        </div>
      </div>
    </section>
  );
};

export default Team;
