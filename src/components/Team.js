import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Team.css';

const teamMembers = [
  { name: 'Dr. Priya Sharma', role: 'Sr. Psychologist', image: '/client-pic/8.jpeg' },
  { name: 'Dr. Rahul Verma', role: 'Clinical Therapist', image: '/client-pic/9.jpeg' },
  { name: 'Dr. Ananya Gupta', role: 'Family Counselor', image: '/client-pic/10.jpeg' },
  { name: 'Dr. Vikram Singh', role: 'Child Specialist', image: '/client-pic/1.jpeg' },
];

const Team = () => {
  const [leftRef, leftVis] = useScrollReveal();
  const [rightRef, rightVis] = useScrollReveal();

  return (
    <section className="team">
      <div className="container">
        <div className="team__grid">
          <div ref={leftRef} className={`team__content ${leftVis ? 'visible' : ''}`}>
            <p className="section-label" style={{ textAlign: 'left' }}>Who We Are</p>
            <h2 className="team__title">Meet Our Psychiatrist Team</h2>
            <p className="team__desc">
              Our team of dedicated professionals brings years of experience and
              compassion to every session. We believe that mental wellness is a journey,
              and we're here to guide you every step of the way with personalized care
              tailored to your unique needs.
            </p>
            <a href="/services" className="btn-primary">More Therapies</a>
          </div>

          <div ref={rightRef} className={`team__collage ${rightVis ? 'visible' : ''}`}>
            {teamMembers.map((member, index) => (
              <div key={index} className="team__collage-item">
                <img src={member.image} alt={member.name} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
