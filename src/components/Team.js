import React, { useState } from 'react';
import './Team.css';

const GalleryCard = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      key={index} 
      className="team-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="team-image">
        <div className="image-placeholder-team">
          <span className={`service-icon-large ${isHovered ? 'pulse' : ''}`}>
            {service.icon}
          </span>
        </div>
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
  const galleryServices = [
    { name: 'Hypnotherapy', icon: '🧘' },
    { name: 'Psycho-Kundali', icon: '🔮' },
    { name: 'Chakra Healing', icon: '✨' },
    { name: 'Handwriting Analysis', icon: '✍️' },
    { name: 'Life & Executive Coaching', icon: '🎯' },
    { name: 'Identify Issues', icon: '🔍' }
  ];

  return (
    <section id="gallery" className="team section">
      <div className="container">
        <span className="section-label">WATCH MY GALLERY</span>
        <h2 className="section-title">Watch my gallery</h2>
        <p className="section-subtitle">
          Explore our range of specialized psychological services and holistic healing approaches.
        </p>
        <div className="team-grid">
          {galleryServices.map((service, index) => (
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

