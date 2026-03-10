import React from 'react';
import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal';
import './Team.css';

const teamMembers = [
  {
    name: 'Dr. Priya Sharma',
    role: 'Sr. Psychologist',
    image: '/client-pic/8.jpeg',
  },
  {
    name: 'Dr. Rahul Verma',
    role: 'Clinical Therapist',
    image: '/client-pic/9.jpeg',
  },
  {
    name: 'Dr. Ananya Gupta',
    role: 'Family Counselor',
    image: '/client-pic/10.jpeg',
  },
  {
    name: 'Dr. Vikram Singh',
    role: 'Child Specialist',
    image: '/client-pic/1.jpeg',
  },
];

const Team = () => {
  const [titleRef, titleVis] = useScrollReveal();
  const gridRef = useStaggerReveal({ staggerDelay: 150, childSelector: '.team-card' });

  return (
    <section className="team">
      <div className="container">
        <div ref={titleRef} className={`team__header ${titleVis ? 'visible' : ''}`}>
          <p className="section-label">Who We Are</p>
          <h2 className="section-title">Meet Our Psychiatrist Team</h2>
          <div className="section-divider">
            <span className="line"></span>
            <span className="dot"></span>
            <span className="line"></span>
          </div>
        </div>

        <div className="team__grid" ref={gridRef}>
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card stagger-item">
              <div className="team-card__image">
                <img src={member.image} alt={member.name} />
                <div className="team-card__social">
                  <a href="#" aria-label="Facebook">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                    </svg>
                  </a>
                  <a href="#" aria-label="Twitter">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                    </svg>
                  </a>
                  <a href="#" aria-label="LinkedIn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z"/>
                    </svg>
                  </a>
                </div>
              </div>
              <div className="team-card__info">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
